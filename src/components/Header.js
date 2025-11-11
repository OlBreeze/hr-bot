import React from 'react';
import {Briefcase} from "lucide-react";

const Header = () => {
    return (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
            <div className="flex items-center gap-3">
                <Briefcase size={32}/>
                <div>
                    <h1 className="text-3xl font-bold">Job Search HR-Bot</h1>
                    <p className="text-sm text-blue-100 mt-1">Real-time job search with smart management</p>
                </div>
            </div>
        </div>
    );
};

export default Header;