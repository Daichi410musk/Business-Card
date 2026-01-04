import { useParams } from "react-router-dom";

export function Cards() {
  const { id } = useParams<{ id: string }>();
  return <div>id: {id}</div>;
}
