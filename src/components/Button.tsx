/**
 * EXAMPLE THEMED BUTTON COMPONENT
 * 
 * This is a fully themed button that uses design system values.
 * NO hardcoded colors, spacing, or font sizes.
 * 
 * All styling comes from:
 * - CSS variables (--color-*, --spacing-*, --font-size-*, etc.)
 * - Tailwind classes that reference those variables
 */

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Button variant styles using CVA (Class Variance Authority)
 * This is a common pattern for component variants
 */
const buttonVariants = cva(
    // Base styles - ALL use CSS variables
    [
        'inline-flex',
        'items-center',
        'justify-center',
        'font-medium',
        'rounded-md',
        'transition-all',
        'duration-200',
        'cursor-pointer',
        'border-0',
        'whitespace-nowrap',
        'disabled:opacity-50',
        'disabled:cursor-not-allowed',
    ],
    {
        variants: {
            variant: {
                primary: [
                    'bg-[var(--color-primary)]',
                    'text-white',
                    'hover:bg-[var(--color-primary-hover)]',
                    'hover:shadow-lg',
                    'hover:shadow-[var(--color-primary)]/20',
                    'active:bg-[var(--color-primary-active)]',
                    'active:shadow-md',
                    'focus:outline-none',
                    'focus:ring-4',
                    'focus:ring-[var(--color-primary-light)]',
                ],
                secondary: [
                    'bg-[var(--color-secondary)]',
                    'text-white',
                    'hover:bg-[var(--color-secondary-hover)]',
                    'hover:shadow-lg',
                    'hover:shadow-[var(--color-secondary)]/20',
                    'active:bg-[var(--color-secondary-active)]',
                    'active:shadow-md',
                    'focus:outline-none',
                    'focus:ring-4',
                    'focus:ring-[var(--color-secondary-light)]',
                ],
                success: [
                    'bg-[var(--color-success)]',
                    'text-white',
                    'hover:bg-[var(--color-success-hover)]',
                    'hover:shadow-lg',
                    'hover:shadow-[var(--color-success)]/20',
                    'active:bg-[var(--color-success-active)]',
                    'active:shadow-md',
                    'focus:ring-4',
                    'focus:ring-[var(--color-success-light)]',
                ],
                warning: [
                    'bg-[var(--color-warning)]',
                    'text-white',
                    'hover:bg-[var(--color-warning-hover)]',
                    'hover:shadow-lg',
                    'hover:shadow-[var(--color-warning)]/20',
                    'active:bg-[var(--color-warning-active)]',
                    'active:shadow-md',
                    'focus:ring-4',
                    'focus:ring-[var(--color-warning-light)]',
                ],
                error: [
                    'bg-[var(--color-error)]',
                    'text-white',
                    'hover:bg-[var(--color-error-hover)]',
                    'hover:shadow-lg',
                    'hover:shadow-[var(--color-error)]/20',
                    'active:bg-[var(--color-error-active)]',
                    'active:shadow-md',
                    'focus:ring-4',
                    'focus:ring-[var(--color-error-light)]',
                ],
                ghost: [
                    'bg-transparent',
                    'text-[var(--color-text-primary)]',
                    'border',
                    'border-[var(--color-border)]',
                    'hover:bg-[var(--color-secondary)]/10',
                    'hover:border-[var(--color-secondary)]',
                    'hover:text-[var(--color-secondary)]',
                    'active:bg-[var(--color-secondary)]/20',
                    'focus:ring-4',
                    'focus:ring-[var(--color-secondary-light)]',
                ],
            },
            size: {
                sm: [
                    'px-[var(--spacing-3)]',
                    'py-[var(--spacing-1.5)]',
                    'text-sm',
                    'font-medium',
                ],
                md: [
                    'px-[var(--spacing-4)]',
                    'py-[var(--spacing-2)]',
                    'text-base',
                    'font-medium',
                ],
                lg: [
                    'px-[var(--spacing-6)]',
                    'py-[var(--spacing-3)]',
                    'text-lg',
                    'font-semibold',
                ],
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'md',
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> { }

/**
 * Themed Button Component
 * 
 * All colors, spacing, and typography use design system values.
 * 
 * USAGE:
 * ```tsx
 * import { Button } from '@/components/Button';
 * 
 * export function MyComponent() {
 *   return (
 *     <>
 *       <Button variant="primary" size="lg">Save</Button>
 *       <Button variant="secondary" size="md">Cancel</Button>
 *       <Button variant="error" size="sm">Delete</Button>
 *     </>
 *   );
 * }
 * ```
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, ...props }, ref) => (
        <button
            className={buttonVariants({ variant, size, className })}
            ref={ref}
            {...props}
        />
    )
);
Button.displayName = 'Button';

export default Button;
