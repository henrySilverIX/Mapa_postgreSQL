import { prisma } from "../db";
import { getAllCountries } from "../utils/apiClients/restCountries";

// ⬇⬇⬇ FUNÇÃO wait FORA DA CLASSE
function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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

  async importarPaises() {
    const paisesApi = await getAllCountries();

    for (const p of paisesApi) {
      const iso3 = p.cca3;
      const nome = p.name.common;
      const populacao = p.population;

      const idiomas = p.languages
        ? Object.values(p.languages).join(", ")
        : "N/A";

      const moedas = p.currencies
        ? Object.keys(p.currencies)[0]
        : "N/A";

      const nomeContinente = p.continents[0];

      const continente = await prisma.continente.findUnique({
        where: { nome: nomeContinente }
      });

      if (!continente) {
        console.warn(`Continente não encontrado: ${nomeContinente}`);
        continue;
      }

      await prisma.pais.upsert({
        where: { codigoISO3: iso3 },
        update: {
          nome,
          populacao,
          idioma_oficial: idiomas,
          moeda: moedas ?? "N/A",
          continenteId: continente.id
        },
        create: {
          codigoISO3: iso3,
          nome,
          populacao,
          idioma_oficial: idiomas,
          moeda: moedas ?? "N/A",
          continenteId: continente.id
        }
      });
    }
    console.log("✔ Países importados");
  }

  async importarCidades() {
    console.log("⏳ Importando capitais...");

    // 1) Buscar todos os países do banco
    const paisesDB = await prisma.pais.findMany();

    // 2) Buscar todos os países da API apenas UMA vez
    const paisesAPI = await getAllCountries();

    let totalCapitais = 0;

    for (const pais of paisesDB) {
      // 3) Encontrar o mesmo país na API pelo ISO3
      const api = paisesAPI.find((p) => p.cca3 === pais.codigoISO3);

      if (!api) {
        console.warn(`⚠ País não encontrado na API: ${pais.nome} (${pais.codigoISO3})`);
        continue;
      }

      // 4) Pegar capital
      const capital = api.capital?.[0];
      const coords = api.capitalInfo?.latlng;

      if (!capital || !coords) {
        console.warn(`⚠ Sem capital disponível: ${pais.nome}`);
        continue;
      }

      const [lat, lng] = coords;

      // 5) Inserir/atualizar a capital no banco
      await prisma.cidades.upsert({
        where: {
          nome_paisId: {
            nome: capital,
            paisId: pais.id
          }
        },
        update: {
          latitude: lat,
          longitude: lng
        },
        create: {
          nome: capital,
          populacao: 0,
          latitude: lat,
          longitude: lng,
          paisId: pais.id
        }
      });

      totalCapitais++;

      console.log(`✔ Capital importada: ${capital} → ${pais.nome}`);
    }

    console.log(`\n🎉 Importação concluída: ${totalCapitais} capitais salvas.`);
  }


}
