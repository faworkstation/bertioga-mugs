"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button, Callout, Card, Divider, Flex, TextInput, Title } from "@tremor/react";
import React, { useState, useTransition } from "react";
import { SyncLoading } from "../loadings/SyncLoading";
import { AnimBottomToTop } from "../animations/AnimBottomToTop";
import { registerOrder } from "@/database/create/register-order";
import { OrderSchema } from "@/schemas";

interface OrderFormProps {
      cartProducts: string[];
      clearCart: () => void;
};

export const OrderForm = ({ cartProducts, clearCart }: OrderFormProps) => {
      const [success, setSuccess] = useState<string>("");
      const [error, setError] = useState<string>("");
      const [isPending, setIsPending] = useState<boolean>(false);

      const [transitioning, startTransition] = useTransition();

      const form = useForm<z.infer<typeof OrderSchema>>({
            resolver: zodResolver(OrderSchema),
            defaultValues: { cartProducts: [], },
      });

      const onSubmit = (values: z.infer<typeof OrderSchema>) => {
            setIsPending(true);

            const dataToSend = {
                  ...values,
                  cartProducts: cartProducts,
            };

            startTransition(() => {
                  registerOrder(dataToSend)
                        .then((data) => {
                              if (data?.error) {
                                    setError(data.error);
                              } else if (data.url) {
                                    window.location = data.url;
                                    clearCart();
                              }
                        })
                        .catch((error) => {
                              setError("Erro ao enviar o formulário.");
                              console.error("Erro ao enviar o formulário:", error);
                        })
                        .finally(() => {
                              setIsPending(false);
                        });
            });
      };

      const cleanMessages = () => {
            form.clearErrors();
            setSuccess("");
            setError("");
      };

      return (
            <Card style={{ maxWidth: "600px" }}>
                  <Title>Informações do Pedido</Title>
                  <Divider />
                  <form
                        className={"w-full flex flex-col items-center justify-center space-y-4"}
                        onSubmit={form.handleSubmit(onSubmit)}
                        onChange={cleanMessages}
                  >
                        <div className="w-full space-y-1">
                              <h3 className="text-tremor-label font-bold text-slate-800 ml-1">Digite seu Nome</h3>
                              <TextInput
                                    className="defaultInput"
                                    type={"text"}
                                    name={"name"}
                                    placeholder={"Ex: Jhon Doe"}
                                    onChange={(e) => form.setValue("name", e.target.value)}
                                    error={form.formState.errors.name ? (true) : (false)}
                                    errorMessage={"Este campo é obrigatório"}
                                    disabled={isPending}
                                    autoComplete={"off"}
                              />
                        </div>
                        <div className="w-full space-y-1">
                              <h3 className="text-tremor-label font-bold text-slate-800 ml-1">E-mail</h3>
                              <TextInput
                                    className="defaultInput"
                                    type={"email"}
                                    name={"email"}
                                    placeholder={"seuemail@exemplo.com"}
                                    onChange={(e) => form.setValue("email", e.target.value)}
                                    error={form.formState.errors.email ? (true) : (false)}
                                    errorMessage={"Este campo é obrigatório"}
                                    disabled={isPending}
                                    autoComplete={"off"}
                              />
                        </div>
                        <div className="w-full space-y-1">
                              <h3 className="text-tremor-label font-bold text-slate-800 ml-1">Telefone</h3>
                              <TextInput
                                    className="defaultInput"
                                    type={"text"}
                                    name={"phone"}
                                    placeholder={"Rua. Aprovada, Nº 0101"}
                                    onChange={(e) => form.setValue("phone", e.target.value)}
                                    error={form.formState.errors.phone ? (true) : (false)}
                                    errorMessage={"Este campo é obrigatório"}
                                    disabled={isPending}
                                    autoComplete={"off"}
                              />
                        </div>
                        <div className="w-full space-y-1">
                              <h3 className="text-tremor-label font-bold text-slate-800 ml-1">CEP</h3>
                              <TextInput
                                    className="defaultInput"
                                    type={"text"}
                                    name={"cep"}
                                    placeholder={"1250000"}
                                    onChange={(e) => form.setValue("cep", e.target.value)}
                                    error={form.formState.errors.cep ? (true) : (false)}
                                    errorMessage={"Este campo é obrigatório"}
                                    disabled={isPending}
                                    autoComplete={"off"}
                              />
                        </div>
                        <div className="w-full space-y-1">
                              <h3 className="text-tremor-label font-bold text-slate-800 ml-1">Cidade</h3>
                              <TextInput
                                    className="defaultInput"
                                    type={"text"}
                                    name={"city"}
                                    placeholder={"1250000"}
                                    onChange={(e) => form.setValue("city", e.target.value)}
                                    error={form.formState.errors.city ? (true) : (false)}
                                    errorMessage={"Este campo é obrigatório"}
                                    disabled={isPending}
                                    autoComplete={"off"}
                              />
                        </div>
                        <div className="w-full space-y-1">
                              <h3 className="text-tremor-label font-bold text-slate-800 ml-1">Cidade</h3>
                              <TextInput
                                    className="defaultInput"
                                    type={"text"}
                                    name={"street"}
                                    placeholder={"Rua. Aprovada, Nº 0101"}
                                    onChange={(e) => form.setValue("street", e.target.value)}
                                    error={form.formState.errors.street ? (true) : (false)}
                                    errorMessage={"Este campo é obrigatório"}
                                    disabled={isPending}
                                    autoComplete={"off"}
                              />
                        </div>

                        {!success && <Divider />}

                        <Flex flexDirection="col" >
                              {isPending && !success ? (
                                    <SyncLoading />
                              ) : error ? (
                                    <Flex className="w-full flex-col space-y-1">
                                          <AnimBottomToTop>
                                                <Callout
                                                      className={"w-full"}
                                                      title={error ? (`${error}`) : form.formState.errors ? ("Por favor, preencha todos os campos obrigatórios.") : ""}
                                                      color={"red"}
                                                />
                                          </AnimBottomToTop>

                                          <Button
                                                className="w-full"
                                                type={"button"}
                                                onClick={() => {
                                                      setError("")
                                                      form.clearErrors();
                                                }}
                                          >
                                                OK
                                          </Button>
                                    </Flex>
                              ) : (
                                    <Button
                                          className="w-full"
                                          type={"submit"}
                                          disabled={isPending}
                                    >
                                          Finalizar Compra
                                    </Button>
                              )}
                        </Flex>
                  </form>
            </Card>
      )
}