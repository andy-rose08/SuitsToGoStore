import getCategory from "@/actions/get-category";
import getColors from "@/actions/get-colors";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import Billboard from "@/components/billboard";
import Container from "@/components/ui/container";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";

import Filter from "./components/filter";
import MobileFilters from "./components/mobile-filters";



export const revalidate = 0;

interface CategoryPageProps {
  params: {
    category_id: string;
  };
  searchParams: {
    color_id: string;
    size_id: string;
  };
}

const CategoryPage: React.FC<CategoryPageProps> = async ({
  params,
  searchParams,
}) => {
  const products = await getProducts({
    category_id: params.category_id,
    color_id: searchParams.color_id,
    size_id: searchParams.size_id,
  });

  const sizes = await getSizes();
  const colors = await getColors();
  const category = await getCategory(params.category_id);

  

  return (
    <div className="bg-white dark:bg-[#0D1A25]">
      <Container>
        <Billboard data={category.billboard} />
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            <MobileFilters sizes={sizes} colors={colors}/>
            <div className="hidden lg:block">
              <Filter valueKey="size_id" name="Sizes" data={sizes} />
              <Filter valueKey="color_id" name="Colors" data={colors} />
            </div>
            <div className="mt-6 lg:col-span-4 lg:mt-0">
              {products.length === 0 && <NoResults />}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((item) => (
                  <ProductCard key={item.product_id} data={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CategoryPage;
