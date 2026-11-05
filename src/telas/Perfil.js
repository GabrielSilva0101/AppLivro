import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, Image, ActivityIndicator, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { collection, onSnapshot, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export default function Perfil({ navigation }) {
  const [totalLivros, setTotalLivros] = useState(0);
  const [totalAnotacoes, setTotalAnotacoes] = useState(0);

  const [nome, setNome] = useState('Leitor Curioso');
  const [bio, setBio] = useState('Explorando novos mundos através da leitura.');
  const [foto, setFoto] = useState(null);

  const [editando, setEditando] = useState(false);
  const [tempNome, setTempNome] = useState('');
  const [tempBio, setTempBio] = useState('');
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarPerfil = async () => {
      try {
        const perfilRef = doc(db, 'usuario', 'meuPerfil');
        const docSnap = await getDoc(perfilRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.nome) setNome(data.nome);
          if (data.bio) setBio(data.bio);
          if (data.foto) setFoto(data.foto);
        }
      } catch (error) {
        console.log("Erro ao carregar perfil:", error);
      }
    };

    carregarPerfil();

    const unsubscribe = onSnapshot(collection(db, 'livros'), (snapshot) => {
      const listaLivros = snapshot.docs.map(doc => doc.data());
      setTotalLivros(listaLivros.length);
      const anotacoesGuardadas = listaLivros.filter(l => l.anotacao && l.anotacao.trim().length > 0);
      setTotalAnotacoes(anotacoesGuardadas.length);
      setCarregando(false);
    });

    return () => unsubscribe();
  }, []);

  const escolherFoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão', 'Precisamos de acesso à galeria para alterar a foto.');
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.3,
      base64: true,
    });

    if (!resultado.canceled) {
      const imagemBase64 = `data:image/jpeg;base64,${resultado.assets[0].base64}`;
      setFoto(imagemBase64);

      try {
        const perfilRef = doc(db, 'usuario', 'meuPerfil');
        await setDoc(perfilRef, { foto: imagemBase64 }, { merge: true });
      } catch (error) {
        console.log("Erro ao guardar foto:", error);
      }
    }
  };

  const iniciarEdicao = () => {
    setTempNome(nome);
    setTempBio(bio);
    setEditando(true);
  };

  const salvarPerfil = async () => {
    try {
      const perfilRef = doc(db, 'usuario', 'meuPerfil');
      await setDoc(perfilRef, {
        nome: tempNome,
        bio: tempBio,
      }, { merge: true });

      setNome(tempNome);
      setBio(tempBio);
      setEditando(false);
    } catch (error) {
      if (Platform.OS === 'web') window.alert('Erro ao guardar perfil.');
      else Alert.alert('Erro', 'Não foi possível guardar os dados do perfil.');
    }
  };

  if (carregando) {
    return (
      <View style={[styles.safeArea, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#5F7564" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        <View style={styles.cabecalho}>
          <TouchableOpacity style={styles.logoContainer} onPress={() => navigation.navigate('Biblioteca')}>
            <View style={styles.iconeLogo}>
              <Ionicons name="library" size={20} color="#FFF" />
            </View>
            <Text style={styles.tituloHeader}>Minha Biblioteca</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botaoOpcoes} onPress={() => navigation.navigate('Home')}>
            <Ionicons name="home-outline" size={20} color="#4F6856" />
          </TouchableOpacity>
        </View>

        <View style={styles.cartaoPerfil}>
          <TouchableOpacity style={styles.areaFoto} onPress={escolherFoto} activeOpacity={0.8}>
            {foto ? (
              <Image source={{ uri: foto }} style={styles.fotoPerfil} />
            ) : (
              <View style={[styles.fotoPerfil, styles.fotoPlaceholder]}>
                <Ionicons name="person" size={40} color="#A9B4A9" />
              </View>
            )}
            <View style={styles.iconeEdicaoFoto}>
              <Ionicons name="camera" size={16} color="#FFF" />
            </View>
          </TouchableOpacity>

          {editando ? (
            <View style={styles.areaEdicao}>
              <TextInput
                style={styles.inputNome}
                value={tempNome}
                onChangeText={setTempNome}
                placeholder="Seu Nome"
              />
              <TextInput
                style={styles.inputBio}
                value={tempBio}
                onChangeText={setTempBio}
                placeholder="Sua bio..."
                multiline
              />
              <TouchableOpacity style={styles.botaoSalvar} onPress={salvarPerfil}>
                <Text style={styles.textoBotaoSalvar}>Guardar Alterações</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.areaVisualizacao}>
              <Text style={styles.nomeUsuario}>{nome}</Text>
              <Text style={styles.bioUsuario}>{bio}</Text>
              <TouchableOpacity style={styles.botaoEditar} onPress={iniciarEdicao}>
                <Ionicons name="pencil-outline" size={16} color="#5F7564" />
                <Text style={styles.textoBotaoEditar}>Editar Perfil</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <Text style={styles.tituloSecao}>A sua jornada</Text>

        <View style={styles.metricasContainer}>
          {/* Cartão Coleção -> Leva para a Biblioteca */}
          <TouchableOpacity
            style={styles.cartaoMetrica}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Biblioteca')}
          >
            <View style={[styles.caixaIconeMetrica, { backgroundColor: '#DFE9DE' }]}>
              <Ionicons name="book" size={24} color="#4F6856" />
            </View>
            <Text style={styles.numeroMetrica}>{totalLivros}</Text>
            <Text style={styles.textoMetrica}>Coleção</Text>
          </TouchableOpacity>

          {/* Cartão Anotações -> Leva para a Lista de Anotações */}
          <TouchableOpacity
            style={styles.cartaoMetrica}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('ListaAnotacoes')}
          >
            <View style={[styles.caixaIconeMetrica, { backgroundColor: '#E4E0EC' }]}>
              <Ionicons name="document-text" size={24} color="#655E78" />
            </View>
            <Text style={styles.numeroMetrica}>{totalAnotacoes}</Text>
            <Text style={styles.textoMetrica}>Anotações</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F2EB'
  },

  container: {
    padding: 24,
    paddingTop: 40
  },

  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40
  },

  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },

  iconeLogo: {
    width: 40,
    height: 40,
    backgroundColor: '#5F7564',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2
  },
  tituloHeader: {
    color: '#26352D',
    fontSize: 18,
    fontWeight: 'bold'
  },

  botaoOpcoes: {
    width: 40,
    height: 40,
    backgroundColor: '#DFE9DE',
    borderRadius: 20,
    borderWidth: 0.67,
    borderColor: '#9EAFA0',
    justifyContent: 'center',
    alignItems: 'center'
  },

  cartaoPerfil: {
    backgroundColor: 'rgba(255, 255, 255, 0.70)',
    borderRadius: 32,
    padding: 24,
    alignItems: 'center',
    borderWidth: 0.67,
    borderColor: '#E3E0D8',
    marginBottom: 40
  },

  areaFoto: {
    position: 'relative',
    marginBottom: 20
  },

  fotoPerfil: {
    width: 100,
    height: 100,
    borderRadius: 50
  },

  fotoPlaceholder: {
    backgroundColor: '#E4E1D9',
    justifyContent: 'center',
    alignItems: 'center'
  },

  iconeEdicaoFoto: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#5F7564',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFF'
  },


  areaVisualizacao: {
    alignItems: 'center',
    width: '100%'
  },
  nomeUsuario: {
    color: '#29372F',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8
  },

  bioUsuario: {
    color: '#7B897D',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20
  },

  botaoEditar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(95, 117, 100, 0.1)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20
  },
  textoBotaoEditar: {
    color: '#5F7564',
    fontWeight: '600'
  },
  areaEdicao: {
    width: '100%',
    alignItems: 'center'
  },
  inputNome: {
    width: '100%',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#CFD6CD',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: '#29372F',
    marginBottom: 12,
    textAlign: 'center'
  },
  inputBio: {
    width: '100%',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#CFD6CD',
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    color: '#7B897D',
    marginBottom: 20,
    textAlign: 'center',
    minHeight: 80
  },
  botaoSalvar: {
    backgroundColor: '#5F7564',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24
  },

  textoBotaoSalvar: {
    color: '#FFF',
    fontWeight: 'bold'
  },

  tituloSecao: {
    color: '#29372F',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  },

  metricasContainer: {
    flexDirection: 'row',
    gap: 16
  },

  cartaoMetrica: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 20,
    borderWidth: 0.67,
    borderColor: '#E3E0D8'
  },

  caixaIconeMetrica: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16
  },

  numeroMetrica: {
    color: '#29372F',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4
  },

  textoMetrica: {
    color: '#8A8F88',
    fontSize: 14,
    fontWeight: '500'
  }
});