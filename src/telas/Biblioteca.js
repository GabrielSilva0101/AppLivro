import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Dados temporários até ligarmos o Firebase
const livrosSalvos = [
  {
    id: '1',
    titulo: 'A Hora da Estrela',
    autor: 'Clarice Lispector',
    capa: 'https://m.media-amazon.com/images/I/61TaHURu27L._AC_UF1000,1000_QL80_.jpg'
  },
  {
    id: '2',
    titulo: 'Dom Casmurro',
    autor: 'Machado de Assis',
    capa: 'https://m.media-amazon.com/images/I/81Ok1AONnbS.jpg'
  }
];

export default function Biblioteca({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.cartao} 
      onPress={() => navigation.navigate('DetalhesLivro', { livro: item })}
    >
      <Image source={{ uri: item.capa }} style={styles.capa} />
      <View style={styles.info}>
        <Text style={styles.titulo}>{item.titulo}</Text>
        <Text style={styles.autor}>{item.autor}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={livrosSalvos}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.lista}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  lista: { padding: 16 },
  cartao: { flexDirection: 'row', backgroundColor: '#fff', marginBottom: 16, borderRadius: 8, padding: 12, elevation: 2 },
  capa: { width: 70, height: 100, borderRadius: 4 },
  info: { marginLeft: 16, justifyContent: 'center', flex: 1 },
  titulo: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  autor: { fontSize: 14, color: '#666' }
});