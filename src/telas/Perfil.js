import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Perfil({ navigation }) {
  return (
    <View style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>


        <View style={styles.cabecalho}>
          <TouchableOpacity
            style={styles.logoContainer}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Biblioteca')}
          >

            <TouchableOpacity
              style={styles.botaoOpcoes}
              onPress={() => navigation.navigate('Home')}
            >
              <Ionicons name="home-outline" size={20} color="#4F6856" />
            </TouchableOpacity>


            <View style={styles.iconeLogo}>
              <Ionicons name="library" size={20} color="#FFF" />
            </View>
            <Text style={styles.tituloHeader}>Minha Biblioteca</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={16} color="#7A827B" />
          <Text style={styles.textoVoltar}>Voltar para o início</Text>
        </TouchableOpacity>


        <View style={styles.secaoPerfil}>
          <View style={styles.avatar}>
            <Text style={styles.iniciais}>GS</Text>
          </View>

          <View style={styles.infoUsuario}>
            <Text style={styles.tagPerfil}>MEU PERFIL</Text>
            <Text style={styles.nome}>Gabriel Silva</Text>
            <Text style={styles.membroDesde}>Estudante de Engenharia de Software</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.botaoEditar}>
          <Ionicons name="pencil" size={14} color="#536558" />
          <Text style={styles.textoEditar}>Editar perfil</Text>
        </TouchableOpacity>


        <View style={styles.secaoEstatisticas}>
          <View style={styles.cartaoEstatisticaLidos}>
            <Text style={styles.tituloEstatisticaLidos}>Livros lidos</Text>
            <Text style={styles.numeroEstatisticaLidos}>24</Text>
            <Text style={styles.subtituloEstatisticaLidos}>6 livros neste ano</Text>
          </View>

          <View style={styles.cartaoEstatisticaAnotacoes}>
            <Text style={styles.tituloEstatisticaAnotacoes}>Anotações</Text>
            <Text style={styles.numeroEstatisticaAnotacoes}>86</Text>
            <Text style={styles.subtituloEstatisticaAnotacoes}>12 novas este mês</Text>
          </View>
        </View>


        <View style={styles.secaoSobre}>
          <Text style={styles.tituloSobre}>Sobre mim</Text>
          <Text style={styles.textoSobre}>
            Apaixonado por tecnologia, desenvolvimento móvel e soluções que unem inovação e sustentabilidade na sociedade.
          </Text>
        </View>


        <View style={styles.rodape}>
          <Text style={styles.textoRodape}>Seu próximo capítulo começa aqui.</Text>
        </View>

      </ScrollView>
    </View>
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
  secaoPerfil: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 12,
  },
  avatar: {
    width: 80,
    height: 80,
    backgroundColor: '#EADFDA',
    borderRadius: 25.6,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(123, 94, 86, 0.08)',
  },
  iniciais: {
    color: '#7B5E56',
    fontSize: 30,
  },
  infoUsuario: {
    flex: 1,
  },
  tagPerfil: {
    color: '#8B958D',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 2.4,
  },
  nome: {
    color: '#29372F',
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 8,
  },
  membroDesde: {
    color: '#7B827C',
    fontSize: 14,
    marginTop: 8,
  },
  botaoEditar: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#FFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    borderWidth: 0.67,
    borderColor: '#CFD6CD',
    gap: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginBottom: 36,
  },
  textoEditar: {
    color: '#536558',
    fontSize: 14,
    fontWeight: '500',
  },
  secaoEstatisticas: {
    gap: 16,
    marginBottom: 20,
  },
  cartaoEstatisticaLidos: {
    backgroundColor: '#E8EFE6',
    borderRadius: 25.6,
    padding: 24,
    borderWidth: 0.67,
    borderColor: '#D7E0D5',
  },
  tituloEstatisticaLidos: {
    color: '#687A6B',
    fontSize: 14,
    fontWeight: '500',
  },
  numeroEstatisticaLidos: {
    color: '#34463A',
    fontSize: 48,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  subtituloEstatisticaLidos: {
    color: '#7B8C7D',
    fontSize: 12,
  },
  cartaoEstatisticaAnotacoes: {
    backgroundColor: '#EBE8F1',
    borderRadius: 25.6,
    padding: 24,
    borderWidth: 0.67,
    borderColor: '#DDD8E7',
  },
  tituloEstatisticaAnotacoes: {
    color: '#756D86',
    fontSize: 14,
    fontWeight: '500',
  },
  numeroEstatisticaAnotacoes: {
    color: '#49435A',
    fontSize: 48,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  subtituloEstatisticaAnotacoes: {
    color: '#888096',
    fontSize: 12,
  },
  secaoSobre: {
    backgroundColor: 'rgba(255, 255, 255, 0.70)',
    borderRadius: 25.6,
    padding: 24,
    borderWidth: 0.67,
    borderColor: '#E3E0D8',
    marginBottom: 20,
  },
  tituloSobre: {
    color: '#344239',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  textoSobre: {
    color: '#687169',
    fontSize: 16,
    lineHeight: 28,
  },
  rodape: {
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