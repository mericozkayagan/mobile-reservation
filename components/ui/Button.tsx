// ============================================
// BUTTON - Özelleştirilebilir buton bileşeni
// ============================================

import React from 'react';
import {
  Pressable,
  Text,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';

/**
 * Buton varyantları
 */
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

/**
 * Varyant stilleri
 */
const variantStyles: Record<ButtonVariant, { container: string; text: string }> = {
  primary: {
    container: 'bg-primary-600 border-primary-600',
    text: 'text-white',
  },
  secondary: {
    container: 'bg-dark-700 border-dark-700',
    text: 'text-white',
  },
  outline: {
    container: 'bg-transparent border-primary-500 border-2',
    text: 'text-primary-500',
  },
  danger: {
    container: 'bg-accent-rose border-accent-rose',
    text: 'text-white',
  },
  ghost: {
    container: 'bg-transparent border-transparent',
    text: 'text-primary-500',
  },
};

/**
 * Boyut stilleri
 */
const sizeStyles: Record<ButtonSize, { container: string; text: string }> = {
  sm: {
    container: 'py-2 px-4 rounded-lg',
    text: 'text-sm',
  },
  md: {
    container: 'py-3 px-6 rounded-xl',
    text: 'text-base',
  },
  lg: {
    container: 'py-4 px-8 rounded-xl',
    text: 'text-lg',
  },
};

/**
 * Özelleştirilebilir buton bileşeni
 * Pressable kullanarak web'de daha iyi accessibility
 */
export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  fullWidth = false,
  style,
  textStyle,
}) => {
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled: disabled || loading }}
      className={`
        flex-row items-center justify-center border
        ${variantStyle.container}
        ${sizeStyle.container}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50' : ''}
      `}
      style={({ pressed }) => [
        style,
        pressed && { opacity: 0.8 }
      ]}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'outline' || variant === 'ghost' ? '#6366f1' : '#ffffff'} 
          size="small" 
        />
      ) : (
        <>
          {icon && <>{icon}</>}
          <Text
            className={`
              font-semibold
              ${variantStyle.text}
              ${sizeStyle.text}
              ${icon ? 'ml-2' : ''}
            `}
            style={textStyle}
          >
            {title}
          </Text>
        </>
      )}
    </Pressable>
  );
};
