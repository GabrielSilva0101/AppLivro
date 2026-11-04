import React from 'react';
import  { doc, deleteDoc } from 'firebase/firestore';
import {View, Text, StyleSheet, Image, Button, Alert} from 'react-native';
import { db } from '../config/firebase';

export default function DetalhesLivros({ route, navigation }) {

  const { livro } = route.params;

  const apgarLivro = async () => {
    try {
      await deleteDoc(doc(db, 'livros', livro.id));
      Alert.alert('Sucesso', 'Livro removido da biblioteca.');
      navigation.canGoBack();
    } catch (error) {
      Alert.alert('Erro, Não foi possível remover o livro.');
    }
  };


  return (
    <View style={styles.container}>
      {livro.capa ? (
        <Image source={{ uri: livro.capa }} style={styles.capa} />
      ) : (
        <View style={styles.capaPlaceholder}><Text>Sem capa</Text>
        </View>)}

      <Text style={styles.titulo}>{livro.titulo}</Text>
      <Text style={styles.autor}>{livro.autor}</Text>

      <View style={styles.botoes}>
        <Button
          title="Minhas Anotações"
          onPress={() => navigation.navigate('Anota', { livro })}
        />

        <View style={{ height: 16 }} />
        <Button
          title='Remover Livro'
          color='#ff4444'
          onPress={apgarLivro}
        />
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f5f5f5'
  },

  capa: {
    width: 150,
    height: 220,
    borderRadius: 8,
    marginBottom: 20
  },

  capaPlaceholder: {
    width: 150,
    height: 220,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20
  },

  titulo:{
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom:8
  },

  autor:{
    fontSize: 18,
    color: '#666',
    marginBottom: 30
  },

  botoes: {
    width: '100%',
    paddingHorizontal: 20
  }
});
