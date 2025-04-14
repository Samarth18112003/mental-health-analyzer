
import React from "react";
import { Badge } from "@/components/ui/badge";

interface MentalHealthReportProps {
  report: {
    title: string;
    description: string;
    suggestions: string[];
  };
}

const MentalHealthReport: React.FC<MentalHealthReportProps> = ({ report }) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-medium flex items-center">
          <Badge className="mr-2 bg-blue-600">{report.title}</Badge>
        </h3>
        <p className="mt-2 text-gray-700">{report.description}</p>
      </div>

      <div>
        <h3 className="font-medium text-blue-800 mb-2">Suggestions:</h3>
        <ul className="list-disc pl-5 space-y-1">
          {report.suggestions.map((suggestion, index) => (
            <li key={index} className="text-gray-700">{suggestion}</li>
          ))}
        </ul>
      </div>

      <div className="pt-2 border-t border-gray-200 mt-4">
        <p className="text-sm text-gray-500 italic">
          Remember: This analysis is meant to provide general insights and is not a clinical diagnosis.
        </p>
      </div>
    </div>
  );
};

export default MentalHealthReport;
