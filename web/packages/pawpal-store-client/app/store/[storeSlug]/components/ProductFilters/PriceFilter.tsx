import { Button, Input, Menu, MenuHandler, MenuList } from "@material-tailwind/react"
import React, { ChangeEvent } from "react"

export const PriceFilter = () => {
  const [openPriceFilter, setOpenPriceFilter] = React.useState(false);
  const [min, setMin] = React.useState(0);
  const [max, setMax] = React.useState(2000);

  return (
    <Menu open={openPriceFilter} handler={setOpenPriceFilter}  dismiss={{itemPress: false }}>
      <MenuHandler>
        <Button size="sm" variant="outlined">Price</Button>
      </MenuHandler>
      <MenuList className="w-2xs min-w-2xs">
        <div className="flex m-4">
          <input
            type="range"
            min={0}
            max={1000}
            className="custom-slider"
            value={min}
            onChange={({ target: { value }}: ChangeEvent<HTMLInputElement>) => {
              setMin(parseInt(value));
            }}
          />
          <input
            type="range"
            min={1000}
            max={2000}
            className="custom-slider"
            value={max}
            onChange={({ target: { value }}: ChangeEvent<HTMLInputElement>) => {
              setMax(parseInt(value))
            }}
          />
        </div>
        <div className="flex justify-center gap-2 mt-4 flex-row">
        <Input
            className="!min-w-0 w-auto appearance-none !border-t-blue-gray-200 placeholder:text-blue-gray-300  placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            containerProps={{
              className: "!min-w-0  w-full min-w-2xs"
            }}
            value={min}
          />
          <Input
            className="!min-w-0 w-auto appearance-none !border-t-blue-gray-200 placeholder:text-blue-gray-300  placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            containerProps={{
              className: "!min-w-0 w-full min-w-2xs"
            }}
            value={max}
          />
        </div>
        <div className="mt-4 justify-center flex">
          <Button size="sm">Select</Button>
        </div>
      </MenuList>
    </Menu>
  )
}