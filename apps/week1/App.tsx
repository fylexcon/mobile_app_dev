import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Alert } from 'react-native';
import { ProfileCard } from './components/ProfileCard';

// 1. Data Structures (Separation of Data and UI)
interface StudentProfile {
  fullName: string;
  department: string;
  grade: string;
  interests: string[];
}

const studentData: StudentProfile = {
  fullName: 'Mehmet Selim Suna',
  department: 'Bilgisayar Mühendisliği',
  grade: '3. Sınıf',
  interests: ['Yapay Zeka', 'Mobil Uygulama', 'Kuantum Hesaplama'],
};

// Week 2: Profile Data
const profileData = {
  name: 'Ayşe Yılmaz',
  bio: 'Mobil uygulamalar geliştirmeyi ve yeni teknolojiler öğrenmeyi seviyorum.',
  location: 'Malatya',
  avatarUrl: 'C:/Users/ASUS/mobile_app_dev/apps/week1/assets/original_ce428de0-eb01-4af4-bc89-81879f050e66_Screenshot_20251124_214254_WhatsApp.jpg',
  postsCount: 120,
  followersCount: 560,
  followingCount: 230,
};

export default function App() {
  const [showProfile, setShowProfile] = useState(false);

  const handlePress = () => {
    // Toggle the display of the new ProfileCard
    setShowProfile(true);
  };

  const handleSendMessage = () => {
    Alert.alert(
      "Mesaj Gönderildi",
      `${profileData.name}'a mesaj gönderildi!`,
      [{ text: "Tamam" }]
    );
  };

  return (
    <View style={styles.container}>
      {showProfile ? (
        <ProfileCard
          name={profileData.name}
          bio={profileData.bio}
          location={profileData.location}
          avatarUrl={profileData.avatarUrl}
          postsCount={profileData.postsCount}
          followersCount={profileData.followersCount}
          followingCount={profileData.followingCount}
          onSendMessage={handleSendMessage}
        />
      ) : (
        <View style={styles.card}>
          {/* Profile Info Header */}
          <Text style={styles.nameText}>{studentData.fullName}</Text>
          <Text style={styles.deptText}>{studentData.department}</Text>
          <Text style={styles.gradeText}>{studentData.grade}</Text>

          {/* Section Divider / Label */}
          <View style={styles.divider} />
          <Text style={styles.sectionTitle}>İlgi Alanları</Text>

          {/* Dynamic List via .map() */}
          <View style={styles.interestsContainer}>
            {studentData.interests.map((interest, index) => (
              <View key={`${interest}-${index}`} style={styles.interestBadge}>
                <Text style={styles.interestText}>{interest}</Text>
              </View>
            ))}
          </View>

          {/* Action Button */}
          <Pressable
            style={({ pressed }) => [
              styles.actionButton,
              pressed && styles.actionButtonPressed,
            ]}
            onPress={handlePress}
          >
            <Text style={styles.actionButtonText}>Profili İncele</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

// 2. StyleSheet Definitions
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6', // Light neutral background
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    // Shadow / Card Elevation
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3, // Android fallback
  },
  nameText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
    textAlign: 'center',
  },
  deptText: {
    fontSize: 15,
    color: '#4B5563',
    marginBottom: 2,
    textAlign: 'center',
  },
  gradeText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
    textAlign: 'center',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 12,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 8, // Modern Flex gap supported in current React Native
  },
  interestBadge: {
    backgroundColor: '#EFF6FF',
    borderColor: '#BFDBFE',
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  interestText: {
    color: '#1D4ED8',
    fontSize: 12,
    fontWeight: '500',
  },
  actionButton: {
    width: '100%',
    backgroundColor: '#7B1E3A', // Institutional Burgundy tone
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonPressed: {
    opacity: 0.85,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});
