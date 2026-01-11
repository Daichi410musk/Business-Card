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

  const { count: userSkillCount, error: userSkillCountError } = await supabase
    .from("user_skill")
    .select("id", { count: "exact", head: true })
    .gte("created_at", yesterday.toISOString())
    .lt("created_at", today.toISOString());

  if (userSkillCountError) {
    console.error("user_skill count error", userSkillCountError);
    process.exit(1);
  }

  const { count: userCount, error: userCountError } = await supabase
    .from("users")
    .select("id", { count: "exact", head: true })
    .gte("created_at", yesterday.toISOString())
    .lt("created_at", today.toISOString());

  if (userCountError) {
    console.error("users count error", userCountError);
    process.exit(1);
  }

  if ((userSkillCount ?? 0) === 0 && (userCount ?? 0) === 0) {
    console.log("no data to delete");
    return;
  }

  // ① user_skill を先に削除
  if ((userSkillCount ?? 0) > 0) {
    const { error: userSkillError } = await supabase
      .from("user_skill")
      .delete()
      .gte("created_at", yesterday.toISOString())
      .lt("created_at", today.toISOString());

    if (userSkillError) {
      console.error("user_skill delete error", userSkillError);
      process.exit(1);
    }
  }

  // ② users を削除
  if ((userCount ?? 0) > 0) {
    const { error: userError } = await supabase
      .from("users")
      .delete()
      .gte("created_at", yesterday.toISOString())
      .lt("created_at", today.toISOString());

    if (userError) {
      console.error("users delete error", userError);
      process.exit(1);
    }
  }

  console.log("delete success");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
