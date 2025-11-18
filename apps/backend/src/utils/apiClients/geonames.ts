import axios from "axios";

export interface GeoNameCity {
  name: string;
  population: number;
  lat: string;
  lng: string;
}

export async function getTop10CitiesByCountry(iso3: string): Promise<GeoNameCity[]> {
  const username = process.env.GEONAMES_USER ?? "demo";

  const url = `http://api.geonames.org/searchJSON?country=${iso3}&featureClass=P&orderby=population&maxRows=10&username=${username}`;

  const response = await axios.get(url);
  return response.data.geonames || [];
}
