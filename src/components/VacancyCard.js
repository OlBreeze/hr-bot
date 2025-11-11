import React from 'react';
import { CheckCircle, XCircle,  Eye } from 'lucide-react';
const VacancyCard = ({ vacancy, isSelected, isViewed, onToggle }) => (
    <div
        className={`border rounded-lg p-4 transition ${
            isSelected ? 'border-green-500 bg-green-50' :
                isViewed ? 'border-gray-200 bg-gray-50' :
                    'border-gray-200 hover:border-gray-300'
        }`}
    >
        <div className="flex items-start justify-between">
            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-gray-900">{vacancy.title}</h3>
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
            {vacancy.source}
          </span>
                    {isViewed && (
                        <span className="text-xs px-2 py-1 bg-gray-200 text-gray-600 rounded flex items-center gap-1">
              <Eye size={12} /> Viewed
            </span>
                    )}
                </div>
                <p className="text-lg text-gray-700 mt-1">{vacancy.company}</p>
                <div className="flex gap-4 mt-2 text-sm text-gray-600">
                    <span>💰 {vacancy.salary}</span>
                    <span>📍 {vacancy.location}</span>
                    <span>⏱️ {vacancy.experience}</span>
                </div>
                <p className="mt-3 text-gray-700">{vacancy.description}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                    {vacancy.requirements.slice(0, 8).map((req, idx) => (
                        <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              {req}
            </span>
                    ))}
                </div>
                <a
                    href={vacancy.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-blue-600 hover:text-blue-800 hover:underline text-sm font-medium"
                >
                    View Job Posting →
                </a>
            </div>
            <button
                onClick={onToggle}
                className={`ml-4 p-2 rounded-lg transition ${
                    isSelected ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
            >
                {isSelected ? <CheckCircle size={24} /> : <XCircle size={24} />}
            </button>
        </div>
    </div>
);

export default VacancyCard;


// const VacancyCard = ({ vacancy, isSelected, isViewed, onToggle }) => (
//     <div
//         className={`border rounded-lg p-4 transition ${
//             isSelected ? 'border-green-500 bg-green-50' :
//                 isViewed ? 'border-gray-200 bg-gray-50' :
//                     'border-gray-200 hover:border-gray-300'
//         }`}
//     >
//         <div className="flex items-start justify-between">
//             <div className="flex-1">
//                 <div className="flex items-center gap-2">
//                     <h3 className="text-xl font-bold text-gray-900">{vacancy.title}</h3>
//                     <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
//             {vacancy.source}
//           </span>
//                     {isViewed && (
//                         <span className="text-xs px-2 py-1 bg-gray-200 text-gray-600 rounded flex items-center gap-1">
//               <Eye size={12} /> Viewed
//             </span>
//                     )}
//                 </div>
//                 <p className="text-lg text-gray-700 mt-1">{vacancy.company}</p>
//                 <div className="flex gap-4 mt-2 text-sm text-gray-600">
//                     <span>💰 {vacancy.salary}</span>
//                     <span>📍 {vacancy.location}</span>
//                     <span>⏱️ {vacancy.experience}</span>
//                 </div>
//                 <p className="mt-3 text-gray-700">{vacancy.description}</p>
//                 <div className="flex flex-wrap gap-2 mt-3">
//                     {vacancy.requirements.slice(0, 8).map((req, idx) => (
//                         <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
//               {req}
//             </span>
//                     ))}
//                 </div>
//                 <a
//                     href={vacancy.link}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="inline-block mt-3 text-blue-600 hover:text-blue-800 hover:underline text-sm font-medium"
//                 >
//                     View Job Posting →
//                 </a>
//             </div>
//             <button
//                 onClick={onToggle}
//                 className={`ml-4 p-2 rounded-lg transition ${
//                     isSelected ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
//                 }`}
//             >
//                 {isSelected ? <CheckCircle size={24} /> : <XCircle size={24} />}
//             </button>
//         </div>
//     </div>
// );