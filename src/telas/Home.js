import { Button, StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IOSReferenceFrame } from 'react-native-reanimated';

export default function Home({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>

        <View style={styles.cabecalho}>
          <View style={styles.logoContainer}>
            <View style={styles.iconeLogo}>
              <Ionicons name="library" size={20} color='#FFF' />
            </View>
            <Text style={styles.tituloHeader}>Minha Biblioteca</Text>
          </View>
          <TouchableOpacity style={styles.botaoOpcoes}>
            <Ionicons name="ellipsis-horizontal" size={20} color="#647268" />
          </TouchableOpacity>
        </View>

        <View style={styles.secaoBoaVindas}>
          <View style={styles.tagContainer}>
            <View style={styles.linhaTag} />
            <Text style={styles.textoTag}>SEU ESPAÇO DE LEITURA</Text>
          </View>

          <Text style={styles.textoDestaque}>
            Histórias, ideias e descobertas reunidas em um lugar tranquilo, feito para você.
          </Text>
        </View>

        <View style={styles.secaoBotoes}>

          <TouchableOpacity
            style={[styles.cartao, styles.cartaoInativo]}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Biblioteca')}
          >
            <View style={[styles.caixaIcone, { backgroundColor: '#DFE9DE' }]}>
              <Ionicons name="book-outline" size={24} color="#4F6856" />
            </View>
            <View style={styles.caixaTexto}>
              <Text styles={styles.tituloCartao}>Livros</Text>
              <Text style={styles.subtituloCartao}>Explore sua coleção</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#657768" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.cartao, styles.cartaoInativo]}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Perfil')}
          >
            <View style={[styles.caixaIcone, { backgroundColor: '#EADFDA' }]}>
              <Ionicons name="person-outline" size={24} color="#7B5E56" />
            </View>

            <View style={styles.caixaTexto}>
              <Text style={styles.tituloCartao}>Perfil</Text>
              <Text style={styles.subtituloCartao}>Sua jornada de leitura</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#A9ACA7" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.cartao, styles.cartaoInativo]}
            activeOpacity={0.7}
            onPress={() => alert('Para ver anotações, abra um livro na sua Biblioteca primeiro.')}
          >
            <View style={[styles.caixaIcone, { backgroundColor: '#E4E0EC' }]}>
              <Ionicons name="document-text-outline" size={24} color="#655E78" />
            </View>

            <View style={styles.caixaTexto}>
              <Text style={styles.tituloCartao}>Anotações</Text>
              <Text style={styles.subtituloCartao}>Guarde suas ideias</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#A9ACA7" />
          </TouchableOpacity>

        </View>

        <View style={styles.rodape}>
          <Text style={styles.textoRodape}>Seu Próximo capítulo começa aqui.</Text>
        </View>

      </ScrollView>
    </SafeAreaView>


  );
}

const styles = StyleSheet.create({
  safeArea:{
    flex: 1,
    backgroundColor: '#F5F2EB'
  },

  container: {
    padding: 24,
    paddingTop: 40 
  },

  cabecalho:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40
  },

  logoContainer:{
    flexDirection:'row',
    alignItems: 'center',
    gap: 12,
  },

  iconeLogo:{
    width:40,
    height: 40,
    backgroundColor: '#5F7564',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset:{ width:0, height:1},
    shadowOpacity: 0.1,
    shadowRadius: 3
  },

  tituloHeader:{
    color:'#26352D',
    fontSize: 18,
    fontWeight: 'bold'
  },

  botaoOpcoes:{
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.70)',
    borderRadius: 20,
    borderWidth: 0.67,
    borderColor: '#DDDCD4',
    justifyContent:'center',
    alignItems: 'center'
  },

  secaoBoaVindas:{
    marginBottom: 48
  },

  tagContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom:20
  },

  linhaTag:{
    width:32,
    height:1,
    backgroundColor: '#A9B4A9'
  },

  textoDestaque:{
    color: '#29372F',
    fontSize: 36,
    fontWeight: 'bold',
    lineHeight: 42,
    marginBottom: 16
  },

  textoDestaqueItalico:{
    color: '#687C6b',
    fontStyle: 'italic'
  },

  subtituloDestaque:{
    color:'#6F776F',
    fontSize:16,
    lineHeight:24
  },

  secaoBotoes:{
    gap:16,
    marginBottom:40
  },

  cartao:{
    flexDirection:'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 24,
    borderWidth: 0.67,
    gap: 16
  },
 
  cartaoAtivo:{
    backgroundColor:' #FFFFFF',
    borderColor: '#B9C4B8',
    elevation: 5,
    shadowColor: 'rgba(248,246,241,0.75)',
    shadowOffset:{width: 0, height: 12},
    shadowOpacity: 1,
    shadowRadius:32
  },

  cartaoInativo:{
    backgroundColor: 'rgba(248,246,241, 0.75)',
    borderColor:'#E5E2DA'
  },

  caixaIcone:{
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },

  caixaTexto:{
    flex:1
  },

  tituloCartao:{
    color: '#35443B',
    fontSize: 16,
    fontWeight: 'bold'
  },

  subtituloCartao:{
    color: '#858B84',
    fontSize: 14,
    marginTop: 4,
  },

  rodape:{
    paddingVertical:20,
    borderTopWidth: 0.67,
    borderColor: '#E7E4DC',
    alignItems: 'center'
  },

  textoRodape:{
    color: '#8A8F88',
    fontSize: 12
  }

});