/**
 * CONTAINER COMPONENT
 * 
 * Shows proper usage of:
 * - Consistent spacing from design system
 * - Section spacing and layout
 * - Dynamic padding using design tokens
 */

import React from 'react';
import { getPadding } from '../utils/designTokens';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Container width variant
     */
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';

    /**
     * Padding preset
     */
    padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * Themed Container Component
 * 
 * Center content with consistent spacing from the design system.
 * All padding is controlled by design settings.
 * 
 * USAGE:
 * ```tsx
 * import { Container } from '@/components/Container';
 * 
 * export function Page() {
 *   return (
 *     <Container size="lg" padding="lg">
 *       <h1>Welcome</h1>
 *       <p>Content goes here...</p>
 *     </Container>
 *   );
 * }
 * ```
 */
export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
    (
        {
            size = 'lg',
            padding = 'lg',
            className = '',
            children,
            ...props
        },
        ref
    ) => {
        const sizes = {
            sm: 'max-w-2xl',      // 42rem
            md: 'max-w-4xl',      // 56rem
            lg: 'max-w-5xl',      // 64rem
            xl: 'max-w-6xl',      // 72rem
            full: 'w-full',
        };

        // Map padding to design tokens
        const paddingClass = padding === 'none' ? '' : getPadding(padding);

        return (
            <div
                ref={ref}
                className={`
                    mx-auto
                    w-full
                    ${sizes[size]}
                    ${paddingClass}
                    ${className}
                `}
                {...props}
            >
                {children}
            </div>
        );
    }
);
Container.displayName = 'Container';

/**
 * Section Component
 * 
 * Container for page sections with consistent spacing.
 * 
 * USAGE:
 * ```tsx
 * import { Section } from '@/components/Container';
 * 
 * export function HomePage() {
 *   return (
 *     <div>
 *       <Section bgColor="primary">
 *         <h1>Hero Section</h1>
 *       </Section>
 *       
 *       <Section padding="lg">
 *         <h2>Features</h2>
 *       </Section>
 *       
 *       <Section bgColor="secondary">
 *         <h2>Footer</h2>
 *       </Section>
 *     </div>
 *   );
 * }
 * ```
 */
export interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Background color variant
     */
    bgColor?: 'primary' | 'secondary' | 'tertiary' | 'transparent';

    /**
     * Padding preset
     */
    padding?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Section = React.forwardRef<HTMLDivElement, SectionProps>(
    (
        {
            bgColor = 'primary',
            padding = 'lg',
            className = '',
            children,
            ...props
        },
        ref
    ) => {
        const bgColors = {
            primary: 'bg-[var(--color-bg-primary)]',
            secondary: 'bg-[var(--color-bg-secondary)]',
            tertiary: 'bg-[var(--color-bg-tertiary)]',
            transparent: 'bg-transparent',
        };

        const paddings = {
            sm: 'py-[var(--spacing-8)] px-[var(--spacing-4)]',
            md: 'py-[var(--spacing-12)] px-[var(--spacing-6)]',
            lg: 'py-[var(--spacing-16)] px-[var(--spacing-8)]',
            xl: 'py-[var(--spacing-24)] px-[var(--spacing-10)]',
        };

        return (
            <section
                ref={ref}
                className={`
                    w-full
                    transition-colors
                    duration-normal
                    ${bgColors[bgColor]}
                    ${paddings[padding]}
                    ${className}
                `}
                {...props}
            >
                <Container size="lg" padding="none">
                    {children}
                </Container>
            </section>
        );
    }
);
Section.displayName = 'Section';

/**
 * Grid Component
 * 
 * Responsive grid with consistent gaps from design system.
 * 
 * USAGE:
 * ```tsx
 * import { Grid } from '@/components/Container';
 * 
 * export function Dashboard() {
 *   return (
 *     <Grid cols={3} gap="lg">
 *       <Card>Item 1</Card>
 *       <Card>Item 2</Card>
 *       <Card>Item 3</Card>
 *     </Grid>
 *   );
 * }
 * ```
 */
export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Number of columns on desktop
     */
    cols?: 1 | 2 | 3 | 4 | 5 | 6;

    /**
     * Gap between items from spacing scale
     */
    gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
    (
        {
            cols = 3,
            gap = 'md',
            className = '',
            children,
            ...props
        },
        ref
    ) => {
        const colsMap = {
            1: 'grid-cols-1',
            2: 'grid-cols-2',
            3: 'grid-cols-3',
            4: 'grid-cols-4',
            5: 'grid-cols-5',
            6: 'grid-cols-6',
        };

        const gapMap = {
            xs: 'gap-[var(--spacing-1)]',
            sm: 'gap-[var(--spacing-2)]',
            md: 'gap-[var(--spacing-4)]',
            lg: 'gap-[var(--spacing-6)]',
            xl: 'gap-[var(--spacing-8)]',
            '2xl': 'gap-[var(--spacing-12)]',
        };

        return (
            <div
                ref={ref}
                className={`
                    grid
                    ${colsMap[cols]}
                    ${gapMap[gap]}
                    ${className}
                `}
                {...props}
            >
                {children}
            </div>
        );
    }
);
Grid.displayName = 'Grid';

export default {
    Container,
    Section,
    Grid,
};
