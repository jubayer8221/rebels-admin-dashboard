// designTokens.ts

export function getPadding(size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'): string {
  const paddingMap: Record<string, string> = {
    xs: 'p-[var(--padding-xs)]',
    sm: 'p-[var(--padding-sm)]',
    md: 'p-[var(--padding-md)]',
    lg: 'p-[var(--padding-lg)]',
    xl: 'p-[var(--padding-xl)]',
  };
  return paddingMap[size] || 'p-[var(--padding-md)]';
}

export function getPaddingX(size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'): string {
  const paddingMap: Record<string, string> = {
    xs: 'px-[var(--padding-xs)]',
    sm: 'px-[var(--padding-sm)]',
    md: 'px-[var(--padding-md)]',
    lg: 'px-[var(--padding-lg)]',
    xl: 'px-[var(--padding-xl)]',
  };
  return paddingMap[size] || 'px-[var(--padding-md)]';
}

export function getPaddingY(size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'): string {
  const paddingMap: Record<string, string> = {
    xs: 'py-[var(--padding-xs)]',
    sm: 'py-[var(--padding-sm)]',
    md: 'py-[var(--padding-md)]',
    lg: 'py-[var(--padding-lg)]',
    xl: 'py-[var(--padding-xl)]',
  };
  return paddingMap[size] || 'py-[var(--padding-md)]';
}

export function getMargin(size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'): string {
  const marginMap: Record<string, string> = {
    xs: 'm-[var(--margin-xs)]',
    sm: 'm-[var(--margin-sm)]',
    md: 'm-[var(--margin-md)]',
    lg: 'm-[var(--margin-lg)]',
    xl: 'm-[var(--margin-xl)]',
  };
  return marginMap[size] || 'm-[var(--margin-md)]';
}

export function getMarginX(size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'): string {
  const marginMap: Record<string, string> = {
    xs: 'mx-[var(--margin-xs)]',
    sm: 'mx-[var(--margin-sm)]',
    md: 'mx-[var(--margin-md)]',
    lg: 'mx-[var(--margin-lg)]',
    xl: 'mx-[var(--margin-xl)]',
  };
  return marginMap[size] || 'mx-[var(--margin-md)]';
}

export function getMarginY(size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'): string {
  const marginMap: Record<string, string> = {
    xs: 'my-[var(--margin-xs)]',
    sm: 'my-[var(--margin-sm)]',
    md: 'my-[var(--margin-md)]',
    lg: 'my-[var(--margin-lg)]',
    xl: 'my-[var(--margin-xl)]',
  };
  return marginMap[size] || 'my-[var(--margin-md)]';
}

export function getMarginTop(size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'): string {
  const marginMap: Record<string, string> = {
    xs: 'mt-[var(--margin-xs)]',
    sm: 'mt-[var(--margin-sm)]',
    md: 'mt-[var(--margin-md)]',
    lg: 'mt-[var(--margin-lg)]',
    xl: 'mt-[var(--margin-xl)]',
  };
  return marginMap[size] || 'mt-[var(--margin-md)]';
}

export function getMarginBottom(size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'): string {
  const marginMap: Record<string, string> = {
    xs: 'mb-[var(--margin-xs)]',
    sm: 'mb-[var(--margin-sm)]',
    md: 'mb-[var(--margin-md)]',
    lg: 'mb-[var(--margin-lg)]',
    xl: 'mb-[var(--margin-xl)]',
  };
  return marginMap[size] || 'mb-[var(--margin-md)]';
}

export function getGap(size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'): string {
  const gapMap: Record<string, string> = {
    xs: 'gap-[var(--gap-xs)]',
    sm: 'gap-[var(--gap-sm)]',
    md: 'gap-[var(--gap-md)]',
    lg: 'gap-[var(--gap-lg)]',
    xl: 'gap-[var(--gap-xl)]',
  };
  return gapMap[size] || 'gap-[var(--gap-md)]';
}