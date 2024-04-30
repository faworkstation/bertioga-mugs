"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import Link from "next/link";
import { UserRegisterSchema } from "@/schemas";
import { Button, Callout, Divider, Flex, Text, TextInput } from "@tremor/react"
import { WrapperForm } from "@/components/forms/WrapperForm"
import { SyncLoading } from "@/components/loadings/SyncLoading";

import { registerUser } from "@/actions/create/register-users";

export const UserRegisterForm = () => {
      const [error, setError] = useState<string>("");
      const [success, setSuccess] = useState<string>("");

      const [isPending, startTransition] = useTransition();

      const form = useForm<z.infer<typeof UserRegisterSchema>>({
            resolver: zodResolver(UserRegisterSchema),
            defaultValues: {
                  firstName: "",
                  lastName: "",
                  email: "",
                  phone: "",
                  password: ""
            },
      });

      const onSubmit = (values: z.infer<typeof UserRegisterSchema>) => {
            startTransition(() => {
                  registerUser(values)
                        .then((data) => {
                              if (data.error) {
                                    setError(data.error)
                              };

                              if (data.success) {
                                    setSuccess(data.success)
                              };
                        })
                        .catch(() =>
                              setError("Ops! Ocorreu um erro interno do servidor. Por favor, verifique a situação e tente novamente.")
                        );
            });
      };

      const cleanMessages = () => {
            form.clearErrors();
            setSuccess("");
            setError("");
      };

      return (
            <WrapperForm
                  titleForm={success ? "Email enviado com sucesso" : "Seja membro da loja"}
                  descriptionForm={success ? "" : "Crie seu perfil de membro da Canecas Bertioga e tenha acesso a uma experiência de compra aprimorada."}
            >
                  <form
                        className={"w-full space-y-4"}
                        onSubmit={form.handleSubmit(onSubmit)}
                        onChange={cleanMessages}
                  >
                        {!success && (
                              <Flex className={"flex-col space-y-4 items-start"}>
                                    <TextInput
                                          type={"text"}
                                          name={"firstName"}
                                          placeholder={"Nome"}
                                          onChange={(e) => form.setValue("firstName", e.target.value)}
                                          error={form.formState.errors.firstName ? (true) : (false)}
                                          errorMessage={"Este campo é obrigatório"}
                                          disabled={isPending}
                                          autoComplete={"off"}
                                    />
                                    <TextInput
                                          type={"text"}
                                          name={"lastName"}
                                          placeholder={"Sobrenome"}
                                          onChange={(e) => form.setValue("lastName", e.target.value)}
                                          error={form.formState.errors.lastName ? (true) : (false)}
                                          errorMessage={"Este campo é obrigatório"}
                                          disabled={isPending}
                                          autoComplete={"off"}
                                    />
                                    <TextInput
                                          type={"email"}
                                          name={"email"}
                                          placeholder={"E-mail"}
                                          onChange={(e) => form.setValue("email", e.target.value)}
                                          error={form.formState.errors.email ? (true) : (false)}
                                          errorMessage={"Este campo é obrigatório"}
                                          disabled={isPending}
                                          autoComplete={"off"}
                                    />
                                    <TextInput
                                          type={"text"}
                                          name={"phone"}
                                          placeholder={"Telefone"}
                                          onChange={(e) => form.setValue("phone", e.target.value)}
                                          error={form.formState.errors.phone ? (true) : (false)}
                                          errorMessage={"Este campo é obrigatório"}
                                          disabled={isPending}
                                          autoComplete={"off"}
                                    />
                                    <TextInput
                                          type={"password"}
                                          name={"password"}
                                          placeholder={"Senha"}
                                          onChange={(e) => form.setValue("password", e.target.value)}
                                          error={form.formState.errors.password ? (true) : (false)}
                                          errorMessage={"Insira no mínimo 6 caracteres para senha."}
                                          disabled={isPending}
                                          autoComplete={"off"}
                                    />
                              </Flex>
                        )}

                        <Divider />

                        <Flex flexDirection={"col"} >
                              {isPending ? (
                                    <SyncLoading />
                              ) : error ? (
                                    <Callout
                                          className={"w-full"}
                                          title={error}
                                          color={"red"}
                                    />
                              ) : success ? (
                                    <Callout
                                          className={"w-full"}
                                          title={success}
                                          color={"teal"}
                                    />
                              ) : (
                                    <Flex className={"flex-col space-y-4"}>
                                          <h3 className={"text-xs text-slate-400"}>
                                                Ao clicar em Cadastre-se, você concorda com nossos <b>Termos</b>,
                                                <b>Política de Privacidade</b> e <b>Política de Cookies</b>.
                                          </h3>

                                          <Button
                                                className={"w-full bg-slate-800 hover:bg-slate-900 border-slate-950 hover:border-slate-900"}
                                                type={"submit"}
                                                disabled={isPending}
                                          >
                                                Cadastre-se
                                          </Button>
                                    </Flex>
                              )}
                        </Flex>
                  </form>

                  {!isPending && (
                        <Text className="text-center flex space-x-2">
                              <span> Já possui uma conta? </span>
                              <Link href={"/auth/login"} className='text-tremor-default text-blue-600 underline'>
                                    Faça o Login
                              </Link>
                        </Text>
                  )}
            </WrapperForm>
      );
};