import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { feature } from "topojson-client";
import type { FeatureCollection, Geometry } from "geojson";
import ISO from "iso-3166-1";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


interface PaisInfo {
  nome: string;
  codigoISO3: string;
  populacao: number;
  idioma_oficial: string;
  moeda: string;
  continente: { nome: string };
  cidades: { nome: string }[];
}

function App() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedISO3, setSelectedISO3] = useState<string | null>(null);
  const [paisInfo, setPaisInfo] = useState<PaisInfo | null>(null);

  async function carregarPais(iso3: string) {
    try {
      const res = await fetch(`http://localhost:4000/api/paises/codigo/${iso3}`);

      if (!res.ok) {
        setPaisInfo(null);
        return;
      }

      const data = await res.json();
      setPaisInfo(data);
    } catch (error) {
      console.error("Erro ao buscar país:", error);
      setPaisInfo(null);
    }
  }

  useEffect(() => {
    if (selectedISO3) {
      setPaisInfo(null);
      carregarPais(selectedISO3);
    }
  }, [selectedISO3]);

  useEffect(() => {
    async function loadMap() {
      const topoData: any = await fetch("/world.json").then((res) => res.json());

      const countries = feature(
        topoData,
        topoData.objects.countries
      ) as unknown as FeatureCollection<Geometry, any>;

      // Aguarda um pouco para garantir que o container tem as dimensões corretas
      await new Promise(resolve => setTimeout(resolve, 100));

      const svg = d3.select(svgRef.current);
      
      // Pega as dimensões do container
      const containerWidth = containerRef.current?.clientWidth || 1200;
      const containerHeight = containerRef.current?.clientHeight || 600;

      // Ajusta o SVG para caber no container
      const width = containerWidth - 20;
      const height = containerHeight - 40;

      svg.attr("width", width).attr("height", height);
      svg.attr("viewBox", `0 0 ${width} ${height}`);

      const projection = d3.geoMercator()
        .scale(140)
        .translate([width / 2, height / 1.4]);

      const path = d3.geoPath().projection(projection);

      svg.selectAll("path")
        .data(countries.features)
        .enter()
        .append("path")
        .attr("d", path as any)
        .attr("fill", "#cfcfcf")
        .attr("stroke", "#333")
        .attr("stroke-width", 0.5)
        .on("mouseover", function () {
          d3.select(this).attr("fill", "orange");
        })
        .on("mouseout", function () {
          d3.select(this).attr("fill", "#cfcfcf");
        })
        .on("click", function (event, d: any) {
          const isoNumeric = d.id;

          const country = ISO.whereNumeric(isoNumeric);

          if (!country) {
            console.warn("Não encontrei ISO para:", isoNumeric);
            return;
          }

          const iso3 = country.alpha3;
          setSelectedISO3(iso3);
        });
    }

    loadMap();
  }, []);

  return (
    <div style={{ 
      background: "#000", 
      minHeight: "100vh", 
      color: "white",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden"
    }}>

      <Navbar />

      {/* CONTAINER COM FLEX */}
      <div
        ref={containerRef}
        style={{
          maxWidth: "1600px",
          margin: "0 auto",
          padding: "20px",
          display: "flex",
          gap: "20px",
          flex: 1,
          overflow: "hidden",
          width: "100%"
        }}
      >
        
        {/* MAPA */}
        <svg
          ref={svgRef}
          style={{
            flex: 1,
            height: "100%",
            width: "100%",
            overflow: "visible"
          }}
        ></svg>

        {/* PAINEL */}
        <div
          style={{
            padding: "20px",
            width: "clamp(300px, 25vw, 400px)",
            border: "1px solid #444",
            background: "#111",
            borderRadius: "8px",
            height: "fit-content",
            maxHeight: "100%",
            overflow: "auto",
            flexShrink: 0
          }}
        >
          <h2>País selecionado</h2>

          {!selectedISO3 && <p>Clique em um país no mapa.</p>}
          {selectedISO3 && !paisInfo && <p>Carregando...</p>}

          {paisInfo && (
            <div>
              <p><strong>Nome:</strong> {paisInfo.nome}</p>
              <p><strong>ISO3:</strong> {paisInfo.codigoISO3}</p>
              <p><strong>Continente:</strong> {paisInfo.continente.nome}</p>
              <p><strong>População:</strong> {paisInfo.populacao.toLocaleString()}</p>
              <p><strong>Idioma:</strong> {paisInfo.idioma_oficial}</p>
              <p><strong>Moeda:</strong> {paisInfo.moeda}</p>

              {paisInfo.cidades.length > 0 && (
                <>
                  <h3>Capital:</h3>
                  <p>{paisInfo.cidades[0].nome}</p>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />

    </div>
  );
}

export default App;