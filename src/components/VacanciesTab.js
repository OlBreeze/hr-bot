import React from "react";
import { Database } from "lucide-react";
import VacancyCard from "./VacancyCard";
import Pagination from "./Pagination";

const VacanciesTab = ({
                          activeTab,
                          unseenVacancies,
                          paginatedVacancies,
                          selectedVacancies,
                          viewedVacancies,
                          toggleVacancy,
                          currentPage,
                          totalPages,
                          setCurrentPage,
                      }) => {
    if (activeTab !== "vacancies") return null;

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">New Job Listings</h2>

            {unseenVacancies.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                    <Database size={48} className="mx-auto mb-4 opacity-50" />
                    <p>No new vacancies. Start searching in the "Search" tab</p>
                </div>
            ) : (
                <>
                    {paginatedVacancies.map((vacancy) => (
                        <VacancyCard
                            key={vacancy.id}
                            vacancy={vacancy}
                            isSelected={selectedVacancies.has(vacancy.id)}
                            isViewed={viewedVacancies.has(vacancy.id)}
                            onToggle={() => toggleVacancy(vacancy.id)}
                        />
                    ))}

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </>
            )}
        </div>
    );
};

export default VacanciesTab;
