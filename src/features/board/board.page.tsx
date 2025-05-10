import { type PathParams, ROUTES } from "@/shared/model/routes";
import { useParams } from "react-router-dom";

function BoardPage() {
  const params = useParams<PathParams[typeof ROUTES.BOARD]>();
  return (
    <div>
      <h1>Board page {params.boardId}</h1>
    </div>
  );
}

export const Component = BoardPage;
