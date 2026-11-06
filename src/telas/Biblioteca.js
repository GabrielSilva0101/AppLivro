import { Ionicons } from '@expo/vector-icons';
import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { db } from '../config/firebase';
import { Library, Search, Plus, Book, ChevronRight } from 'lucide-react-native';

export default function Biblioteca({ navigation }) {
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

  
  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.cartaoLivro} 
      activeOpacity={0.7}
      onPress={() => navigation.navigate('DetalhesLivro', { livro: item })}
    >
      <View style={styles.containerCapa}>
        {item.capa ? (
          <Image source={{ uri: item.capa }} style={styles.imagemCapa} />
        ) : (
          <View style={[styles.imagemCapa, styles.placeholderCapa]}>
            <Library size={20} color="#A9B4A9" />
          </View>
        )}
        
        
        <View style={styles.overlayCapa}>
          <Text style={styles.tituloOverlay} numberOfLines={2}>{item.titulo}</Text>
        </View>
      </View>

      <View style={styles.infoLivro}>
        <Text style={styles.tituloLivro} numberOfLines={1}>{item.titulo}</Text>
        <Text style={styles.autorLivro} numberOfLines={1}>{item.autor}</Text>
      </View>
    </TouchableOpacity>
  );

  
  const Cabecalho = () => (
    <View style={styles.headerContainer}>
      
      <View style={styles.cabecalhoTopo}>
        <View style={styles.logoContainer}>
          <View style={styles.iconeLogo}>
            <Library size={20} color="#ffff" />
          </View>
          <Text style={styles.tituloHeader}>Minha Biblioteca</Text>
        </View>
       {/* <TouchableOpacity style={styles.botaoOpcoes}
          onPress={()=> navigation.navigate('Perfil')}
        >
          <Ionicons name="settings-outline" size={20} color="#4F6856" />
        </TouchableOpacity>*/}
      </View>

      
     {/* <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={16} color="#7A827B" />
        <Text style={styles.textoVoltar}>Voltar para o início</Text>
      </TouchableOpacity>*/}

      
      <View style={styles.secaoDestaque}>
        <View style={styles.tagContainer}>
          <View style={styles.linhaTag} />
          <Text style={styles.textoTag}>MINHA COLEÇÃO</Text>
        </View>
        
        <Text style={styles.textoDestaquePrincipal}>
          Meus <Text style={styles.textoDestaqueItalico}>livros</Text>
        </Text>
        
        <Text style={styles.subtituloDestaque}>
          {livros.length} {livros.length === 1 ? 'livro guardado' : 'livros guardados'}
        </Text>

        <TouchableOpacity 
          style={styles.botaoAdicionar}
          onPress={() => navigation.navigate('AddLivro')}
        >
          <Plus size={22} color="#FFF" />
          <Text style={styles.textoBotaoAdicionar}>Adicionar livro</Text>
        </TouchableOpacity>
      </View>
    </View>
  );


  const Rodape = () => (
    <View style={styles.rodape}>
      <Text style={styles.textoRodape}>Seu próximo capítulo começa aqui.</Text>
    </View>
  );

  if (carregando) {
    return (
      <View style={[styles.safeArea, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#5F7564" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={livros}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        numColumns={2} 
        columnWrapperStyle={styles.linhaGrelha}
        contentContainerStyle={styles.listaContainer}
        ListHeaderComponent={Cabecalho}
        ListFooterComponent={Rodape}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F2EB',
  },
  listaContainer: {
    padding: 24,
    paddingTop: 40,
    paddingBottom:120
  },
  headerContainer: {
    marginBottom: 36,
  },
  cabecalhoTopo: {
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
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
    alignItems: 'flex-start',
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
    marginBottom: 24,
  },
  botaoAdicionar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5F7564',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    gap: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  textoBotaoAdicionar: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
  },
  linhaGrelha: {
    justifyContent: 'space-between',
  },
  cartaoLivro: {
    width: '48%', 
    marginBottom: 24,
  },
  containerCapa: {
    width: '100%',
    height: 198,
    backgroundColor: '#E4E1D9',
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: 'rgba(62, 69, 62, 0.10)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 28,
  },
  imagemCapa: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderCapa: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E4E1D9',
  },
  overlayCapa: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingTop: 30, 
    backgroundColor: 'rgba(36, 48, 41, 0.4)', 
  },
  tituloOverlay: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoLivro: {
    marginTop: 12,
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
  },
  rodape: {
    marginTop: 20,
    paddingVertical: 20,
    borderTopWidth: 0.67,
    borderColor: '#E7E4DC',
    alignItems: 'center',
  },
  textoRodape: {
    color: '#8A8F88',
    fontSize: 12,
  }
});