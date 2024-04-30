import { Flex } from "@tremor/react";

interface HeaderFormProps {
      icon?: React.ComponentType<{ size?: number }>;
      title: string;
      description: string;
};

export const HeaderForm = ({ icon: IconComponent, title, description, }: HeaderFormProps) => {
      const iconSize = 16;

      return (
            <Flex className={"flex-col justify-start space-y-1 text-center mt-4 border-b-2 border-slate-100 pb-1"}>
                  <h2 className={"flex items-center justify-center font-medium text-slate-800 space-x-2"} >
                        {IconComponent && <IconComponent size={iconSize} />}
                        <span>{title}</span>
                  </h2>
                  <p className={"text-slate-500 text-tremor-default"}>
                        {description}
                  </p>
            </Flex>
      );
};