import { Button, Divider, Flex, Text, Title } from "@tremor/react"
import React from "react"
import { BsArrowRight } from "react-icons/bs"

export const Doubts = () => {
      return (
            <Flex className="flex-col items-start space-y-2 max-w-lg">
                  <Divider />
                  <Title>Tem dúvidas ?</Title>
                  <Text>Você pode encontrar perguntas e respostas frequentes em nossa página de atendimento ao cliente.</Text>
                  <Flex className="justify-end">
                        <Button
                              type="button"
                              variant="light"
                        >
                              <div className="flex space-x-2 items-center justify-end p-2" >
                                    <span> Atendimento ao Cliente </span>
                                    <BsArrowRight size={20} />
                              </div>
                        </Button>
                  </Flex>
            </Flex>
      )
}