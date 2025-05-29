import z from "zod";

const messageSchema = z.object({
  title: z
    .string({
      required_error: "El título es obligatorio",
    })
    .min(3, "El título debe tener al menos 3 caracteres")
    .max(100, "El título no puede tener más de 100 caracteres"),

  texto: z
    .string({
      required_error: "El texto es obligatorio",
    })
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(1000, "El mensaje no puede tener más de 1000 caracteres"),

  user_id: z.string({
    required_error: "user_id obligatorio",
  }),
  username: z.string({
    required_error: "username obligatorio",
  }),
});

export function validateMessage(input) {
  return messageSchema.safeParse(input);
}
