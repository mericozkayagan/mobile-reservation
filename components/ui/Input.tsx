// ============================================
// INPUT - Özelleştirilebilir input bileşeni
// ============================================

import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  TextInputProps,
} from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

/**
 * Özelleştirilebilir input bileşeni
 * - Label desteği
 * - Hata mesajı gösterimi
 * - Şifre toggle özelliği
 * - İkon desteği
 */
export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  rightIcon,
  secureTextEntry,
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPassword = secureTextEntry !== undefined;

  return (
    <View className="mb-4">
      {/* Label */}
      {label && (
        <Text className="text-dark-300 text-sm font-medium mb-2">
          {label}
        </Text>
      )}

      {/* Input Container */}
      <View
        className={`
          flex-row items-center
          bg-dark-800 border rounded-xl px-4
          ${error ? 'border-accent-rose' : 'border-dark-600'}
        `}
      >
        {/* Sol İkon */}
        {icon && <View className="mr-3">{icon}</View>}

        {/* Input */}
        <TextInput
          className="flex-1 py-4 text-white text-base"
          placeholderTextColor="#64748b"
          secureTextEntry={isPassword && !isPasswordVisible}
          {...props}
        />

        {/* Sağ İkon / Şifre Toggle */}
        {isPassword ? (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            className="p-2"
          >
            {isPasswordVisible ? (
              <EyeOff size={20} color="#64748b" />
            ) : (
              <Eye size={20} color="#64748b" />
            )}
          </TouchableOpacity>
        ) : rightIcon ? (
          <View className="ml-3">{rightIcon}</View>
        ) : null}
      </View>

      {/* Hata Mesajı */}
      {error && (
        <Text className="text-accent-rose text-sm mt-1">{error}</Text>
      )}
    </View>
  );
};

