import { z } from "zod";

const allowedDomains = [
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "icloud.com",
  "mail.ru",
  "yandex.ru",
  "hotmail.com",
  "aol.com",
  "protonmail.com",
  "zoho.com",
];

export const registrationSchema = z
  .object({
    username: z
      .string()
      .nonempty("usernameRequired")
      .min(4, "usernameMin")
      .max(20, "usernameMax"),

    email: z
      .string()
      .nonempty("emailRequired")
      .email("emailInvalid")
      .refine((val) => {
        const domain = val.split("@")[1];
        return !!domain && allowedDomains.includes(domain);
      }, "emailDomainNotAllowed"),

    password: z
      .string()
      .nonempty("passwordRequired")
      .min(6, "passwordMin")
      .max(20, "passwordMax"),

    confirmPassword: z.string().nonempty("confirmPasswordRequired"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "confirmPasswordValid",
  });

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty("emailRequired")
    .email("emailInvalid")
    .refine((val) => {
      const domain = val.split("@")[1];
      return !!domain && allowedDomains.includes(domain);
    }, "emailDomainNotAllowed"),

  password: z
    .string()
    .nonempty("passwordRequired")
    .min(6, "passwordMin")
    .max(20, "passwordMax"),
});

export const forgotPassSchema = z.object({
  email: z
    .string()
    .nonempty("emailRequired")
    .email("emailInvalid")
    .refine((val) => {
      const domain = val.split("@")[1];
      return !!domain && allowedDomains.includes(domain);
    }, "emailDomainNotAllowed"),
});

export const recoverPassSchema = z
  .object({
    password: z
      .string()
      .nonempty("passwordRequired")
      .min(6, "passwordMin")
      .max(20, "passwordMax"),

    confirmPassword: z.string().nonempty("confirmPasswordRequired"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "confirmPasswordValid",
  });

export type RegistrationFormData = z.infer<typeof registrationSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type ForgotPassData = z.infer<typeof forgotPassSchema>;
export type RecoverPassData = z.infer<typeof recoverPassSchema>;
