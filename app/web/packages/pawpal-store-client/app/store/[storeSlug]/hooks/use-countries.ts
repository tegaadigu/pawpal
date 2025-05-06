
import React from "react";

const SUPPORTED_COUNTRIES = [
  {
    name: 'Canada',
    capital: 'Ottawa',
    postalCode: {
      format: '@#@ #@#',
      regex: '^([ABCEGHJKLMNPRSTVXY]\\d[ABCEGHJKLMNPRSTVWXYZ]) ?(\\d[ABCEGHJKLMNPRSTVWXYZ]\\d)$ '
    },
    flags: {
      png: 'https://flagcdn.com/w320/ca.png',
      svg: 'https://flagcdn.com/ca.svg'
    },
    emoji: '🇨🇦',
    countryCallingCode: '+1'
  },
  {
    name: 'United States',
    capital: 'Washington, D.C.',
    postalCode: {
      format: '#####-####',
      regex: '^\\d{5}(-\\d{4})?$'
    },
    flags: {
      png: 'https://flagcdn.com/w320/us.png',
      svg: 'https://flagcdn.com/us.svg'
    },
    emoji: '🇺🇸',
    countryCallingCode: '+1'
  }
]
export const useCountries = () => {
  const countries = React.useMemo(() => {
    return SUPPORTED_COUNTRIES
  }, [])
  return {
    countries
  }
}