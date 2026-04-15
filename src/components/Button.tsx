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
        'duration-fast',
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
                    'active:bg-[var(--color-primary-active)]',
                    'focus:outline-none',
                    'focus:ring-4',
                    'focus:ring-[var(--color-primary-light)]',
                ],
                secondary: [
                    'bg-[var(--color-bg-secondary)]',
                    'text-[var(--color-text-primary)]',
                    'border',
                    'border-[var(--color-border)]',
                    'hover:bg-[var(--color-bg-tertiary)]',
                    'focus:ring-4',
                    'focus:ring-[var(--color-primary-light)]',
                ],
                success: [
                    'bg-[var(--color-success)]',
                    'text-white',
                    'hover:opacity-90',
                    'focus:ring-4',
                    'focus:ring-[var(--color-success)]',
                    'focus:ring-opacity-30',
                ],
                warning: [
                    'bg-[var(--color-warning)]',
                    'text-white',
                    'hover:opacity-90',
                    'focus:ring-4',
                    'focus:ring-[var(--color-warning)]',
                    'focus:ring-opacity-30',
                ],
                error: [
                    'bg-[var(--color-error)]',
                    'text-white',
                    'hover:opacity-90',
                    'focus:ring-4',
                    'focus:ring-[var(--color-error)]',
                    'focus:ring-opacity-30',
                ],
                ghost: [
                    'bg-transparent',
                    'text-[var(--color-text-primary)]',
                    'hover:bg-[var(--color-bg-secondary)]',
                    'focus:ring-4',
                    'focus:ring-[var(--color-primary-light)]',
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
