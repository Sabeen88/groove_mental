import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useProducts } from "@/services/queries";
import { Trash } from "lucide-react";

const DisplayProducts = () => {
  const products = useProducts();
  console.log(products);

  if (products.isLoading) {
    return <div>Loading...</div>;
  }
  if (products.isError) {
    return <div>Error: {products.error.message}</div>;
  }
  if (products.isSuccess) {
    console.log(products.data);
  }
  // const data = products.data;

  return (
    <div className="mb-12">
      <h1 className="mb-8">Products</h1>
      <div className="flex flex-col gap-6">
        {products.data.map((product: any) => (
          <Card key={product._id}>
            <div className="flex justify-between w-full">
              <div className="flex gap-4 items-center px-8">
                <img
                  src={
                    product.image
                      ? `http://localhost:5000${product.image}`
                      : "/default-guitar.jpg"
                  }
                  alt={product.name}
                  className="w-14 h-14 object-cover"
                />
                <h2>{product.name}</h2>
              </div>
              <div className="pr-8 flex gap-4 items-center">
                <div>Rs.{product.price}</div>
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

export default DisplayProducts;
