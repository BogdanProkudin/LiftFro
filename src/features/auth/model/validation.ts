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
    name: z
      .string()
      .nonempty("nameRequired")
      .min(6, "nameMin")
      .max(20, "nameMax"),

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

    confirmPassword: z.string().nonempty("Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match",
  });

export type RegistrationFormData = z.infer<typeof registrationSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type ForgotPassData = z.infer<typeof forgotPassSchema>;
export type RecoverPassData = z.infer<typeof recoverPassSchema>;
