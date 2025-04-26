import Footer from "@/components/containers/Footer";
import { ProductCard } from "@/components/containers/ProductCard";
import { useProductsByCategory } from "@/services/queries";
import { Product } from "@/types/type";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const GuitarPage = () => {
  const products = useProductsByCategory("Guitar");
  const [selectedBrand, setSelectedBrand] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");

  if (products.isLoading) {
    return <div>Loading...</div>;
  }
  if (products.isError) {
    return <div>Error: {products.error.message}</div>;
  }

  const brands = Array.from(
    new Set(products.data.map((product: Product) => product.brand))
  );

  // First filter by brand, then by search term
  const filteredProducts = products.data
    .filter((product: Product) =>
      selectedBrand === "All" ? true : product.brand === selectedBrand
    )
    .filter((product: Product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div>
      <h1 className="text-primary text-center">Guitars</h1>

      {/* Filters */}
      <div className="flex justify-start gap-4 my-8">
        {/* Custom Select for Brand Filter */}
        <Select onValueChange={(value) => setSelectedBrand(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a brand" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Brands</SelectLabel>
              <SelectItem value="All">All Brands</SelectItem>
              {brands.map((brand: any) => (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Search Input */}
        <Input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-84"
        />
      </div>

      {/* Products */}
      <div className="flex gap-14 flex-wrap mt-8 mb-18 justify-start">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product: Product) => (
            <ProductCard key={product._id} {...product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default GuitarPage;
