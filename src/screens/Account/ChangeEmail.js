import React, {useState, useCallback} from 'react';
import { StyleSheet, View } from 'react-native';
import {TextInput, Button} from "react-native-paper";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {useFormik} from "formik";
import * as Yup from "yup";
import Toast from "react-native-root-toast";
import {getMeApi, updateUserApi} from "../../api/user";
import useAuth from "../../hooks/useAuth";
import {formStyle} from "../../styles";

export default function ChangeEmail() {
    const {auth} = useAuth();
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            (async() => {
                const response = await getMeApi(auth.token);
                await formik.setFieldValue("email", response.email);
            }) ()
        }, [])
    );

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            try {
                const response = await updateUserApi(auth, formData);
                if(response.statusCode) throw "El email ya existe";
                Toast.show("Correo Actualizado", {
                    position: Toast.positions.CENTER,
                });
                navigation.goBack();
            } catch (error) {
                Toast.show(error, {
                    position: Toast.positions.CENTER,
                });
                console.log("ERROR: ==>"+error);
                formik.setFieldError("email", true);
                setLoading(false);
            }
        }
    })

    return (
        <View style={styles.container}>
            <TextInput
                label="Email"
                style={formStyle.input}
                onChangeText={(text) => formik.setFieldValue("email", text)}
                value = {formik.values.email}
                error={formik.errors.email}/>
            <Button
                mode="contained"
                style={formStyle.btnSuccess}
                onPress={formik.handleSubmit}
                loading={loading}>
                    Cambiar Email
                </Button>
        </View>
    )
}

function initialValues(){
    return {
        email: ""
    }
}

function validationSchema(){
    return{
        email: Yup.string().email(true).required(true)
    }
}

const styles = StyleSheet.create({
    container:{
        padding: 20
    }
})