import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { db } from '../config/firebase';

export default function Anota({ route, navigation }) {

  const { livro } = route.params;

  const [anotacao, setAnotacao] = useState(livro.anotacao || '');

  const salvarAnotacao = async () => {
    try {
      const livroRef = doc(db, 'livros', livro.id);

      await updateDoc(livroRef, {
        anotacao: anotacao
      });

      Alert.alert('Sucesso', 'Anotação feita com sucesso!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível guardar a anotação.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Notas sobre: {livro.titulo}</Text>

      <TextInput
        style={styles.input}
        multiline={true}
        numberOfLines={10}
        value={anotacao}
        onChangeText={setAnotacao}
        placeholder="Escreva aqui..."
        textAlignVertical="top"
      />

      <Button title="Guardar Anotações" onPress={salvarAnotacao} color="#0066cc" />
    </View>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5'
  },

  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center'
  },

  input:{
    backgroundColor:'#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    height: 200,
    marginBottom: 20
  }
});