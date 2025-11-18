import { prisma } from "../db";
import { getAllCountries } from "../utils/apiClients/restCountries";
import { getTop10CitiesByCountry } from "../utils/apiClients/geonames";

export class ImportService {

  async importarContinentes() {
    const paises = await getAllCountries();

    const nomesContinentes = new Set<string>();

    paises.forEach((p) => {
      p.continents.forEach((c) => nomesContinentes.add(c));
    });

    for (const nome of nomesContinentes) {
      await prisma.continente.upsert({
        where: { nome },
        update: {},
        create: { nome, descricao: `Continente ${nome}` }
      });
    }

    console.log("✔ Continentes importados");
  }
}
