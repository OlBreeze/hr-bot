import React from 'react';
import StatusIndicator from "./StatusIndicator";



const ApiStatusBar = ({ status }) => (
    <div className="bg-gray-50 border-b px-6 py-3">
        <div className="flex items-center gap-4 text-sm">
            <span className="font-medium text-gray-700">API Status:</span>
            <div className="flex gap-3">
                <StatusIndicator name="Remotive" active={status.remotive === 'active'} />
                <StatusIndicator name="Jooble" active={status.jooble === 'active'} />
                <StatusIndicator name="JSearch" active={status.jsearch === 'active'} />
                {/*<StatusIndicator name="Arbeitnow" active={status.arbeitnow === 'active'} />*/}
            </div>
        </div>
    </div>
);
// 2
// const ApiStatusBar = ({ status }) => (
//     <div className="flex gap-3">
//   <span className={`flex items-center gap-1 ${status.remotive === 'active' ? 'text-green-600' : 'text-gray-400'}`}>
//     <span className={`w-2 h-2 rounded-full ${status.remotive === 'active' ? 'bg-green-500' : 'bg-gray-300'}`}></span>
//     Remotive
//   </span>
//         <span className={`flex items-center gap-1 ${status.jooble === 'active' ? 'text-green-600' : 'text-gray-400'}`}>
//     <span className={`w-2 h-2 rounded-full ${status.jooble === 'active' ? 'bg-green-500' : 'bg-gray-300'}`}></span>
//     Jooble
//   </span>
//         <span className="flex items-center gap-1 text-gray-600">
//     🌐 Indeed
//   </span>
//         <span className="flex items-center gap-1 text-gray-600">
//     💼 Glassdoor
//   </span>
//     </div>
// );

// 1
// const ApiStatusBar = ({ status }) => (
//     <div className="bg-gray-50 border-b px-6 py-3">
//         <div className="flex items-center gap-4 text-sm">
//             <span className="font-medium text-gray-700">API Status:</span>
//             <div className="flex gap-3">
//         <span className={`flex items-center gap-1 ${status.remotive === 'active' ? 'text-green-600' : 'text-gray-400'}`}>
//           <span className={`w-2 h-2 rounded-full ${status.remotive === 'active' ? 'bg-green-500' : 'bg-gray-300'}`}></span>
//           Remotive
//         </span>
//                 <span className={`flex items-center gap-1 ${status.jooble === 'active' ? 'text-green-600' : 'text-gray-400'}`}>
//           <span className={`w-2 h-2 rounded-full ${status.jooble === 'active' ? 'bg-green-500' : 'bg-gray-300'}`}></span>
//           Jooble
//         </span>
//             </div>
//         </div>
//     </div>
// );

export default ApiStatusBar;