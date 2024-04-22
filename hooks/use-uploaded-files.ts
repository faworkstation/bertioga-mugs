"use client";

import { ChangeEvent, useState } from "react";
import { uploadFiles } from "@/database/upload/upload-files";

const useUploadedFiles = () => {
      const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
      const [isUploadingFiles, setIsUploadingFiles] = useState<boolean>(false);
      const [errorUploadFiles, setErrorUploadFiles] = useState<string>("");

      const handleUploadFiles = async (event: ChangeEvent<HTMLInputElement>) => {
            event.preventDefault();

            if (!event.target.files) {
                  return;
            }

            const formData = new FormData();
            const files = Array.from(event.target.files);

            const maxFiles = 4;
            const currentFileCount = uploadedFiles.length;

            if (currentFileCount + files.length > maxFiles) {
                  setErrorUploadFiles(`Você só pode carregar até ${maxFiles} fotos. Você já tem ${currentFileCount}.`);
                  return;
            }

            files.forEach((file) => {
                  formData.append("file", file);
            });

            setIsUploadingFiles(true);

            try {
                  const uploadedLinks = await uploadFiles(formData);
                  setUploadedFiles((prev) => [...prev, ...uploadedLinks]);
                  setErrorUploadFiles("");
            } catch (uploadError) {
                  console.error("Erro ao carregar arquivos:", uploadError);
                  setErrorUploadFiles("Falha ao carregar arquivos. Por favor, tente novamente.");
            } finally {
                  setIsUploadingFiles(false);
            }
      };

      const removeFile = (index: number) => {
            setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
      };

      return { uploadedFiles, isUploadingFiles, errorUploadFiles, handleUploadFiles, removeFile, setErrorUploadFiles, setUploadedFiles };
};

export default useUploadedFiles;
