import React, { useState } from "react";
import { KeyboardAvoidingView, Platform } from 'react-native'
import { useAuth } from '@hooks/auth'

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import branfImg from '@assets/brand.png'
import { Container, Content, Tile, Brand, ForgotPasswordButton, ForgotPasswordLabel } from "./style";
export function SignIn() {
    const [email, setMail] = useState('');
    const [password, setPassword] = useState('');

    const { signIn, isLogging } = useAuth();

    function handleSinIn() {
        signIn(email, password);
    }
    return (
        <Container>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} >
                <Content>
                    <Brand source={branfImg} />
                    <Tile>Login</Tile>
                    <Input
                        placeholder="E-mail"
                        type="secondary"
                        autoCorrect={false}
                        autoCapitalize="none"
                        onChangeText={setMail}
                    />
                    <Input
                        placeholder="Senha"
                        type="secondary"
                        secureTextEntry
                        onChangeText={setPassword}

                    />
                    <ForgotPasswordButton>
                        <ForgotPasswordLabel>
                            Esqueci minha senha
                        </ForgotPasswordLabel>
                    </ForgotPasswordButton>
                    <Button
                        title="Entrar"
                        type="secundary"
                        onPress={handleSinIn}
                        isLoading={isLogging}
                    />
                </Content>
            </KeyboardAvoidingView>
        </Container >
    )
}