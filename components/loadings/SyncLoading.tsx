import { Flex } from '@tremor/react'
import { SyncLoader } from 'react-spinners'

export const SyncLoading = () => {
      return (
            <Flex className={'w-full items-center justify-center p-2 mt-2'}>
                  <SyncLoader size={12} color={'#1D4ED8'} />
            </Flex>
      )
}