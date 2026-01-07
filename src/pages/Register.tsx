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
    // users テーブルに登録
    const { error: userError } = await supabase.from("users").insert({
      user_id: data.userId,
      name: data.name,
      description: data.description,
      github_id: data.githubId || null,
      qiita_id: data.qiitaId || null,
      x_id: data.xId || null,
    });

    if (userError) {
      console.error("users 登録エラー", userError);
      return;
    }

    // user_skill テーブルに登録
    const { error: skillError } = await supabase.from("user_skill").insert({
      user_id: data.userId,
      skill_id: Number(data.skillId),
    });

    if (skillError) {
      console.error("user_skill 登録エラー", skillError);
      return;
    }

    // 登録成功 → トップページへ
    navigate("/");
  };

  return (
    <Box bg="gray.100" minH="100vh" px={10} py={10}>
      <Box maxW="360px" mx="auto" p={5} bg="white" borderRadius="md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack align="stretch" gap={4}>
            <Heading as="h1" size="md" textAlign="center" color="gray.800">
              新規名刺登録
            </Heading>

            {/* ID（必須・英字のみ） */}
            <VStack align="stretch" gap={1}>
              <Text fontSize="sm" color="gray.700">
                好きな英単語*
              </Text>
              <Input
                placeholder="coffee"
                color="gray.800"
                {...register("userId", {
                  required: "IDは必須です",
                  pattern: {
                    value: /^[a-zA-Z]+$/,
                    message: "英字のみ入力できます",
                  },
                })}
              />
              {errors.userId && (
                <Text fontSize="xs" color="red.500">
                  {errors.userId.message}
                </Text>
              )}
            </VStack>

            {/* 名前（必須） */}
            <VStack align="stretch" gap={1}>
              <Text fontSize="sm" color="gray.700">
                お名前*
              </Text>
              <Input
                color="gray.800"
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

            {/* 自己紹介（必須） */}
            <VStack align="stretch" gap={1}>
              <Text fontSize="sm" color="gray.700">
                自己紹介*
              </Text>
              <Textarea
                rows={5}
                placeholder="<h1>HTMLタグも使えます</h1>"
                color="gray.800"
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

            {/* 技術（必須） */}
            <VStack align="stretch" gap={1}>
              <Text fontSize="sm" color="gray.700">
                好きな技術*
              </Text>
              <select
                {...register("skillId", {
                  required: "技術を選択してください",
                })}
                style={{
                  width: "100%",
                  height: "40px",
                  border: "1px solid #CBD5E0",
                  borderRadius: "6px",
                  padding: "0 12px",
                  backgroundColor: "white",
                  color: "#1A202C",
                }}
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

            {/* 任意項目 */}
            <VStack align="stretch" gap={1}>
              <Text fontSize="sm" color="gray.700">
                GitHub ID
              </Text>
              <Input color="gray.800" {...register("githubId")} />
            </VStack>

            <VStack align="stretch" gap={1}>
              <Text fontSize="sm" color="gray.700">
                Qiita ID
              </Text>
              <Input color="gray.800" {...register("qiitaId")} />
            </VStack>

            <VStack align="stretch" gap={1}>
              <Text fontSize="sm" color="gray.700">
                X ID
              </Text>
              <Input color="gray.800" {...register("xId")} />
            </VStack>

            <Button
              type="submit"
              mt={2}
              width="30%"
              alignSelf="center"
              bg="white"
              color="gray.800"
              border="1px solid"
              borderColor="gray.300"
            >
              登録
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
}
