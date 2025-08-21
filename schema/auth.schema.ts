import z from "zod";

export const EmailSchema = z.string().email();

export const SixCodeSchema = z
  .string()
  .min(1)
  .refine((value) => /^\d{6}$/.test(value), {
    params: {
      i18n: {
        key: "errors.code",
      },
    },
  });

// #region Password schema

export const PasswordSchema = z
  .string()
  .min(8)
  .refine((value) => /^(?=.*[A-Z])(?=.*\d).*$/.test(value), {
    params: {
      i18n: {
        key: "errors.password",
      },
    },
  });

export const ConfirmPasswordSchema = z.string().min(1);

export const PasswordWithConfirmationSchema = z
  .object({
    password: PasswordSchema,
    confirmPassword: ConfirmPasswordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    params: {
      i18n: {
        key: "errors.confirm_password",
      },
    },
    path: ["confirmPassword"],
  });

export const withPasswordConfirmation = <T extends z.ZodRawShape>(
  schema: z.ZodObject<T>,
) => {
  return schema
    .merge(
      z.object({
        password: PasswordSchema,
        confirmPassword: ConfirmPasswordSchema,
      }),
    )
    .refine((data) => data.password === data.confirmPassword, {
      params: {
        i18n: {
          key: "errors.confirm_password",
        },
      },
      path: ["confirmPassword"],
    });
};

// #endregion Password schema
