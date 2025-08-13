// import { Link, useParams } from "react-router"
// import img from "../../public/payment.jpg";
// import { useLocation } from "react-router";
// import { useEffect } from "react";
// import axios from "axios";

// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

// export default function PaymentSuccessPage() {
//   let query = useQuery();
//   let status = query.get("status");
//   const bookingId = query.get("purchase_order_id");

//   console.log(status);
//   console.log(bookingId);

//   useEffect(() => {
//     if (status === "Completed") {
//       // Call your API here
//     //   axios
//     //     .post("/payment", { status, bookingId })
//     //     .then((response) => {
//     //       // Handle the response here
//     //       console.log(response);
//     //     })
//     //     .catch((error) => {
//     //       // Handle the error here
//     //       console.log(error);
//     //     });
//     console.log("done")
//     }
//   }, [status]);

//   return (
//     <div className="w-full flex justify-center">
//       <img src={img} alt="Khalti" />
//       <div className="mt-24">
//         <div className="text-primary font-bold text-[4rem]">
//           {status === "User canceled"
//             ? "Payment canceled !!"
//             : "Payment Successfull !!!"}
//         </div>
//         <Link to="/" className="text-lg underline font-semibold">
//           Browse Products
//         </Link>
//       </div>
//     </div>
//   );
// }

import { Link } from "react-router";
import img from "../../public/payment.jpg";
import { useLocation } from "react-router";
import { useEffect } from "react";
import axios from "axios";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function PaymentSuccessPage() {
  const query = useQuery();
  const status = query.get("status"); // "Completed" or "User canceled"

  useEffect(() => {
    const token = localStorage.getItem("token");
    // Only call API if payment is completed or canceled
    if (status === "Completed") {
        axios.post(
            "http://localhost:5000/api/payment",
            { status: "paid" }, // mark cart as paid
            {
              withCredentials: true, // allow cookies if needed
              headers: {
                Authorization: `Bearer ${token}`, // pass the token here
              },
            }
          )
        .then((response) => {
          console.log("Payment status updated:", response.data);
        })
        .catch((error) => {
          console.error("Error updating payment status:", error);
        });
    } else if (status === "User canceled") {
      axios
        .post(
          "http://localhost:5000/api/cart/payment",
          { status: "failed" }, // mark cart as failed
          { withCredentials: true }
        )
        .catch((error) => console.error("Error updating payment status:", error));
    }
  }, [status]);

  return (
    <div className="w-full flex justify-center">
      <img src={img} alt="Khalti" />
      <div className="mt-24">
        <div className="text-primary font-bold text-[4rem]">
          {status === "User canceled"
            ? "Payment canceled !!"
            : "Payment Successful !!!"}
        </div>
        <Link to="/" className="text-lg underline font-semibold">
          Browse Products
        </Link>
        </div>
    </div>
    );
}
