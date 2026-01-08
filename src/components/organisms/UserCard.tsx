import {
  Box,
  VStack,
  HStack,
  Text,
  IconButton,
  Link,
  Icon,
} from "@chakra-ui/react";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { SiQiita } from "react-icons/si";

type Skill = {
  id: number;
  name: string;
};

type Props = {
  name: string;
  description: string;
  skills: Skill[];
  githubId?: string;
  qiitaId?: string;
  xId?: string;
};

export function UserCard({
  name,
  description,
  skills,
  githubId,
  qiitaId,
  xId,
}: Props) {
  return (
    <Box maxW="360px" mx="auto" mt={4} p={3}>
      <VStack align="stretch" gap={2}>
        {/* 名前 */}
        <Text as="div" lineHeight="1.2">
          名前: {name}
        </Text>

        {/* 自己紹介 */}
        <HStack align="start">
          <Text as="div">自己紹介:</Text>
          <Box as="div" dangerouslySetInnerHTML={{ __html: description }} />
        </HStack>

        {/* 技術 */}
        <HStack wrap="wrap">
          <Text>好きな技術：</Text>
          {skills.map((s) => (
            <Text key={s.id}>{s.name}</Text>
          ))}
        </HStack>

        {/* SNS アイコン（Chakra v3 正解パターン） */}
        <HStack gap={2}>
          {githubId && (
            <Link
              href={`https://github.com/${githubId}`}
              target="_blank"
              rel="noreferrer"
            >
              <IconButton aria-label="github" variant="ghost">
                <Icon as={FaGithub} />
              </IconButton>
            </Link>
          )}

          {qiitaId && (
            <Link
              href={`https://qiita.com/${qiitaId}`}
              target="_blank"
              rel="noreferrer"
            >
              <IconButton
                aria-label="qiita"
                variant="ghost"
                border="1px solid"
                borderColor="whiteAlpha.600"
                borderRadius="full"
                _hover={{
                  borderColor: "whiteAlpha.900",
                }}
              >
                <Icon as={SiQiita} boxSize={6} color="green.400" />
              </IconButton>
            </Link>
          )}

          {xId && (
            <Link
              href={`https://x.com/${xId}`}
              target="_blank"
              rel="noreferrer"
            >
              <IconButton aria-label="twitter" variant="ghost">
                <Icon as={FaTwitter} />
              </IconButton>
            </Link>
          )}
        </HStack>
      </VStack>
    </Box>
  );
}
