'use client';
import React from 'react';
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Radio
} from "@material-tailwind/react";
// import { useParams } from 'next/navigation';
// import { useProducts } from '@/store/[storeSlug]/hooks/use-products';

export const Sidebar = () => {
  // const { slug = '' } = useParams();
  // const { data } = useProducts(slug as string);
  const [sortByOpen, setSortByOpen] = React.useState(false);
  const [sortByCategory, setSortByCategpry] = React.useState(false);
  return (
    <aside className="hidden md:block w-1/6 p-6 bg-white h-screen font-crimson">
      <h2 className="text-2xl font-semibold mb-4">Filters</h2>
      
      <div className="mb-6 border-t-2">
        <Accordion open={sortByOpen}>
          <AccordionHeader className="text-md" onClick={() => setSortByOpen(!sortByOpen)}>Sort by</AccordionHeader>
          <AccordionBody className="flex flex-col">
            <Radio name="sort_by" label="Price Low To High" />
            <Radio name="sort_by" label="Price: High to low" />
          </AccordionBody>
        </Accordion>

        {/* Categories */}
        <Accordion open={sortByCategory}>
          <AccordionHeader className="text-md" onClick={() => setSortByCategpry(!sortByCategory)}>Categories</AccordionHeader>
          <AccordionBody className="flex flex-col">
            <Radio name="categories" label="Price Low To High" />
            <Radio name="categories" label="Price: High to low" />
          </AccordionBody>
        </Accordion>
      </div>
    </aside>
  );
};

export default Sidebar;
