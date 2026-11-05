import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, SafeAreaView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export default function DetalhesLivro({ route, navigation }) {
  const { livro } = route.params;

  const executarExclusao = async () => {
    try {
      await deleteDoc(doc(db, 'livros', livro.id));
      navigation.goBack();
    } catch (error) {
      if (Platform.OS !== 'web') {
        Alert.alert('Erro', 'Não foi possível remover o livro.');
      }
    }
  };

  const confirmarExclusao = () => {
    
    if (Platform.OS === 'web') {
      executarExclusao();
    } else {
      Alert.alert(
        'Remover Livro',
        `Tem a certeza que deseja excluir "${livro.titulo}" da sua coleção?`,
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Remover',
            style: 'destructive',
            onPress: executarExclusao
          }
        ]
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        
        <View style={styles.cabecalho}>
          <TouchableOpacity style={styles.botaoFechar} onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={24} color="#7A827B" />
          </TouchableOpacity>
        </View>

        
        <View style={styles.conteudoCentral}>
          <View style={styles.containerCapa}>
            {livro.capa ? (
              <Image source={{ uri: livro.capa }} style={styles.capa} />
            ) : (
              <View style={[styles.capa, styles.placeholderCapa]}>
                <Ionicons name="book" size={60} color="#A9B4A9" />
              </View>
            )}
          </View>
          <Text style={styles.titulo}>{livro.titulo}</Text>
          <Text style={styles.autor}>{livro.autor}</Text>
        </View>

        
        <View style={styles.menuFlutuante}>
          <View style={styles.tracoDeslize} />

          
          <TouchableOpacity 
            style={[styles.cartaoAcao, styles.cartaoAnotacao]} 
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Anota', { livro })}
          >
            <View style={styles.caixaIconeAnotacao}>
              <Ionicons name="document-text" size={24} color="#FFF" />
            </View>
            <View style={styles.caixaTextoAcao}>
              <Text style={styles.tituloAcaoAnotacao}>Anotações</Text>
              <Text style={styles.subtituloAcao}>Ler ou escrever ideias</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#5F7564" />
          </TouchableOpacity>

          
          <TouchableOpacity 
            style={[styles.cartaoAcao, styles.cartaoRemover]} 
            activeOpacity={0.7}
            onPress={confirmarExclusao}
          >
            <View style={styles.caixaIconeRemover}>
              <Ionicons name="trash-outline" size={24} color="#D96C6C" />
            </View>
            <View style={styles.caixaTextoAcao}>
              <Text style={styles.tituloAcaoRemover}>Remover livro</Text>
              <Text style={styles.subtituloAcao}>Excluir da biblioteca</Text>
            </View>
          </TouchableOpacity>
          
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F2EB',
  },

  container: {
    flex: 1,
    justifyContent: 'space-between',
  },

  cabecalho: {
    padding: 24,
    alignItems: 'flex-end',
  },

  botaoFechar: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  conteudoCentral: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },

  containerCapa: {
    width: 160,
    height: 240,
    borderRadius: 16,
    backgroundColor: '#E4E1D9',
    elevation: 8,
    shadowColor: 'rgba(62, 69, 62, 0.2)',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 1,
    shadowRadius: 24,
    marginBottom: 24,
  },

  capa: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    resizeMode: 'cover',
  },

  placeholderCapa: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  titulo: {
    color: '#29372F',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },

  autor: {
    color: '#7B897D',
    fontSize: 16,
    textAlign: 'center',
  },

  menuFlutuante: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    paddingTop: 16,
    paddingBottom: 40,
    elevation: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
  },

  tracoDeslize: {
    width: 48,
    height: 4,
    backgroundColor: '#E5E2DA',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 24,
  },

  cartaoAcao: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 16,
  },

  cartaoAnotacao: {
    backgroundColor: 'rgba(95, 117, 100, 0.05)',
    borderColor: 'rgba(95, 117, 100, 0.2)',
  },

  cartaoRemover: {
    backgroundColor: '#FFF',
    borderColor: '#F2E1E1',
  },

  caixaIconeAnotacao: {
    width: 48,
    height: 48,
    backgroundColor: '#5F7564',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  caixaIconeRemover: {
    width: 48,
    height: 48,
    backgroundColor: '#F9EDED',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  caixaTextoAcao: {
    flex: 1,
    marginLeft: 16,
  },

  tituloAcaoAnotacao: {
    color: '#29372F',
    fontSize: 16,
    fontWeight: 'bold',
  },

  tituloAcaoRemover: {
    color: '#D96C6C',
    fontSize: 16,
    fontWeight: 'bold',
  },

  subtituloAcao: {
    color: '#8A8F88',
    fontSize: 14,
    marginTop: 2,
  }
});