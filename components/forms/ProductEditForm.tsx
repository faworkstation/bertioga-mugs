"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState, useTransition } from "react"
import { BsFillBoxSeamFill, BsTrash, BsUpload, BsXCircle } from "react-icons/bs";
import { ProductSchema } from "@/schemas";
import Image from "next/image";

import {
      Button,
      Callout,
      Card,
      Divider,
      Flex,
      TextInput,
      Textarea
} from "@tremor/react";

import { AnimBottomToTop } from "@/components/animations/AnimBottomToTop"
import { BounceLoading } from "@/components/loadings/BounceLoading";
import { HeaderForm } from "@/components/forms/HeaderForm";
import { SyncLoading } from "@/components/loadings/SyncLoading"

import useUploadedFiles from "@/hooks/use-uploaded-files";
import { registerProduct } from "@/database/create/register-product";
import { Product } from "@prisma/client";
import { updateProduct } from "@/database/update/update-product";

export const ProductEditForm = ({
      isOpen,
      product,
      onClose,
}: {
      isOpen: boolean
      product: Product
      onClose: () => void
}) => {
      const initialData = {
            id: product.id || "",
            name: product.name || "",
            price: product.price || "",
            images: product.images || [],
            description: product.description || "",
      };

      const [success, setSuccess] = useState<string>("");
      const [error, setError] = useState<string>("");
      const [isFormModified, setIsFormModified] = useState<boolean>(false);
      const [isPending, setIsPending] = useState<boolean>(false);

      const [transitioning, startTransition] = useTransition();

      const form = useForm<z.infer<typeof ProductSchema>>({
            resolver: zodResolver(ProductSchema),
            defaultValues: { ...initialData },
      });

      useEffect(() => {
            const isModified =
                  form.getValues("name") !== initialData.name ||
                  form.getValues("price") !== initialData.price ||
                  form.getValues("description") !== initialData.description

            setIsFormModified(isModified);
      }, [form, initialData]);

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
      };

      const {
            uploadedFiles,
            isUploadingFiles,
            errorUploadFiles,
            setErrorUploadFiles,
            handleUploadFiles,
            setUploadedFiles,
            removeFile
      } = useUploadedFiles();

      useEffect(() => {
            if (initialData.images.length > 0) {
                  setUploadedFiles(initialData.images);
            }
      }, [])

      const onSubmit = (values: z.infer<typeof ProductSchema>) => {
            setIsPending(true);

            startTransition(() => {
                  if (uploadedFiles.length === 0) {
                        setIsPending(false);
                        setError("Por favor, insira fotos do produto. Clique no botão upload para adicionar fotos.");
                        return;
                  }

                  values.images = uploadedFiles;

                  updateProduct(values, product.id)
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
                                          icon={BsFillBoxSeamFill}
                                          title={"Editar Produto"}
                                          description={!success ? ("Altere as informações do formulário abaixo para editar um produto") : ("")}
                                    />

                                    <Divider className="mt-2" style={{ marginBlock: "10px" }} />

                                    <form
                                          className={"w-full flex flex-col items-center justify-center"}
                                          onSubmit={form.handleSubmit(onSubmit)}
                                          onChange={cleanMessages}
                                    >
                                          {!success && (
                                                <Flex
                                                      className={"flex-col overflow-auto pb-2 space-y-4 items-start"}
                                                      style={{
                                                            height: "auto",
                                                            maxHeight: "400px",
                                                            scrollbarWidth: "none",
                                                      }}
                                                >
                                                      <div className="w-full space-y-1">
                                                            <h3 className="text-tremor-label font-bold text-slate-800">Digite o Nome do Produto</h3>
                                                            <TextInput
                                                                  className="defaultInput"
                                                                  type={"text"}
                                                                  name={"name"}
                                                                  placeholder={"Ex: Produto X"}
                                                                  onChange={(e) => form.setValue("name", e.target.value)}
                                                                  error={form.formState.errors.name ? (true) : (false)}
                                                                  errorMessage={"Este campo é obrigatório"}
                                                                  disabled={isUploadingFiles || isPending}
                                                                  defaultValue={initialData.name}
                                                            />
                                                      </div>

                                                      <div className="w-full space-y-1">
                                                            <h3 className="text-tremor-label font-bold text-slate-800">Insira o Valor de Venda</h3>
                                                            <TextInput
                                                                  className="defaultInput"
                                                                  type={"text"}
                                                                  name={"price"}
                                                                  placeholder={"R$ 0,00"}
                                                                  onChange={handlePriceChange('price')}
                                                                  error={form.formState.errors.price ? (true) : (false)}
                                                                  errorMessage={form.formState.errors.description?.message}
                                                                  disabled={isUploadingFiles || isPending}
                                                                  defaultValue={initialData.price}
                                                            />
                                                      </div>

                                                      <div className="w-full space-y-1">
                                                            <h3 className="text-tremor-label font-bold text-slate-800">Fotos do Produto</h3>
                                                            <div className="flex flex-wrap items-center" style={{ gap: "10px" }}>
                                                                  {!!uploadedFiles?.length && uploadedFiles?.map((link, index) => (
                                                                        <div className="relative" key={index}>
                                                                              <Button
                                                                                    type={"button"}
                                                                                    className={"deleteButton"}
                                                                                    icon={BsTrash}
                                                                                    variant={"light"}
                                                                                    size={"xs"}
                                                                                    onClick={() => removeFile(index)}
                                                                              />

                                                                              <Image
                                                                                    src={`${link}`}
                                                                                    alt={`Uploaded image ${index + 1}`}
                                                                                    width={80}
                                                                                    height={80}
                                                                                    className="rounded-tremor-default"
                                                                              />
                                                                        </div>
                                                                  ))}

                                                                  {isUploadingFiles && (
                                                                        <div className="h-24 flex items-center">
                                                                              <BounceLoading />
                                                                        </div>
                                                                  )}

                                                                  <label
                                                                        className="border-2 rounded-tremor-default cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-slate-800 bg-slate-200 border-slate-300 p-2"
                                                                        style={{ widows: '60px', height: '60px' }}
                                                                  >
                                                                        <BsUpload size={20} className="text-slate-600" />
                                                                        <span> Upload </span>
                                                                        <input
                                                                              className="hidden"
                                                                              type="file"
                                                                              id="file"
                                                                              name="file"
                                                                              accept="images/*"
                                                                              multiple
                                                                              onChange={handleUploadFiles}
                                                                        />
                                                                  </label>

                                                                  {!uploadedFiles?.length && !isUploadingFiles && (
                                                                        <h3 className="text-tremor-label">
                                                                              Clique no botão upload para adicionar fotos
                                                                        </h3>
                                                                  )}
                                                            </div>
                                                      </div>

                                                      <div className="w-full space-y-1">
                                                            <h3 className="text-tremor-label font-bold text-slate-800">Descreva o produto</h3>
                                                            <Textarea
                                                                  className="defaultInput"
                                                                  name={"description"}
                                                                  placeholder={"Digite uma descrição curta e informativa do produto..."}
                                                                  onChange={(e) => form.setValue("description", e.target.value)}
                                                                  error={form.formState.errors.description ? (true) : (false)}
                                                                  errorMessage={form.formState.errors.description?.message}
                                                                  disabled={isUploadingFiles || isPending}
                                                                  rows={4}
                                                                  maxLength={124}
                                                                  defaultValue={initialData.description}
                                                            />
                                                      </div>
                                                </Flex>
                                          )}

                                          {!success && <Divider className="mt-2" style={{ marginBlock: "10px" }} />}

                                          <Flex flexDirection="col" >
                                                {isPending && !success ? (
                                                      <SyncLoading />
                                                ) : error || form.formState.errors.description ? (
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
                                                ) : errorUploadFiles ? (
                                                      <Flex className="w-full flex-col space-y-1">
                                                            <AnimBottomToTop>
                                                                  <Callout
                                                                        className={"w-full"}
                                                                        title={`${errorUploadFiles}`}
                                                                        color={"red"}
                                                                  />
                                                            </AnimBottomToTop>

                                                            <Button
                                                                  className="w-full"
                                                                  type={"button"}
                                                                  onClick={() => setErrorUploadFiles("")}
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
                                                                        onClick={() => setSuccess("")}
                                                                  >
                                                                        Editar Novamente
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
                                                      <Flex className="justify-start space-x-2">
                                                            <Button
                                                                  type={"submit"}
                                                                  disabled={isUploadingFiles || isPending}
                                                            >
                                                                  Salvar Edição
                                                            </Button>
                                                            <Button
                                                                  type={"button"}
                                                                  variant="secondary"
                                                                  onClick={onClose}
                                                                  disabled={isUploadingFiles || isPending}
                                                            >
                                                                  Cancelar
                                                            </Button>
                                                      </Flex>
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