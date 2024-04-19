'use client'

import Image from 'next/image'
import { Poppins } from 'next/font/google'
import { cn } from '@/libs/tw-merge'
import { Flex, Title } from '@tremor/react'
import { SyncLoading } from '@/components/loadings/SyncLoading'

const font = Poppins({ subsets: ['latin'], weight: ['600'] })

export const LoadingPage = () => {
      return (
            <Flex className={'w-full h-full flex-col space-y-4'}>
                  <Image
                        src={'/ligth-icon.svg'}
                        alt={'Logotipo Controle de Praia.com'}
                        width={100}
                        height={100}
                  />

                  <Title className={cn('text-white', font.className)}>
                        Controle de Praia <b className={'text-yellow-500'}>.com</b>
                  </Title>

                  <SyncLoading />
            </Flex>
      )
}