import React from 'react';
import { cn } from '@/lib/utils';

// Mobile-optimized button component
export const MobileButton = ({ 
  children, 
  className = '', 
  variant = 'primary',
  size = 'default',
  ...props 
}) => {
  const baseClasses = 'mobile-button touch-manipulation tap-highlight-transparent transition-all duration-200 font-semibold rounded-xl focus:outline-none active:scale-95';
  
  const variants = {
    primary: 'bg-gradient-to-r from-emerald-400 via-violet-500 to-purple-600 text-white hover:shadow-lg',
    secondary: 'bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20',
    outline: 'border-2 border-current text-current hover:bg-current hover:text-white',
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    default: 'px-4 xs:px-6 py-3 text-base xs:text-lg',
    lg: 'px-6 xs:px-8 py-4 text-lg xs:text-xl',
  };
  
  return (
    <button 
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};

// Mobile-optimized input component
export const MobileInput = ({ 
  className = '', 
  label,
  error,
  ...props 
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-white text-base xs:text-lg font-medium pl-1">
          {label}
        </label>
      )}
      <input
        className={cn(
          'w-full px-3 xs:px-4 py-3 rounded-xl bg-white/20 border-2 border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/40 transition duration-300 mobile-input touch-manipulation',
          error && 'border-red-400 focus:border-red-400 focus:ring-red-400',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-red-400 text-sm pl-1">{error}</p>
      )}
    </div>
  );
};

// Mobile-optimized card component
export const MobileCard = ({ 
  children, 
  className = '',
  clickable = false,
  ...props 
}) => {
  const baseClasses = 'bg-white/10 backdrop-blur-lg rounded-2xl border border-white/10';
  const interactiveClasses = clickable 
    ? 'mobile-card touch-manipulation tap-highlight-transparent cursor-pointer hover:bg-white/15 active:bg-white/20' 
    : '';
  
  return (
    <div 
      className={cn(baseClasses, interactiveClasses, className)}
      {...props}
    >
      {children}
    </div>
  );
};

// Mobile-optimized grid component
export const MobileGrid = ({ 
  children, 
  className = '',
  cols = 'responsive',
  gap = 'default',
  ...props 
}) => {
  const colsClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    responsive: 'grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    auction: 'grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5',
  };
  
  const gapClasses = {
    sm: 'gap-2 xs:gap-3',
    default: 'gap-4 xs:gap-6',
    lg: 'gap-6 xs:gap-8',
  };
  
  return (
    <div 
      className={cn('grid', colsClasses[cols], gapClasses[gap], className)}
      {...props}
    >
      {children}
    </div>
  );
};

// Mobile-optimized container component
export const MobileContainer = ({ 
  children, 
  className = '',
  padding = true,
  safeArea = true,
  ...props 
}) => {
  const baseClasses = 'relative z-10 w-full ml-0 m-0 h-fit lg:pl-[320px] flex flex-col';
  const paddingClasses = padding ? 'mobile-padding pt-16 xs:pt-20' : '';
  const safeAreaClasses = safeArea ? 'safe-area-inset' : '';
  
  return (
    <div 
      className={cn(baseClasses, paddingClasses, safeAreaClasses, className)}
      {...props}
    >
      {children}
    </div>
  );
};

// Mobile-optimized text components
export const MobileHeading = ({ 
  children, 
  className = '',
  level = 1,
  gradient = false,
  ...props 
}) => {
  const baseClasses = 'font-bold leading-tight';
  const sizeClasses = {
    1: 'mobile-heading-responsive',
    2: 'text-2xl xs:text-3xl sm:text-4xl md:text-5xl',
    3: 'text-xl xs:text-2xl sm:text-3xl md:text-4xl',
    4: 'text-lg xs:text-xl sm:text-2xl md:text-3xl',
  };
  const gradientClasses = gradient 
    ? 'bg-gradient-to-r from-yellow-200 via-pink-300 to-purple-400 text-transparent bg-clip-text'
    : '';
  
  const Tag = `h${level}`;
  
  return (
    <Tag 
      className={cn(baseClasses, sizeClasses[level], gradientClasses, className)}
      {...props}
    >
      {children}
    </Tag>
  );
};

export const MobileText = ({ 
  children, 
  className = '',
  responsive = false,
  ...props 
}) => {
  const baseClasses = responsive ? 'mobile-text-responsive' : '';
  
  return (
    <p 
      className={cn(baseClasses, className)}
      {...props}
    >
      {children}
    </p>
  );
};

// Mobile-optimized spacing component
export const MobileSpacing = ({ 
  children, 
  className = '',
  size = 'default',
  ...props 
}) => {
  const spacingClasses = {
    sm: 'p-3 xs:p-4 my-4 xs:my-6',
    default: 'p-4 xs:p-6 sm:p-8 my-6 xs:my-8',
    lg: 'p-6 xs:p-8 sm:p-12 my-8 xs:my-12',
  };
  
  return (
    <div 
      className={cn(spacingClasses[size], className)}
      {...props}
    >
      {children}
    </div>
  );
};
