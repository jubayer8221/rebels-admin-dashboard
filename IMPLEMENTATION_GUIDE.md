/**
 * IMPLEMENTATION GUIDE - Converting Components to the Design System
 * 
 * This guide shows real examples of how to convert existing components
 * to use the design system properly.
 */

// ============================================================================
// BEFORE: Component with hardcoded styles (❌ DO NOT DO THIS)
// ============================================================================

/**
 * BAD EXAMPLE - Hardcoded values everywhere
 */
export const BadButton = ({ children, variant = 'primary' }) => {
  return (
    <button
      style={{
        // ❌ Hardcoded colors
        backgroundColor: variant === 'primary' ? '#2563EB' : '#F3F4F6',
        color: variant === 'primary' ? '#FFFFFF' : '#111827',
        
        // ❌ Hardcoded spacing
        padding: '8px 16px',
        marginBottom: '12px',
        
        // ❌ Hardcoded typography
        fontSize: '14px',
        fontWeight: '600',
        
        // ❌ Hardcoded values all over
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
};

// PROBLEMS:
// - Colors are hardcoded, no dark mode support
// - Spacing is inconsistent across components
// - Typography doesn't follow system
// - No theme switching possible
// - Maintenance nightmare

// ============================================================================
// AFTER: Component using design system (✅ CORRECT)
// ============================================================================

import React from 'react';
import { cva } from 'class-variance-authority';

/**
 * GOOD EXAMPLE - Using design system CSS variables
 */
const buttonVariants = cva(
  // Base styles with CSS variables
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
  ],
  {
    variants: {
      variant: {
        // ✅ Uses CSS variables, not hardcoded values
        primary: [
          'bg-[var(--color-primary)]',
          'text-white',
          'hover:bg-[var(--color-primary-hover)]',
          'active:brightness-75',
        ],
        secondary: [
          'bg-[var(--color-bg-secondary)]',
          'text-[var(--color-text-primary)]',
          'border',
          'border-[var(--color-border)]',
          'hover:bg-[var(--color-bg-tertiary)]',
        ],
      },
      size: {
        // ✅ Uses spacing variables
        sm: [
          'px-[var(--spacing-3)]',
          'py-[var(--spacing-1.5)]',
          'text-sm',
        ],
        md: [
          'px-[var(--spacing-4)]',
          'py-[var(--spacing-2)]',
          'text-base',
        ],
        lg: [
          'px-[var(--spacing-6)]',
          'py-[var(--spacing-3)]',
          'text-lg',
        ],
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export const GoodButton = ({ children, variant = 'primary', size = 'md' }) => {
  return (
    <button className={buttonVariants({ variant, size })}>
      {children}
    </button>
  );
};

// BENEFITS:
// ✅ Works with dark mode automatically
// ✅ Spacing consistent across all components
// ✅ Theme can be changed instantly
// ✅ Type-safe with TypeScript
// ✅ Easy to maintain and scale

// ============================================================================
// CONVERSION PATTERNS
// ============================================================================

/**
 * PATTERN 1: Converting color values
 */

// ❌ BEFORE
const BadCard = () => (
  <div style={{ backgroundColor: '#FFFFFF', color: '#111827' }}>
    Content
  </div>
);

// ✅ AFTER
const GoodCard = () => (
  <div className="bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
    Content
  </div>
);

/**
 * PATTERN 2: Converting spacing values
 */

// ❌ BEFORE
const BadForm = () => (
  <form style={{ padding: '16px', marginBottom: '24px', gap: '12px' }}>
    <input type="text" />
  </form>
);

// ✅ AFTER
const GoodForm = () => (
  <form className="p-[var(--spacing-4)] mb-[var(--spacing-6)] flex flex-col gap-[var(--spacing-3)]">
    <input type="text" />
  </form>
);

/**
 * PATTERN 3: Converting font sizes
 */

// ❌ BEFORE
const BadHeading = () => (
  <h1 style={{ fontSize: '32px', fontWeight: '700', lineHeight: '1.2' }}>
    Heading
  </h1>
);

// ✅ AFTER
const GoodHeading = () => (
  <h1 className="text-[var(--font-size-4xl)] font-bold leading-tight">
    Heading
  </h1>
);

/**
 * PATTERN 4: Converting shadows
 */

// ❌ BEFORE
const BadPanel = () => (
  <div style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
    Content
  </div>
);

// ✅ AFTER
const GoodPanel = () => (
  <div className="shadow-md">
    Content
  </div>
);

/**
 * PATTERN 5: Converting conditional styles (dark mode)
 */

// ❌ BEFORE - Doesn't work with theme system
const BadDarkMode = () => {
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return (
    <div
      style={{
        backgroundColor: isDark ? '#000000' : '#FFFFFF',
        color: isDark ? '#F0F0F0' : '#111827',
      }}
    >
      Content
    </div>
  );
};

// ✅ AFTER - Uses theme context
import { useTheme } from '@/hooks/useTheme';

const GoodDarkMode = () => {
  const { isDark } = useTheme();
  // No manual style switching needed! CSS variables handle it
  return (
    <div className="bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      Content
    </div>
  );
};

/**
 * PATTERN 6: Converting hover/focus states
 */

// ❌ BEFORE
const BadInteractive = () => (
  <button
    style={{
      backgroundColor: '#2563EB',
      color: 'white',
    }}
    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1d4ed8')}
    onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#2563EB')}
  >
    Click me
  </button>
);

// ✅ AFTER
const GoodInteractive = () => (
  <button className="bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] focus:ring-4 focus:ring-[var(--color-primary-light)]">
    Click me
  </button>
);

/**
 * PATTERN 7: Component with multiple states
 */

// ❌ BEFORE
interface BadAlertProps {
  type: 'success' | 'error' | 'warning';
  message: string;
}

const BadAlert = ({ type, message }: BadAlertProps) => {
  const bgColor = {
    success: '#DCFCE7',
    error: '#FEE2E2',
    warning: '#FEF3C7',
  }[type];

  const textColor = {
    success: '#166534',
    error: '#B91C1C',
    warning: '#78350F',
  }[type];

  return (
    <div style={{ backgroundColor: bgColor, color: textColor, padding: '16px' }}>
      {message}
    </div>
  );
};

// ✅ AFTER
interface GoodAlertProps {
  type: 'success' | 'error' | 'warning';
  message: string;
}

const GoodAlert = ({ type, message }: GoodAlertProps) => {
  // Map to design system colors
  const typeStyles = {
    success: 'bg-[var(--color-success)] bg-opacity-20 text-[var(--color-success)]',
    error: 'bg-[var(--color-error)] bg-opacity-20 text-[var(--color-error)]',
    warning: 'bg-[var(--color-warning)] bg-opacity-20 text-[var(--color-warning)]',
  }[type];

  return (
    <div className={`p-[var(--spacing-4)] rounded-md ${typeStyles}`}>
      {message}
    </div>
  );
};

/**
 * PATTERN 8: Using design system utilities in components
 */

import { useDesignSystem } from '@/hooks/useTheme';

const ComponentUsingTokens = () => {
  const { colors, spacing, typography } = useDesignSystem();

  // Access tokens if needed for special cases
  const primaryColor = colors.primary.light;
  const basePadding = spacing[4];

  // But prefer CSS variables in className!
  return (
    <div
      className="p-[var(--spacing-4)] bg-[var(--color-primary)]"
      title={`Using color: ${primaryColor}`}
    >
      Content
    </div>
  );
};

// ============================================================================
// REFACTORING CHECKLIST
// ============================================================================

/**
 * When converting a component, check:
 * 
 * ✅ All colors use CSS variables
 *    - bg-[var(--color-*)]
 *    - text-[var(--color-text-*)]
 * 
 * ✅ All spacing uses spacing scale
 *    - p-[var(--spacing-*)]
 *    - m-[var(--spacing-*)]
 *    - gap-[var(--spacing-*)]
 * 
 * ✅ All typography uses system sizes
 *    - text-[var(--font-size-*)]
 *    - font-[var(--font-weight-*)]
 * 
 * ✅ Shadows use design system
 *    - shadow-sm, shadow-md, shadow-lg
 * 
 * ✅ Border radius from system
 *    - rounded-md, rounded-lg, rounded-full
 * 
 * ✅ Transitions use timing variables
 *    - transition-all duration-normal
 * 
 * ✅ No inline styles with hardcoded values
 * 
 * ✅ Works in light AND dark mode
 * 
 * ✅ Consistent gap/spacing between items
 * 
 * ✅ Accessible focus states
 */

// ============================================================================
// COMMON MISTAKES TO AVOID
// ============================================================================

/**
 * ❌ MISTAKE 1: Leaving hardcoded values in className
 */
const BadClassNames = () => (
  <div className="p-4 text-gray-900 bg-white border border-gray-200">
    This doesn't integrate with theme!
  </div>
);

// ✅ CORRECT
const GoodClassNames = () => (
  <div className="p-[var(--spacing-4)] text-[var(--color-text-primary)] bg-[var(--color-bg-primary)] border border-[var(--color-border)]">
    This integrates perfectly!
  </div>
);

/**
 * ❌ MISTAKE 2: Creating new color values in components
 */
const BadNewColor = () => (
  <div style={{ backgroundColor: '#FF00FF' }}>
    New purple!
  </div>
);

// ✅ CORRECT: Use existing colors or add to design system
const GoodNewColor = () => (
  <div className="bg-[var(--color-secondary)]">
    Secondary color from system
  </div>
);

/**
 * ❌ MISTAKE 3: Inconsistent spacing
 */
const BadSpacing = () => (
  <div>
    <div style={{ padding: '3px' }}>Too small</div>
    <div style={{ padding: '20px' }}>Random value</div>
    <div style={{ padding: '1.5rem' }}>Different unit</div>
  </div>
);

// ✅ CORRECT: Always use design system scale
const GoodSpacing = () => (
  <div>
    <div className="p-[var(--spacing-1)]">Extra small</div>
    <div className="p-[var(--spacing-4)]">Small</div>
    <div className="p-[var(--spacing-6)]">Medium</div>
  </div>
);

/**
 * ❌ MISTAKE 4: Forgetting dark mode
 */
const BadDarkModeFix = () => (
  <div className="bg-white text-black">
    Only works in light mode!
  </div>
);

// ✅ CORRECT: CSS variables handle dark mode
const GoodDarkModeFix = () => (
  <div className="bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
    Works in light and dark!
  </div>
);

export default {
  // Export all examples for reference
};
