'use client';
import { Radio, Typography, Input, Select, Option } from "@material-tailwind/react";
import { TruckIcon, CubeIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useCountries } from "@/store/[storeSlug]/hooks/use-countries"
import { InputWithDropdown } from "./mobile-input-dropdown";

export const CheckoutContainer = () => {
  console.log('in checkout container....')
  const options = [
    { label: "Delivery", value: "delivery", icon: TruckIcon },
    { label: "Pick up", value: "pickup", icon: CubeIcon },
  ];
  const { countries } = useCountries()

  const [delivery, setDelivery] = React.useState(options[0].value)
  const [country, setCountry] = React.useState(0)

  return (
    <div className="flex flex-row gap-10 w-full">
      <div className="w-[50%]">
        <div className="flex justify-between">
          <div>
            <Typography variant="h2" className="text-2xl font-medium font-crimson" color="blue-gray">
              Checkout
            </Typography>
            <Typography className="text-sm text-gray-600 font-medium mt-4">
              Shipping Information
            </Typography>
          </div>
        </div>
        <form>
          <div className="flex gap-4 mt-2">

            {options.map((option) => (
              <label key={option.value} className="w-[30%] cursor-pointer">
                <div
                  className={`flex items-center gap-2 rounded-lg border p-1 transition-all
              ${delivery === option.value
                      ? "border-blue-500 bg-blue-50 text-blue-600"
                      : "border-gray-300 bg-white text-gray-700"}
            `}
                >
                  <Radio
                    name="shippingMethod"
                    value={option.value}
                    checked={delivery === option.value}
                    onChange={(e) => setDelivery(e.target.value)}
                    color="blue"
                    className="!h-5 !w-5"
                    crossOrigin=""
                  />
                  <option.icon className="w-4 h-4" />
                  <span className="font-medium">{option.label}</span>
                </div>
              </label>
            ))}
          </div>
          <div className="mt-4 mb-1 flex flex-col gap-4 max-w-[24rem]">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-1 font-medium"
            >
              Full Name
            </Typography>
            <Input
              size="md"
              placeholder="John Doe"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-1 font-medium"
            >
              Email
            </Typography>
            <Input
              size="md"
              placeholder="john.doa@email.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <div className="mt-4 mb-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-1 font-medium"
              >
                Country
              </Typography>
              <Select
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                size="md"
                selected={(element) =>
                  element &&
                  React.cloneElement(element, {
                    disabled: true,
                    className:
                      "flex items-center opacity-100 px-0 gap-2 pointer-events-none",
                  })
                }
                onChange={countryIndex => setCountry(countryIndex)}
              >
                {countries.map(({ name, flags }, index) => (
                  <Option key={name} value={index} className="flex items-center gap-2">
                    <img
                      src={flags.svg}
                      alt={name}
                      className="h-5 w-5 rounded-full object-cover"
                    />
                    {name}
                  </Option>
                ))}
              </Select>
            </div>
            <InputWithDropdown countryIndex={country} placeHolder="Phone Number" />
            <div className="my-4 flex items-center gap-4">
                    <div>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 font-medium"
                      >
                        State
                      </Typography>
                      <Input
                        maxLength={5}
                        value=""
                        onChange={(event) => console.log(event.target.value)}
                        containerProps={{ className: "min-w-[72px]" }}
                        placeholder="00/00"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                    </div>
                    <div>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 font-medium"
                      >
                        City
                      </Typography>
                      <Input
                        maxLength={4}
                        containerProps={{ className: "min-w-[72px]" }}
                        placeholder="000"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                    </div>
                  </div>
          </div>
        </form>
      </div>
      <div className="w-[25%]">

      </div>
    </div>
  )
}
