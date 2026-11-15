import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Block1 from './exercises/Block1';

// Each study block gets its own file in exercises/.
// To switch blocks, change the import above and the tag below.
export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Block1 />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingTop: 50 },
});
