import { GoogleGenAI } from "@google/genai";

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
  questions: {
    question_id: string;
    prompt: string;
    question_type: string;
    explanation_true: string;
    explanation_false: string;
    is_active: boolean;
    created_at: string;
    quiz_id: string;
    choices: {
      choice_id: string;
      label: string;
      is_correct: boolean;
      created_at: string;
      question_id: string;
    }[];
  }[];
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
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const responseText = response.text;

    // Try to parse the JSON response
    try {
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

      console.log("Quizzes generated successfully!");
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

// Alternative: If you want a function that returns separate arrays for each table
export async function generateQuizData(params: QuizGenerationParams) {
  const generatedQuiz = await generateQuizzes(params);

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

  return {
    quiz: quizData,
    questions: questionsData,
    choices: choicesData,
  };
}

// // Insert into Supabase
// // First insert quiz
// const { data: quiz, error: quizError } = await supabase
//   .from('quizzes')
//   .insert([quizData.quiz])
//   .select();
//
// if (quizError) throw quizError;
//
// // Insert questions
// const { data: questions, error: questionsError } = await supabase
//   .from('questions')
//   .insert(quizData.questions)
//   .select();
//
// if (questionsError) throw questionsError;
//
// // Insert choices
// const { data: choices, error: choicesError } = await supabase
//   .from('choices')
//   .insert(quizData.choices);
//
// if (choicesError) throw choicesError;
