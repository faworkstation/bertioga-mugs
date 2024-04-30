import { Resend } from "resend";

const resend = new Resend("re_9nxV193d_6Kxrn7WACW3SAe57D7VeZqFm");

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
      const twoFactorCode = token;

      await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "Código de Autenticação - Canecas Bertioga",
            html: `<p>Seu código é: ${twoFactorCode}</p>`
      });
};

export const sendPasswordResetEmail = async (email: string, token: string,) => {
      const resetLink = `${domain}/auth/new-password?token=${token}`

      await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "Redefinição de Senha - Canecas Bertioga",
            html: `<p>Clique em redefinir senha para criar uma nova senha: <a href="${resetLink}">REDEFINIR SENHA</a></p>`
      });
};

export const sendVerificationEmail = async (email: string, token: string) => {
      const confirmLink = `${domain}/auth/new-verification?token=${token}`;

      await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "Corfirmação de Conta - Canecas Bertioga",
            html: `<p>Clique em confirmar conta para concluir o cadastro da sua conta: <a href="${confirmLink}">CONFIRMAR CONTA</a></p>`
      });
};