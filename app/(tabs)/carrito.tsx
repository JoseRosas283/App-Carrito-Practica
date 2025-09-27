import { useState } from "react";
import { useColorScheme } from "react-native";
import { Colors } from "../../constants/Colors";

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
        }
    ])
}