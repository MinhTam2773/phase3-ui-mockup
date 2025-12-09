import { Choice, Question, Quiz } from "@/app/quizzes/quiz";
import { GoogleGenAI } from "@google/genai";
import { supabase } from "./supabase";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({ apiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY! });

interface QuizGenerationParams {
  topic: string;
  difficulty: "easy" | "medium" | "hard";
}

interface GeneratedQuiz {
  quiz_id: string;
  title: string;
  description: string;
  created_at: string;
  is_published: boolean;
  questions: Question[];
}

export async function generateQuizzes(
  params: QuizGenerationParams
): Promise<GeneratedQuiz> {
  console.log("Generating quizzes...");

  const prompt = `Generate 5 quizzes about ${params.topic} at ${params.difficulty} difficulty level.
  
For each quiz, provide:
1. A clear question prompt
2. Three answer choices (labeled A, B, C)
3. Indicate which answer is correct (only one correct answer per question)
4. Provide an explanation for why the correct answer is right
5. Provide an explanation for why the other answers are wrong

Format the response as a JSON object with this exact structure:
{
  "quiz_id": "generate a unique UUID here",
  "title": "Quiz Title about ${params.topic}",
  "description": "A ${params.difficulty} level quiz on ${params.topic}",
  "created_at": "current timestamp in ISO format",
  "is_published": true,
  "questions": [
    {
      "question_id": "unique UUID for question",
      "prompt": "The question text",
      "question_type": "text",
      "explanation_true": "Explanation of why correct answer is right",
      "explanation_false": "Explanation of why other answers are wrong",
      "is_active": true,
      "created_at": "current timestamp in ISO format",
      "quiz_id": "same as parent quiz_id",
      "choices": [
        {
          "choice_id": "unique UUID for choice",
          "label": "Choice A text",
          "is_correct": true or false,
          "created_at": "current timestamp in ISO format",
          "question_id": "same as parent question_id"
        },
        ...two more choices
      ]
    },
    ...four more questions
  ]
}

IMPORTANT: 
- Generate proper UUIDs for all id fields (use uuidv4 format)
- Use current timestamp for all created_at fields
- Ensure exactly 5 questions
- Each question must have exactly 3 choices
- Only one choice per question should have is_correct: true
- Make the questions appropriate for the difficulty level: ${params.difficulty}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: prompt,
    });

    const responseText = response.text;

    // Try to parse the JSON response
    try {
      if (!responseText) throw new Error("Error with response text");
      const jsonStart = responseText.indexOf("{");
      const jsonEnd = responseText.lastIndexOf("}") + 1;
      const jsonString = responseText.substring(jsonStart, jsonEnd);

      const quizData: GeneratedQuiz = JSON.parse(jsonString);

      // Validate the structure
      if (
        !quizData.quiz_id ||
        !quizData.questions ||
        quizData.questions.length !== 5
      ) {
        throw new Error("Invalid quiz structure generated");
      }

      console.log("Quizzes generated successfully!" + quizData);
      return quizData;
    } catch (parseError) {
      console.error("Failed to parse AI response as JSON:", parseError);
      console.log("Raw response:", responseText);
      throw new Error("Failed to parse quiz data from AI response");
    }
  } catch (error) {
    console.error("Error generating quizzes:", error);
    throw error;
  }
}

export async function insertAIGeneratedQuiz(
  params: {quiz: Quiz,questions: Question[], choices: Choice[] },
  userId?: string | undefined
) {
  try {
    // Generate the quiz data
    const { quiz, questions, choices } = params;

    // Start a transaction by using multiple insert operations
    // First, insert the quiz
    const { data: insertedQuiz, error: quizError } = await supabase
      .from("quizzes")
      .insert([
        {
          ...quiz,
          is_published: true, // Set to true since it's generated for immediate use
        },
      ])
      .select()
      .single();

    if (quizError) {
      console.error("Error inserting quiz:", quizError);
      throw new Error(`Failed to insert quiz: ${quizError.message}`);
    }

    console.log("Quiz inserted successfully:", insertedQuiz.quiz_id);

    // Update the quiz_id in questions to match the inserted quiz
    const questionsWithCorrectQuizId = questions.map((q) => ({
      ...q,
      quiz_id: insertedQuiz.quiz_id,
    }));

    // Insert questions
    const { data: insertedQuestions, error: questionsError } = await supabase
      .from("questions")
      .insert(questionsWithCorrectQuizId)
      .select();

    if (questionsError) {
      console.error("Error inserting questions:", questionsError);
      throw new Error(`Failed to insert questions: ${questionsError.message}`);
    }

    console.log(
      `${insertedQuestions?.length || 0} questions inserted successfully`
    );

    // Update question_id in choices to match the inserted questions
    const choicesWithCorrectQuestionIds = choices.map((choice) => {
      const matchingQuestion = insertedQuestions?.find(
        (q) => q.question_id === choice.question_id
      );
      return {
        ...choice,
        question_id: matchingQuestion?.question_id || choice.question_id,
      };
    });

    // Insert choices
    const { data: insertedChoices, error: choicesError } = await supabase
      .from("choices")
      .insert(choicesWithCorrectQuestionIds);

    if (choicesError) {
      console.error("Error inserting choices:", choicesError);
      throw new Error(`Failed to insert choices: ${choicesError.message}`);
    }

    console.log(
      `${choicesWithCorrectQuestionIds.length} choices inserted successfully`
    );

    // Return the complete inserted quiz data
    return {
      quiz: insertedQuiz,
      questions: insertedQuestions || [],
      choices: insertedChoices || [],
    };
  } catch (error) {
    console.error("Error inserting AI-generated quiz:", error);
    throw error;
  }
}

//returns separate arrays for each table
export async function generateQuizData(params: QuizGenerationParams, userId: string | undefined) {
  const generatedQuiz = await generateQuizzes(params);

  console.log("separating...")

  // Extract data for each table
  const quizData = {
    quiz_id: generatedQuiz.quiz_id,
    title: generatedQuiz.title,
    description: generatedQuiz.description,
    created_at: generatedQuiz.created_at,
    is_published: generatedQuiz.is_published,
  };

  const questionsData = generatedQuiz.questions.map((q) => ({
    question_id: q.question_id,
    prompt: q.prompt,
    question_type: q.question_type,
    explanation_true: q.explanation_true,
    explanation_false: q.explanation_false,
    is_active: q.is_active,
    created_at: q.created_at,
    quiz_id: q.quiz_id,
  }));

  const choicesData = generatedQuiz.questions.flatMap((q) =>
    q.choices.map((c) => ({
      choice_id: c.choice_id,
      label: c.label,
      is_correct: c.is_correct,
      created_at: c.created_at,
      question_id: c.question_id,
    }))
  );

//   console.log("inserting")
//   await insertAIGeneratedQuiz({quizData, questionsData, choicesData}, userId);

  return {
    quiz: quizData,
    questions: questionsData,
    choices: choicesData,
  };
}