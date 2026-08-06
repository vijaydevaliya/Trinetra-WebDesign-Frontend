import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Button = ({
  children,
  to,
  href,
  variant = 'gradient', // 'gradient' | 'outline' | 'ghost' | 'secondary'
  size = 'md', // 'sm' | 'md' | 'lg'
  className = '',
  icon: Icon,
  onClick,
  type = 'button',
  disabled = false,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs font-medium rounded-lg gap-1.5',
    md: 'px-6 py-3 text-sm font-semibold rounded-xl gap-2',
    lg: 'px-8 py-4 text-base font-semibold rounded-xl gap-2.5',
  };

  const variantClasses = {
    gradient: 'bg-brand-gradient text-white shadow-lg shadow-brand-500/20 hover:shadow-brand-500/35 hover:brightness-110 border border-transparent',
    outline: 'border border-brand-500/30 dark:border-brand-400/30 text-brand-900 dark:text-brand-100 hover:bg-brand-500/10 hover:border-brand-500/50',
    ghost: 'text-brand-700 dark:text-brand-300 hover:bg-brand-500/10 hover:text-brand-600 dark:hover:text-brand-200 border border-transparent',
    secondary: 'bg-navy-800 text-brand-50 hover:bg-navy-700 border border-navy-700 dark:bg-navy-800 dark:hover:bg-navy-700',
  };

  const baseClasses = `inline-flex items-center justify-center font-sans tracking-wide transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  const content = (
    <>
      <span>{children}</span>
      {Icon && <Icon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={`group ${baseClasses}`} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    const isAnchor = href.startsWith('#');
    return (
      <a
        href={href}
        target={isAnchor ? undefined : '_blank'}
        rel={isAnchor ? undefined : 'noopener noreferrer'}
        className={`group ${baseClasses}`}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`group ${baseClasses}`}
      {...props}
    >
      {content}
    </motion.button>
  );
};
