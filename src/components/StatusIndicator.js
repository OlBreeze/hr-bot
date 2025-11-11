import React from 'react';

const StatusIndicator = ({ name, active }) => (
    <span className={`flex items-center gap-1 ${active ? 'text-green-600' : 'text-gray-400'}`}>
    <span className={`w-2 h-2 rounded-full ${active ? 'bg-green-500' : 'bg-gray-300'}`}></span>
        {name}
  </span>
);

export default StatusIndicator;