import React from 'react';
import { Send } from 'lucide-react';

const LettersTab = ({
                        activeTab,
                        selectedVacancyList,
                        generatedLetters,
                        generateCoverLetter,
                        isLoading
                    }) => {
    if (activeTab !== 'letters') return null;

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Cover Letters</h2>

            {selectedVacancyList.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                    <Send size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Select vacancies first to generate cover letters</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {selectedVacancyList.map((vacancy) => (
                        <div
                            key={vacancy.id}
                            className="border border-gray-200 rounded-lg p-4"
                        >
                            <h3 className="text-lg font-bold text-gray-900 mb-2">
                                {vacancy.title} - {vacancy.company}
                            </h3>

                            {generatedLetters[vacancy.id] ? (
                                <div className="bg-gray-50 rounded-lg p-4 mt-3">
                  <pre className="whitespace-pre-wrap font-sans text-gray-700">
                    {generatedLetters[vacancy.id]}
                  </pre>

                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(
                                                generatedLetters[vacancy.id]
                                            );
                                            alert('Cover letter copied to clipboard!');
                                        }}
                                        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                    >
                                        Copy Letter
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => generateCoverLetter(vacancy)}
                                    disabled={isLoading}
                                    className="mt-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition disabled:opacity-50"
                                >
                                    {isLoading ? 'Generating...' : 'Generate Letter'}
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LettersTab;
