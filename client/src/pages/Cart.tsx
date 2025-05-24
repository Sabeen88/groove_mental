// // export default Cart;
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { useCart } from "@/services/queries";
// import { useAuthStore } from "@/store/useAuthStore";
// import axios from "axios";
// import { Trash } from "lucide-react";

// const Cart = () => {
//   const cart = useCart();
//   const user = useAuthStore((state) => state.user);
//   const token = localStorage.getItem("token");

//   if (cart.isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (cart.isError) {
//     return <div>Error: {cart.error.message}</div>;
//   }

//   const items = cart.data?.data?.cart?.items || [];
//   const totalPrice = cart.data?.data?.totalPrice || 0;

//   const initiatePayment = async () => {
//     try {
//       const response = await axios.post("http://localhost:5000/api/khalti", {
//         totalPrice,
//         items,
//         userId: user?._id,
//         email: user?.email,
//         name: user?.name,
//       });
//       console.log(response.data);
//       console.log(response.data.data.payment_url);
//       window.location.href = response.data.data.payment_url;

//       console.log(totalPrice, items, user?._id, user?.email, user?.name);
//     } catch (error) {
//       console.error("Error initiating payment", error);
//     }
//   };

//   const deleteItem = async (itemId: string) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/cart/${itemId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`, // Replace `user.token` with your actual auth token
//         },
//       });

//       cart.refetch();
//     } catch (error) {
//       console.error("Error deleting item from cart", error);
//     }
//   };

//   return (
//     <div>
//       <h1 className="text-primary text-center">My Cart</h1>

//       <div className="flex flex-col gap-8 mt-8">
//         {items.length > 0 ? (
//           items.map((item: any) => (
//             <Card key={item.product._id}>
//               <div className="flex justify-between w-full">
//                 <div className="flex gap-4 items-center px-8">
//                   <img
//                     src={
//                       item.product.image
//                         ? `http://localhost:5000${item.product.image}`
//                         : "/default-guitar.jpg"
//                     }
//                     alt={item.product.name}
//                     className="w-14 h-14 object-cover"
//                   />
//                   <h2>{item.product.name}</h2>
//                 </div>
//                 <div className="pr-8 flex gap-4 items-center">
//                   <div>Rs.{item.product.price}</div>
//                   <Button
//                     onClick={() => deleteItem(item.product._id)}
//                     className="bg-destructive"
//                   >
//                     <Trash />
//                   </Button>
//                 </div>
//               </div>
//             </Card>
//           ))
//         ) : (
//           <div className="text-center text-gray-500">Your cart is empty.</div>
//         )}
//       </div>

//       {/* Total Price */}
//       <div className="mt-8 text-right pr-8 text-lg font-bold">
//         Total: Rs.{totalPrice}
//       </div>

//       <Button onClick={initiatePayment} className="mt-8">
//         Make Payment
//       </Button>
//     </div>
//   );
// };

// export default Cart;
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from "@/services/queries";
import { useAuthStore } from "@/store/useAuthStore";
import axios from "axios";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import DebugAuth from "./Debug";

const Cart = () => {
  const cart = useCart();
  const user = useAuthStore((state) => state.user);

  // Get token from user object or fallback to localStorage
  const token = user?.token || localStorage.getItem("token");

  if (cart.isLoading) {
    return <div>Loading...</div>;
  }

  if (cart.isError) {
    return <div>Error: {cart.error.message}</div>;
  }

  const items = cart.data?.data?.cart?.items || [];
  const totalPrice = cart.data?.data?.totalPrice || 0;

  const initiatePayment = async () => {
    if (!user) {
      toast.error("Please login to make a payment");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/khalti", {
        totalPrice,
        items,
        userId: user._id,
        email: user.email,
        name: user.name,
      });

      console.log(response.data);
      console.log(response.data.data.payment_url);

      if (response.data.data.payment_url) {
        window.location.href = response.data.data.payment_url;
      } else {
        toast.error("Failed to get payment URL");
      }
    } catch (error) {
      console.error("Error initiating payment", error);
      toast.error("Failed to initiate payment");
    }
  };

  const deleteItem = async (itemId: string) => {
    if (!token) {
      toast.error("Authentication required");
      return;
    }

    console.log("Token being sent:", token); // Debug log
    console.log("Deleting item with ID:", itemId); // Debug log

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/cart/${itemId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Delete response:", response.data); // Debug log
      cart.refetch();
      toast.success("Item removed from cart");
    } catch (error: any) {
      console.error("Error deleting item from cart:", error);
      console.error("Error response:", error.response?.data); // Debug log

      const errorMessage =
        error.response?.data?.message || "Failed to remove item from cart";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-primary mb-8">
        My Cart
      </h1>

      <DebugAuth />

      <div className="flex flex-col gap-4">
        {items.length > 0 ? (
          items.map((item: any) => (
            <Card key={item.product._id} className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                  <img
                    src={
                      item.product.image
                        ? `http://localhost:5000${item.product.image}`
                        : "/default-guitar.jpg"
                    }
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h2 className="font-semibold">{item.product.name}</h2>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {item.quantity || 1}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="font-semibold">Rs.{item.product.price}</div>
                  <Button
                    onClick={() => deleteItem(item.product._id)}
                    variant="destructive"
                    size="sm"
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">
            Your cart is empty.
          </div>
        )}
      </div>

      {items.length > 0 && (
        <>
          {/* Total Price */}
          <div className="mt-8 text-right text-xl font-bold border-t pt-4">
            Total: Rs.{totalPrice}
          </div>

          <div className="flex justify-end mt-6">
            <Button onClick={initiatePayment} size="lg" className="px-8">
              Make Payment
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
