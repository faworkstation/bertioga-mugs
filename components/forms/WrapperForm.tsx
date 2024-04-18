import React from "react";
import { Card, Flex, Subtitle, Text, } from "@tremor/react";
import { AnimBottomToTop } from "@/components/animations/AnimBottomToTop";
import { Doubts } from "@/components/Doubts";

type Props = {
      titleForm: string;
      descriptionForm: string;
      children: React.ReactNode;
};

export const WrapperForm = ({
      titleForm,
      descriptionForm,
      children
}: Props) => {
      return (
            <Flex className="flex-col justify-center space-y-4 p-2">
                  <AnimBottomToTop>
                        <div className="p-2 text-center max-w-lg flex flex-col items-center justify-center space-y-4">
                              <Subtitle className='font-bold text-slate-900' style={{ textTransform: 'uppercase' }}>
                                    {titleForm}
                              </Subtitle>
                              <Text> {descriptionForm} </Text>
                              {children}
                        </div>
                  </AnimBottomToTop>
                  <Doubts />
            </Flex>
      );
};