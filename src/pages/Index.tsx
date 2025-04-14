
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, AlertCircle } from "lucide-react";
import EmotionChart from "@/components/EmotionChart";
import MentalHealthReport from "@/components/MentalHealthReport";
import { analyzeText } from "@/utils/textAnalyzer";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Index = () => {
  const [conversation, setConversation] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<null | {
    emotions: { name: string; value: number }[];
    report: { title: string; description: string; suggestions: string[] };
  }>(null);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!conversation.trim()) {
      setError("Please enter a conversation to analyze");
      return;
    }

    setError("");
    setAnalyzing(true);
    
    try {
      // Simulate API call with our local analyzer
      const analysisResults = await analyzeText(conversation);
      setResults(analysisResults);
    } catch (err) {
      setError("Failed to analyze text. Please try again.");
      console.error(err);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-2">Mental Health Analyzer</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Analyze conversations from your social media to gain insights about emotional patterns and mental well-being.
          </p>
        </header>

        <Card className="mb-8 shadow-lg border-blue-100">
          <CardHeader>
            <CardTitle className="text-blue-800">Conversation Analysis</CardTitle>
            <CardDescription>
              Paste your social media conversation below and click "Analyze" to get your mental health insights.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea 
              placeholder="Paste your conversation here..." 
              className="min-h-[200px] mb-4 focus:border-blue-400 resize-none"
              value={conversation}
              onChange={(e) => setConversation(e.target.value)}
              disabled={analyzing}
            />
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleAnalyze} 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={analyzing}
            >
              {analyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Analyze Conversation"
              )}
            </Button>
          </CardFooter>
        </Card>

        {results && (
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-lg border-blue-100">
              <CardHeader>
                <CardTitle className="text-blue-800">Emotion Analysis</CardTitle>
                <CardDescription>
                  Emotional breakdown based on conversation content
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <EmotionChart emotions={results.emotions} />
              </CardContent>
            </Card>

            <Card className="shadow-lg border-blue-100">
              <CardHeader>
                <CardTitle className="text-blue-800">Mental Health Insights</CardTitle>
                <CardDescription>
                  Assessment based on conversational patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MentalHealthReport report={results.report} />
              </CardContent>
            </Card>
          </div>
        )}

        <footer className="mt-10 text-center text-sm text-gray-500">
          <p>
            Disclaimer: This tool provides basic analysis and is not a substitute for professional mental health advice.
            Please consult with a healthcare provider for any concerns about your mental well-being.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
