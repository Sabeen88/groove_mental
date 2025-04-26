import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "@/types/type";
import { useAddToCart } from "@/services/mutation";
import { toast } from "sonner"; // Optional: if you are using react-hot-toast

export function ProductCard(product: Product) {
  const addToCartMutation = useAddToCart();

  const handleAddToCart = () => {
    addToCartMutation.mutate(
      { productId: product._id, quantity: 1 }, // Always adding 1 for now
      {
        onSuccess: () => {
          toast.success(`${product.name} added to cart!`);
        },
        onError: (error: any) => {
          toast.error(error.response?.data?.message || "Failed to add to cart");
        },
      }
    );
  };

  return (
    <Card className="w-[350px] pt-0 overflow-hidden">
      <div className="bg-slate-200 w-full h-[350px]">
        <div className="w-full h-[350px] bg-slate-200 flex items-center justify-center overflow-hidden">
          <img
            src={
              product.image
                ? `http://localhost:5000${product.image}`
                : "/default-guitar.jpg"
            }
            alt={product.name}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>Rs. {product.price}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Button
          onClick={handleAddToCart}
          disabled={addToCartMutation.isPending}
        >
          {addToCartMutation.isPending ? "Adding..." : "Add to cart"}
        </Button>
        <CardDescription className="bg-secondary p-2 rounded-md">
          {product.brand}
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
