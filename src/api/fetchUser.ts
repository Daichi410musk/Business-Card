import { supabase } from "../../utils/supabase";

export const fetchUser = async (id: string) => {
  const { data, error } = await supabase
    .from("users")
    .select(
      `
      name,
      description,
      github_id,
      qiita_id,
      x_id,
      user_skill (
        skills (
          id,
          name
        )
      )
    `
    )
    .eq("user_id", id)
    .maybeSingle();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
};
