import { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

function ContadorNumeros(numero: number) {
  alert(numero)
}

export default function HomeScreen() {
  const [contador, setContador] = useState<number>(0);

  return (
    <View style={styles.body}>
      <Text style={styles.text}>Mi primera app cross-platform</Text>
      <Text style={styles.text}>Contador: {contador}</Text>

      <View style={styles.btn}>
        <Button title={'Click me'} onPress={() => ContadorNumeros(contador)}></Button>
      </View>

      <View style={styles.btn}>
        <Button color='red' title={'Reset'} onPress={() => setContador(0)}></Button>
      </View>

      <View style={styles.btn}>
       <Button color='yellow' title={'Decrease'} onPress={() => setContador(contador - 1)}></Button>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  body: { 
    padding: 16
  },

  btn: {
    marginBottom: 5
  },

  text: {
    color: '#fff'
  }
});
