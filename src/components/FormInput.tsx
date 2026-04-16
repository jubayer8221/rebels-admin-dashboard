/**
 * EXAMPLE THEMED FORM INPUT COMPONENT
 * 
 * Shows proper usage of:
 * - Color from design system
 * - Spacing from design system
 * - Border colors and focus states
 * - Typography from design system
 */

import React from 'react';
import { getPaddingX, getPaddingY, getGap } from '../utils/designTokens';

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    /**
     * Label for the input
     */
    label?: string;

    /**
     * Error message to display
     */
    error?: string;

    /**
     * Helper text below the input
     */
    helperText?: string;
}

/**
 * Themed Form Input Component
 * 
 * All colors, spacing, and typography use design system values.
 * 
 * USAGE:
 * ```tsx
 * import { FormInput } from '@/components/FormInput';
 * 
 * export function LoginForm() {
 *   const [email, setEmail] = React.useState('');
 *   
 *   return (
 *     <form>
 *       <FormInput
 *         label="Email Address"
 *         type="email"
 *         value={email}
 *         onChange={e => setEmail(e.target.value)}
 *         placeholder="you@example.com"
 *       />
 *       
 *       <FormInput
 *         label="Password"
 *         type="password"
 *         helperText="Use a strong password with numbers and symbols"
 *       />
 *     </form>
 *   );
 * }
 * ```
 */
export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
    (
        {
            label,
            error,
            helperText,
            className = '',
            disabled = false,
            ...props
        },
        ref
    ) => {
        return (
            <div className={`flex flex-col ${getGap('xs')}`}>
                {label && (
                    <label
                        htmlFor={props.id}
                        className={`
                            text-sm
                            font-medium
                            text-[var(--color-text-primary)]
                            ${disabled ? 'opacity-50' : ''}
                        `}
                    >
                        {label}
                    </label>
                )}

                <input
                    ref={ref}
                    disabled={disabled}
                    className={`
                        ${getPaddingX('sm')}
                        ${getPaddingY('xs')}
                        text-base
                        bg-[var(--color-bg-primary)]
                        text-[var(--color-text-primary)]
                        placeholder:text-[var(--color-text-tertiary)]
                        border-2
                        rounded-md
                        transition-all
                        duration-fast
                        
                        ${error
                            ? 'border-[var(--color-error)]'
                            : 'border-[var(--color-border)]'
                        }
                        
                        focus:outline-none
                        focus:border-[var(--color-primary)]
                        focus:ring-4
                        focus:ring-[var(--color-primary-light)]
                        
                        disabled:bg-[var(--color-bg-secondary)]
                        disabled:text-[var(--color-text-disabled)]
                        disabled:cursor-not-allowed
                        
                        ${className}
                    `}
                    {...props}
                />

                {error && (
                    <p className="text-xs font-medium text-[var(--color-error)]">
                        {error}
                    </p>
                )}

                {!error && helperText && (
                    <p className="text-xs text-[var(--color-text-tertiary)]">
                        {helperText}
                    </p>
                )}
            </div>
        );
    }
);
FormInput.displayName = 'FormInput';

export default FormInput;
