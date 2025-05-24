// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// export default function AddProducts() {
//   return (
//     <Card className="w-[350px]">
//       <CardHeader>
//         <CardTitle>Add Products</CardTitle>
//         <CardDescription>Deploy your new project in one-click.</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form>
//           <div className="grid w-full items-center gap-4">
//             <div className="flex flex-col space-y-1.5">
//               <Label htmlFor="name">Name</Label>
//               <Input id="name" placeholder="Name of your project" />
//             </div>
//             <div className="flex flex-col space-y-1.5">
//               <Label htmlFor="framework">Framework</Label>
//               <Select>
//                 <SelectTrigger id="framework">
//                   <SelectValue placeholder="Select" />
//                 </SelectTrigger>
//                 <SelectContent position="popper">
//                   <SelectItem value="next">Next.js</SelectItem>
//                   <SelectItem value="sveltekit">SvelteKit</SelectItem>
//                   <SelectItem value="astro">Astro</SelectItem>
//                   <SelectItem value="nuxt">Nuxt.js</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         </form>
//       </CardContent>
//       <CardFooter className="flex justify-between">
//         <Button variant="outline">Cancel</Button>
//         <Button>Deploy</Button>
//       </CardFooter>
//     </Card>
//   );
// }

"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useCreateProduct } from "@/services/mutation"; // your hook
import { toast } from "sonner"; // optional: for nice notifications

export default function AddProducts() {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const { mutateAsync, isPending } = useCreateProduct();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !brand || !price || !category || !image) {
      toast.error("Please fill all fields and upload an image");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("brand", brand);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("image", image);

    try {
      await mutateAsync(formData);
      toast.success("Product created successfully!");

      // Clear form
      setName("");
      setBrand("");
      setPrice("");
      setCategory("");
      setImage(null);
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error creating product");
    }
  };

  return (
    <Card className="w-[400px] mx-auto mt-10">
      <CardHeader>
        <CardTitle>Add Product</CardTitle>
        <CardDescription>Fill the fields to add a new product</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Product name"
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="brand">Brand</Label>
              <Input
                id="brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Brand name"
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Product price"
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="Guitar">Guitar</SelectItem>
                  <SelectItem value="Bass">Bass</SelectItem>
                  <SelectItem value="Accessories">Accessories</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="image">Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setImage(e.target.files[0]);
                  }
                }}
              />
            </div>
          </div>

          <CardFooter className="flex justify-between mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => window.location.reload()}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Adding..." : "Add Product"}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
