import {z} from "zod"

//create user schema with the help of zod for validate user
export const userSchema=z.object({
    name:z.string().min(2,"name must be at least 2 characters"),
    email:z.string()
    .email("Invalid email format")
    .regex(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, "Only Gmail addresses are allowed"),
    password:z.string().min(8,"password must be at least 8 characters long")
    .max(32,"password must not exceed 32 characters")
    .regex(/[A-Z]/,"Password must contain at least one uppercase letter")
    .regex(/[a-z]/,"Password must contain at least one lowercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character (@$!%*?&)")
});