"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState, useTransition } from "react"
import { BsFillBoxSeamFill, BsTrash, BsTrashFill, BsUpload, BsXCircle } from "react-icons/bs";

import { ProductSchema } from "@/schemas";
import { Product } from "@prisma/client";

import Image from "next/image";

import {
      Button,
      Callout,
      Card,
      Divider,
      Flex,
      Select,
      SelectItem,
      TextInput,
      Textarea
} from "@tremor/react";

import { AnimBottomToTop } from "@/components/animations/AnimBottomToTop"
import { BounceLoading } from "@/components/loadings/BounceLoading";
import { HeaderForm } from "@/components/forms/HeaderForm";
import { SyncLoading } from "@/components/loadings/SyncLoading"

import { useCategoryData } from "@/hooks/use-category-data";
import useUploadedFiles from "@/hooks/use-uploaded-files";
import { updateProduct } from "@/database/update/update-product";

interface PropsOfProperties {
      name: string;
      values: string[];
}[];

interface ProductEditFormProps {
      isOpen: boolean;
      product: Product;
      onClose: () => void;
}

const convertToPropsOfProperties = (json: any): PropsOfProperties[] => {
      if (!Array.isArray(json)) {
            return [];
      };

      return json.map((item) => {
            if (typeof item === 'object' && item !== null && 'name' in item && 'values' in item && Array.isArray(item.values)) {
                  return {
                        name: item.name || '',
                        values: item.values.filter((v: string) => typeof v === 'string'),
                  };
            }

            return {
                  name: '',
                  values: [],
            };
      });
};

const getInitialData = (product: Product) => {
      const initialProperties = convertToPropsOfProperties(product.properties);

      return {
            id: product.id || "",
            name: product.name || "",
            price: product.price || "",
            images: product.images || [],
            description: product.description || "",
            categoryId: product.categoryId || "",
            categoryName: product.categoryName || "",
            properties: initialProperties,
      };
};

export const ProductEditForm = ({
      isOpen,
      product,
      onClose,
}: ProductEditFormProps) => {
      // Dados inicias do formulário de edição.
      const initialData = getInitialData(product);

      // Estados iniciais das propriedades e dos status do formulário
      const [properties, setProperties] = useState<PropsOfProperties[] | []>(initialData.properties);
      const [error, setError] = useState<string>("");
      const [success, setSuccess] = useState<string>("");
      const [isPending, setIsPending] = useState<boolean>(false);

      const [transitioning, startTransition] = useTransition();

      const { categories } = useCategoryData();

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
                  setUploadedFiles(initialData.images)
            };
      }, []);

      const form = useForm<z.infer<typeof ProductSchema>>({
            resolver: zodResolver(ProductSchema),
            defaultValues: { ...initialData },
      });

      const onSubmit = (values: z.infer<typeof ProductSchema>) => {
            setIsPending(true);

            if (uploadedFiles.length === 0) {
                  setIsPending(false);
                  setError("Por favor, insira fotos do produto. Clique no botão upload para adicionar fotos.");
                  return;
            }

            values.images = uploadedFiles;
            values.properties = properties;

            startTransition(() => {
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

      const addProperty = () => {
            setProperties((prev: PropsOfProperties[]) => {
                  return [...prev, { name: '', values: [] }];
            })
      }

      const removeProperty = (indexToRemove: number) => {
            setProperties((prev) => prev.filter((_, index) => index !== indexToRemove));
      };

      const handlePropertyNameChange = (index: number, newName: string) => {
            setProperties((prev) => {
                  const updatedProperties = [...prev];
                  updatedProperties[index].name = newName;
                  return updatedProperties;
            });
      };

      const handlePropertyValuesChange = (index: number, newValues: string) => {
            // Divide a string 'newValues' usando vírgulas como separadores e remove espaços extras
            const valuesArray = newValues ? newValues.split(',').map((value) => value.trim()) : [];

            // Atualiza a propriedade no estado 'properties'
            setProperties((prev) => {
                  const updatedProperties = [...prev];
                  // Atualiza os valores da propriedade correspondente ao índice
                  updatedProperties[index].values = valuesArray; // 'values' é um array
                  return updatedProperties;
            });
      };

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
                                                            maxHeight: "420px",
                                                            paddingInline: "5px"
                                                      }}
                                                >
                                                      <div className="w-full space-y-1">
                                                            <h3 className="text-tremor-label font-bold text-slate-800 ml-1">Digite o Nome do Produto</h3>
                                                            <TextInput
                                                                  className="defaultInput"
                                                                  type={"text"}
                                                                  name={"name"}
                                                                  placeholder={"Ex: Produto X"}
                                                                  onChange={(e) => form.setValue("name", e.target.value)}
                                                                  error={form.formState.errors.name ? (true) : (false)}
                                                                  errorMessage={"Este campo é obrigatório"}
                                                                  disabled={isUploadingFiles || isPending}
                                                                  autoComplete={"off"}
                                                                  defaultValue={initialData.name}
                                                            />
                                                      </div>
                                                      <div className="w-full space-y-1">
                                                            <h3 className="text-tremor-label font-bold text-slate-800 ml-1">Selecione uma Categoria</h3>
                                                            <Select
                                                                  className="border border-slate-300 rounded-tremor-default"
                                                                  name={"category"}
                                                                  onValueChange={(value: string) => {
                                                                        const selectedCategory = categories.find((cat) => cat.id === value);
                                                                        form.setValue("categoryId", value);
                                                                        form.setValue("categoryName", selectedCategory ? selectedCategory.name : "");
                                                                  }}
                                                                  placeholder="Clique para selecionar"
                                                                  defaultValue={initialData.categoryId}
                                                            >
                                                                  {categories.map((category) => (
                                                                        <SelectItem key={category.id} value={category.id}>
                                                                              {category.name}
                                                                        </SelectItem>
                                                                  ))}
                                                            </Select>

                                                      </div>

                                                      <div className="w-full space-y-1">
                                                            <h3 className="text-tremor-label font-bold text-slate-800 ml-1">Insira o Valor de Venda</h3>
                                                            <TextInput
                                                                  className="defaultInput"
                                                                  type={"text"}
                                                                  name={"price"}
                                                                  placeholder={"R$ 0,00"}
                                                                  onChange={handlePriceChange('price')}
                                                                  error={form.formState.errors.price ? (true) : (false)}
                                                                  errorMessage={"Este campo é obrigatório"}
                                                                  disabled={isUploadingFiles || isPending}
                                                                  defaultValue={initialData.price}
                                                            />
                                                      </div>

                                                      <div className="w-full space-y-1">
                                                            <h3 className="text-tremor-label font-bold text-slate-800 ml-1 mb-2">Fotos do Produto</h3>
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
                                                            <h3 className="text-tremor-label font-bold text-slate-800 ml-2">Propriedades</h3>
                                                            {properties.length > 0 && properties.map((property, index) => (
                                                                  <Flex className="items-start space-x-2" key={index}>
                                                                        <Flex className="sm:flex-row flex-col" style={{ gap: '5px' }}>
                                                                              <TextInput
                                                                                    className="max-w-sm"
                                                                                    type="text"
                                                                                    value={property.name}
                                                                                    onChange={e => handlePropertyNameChange(index, e.target.value)}
                                                                                    placeholder="Nome da propriedade (ex: cor)"
                                                                              />
                                                                              <TextInput
                                                                                    className="max-w-sm"
                                                                                    type="text"
                                                                                    value={property.values.join(', ')}
                                                                                    onChange={e => handlePropertyValuesChange(index, e.target.value)}
                                                                                    placeholder="Valores separados por vírgula"
                                                                              />
                                                                        </Flex>
                                                                        <Button
                                                                              icon={BsTrashFill}
                                                                              type="button"
                                                                              className="text-white bg-slate-400 hover:bg-slate-500 border-slate-500 transition-all duration-300 hover:border-slate-500"
                                                                              onClick={() => removeProperty(index)}
                                                                        />
                                                                  </Flex>
                                                            ))}
                                                            <Button
                                                                  onClick={addProperty}
                                                                  type="button"
                                                                  className="p-2"
                                                                  variant="light"
                                                            >
                                                                  + Adicione propriedades
                                                            </Button>
                                                      </div>

                                                      <div className="w-full space-y-1">
                                                            <h3 className="text-tremor-label font-bold text-slate-800 ml-2">Descreva o produto</h3>
                                                            <Textarea
                                                                  className="defaultInput"
                                                                  name={"description"}
                                                                  placeholder={"Digite uma descrição curta e informativa do produto..."}
                                                                  onChange={(e) => form.setValue("description", e.target.value)}
                                                                  error={form.formState.errors.description ? (true) : (false)}
                                                                  errorMessage={"Este campo é obrigatório"}
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
                                                                        onClick={() => {
                                                                              setSuccess("")
                                                                              setUploadedFiles([]);
                                                                        }}
                                                                  >
                                                                        Cadastrar Novo Produto
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
                                                            disabled={isUploadingFiles || isPending}
                                                      >
                                                            Salvar Cadastro
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