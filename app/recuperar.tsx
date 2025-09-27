import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, useColorScheme, View, StyleSheet, Text, Pressable, Alert } from "react-native";
import { TextInput } from "react-native-gesture-handler";

function ValidateForm(correo: string) {
    if (correo === null || correo === '') return Alert.alert("Advertencia", "Debe ingresar un correo electrónico");

    Alert.alert("Atención", `Correo: ${correo}`, [
        { text: "Cancelar", style: "cancel"},
        { text: "OK", onPress: () => console.log("Ok presionado")}
    ])
}

const getColors = (theme: "light" | "dark") => ({
  background: theme === "dark" ? "#212121" : "#CFD8DC", 
  text: theme === "dark" ? "#fff" : "#000",            
  placeholder: theme === "dark" ? "#aaa" : "#555",     
  inputText: theme === "dark" ? "#fff" : "#555",      
  border: theme === "dark" ? "#ccc" : "#212121",     
});

export default function Recuperar() {
    const router = useRouter();
    const colorSheme = useColorScheme();
    
    const theme = colorSheme ?? "light"
    const colors = getColors(theme);

    const [form, setForm] = useState({
        correo: ""
    });

    return(
        <ScrollView contentContainerStyle={{backgroundColor: colors.background, flex: 1 }}>
            <View style={styles.reactLogo}>
                <Image source={require('@/assets/images/banner.png')} style={styles.reactLogo} />
            </View>
            <View style={styles.containerView}>
                <Text style={{color: colors.text, fontSize: 28, textAlign: "center", marginBottom: 50}}>Recuperar contraseña</Text>

                <TextInput
                    placeholder="Correo electrónico"
                    placeholderTextColor={colors.placeholder}
                    style={[
                        styles.input, 
                        {color: colors.inputText},
                        {borderColor: colors.border}
                    ]}
                    onChangeText={(text) => setForm({...form, correo: text})} />

                    <Pressable
                        style={({pressed}) => [
                            styles.button,
                            { backgroundColor: pressed ? "#3F51B5" : "navy" }
                        ]}
                        onPress={() => ValidateForm(form.correo)}
                    >
                        <Text style={{color: 'white', fontSize: 18}}>Continuar</Text>
                    </Pressable>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({

    container: {
        flexGrow: 1,
    },

    containerView: {
        marginLeft: 20,
        marginRight: 20,
    },

    Text: {
        color: '#fff',
        fontSize: 24,
    },

    reactLogo: {
        height: 350,
        width: 500,
        bottom: 0,
        left: 0,
    },

    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 12,
    },

    button: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
})