import {
  Box,
  VStack,
  Heading,
  Input,
  Textarea,
  Button,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../utils/supabase";

type FormValues = {
  userId: string;
  name: string;
  description: string;
  skillId: string;
  githubId?: string;
  qiitaId?: string;
  xId?: string;
};

export function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    const { error: userError } = await supabase.from("users").insert({
      user_id: data.userId,
      name: data.name,
      description: data.description,
      github_id: data.githubId || null,
      qiita_id: data.qiitaId || null,
      x_id: data.xId || null,
    });

    if (userError) return;

    const { error: skillError } = await supabase.from("user_skill").insert({
      user_id: data.userId,
      skill_id: Number(data.skillId),
    });

    if (skillError) return;

    navigate("/");
  };

  return (
    <Box bg="gray.100" minH="100vh" px={10} py={10}>
      <Box
        maxW="360px"
        mx="auto"
        p={5}
        bg="white"
        borderRadius="md"
        color="gray.800"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack align="stretch" gap={4}>
            <Heading size="md" textAlign="center">
              新規名刺登録
            </Heading>

            {/* ID */}
            <VStack align="stretch">
              <Text fontSize="sm">好きな英単語*</Text>
              <Input
                color="gray.800"
                aria-label="user-id"
                placeholder="coffee"
                {...register("userId", {
                  required: "IDは必須です",
                })}
              />
              {errors.userId && (
                <Text fontSize="xs" color="red.500">
                  {errors.userId.message}
                </Text>
              )}
            </VStack>

            {/* 名前 */}
            <VStack align="stretch">
              <Text fontSize="sm">お名前*</Text>
              <Input
                color="gray.800"
                aria-label="name"
                {...register("name", {
                  required: "お名前は必須です",
                })}
              />
              {errors.name && (
                <Text fontSize="xs" color="red.500">
                  {errors.name.message}
                </Text>
              )}
            </VStack>

            {/* 自己紹介 */}
            <VStack align="stretch">
              <Text fontSize="sm">自己紹介*</Text>
              <Textarea
                aria-label="description"
                rows={5}
                placeholder="<h1>HTMLタグも使えます</h1>"
                {...register("description", {
                  required: "自己紹介は必須です",
                })}
              />
              {errors.description && (
                <Text fontSize="xs" color="red.500">
                  {errors.description.message}
                </Text>
              )}
            </VStack>

            {/* 技術 */}
            <VStack align="stretch">
              <Text fontSize="sm">好きな技術*</Text>
              <select
                aria-label="skill"
                style={{ color: "#ffffff" }}
                {...register("skillId", {
                  required: "技術を選択してください",
                })}
              >
                <option value="">Select option</option>
                <option value="1">React</option>
                <option value="2">TypeScript</option>
                <option value="3">GitHub</option>
              </select>
              {errors.skillId && (
                <Text fontSize="xs" color="red.500">
                  {errors.skillId.message}
                </Text>
              )}
            </VStack>

            {/* Optional */}
            <Input placeholder="GitHub ID" {...register("githubId")} />
            <Input placeholder="Qiita ID" {...register("qiitaId")} />
            <Input placeholder="X ID" {...register("xId")} />

            <Button
              type="submit"
              width="30%"
              alignSelf="center"
              variant="outline"
              borderColor="gray.400"
              color="gray.800"
            >
              登録
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
}
