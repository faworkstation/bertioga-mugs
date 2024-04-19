import { Flex } from '@tremor/react'
import { BeatLoader } from 'react-spinners'
import { AnimBottomToTop } from '../animations/AnimBottomToTop';

export const BeatLoading = () => {
      return (
            <AnimBottomToTop>
                  <Flex className="w-full h-full p-4 justify-center items-center">
                        <BeatLoader size={12} color={'#1D4ED8'} />
                  </Flex>
            </AnimBottomToTop>
      );
};