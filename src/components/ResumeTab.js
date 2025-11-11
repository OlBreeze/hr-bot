import React from "react";

const ResumeTab = ({ activeTab, resume, setResume, saveResume }) => {
    if (activeTab !== "resume") return null;

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Your Resume</h2>
            <p className="text-gray-600">
                Your resume is pre-loaded and ready. Edit if needed for cover letter generation.
            </p>

            <textarea
                value={resume}
                onChange={(e) => setResume(e.target.value)}
                className="w-full h-96 px-4 py-3 border border-gray-300 rounded-lg
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   font-mono text-sm"
            />

            <button
                onClick={saveResume}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-medium
                   hover:bg-green-700 transition"
            >
                Save Resume
            </button>
        </div>
    );
};

export default ResumeTab;
