import { SupabaseClient } from "@supabase/supabase-js";

export const getProductList = async (supabaseClient: SupabaseClient) => {
  const { data, error } = await supabaseClient
    .from("product_table")
    .select("*");
  if (error) throw error;

  return data;
};
