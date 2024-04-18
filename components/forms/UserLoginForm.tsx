"use client";

import React from "react"
import { Button, Text, TextInput } from "@tremor/react"
import { WrapperForm } from "@/components/forms/WrapperForm"

type Props = {
      showForm: () => void;
}

export const UserLoginForm = ({ showForm }: Props) => {
      return (
            <WrapperForm
                  titleForm="Bem vindo de volta"
                  descriptionForm="Faça o login para acessar uma experiência de compra aprimorada."
            >
                  <TextInput type="email" placeholder="E-mail" />
                  <TextInput type="password" placeholder="Senha" />

                  <Button size="lg" className=" w-full border-slate-900 hover:border-slate-800 bg-slate-800 hover:bg-slate-900">
                        Entrar
                  </Button>

                  <Text className="text-center flex space-x-2">
                        <span> Não tem uma conta? </span>
                        <Button variant="light" onClick={showForm}>
                              Cadastre-se
                        </Button>
                  </Text>
            </WrapperForm>
      );
};