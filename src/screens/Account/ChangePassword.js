import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Button} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-root-toast";
import useAuth from "../../hooks/useAuth";
import { updateUserApi } from "../../api/user";
import { formStyle } from "../../styles";

export default function ChangePassword() {
    const [loading, setLoading] = useState(false);
    const { auth } = useAuth();
    const navigation = useNavigation();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            try {
                const response = await updateUserApi(auth, formData);
                if(response.statusCode)throw "Error al cambiar la contraseña";
                navigation.goBack();
            } catch (error) {
                Toast.show(error, {
                    position: Toast.positions.CENTER
                });
                setLoading(false);
            }
        }
    })

    return (
        <View style={styles.container}>
            <TextInput 
                label="Nueva contraseña"
                style={formStyle.input}
                onChangeText={(text) => formik.setFieldValue("password", text)}
                value={formik.values.password}
                error={formik.errors.password}
                secureTextEntry/>
            <TextInput 
                label="Repetir nueva contraseña"
                style={formStyle.input}
                onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
                value={formik.values.repeatPassword}
                error={formik.errors.repeatPassword}
                secureTextEntry/>
            <Button
                mode="contained"
                styel={formStyle.btnSuccess}
                onPress={formik.handleSubmit}
                loading={loading}>
                    Cambiar Contraseña
            </Button>
        </View>
    )
}

function initialValues(){
    return{
        password: "",
        repeatPassword: ""
    }
}

function validationSchema(){
    return{
        password: Yup.string().min(4, true).required(true),
        repeatPassword: Yup.string().min(4, true).required(true).oneOf([Yup.ref("password")], true)
    }
}

const styles = StyleSheet.create({
    container:{
        padding: 20
    }
})