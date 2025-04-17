
// Simple emotion patterns to search for in text
const emotionPatterns = {
  happy: [
    /happy|joy|excited|thrilled|delighted|pleased|glad|content|cheerful|wonderful|fantastic|amazing|great|perfect|excellent|blessed|ecstatic|euphoric|overjoyed|elated|jubilant|blissful|grateful|thankful|appreciative|satisfied|proud|accomplished|hopeful|optimistic/gi,
    /😊|😃|😄|😁|🙂|😀|😇|🥰|😍|🤗|❤️|💕|💖|🎉|✨|🌟|💪|👍|🙌|🤩|😎/g,
    /love this|made my day|feeling good|so happy|best day|can't stop smiling|love it when|grateful for|lucky to|blessed to|proud of|thanks for|thank you|looking forward|excited about/gi,
  ],
  sad: [
    /sad|unhappy|depressed|down|blue|upset|miserable|heartbroken|disappointed|gloomy|hopeless|grief|sorrow|alone|lonely|worthless|helpless|tired|exhausted|empty|devastated|crushed|broken|hurt|painful|suffering|despair|despondent|melancholy|regretful|unfortunate|tragic|crying|tears|sobbing|weeping|mourning/gi,
    /😢|😭|😔|😞|😥|💔|😪|😓|🥺|😟|☹️|😩|😰|😿|😫|🖤|👎|😕|🤕|💧|🌧️/g,
    /feel like crying|want to disappear|no one cares|nobody understands|so tired of|can't take|too much to handle|just want to sleep|don't want to|no energy to|feeling empty|missing|hurts when|worst day|hate when|wish I could|tired of trying|gave up|losing hope|lost interest/gi,
  ],
  angry: [
    /angry|mad|furious|irritated|annoyed|frustrated|rage|hate|outraged|hostile|resentment|bitter|enraged|pissed|upset|disgusted|aggressive|fuming|irate|livid|seething|exasperated|indignant|offended|provoked|resentful|fed up|ticked off|outraged|incensed/gi,
    /😠|😡|🤬|💢|👿|😤|😒|🙄|😑|🤯|👊|🔥|💥|⚡|🗯️|😾|🚫|❌|⛔|🙅/g,
    /so annoying|can't stand|fed up with|sick of|hate when|pisses me off|getting on my nerves|drives me crazy|what the hell|wtf|shut up|leave me alone|don't talk to me|get out|go away|whatever|over it|done with|unfair|unfollowing|blocking|reported|not okay|that's it|last straw|seriously/gi,
  ],
  anxious: [
    /anxious|worried|nervous|stressed|tense|uneasy|afraid|scared|fearful|panic|dread|anxiety|overthinking|apprehensive|restless|overwhelmed|frazzled|racing thoughts|insomnia|doubt|concern|jittery|freaking out|on edge|terrified|alarmed|troubled|distressed|concerned|hesitant|uncertain|unnerved|unsettled|wary|worried sick|paranoid/gi,
    /😰|😨|😧|😱|😖|😣|😫|😬|🤭|🥴|🤢|😵|🫣|🫠|🫥|🤯|⏰|⚠️|⁉️|❓|⚡/g, 
    /what if|can't sleep|can't stop thinking|losing my mind|worried about|scared that|afraid of|hope nothing|don't know what to do|too much pressure|can't handle|can't deal|how am I going to|should I|not sure if|need advice|nervous about|stressing over|freaking out|having a breakdown|panic attack|heart racing|breathing|chest tight|dizzy/gi,
  ],
  calm: [
    /calm|peaceful|relaxed|tranquil|serene|composed|collected|centered|balanced|mindful|zen|content|soothing|quiet|still|meditative|grounded|harmonious|easy|chill|untroubled|settled|steady|gentle|mellow|comforted|secure|unbothered|carefree|cool/gi,
    /😌|😏|😎|🧘|💆|🌈|🌊|🌅|✨|🌸|🍃|🧠|🌿|☮️|🏝️|🌄|🌠|☕|🫶|🧿|💙/g,
    /taking it easy|one step at a time|going with the flow|letting go|deep breath|no worries|no rush|all good|at peace|in the moment|finding balance|taking time|enjoying silence|clear mind|letting things be|taking it slow|not stressing|what will be will be|everything happens|in harmony|quiet time|me time/gi,
  ],
  confused: [
    /confused|unsure|perplexed|puzzled|bewildered|uncertain|unclear|doubtful|ambivalent|lost|disoriented|baffled|stumped|muddled|dazed|befuddled|mystified|thrown off|mixed up|confounded|clueless|misunderstood|blindsided|ambiguous|complicated/gi,
    /🤔|🙃|😕|😵|🥴|❓|❔|🤨|🧐|😳|😲|🤷|❌|📝|📊|🔍|🤪|↔️|🌀/g,
    /don't understand|makes no sense|what does this mean|not following|hard to understand|can't figure out|can someone explain|help me understand|not sure what|confused about|mixed signals|wait what|huh|not getting it|unclear|am I missing|lost track|didn't get that|how does this|needs clarification|could someone|complicated/gi,
  ],
  neutral: [
    /okay|fine|alright|whatever|meh|normal|usual|typical|standard|average|moderate|so-so|fair|decent|satisfactory|acceptable|tolerable|adequate|passable|reasonable|unremarkable|ordinary|plain|simple/gi,
    /😐|🤷|👍|👌|👋|🤝|👀|🔄|⚪|⬜|⚫|⬛|⭐|📊|📋|📝|🔍|🧮/g,
    /it is what it is|doesn't matter|same as usual|nothing special|could be worse|could be better|not bad|not great|just okay|just fine|nothing much|same old|another day|moving on|whatever works|if you say so|sure thing|as expected|like always|the usual|regular day|regular stuff/gi,
  ],
};

// Word patterns that indicate depression or anxiety specifically
const depressionAnxietyIndicators = [
  /can't sleep|insomnia|nightmares|sleep problems|trouble sleeping|wake up|tossing and turning|exhausted|fatigue|tired all the time/gi,
  /don't want to|no energy|exhausted|tired all the time|too tired to|can't get out of bed|always in bed|staying in bed|no motivation/gi,
  /hate myself|hate my life|worthless|no point|pointless|not worth it|better off without me|burden|everyone would be better|nobody would notice|nobody would care|don't deserve|deserves better/gi,
  /nobody cares|no one understands|alone|lonely|isolated|by myself|no friends|no support|abandoned|left behind|rejected|ignored|invisible|forgotten|overlooked|pushed aside|cast out|unwanted/gi,
  /too much pressure|can't handle|can't cope|overwhelmed|drowning|suffocating|crushing|breaking|shattering|crumbling|falling apart|spiraling|downward|collapsing|imploding/gi,
  /panic attack|heart racing|breathing|chest tight|dizzy|lightheaded|fainting|shaking|trembling|sweating|hot flashes|cold sweats|nausea|throwing up|sick to my stomach/gi,
  /what if|worry about|keep thinking about|obsessing over|can't stop thinking|intrusive thoughts|racing thoughts|mind won't stop|thoughts won't stop|mental loop|stuck in my head/gi,
  /feel like a failure|not good enough|disappointing|let down|inadequate|incompetent|incapable|useless|stupid|dumb|idiot|loser|mess up|screw up|messed up|ruined|wrecked|destroyed/gi,
  /wish I could|wish I wasn't|wish I didn't|wish it would end|wish I could disappear|wish I wasn't here|wish I could sleep forever|wish I could vanish|wish it was over/gi,
  /can't focus|distracted|mind racing|scattered thoughts|brain fog|cloudy thinking|confusion|disoriented|lost track|spaced out|zoning out|checked out|disconnected|detached|numb/gi,
  /nothing matters|what's the point|why bother|given up|lost hope|hopeless|helpless|powerless|trapped|cornered|backed into|no way out|dead end|no options|no choices/gi,
  /stuck|trapped|no way out|no escape|hopeless situation|impossible situation|can't win|lose-lose|damned if I do|damned if I don't|between a rock|hard place/gi,
  /always anxious|constant worry|can't relax|can't stop thinking|on edge|keyed up|wound up|strung out|stressed out|freaking out|breaking down|falling apart|losing it|losing my mind/gi,
  /no future|bleak future|dark future|no tomorrow|no point|what's the use|giving up|throwing in the towel|calling it quits|ending it all|final solution|permanent solution/gi,
  /self-harm|cutting|hurting myself|punishing myself|deserve pain|deserve to suffer|want to feel something|need to feel|only way to cope|only release|only relief|only escape/gi
];

// Simple text sentiments to determine mental health state
const mentalhealthAssessment = (emotionScores: Record<string, number>, text: string) => {
  // Check for specific depression/anxiety indicator phrases and boost those scores if found
  let depressionAnxietyBoost = 0;
  
  depressionAnxietyIndicators.forEach(pattern => {
    const matches = text.match(pattern) || [];
    if (matches.length > 0) {
      depressionAnxietyBoost += matches.length * 20; // Increased boost per match
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

  // Adjusting the thresholds to be more sensitive to emotional content
  const sadAndAnxiousScore = normalizedScores.sad + normalizedScores.anxious;
  const happyAndCalmScore = normalizedScores.happy + normalizedScores.calm;
  const angryScore = normalizedScores.angry;
  const confusedScore = normalizedScores.confused;
  const neutralScore = normalizedScores.neutral;
  
  // Enhanced assessment types with more sensitive thresholds
  if (sadAndAnxiousScore > 35) { // Lowered threshold for detecting distress
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
  } else if (angryScore > 25) { // Lowered threshold for detecting frustration
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
  } else if (confusedScore > 20) { // Lowered threshold for detecting uncertainty
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
  } else if (happyAndCalmScore > 35) { // Lowered threshold for detecting positive emotions
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
  } else if (neutralScore > 25 && sadAndAnxiousScore < 20) { // Adjusted threshold for neutral state
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
  
  // Count emotion occurrences with increased sensitivity
  const emotionCounts: Record<string, number> = {
    happy: 0,
    sad: 0,
    angry: 0,
    anxious: 0,
    calm: 0,
    confused: 0,
    neutral: 0,
  };
  
  // Check text against each emotion pattern with more weight on explicit emotional language
  Object.entries(emotionPatterns).forEach(([emotion, patterns]) => {
    patterns.forEach((pattern, index) => {
      const matches = text.match(pattern) || [];
      // Give more weight to explicit emotional phrases (index 2) than to simple words or emojis
      const weight = index === 2 ? 2.5 : index === 0 ? 1.5 : 1;
      emotionCounts[emotion] += matches.length * weight;
    });
  });
  
  // Calculate total matches
  const totalMatches = Object.values(emotionCounts).reduce((sum, count) => sum + count, 0) || 1;
  
  // Reduce the minimum bias - make the system more responsive to actual content
  const minEmotionValue = 0.5;
  
  // Add minimum values to ensure chart always has data
  Object.keys(emotionCounts).forEach(emotion => {
    if (emotionCounts[emotion] === 0) {
      emotionCounts[emotion] = minEmotionValue;
    }
  });
  
  // If text is very short or has very little emotional content, reduce the neutral bias
  if (totalMatches < 5 || text.length < 20) {
    // Make neutral less dominant in cases of very little input
    emotionCounts.neutral = Math.min(emotionCounts.neutral, 5);
  }
  
  // Detect signs of depression or anxiety specifically for very subtle cases
  if (text.length > 30) {
    // Look for subtle indicators
    let subtleDepression = 0;
    let subtleAnxiety = 0;
    
    // Check for words like "tired", "exhausted" which might indicate depression
    if (/tired|exhausted|no energy|drained|weary|fatigued|lethargic|sleepy|drowsy|beat|worn out/gi.test(text)) {
      subtleDepression += 5;
    }
    
    // Check for words indicating overthinking which might signal anxiety
    if (/overthinking|thinking too much|can't stop thinking|what if|worried|concerned|stress|pressure/gi.test(text)) {
      subtleAnxiety += 5;
    }
    
    // Apply subtle boosts
    emotionCounts.sad += subtleDepression;
    emotionCounts.anxious += subtleAnxiety;
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
