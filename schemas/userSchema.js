import z from "zod";

const userSchema = z.object({
  username: z
    .string({
      required_error: "El nombre de usuario es obligatorio",
    })
    .min(3, "El nombre de usuario debe tener al menos 3 caracteres")
    .max(20, "El nombre de usuario no puede tener más de 20 caracteres")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "El nombre de usuario solo puede contener letras, números y guiones bajos"
    ),
  first_name: z.string({
    invalid_type_error: "first_name must be a string",
    required_error: "first_name is require",
  }),
  last_name: z.string({
    invalid_type_error: "last_name must be a string",
    required_error: "last_name is require",
  }),
  email: z.string().email({ message: "Email inválido" }),
  password: z
    .string({
      required_error: "La contraseña es obligatoria",
    })
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(20, "La contraseña no puede tener más de 20 caracteres")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/,
      "La contraseña debe incluir una minúscula, una mayúscula, un número y un carácter especial"
    ),
});

export function validateUser(input) {
  return userSchema.safeParse(input);
}
