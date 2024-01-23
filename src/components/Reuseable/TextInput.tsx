import React, { ChangeEventHandler } from 'react';

interface TextInputProps {
    Placeholder: string;
    label: string;
    value: string | number;
    type: string;

    onChange: ChangeEventHandler<HTMLInputElement>;
}

const TextInput: React.FC<TextInputProps> = ({ Placeholder, label, type, value, onChange }) => {
    return (
        <div className="mb-4">
            <label htmlFor={label} className="block dark:text-white font-bold text-xl mb-1">
                {label}
            </label>
            <input
                type={type}
                placeholder={Placeholder}
                id={label}
                // required
                value={value}
                onChange={onChange}
                className="w-full bg-gray-100 border border-gray-300 rounded-md ro py-4 px-3 form-input ltr:pr-11 rtl:pl-11 peer focus:ring-0 dark:text-white focus:border-blue-500"
            />
        </div>
    );
};

export default TextInput;
