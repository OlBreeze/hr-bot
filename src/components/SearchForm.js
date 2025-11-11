import React from "react";
import {Search, AlertCircle} from "lucide-react";

const SearchForm = ({
                        params,
                        onChange,
                        onSearch,
                        isLoading, activeTab,
                        sourceInfo = "Searches Remotive (remote jobs), Jooble (Israel) and JSearch (global) in real-time."
                    }) => {
    if (activeTab !== 'search') return null;
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Search Parameters</h2>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="text-blue-600 mt-0.5" size={20}/>
                <div className="text-sm text-blue-800">
                    <strong>Live API Integration:</strong> {sourceInfo}
                </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
                {/* Keywords */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Keywords *
                    </label>
                    <input
                        type="text"
                        value={params.keywords}
                        onChange={(e) => onChange({...params, keywords: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Full Stack Developer, Python, Java..."
                    />
                </div>

                {/* Location */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location (optional)
                    </label>
                    <input
                        type="text"
                        value={params.location}
                        onChange={(e) => onChange({...params, location: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Tel Aviv, Remote, USA..."
                    />
                </div>
            </div>

            {/* (опционально) Country select */}
            {/*
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Country (optional)
        </label>
        <select
          value={params.country || ""}
          onChange={(e) => onChange({ ...params, country: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All</option>
          <option value="us">USA</option>
          <option value="il">Israel</option>
          <option value="de">Germany</option>
          <option value="uk">UK</option>
        </select>
      </div>
      */}

            {/* Search button */}
            <button
                onClick={onSearch}
                disabled={isLoading || !params.keywords.trim()}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
                <Search size={20}/>
                {isLoading ? "Searching real jobs..." : "Search Jobs (Live API)"}
            </button>
        </div>
    );
};

export default SearchForm;
