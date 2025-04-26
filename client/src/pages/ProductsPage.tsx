import Footer from "@/components/containers/Footer";
import { ProductCard } from "@/components/containers/ProductCard";
import { useProducts } from "@/services/queries";
import { Product } from "@/types/type";

const ProductsPage = () => {
  const products = useProducts();
  if (products.isLoading) {
    return <div>Loading...</div>;
  }
  if (products.isError) {
    return <div>Error: {products.error.message}</div>;
  }
  if (products.isSuccess) {
    console.log(products.data);
  }

  return (
    <div>
      <h1 className="text-primary text-center">Our Products</h1>
      <div className="flex gap-14 flex-wrap mt-8 mb-18">
        {products.data.map((product: Product) => (
          <ProductCard key={product._id} {...product} />
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default ProductsPage;
