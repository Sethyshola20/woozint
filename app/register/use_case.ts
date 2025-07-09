import { z } from "zod";
import { RegisterFormData, registerFormSchema } from "zodValidation";
import { createClient } from "../../utils/supabase/client";

export async function registerUseCase(data: RegisterFormData) {
  try {
    const supabase = createClient()
    registerFormSchema.parse(data);
    const { data: res, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    }); 
    if (error) throw error;
    return { data: res, error: null };
  } catch (error) {
    return { data: null, error: error instanceof z.ZodError ? error.errors : error };
  }
}