import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Vibration, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { collection, addDoc } from 'firebase/firestore';
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
      
      Vibration.vibrate(500); // Mantém o atuador exigido no projeto
      Alert.alert('Sucesso', 'Livro guardado na sua biblioteca!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível guardar o livro.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Cabeçalho */}
        <View style={styles.cabecalho}>
          <View style={styles.logoContainer}>
            <View style={styles.iconeLogo}>
              <Ionicons name="library" size={20} color="#FFF" />
            </View>
            <Text style={styles.tituloHeader}>Minha Biblioteca</Text>
          </View>
        </View>

        
        <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={16} color="#7A827B" />
          <Text style={styles.textoVoltar}>Voltar</Text>
        </TouchableOpacity>

        
        <View style={styles.secaoDestaque}>
          <View style={styles.tagContainer}>
            <View style={styles.linhaTag} />
            <Text style={styles.textoTag}>NOVO REGISTO</Text>
          </View>
          <Text style={styles.textoDestaquePrincipal}>
            Adicionar <Text style={styles.textoDestaqueItalico}>livro</Text>
          </Text>
          <Text style={styles.subtituloDestaque}>
            Guarde uma nova história na sua coleção.
          </Text>
        </View>

        {/* Formulário */}
        <View style={styles.cartaoFormulario}>
          <Text style={styles.label}>Título do Livro</Text>
          <TextInput 
            style={styles.input} 
            value={titulo} 
            onChangeText={setTitulo} 
            placeholder="Ex: Dom Casmurro" 
            placeholderTextColor="#A9B4A9"
          />

          <Text style={styles.label}>Autor</Text>
          <TextInput 
            style={styles.input} 
            value={autor} 
            onChangeText={setAutor} 
            placeholder="Ex: Machado de Assis" 
            placeholderTextColor="#A9B4A9"
          />

          <Text style={styles.label}>Link da Capa (URL)</Text>
          <TextInput 
            style={styles.input} 
            value={capa} 
            onChangeText={setCapa} 
            placeholder="https://exemplo.com/capa.jpg" 
            placeholderTextColor="#A9B4A9"
            autoCapitalize="none"
          />

          <TouchableOpacity style={styles.botaoSalvar} onPress={salvarLivro} activeOpacity={0.8}>
            <Ionicons name="checkmark-circle-outline" size={20} color="#FFF" />
            <Text style={styles.textoBotaoSalvar}>Guardar Livro</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F2EB',
  },
  container: {
    padding: 24,
    paddingTop: 40,
    paddingBottom: 40,
  },
  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconeLogo: {
    width: 40,
    height: 40,
    backgroundColor: '#5F7564',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  tituloHeader: {
    color: '#26352D',
    fontSize: 18,
    fontWeight: 'bold',
  },
  botaoVoltar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 28,
  },
  textoVoltar: {
    color: '#7A827B',
    fontSize: 14,
  },
  secaoDestaque: {
    marginBottom: 32,
  },
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  linhaTag: {
    width: 32,
    height: 1,
    backgroundColor: '#A9B4A9',
  },
  textoTag: {
    color: '#7B897D',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 2.64,
  },
  textoDestaquePrincipal: {
    color: '#29372F',
    fontSize: 48,
    lineHeight: 52,
  },
  textoDestaqueItalico: {
    color: '#687C6B',
    fontStyle: 'italic',
  },
  subtituloDestaque: {
    color: '#7B827C',
    fontSize: 14,
    marginTop: 12,
  },
  cartaoFormulario: {
    backgroundColor: 'rgba(255, 255, 255, 0.70)',
    borderRadius: 25.6,
    padding: 24,
    borderWidth: 0.67,
    borderColor: '#E3E0D8',
  },
  label: {
    color: '#344239',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#CFD6CD',
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    color: '#35443B',
    marginBottom: 24,
  },
  botaoSalvar: {
    flexDirection: 'row',
    backgroundColor: '#5F7564',
    padding: 16,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  textoBotaoSalvar: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  }
});