import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function Perfil() {
  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <Image
          source={{ uri: 'https://picsum.photos/200/200?random=99' }}
          styles={styles.avatar}
        />
        <Text style={styles.nome}> Gabriel Vieira </Text>
        <Text style={styles.curso}>Ciência da Computação</Text>
      </View>

      <View style={styles.estatisticas}>
        <View style={styles.caixa}>
          <Text style={styles.numero}>3</Text>
          <Text style={styles.rotulo}>Lidos</Text>
        </View>

        <View style={styles.caixa}>
          <Text style={styles.numero}>12</Text>
          <Text style={styles.rotulo}>Anotações</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.botao}>
        <Text style={styles.textoBotao}>Editar Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20
  },

  cabecalho: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#0066cc'
  },

  nome: {
    fontSize: 24,
    fontWeight: 'bold'
  },

  curso: {
    fontSize: 24,
    color: '#666',
    marginTop: 4
  },

  estatisticas: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    marginBottom: 40
  },

  caixa: {
    alignItems: 'center'
  },

  numero: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0066cc'
  },

  rotulo: {
    fontSize: 14,
    color: '#666',
    marginTop: 4
  },

  botao: {
    backgroundColor: '#0066cc',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center'
  },

  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }

});