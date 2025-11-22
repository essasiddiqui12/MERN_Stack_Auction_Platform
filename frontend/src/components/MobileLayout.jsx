import React from 'react';
import { cn } from '@/lib/utils';

// Mobile-optimized page layout wrapper
export const MobilePageLayout = ({ 
  children, 
  className = '',
  background = 'gradient',
  ...props 
}) => {
  const backgroundClasses = {
    gradient: 'min-h-screen w-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500',
    solid: 'min-h-screen w-full bg-gray-900',
    transparent: 'min-h-screen w-full',
  };

  return (
    <section className={cn(backgroundClasses[background], className)} {...props}>
      {/* Decorative elements */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      
      {children}
    </section>
  );
};

// Mobile-optimized content container
export const MobileContentContainer = ({ 
  children, 
  className = '',
  padding = 'default',
  ...props 
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-3 xs:p-4',
    default: 'p-4 xs:p-6 sm:p-8',
    lg: 'p-6 xs:p-8 sm:p-12',
  };

  return (
    <div 
      className={cn(
        'relative z-10 w-full ml-0 m-0 h-fit mobile-padding pt-16 xs:pt-20 lg:pl-[320px] flex flex-col safe-area-inset',
        className
      )}
      {...props}
    >
      <div className={cn('bg-white/10 backdrop-blur-lg rounded-2xl my-6 xs:my-8', paddingClasses[padding])}>
        {children}
      </div>
    </div>
  );
};

// Mobile-optimized form wrapper
export const MobileFormWrapper = ({ 
  children, 
  title,
  subtitle,
  className = '',
  maxWidth = 'md',
  ...props 
}) => {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full',
  };

  return (
    <div className={cn('w-full', maxWidthClasses[maxWidth], 'mobile-padding p-4 xs:p-6 sm:p-8 relative z-10 fade-in safe-area-inset', className)} {...props}>
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 xs:p-6 sm:p-8">
        {(title || subtitle) && (
          <div className="text-center mb-6 xs:mb-8">
            {title && (
              <h1 className="text-3xl xs:text-4xl sm:text-5xl font-bold text-white mb-3 leading-tight">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-white/80 text-base xs:text-lg">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

// Mobile-optimized breadcrumb component
export const MobileBreadcrumb = ({ 
  items = [],
  className = '',
  ...props 
}) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 xs:p-6 mb-4 xs:mb-6">
      <div className={cn('text-sm xs:text-base flex flex-wrap gap-2 items-center text-white', className)} {...props}>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {item.link ? (
              <a
                href={item.link}
                className="font-semibold transition-all duration-300 hover:text-yellow-300 touch-manipulation tap-highlight-transparent"
              >
                {item.label}
              </a>
            ) : (
              <span className={item.active ? 'text-white/80' : 'font-semibold'}>
                {item.label}
              </span>
            )}
            {index < items.length - 1 && (
              <span className="text-white/60">›</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// Mobile-optimized image component
export const MobileImage = ({ 
  src,
  alt,
  className = '',
  aspectRatio = 'auto',
  loading = 'lazy',
  ...props 
}) => {
  const aspectRatioClasses = {
    auto: '',
    square: 'aspect-square',
    video: 'aspect-video',
    '4/3': 'aspect-[4/3]',
    '3/2': 'aspect-[3/2]',
  };

  return (
    <div className={cn('relative overflow-hidden rounded-lg', aspectRatioClasses[aspectRatio])}>
      <img
        src={src}
        alt={alt}
        loading={loading}
        className={cn('w-full h-full object-cover', className)}
        {...props}
      />
    </div>
  );
};

// Mobile-optimized modal/overlay component
export const MobileModal = ({ 
  isOpen,
  onClose,
  children,
  className = '',
  ...props 
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm safe-area-inset"
      onClick={onClose}
    >
      <div 
        className={cn(
          'bg-white/10 backdrop-blur-lg rounded-2xl p-4 xs:p-6 max-w-sm xs:max-w-md w-full max-h-[90vh] overflow-y-auto mobile-scroll',
          className
        )}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {children}
      </div>
    </div>
  );
};

// Mobile-optimized loading component
export const MobileLoading = ({ 
  text = 'Loading...',
  className = '',
  ...props 
}) => {
  return (
    <div className={cn('flex flex-col items-center justify-center p-8 text-white', className)} {...props}>
      <div className="animate-spin rounded-full h-8 w-8 xs:h-12 xs:w-12 border-b-2 border-white mb-4"></div>
      <p className="text-base xs:text-lg font-medium">{text}</p>
    </div>
  );
};

// Mobile-optimized error component
export const MobileError = ({ 
  message = 'Something went wrong',
  onRetry,
  className = '',
  ...props 
}) => {
  return (
    <div className={cn('flex flex-col items-center justify-center p-8 text-white text-center', className)} {...props}>
      <div className="text-red-400 text-4xl xs:text-6xl mb-4">⚠️</div>
      <h3 className="text-lg xs:text-xl font-semibold mb-2">Oops!</h3>
      <p className="text-white/80 mb-4 text-sm xs:text-base">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-gradient-to-r from-emerald-400 via-violet-500 to-purple-600 text-white font-semibold rounded-xl px-4 xs:px-6 py-3 transition duration-300 transform hover:scale-[1.02] active:scale-95 mobile-button touch-manipulation tap-highlight-transparent"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

// Mobile-optimized empty state component
export const MobileEmptyState = ({ 
  icon = '📭',
  title = 'Nothing here yet',
  description,
  action,
  className = '',
  ...props 
}) => {
  return (
    <div className={cn('flex flex-col items-center justify-center p-8 text-white text-center', className)} {...props}>
      <div className="text-4xl xs:text-6xl mb-4">{icon}</div>
      <h3 className="text-lg xs:text-xl font-semibold mb-2">{title}</h3>
      {description && (
        <p className="text-white/80 mb-4 text-sm xs:text-base max-w-sm">{description}</p>
      )}
      {action}
    </div>
  );
};
