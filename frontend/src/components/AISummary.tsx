import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bot, Sparkles, Loader2 } from 'lucide-react';

interface AISummaryProps {
  profileData: any;
}

const API_BASE_URL = 'http://localhost:8888/api/v1';

const AISummary: React.FC<AISummaryProps> = ({ profileData }) => {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSummary = async () => {
      setIsLoading(true);
      try {
        // We only send the metadata to the LLM, not the raw data rows
        const metadata = {
          summary: profileData.summary,
          kpis: profileData.kpis,
          anomalies: profileData.anomalies,
          correlations: profileData.correlations
        };
        
        const res = await axios.post(`${API_BASE_URL}/ai/summary`, {
          profile_data: metadata
        });
        setSummary(res.data.summary);
      } catch (err) {
        console.error(err);
        setSummary("AI Summary could not be generated. Please ensure your Gemini API key is configured.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSummary();
  }, [profileData]);

  if (isLoading) {
    return (
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100 p-6 animate-pulse">
        <div className="flex items-center space-x-3 mb-4">
          <Loader2 className="text-indigo-500 animate-spin" size={24} />
          <h3 className="text-lg font-bold text-indigo-900">AI Executive Summary Generating...</h3>
        </div>
        <div className="h-4 bg-indigo-200/50 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-indigo-200/50 rounded w-full mb-2"></div>
        <div className="h-4 bg-indigo-200/50 rounded w-5/6"></div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100 p-6 shadow-sm">
      <div className="flex items-center space-x-3 mb-4">
        <div className="bg-white p-1.5 rounded-lg shadow-sm">
          <Bot className="text-indigo-600" size={24} />
        </div>
        <h3 className="text-lg font-bold text-indigo-900 flex items-center">
          AI Executive Summary <Sparkles size={16} className="ml-2 text-purple-500" />
        </h3>
      </div>
      <p className="text-indigo-900/80 leading-relaxed text-sm md:text-base font-medium">
        {summary}
      </p>
    </div>
  );
};

export default AISummary;
