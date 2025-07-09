import { LoginFormData, loginFormSchema } from "zodValidation";
import { createClient } from "../../utils/supabase/client";
import { z } from "zod";

export async function loginUseCase(data: LoginFormData) {
    try {
        const supabase = createClient();
        loginFormSchema.parse(data)
        const { data:res, error } = await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password,
        });
        console.log({res,error})
        if (error) throw error;
            return { data: res, error: null };
        } catch (error) {
            return { data: null, error: error instanceof z.ZodError ? error.errors : error };
        }
}