// batch/index.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  // 今日 00:00 (UTC)
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  // 昨日 00:00 (UTC)
  const yesterday = new Date(today);
  yesterday.setUTCDate(today.getUTCDate() - 1);

  console.log("delete range");
  console.log("from:", yesterday.toISOString());
  console.log("to  :", today.toISOString());

  // ① user_skill を先に削除
  const { error: userSkillError } = await supabase
    .from("user_skill")
    .delete()
    .gte("created_at", yesterday.toISOString())
    .lt("created_at", today.toISOString());

  if (userSkillError) {
    console.error("user_skill delete error", userSkillError);
    process.exit(1);
  }

  // ② users を削除
  const { error: userError } = await supabase
    .from("users")
    .delete()
    .gte("created_at", yesterday.toISOString())
    .lt("created_at", today.toISOString());

  if (userError) {
    console.error("users delete error", userError);
    process.exit(1);
  }

  console.log("delete success");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
