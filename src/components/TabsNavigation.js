import React from "react";

const TabsNavigation = ({tabsConfig, activeTab, setActiveTab, unseenVacancies, selectedVacancies}) => {
    return (
        <div className="flex border-b overflow-x-auto">
            {tabsConfig.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 font-medium transition whitespace-nowrap ${
                        activeTab === tab.id
                            ? "border-b-2 border-blue-600 text-blue-600"
                            : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                    <tab.icon size={20}/>
                    {tab.label}

                    {/* динамические счётчики */}
                    {tab.id === "vacancies" && unseenVacancies?.length > 0 && (
                        <span className="ml-2 text-sm text-blue-600">
              ({unseenVacancies.length})
            </span>
                    )}

                    {tab.id === "selected" && selectedVacancies?.size > 0 && (
                        <span className="ml-2 text-sm text-blue-600">
              ({selectedVacancies.size})
            </span>
                    )}
                </button>
            ))}
        </div>
    );
};

export default TabsNavigation;
