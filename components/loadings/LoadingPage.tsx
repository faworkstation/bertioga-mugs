import { Flex, Title } from "@tremor/react";
import { BeatLoading } from "@/components/loadings/BeatLoading";

export const LoadingPage = () => {
      return (
            <Flex className="flex-col space-y-4 justify-start">
                  <Title>Carregando Página</Title>
                  <BeatLoading />
            </Flex>
      );
};