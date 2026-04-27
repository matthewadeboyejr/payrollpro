import React from 'react';
import { Field } from 'react-final-form';

interface RadioInputProps {
    label: string;
    name: string;
    options: { label: string; value: string }[];
    readonly?: boolean;
}

const RadioInput: React.FC<RadioInputProps> = ({ label, name, options, readonly }) => {
    return (
        <div className="flex flex-col gap-2">
            {label && <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">{label}</label>}
            <div className="flex gap-4">
                {options.map((option) => (
                    <Field key={option.value} name={name} type="radio" value={option.value}>
                        {({ input }) => (
                            <label className={`flex items-center gap-2 cursor-pointer group ${readonly ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                <div className="relative flex items-center justify-center">
                                    <input
                                        {...input}
                                        type="radio"
                                        disabled={readonly}
                                        className="peer appearance-none w-4 h-4 rounded-full border-2 border-gray-300 checked:border-blue-600 transition-all focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 dark:border-gray-600 dark:checked:border-blue-400 outline-none cursor-pointer"
                                    />
                                    <div className="absolute w-2 h-2 rounded-full bg-blue-600 scale-0 peer-checked:scale-100 transition-transform dark:bg-blue-400" />
                                </div>
                                <span className="text-sm text-gray-600 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-200 transition-colors">
                                    {option.label}
                                </span>
                            </label>
                        )}
                    </Field>
                ))}
            </div>
        </div>
    );
};

export default RadioInput;
