import type { Config } from 'tailwindcss'

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            // Colors from design system CSS variables
            colors: {
                // Named accent colors
                primary: 'rgb(var(--color-primary-rgb) / <alpha-value>)',
                'primary-hover': 'var(--color-primary-hover)',
                'primary-light': 'var(--color-primary-light)',
                
                secondary: 'var(--color-secondary)',
                success: 'var(--color-success)',
                warning: 'var(--color-warning)',
                error: 'var(--color-error)',
                
                // Background colors
                'bg-primary': 'var(--color-bg-primary)',
                'bg-secondary': 'var(--color-bg-secondary)',
                'bg-tertiary': 'var(--color-bg-tertiary)',
                
                // Text colors
                'text-primary': 'var(--color-text-primary)',
                'text-secondary': 'var(--color-text-secondary)',
                'text-tertiary': 'var(--color-text-tertiary)',
                'text-disabled': 'var(--color-text-disabled)',
                
                // Border color
                'border-default': 'var(--color-border)',
                
                // Legacy Rebels colors
                rebels: {
                    blue: '#2563eb',
                    black: '#000000',
                }
            },
            
            // Spacing from design system
            spacing: {
                '0': 'var(--spacing-0)',
                'px': 'var(--spacing-px)',
                '0.5': 'var(--spacing-0.5)',
                '1': 'var(--spacing-1)',
                '1.5': 'var(--spacing-1.5)',
                '2': 'var(--spacing-2)',
                '2.5': 'var(--spacing-2.5)',
                '3': 'var(--spacing-3)',
                '3.5': 'var(--spacing-3.5)',
                '4': 'var(--spacing-4)',
                '5': 'var(--spacing-5)',
                '6': 'var(--spacing-6)',
                '7': 'var(--spacing-7)',
                '8': 'var(--spacing-8)',
                '9': 'var(--spacing-9)',
                '10': 'var(--spacing-10)',
                '12': 'var(--spacing-12)',
                '14': 'var(--spacing-14)',
                '16': 'var(--spacing-16)',
                '20': 'var(--spacing-20)',
                '24': 'var(--spacing-24)',
            },
            
            // Font sizing from design system
fontSize: {
    // Legacy / standard sizes
    'xs': 'var(--font-size-xs)',
    'sm': 'var(--font-size-sm)',
    'base': 'var(--font-size-base)',
    'lg': 'var(--font-size-lg)',
    'xl': 'var(--font-size-xl)',
    '2xl': 'var(--font-size-2xl)',
    '3xl': 'var(--font-size-3xl)',
    '4xl': 'var(--font-size-4xl)',
    '5xl': 'var(--font-size-5xl)',

    // Design token sizes (ds- prefix)
    'ds-xs': 'var(--font-size-xs)',
    'ds-sm': 'var(--font-size-sm)',
    'ds-md': 'var(--font-size-md)',
    'ds-lg': 'var(--font-size-lg)',
    'ds-xl': 'var(--font-size-xl)',
    'ds-2xl': 'var(--font-size-2xl)',
},
            
            // Font weights from design system
            fontWeight: {
                'thin': 'var(--font-weight-thin)',
                'extralight': 'var(--font-weight-extralight)',
                'light': 'var(--font-weight-light)',
                'normal': 'var(--font-weight-normal)',
                'medium': 'var(--font-weight-medium)',
                'semibold': 'var(--font-weight-semibold)',
                'bold': 'var(--font-weight-bold)',
                'extrabold': 'var(--font-weight-extrabold)',
                'black': 'var(--font-weight-black)',
            },
            
            // Line heights from design system
            lineHeight: {
                'none': 'var(--line-height-none)',
                'tight': 'var(--line-height-tight)',
                'snug': 'var(--line-height-snug)',
                'normal': 'var(--line-height-normal)',
                'relaxed': 'var(--line-height-relaxed)',
                'loose': 'var(--line-height-loose)',
            },
            
            // Border radius from design system (legacy + new design settings)
            borderRadius: {
                'none': 'var(--radius-none, 0)',
                'xs': '2px',
                'sm': 'var(--radius-sm, 4px)',
                'base': '6px',
                'md': 'var(--radius-md, 8px)',
                'lg': 'var(--radius-lg, 12px)',
                'xl': 'var(--radius-xl, 16px)',
                '2xl': '24px',
                '3xl': '32px',
                'rebels': '2rem',
                'full': 'var(--radius-full, 9999px)',
            },
            
            // Design tokens padding (dynamic)
            padding: {
                'ds-xs': 'var(--padding-xs)',
                'ds-sm': 'var(--padding-sm)',
                'ds-md': 'var(--padding-md)',
                'ds-lg': 'var(--padding-lg)',
                'ds-xl': 'var(--padding-xl)',
            },
            
            // Design tokens margin (dynamic)
            margin: {
                'ds-xs': 'var(--margin-xs)',
                'ds-sm': 'var(--margin-sm)',
                'ds-md': 'var(--margin-md)',
                'ds-lg': 'var(--margin-lg)',
                'ds-xl': 'var(--margin-xl)',
            },
            
            // Design tokens gap (dynamic)
            gap: {
                'ds-xs': 'var(--gap-xs)',
                'ds-sm': 'var(--gap-sm)',
                'ds-md': 'var(--gap-md)',
                'ds-lg': 'var(--gap-lg)',
                'ds-xl': 'var(--gap-xl)',
            },
            

            
            // Shadows from design system
            boxShadow: {
                'none': 'var(--shadow-none)',
                'xs': 'var(--shadow-xs)',
                'sm': 'var(--shadow-sm)',
                'default': 'var(--shadow-base)',
                'md': 'var(--shadow-md)',
                'lg': 'var(--shadow-lg)',
                'xl': 'var(--shadow-xl)',
            },
            
            // Transitions from design system
            transitionDuration: {
                'fastest': 'var(--transition-duration-fastest)',
                'faster': 'var(--transition-duration-faster)',
                'fast': 'var(--transition-duration-fast)',
                'normal': 'var(--transition-duration-normal)',
                'slow': 'var(--transition-duration-slow)',
                'slower': 'var(--transition-duration-slower)',
            },
            
            transitionTimingFunction: {
                'linear': 'var(--transition-timing-linear)',
                'ease-in': 'var(--transition-timing-easeIn)',
                'ease-out': 'var(--transition-timing-easeOut)',
                'ease-in-out': 'var(--transition-timing-easeInOut)',
            },
        },
    },
    plugins: [],
    safelist: [
        // Design token classes
        'p-ds-xs', 'p-ds-sm', 'p-ds-md', 'p-ds-lg', 'p-ds-xl',
        'px-ds-xs', 'px-ds-sm', 'px-ds-md', 'px-ds-lg', 'px-ds-xl',
        'py-ds-xs', 'py-ds-sm', 'py-ds-md', 'py-ds-lg', 'py-ds-xl',
        'm-ds-xs', 'm-ds-sm', 'm-ds-md', 'm-ds-lg', 'm-ds-xl',
        'mx-ds-xs', 'mx-ds-sm', 'mx-ds-md', 'mx-ds-lg', 'mx-ds-xl',
        'my-ds-xs', 'my-ds-sm', 'my-ds-md', 'my-ds-lg', 'my-ds-xl',
        'mt-ds-xs', 'mt-ds-sm', 'mt-ds-md', 'mt-ds-lg', 'mt-ds-xl',
        'mb-ds-xs', 'mb-ds-sm', 'mb-ds-md', 'mb-ds-lg', 'mb-ds-xl',
        'gap-ds-xs', 'gap-ds-sm', 'gap-ds-md', 'gap-ds-lg', 'gap-ds-xl',
        'rounded-ds-sm', 'rounded-ds-md', 'rounded-ds-lg', 'rounded-ds-xl', 'rounded-ds-full',
        'text-ds-xs', 'text-ds-sm', 'text-ds-md', 'text-ds-lg', 'text-ds-xl', 'text-ds-2xl',
    ],
} satisfies Config ;