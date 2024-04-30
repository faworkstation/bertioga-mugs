"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewPasswordSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { Suspense, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button, Callout, Divider, Flex, TextInput } from "@tremor/react";
import { SyncLoading } from "@/components/loadings/SyncLoading";
import { LoadingPage } from "@/components/loadings/LoadingPage";
import { WrapperForm } from "@/components/forms/WrapperForm";
import { handleResetPassword } from "@/actions/create/password-reset";

export const PasswordResetForm = () => {
      const [error, setError] = useState<string | undefined>("");
      const [success, setSuccess] = useState<string | undefined>("");

      const [isPending, startTransition] = useTransition();

      const searchParams = useSearchParams();

      const token = searchParams.get("token");

      const form = useForm<z.infer<typeof NewPasswordSchema>>({
            resolver: zodResolver(NewPasswordSchema),
            defaultValues: { password: "" },
      });

      const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
            cleanMessages()

            startTransition(() => {
                  handleResetPassword(values, token)
                        .then((data) => {
                              setError(data?.error)
                              setSuccess(data?.success)
                        });
            });
      };

      const cleanMessages = () => {
            form.clearErrors("password");
            setSuccess("");
            setError("");
      };

      return (
            <Suspense fallback={<LoadingPage />}>
                  <WrapperForm
                        titleForm={!success && !isPending ? ("Redefinição de Senha") : isPending ? ("Atualizando Senha...") : ("")}
                        descriptionForm={!isPending && !success ? ("Digite uma nova senha no campo abaixo para atualizar sua senha.") : ""}
                  >
                        <form
                              className={"w-full space-y-4"}
                              onSubmit={form.handleSubmit(onSubmit)}
                              onChange={cleanMessages}
                        >
                              {!success && (
                                    <>
                                          <TextInput
                                                type={"password"}
                                                name={"password"}
                                                placeholder={"Nova Senha"}
                                                onChange={(e) => form.setValue("password", e.target.value)}
                                                error={form.formState.errors.password ? (true) : (false)}
                                                errorMessage={"Insira no mínimo 6 caracteres para senha."}
                                                disabled={isPending}
                                          />
                                          <Divider />
                                    </>
                              )}

                              <Flex flexDirection={"col"} >
                                    {isPending ? (
                                          <SyncLoading />
                                    ) : error ? (
                                          <Callout
                                                title={`${error}`}
                                                color={"red"}
                                                className={"w-full"}
                                          />
                                    ) : success ? (
                                          <Callout
                                                title={`${success}`}
                                                color={"teal"}
                                                className={"w-full"}
                                          />
                                    ) : (
                                          <Button
                                                type={"submit"}
                                                disabled={isPending}
                                                className={"w-full bg-slate-800 hover:bg-slate-900 border-slate-950 hover:border-slate-900"}
                                          >
                                                Atualizar Senha
                                          </Button>
                                    )}
                              </Flex>
                        </form>

                        {!isPending && (
                              <Link href={"/account"} className="text-tremor-default text-blue-600 p-4 underline">
                                    Voltar ao login
                              </Link>
                        )}
                  </WrapperForm>
            </Suspense>
      );
};