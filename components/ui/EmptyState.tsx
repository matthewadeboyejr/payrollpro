import React from "react";
import { IconType } from "react-icons";

interface EmptyStateProps {
    icon: IconType;
    title: string;
    description?: string;
    action?: {
        label: string;
        onClick: () => void;
        icon?: React.ReactNode;
    };
    className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon: Icon, title, description, action, className = "" }) => {
    return (
        <div className={`py-16 md:py-24 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 animate-in fade-in zoom-in duration-500 w-full ${className}`}>
            <div className="p-5 md:p-6 bg-gray-50 dark:bg-gray-700/50 rounded-full mb-5 shadow-inner">
                <Icon size={48} className="opacity-20 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white uppercase tracking-widest">{title}</h3>
            {description && (
                <p className="text-sm italic text-gray-400 dark:text-gray-500 mt-2 max-w-[300px] text-center px-4 leading-relaxed">
                    {description}
                </p>
            )}
            {action && (
                <button
                    onClick={action.onClick}
                    className="mt-6 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95 font-semibold text-sm"
                >
                    {action.icon}
                    {action.label}
                </button>
            )}
        </div>
    );
};

export default EmptyState;
