import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Library, ArrowLeft, Save, Trash2 } from 'lucide-react-native';

export default function Anota({ route, navigation }) {
  const { livro } = route.params;
  const [textoAnotacao, setTextoAnotacao] = useState(livro.anotacao || '');

  const temAnotacaoGuardada = livro.anotacao && livro.anotacao.trim().length > 0;

  const salvarAnotacao = async () => {
    if (Platform.OS !== 'web') Keyboard.dismiss(); 
    
    try {
      const livroRef = doc(db, 'livros', livro.id);
      await updateDoc(livroRef, {
        anotacao: textoAnotacao
      });
      
      if (Platform.OS === 'web') {
        navigation.goBack;
        navigation.goBack();
      } else {
        Alert.alert('Sucesso', 'Anotação guardada com sucesso!', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      }
    } catch (error) {
      if (Platform.OS === 'web') {
        window.alert('Não foi possível guardar a anotação.');
      } else {
        Alert.alert('Erro', 'Não foi possível guardar a anotação.');
      }
    }
  };

  const executarExclusao = async () => {
    try {
      const livroRef = doc(db, 'livros', livro.id);
      await updateDoc(livroRef, {
        anotacao: ''
      });
      navigation.goBack();
    } catch (error) {
      if (Platform.OS === 'web') {
        window.alert('Não foi possível remover a anotação.');
      } else {
        Alert.alert('Erro', 'Não foi possível remover a anotação.');
      }
    }
  };

  const confirmarExclusao = () => {
    if (Platform.OS !== 'web') Keyboard.dismiss();

    if (Platform.OS === 'web') {
      executarExclusao();
    } else {
      Alert.alert(
        'Remover Anotação',
        'Tem a certeza que deseja apagar esta anotação?',
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

  
  const renderConteudo = () => (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <TouchableOpacity style={styles.logoContainer} onPress={() => navigation.navigate('Biblioteca')}>
          <View style={styles.iconeLogo}>
            <Library size={20} color="#fff"/>
          </View>
          <Text style={styles.tituloHeader}>Minha Biblioteca</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
        <ArrowLeft size={16} color="#5f7564"/>
        <Text style={styles.textoVoltar}>Voltar</Text>
      </TouchableOpacity>

      <View style={styles.secaoDestaque}>
        <Text style={styles.textoDestaquePrincipal}>
          Notas sobre <Text style={styles.textoDestaqueItalico}>{livro.titulo}</Text>
        </Text>
        <Text style={styles.subtituloDestaque}>
          {livro.autor}
        </Text>
      </View>

      <View style={styles.cartaoFormulario}>
        <TextInput
          style={styles.inputArea}
          multiline
          placeholder="Escreva as suas ideias, citações favoritas ou reflexões sobre a leitura..."
          placeholderTextColor="#A9B4A9"
          value={textoAnotacao}
          onChangeText={setTextoAnotacao}
          textAlignVertical="top"
        />

        <TouchableOpacity style={styles.botaoSalvar} onPress={salvarAnotacao} activeOpacity={0.8}>
          <Save size={20} color="#fff"/>
          <Text style={styles.textoBotaoSalvar}>Guardar Anotação</Text>
        </TouchableOpacity>

        {temAnotacaoGuardada && (
          <TouchableOpacity style={styles.botaoRemover} onPress={confirmarExclusao} activeOpacity={0.8}>
            <Trash2 size={20} color="#D96C6C" />
            <Text style={styles.textoBotaoRemover}>Apagar Anotação</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {Platform.OS === 'web' ? (
          renderConteudo()
        ) : (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {renderConteudo()}
          </TouchableWithoutFeedback>
        )}
      </KeyboardAvoidingView>
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
    padding: 24,
    paddingTop: 40,
    paddingBottom:120
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
    marginBottom: 24,
  },
  textoVoltar: {
    color: '#7A827B',
    fontSize: 14,
  },
  secaoDestaque: {
    marginBottom: 24,
  },
  textoDestaquePrincipal: {
    color: '#29372F',
    fontSize: 32,
    lineHeight: 40,
  },
  textoDestaqueItalico: {
    color: '#687C6B',
    fontStyle: 'italic',
  },
  subtituloDestaque: {
    color: '#7B827C',
    fontSize: 16,
    marginTop: 8,
  },
  cartaoFormulario: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.70)',
    borderRadius: 25.6,
    padding: 24,
    borderWidth: 0.67,
    borderColor: '#E3E0D8',
    marginBottom: 40,
  },
  inputArea: {
    flex: 1,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#CFD6CD',
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    color: '#35443B',
    marginBottom: 24,
    minHeight: 120,
  },
  botaoSalvar: {
    flexDirection: 'row',
    backgroundColor: '#5F7564',
    padding: 16,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    elevation: 2,
  },
  textoBotaoSalvar: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botaoRemover: {
    flexDirection: 'row',
    backgroundColor: '#F9EDED',
    borderColor: '#F2E1E1',
    borderWidth: 1,
    padding: 16,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
  },
  textoBotaoRemover: {
    color: '#D96C6C',
    fontSize: 16,
    fontWeight: 'bold',
  }
});