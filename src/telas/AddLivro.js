import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, Vibration, View } from 'react-native';
import { db } from '../config/firebase';

export default function AddLivro({ navigation }) {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [capa, setCapa] = useState('');

  const salvarLivro = async () => {
    if (titulo === '' || autor === '') {
      Alert.alert('Erro', 'Por favor, preencha o título e o autor.');
      return;
    }

    try {
      await addDoc(collection(db, 'livros'), {
        titulo: titulo,
        autor: autor,
        capa: capa
      });
      
      Vibration.vibrate(500); // Atuador exigido no projeto
      Alert.alert('Sucesso', 'Livro salvo na nuvem!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o livro.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título do Livro:</Text>
      <TextInput style={styles.input} value={titulo} onChangeText={setTitulo} placeholder="Ex: Dom Casmurro" />

      <Text style={styles.label}>Autor:</Text>
      <TextInput style={styles.input} value={autor} onChangeText={setAutor} placeholder="Ex: Machado de Assis" />

      <Text style={styles.label}>Link da Capa (URL da imagem):</Text>
      <TextInput style={styles.input} value={capa} onChangeText={setCapa} placeholder="https://..." />

      <Button title="Salvar Livro" onPress={salvarLivro} color="#0066cc" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5', justifyContent: 'center' },
  label: { fontSize: 16, marginBottom: 8, fontWeight: 'bold' },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 20 }
});