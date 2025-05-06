import React from "react";
import { useCountries } from "@/store/[storeSlug]/hooks/use-countries"
import {
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Typography
} from "@material-tailwind/react";
 
export function InputWithDropdown({ countryIndex, placeHolder}: { countryIndex: number, placeHolder: string}) {
  const { countries } = useCountries();
  const [country, setCountry] = React.useState(countryIndex);
  const { name, flags, countryCallingCode } = countries[country];

  React.useEffect(() => {
    setCountry(countryIndex)
  }, [countryIndex])
 
  return (
    <div className="w-full max-w-[24rem]">
      <Typography
        variant="small"
        color="blue-gray"
        className="mb-1 font-medium"
      >
        {placeHolder}
      </Typography>
    <div className="relative flex w-full mt-4">
      <Menu placement="bottom-start">
        <MenuHandler>
          <Button
            ripple={false}
            variant="text"
            color="blue-gray"
            className="flex h-10 items-center gap-2 rounded-r-none border border-r-0 border-blue-gray-200 bg-blue-gray-500/10 pl-3"
          >
            <img
              src={flags.svg}
              alt={name}
              className="h-4 w-4 rounded-full object-cover"
            />
            {countryCallingCode}
          </Button>
        </MenuHandler>
        <MenuList className="max-h-[20rem] max-w-[18rem]">
          {countries.map(({ name, flags, countryCallingCode }, index) => {
            return (
              <MenuItem
                key={name}
                value={name}
                className="flex items-center gap-2"
                onClick={() => setCountry(index)}
              >
                <img
                  src={flags.svg}
                  alt={name}
                  className="h-5 w-5 rounded-full object-cover"
                />
                {name} <span className="ml-auto">{countryCallingCode}</span>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
      <Input
        type="tel"
        placeholder="Mobile Number"
        className="rounded-l-none !border-t-blue-gray-200 focus:!border-t-gray-900"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
        containerProps={{
          className: "min-w-0",
        }}
      />
    </div>
    </div>
  );
}
