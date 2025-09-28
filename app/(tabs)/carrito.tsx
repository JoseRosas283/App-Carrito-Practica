import { useState } from "react";
import { Alert, useColorScheme, View, Text, Pressable, Image, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import { ScrollView } from "react-native-gesture-handler";

interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    imagen: any;
}

export default function Carrito() {
    const colorScheme = useColorScheme();
    const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

    const [productos, setProductos] = useState<Producto[]>([
        {
            id: 1,
            nombre: "Producto 1",
            descripcion: "Descripción detallada del primer producto",
            precio: 29.99,
            imagen: require("@/assets/images/banner.png")
        },
        {
            id: 2,
            nombre: "Producto 2",
            descripcion: "Descripción detallada del segundo producto",
            precio: 45.50,
            imagen: require("@/assets/images/banner.png")
        },
        {
            id: 3,
            nombre: "Producto 3",
            descripcion: "Descripción detallada del tercer producto",
            precio: 15.99,
            imagen: require("@/assets/images/banner.png")
        }
    ]);

    const eliminarProducto = (id: number) => {
        Alert.alert(
            "Eliminar producto",
            "¿Estás seguro de que desear eliminar este producto del carrito?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Esperar",
                    style: "destructive"
                },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: () => {
                        setProductos(productos.filter(producto => producto.id !== id));
                    }
                }
            ]
        );
    };

    const calcularTotal = () => {
        return productos.reduce((total, producto) => total + producto.precio, 0).toFixed(2);
    };

    return (
        <ScrollView style={{ backgroundColor: colors.background }}>
            <View style={styles.ViewTop}>
                <Text style={{ color: colors.text, fontSize: 52 }}>Carrito de compras</Text>
                {productos.length > 0 && (
                    <Text style={{ color: colors.text, fontSize: 18, marginTop: 10 }}>
                        Total: ${calcularTotal()}
                    </Text>
                )}
            </View>

            {productos.length === 0 ? (
                <View style={styles.emptyCart}>
                    <Text style={{ color: colors.text, fontSize: 18, textAlign: 'center' }}>
                        Tu carrito está vacío
                    </Text>
                </View>
            ) : (
                productos.map((producto) => (
                    <View key={producto.id} style={[styles.viewCard, { backgroundColor: colors.background }]}>
                        <View style={styles.imageContainer}>
                            <Image source={producto.imagen} style={styles.productImage} />
                        </View>
                        <View style={styles.productDetails}>
                            <Text style={[styles.productName, { color: colors.text }]}>
                                {producto.nombre}
                            </Text>
                            <Text style={[styles.productDescription, { color: colors.text}]}>
                                {producto.descripcion}
                            </Text>
                            <Text style={[styles.productPrice, { color: colors.text }]}>
                                ${producto.precio.toFixed(2)}
                            </Text>

                            <View style={styles.buttonContainer}>
                                <Pressable
                                    style={({pressed}) => [
                                        styles.buttonDelete,
                                        { backgroundColor: pressed ? "#d32f2f" : "#f44336"}
                                    ]}
                                    onPress={() => eliminarProducto(producto.id)}
                                >
                                    <Text style={styles.deleteIcon}>🗑️</Text>
                                    <Text style={styles.buttonText}>Eliminar</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                ))
            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    ViewTop: {
        marginTop: 100,
        marginLeft: 25,
        marginRight: 25
    },
    emptyCart: {
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    viewCard: {
        marginTop: 20,
        borderRadius: 10,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: 'red',
        height: 'auto',
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    imageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    productImage: {
        width: 100,
        height: 100,
        borderRadius: 8
    },
    productDetails: {
        flex: 2,
        paddingLeft: 15,
        justifyContent: 'space-between'
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5
    },
    productDescription: {
        fontSize: 14,
        opacity: 0.8,
        marginBottom: 8,
        lineHeight: 20
    },
    productPrice: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonDelete: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        paddingHorizontal: 15,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    deleteIcon: {
        fontSize: 16,
        marginRight: 5
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600'
    },
    buttonAdd: {
        height: 40,
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        marginRight: 10,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
});