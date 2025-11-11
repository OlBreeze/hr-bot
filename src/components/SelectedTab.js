import React from 'react';
import { CheckCircle } from 'lucide-react';
import VacancyCard from './VacancyCard';

const SelectedTab = ({ activeTab, selectedVacancyList, toggleVacancy }) => {
    if (activeTab !== 'selected') return null; // компонент ничего не рендерит, если вкладка не активна

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Selected Jobs</h2>

            {selectedVacancyList.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                    <CheckCircle size={48} className="mx-auto mb-4 opacity-50" />
                    <p>No selected vacancies yet</p>
                </div>
            ) : (
                selectedVacancyList.map(vacancy => (
                    <VacancyCard
                        key={vacancy.id}
                        vacancy={vacancy}
                        isSelected={true}
                        isViewed={true}
                        onToggle={() => toggleVacancy(vacancy.id)}
                    />
                ))
            )}
        </div>
    );
};

export default SelectedTab;
