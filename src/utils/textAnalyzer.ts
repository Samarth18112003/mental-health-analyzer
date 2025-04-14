
// Simple emotion patterns to search for in text
const emotionPatterns = {
  happy: [
    /happy|joy|excited|thrilled|delighted|pleased|glad|content|cheerful|wonderful|fantastic|amazing/gi,
    /😊|😃|😄|😁|🙂|😀|😇|🥰|😍|🤗|❤️|💕|💖/g,
  ],
  sad: [
    /sad|unhappy|depressed|down|blue|upset|miserable|heartbroken|disappointed|gloomy|hopeless/gi,
    /😢|😭|😔|😞|😥|💔|😪|😓|🥺|😟|☹️|😩/g,
  ],
  angry: [
    /angry|mad|furious|irritated|annoyed|frustrated|rage|hate|outraged|hostile/gi,
    /😠|😡|🤬|💢|👿|😤|😒|🙄|😑|🤯/g,
  ],
  anxious: [
    /anxious|worried|nervous|stressed|tense|uneasy|afraid|scared|fearful|panic|dread/gi,
    /😰|😨|😧|😱|😖|😣|😫|😬|🤭|🥴/g,
  ],
  calm: [
    /calm|peaceful|relaxed|tranquil|serene|composed|collected|centered|balanced|mindful/gi,
    /😌|😏|😎|🧘|💆|🌈|🌊|🌅|✨|🌸/g,
  ],
  confused: [
    /confused|unsure|perplexed|puzzled|bewildered|uncertain|unclear|doubtful|ambivalent/gi,
    /🤔|🙃|😕|😵|🥴|❓|❔|🤨/g,
  ],
  neutral: [
    /okay|fine|alright|whatever|meh|normal|usual|typical/gi,
    /😐|🤷|👍|👌/g,
  ],
};

// Simple text sentiments to determine mental health state
const mentalhealthAssessment = (emotionScores: Record<string, number>) => {
  const highestEmotion = Object.entries(emotionScores).reduce(
    (a, b) => (a[1] > b[1] ? a : b)
  )[0];

  const sadAndAnxiousScore = emotionScores.sad + emotionScores.anxious;
  const happyAndCalmScore = emotionScores.happy + emotionScores.calm;
  const angryScore = emotionScores.angry;
  const confusedScore = emotionScores.confused;
  const neutralScore = emotionScores.neutral;
  
  // Define assessment types based on emotion combinations
  if (sadAndAnxiousScore > 50) {
    return {
      title: "Possible Signs of Distress",
      description: "Your conversation shows signs of sadness and anxiety. These emotions are normal, but their prevalence might indicate some emotional distress.",
      suggestions: [
        "Consider practicing mindfulness or meditation",
        "Reach out to friends or family for support",
        "Try journaling about your feelings",
        "Consider speaking with a mental health professional"
      ]
    };
  } else if (angryScore > 35) {
    return {
      title: "High Frustration Detected",
      description: "Your conversation shows significant signs of anger or frustration, which can impact your well-being if persistent.",
      suggestions: [
        "Try breathing exercises when feeling overwhelmed",
        "Engage in physical activity to release tension",
        "Practice identifying triggers for your frustration",
        "Consider anger management techniques"
      ]
    };
  } else if (confusedScore > 30) {
    return {
      title: "Uncertainty Indicated",
      description: "Your conversation indicates confusion or uncertainty, which might be causing some stress or cognitive dissonance.",
      suggestions: [
        "Break complex problems into smaller parts",
        "Seek clarity through direct communication",
        "Make lists to organize your thoughts",
        "Take time for reflection and processing"
      ]
    };
  } else if (happyAndCalmScore > 50) {
    return {
      title: "Positive Outlook",
      description: "Your conversation shows a predominantly positive emotional state, with good levels of happiness and calm.",
      suggestions: [
        "Continue practicing what brings you joy",
        "Share your positive energy with others",
        "Document these positive moments for future reflection",
        "Build on this foundation for continued well-being"
      ]
    };
  } else if (neutralScore > 40) {
    return {
      title: "Emotionally Balanced",
      description: "Your conversation shows a fairly neutral emotional state, which may indicate emotional stability or potential emotional suppression.",
      suggestions: [
        "Check in with yourself regularly about how you're truly feeling",
        "Try activities that bring you joy and engagement",
        "Practice expressing emotions in healthy ways",
        "Maintain your balanced perspective"
      ]
    };
  } else {
    return {
      title: "Mixed Emotional State",
      description: `Your conversation shows a mix of emotions with ${highestEmotion} being slightly more prevalent. This is normal and indicates healthy emotional range.`,
      suggestions: [
        "Continue monitoring your emotional patterns",
        "Practice self-awareness about emotional triggers",
        "Maintain supportive connections with others",
        "Consider regular check-ins with yourself about your mental state"
      ]
    };
  }
};

export const analyzeText = async (text: string) => {
  // Simulate processing time
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  // Count emotion occurrences
  const emotionCounts: Record<string, number> = {
    happy: 0,
    sad: 0,
    angry: 0,
    anxious: 0,
    calm: 0,
    confused: 0,
    neutral: 0,
  };
  
  // Check text against each emotion pattern
  Object.entries(emotionPatterns).forEach(([emotion, patterns]) => {
    patterns.forEach(pattern => {
      const matches = text.match(pattern) || [];
      emotionCounts[emotion] += matches.length;
    });
  });
  
  // Calculate total matches
  const totalMatches = Object.values(emotionCounts).reduce((sum, count) => sum + count, 0) || 1;
  
  // Convert counts to percentages and prepare for chart
  const emotions = Object.entries(emotionCounts).map(([name, count]) => {
    const value = (count / totalMatches) * 100;
    return { name, value };
  });
  
  // If no significant emotional content is detected, adjust neutral score
  if (totalMatches < 5) {
    const neutralIndex = emotions.findIndex(e => e.name === "neutral");
    if (neutralIndex !== -1) {
      emotions[neutralIndex].value = 70;
      
      // Adjust other emotions accordingly
      emotions.forEach((emotion, index) => {
        if (index !== neutralIndex) {
          emotion.value = (30 / (emotions.length - 1));
        }
      });
    }
  }
  
  // Sort by value descending
  emotions.sort((a, b) => b.value - a.value);
  
  // Filter out emotions with 0%
  const filteredEmotions = emotions.filter(emotion => emotion.value > 0);
  
  // Create emotion percentage object for assessment
  const emotionPercentages = emotions.reduce((obj, emotion) => {
    obj[emotion.name] = emotion.value;
    return obj;
  }, {} as Record<string, number>);
  
  // Get mental health assessment
  const report = mentalhealthAssessment(emotionPercentages);
  
  return {
    emotions: filteredEmotions,
    report
  };
};
