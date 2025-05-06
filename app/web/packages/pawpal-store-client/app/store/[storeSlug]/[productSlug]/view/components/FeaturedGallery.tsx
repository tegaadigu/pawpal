import { ProductImage } from "@/@types/product";
import React from "react";
export function FeaturedImageGallery({ imageList = [] }: { imageList: Array<ProductImage>}) {

  const [active, setActive] = React.useState("");

  React.useEffect(() => {
    if(imageList.length && !active) {
      setActive(imageList?.[0].path)
    }
  }, [imageList])
 
  return (
    <div className="grid gap-4">
      <div>
        <img
          className="h-auto w-full max-w-full rounded-lg object-cover object-center md:h-[480px]"
          src={active}
          alt=""
        />
      </div>
      <div className="grid grid-cols-5 gap-4">
        {imageList?.map(({ path, id }) => (
          <div key={id}>
            <img
              onClick={() => setActive(path)}
              src={path}
              className="h-20 max-w-full cursor-pointer rounded-lg object-cover object-center"
              alt="gallery-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
}