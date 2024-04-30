"use client";

import { useState } from "react";
import { BsExclamationTriangleFill, BsXCircle } from "react-icons/bs";
import { Button, Callout, Card, Flex, } from "@tremor/react";
import { AnimBottomToTop } from "@/components/animations/AnimBottomToTop";
import { SyncLoading } from "@/components/loadings/SyncLoading";

interface DeleteModalProps {
      idToDeleteData: string;
      isOpen: boolean;
      onClose: () => void;
      deleteFunction: (id: string) => Promise<{ success: string, error: string }>;
};

export const DeleteModal = ({ isOpen, onClose, idToDeleteData, deleteFunction }: DeleteModalProps) => {
      const [success, setSuccess] = useState<string>("");
      const [error, setError] = useState<string>("");

      const [isPending, setIsPending] = useState<boolean>(false);

      const handleDeleteData = async () => {
            setIsPending(true);

            try {
                  const result = await deleteFunction(idToDeleteData);

                  if (result.success) {
                        setSuccess(result.success);
                  } else if (result.error) {
                        setError(result.error)
                  };

            } catch (error) {
                  if (error) {
                        setError("Ops! Ocorreu um erro interno do servidor. Por favor, verifique a situação e tente novamente.")
                  };
            } finally {
                  setIsPending(false);
            };
      };

      return (
            <Flex className={`${isOpen ? "fixed" : "hidden"} modal`} >
                  <AnimBottomToTop>
                        <Flex className="w-full h-full items-center justify-center">
                              <Card className="max-w-lg p-4">
                                    {!success && (
                                          <h1
                                                className="w-full bg-slate-100 p-2 rounded-tremor-small flex items-center text-tremor-title"
                                                style={{ gap: "10px", marginTop: "20px" }}
                                          >
                                                <BsExclamationTriangleFill className="text-red-500" size={26} />
                                                Atenção!
                                          </h1>
                                    )}

                                    {success ? (
                                          <Callout title={success} color={"teal"} />
                                    ) : error ? (
                                          <Callout title={error} color={"red-400"} />
                                    ) : (
                                          <Callout title={"Você tem certeza que deseja excluir ?"} color={"red-400"} className="mt-4">
                                                Ao clicar em &quot;Sim, Excluir&quot;, todos os dados serão apagados de forma irreversível.
                                                Por favor, tenha certeza antes de prosseguir.
                                          </Callout>
                                    )}

                                    {!isPending && !success && !error ? (
                                          <Flex className={"justify-start space-x-2 mt-4"}>
                                                <Button
                                                      className="rounded-tremor-small bg-red-400 hover:bg-red-500 border-red-400 hover:border-red-500 text-white hover:text-white"
                                                      onClick={handleDeleteData}
                                                >
                                                      Sim, Excluir
                                                </Button>
                                                <Button variant={"secondary"} onClick={onClose}>
                                                      Cancelar
                                                </Button>
                                          </Flex>
                                    ) : isPending && (
                                          <SyncLoading />
                                    )}

                                    {!isPending && (
                                          < Button
                                                className="closeButton hover:text-white"
                                                icon={BsXCircle}
                                                size={"lg"}
                                                variant={"light"}
                                                onClick={onClose}
                                          />
                                    )}
                              </Card>
                        </Flex>
                  </AnimBottomToTop>
            </Flex>
      );
};