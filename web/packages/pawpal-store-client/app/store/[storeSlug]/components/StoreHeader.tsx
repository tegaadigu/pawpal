'use client';

import { Avatar, Button, Typography } from "@material-tailwind/react";
import { useParams } from "next/navigation";
import { useStore } from "@/store/[storeSlug]/hooks/use-store";
import { StarIcon } from '@heroicons/react/24/solid';


export const StoreHeader = () => {
  const { storeSlug: slug = '' } = useParams();
  const { store = {} } = useStore(slug as string)?.data || {};
  return (
    <>
      <div className="mt-8">
        <div>
          <div className="flex flex-row">
            <Avatar src={store?.logo_url} alt="avatar" size="lg" />
            <div className="ml-4">
              <Typography className="text-3xl font-crimson font-bold">
                {store?.name}
              </Typography>
              <div className="flex flex-row font-inter">
                <span className="text-sm font-bold">
                  3.4
                </span>
                <StarIcon className="ml-1 w-3 h-3 mt-1 mr-1" />
                <span className="text-sm font-bold">{`(650+)`}</span>
              </div>
            </div>
          </div>
          <div className="mt-4 mb-4">
            <p className="text-sm font-bodySmall max-w-xl text-text">{ store?.description }</p>
          </div>
        </div>
        <div className="flex gap-2">
          {
            store?.meta_data?.instagram && <Button>@{store?.meta_data?.instagram}</Button>
          }
          {
            store?.meta_data?.website && <Button variant="outlined">{store?.meta_data?.website}</Button>  
          }
        </div>
      </div>
    </>
  );
}