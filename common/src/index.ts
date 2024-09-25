import z from 'zod';

export const signUpCheck = z.object({
    Username: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
});

export const signInCheck = z.object({
    email: z.string().email(),
    password: z.string().min(6) 
});

export const createBlogInput = z.object({
    title: z.string(),
    content: z.string()
});

export const updateBlogInput = z.object({
    title: z.string(),
    content: z.string(),
    id: z.string()
});

export type SignUpInput = z.infer<typeof signUpCheck>
export type SignInInput = z.infer<typeof signInCheck>
export type CreateBlogInput = z.infer<typeof createBlogInput>
export type UpdateBlogInput = z.infer<typeof updateBlogInput>
