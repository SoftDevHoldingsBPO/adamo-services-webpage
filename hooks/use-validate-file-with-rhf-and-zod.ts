import { AnyZodObject, ZodObject, z } from "zod";

import { FieldPath, FieldValues, Path, UseFormReturn } from "react-hook-form";

/**
 * Type for the schema object, ensuring it's a ZodObject or AnyZodObject.
 * This type is used internally to infer the form values type.
 */
type ZodSchemaType<TFieldValues extends FieldValues> = ZodObject<
  any,
  any,
  any,
  TFieldValues,
  TFieldValues
>;

/**
 * Arguments for the useValidateFileWithRHFAndZod hook.
 *
 * @template TFieldValues - The type of the form's field values, inferred from the schema.
 */
export type UseValidateFileWithRHFAndZodArgs<TFieldValues extends FieldValues> =
  Readonly<{
    /**
     * The Zod schema object that includes the validation for the file field.
     * The file field should be validated as a `File | null`.
     */
    schema: ZodSchemaType<TFieldValues>;
    /**
     * The form object returned by useForm.
     */
    form: UseFormReturn<TFieldValues>;
    /**
     * The name of the form field being validated (e.g., "profilePhoto").
     * The field type in TFieldValues must be compatible with `File | null`.
     */
    field: Path<TFieldValues>;
  }>;

/**
 * A custom hook to integrate Zod's schema validation for a single file input
 * with React Hook Form's setValue and setError methods.
 *
 * @param {UseValidateFileWithRHFAndZodArgs<TFieldValues>} args - The arguments for the hook.
 * @returns An object containing a `validate` function.
 */
export function useValidateFileWithRHFAndZod<
  TFieldValues extends FieldValues = FieldValues,
>({ schema, form, field }: UseValidateFileWithRHFAndZodArgs<TFieldValues>) {
  // Infer the shape of the field we are validating from the schema
  // and assert it must validate a File | null
  type FileFieldShape = z.ZodType<File | null>;

  const fileSchema = schema.shape[field] as FileFieldShape;

  return {
    /**
     * Function to validate the provided file against the schema for the specified field.
     * If validation succeeds, it calls `form.setValue`.
     * If validation fails, it calls `form.setError`.
     *
     * @param {File | null} file - The file to validate.
     */
    validate: (file: File | null) => {
      // Use the specific field's schema for validation
      const result = fileSchema.safeParse(file);

      if (result.success) {
        // Set the value and trigger form validation
        // We cast the value and field path to handle the complex typing of FieldValues
        form.setValue(field as Path<TFieldValues>, file as any, {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
        });
      } else {
        // Set the error on the form field
        form.setError(field as FieldPath<TFieldValues>, {
          type: "manual",
          message: result.error.errors[0]?.message,
        });
      }
    },
  };
}
