/* This is the page where a user will be able to do an AI-generated quiz.
It takes topic and difficulty as parameters and generates a quiz using AI.
*/

import { generateQuizData } from '@/lib/quiz-service';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Data types for a Quiz
export type Choice = {
    choice_id: string;
    label: string;
    is_correct: boolean;
}

export type Question = {
    question_id: string;
    prompt: string;
    is_active: boolean;
    explanation_true: string;
    explanation_false: string;
    question_type: 'single';
    choices: Choice[];
}

export type Quiz = {
    quiz_id: string;
    title: string;
    description: string;
    questions: Question[];
}

// Get an AI-generated quiz
async function getAIGeneratedQuiz(topic: string, difficulty: 'easy' | 'medium' | 'hard'): Promise<Quiz> {
    try {
        // Use the generateQuizData function which returns properly separated data
        const { quiz, questions, choices } = await generateQuizData({ topic, difficulty });
        
        // Transform the data to match our Quiz structure
        const quizData: Quiz = {
            quiz_id: quiz.quiz_id,
            title: quiz.title,
            description: quiz.description,
            questions: questions.map(q => ({
                question_id: q.question_id,
                prompt: q.prompt,
                question_type: 'single' as const,
                explanation_true: q.explanation_true,
                explanation_false: q.explanation_false,
                is_active: q.is_active,
                choices: choices
                    .filter(c => c.question_id === q.question_id)
                    .map(c => ({
                        choice_id: c.choice_id,
                        label: c.label,
                        is_correct: c.is_correct
                    }))
            }))
        };
        
        // Shuffle the choices for each question
        quizData.questions = quizData.questions.map(q => ({
            ...q,
            choices: shuffle(q.choices)
        }));
        
        return quizData;
    } catch (error) {
        console.error('Error generating AI quiz:', error);
        throw error;
    }
}

// Shuffle around choices
function shuffle<T>(arr: T[]): T[] {
    return [...arr].sort(() => Math.random() - 0.5);
}

// Interface for a quiz
export default function QuizInterface() {
  const router = useRouter();
  const { topic, difficulty } = useLocalSearchParams();
  
  const quizTopic = Array.isArray(topic) ? topic[0] : topic;
  const quizDifficulty = Array.isArray(difficulty) ? difficulty[0] : difficulty;

  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('Generating Quiz...');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [selectedChoiceId, setselectedChoiceId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [score, setScore] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const question = questions[index];

  // useEffect to generate the quiz when page is first loaded
  useEffect(() => {
      (async () => {
        console.log("topic: " + quizTopic)
        console.log("difficulty: " + quizDifficulty)

        if (!quizTopic || !quizDifficulty) {
          setError('Missing topic or difficulty parameters');
          setLoading(false);
          return;
        }
        
        if (!['easy', 'medium', 'hard'].includes(quizDifficulty)) {
          setError('Difficulty must be easy, medium, or hard');
          setLoading(false);
          return;
        }
        
        setLoading(true);
        setError(null);
        try {
            const { title, questions } = await getAIGeneratedQuiz(
                quizTopic, 
                quizDifficulty as 'easy' | 'medium' | 'hard'
            );
            setTitle(title);
            setQuestions(questions);
        } catch (e) {
            console.log('Failed to generate quiz', e);
            setError('Failed to generate quiz. Please try again.');
        } finally {
            setLoading(false);
        }
      })();
  }, [quizTopic, quizDifficulty]);

  // useEffect to reset the user's selected choice when question index changes
  useEffect(() => {
      setselectedChoiceId(null);
      setFeedback(null);
  }, [index]);

    
  // Check if answer is correct
  const is_correct = useMemo(() => {
      if (!question || selectedChoiceId == null) return false;
      const selected = question.choices.find(c => c.choice_id === selectedChoiceId);
      return !!selected && selected.is_correct;
    }, [question, selectedChoiceId]);

  
  // Submit handler: lock feedback and update score
  const submit = () => {
    if (selectedChoiceId == null) return; // no selection yet
    setFeedback(is_correct ? 'correct' : 'incorrect');
    if (is_correct) setScore(s => s + 1);
  };


  // Move to next question or finish
  const next = () => {
    if (index < questions.length - 1) {
      setIndex(i => i + 1);
    } else {
      alert(`Quiz complete! Score: ${score}/${questions.length}`);
      router.navigate('/');
    }
  };

  // Helper to pick right explanation:
  const explanation = useMemo(() => {
    if (!question || feedback === null) return null;
    return feedback === 'correct'
    ? (question.explanation_true ?? null)
    : (question.explanation_false ?? null);
  }, [question, feedback]);

  // Error state
  if (error) {
    return (
      <SafeAreaView style={styles.stateContainer}>
        <Text style={{color: '#ef4444', fontSize: 16, marginBottom: 10}}>{error}</Text>
        <Pressable
          onPress={() => router.navigate('/')}
          style={{backgroundColor: '#2563eb', padding: 12, borderRadius: 8}}
        >
          <Text style={{color: '#fff', fontWeight: '600'}}>Go Back</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  // Loading state
  if (loading) {
    return (
      <SafeAreaView style={styles.stateContainer}>
        <ActivityIndicator size="large" />
        <Text style={{marginTop: 16, fontSize: 16}}>Generating your {quizDifficulty} quiz on {quizTopic}...</Text>
        <Text style={{marginTop: 8, color: '#666', textAlign: 'center'}}>
          This may take a few seconds
        </Text>
      </SafeAreaView>
    );
  }

  // If no questions generated
  if (!question) {
    return (
      <SafeAreaView style={styles.stateContainer}>
        <Text>Failed to generate quiz questions.</Text>
        <Pressable
          onPress={() => router.navigate('/')}
          style={{marginTop: 16, backgroundColor: '#2563eb', padding: 12, borderRadius: 8}}
        >
          <Text style={{color: '#fff', fontWeight: '600'}}>Go Back</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      {/* Header Area */}
      <View style={styles.headerContainer}>
        <Text style={styles.quizTitle}>{title}</Text>
        <Text style={styles.quizProgress}>Question {index + 1} of {questions.length}</Text>
        <View style={styles.aiBadge}>
          <Text style={styles.aiBadgeText}>AI Generated • {quizDifficulty}</Text>
        </View>
      </View>

      {/* Question Prompt Area */}
      <View style={styles.questionPromptContainer}>
        <Text style={styles.questionPromptTitle}>{question.prompt}</Text>
        <Text style={styles.questionPromptSubheader}>Select one answer</Text>
      </View>

      {/* Answers / Choices Area */}
      <View style={styles.answersContainer}>
        {question.choices.map(choice => {
          const selected = selectedChoiceId === choice.choice_id;
          const showCorrect = feedback !== null && choice.is_correct;
          const showIncorrect = feedback === 'incorrect' && selected && !choice.is_correct;

          const bg = showCorrect ? '#d1fae5' :
                      showIncorrect ? '#fee2e2' :
                      selected ? '#e5e7eb' : '#fff';

          const borderColor = showCorrect ? '#10b981' :
                              showIncorrect ? '#ef4444' :
                              selected ? '#2563eb' : '#ddd';

          return (
            <Pressable
              key={choice.choice_id}
              onPress={() => setselectedChoiceId(choice.choice_id)}
              disabled={feedback !== null} // lock after submit
              style={{
                backgroundColor: bg,
                borderColor: borderColor,
                borderWidth: selected ? 2 : 1,
                ...styles.answerBox
              }}
            >
              <Text style={styles.answerText}>{choice.label}</Text>
            </Pressable>
          );
        })}
      </View>

      {/* Submit + Feedback section */}
      <View style={styles.submitContainer}>
        {/* Submit Button */}
        {feedback === null ? (
          <Pressable
            onPress={submit}
            disabled={selectedChoiceId == null}
            style={{
              backgroundColor: selectedChoiceId != null ? '#2563eb' : '#93c5fd',
              ...styles.submitButton
            }}
          >
            <Text style={styles.submitText}>
              {selectedChoiceId == null ? 'Select an answer' : 'Submit Answer'}
            </Text>
          </Pressable>
        ) : (
          <>
            {/* Feedback Block */}
            <View style={[
              styles.feedbackContainer,
              { backgroundColor: feedback === 'correct' ? '#d1fae5' : '#fee2e2' }
            ]}>
              <Text style={{ 
                fontWeight: '600', 
                fontSize: 16,
                color: feedback === 'correct' ? '#10b981' : '#dc2626' 
              }}>
                {feedback === 'correct' ? '✓ Correct!' : '✗ Incorrect'}
              </Text>
              {explanation ? (
                <Text style={{marginTop: 8, color: feedback === 'correct' ? '#065f46' : '#991b1b'}}>
                  {explanation}
                </Text>
              ) : null}
            </View>
            
            {/* Next / Finish button */}
            <Pressable
              onPress={next}
              style={{ 
                backgroundColor: '#10b981', 
                padding: 12, 
                borderRadius: 8, 
                alignItems: 'center', 
                flex: 1 
              }}
            >
              <Text style={{ color: '#fff', fontWeight: '600', fontSize: 16 }}>
                {index < questions.length - 1 ? 'Next Question →' : 'Finish Quiz'}
              </Text>
            </Pressable>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: '#f9fafb'
    },
    headerContainer: {
      padding: 16,
      backgroundColor: "#543cda"
    },
    quizTitle: {
      fontSize: 24,
      fontWeight: '700',
      color: "#fff"
    },
    quizProgress: {
      marginTop: 8,
      color: "#fff",
      fontSize: 14,
      opacity: 0.9
    },
    aiBadge: {
      marginTop: 8,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 12,
      alignSelf: 'flex-start'
    },
    aiBadgeText: {
      fontSize: 12,
      color: "#fff",
      fontWeight: '500'
    },
    questionPromptContainer: {
      paddingHorizontal: 16,
      paddingVertical: 20,
      backgroundColor: '#fff',
      marginVertical: 8,
      borderRadius: 8,
      marginHorizontal: 16
    },
    questionPromptTitle: {
      fontSize: 18,
      fontWeight: '600',
      lineHeight: 24
    },
    questionPromptSubheader: {
      color: '#666',
      marginTop: 8,
      fontSize: 14
    },
    answersContainer: {
      paddingHorizontal: 16,
      flex: 1
    },
    answerBox: {
      padding: 16,
      borderRadius: 12,
      marginVertical: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2
    },
    answerText: {
      fontSize: 16,
      lineHeight: 22
    },
    submitContainer: {
      padding: 16, 
      backgroundColor: '#fff',
      borderTopWidth: 1,
      borderTopColor: '#e5e7eb'
    },
    submitButton: {
      padding: 16,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center'
    },
    submitText: {
      color: "#fff",
      fontWeight: '600',
      fontSize: 16
    },
    feedbackContainer: {
      padding: 16,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 12
    }, 
    stateContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
      backgroundColor: '#f9fafb'
    }
});