import axios from "axios";

export interface RestCountry {
  cca3: string; // ISO3
  name: { common: string };
  population: number;
  languages?: Record<string, string>;
  currencies?: Record<string, { name: string }>;
  continents: string[];

  // CAMPOS DE CAPITAL
  capital?: string[];
  capitalInfo?: {
    latlng?: [number, number];
  };
}

export async function getAllCountries(): Promise<RestCountry[]> {
  const url =
    "https://restcountries.com/v3.1/all?fields=cca3,name,population,languages,currencies,continents,capital,capitalInfo";
  
  const response = await axios.get(url);
  return response.data;
}
