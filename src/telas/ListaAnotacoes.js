import { Ionicons } from '@expo/vector-icons';
import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { db } from '../config/firebase';
import { Library, EllipsisHorizontal, BookOpen, User, FileText, ChevronRight, PlusCircle } from 'lucide-react-native';

export default function ListaAnotacoes({ navigation }) {
  const [livros, setLivros] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {

    const unsubscribe = onSnapshot(collection(db, 'livros'), (querySnapshot) => {
      const listaLivros = [];
      querySnapshot.forEach((doc) => {
        listaLivros.push({ ...doc.data(), id: doc.id });
      });
      setLivros(listaLivros);
      setCarregando(false);
    });

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }) => {

    const temAnotacao = item.anotacao && item.anotacao.trim().length > 0;

    return (
      <TouchableOpacity
        style={styles.cartaoLivro}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('Anota', { livro: item })}
      >
        <View style={styles.containerCapa}>
          {item.capa ? (
            <Image source={{ uri: item.capa }} style={styles.imagemCapa} />
          ) : (
            <View style={[styles.imagemCapa, styles.placeholderCapa]}>
              <Library size={24} color="#A9B4A9" />
            </View>
          )}
        </View>

        <View style={styles.infoLivro}>
          <Text style={styles.tituloLivro} numberOfLines={1}>{item.titulo}</Text>
          <Text style={styles.autorLivro} numberOfLines={1}>{item.autor}</Text>

          <View style={styles.tagAnotacao}>
            <View style={styles.tagAnotacao}>
              {temAnotacao ? (
                <FileText size={14} color="#5F7564" />
              ) : (
                <PlusCircle size={14} color="#8A8F88" />
              )}
            </View>
            <Text style={[styles.textoAnotacao, temAnotacao && styles.textoAnotacaoAtiva]}>
              {temAnotacao ? '1 Anotação guardada' : 'Adicionar anotação'}
            </Text>
          </View>
        </View>

        <ChevronRight size={18} color="#CFD6CD" />
      </TouchableOpacity>
    );
  };

  if (carregando) {
    return (
      <View style={[styles.containerPrincipal, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#5F7564" />
      </View>
    );
  }

  return (
    <View style={styles.containerPrincipal}>
      {/* Cabeçalho */}
      <View style={styles.cabecalho}>
        <TouchableOpacity style={styles.logoContainer} onPress={() => navigation.navigate('Biblioteca')}>
          <View style={styles.iconeLogo}>
            <Library size={20} color="#FFF" />
          </View>
          <Text style={styles.tituloHeader}>Minha Biblioteca</Text>
        </TouchableOpacity>
        {/*<TouchableOpacity style={styles.botaoOpcoes} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home-outline" size={20} color="#4F6856" />
        </TouchableOpacity>*/}
      </View>

      {/* <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={16} color="#7A827B" />
        <Text style={styles.textoVoltar}>Voltar</Text>
      </TouchableOpacity>*/}

      <View style={styles.secaoDestaque}>
        <View style={styles.tagContainer}>
          <View style={styles.linhaTag} />
          <Text style={styles.textoTag}>SUAS IDEIAS</Text>
        </View>
        <Text style={styles.textoDestaquePrincipal}>
          Minhas <Text style={styles.textoDestaqueItalico}>anotações</Text>
        </Text>
        <Text style={styles.subtituloDestaque}>
          Escolha um livro para ler ou escrever as suas notas.
        </Text>
      </View>


      <FlatList
        data={livros}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
    backgroundColor: '#F5F2EB',
    padding: 24,
    paddingTop: 80,
    paddingBottom: 120
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
  botaoOpcoes: {
    width: 40,
    height: 40,
    backgroundColor: '#DFE9DE',
    borderRadius: 20,
    borderWidth: 0.67,
    borderColor: '#9EAFA0',
    justifyContent: 'center',
    alignItems: 'center',
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
    marginBottom: 24,
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
    fontSize: 40,
    lineHeight: 48,
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
  cartaoLivro: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.70)',
    borderRadius: 20,
    padding: 12,
    marginBottom: 16,
    borderWidth: 0.67,
    borderColor: '#E3E0D8',
  },
  containerCapa: {
    width: 60,
    height: 90,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#E4E1D9',
  },
  imagemCapa: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderCapa: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoLivro: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  tituloLivro: {
    color: '#35443B',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  autorLivro: {
    color: '#858B84',
    fontSize: 14,
    marginBottom: 12,
  },
  tagAnotacao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  textoAnotacao: {
    color: '#8A8F88',
    fontSize: 12,
    fontWeight: '500',
  },
  textoAnotacaoAtiva: {
    color: '#5F7564',
  }
});