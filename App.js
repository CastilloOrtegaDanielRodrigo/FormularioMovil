import React, { useState } from 'react';
import {

  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Button,
  Pressable,
  Modal,
  FlatList,
  Alert,
} from 'react-native';
import Formulario from './src/components/Formulario'
import Registro from './src/components/Registro';

const App = () => {
  //Los HOOk siempre se colocan en la parte superior de la funcion//
  const [modalVisible, setModalVisible] = useState(false)
  const [Clientes, setClientes] = useState([])
  const [cliente, setCliente] = useState([])

  const clienteEditar = id => {
    const clienteEditar = Clientes.filter(Cliente => Cliente.id === id )
    setCliente(clienteEditar[0])
  }

  const clienteEliminar = id => {
    Alert.alert(
      '¿DESAEAS ELIMINAR ESTE CLIENTE?',
      'Un cliente eliminado nose puede recuperar',
      [
        { text:'Cancelar' },
        {text:'SI, Eliminar', onPress: () => {
           const clientesActualizados = Clientes.filter( clienteState => clienteState.ID !== id)
           setClientes(clientesActualizados)
        }}
      ]
    )
  }

  return ( //Antes de un return podemos colocar todo tipo de codigo de JS
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Tecnicos Universitarios {' '}
        <Text style={styles.tituloBold}>Universidad Tecnologica del Valle de Toluca</Text>
      </Text>

      <Pressable
        style={styles.bottonNuevaCita}
        onPress={() => setModalVisible (!modalVisible)}
      >
        <Text style={styles.bottonTextNuevaCita}
        >Nueva Cita</Text>
      </Pressable>

      {Clientes.length === 0 ? <Text style={styles.noClientes}>No hay Registros</Text> :
      <FlatList style = {styles.listado}
        data={Clientes}
        keyExtractor={(item) => item.id }
        renderItem={({item}) =>{
        
          return(
            <Registro 
            item={item}
            setModalVisible={setModalVisible}
            clienteEditar={clienteEditar}
            clienteEliminar={clienteEliminar}
            />
          )

        }}
      />
      }
      <Formulario 
        modalVisible={modalVisible}
        setModalVisible={setModalVisible} //cerra el forulario
        Clientes={Clientes}
        setClientes={setClientes}
        cliente={cliente}
        setCliente={setCliente}
      />
    </SafeAreaView>
  );
};
//ESTILOS//
const styles = StyleSheet.create({ /*Esto es un objeto por lo tanto agregamos propieddes de objeto en Js*/
  container:{
    backgroundColor: '#F3F4F5',
    flex: 1

 },
 
  titulo: {
    textAlign:'center',
    fontSize: 30,
    color: '#374151',
    fontWeight: '600' 
  },
  tituloBold:{
    fontWeight: '900',
    color:'#FF9100',
  },

  bottonNuevaCita: {
    backgroundColor: '#FF9100',
    padding: 15,
    marginTop: 30,
    marginHorizontal: 40,
    borderRadius: 10
  },
  bottonTextNuevaCita:{
    textAlign: 'center',
    color: '#FFF',
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase'
    
  },
  noClientes:{
    marginTop: 40,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600'
  },
  listado: {
    marginTop: 50,
    marginHorizontal:30
  }

})

export default App;
//Componentes Existentes en React Native//
/*
1) <Text></Text> = Todos los textos que se muetran en la aplicacion de reat son por medio
2) <Button></Button>
3) <View></View> = Es un div como en HTML o es un contenedor
4) Alert = Mustra un dialogo donde puedes aceptar terminos
5) Image = Para mostrar imagenes
6) <StyleSheet></StyleSheet> = Para darle estilo
7) Pressable = Un boton
8) Modal
9) ScrollView
10) FlatList
11) <Picker></Picker> = para elegir diferentes opciones, como puede ser en un fotmulario
*/