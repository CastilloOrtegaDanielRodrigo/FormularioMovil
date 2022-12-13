import React, { useState, useEffect } from 'react'
import {Modal,Text, StyleSheet, SafeAreaView, TextInput, View, ScrollView, Pressable, Alert} from 'react-native'
import DatePicker from 'react-native-date-picker'



const Formulario = ({modalVisible, setModalVisible, Clientes, setClientes, cliente: clienteOBJ, setCliente: setClienteApp}) => { //setmodalviible, se inset para cerrar el formulario
    const [cliente, setCliente] =  useState('')
    const [id, setId] =  useState('')
    const [correo, setCorreo] =  useState('')
    const [telefono, setTelefono] = useState('')
    const [fecha, setFecha] = useState(new Date())
    const [tipo, setTipo] =  useState('')
    const [descripcion, setDescripcion] =  useState('')

    useEffect(() => {
            if(Object.keys(clienteOBJ).length > 0 ){
                setId(clienteOBJ.id)
                setCliente(clienteOBJ.cliente)
                setCorreo(clienteOBJ.correo)
                setTelefono(clienteOBJ.telefono)
                setFecha(clienteOBJ.fecha)
                setTipo(clienteOBJ.tipo)
                setDescripcion(clienteOBJ.descripcion)
            }

    }, [clienteOBJ])

    const handeCliente = () => {
        if([cliente,correo,telefono,fecha,tipo,descripcion].includes('') ){
            Alert.alert(
                'Error',
                'Todos los campos son obligatorios',
                
            )
        return
        }
        const nuevoCliente = {

            cliente,
            correo,
            telefono,
            fecha,
            tipo,
            descripcion
        }

        if(id){
            //editando
            nuevoCliente.id = id
            const clientesActualizados = Clientes.map( clienteState => clienteState.id === nuevoCliente.id ? nuevoCliente : clienteState)

            setClientes(clientesActualizados)

        } else {
            //nuevo registro
            nuevoCliente.id = Date.now()
            setClientes([...Clientes, nuevoCliente])
            setClienteApp({})

        }

    setModalVisible(!modalVisible)
    setId('')    
    setCliente('')
    setCorreo('')
    setTelefono('')
    setFecha(new Date())
    setTipo('')
    setDescripcion('')
    }

    return(
        <Modal
            animationType= 'slide'
            visible={modalVisible}
        >
        <SafeAreaView style={styles.contenido}>
            <ScrollView>
                <Text 
                style={styles.titulo}
                >{clienteOBJ.id ? 'EDITAR' : 'NUEVA'} {' '}
                <Text 
                style={styles.tituloBold}
                >CITA {'\n'}</Text>
                <Text style={styles.tituloUni}
                >StylishGanG</Text>
                </Text>

                <Pressable 
                style={styles.bottomCancelar}
                onLongPress={() => {
                    setModalVisible(!modalVisible) //para cerrar el formulario
                    setClienteApp({})
                    setId('')
                    setCliente('')
                    setCorreo('')
                    setTelefono('')
                    setFecha(new Date())
                    setTipo('')
                    setDescripcion('')
                }} 
                >
                    <Text style={styles.bottomCancelarText}>X  Cancelar </Text>
                </Pressable>
                

                <View style={styles.campo}>
                    <Text style={styles.label}>Nombre</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Ingresa tu Nombre'
                        placeholderTextColor={'#666'}
                        value ={cliente}
                        onChangeText={setCliente}
                    />
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Correo Electronico</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Ingresa tu correo electronico'
                        placeholderTextColor={'#666'}
                        keyboardType='email-address'
                        value ={correo}
                        onChangeText={setCorreo}
                    />
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Telefono</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Ingresa numero Telefonico'
                        placeholderTextColor={'#666'}
                        keyboardType='number-pad'
                        value ={telefono}
                        onChangeText={setTelefono}
                        maxLength={10}
                    />
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Fecha Alta</Text>

                    <View style={styles.fechaContenedor}>
                        <DatePicker 
                            date={fecha}
                            locale='es'
                            onDateChange={ (date) => setFecha(date)}
                        />
                    </View>

                </View>


                <View style={styles.campo}>
                    <Text style={styles.label}>Tpo de Dispositivo</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Ingresa el tipo de Dispositivo'
                        placeholderTextColor={'#666'}
                        value ={tipo}
                        onChangeText={setTipo}
                    />
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Descripcion</Text>
                    <TextInput
                        style={[styles.input, styles.clientesInput]}
                        placeholder='Describe brevemente lo que le pasa a tu dispositivo'
                        placeholderTextColor={'#666'}
                        value ={descripcion}
                        onChangeText={setDescripcion}
                        multiline={true}
                        numberOfLines={4}
                    />
                </View>

                <Pressable 
                    style={styles.bottomnuevoCliente}
                    onPress={handeCliente}
                >
                    <Text style={styles.bottomnuevoClienteText}>{clienteOBJ.id ? 'EDITAR' : 'AGREGAR'} Cliente</Text>

                </Pressable>
            </ScrollView>
        </SafeAreaView>
      </Modal>
    )
}
const styles = StyleSheet.create({

        contenido:{
            backgroundColor: '#FF9100',
            flex: 1,
        },
        titulo:{
            fontSize: 30,
            fontWeight: '900',
            textAlign: 'center',
            marginTop: 30,
            color: '#FFF'
        },
        tituloBold:{
            fontWeight: '900',
            textAlign: 'center',
        },
        tituloUni:{
            fontWeight: '900',
            fontSize: 30,
            textAlign: 'center',
            color: '#0700CB'
        },
        bottomCancelar:{
            marginTop: 30,
            backgroundColor: '#5827A4',
            marginHorizontal: 30,
            padding: 16,
            borderRadius: 10,
        },
        bottomCancelarText:{
            color:'#FFF',
            textAlign: 'center',
            fontWeight: '900',
            fontSize: 16,
            textTransform: 'uppercase',
        },
        campo:{
            marginTop: 10,
            marginHorizontal:30,

        },
        label:{
            color:'#FFF',
            marginBottom:10,
            marginTop: 10,
            fontSize: 20,
            fontWeight: '600'
        },
        input:{
            backgroundColor: '#FFF',
            padding:15,
            borderRadius: 10,
        },
        clientesInput:{
            height:100,
        },
        fechaContenedor:{
            backgroundColor: '#FFF',
            borderRadius: 10   
        },
        bottomnuevoCliente:{
            marginVertical:50,
            backgroundColor:'#5827A4',
            paddingVertical: 15,
            marginHorizontal:30,
            borderRadius:10
        },
        bottomnuevoClienteText:{
            color:'#FFF',
            textAlign: 'center',
            fontWeight: '900',
            fontSize: 16,
            textTransform: 'uppercase',
        },

})

export default Formulario