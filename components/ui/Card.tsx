// ============================================
// CARD - Kart bileşeni
// ============================================

import React from 'react';
import { View, TouchableOpacity, ViewStyle } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  className?: string;
}

/**
 * Kart bileşeni
 * - Basılabilir veya statik
 * - Gölge efekti
 */
export const Card: React.FC<CardProps> = ({
  children,
  onPress,
  style,
  className = '',
}) => {
  const baseClassName = `bg-dark-800 rounded-2xl p-4 border border-dark-700 ${className}`;

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        className={baseClassName}
        style={style}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View className={baseClassName} style={style}>
      {children}
    </View>
  );
};

