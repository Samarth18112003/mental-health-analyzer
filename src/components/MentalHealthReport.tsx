
import React from "react";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, HelpCircle, AlertCircle, Heart } from "lucide-react";

interface MentalHealthReportProps {
  report: {
    title: string;
    description: string;
    suggestions: string[];
  };
}

const MentalHealthReport: React.FC<MentalHealthReportProps> = ({ report }) => {
  // Determine which icon to show based on the report title
  const getReportIcon = () => {
    if (report.title.includes("Distress")) {
      return <AlertCircle className="mr-2 h-5 w-5 text-red-500" />;
    } else if (report.title.includes("Frustration")) {
      return <AlertTriangle className="mr-2 h-5 w-5 text-orange-500" />;
    } else if (report.title.includes("Uncertainty")) {
      return <HelpCircle className="mr-2 h-5 w-5 text-blue-500" />;
    } else if (report.title.includes("Positive")) {
      return <Heart className="mr-2 h-5 w-5 text-green-500" />;
    } else if (report.title.includes("Balanced") || report.title.includes("Mixed")) {
      return <CheckCircle className="mr-2 h-5 w-5 text-blue-600" />;
    } else {
      return null;
    }
  };

  // Determine badge color based on report type
  const getBadgeColor = () => {
    if (report.title.includes("Distress")) {
      return "bg-red-600";
    } else if (report.title.includes("Frustration")) {
      return "bg-orange-500";
    } else if (report.title.includes("Uncertainty")) {
      return "bg-blue-500";
    } else if (report.title.includes("Positive")) {
      return "bg-green-600";
    } else {
      return "bg-blue-600";
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-medium flex items-center">
          {getReportIcon()}
          <Badge className={`mr-2 ${getBadgeColor()}`}>{report.title}</Badge>
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
