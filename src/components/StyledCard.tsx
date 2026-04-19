/**
 * EXAMPLE THEMED CARD COMPONENT
 * 
 * A container component for content - shows proper use of:
 * - Spacing from design system
 * - Colors from CSS variables
 * - Shadows from design system
 * - Border radius from design system
 */

import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Shadow level - determines card elevation
     * Higher = more shadow for hierarchy
     */
    shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';

    /**
     * If true, card has a border instead of shadow
     */
    bordered?: boolean;
}

/**
 * Themed Card Component
 * 
 * Container with theme-aware background, spacing, and shadows.
 * 
 * USAGE:
 * ```tsx
 * import { Card } from '@/components/Card';
 * 
 * export function Dashboard() {
 *   return (
 *     <div className="grid grid-cols-3 gap-4 p-6">
 *       <Card shadow="md" className="p-6">
 *         <h2 className="text-xl font-bold mb-2">Sales</h2>
 *         <p className="text-4xl font-bold text-primary">$45,231</p>
 *       </Card>
 *       
 *       <Card shadow="md" className="p-6">
 *         <h2 className="text-xl font-bold mb-2">Users</h2>
 *         <p className="text-4xl font-bold text-success">2,847</p>
 *       </Card>
 *       
 *       <Card shadow="md" className="p-6">
 *         <h2 className="text-xl font-bold mb-2">Growth</h2>
 *         <p className="text-4xl font-bold text-warning">+23%</p>
 *       </Card>
 *     </div>
 *   );
 * }
 * ```
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    (
        {
            shadow = 'md',
            bordered = false,
            className = '',
            children,
            ...props
        },
        ref
    ) => {
        // Build shadow class
        const shadowClasses = {
            none: '',
            sm: 'shadow-sm',
            md: 'shadow-md',
            lg: 'shadow-lg',
            xl: 'shadow-xl',
        };

        const shadowClass = shadowClasses[shadow];

        // Build border class
        const borderClass = bordered ? 'border border-[var(--color-border)]' : '';

        return (
            <div
                ref={ref}
                className={`
                    glass glass-hover
                    rounded-lg
                    transition-all
                    duration-200
                    ${shadowClass}
                    ${borderClass}
                    ${className}
                `}
                {...props}
            >
                {children}
            </div>
        );
    }
);
Card.displayName = 'Card';

export default Card;
