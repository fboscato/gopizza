import React from "react";
import { KeyboardAvoidingView, Platform } from 'react-native'

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import branfImg from '@assets/brand.png'
import { Container, Content, Tile, Brand, ForgotPasswordButton, ForgotPasswordLabel } from "./style";
export function SignIn() {
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
                    />
                    <Input
                        placeholder="Senha"
                        type="secondary"
                        secureTextEntry

                    />
                    <ForgotPasswordButton>
                        <ForgotPasswordLabel>
                            Esqueci minha senha
                        </ForgotPasswordLabel>
                    </ForgotPasswordButton>
                    <Button
                        title="Entrar"
                        type="secundary"
                    />
                </Content>
            </KeyboardAvoidingView>
        </Container >
    )
}