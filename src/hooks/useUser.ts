import { useEffect, useState } from "react";
import { fetchUser } from "../api/fetchUser";

type Skill = {
  id: number;
  name: string;
};

type User = {
  name: string;
  description: string;
  githubId?: string;
  qiitaId?: string;
  xId?: string;
  skills: Skill[];
};

export function useUser(id?: string) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetchUser(id).then((data) => {
      if (!data) return;

      setUser({
        name: data.name,
        description: data.description,
        githubId: data.github_id ? `${data.github_id}` : undefined,
        qiitaId: data.qiita_id ? `${data.qiita_id}` : undefined,
        xId: data.x_id ? `${data.x_id}` : undefined,
        skills: data.user_skill.map((r: any) => r.skills).filter(Boolean),
      });

      setLoading(false);
    });
  }, [id]);

  return { user, loading };
}
