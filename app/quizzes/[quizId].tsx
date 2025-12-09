/* This is the page where a user will be able to do a quiz, given a parameter of quizID.
For testing purposes, quizId 1 = Elden Theory.

It takes in info from the supabase API and database, 
and gives an interactable quiz for the user to solve.

*/

import { supabase } from '@/lib/supabase';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Data types for a Quiz, based off of database tables
export type Choice = {
    choice_id: number;
    label: string;
    is_correct: boolean;
}

export type Question = {
    question_id: number;
    prompt: string;
    is_active: boolean;
    explanation_true: string;
    explanation_false: string;
    question_type: 'single';
    choices: Choice[];
    
}

export type Quiz = {
        quiz_id: number;
        title: string;
        description: string;
        questions: Question[]

    }

// Get a quiz + questions from the Supabase Database, given a quizId
export async function getQuiz(quizId: number): Promise<Quiz> {
    const { data, error } = await supabase
    .from('quizzes')
    .select(`
        quiz_id,
        title,
        description,
            questions:questions (
            question_id,
            prompt, 
            question_type,
            explanation_true,
            explanation_false,
            is_active,
                choices:choices (
                choice_id,
                label,
                is_correct))`)
        .eq('quiz_id', quizId)
        .eq('is_published', true)
        .limit(1)
        .single();

    if (error) throw error;
    
    const questions = (data.questions ?? []).map((q: any) => ({
        ...q,
        choices: shuffle(q.choices ?? []),
    }));

    // return a quiz along with an array of questions related to that quiz
    return { quiz_id: data.quiz_id, title: data.title, description: data.description, questions };
} 

// Shuffle around questions
function shuffle<T>(arr: T[]): T[] {
    return [...arr].sort(() => Math.random() - 0.5);
}

// Interface for a quiz
export default function QuizInterface() {

  const router = useRouter();

  const {quizId: quizIdParam} = useLocalSearchParams();
  const quizId = Array.isArray(quizIdParam) ? Number(quizIdParam[0]) : Number(quizIdParam);

  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState(`test`);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [selectedChoiceId, setselectedChoiceId] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [score, setScore] = useState(0);

  const question = questions[index];

  // useEffect to load in the quiz from database when page is first loaded (given a quizId)
  useEffect(() => {
      (async () => {
        if (!quizId) {
          setLoading(false);
          return;
        }
          setLoading(true);
          try {
              const {title, questions } = await getQuiz(quizId);
              setTitle(title);
              setQuestions(questions);
          } catch (e) {
              console.log('Failed to load quiz', e);
          } finally {
              setLoading(false);
          }
      })();
  }, [quizId]);

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



// Render states
  // Loading state
  if (loading) {
    return (
      <SafeAreaView style={styles.stateContainer}>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  // If no questions / rows selected from database
  if (!question) {
    return (
      <SafeAreaView style={styles.stateContainer}>
        <Text>No single-choice questions available.</Text>
      </SafeAreaView>
    );
  }

    return (
    <SafeAreaView style={styles.mainContainer}>
      {/* Header Area */}
      <View style={styles.headerContainer}>
        <Text style={styles.quizTitle}>{title}</Text>
        <Text style={styles.quizProgress}>Question {index + 1} of {questions.length}</Text>
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

          return (
            <Pressable
              key={choice.choice_id}
              onPress={() => setselectedChoiceId(choice.choice_id)}
              disabled={feedback !== null} // lock after submit
              style={{
                backgroundColor: bg,
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
            <Text style={styles.submitText}>Submit</Text>
          </Pressable>
        ) : (
          <>
          {/* Feedback Block */}
            <View style={styles.feedbackContainer}>
              <Text style={{ fontWeight: '600', color: feedback === 'correct' ? '#00ac42ff' : '#7f1d1d' }}>
                {feedback === 'correct' ? 'Correct!' : 'Incorrect'}
              </Text>
              {explanation ? (
                <Text style={{marginTop: 8, color: '#888'}}>{explanation}</Text>
              ) : (
                <Text></Text>
              )}
            </View>
            {/* Next / Finish button */}
            <Pressable
              onPress={next}
              style={{ backgroundColor: '#00ac42ff', padding: 12, borderRadius: 8, alignItems: 'center', flex: 1 }}
            >
              <Text style={{ color: '#fff', fontWeight: '600' }}>
                {index < questions.length - 1 ? 'Next' : 'Finish'}
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
      flex: 1
    },
    headerContainer: {
      padding: 16,
      backgroundColor: "#543cda"
    },
    quizTitle: {
      fontSize: 26,
      fontWeight: '600',
      color: "#ffff"
    },
    quizProgress: {
      marginTop: 8,
      color: "#ffff"

    },
    questionPromptContainer: {
      paddingHorizontal: 16,
      paddingVertical: 8
    },
    questionPromptTitle: {
      fontSize: 18
    },
    questionPromptSubheader: {
      color: '#666',
      marginTop: 4
    },
    answersContainer: {
      paddingHorizontal: 16
    },
    answerBox: {
      padding: 12,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ddd',
      marginVertical: 6
    },
    answerText: {
      fontSize: 16
    },
    submitContainer: {
      padding: 16, 
      flexDirection: 'column',
      gap: 12
    },
    submitButton: {
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center'
    },
    submitText: {
      color: "#ffff",
      fontWeight: '600',
      textAlign: 'center',

    },
    feedbackContainer: {
      alignItems: 'center',
      justifyContent: 'center'
    }, 
    stateContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }
})