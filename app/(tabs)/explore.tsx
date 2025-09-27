import { useState } from 'react';
import { StyleSheet, View, Button, TextInput } from 'react-native';

function ValidateLogin(usuario: string, password: string) {
  if (usuario === '' || usuario === null) alert('Debe ingresar el usuario');
  if (password === '' || password === null) alert('Debe ingresar una contraseña');
}

export default function TabTwoScreen() {
  const [user, onChangedUser] = useState<string>('');
  const [password, onChangedPassword] = useState<string>('');
 
  return ( 
    <View>
      <TextInput placeholder='Nombre de usuario' keyboardType='default' onChangeText={onChangedUser}></TextInput>
      <TextInput placeholder='Contraseña' keyboardType='default' onChangeText={onChangedPassword}></TextInput>

      <Button title={'Iniciar sesión'} onPress={() => ValidateLogin(user, password)}></Button>
    </View>
  );
}

const styles = StyleSheet.create({});
