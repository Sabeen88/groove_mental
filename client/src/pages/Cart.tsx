// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { useCart } from "@/services/queries";
// import { Trash } from "lucide-react";

// const Cart = () => {
//   const cart = useCart();
//   if (cart.isLoading) {
//     return <div>Loading...</div>;
//   }
//   if (cart.isError) {
//     return <div>Error: {cart.error.message}</div>;
//   }
//   if (cart.isSuccess) {
//     console.log(cart.data.data.items);
//   }

//   return (
//     <div>
//       <h1 className="text-primary text-center">My Cart</h1>

//       <div className="flex flex-col gap-8 mt-8">
//         {cart.isSuccess &&
//           cart.data.data.items.map((item: any) => (
//             <Card key={item.id}>
//               <div className="flex justify-between w-full">
//                 <div className="flex gap-4 items-center px-8">
//                   <img
//                     src={
//                       item.product.image
//                         ? `http://localhost:5000${item.product.image}`
//                         : "/default-guitar.jpg"
//                     }
//                     alt={item.name}
//                     className="w-14 h-14 object-cover"
//                   />
//                   <h2>{item.product.name}</h2>
//                 </div>
//                 <div className="pr-8 flex gap-4 items-center">
//                   <div>Rs.{item.product.price}</div>
//                   <Button className="bg-destructive">
//                     <Trash />
//                   </Button>
//                 </div>
//               </div>
//             </Card>
//           ))}
//       </div>

//       {cart.isSuccess && (
//         <div className="mt-8 text-right pr-8 text-lg font-bold">
//           Total: Rs.{cart.data.data.totalPrice}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from "@/services/queries";
import { Trash } from "lucide-react";

const Cart = () => {
  const cart = useCart();

  if (cart.isLoading) {
    return <div>Loading...</div>;
  }

  if (cart.isError) {
    return <div>Error: {cart.error.message}</div>;
  }

  const items = cart.data?.data?.cart?.items || [];
  const totalPrice = cart.data?.data?.totalPrice || 0;

  return (
    <div>
      <h1 className="text-primary text-center">My Cart</h1>

      <div className="flex flex-col gap-8 mt-8">
        {items.length > 0 ? (
          items.map((item: any) => (
            <Card key={item.product._id}>
              <div className="flex justify-between w-full">
                <div className="flex gap-4 items-center px-8">
                  <img
                    src={
                      item.product.image
                        ? `http://localhost:5000${item.product.image}`
                        : "/default-guitar.jpg"
                    }
                    alt={item.product.name}
                    className="w-14 h-14 object-cover"
                  />
                  <h2>{item.product.name}</h2>
                </div>
                <div className="pr-8 flex gap-4 items-center">
                  <div>Rs.{item.product.price}</div>
                  <Button className="bg-destructive">
                    <Trash />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center text-gray-500">Your cart is empty.</div>
        )}
      </div>

      {/* Total Price */}
      <div className="mt-8 text-right pr-8 text-lg font-bold">
        Total: Rs.{totalPrice}
      </div>

      <Button className="mt-8">Make Payment</Button>
    </div>
  );
};

export default Cart;
