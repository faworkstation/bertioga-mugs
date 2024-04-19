"use client";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import React, { useState, useTransition } from "react"
import { Button, Callout, Flex, Text, TextInput } from "@tremor/react"
import { WrapperForm } from "@/components/forms/WrapperForm"
import { loginSession } from "@/database/create/login-session";
import { LoginSchema } from "@/schemas";
import { SyncLoading } from "../loadings/SyncLoading";
import Link from "next/link";


export const UserLoginForm = () => {
      const [error, setError] = useState<string>("");
      const [success, setSuccess] = useState<string>("");
      const [showTwoFactor, setShowTwoFactor] = useState(false);

      const [isPending, startTransition] = useTransition();

      const searchParams = useSearchParams();
      const callbackUrl = searchParams.get("callbackUrl");

      const router = useRouter();

      const form = useForm<z.infer<typeof LoginSchema>>({
            resolver: zodResolver(LoginSchema),
            defaultValues: { email: "", password: "" },
      });

      const onSubmit = (values: z.infer<typeof LoginSchema>) => {
            startTransition(() => {
                  loginSession(values, callbackUrl)
                        .then((data) => {
                              if (data?.error) {
                                    setError(data.error)
                              }

                              if (data?.success) {
                                    setSuccess(data.success)
                              }

                              if (data?.twoFactor) {
                                    setShowTwoFactor(true)
                              }
                        })
                        .catch(() =>
                              setError("Ops! Ocorreu um erro interno do servidor. Por favor, verifique a situação e tente novamente.")
                        );
            });
      };

      const cleanMessages = () => {
            setError("")
            setSuccess("")
            form.clearErrors()
      };

      return (
            <WrapperForm
                  titleForm={showTwoFactor ? ("Autenticação de dois fatores") : ("Bem vindo de volta")}
                  descriptionForm={showTwoFactor ? ("Por favor, insira o código de autenticação que enviamos para o seu e-mail") : !isPending ? ("Faça o login para acessar uma experiência de compra aprimorada.") : ("Validando credenciais...")}
            >
                  <form
                        className={"w-full space-y-4"}
                        onSubmit={form.handleSubmit(onSubmit)}
                        onChange={cleanMessages}
                  >
                        {showTwoFactor && (
                              <TextInput
                                    type={"text"}
                                    name={"code"}
                                    placeholder={"123456"}
                                    onChange={(e) => form.setValue("code", e.target.value)}
                                    error={form.formState.errors.code ? (true) : (false)}
                                    errorMessage={"Este campo é obrigatório"}
                                    disabled={isPending}
                                    autoComplete={"off"}
                              />
                        )}

                        {!showTwoFactor && (
                              <Flex className={"flex-col items-start space-y-4"}>
                                    <TextInput
                                          type={"email"}
                                          name={"email"}
                                          placeholder={"Email"}
                                          onChange={(e) => form.setValue("email", e.target.value)}
                                          error={form.formState.errors.email ? (true) : (false)}
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
                                          errorMessage={"Este campo é obrigatório"}
                                          disabled={isPending}
                                          autoComplete={"off"}
                                    />
                                    {!isPending && (
                                          <Button
                                                type={"button"}
                                                size={"xs"}
                                                variant={"light"}
                                                onClick={() => router.push("/auth/reset")}
                                                className={"ml-1"}
                                          >
                                                <span className={"text-tremor-label"}>
                                                      Esqueceu a senha ?
                                                </span>
                                          </Button>
                                    )}
                              </Flex>
                        )}

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
                                    <Button
                                          className={"w-full bg-slate-800 hover:bg-slate-900 border-slate-950 hover:border-slate-900"}
                                          type={"submit"}
                                          disabled={isPending}
                                    >
                                          {!showTwoFactor
                                                ? ("Entrar")
                                                : ("Confirmar")
                                          }
                                    </Button>
                              )}
                        </Flex>
                  </form>

                  {!isPending && (
                        <Text className="text-center flex space-x-2">
                              <span> Não tem uma conta? </span>
                              <Link href={"/auth/register"} className='text-tremor-default text-blue-600 underline'>
                                    Junte-se a nós
                              </Link>
                        </Text>
                  )}
            </WrapperForm>
      );
};