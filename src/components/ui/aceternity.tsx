"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Animated Background Component
export const AnimatedBackground = ({ className }: { className?: string }) => {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000"></div>
      <div className="absolute top-40 left-40 w-80 h-80 bg-slate-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-4000"></div>
    </div>
  );
};

// Animated Card Component
export const AnimatedCard = ({ 
  children, 
  className,
  delay = 0 
}: { 
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

// Floating Action Button
export const FloatingActionButton = ({ 
  children, 
  onClick,
  className 
}: { 
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50",
        className
      )}
    >
      {children}
    </motion.button>
  );
};

// Gradient Text Component
export const GradientText = ({ 
  children, 
  className 
}: { 
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span className={cn(
      "bg-gradient-to-r from-slate-700 via-blue-600 to-indigo-600 bg-clip-text text-transparent",
      className
    )}>
      {children}
    </span>
  );
};

// Animated Stats Card
export const StatsCard = ({ 
  title, 
  value, 
  icon: Icon,
  delay = 0 
}: { 
  title: string;
  value: string | number;
  icon?: React.ComponentType<{ className?: string }>;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white/90 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        {Icon && (
          <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
            <Icon className="w-6 h-6 text-white" />
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Animated List Item
export const AnimatedListItem = ({ 
  children, 
  delay = 0 
}: { 
  children: React.ReactNode;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300"
    >
      {children}
    </motion.div>
  );
};

// Animated Button
export const AnimatedButton = ({ 
  children, 
  onClick,
  variant = "default",
  className 
}: { 
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "gradient" | "outline";
  className?: string;
}) => {
  const baseClasses = "px-6 py-3 rounded-lg font-medium transition-all duration-300";
  
  const variants = {
    default: "bg-gray-900 text-white hover:bg-gray-800 shadow-lg hover:shadow-xl",
    gradient: "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl",
    outline: "border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(baseClasses, variants[variant], className)}
    >
      {children}
    </motion.button>
  );
};

// Animated Input
export const AnimatedInput = ({ 
  placeholder,
  value,
  onChange,
  className 
}: { 
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("relative", className)}
    >
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-white/20 rounded-lg shadow-sm focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
      />
    </motion.div>
  );
};

// Animated Loading Spinner
export const AnimatedSpinner = ({ className }: { className?: string }) => {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className={cn("w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full", className)}
    />
  );
};

// Animated Progress Bar
export const AnimatedProgressBar = ({ 
  progress, 
  className 
}: { 
  progress: number;
  className?: string;
}) => {
  return (
    <div className={cn("w-full bg-gray-200 rounded-full h-2", className)}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
      />
    </div>
  );
};

// Animated Badge
export const AnimatedBadge = ({ 
  children, 
  variant = "default",
  className 
}: { 
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "error";
  className?: string;
}) => {
  const variants = {
    default: "bg-blue-100 text-blue-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-800"
  };

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </motion.span>
  );
};

// Animated Divider
export const AnimatedDivider = ({ className }: { className?: string }) => {
  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={cn("h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent", className)}
    />
  );
};

// Animated Tooltip
export const AnimatedTooltip = ({ 
  children, 
  content,
  className 
}: { 
  children: React.ReactNode;
  content: string;
  className?: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 10 }}
        className={cn(
          "absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-50",
          className
        )}
      >
        {content}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
      </motion.div>
    </div>
  );
};

// Animated Modal
export const AnimatedModal = ({ 
  isOpen, 
  onClose, 
  children,
  className 
}: { 
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className={cn(
          "bg-white rounded-xl shadow-2xl max-w-md w-full p-6",
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

// Animated Tabs
export const AnimatedTabs = ({ 
  tabs, 
  activeTab, 
  onTabChange 
}: { 
  tabs: { id: string; label: string }[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}) => {
  return (
    <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`relative px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === tab.id ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-white rounded-md shadow-sm"
              initial={false}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative z-10">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

// Animated Notification
export const AnimatedNotification = ({ 
  message, 
  type = "info",
  onClose,
  className 
}: { 
  message: string;
  type?: "info" | "success" | "warning" | "error";
  onClose?: () => void;
  className?: string;
}) => {
  const types = {
    info: "bg-blue-500",
    success: "bg-green-500",
    warning: "bg-yellow-500",
    error: "bg-red-500"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className={cn(
        "fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg text-white",
        types[type],
        className
      )}
    >
      <div className="flex items-center space-x-2">
        <span>{message}</span>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-2 text-white/80 hover:text-white"
          >
            ×
          </button>
        )}
      </div>
    </motion.div>
  );
}; 