// ============================================
// ROOT LAYOUT - Uygulama ana layout'u
// Expo Router ile navigasyon yapısı
// ============================================

import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator } from 'react-native';
import { useAuthStore, useTripStore, useReservationStore } from '../stores';
import '../global.css';

/**
 * Uygulama ana layout'u
 * - Store'ları başlatır
 * - Navigasyon yapısını tanımlar
 */
export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  
  const initializeAuth = useAuthStore((state) => state.initialize);
  const initializeTrips = useTripStore((state) => state.initialize);
  const initializeReservations = useReservationStore((state) => state.initialize);

  useEffect(() => {
    // Tüm store'ları başlat
    const initializeApp = async () => {
      try {
        await Promise.all([
          initializeAuth(),
          initializeTrips(),
          initializeReservations(),
        ]);
      } catch (error) {
        console.error('App initialization error:', error);
      } finally {
        setIsReady(true);
      }
    };

    initializeApp();
  }, []);

  // Yükleme ekranı
  if (!isReady) {
    return (
      <View className="flex-1 bg-dark-950 items-center justify-center">
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#020617' },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="trip-list" 
          options={{ 
            headerShown: true,
            headerTitle: 'Seferler',
            headerStyle: { backgroundColor: '#0f172a' },
            headerTintColor: '#fff',
          }} 
        />
        <Stack.Screen 
          name="seat-selection" 
          options={{ 
            headerShown: true,
            headerTitle: 'Koltuk Seçimi',
            headerStyle: { backgroundColor: '#0f172a' },
            headerTintColor: '#fff',
          }} 
        />
        <Stack.Screen 
          name="confirm" 
          options={{ 
            headerShown: true,
            headerTitle: 'Rezervasyon Onayı',
            headerStyle: { backgroundColor: '#0f172a' },
            headerTintColor: '#fff',
          }} 
        />
        <Stack.Screen 
          name="reservation-success" 
          options={{ 
            headerShown: false,
            gestureEnabled: false,
          }} 
        />
      </Stack>
    </>
  );
}



