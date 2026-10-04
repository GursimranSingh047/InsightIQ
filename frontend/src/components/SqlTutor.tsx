import React, { useState } from 'react';
import axios from 'axios';
import { Send, Terminal, Activity, BookOpen, Brain, Zap, HelpCircle } from 'lucide-react';

interface SqlTutorProps {
  schemaInfo: any;
  datasetName: string;
}

const API_BASE_URL = 'http://localhost:8888/api/v1';

const SqlTutor: React.FC<SqlTutorProps> = ({ schemaInfo, datasetName }) => {
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const res = await axios.post(`${API_BASE_URL}/ai/sql-tutor`, {
        question,
        schema_info: schemaInfo
      });
      setResponse(res.data);
    } catch (err: any) {
      setError('Failed to fetch AI response. Please check your API key.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-8 mb-8 text-white shadow-lg">
        <div className="flex items-center space-x-4 mb-4">
          <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
            <Brain size={32} className="text-blue-100" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">AI SQL Tutor</h2>
            <p className="text-blue-200 mt-1">Translate English to SQL and learn line-by-line.</p>
          </div>
        </div>
        <p className="text-sm text-blue-200 mt-4 opacity-80">Active Dataset: {datasetName}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Ask & Schema */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <HelpCircle className="mr-2 text-blue-600" size={20} /> Ask a Question
            </h3>
            <form onSubmit={handleAsk}>
              <textarea
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none resize-none"
                rows={4}
                placeholder="e.g., Show me the top 5 customers by revenue"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              <button 
                type="submit"
                disabled={isLoading || !question.trim()}
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="flex items-center"><Activity className="animate-spin mr-2" size={18} /> Thinking...</span>
                ) : (
                  <span className="flex items-center"><Send className="mr-2" size={18} /> Generate SQL</span>
                )}
              </button>
            </form>
            {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Available Columns</h3>
            <ul className="space-y-2 max-h-64 overflow-y-auto">
              {schemaInfo?.columns?.map((col: any) => (
                <li key={col.name} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded">
                  <span className="font-medium text-gray-700">{col.name}</span>
                  <span className="text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded">{col.type}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: AI Output */}
        <div className="lg:col-span-2 space-y-6">
          {!response && !isLoading && (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-white rounded-xl border border-gray-100 border-dashed">
              <Zap size={48} className="text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-500">Ask a question to see the magic</h3>
              <p className="text-gray-400 mt-2">The AI will generate the SQL query and explain it line by line.</p>
            </div>
          )}

          {response && (
            <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-6">
              {/* Generated SQL */}
              <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-800">
                <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
                  <div className="flex items-center text-gray-300 text-sm font-medium">
                    <Terminal size={16} className="mr-2" /> Generated SQL
                  </div>
                  <div className={`text-xs px-2 py-1 rounded font-semibold ${
                    response.complexity === 'Beginner' ? 'bg-green-900/50 text-green-400' :
                    response.complexity === 'Intermediate' ? 'bg-orange-900/50 text-orange-400' :
                    'bg-red-900/50 text-red-400'
                  }`}>
                    {response.complexity}
                  </div>
                </div>
                <pre className="p-6 text-green-400 font-mono text-sm overflow-x-auto">
                  <code>{response.sql}</code>
                </pre>
              </div>

              {/* Explanation */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <BookOpen className="mr-2 text-indigo-600" size={20} /> Line-by-Line Explanation
                </h3>
                <div className="prose prose-blue max-w-none text-gray-600">
                  <p className="whitespace-pre-wrap">{response.explanation}</p>
                </div>
              </div>

              {/* Concepts & Example */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-indigo-50 rounded-xl border border-indigo-100 p-6">
                  <h4 className="text-sm font-semibold text-indigo-800 uppercase tracking-wider mb-3">Concepts Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {response.concepts?.map((concept: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-white text-indigo-700 rounded-full text-xs font-bold shadow-sm">
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-xl border border-blue-100 p-6">
                  <h4 className="text-sm font-semibold text-blue-800 uppercase tracking-wider mb-3">Learning Example</h4>
                  <p className="text-sm text-blue-900 bg-white p-3 rounded-lg shadow-sm font-mono whitespace-pre-wrap">
                    {response.learning_example}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SqlTutor;
