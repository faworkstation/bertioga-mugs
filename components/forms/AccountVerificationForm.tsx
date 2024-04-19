"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState, useTransition } from "react";
import { BeatLoader } from "react-spinners";
import { Button, Callout, Flex } from "@tremor/react";
import { WrapperForm } from "@/components/forms/WrapperForm";
import { LoadingPage } from "@/components/loadings/LoadingPage";
import { newVerification } from "@/database/create/new-verification";

export const AccountVerificationForm = () => {
      const [error, setError] = useState<string | undefined>();
      const [success, setSuccess] = useState<string | undefined>();

      const searchParams = useSearchParams();
      
      const token = searchParams.get("token");

      const [isPending, startTransition] = useTransition();

      const onSubmit = useCallback(() => {
            if (success || error) return;

            if (!token) {
                  setError("Token inválido ou inexistente. Por favor insira um token válido.");
                  return;
            };

            startTransition(() => {
                  newVerification(token)
                        .then((data) => {
                              setSuccess(data.success)
                              setError(data.error)
                        })
                        .catch(() => {
                              setError("Ops! Ocorreu um erro interno do servidor. Por favor, verifique a situação e tente novamente")
                        })
            });
      }, [token, success, error]);

      useEffect(() => {
            onSubmit();
      }, [onSubmit]);

      const router = useRouter();

      return (
            <Suspense fallback={<LoadingPage />}>
                  <WrapperForm
                        titleForm={success || error ? "" : "Confirmando Email..."}
                        descriptionForm=""
                  >
                        <Flex>
                              {success || error ? (
                                    <Flex flexDirection="col" className="space-y-4">
                                          <Callout
                                                className={"w-full"}
                                                title={"Email confirmado com sucesso! Agora você pode fazer o login na sua conta e aproveitar uma experiencia de compra aprimorada."}
                                                color={"teal"}
                                          />
                                          <Button type="button" onClick={() => router.push("/account")} >
                                                Fazer Login
                                          </Button>
                                    </Flex>
                              ) : isPending && (
                                    <Flex className={"w-full justify-center"}>
                                          <BeatLoader size={12} color={"#1D4ED8"} />
                                    </Flex>
                              )}
                        </Flex>
                  </WrapperForm>
            </Suspense>
      );
};