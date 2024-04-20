"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react"
import { FaX, FaWrench } from "react-icons/fa6";
import { ptBR } from "date-fns/locale";

import { ProductSchema } from "@/schemas";

import { Button, Callout, Card, DatePicker, Divider, Flex, TextInput, Textarea, } from "@tremor/react";
import { AnimBottomToTop } from "@/components/animations/AnimBottomToTop"
import { HeaderForm } from "@/components/forms/HeaderForm";
import { SyncLoading } from "@/components/loadings/SyncLoading"

import { registerProduct } from "@/database/create/register-product";
import { CiMug1 } from "react-icons/ci";

export const ProductRegisterForm = ({
      isOpen,
      onClose,
}: {
      isOpen: boolean
      onClose: () => void
}) => {
      const [success, setSuccess] = useState<string>("");
      const [error, setError] = useState<string>("");

      const [isPending, setIsPending] = useState<boolean>(false);

      const [transitioning, startTransition] = useTransition();

      const form = useForm<z.infer<typeof ProductSchema>>({
            resolver: zodResolver(ProductSchema),
            defaultValues: {},
      });

      // Função para lidar com a mudança nos inputs de preço 'BRL'
      const handlePriceChange = (inputName: keyof z.infer<typeof ProductSchema>) => (
            event: React.ChangeEvent<HTMLInputElement>
      ) => {
            const inputValue = event.target.value;

            // Remove todos os caracteres não numéricos e pontos decimais do valor de entrada
            const numericValue = inputValue.replace(/[^\d]/g, '');

            // Formata o valor para moeda brasileira
            let formattedValue = (Number(numericValue) / 100).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
            });

            // Verifica se o valor formatado começa com "R$ " e remove se for o caso
            if (numericValue === '') {
                  formattedValue = '';
            }

            // Atualiza o valor no input
            event.target.value = formattedValue;

            // Define o valor no formulário
            form.setValue(inputName, formattedValue);
      }

      const onSubmit = (values: z.infer<typeof ProductSchema>) => {
            setIsPending(true);

            startTransition(() => {
                  registerProduct(values)
                        .then((data) => {
                              if (data?.error) {
                                    setError(data.error);
                              } else if (data?.success) {
                                    setSuccess(data.success);
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
            <Flex className={`${isOpen ? "fixed" : "hidden"} modal`} >
                  <Flex className={"w-full h-full items-center justify-center"}>
                        <AnimBottomToTop>
                              <Card className={"p-4"}>
                                    <HeaderForm
                                          icon={CiMug1}
                                          title={"Cadastro de Canecas"}
                                          description={!success ? ("Preencha o formulário abaixo para cadastrar uma caneca") : ("")}
                                    />

                                    <form
                                          className={"w-full flex flex-col items-center justify-center mt-4"}
                                          onSubmit={form.handleSubmit(onSubmit)}
                                          onChange={cleanMessages}
                                    >
                                          {!success && (
                                                <Flex
                                                      className={"flex-col overflow-auto pb-2 space-y-2 items-start"}
                                                      style={{
                                                            height: "auto",
                                                            maxHeight: "350px",
                                                            scrollbarWidth: "none",
                                                      }}
                                                >
                                                      <TextInput
                                                            className="defaultInput"
                                                            type={"text"}
                                                            name={"name"}
                                                            placeholder={"Nome da Caneca"}
                                                            onChange={(e) => form.setValue("name", e.target.value)}
                                                            error={form.formState.errors.name ? (true) : (false)}
                                                            errorMessage={"Este campo é obrigatório"}
                                                            disabled={isPending}
                                                            autoComplete={"off"}
                                                      />
                                                      <TextInput
                                                            className="defaultInput"
                                                            type={"text"}
                                                            name={"price"}
                                                            placeholder={"Valor de venda"}
                                                            onChange={handlePriceChange('price')}
                                                            error={form.formState.errors.price ? (true) : (false)}
                                                            errorMessage={"Este campo é obrigatório"}
                                                            disabled={isPending}
                                                      />
                                                      <DatePicker
                                                            className="defaultInput"
                                                            locale={ptBR}
                                                            displayFormat={"dd/MM/yyyy"}
                                                            disabled={isPending}
                                                            placeholder={"Data de Fabricação"}
                                                            onValueChange={(selectedDate: any | null) =>
                                                                  selectedDate && form.setValue("date", selectedDate)
                                                            }
                                                      />

                                                      <Textarea
                                                            className="defaultInput"
                                                            name={"description"}
                                                            placeholder={"Descrição do produto..."}
                                                            onChange={(e) => form.setValue("description", e.target.value)}
                                                            error={form.formState.errors.description ? (true) : (false)}
                                                            errorMessage={"Este campo é obrigatório"}
                                                            disabled={isPending}
                                                            rows={6}
                                                      />
                                                </Flex>
                                          )}

                                          {!success && <Divider className="mt-2" style={{ marginBlock: "10px" }} />}

                                          <Flex flexDirection="col" >
                                                {isPending && !success ? (
                                                      <SyncLoading />
                                                ) : error ? (
                                                      <Flex className="w-full flex-col space-y-4">
                                                            <AnimBottomToTop>
                                                                  <Callout
                                                                        className={"w-full"}
                                                                        title={`${error}`}
                                                                        color={"red"}
                                                                  />
                                                            </AnimBottomToTop>

                                                            <Button
                                                                  type={"button"}
                                                                  onClick={onClose}
                                                            >
                                                                  OK
                                                            </Button>
                                                      </Flex>
                                                ) : success ? (
                                                      <Flex className="w-full flex-col space-y-4">
                                                            <AnimBottomToTop>
                                                                  <Callout
                                                                        className={"w-full"}
                                                                        title={`${success}`}
                                                                        color={"teal"}
                                                                  />
                                                            </AnimBottomToTop>

                                                            <Button
                                                                  className={"w-full"}
                                                                  type={"button"}
                                                                  onClick={onClose}
                                                            >
                                                                  OK
                                                            </Button>
                                                      </Flex>
                                                ) : (
                                                      <Button
                                                            className={"w-full"}
                                                            type={"submit"}
                                                            disabled={isPending}
                                                      >
                                                            Salvar Cadastro
                                                      </Button>
                                                )}
                                          </Flex>
                                    </form>

                                    < Button
                                          icon={FaX}
                                          variant={"light"}
                                          size={"xs"}
                                          className={"closeButton hover:text-white"}
                                          onClick={onClose}
                                    />
                              </Card>
                        </AnimBottomToTop>
                  </Flex>
            </Flex>
      );
};