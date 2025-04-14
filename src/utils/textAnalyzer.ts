
// Simple emotion patterns to search for in text
const emotionPatterns = {
  happy: [
    /happy|joy|excited|thrilled|delighted|pleased|glad|content|cheerful|wonderful|fantastic|amazing|great|perfect|excellent/gi,
    /😊|😃|😄|😁|🙂|😀|😇|🥰|😍|🤗|❤️|💕|💖/g,
  ],
  sad: [
    /sad|unhappy|depressed|down|blue|upset|miserable|heartbroken|disappointed|gloomy|hopeless|grief|sorrow|alone|lonely|worthless|helpless|tired|exhausted|empty/gi,
    /😢|😭|😔|😞|😥|💔|😪|😓|🥺|😟|☹️|😩/g,
  ],
  angry: [
    /angry|mad|furious|irritated|annoyed|frustrated|rage|hate|outraged|hostile|resentment|bitter|enraged|pissed|upset|disgusted|aggressive/gi,
    /😠|😡|🤬|💢|👿|😤|😒|🙄|😑|🤯/g,
  ],
  anxious: [
    /anxious|worried|nervous|stressed|tense|uneasy|afraid|scared|fearful|panic|dread|anxiety|overthinking|apprehensive|restless|overwhelmed|frazzled|racing thoughts|insomnia|doubt|concern|jittery/gi,
    /😰|😨|😧|😱|😖|😣|😫|😬|🤭|🥴/g,
  ],
  calm: [
    /calm|peaceful|relaxed|tranquil|serene|composed|collected|centered|balanced|mindful|zen|content/gi,
    /😌|😏|😎|🧘|💆|🌈|🌊|🌅|✨|🌸/g,
  ],
  confused: [
    /confused|unsure|perplexed|puzzled|bewildered|uncertain|unclear|doubtful|ambivalent|lost|disoriented/gi,
    /🤔|🙃|😕|😵|🥴|❓|❔|🤨/g,
  ],
  neutral: [
    /okay|fine|alright|whatever|meh|normal|usual|typical/gi,
    /😐|🤷|👍|👌/g,
  ],
};

// Word patterns that indicate depression or anxiety specifically
const depressionAnxietyIndicators = [
  /can't sleep|insomnia|nightmares/gi,
  /don't want to|no energy|exhausted|tired all the time/gi,
  /hate myself|hate my life|worthless|no point|pointless/gi,
  /nobody cares|no one understands|alone|lonely|isolated/gi,
  /too much pressure|can't handle|can't cope|overwhelmed/gi,
  /panic attack|heart racing|breathing|chest tight|dizzy/gi,
  /what if|worry about|keep thinking about|obsessing over/gi,
  /feel like a failure|not good enough|disappointing|let down/gi,
  /wish I could|wish I wasn't|wish I didn't|wish it would end/gi,
  /can't focus|distracted|mind racing|scattered thoughts/gi,
  /nothing matters|what's the point|why bother|given up/gi,
  /stuck|trapped|no way out|no escape|hopeless situation/gi,
  /always anxious|constant worry|can't relax|can't stop thinking/gi
];

// Simple text sentiments to determine mental health state
const mentalhealthAssessment = (emotionScores: Record<string, number>, text: string) => {
  // Check for specific depression/anxiety indicator phrases and boost those scores if found
  let depressionAnxietyBoost = 0;
  
  depressionAnxietyIndicators.forEach(pattern => {
    const matches = text.match(pattern) || [];
    if (matches.length > 0) {
      depressionAnxietyBoost += matches.length * 15; // Significant boost per match
    }
  });
  
  // Apply the boost to sad and anxious scores
  emotionScores.sad += depressionAnxietyBoost;
  emotionScores.anxious += depressionAnxietyBoost;
  
  // Recalculate percentages after the boost
  const totalScore = Object.values(emotionScores).reduce((sum, score) => sum + score, 0);
  const normalizedScores: Record<string, number> = {};
  
  Object.entries(emotionScores).forEach(([emotion, score]) => {
    normalizedScores[emotion] = (score / totalScore) * 100;
  });
  
  const highestEmotion = Object.entries(normalizedScores).reduce(
    (a, b) => (a[1] > b[1] ? a : b)
  )[0];

  const sadAndAnxiousScore = normalizedScores.sad + normalizedScores.anxious;
  const happyAndCalmScore = normalizedScores.happy + normalizedScores.calm;
  const angryScore = normalizedScores.angry;
  const confusedScore = normalizedScores.confused;
  const neutralScore = normalizedScores.neutral;
  
  // Enhanced assessment types with more nuanced thresholds
  if (sadAndAnxiousScore > 40) {
    return {
      title: "Signs of Emotional Distress",
      description: "Your conversation shows significant indicators of sadness and anxiety. These patterns suggest you might be experiencing some emotional distress.",
      suggestions: [
        "Consider practicing mindfulness or meditation",
        "Reach out to trusted friends or family for support",
        "Try journaling about your feelings and thoughts",
        "Consider speaking with a mental health professional",
        "Remember that seeking help is a sign of strength"
      ]
    };
  } else if (angryScore > 30) {
    return {
      title: "High Frustration Detected",
      description: "Your conversation shows significant signs of anger or frustration, which can impact your well-being if persistent.",
      suggestions: [
        "Try breathing exercises when feeling overwhelmed",
        "Engage in physical activity to release tension",
        "Practice identifying triggers for your frustration",
        "Consider anger management techniques",
        "Take short breaks when you feel emotions intensifying"
      ]
    };
  } else if (confusedScore > 25) {
    return {
      title: "Uncertainty Indicated",
      description: "Your conversation indicates confusion or uncertainty, which might be causing some stress or cognitive dissonance.",
      suggestions: [
        "Break complex problems into smaller parts",
        "Seek clarity through direct communication",
        "Make lists to organize your thoughts",
        "Take time for reflection and processing",
        "Try focusing on what you can control"
      ]
    };
  } else if (happyAndCalmScore > 40) {
    return {
      title: "Positive Outlook",
      description: "Your conversation shows a predominantly positive emotional state, with good levels of happiness and calm.",
      suggestions: [
        "Continue practicing what brings you joy",
        "Share your positive energy with others",
        "Document these positive moments for future reflection",
        "Build on this foundation for continued well-being",
        "Maintain your supportive connections"
      ]
    };
  } else if (neutralScore > 30 && sadAndAnxiousScore < 20) {
    return {
      title: "Emotionally Balanced",
      description: "Your conversation shows a fairly neutral emotional state, which may indicate emotional stability or potential emotional suppression.",
      suggestions: [
        "Check in with yourself regularly about how you're truly feeling",
        "Try activities that bring you joy and engagement",
        "Practice expressing emotions in healthy ways",
        "Maintain your balanced perspective",
        "Consider if you're holding back any emotions that need expression"
      ]
    };
  } else {
    return {
      title: "Mixed Emotional State",
      description: `Your conversation shows a mix of emotions with ${highestEmotion} being more prevalent. This is normal and indicates healthy emotional range.`,
      suggestions: [
        "Continue monitoring your emotional patterns",
        "Practice self-awareness about emotional triggers",
        "Maintain supportive connections with others",
        "Consider regular check-ins with yourself about your mental state",
        "Balance different aspects of your emotional life"
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
  
  // By default, we'll set a minimum for each emotion to ensure there's always some data to display
  const minEmotionValue = 1;
  
  // Add minimum values to ensure chart always has data
  Object.keys(emotionCounts).forEach(emotion => {
    if (emotionCounts[emotion] === 0) {
      emotionCounts[emotion] = minEmotionValue;
    }
  });
  
  // If no significant emotional content is detected, reduce the neutral bias
  if (totalMatches < 5) {
    // Instead of boosting neutral, distribute more evenly
    emotionCounts.neutral = 10;  // Still slightly higher than others
    emotionCounts.sad = 5;
    emotionCounts.anxious = 5;
    emotionCounts.happy = 3;
    emotionCounts.angry = 3;
    emotionCounts.confused = 3;
    emotionCounts.calm = 3;
  }
  
  // Get mental health assessment
  const report = mentalhealthAssessment(emotionCounts, text);
  
  // Convert counts to percentages and prepare for chart
  const totalUpdatedCount = Object.values(emotionCounts).reduce((sum, count) => sum + count, 0);
  
  const emotions = Object.entries(emotionCounts).map(([name, count]) => {
    const value = (count / totalUpdatedCount) * 100;
    return { name, value };
  });
  
  // Sort by value descending
  emotions.sort((a, b) => b.value - a.value);
  
  return {
    emotions: emotions,
    report
  };
};
