"use client";

import { LogoutButton } from "@/components/buttons/LogoutButton";
import { BeatLoading } from "@/components/loadings/BeatLoading";
import { Button, Flex } from "@tremor/react";
import { useState } from "react";

export default function AccountPage() {
      const [isLogoutProccessing, setIsLogouProccessing] = useState<boolean>(false);

      return (
            <Flex className="p-4">
                  <h1>Account Page</h1>

                  {!isLogoutProccessing ? (
                        <LogoutButton>
                              <Button type="button" variant="secondary" onClick={() => setIsLogouProccessing(true)}>
                                    Sair
                              </Button>
                        </LogoutButton>
                  ) : (
                        <BeatLoading />
                  )}
            </Flex>
      )
}