import { Product } from "@/@types/product";
import { FeaturedImageGallery } from "@/store/[storeSlug]/[productSlug]/view/components/FeaturedGallery";

export const PDPCarousel = (({ product }: {product: Product}) => {
  return (
      <div className="flex min-w-space-0 flex-1 flex-col">
        <div className="max-w-2xl w-full mx-auto">
          <FeaturedImageGallery imageList={product?.images || []} />
        </div>
      </div>
  )
})