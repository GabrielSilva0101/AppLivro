import { Button, StyleSheet, Text, View } from 'react-native';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Tela Inicial (Home)</Text>
      <Button
        title="Acessar Minha Biblioteca"
        onPress={() => navigation.navigate('Biblioteca')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' }
});