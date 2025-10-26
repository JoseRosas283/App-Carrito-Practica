import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { Producto, useCart } from "@/hooks/use-cart";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Image } from "expo-image";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const { addToCart } = useCart();
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const [products] = useState<Producto[]>([
    {
      id: 1,
      nombre: "Laptop Gamer",
      descripcion: "Potente laptop para juegos con procesador de última generación",
      precio: 1200.00,
      imagen: require("@/assets/images/banner.png"),
      categoria: "Electrónica"
    },
    {
      id: 2,
      nombre: "Teclado Mecanico RGB",
      descripcion: "Teclado con switches inalambrico.",
      precio: 95.55,
      imagen: require("@/assets/images/banner.png"),
      categoria: "Electrónica"
    },
    {
      id: 3,
      nombre: "Mouse Inalambrico Gaming",
      descripcion: "Mouse ergonómico conalta presición y bateria de larga duración.",
      precio: 50.00,
      imagen: require("@/assets/images/banner.png"),
      categoria: "Electrónica"
    },
    {
      id: 4,
      nombre: "Monitor Curvo 27 Pulgadas",
      descripcion: "Monitor con resolución QHD y 144Hz de tasa de refresco.",
      precio: 350.00,
      imagen: require("@/assets/images/banner.png"),
      categoria: "Electrónica"
    },
    {
      id: 5,
      nombre: "Silla Gamer Ergonónica",
      descripcion: "Silla dinámica para largas sesiones de juego, con soporte lumbar",
      precio: 250.00,
      imagen: require("@/assets/images/banner.png"),
      categoria: "Muebles"
    },
    {
      id: 6,
      nombre: "Escritorio ajustable",
      descripcion: "Escritorio con altura ajustable, ideal para setups de gaming.",
      precio: 180.00,
      imagen: require("@/assets/images/banner.png"),
      categoria: "Muebles"
    }
  ]);

  const productsByCategory = products.reduce((acc, product) => {
    (acc[product.categoria] = acc[product.categoria] || []).push(product);
    return acc;
  }, {} as Record<string, Producto[]>);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Nuestros productos</ThemedText>
      </ThemedView>

      {Object.keys(productsByCategory).map((category) => (
        <View key={category} style={styles.categoryContainer}>
          <ThemedText type="subtitle" style={styles.categoryTitle}>
            {category}
          </ThemedText>
          <View style={styles.productsGrid}>
            {productsByCategory[category].map((product) => (
              <View key={product.id} style={[styles.productCard, { backgroundColor: colors.cardBackground }]}>
                <Image source={product.imagen} style={styles.productImage} />
                <ThemedText style={styles.productName}>{product.nombre}</ThemedText>
                <ThemedText style={styles.productDescription}>{product.descripcion}</ThemedText>
                <ThemedText style={styles.productPrice}>${product.precio.toFixed(2)}</ThemedText>
                <Pressable
                  style={({ pressed }) => [
                    styles.addToCartButton,
                    { backgroundColor: pressed ? '#4CAF50' : '#8BC34A' },
                  ]}
                  onPress={() => addToCart(product)} >
                  <Text style={styles.addToCardButtonText}>Añadir al Carrito</Text>
                </Pressable>
              </View>
            ))}
          </View>
        </View>
      ))}
    </ScrollView> 
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    padding: 20,
    alignItems: 'center',
    marginTop: 80
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 10,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  productCard: {
    width: '45%',
    margin: 8,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    color: '#666',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  addToCartButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  addToCardButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
})