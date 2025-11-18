import axios from "axios";

export interface RestCountry {
  cca3: string;            // ISO3
  name: { common: string };
  population: number;
  languages?: Record<string, string>;
  currencies?: Record<string, { name: string }>;
  continents: string[];
}

export async function getAllCountries(): Promise<RestCountry[]> {
  const url = "https://restcountries.com/v3.1/all";

  const response = await axios.get(url);
  return response.data;
}
