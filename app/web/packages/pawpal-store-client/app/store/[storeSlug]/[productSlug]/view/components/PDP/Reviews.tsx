import { Product } from "@/@types/product"
import { InformationCircleIcon, StarIcon } from "@heroicons/react/24/solid";
import { Alert, Typography } from "@material-tailwind/react";

export const Reviews = ({ product }: { product: Product}) => {
  return (
    <div className="mt-8">
    <Typography color="blue-gray" className="font-lori text-2xl font-semibold divider">Ratings & Reviews</Typography>
    <div className="flex flex-row gap-3 mt-8">
      <Typography className="font-crimson text-6xl">
        {product?.meta_data?.rating}
      </Typography>
      <StarIcon className="w-10 h-10" />
    </div>
    <div>
      <Typography color="blue-gray" className="text-sm font-medium">
        {product?.meta_data?.total_reviews || 0} ratings
      </Typography>
    </div>
    {!product?.meta_data?.total_reviews && (
      <div className="mt-8">
        <Alert variant="ghost" icon={<InformationCircleIcon className="w-6 h-6" />}>
          There are no reviews for this product
        </Alert>
      </div>
    )}
  </div>
  )
}