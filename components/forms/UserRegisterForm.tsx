"use client";

import React from "react"
import { Button, Text, TextInput } from "@tremor/react"
import { WrapperForm } from "@/components/forms/WrapperForm"

type Props = {
      showForm: () => void;
}

export const UserRegisterForm = ({ showForm }: Props) => {
      return (
            <WrapperForm
                  titleForm="Torne-se um mebro da loja"
                  descriptionForm="Crie seu perfil de membro da Canecas Bertioga e tenha acesso a uma experiência de compra aprimorada."
            >
                  <TextInput type="text" placeholder="Primeiro Nome" />
                  <TextInput type="text" placeholder="Sobrenome" />
                  <TextInput type="email" placeholder="E-mail" />
                  <TextInput type="text" placeholder="Telefone" />
                  <TextInput type="password" placeholder="Senha" />

                  <Text className="text-center text-xs">
                        Ao criar uma conta, você concorda com a <b>Política de Privacidade</b> e os  <b>Termos de Uso</b> da Canecas Bertioga .
                  </Text>

                  <Button size="lg" className=" w-full border-slate-900 hover:border-slate-800 bg-slate-800 hover:bg-slate-900">
                        Cadastrar
                  </Button>

                  <Text className="text-center flex space-x-2">
                        <span> Já tem uma conta? </span>
                        <Button variant="light" onClick={showForm}>
                              Faça o Login
                        </Button>
                  </Text>
            </WrapperForm>
      );
};