'use client'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ResetSchema } from '@/schemas'
import { useForm } from 'react-hook-form'
import { useState, useTransition } from 'react'
import { Button, Callout, Flex, TextInput } from '@tremor/react'
import { WrapperForm } from '@/components/forms/WrapperForm'
import { SyncLoading } from '@/components/loadings/SyncLoading'
import { handleRequestNewPassword } from '@/database/create/request-new-password'
import Link from 'next/link'

export const FormToRequestNewPassword = () => {
      const [error, setError] = useState<string | undefined>('')
      const [success, setSuccess] = useState<string | undefined>('')

      const [isPending, startTransition] = useTransition()

      const form = useForm<z.infer<typeof ResetSchema>>({
            resolver: zodResolver(ResetSchema),
            defaultValues: { email: '' },
      })

      const onSubmit = (values: z.infer<typeof ResetSchema>) => {
            cleanMessages()

            startTransition(() => {
                  handleRequestNewPassword(values)
                        .then((data) => {
                              setError(data?.error)
                              setSuccess(data?.success)
                        })
            })
      }

      const cleanMessages = () => {
            setError('')
            setSuccess('')
            form.clearErrors()
      }

      return (
            <WrapperForm
                  titleForm={isPending ? ('Enviando E-mail...') : !success ? ('Esqueceu a senha?  Não se preocupe.') : ('')}
                  descriptionForm={!isPending && !success ? ('Digite seu e-mail no campo abaixo e clique no botão `Enviar Email` para receber as instruções de redefinição de senha') : ("")}
            >
                  <form
                        className={'w-full space-y-4'}
                        onSubmit={form.handleSubmit(onSubmit)}
                        onChange={cleanMessages}
                  >
                        <TextInput
                              type={'email'}
                              name={'email'}
                              placeholder={'seuemail@exemplo.com'}
                              onChange={(e) => form.setValue('email', e.target.value)}
                              error={form.formState.errors.email ? (true) : (false)}
                              errorMessage={"Por favor, insira um email válido."}
                              disabled={isPending}
                        />

                        <Flex flexDirection='col' >
                              {isPending ? (
                                    <SyncLoading />
                              ) : error ? (
                                    <Callout
                                          title={`${error}`}
                                          color={'red'}
                                          className={'w-full'}
                                    />
                              ) : success ? (
                                    <Callout
                                          title={`${success}`}
                                          color={'teal'}
                                          className={'w-full'}
                                    />
                              ) : (
                                    <Button
                                          type={'submit'}
                                          disabled={isPending || form.getValues('email') === ''}
                                          className={'w-full bg-slate-800 hover:bg-slate-900 border-slate-950 hover:border-slate-900'}
                                    >
                                          Enviar E-mail
                                    </Button>
                              )}
                        </Flex>
                  </form>
                  {!isPending && (
                        <Link href={"/auth/login"} className='text-tremor-default text-blue-600 p-4 underline'>
                              Voltar ao login
                        </Link>
                  )}
            </WrapperForm >
      )
}