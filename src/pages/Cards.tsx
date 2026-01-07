import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { UserCard } from "../components/organisms/UserCard";
import { VStack, Button } from "@chakra-ui/react";

export function Cards() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, loading } = useUser(id);

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <VStack gap={4}>
      <UserCard {...user} />

      <Button
        w="100%"
        width="30%"
        colorScheme="teal"
        onClick={() => navigate("/")}
      >
        戻る
      </Button>
    </VStack>
  );
}
