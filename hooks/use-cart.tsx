import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Alert } from 'react-native';

export interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    imagen: any;
    categoria: string;
}

interface CartContextType {
    cartProducts: Producto[];
    addToCart: (product: Producto) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    calculateTotal: () => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartProducts, setCartProducts] = useState<Producto[]>([]);

    const addToCart = (product: Producto) => {
        setCartProducts((prevProducts) => [...prevProducts, product]);
        Alert.alert('Producto añadido', `${product.nombre} ha sido añadido al carrito.`);
    };

    const removeFromCart = (id: number) => {
        Alert.alert(
            "Eliminar producto",
            "¿Estás seguro de que deseas eliminar este producto del carrito?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: () => {
                        setCartProducts((prevProducts) => prevProducts.filter(producto => producto.id !== id));
                        Alert.alert('Producto eliminado', 'El producto a sido eliminado del carrito.');
                    }
                }
            ]
        )
    }

    const clearCart = () => {
        setCartProducts([]);
    };

    const calculateTotal = () => {
        return cartProducts.reduce((total, producto) => total + producto.precio, 0).toFixed(2);
    };

    return (
        <CartContext.Provider value={{ cartProducts, addToCart, removeFromCart, clearCart, calculateTotal }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};