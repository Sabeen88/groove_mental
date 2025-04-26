import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAllUsers } from "@/services/queries";
import { Trash, User } from "lucide-react";

const DisplayUsers = () => {
  const users = useAllUsers();
  console.log(users);

  if (users.isLoading) {
    return <div>Loading...</div>;
  }
  if (users.isError) {
    return <div>Error: {users.error.message}</div>;
  }
  if (users.isSuccess) {
    console.log(users.data.data);
  }

  return (
    <div>
      <h1 className="mb-8">Products</h1>
      <div className="flex flex-col gap-6">
        {users?.data?.data.map((user: any) => (
          <Card key={user._id}>
            <div className="flex justify-between w-full">
              <div className="flex gap-4 items-center px-8">
                <User />x<h2>{user.name}</h2>
              </div>
              <div className="pr-8 flex gap-4 items-center">
                <div>{user.email}</div>
                <Button className="bg-destructive">
                  <Trash />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DisplayUsers;
