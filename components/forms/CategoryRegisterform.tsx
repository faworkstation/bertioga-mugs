"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react"
import { BsFillLayersFill, BsXCircle } from "react-icons/bs";
import { CategorySchema } from "@/schemas";

import {
      Button,
      Callout,
      Card,
      Divider,
      Flex,
      Select,
      SelectItem,
      TextInput,
} from "@tremor/react";

import { AnimBottomToTop } from "@/components/animations/AnimBottomToTop"
import { HeaderForm } from "@/components/forms/HeaderForm";
import { SyncLoading } from "@/components/loadings/SyncLoading"

import { useCategoryData } from "@/hooks/use-category-data";
import { registerCategory } from "@/database/create/register-category";

interface CategoryFormProps {
      isOpen: boolean;
      onClose: () => void;
};

export const CategoryRegisterForm = ({ isOpen, onClose, }: CategoryFormProps) => {
      const [success, setSuccess] = useState<string>("");
      const [error, setError] = useState<string>("");
      const [isPending, setIsPending] = useState<boolean>(false);

      const [transitioning, startTransition] = useTransition();

      const form = useForm<z.infer<typeof CategorySchema>>({
            resolver: zodResolver(CategorySchema),
            defaultValues: {},
      });

      const { categories } = useCategoryData();

      const onSubmit = (values: z.infer<typeof CategorySchema>) => {
            setIsPending(true);

            startTransition(() => {
                  registerCategory(values)
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
                              <Card className={"cardForm"}>
                                    <HeaderForm
                                          icon={BsFillLayersFill}
                                          title={"Registro de Categoria"}
                                          description={!success ? ("Preencha o formulário abaixo para registrar uma categoria") : ("")}
                                    />

                                    <Divider className="mt-2" style={{ marginBlock: "10px" }} />

                                    <form
                                          className={"w-full flex flex-col items-center justify-center"}
                                          onSubmit={form.handleSubmit(onSubmit)}
                                          onChange={cleanMessages}
                                    >
                                          {!success && (
                                                <Flex
                                                      className={"flex-col pb-2 space-y-4 items-start justify-start"}
                                                >
                                                      <div className="w-full space-y-1">
                                                            <h3 className="text-tremor-label font-bold text-slate-800 ml-1">Digite o Nome da Categoria</h3>
                                                            <TextInput
                                                                  className="defaultInput"
                                                                  type={"text"}
                                                                  name={"name"}
                                                                  placeholder={"Ex: Categoria X"}
                                                                  onChange={(e) => form.setValue("name", e.target.value)}
                                                                  error={form.formState.errors.name ? (true) : (false)}
                                                                  errorMessage={"Este campo é obrigatório"}
                                                                  disabled={isPending}
                                                                  autoComplete={"off"}
                                                            />
                                                      </div>
                                                      <div className="w-full space-y-1">
                                                            <h3 className="text-tremor-label font-bold text-slate-800 ml-1">Selecione uma Subcategoria</h3>
                                                            <Select
                                                                  className="border border-slate-300 rounded-tremor-default"
                                                                  name={"parent"}
                                                                  onValueChange={(value: string) => form.setValue("parent", value)}
                                                                  placeholder="Clique para selecionar"
                                                            >
                                                                  {categories.length > 0
                                                                        && categories.map(category => (
                                                                              <SelectItem
                                                                                    key={category.id}
                                                                                    value={category.name}
                                                                              >
                                                                                    {category.name}
                                                                              </SelectItem>
                                                                        ))}
                                                            </Select>
                                                      </div>
                                                </Flex>
                                          )}

                                          {!success && <Divider className="mt-2" style={{ marginBlock: "10px" }} />}

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
                                                ) : success ? (
                                                      <Flex className="w-full flex-col space-y-4">
                                                            <AnimBottomToTop>
                                                                  <Callout
                                                                        className={"w-full"}
                                                                        title={`${success}`}
                                                                        color={"teal"}
                                                                  />
                                                            </AnimBottomToTop>

                                                            <Flex className="justify-start space-x-2">
                                                                  <Button
                                                                        type={"button"}
                                                                        onClick={() => {
                                                                              setSuccess("")
                                                                        }}
                                                                  >
                                                                        Registrar Nova Categoria
                                                                  </Button>
                                                                  <Button
                                                                        type={"button"}
                                                                        variant="secondary"
                                                                        onClick={onClose}
                                                                  >
                                                                        Fechar
                                                                  </Button>
                                                            </Flex>
                                                      </Flex>
                                                ) : (
                                                      <Button
                                                            className="w-full"
                                                            type={"submit"}
                                                            disabled={isPending}
                                                      >
                                                            Salvar Registro
                                                      </Button>

                                                )}
                                          </Flex>
                                    </form>

                                    <Button
                                          icon={BsXCircle}
                                          variant={"light"}
                                          size="lg"
                                          className={"closeButton hover:text-white"}
                                          onClick={onClose}
                                    />
                              </Card>
                        </AnimBottomToTop>
                  </Flex>
            </Flex>
      );
};