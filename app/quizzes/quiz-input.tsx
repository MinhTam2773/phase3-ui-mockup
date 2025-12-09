import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GenerateQuizPage() {
  const router = useRouter();
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard' | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateQuiz = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic');
      return;
    }
    
    if (!difficulty) {
      setError('Please select a difficulty');
      return;
    }
    
    setError('');
    setLoading(true);
    
    // Simulate a small delay for better UX
    setTimeout(() => {
      setLoading(false);
      // Navigate to the quiz page with parameters
      router.push({
        pathname: '/quizzes/quiz',
        params: {
          topic: topic.trim(),
          difficulty: difficulty,
        }
      });
    }, 500);
  };

  const DifficultyButton = ({ 
    level, 
    label, 
    description 
  }: { 
    level: 'easy' | 'medium' | 'hard';
    label: string;
    description: string;
  }) => {
    const isSelected = difficulty === level;
    
    return (
      <TouchableOpacity
        style={[
          styles.difficultyButton,
          isSelected && styles.difficultyButtonSelected,
        ]}
        onPress={() => setDifficulty(level)}
      >
        <View style={styles.difficultyButtonContent}>
          <View style={styles.difficultyButtonHeader}>
            <View style={[
              styles.difficultyIndicator,
              { backgroundColor: getDifficultyColor(level) }
            ]}>
              <Text style={styles.difficultyIndicatorText}>
                {level.charAt(0).toUpperCase()}
              </Text>
            </View>
            <Text style={[
              styles.difficultyLabel,
              isSelected && styles.difficultyLabelSelected
            ]}>
              {label}
            </Text>
            {isSelected && (
              <Ionicons name="checkmark-circle" size={20} color="#543cda" />
            )}
          </View>
          <Text style={styles.difficultyDescription}>{description}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const getDifficultyColor = (level: 'easy' | 'medium' | 'hard') => {
    switch (level) {
      case 'easy': return '#10b981'; // green
      case 'medium': return '#f59e0b'; // amber
      case 'hard': return '#ef4444'; // red
      default: return '#6b7280';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Generate Your Quiz</Text>
          <Text style={styles.subtitle}>
            Choose a topic and difficulty level to create a personalized quiz
          </Text>
        </View>

        <View style={styles.card}>
          {/* Topic Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>What would you like to learn about?</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Mathematics, World History, Biology, Programming..."
              value={topic}
              onChangeText={(text) => {
                setTopic(text);
                setError('');
              }}
              placeholderTextColor="#9ca3af"
              maxLength={50}
            />
            <Text style={styles.inputHint}>
              Be specific for better results (max 50 characters)
            </Text>
          </View>

          {/* Difficulty Selection */}
          <View style={styles.difficultyContainer}>
            <Text style={styles.sectionTitle}>Select Difficulty</Text>
            
            <DifficultyButton
              level="easy"
              label="Easy"
              description="Perfect for beginners or quick reviews"
            />
            
            <DifficultyButton
              level="medium"
              label="Medium"
              description="Challenging questions with some depth"
            />
            
            <DifficultyButton
              level="hard"
              label="Hard"
              description="Expert-level questions with complex concepts"
            />
          </View>

          {/* Error Message */}
          {error ? (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle" size={20} color="#ef4444" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          {/* Generate Button */}
          <TouchableOpacity
            style={[
              styles.generateButton,
              (!topic.trim() || !difficulty || loading) && styles.generateButtonDisabled
            ]}
            onPress={handleGenerateQuiz}
            disabled={!topic.trim() || !difficulty || loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <View style={styles.buttonContent}>
                <Ionicons name="sparkles" size={20} color="#fff" />
                <Text style={styles.generateButtonText}>Generate Quiz</Text>
                <Ionicons name="arrow-forward" size={20} color="#fff" />
              </View>
            )}
          </TouchableOpacity>

          {/* Tips */}
          <View style={styles.tipsContainer}>
            <Text style={styles.tipsTitle}>💡 Tips for best results:</Text>
            <View style={styles.tipItem}>
              <Text style={styles.tipBullet}>•</Text>
              <Text style={styles.tipText}>{`Be specific with your topic (e.g., "Algebra" instead of "Math")`}</Text>
            </View>
            <View style={styles.tipItem}>
              <Text style={styles.tipBullet}>•</Text>
              <Text style={styles.tipText}>Medium difficulty works well for most topics</Text>
            </View>
            <View style={styles.tipItem}>
              <Text style={styles.tipBullet}>•</Text>
              <Text style={styles.tipText}>AI-generated quizzes are unique each time</Text>
            </View>
          </View>
        </View>

        {/* Recent Topics (Optional) */}
        <View style={styles.recentContainer}>
          <Text style={styles.recentTitle}>Popular Topics</Text>
          <View style={styles.recentTopics}>
            {['Mathematics', 'Science', 'History', 'Geography', 'Programming', 'Art'].map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.topicChip}
                onPress={() => {
                  setTopic(item);
                  setDifficulty('medium');
                }}
              >
                <Text style={styles.topicChipText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#543cda',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 22,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#f9fafb',
    color: '#111827',
  },
  inputHint: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 6,
    marginLeft: 4,
  },
  difficultyContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  difficultyButton: {
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#ffffff',
  },
  difficultyButtonSelected: {
    borderColor: '#543cda',
    backgroundColor: '#f5f3ff',
  },
  difficultyButtonContent: {
    flex: 1,
  },
  difficultyButtonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  difficultyIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  difficultyIndicatorText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },
  difficultyLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    flex: 1,
  },
  difficultyLabelSelected: {
    color: '#543cda',
  },
  difficultyDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    paddingLeft: 44, // Align with the indicator
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fee2e2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: '#dc2626',
    marginLeft: 8,
    fontSize: 14,
    flex: 1,
  },
  generateButton: {
    backgroundColor: '#543cda',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#543cda',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  generateButtonDisabled: {
    backgroundColor: '#a5b4fc',
    shadowOpacity: 0,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  generateButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  tipsContainer: {
    backgroundColor: '#f0f9ff',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#0ea5e9',
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0369a1',
    marginBottom: 8,
  },
  tipItem: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  tipBullet: {
    color: '#0ea5e9',
    marginRight: 8,
  },
  tipText: {
    fontSize: 13,
    color: '#0369a1',
    flex: 1,
    lineHeight: 18,
  },
  recentContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  recentTopics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  topicChip: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  topicChipText: {
    color: '#4b5563',
    fontWeight: '500',
  },
});