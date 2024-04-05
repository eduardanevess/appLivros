import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Animated, Easing, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

export default function ViewLivro({ route, navigation }) {
  const { id } = route.params;
  const [livro, setLivro] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    fetchLivro();
  }, []);

  const fetchLivro = async () => {
    try {
      const response = await axios.get(`https://bibliotecaetecmaua.azurewebsites.net/api/LivrosSedeApi/${id}`);
      setLivro(response.data);
      fadeIn();
      scaleIn();
    } catch (error) {
      console.error("Erro ao buscar livro:", error);
    }
  };

  const fadeIn = () => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }
    ).start();
  };

  const scaleIn = () => {
    Animated.timing(
      scaleAnim,
      {
        toValue: 1,
        duration: 1000,
        easing: Easing.elastic(1.5),
        useNativeDriver: true,
      }
    ).start();
  };

  return (
    <View style={styles.container}>
      {livro ? (
        <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
          <View style={styles.header}>
            <Image
              source={{ uri: `https://bibliotecaetecmaua.azurewebsites.net/Content/Images/${livro.imagem}` }}
              style={styles.imagem}
            />
            <Text style={styles.titulo}>{livro.titulo}</Text>
          </View>
          <Text style={styles.autor}>{livro.autorPrincipal}</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}><Ionicons name="calendar-outline" size={16} color="#FFFFFF" /> {livro.ano}</Text>
            <Text style={styles.infoText}><Ionicons name="book-outline" size={16} color="#FFFFFF" /> {livro.editora}</Text>
            <Text style={styles.infoText}><Ionicons name="bookmarks-outline" size={16} color="#FFFFFF" /> Edição: {livro.edicao}</Text>
            <Text style={styles.infoText}><Ionicons name="language-outline" size={16} color="#FFFFFF" /> {livro.idioma}</Text>
            <Text style={styles.infoText}><Ionicons name="barcode-outline" size={16} color="#FFFFFF" /> ISBN/ISSN: {livro.IsbnIssn}</Text>
            <Text style={styles.infoText}><Ionicons name="file-tray-stacked-outline" size={16} color="#FFFFFF" /> Material: {livro.material}</Text>
            <Text style={styles.infoText}><Ionicons name="construct-outline" size={16} color="#FFFFFF" /> Obra: {livro.obra}</Text>
          </View>
        </Animated.View>
      ) : (
        <ActivityIndicator size="large" color="#FFFFFF" />
      )}

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-outline" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0E0E0', // Cinza claro
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#424242', // Cinza escuro
  },
  autor: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'left',
    color: '#424242', // Cinza escuro
  },
  infoContainer: {
    alignItems: 'flex-start',
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#424242', // Cinza escuro
  },
  imagem: {
   width: 200, 
   height: 300, 
   resizeMode: 'contain', borderRadius: 5,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 20,
  },
});
