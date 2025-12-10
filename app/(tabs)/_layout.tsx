// ============================================
// TABS LAYOUT - Ana sekme navigasyonu
// ============================================

import React from 'react';
import { Tabs } from 'expo-router';
import { View, Text } from 'react-native';
import { Home, Ticket, User, Settings } from 'lucide-react-native';
import { useAuthStore } from '../../stores';

/**
 * Tab bar ikonu bileşeni
 */
const TabIcon = ({
  icon: Icon,
  focused,
  label,
}: {
  icon: React.ElementType;
  focused: boolean;
  label: string;
}) => (
  <View className="items-center">
    <Icon size={24} color={focused ? '#6366f1' : '#64748b'} />
    <Text
      className={`text-xs mt-1 ${focused ? 'text-primary-500' : 'text-dark-500'}`}
    >
      {label}
    </Text>
  </View>
);

/**
 * Tabs layout
 * - Ana sayfa
 * - Rezervasyonlarım
 * - Admin Paneli (sadece admin için)
 * - Profil
 */
export default function TabsLayout() {
  // isAdmin'i selector ile al
  const currentUser = useAuthStore((state) => state.currentUser);
  const isAdmin = currentUser?.role === 'admin';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0f172a',
          borderTopColor: '#1e293b',
          borderTopWidth: 1,
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#6366f1',
        tabBarInactiveTintColor: '#64748b',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={Home} focused={focused} label="Ana Sayfa" />
          ),
        }}
      />
      <Tabs.Screen
        name="my-trips"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={Ticket} focused={focused} label="Biletlerim" />
          ),
        }}
      />
      <Tabs.Screen
        name="admin"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={Settings} focused={focused} label="Admin" />
          ),
          href: isAdmin ? undefined : null, // Admin değilse gizle
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={User} focused={focused} label="Profil" />
          ),
        }}
      />
    </Tabs>
  );
}
