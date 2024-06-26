import { BeatLoader } from "react-spinners";
import { Flex } from "@tremor/react";
import { AnimBottomToTop } from "@/components/animations/AnimBottomToTop";

export const BeatLoading = () => {
      return (
            <AnimBottomToTop>
                  <Flex className="w-full h-full p-4 justify-center items-center">
                        <BeatLoader size={12} color={"#3B82F6"} />
                  </Flex>
            </AnimBottomToTop>
      );
};