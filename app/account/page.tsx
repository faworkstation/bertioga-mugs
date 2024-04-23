"use client";

import { AnimBottomToTop } from "@/components/animations/AnimBottomToTop";
import { BeatLoading } from "@/components/loadings/BeatLoading";
import { CategorySection } from "@/components/sections/CategorySection";
import { StockSection } from "@/components/sections/StockSection";
import { Flex, Tab, TabGroup, TabList, TabPanel, TabPanels } from "@tremor/react";
import { useEffect, useState } from "react";
import { BsFillBoxSeamFill, BsFillClipboardCheckFill, BsFillLayersFill, } from "react-icons/bs";

export default function AccountPage() {
      const [selectedTab, setSelectedTab] = useState(0); // Estado para aba selecionada
      const [isLoading, setIsLoading] = useState(true); // Estado para controlar o carregamento

      // Função para salvar o índice da aba no local storage
      const saveTabToLocalStorage = (index: number) => {
            localStorage.setItem("selectedTab", index.toString());
      };

      // Carrega o índice da aba do local storage ao montar o componente
      useEffect(() => {
            const storedTab = localStorage.getItem("selectedTab");
            if (storedTab !== null) {
                  setSelectedTab(parseInt(storedTab, 10)); // Converte para número
            }

            // Adiciona um delay de 1 segundo antes de definir isLoading como false
            setTimeout(() => {
                  setIsLoading(false);
            }, 1500); // 1500 milissegundos = 1,5 segundo
      }, []); // Executa apenas uma vez ao montar

      if (isLoading) {
            return (
                  <AnimBottomToTop delay={0.1}>
                        <Flex className="flex-col items-center justify-start space-y-1 p-4">
                              <h3 className="text-slate-800 font-medium text-tremor-title">Carregando Página</h3>
                              <BeatLoading />
                        </Flex>
                  </AnimBottomToTop>
            );
      };

      return (
            <Flex className="p-4 relative">
                  <TabGroup
                        index={selectedTab} // Define a aba selecionada
                        onIndexChange={(index) => {
                              setSelectedTab(index); // Atualiza o estado da aba
                              saveTabToLocalStorage(index); // Salva no local storage
                        }}
                  >
                        <TabList
                              className="font-medium bg-gray-100 rounded-tremor-small text-slate-700 overflow-x-auto"
                        >
                              <Tab>
                                    <div className="flex justify-start space-x-2 items-center">
                                          <BsFillBoxSeamFill size={20} />
                                          <span className="text-tremor-default">Estoque</span>
                                    </div>
                              </Tab>
                              <Tab>
                                    <div className="flex justify-start space-x-2 items-center">
                                          <BsFillClipboardCheckFill size={20} />
                                          <span className="text-tremor-default">Pedidos</span>
                                    </div>
                              </Tab>
                              <Tab>
                                    <div className="flex justify-start space-x-2 items-center">
                                          <BsFillLayersFill size={20} />
                                          <span className="text-tremor-default">Categorias</span>
                                    </div>
                              </Tab>
                        </TabList>

                        <TabPanels>
                              <TabPanel>
                                    <StockSection />
                              </TabPanel>
                              <TabPanel>
                                    <p className="mt-4 leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                                          Diam nonumy eirmod tempor invidunt ut labore et dolore magna
                                          aliquyam erat. Lorem ipsum dolor sit amet, consetetur sadipscing
                                          elitr.
                                    </p>
                              </TabPanel>
                              <TabPanel>
                                    <CategorySection />
                              </TabPanel>
                        </TabPanels>
                  </TabGroup>
            </Flex>
      );
};