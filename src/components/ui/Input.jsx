import React from 'react';

// Controlled input component with backward-compatible prop names.
// Accepts: value (preferred) or values (legacy), label or laber (legacy), variant.
const Input = ({
    children,
    value,
    values,
    onChange,
    label,
    laber,
    type = 'text',
    id,
    placeholderValue,
    error,
    className = '',
    variant = 'outline',
    ...props
}) => {
    const variantMap = {
        outline: 'border',
        ghost: 'border-none text-sm'
    };

    const labelText = label || laber;
    const inputValue = value !== undefined ? value : values;
    const variantClass = variantMap[variant] || '';

    return (
        <div className="flex flex-col w-full py-2">
            {labelText && (
                <label className="mb-2 text-xl md:text-sm font-medium text-gray-700" htmlFor={id}>
                    {labelText}
                </label>
            )}

            <input
                id={id}
                placeholder={placeholderValue}
                type={type}
                value={inputValue}
                onChange={onChange}
                className={`w-full md:px-4 md:py-2 px-6 py-4 md:text-sm text-xl rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-text focus:border-transparent transition ${variantClass} ${className}`}
                {...props}
            />

            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}

            {children}
        </div>
    );
};

export default Input;