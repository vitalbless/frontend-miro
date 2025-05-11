import { rqClient } from "@/shared/api/instance";
import { CONFIG } from "@/shared/model/config";
import { ROUTES } from "@/shared/model/routes";
import { Button } from "@/shared/ui/kit/button";
import { Card, CardFooter, CardHeader } from "@/shared/ui/kit/card";
import { Input } from "@/shared/ui/kit/input";
import { useQueryClient } from "@tanstack/react-query";
import { href, Link } from "react-router-dom";

function BoardsListPage() {
  const queryClient = useQueryClient();
  const boardsQuery = rqClient.useQuery("get", "/boards");
  const createBoardMutation = rqClient.useMutation("post", "/boards", {
    onSettled: async () => {
      await queryClient.invalidateQueries(
        rqClient.queryOptions("get", "/boards")
      );
    },
  });
  const deleteBoardMutation = rqClient.useMutation(
    "delete",
    "/boards/{boardId}",
    {
      onSettled: async () => {
        await queryClient.invalidateQueries(
          rqClient.queryOptions("get", "/boards")
        );
      },
    }
  );

  return (
    <div className="container mx-auto p-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          createBoardMutation.mutate({
            body: { name: formData.get("name") as string },
          });
        }}
      >
        <Input name="name" />
        <Button type="submit" disabled={createBoardMutation.isPending}>
          Create board
        </Button>
      </form>
      <h1>Boards list {CONFIG.API_BASE_URL}</h1>
      <div className="grid grid-cols-3 gap-4">
        {boardsQuery.data?.map((board) => (
          <Card key={board.id}>
            <CardHeader>
              <Button asChild variant="link">
                <Link to={href(ROUTES.BOARD, { boardId: "1" })}>
                  {board.name}
                </Link>
              </Button>
            </CardHeader>
            <CardFooter>
              <Button
                variant="destructive"
                disabled={deleteBoardMutation.isPending}
                onClick={() => {
                  deleteBoardMutation.mutate({
                    params: { path: { boardId: board.id } },
                  });
                }}
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export const Component = BoardsListPage;
