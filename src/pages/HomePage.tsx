import { Box, VStack, Heading, Input, Button, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function HomePage() {
  const [id, setId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleClick = () => {
    if (!id.trim()) {
      setError("IDを入力してください");
      return;
    }
    setError("");
    navigate(`/cards/${id}`);
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack gap={4} w="80%">
        <Heading size="md">デジタル名刺</Heading>

        <Input
          placeholder="ユーザーIDを入力"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        {error && <Text color="red.500">{error}</Text>}

        <Button colorScheme="teal" w="100%" onClick={handleClick}>
          名刺を見る
        </Button>
      </VStack>
    </Box>
  );
}
