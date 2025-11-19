import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Sobre() {
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

      {/* CONTEÚDO */}
      <div style={{
        flex: 1,
        overflow: "auto",
        padding: "20px",
        display: "flex",
        flexDirection: "column"
      }}>
        <div
          style={{
            maxWidth: "900px",
            margin: "50px auto",
            padding: "20px",
            color: "white",
            lineHeight: "1.7",
            background: "#111",
            border: "1px solid #333",
            borderRadius: "10px",
          }}
        >
          <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>
            Sobre o Projeto
          </h1>
          <p>
            Este projeto foi desenvolvido como parte dos estudos em{" "}
            <strong>Análise e Desenvolvimento de Sistemas</strong>.
            Ele apresenta um <strong>mapa mundi interativo</strong>, permitindo que
            o usuário clique em qualquer país para visualizar informações
            importantes extraídas de uma API backend integrada ao banco de dados.
          </p>
          <h2 style={{ marginTop: "30px", fontSize: "22px" }}>📌 Objetivo</h2>
          <p>
            O objetivo principal é demonstrar a integração entre:
          </p>
          <ul style={{ paddingLeft: "20px" }}>
            <li>✔ Frontend em React + D3.js (visualização geográfica)</li>
            <li>✔ Backend com Node.js, Express e Prisma ORM</li>
            <li>✔ Banco de dados PostgreSQL</li>
            <li>✔ Consumo de APIs externas (REST Countries, GeoNames)</li>
          </ul>
          <h2 style={{ marginTop: "30px", fontSize: "22px" }}>🗺️ Recursos do Sistema</h2>
          <ul style={{ paddingLeft: "20px" }}>
            <li>• Clique em países do mapa para ver informações em tempo real</li>
            <li>• Exibição de população, moeda, idiomas e continente</li>
            <li>• Exibição da capital armazenada no banco de dados</li>
            <li>• API REST própria para consultar países via ISO3</li>
            <li>• Design escuro moderno e responsivo</li>
          </ul>
          <h2 style={{ marginTop: "30px", fontSize: "22px" }}>🛠️ Tecnologias Utilizadas</h2>
          <ul style={{ paddingLeft: "20px" }}>
            <li>Frontend: React, TypeScript, D3.js, Fetch API</li>
            <li>Backend: Node.js, Express, Prisma, TypeScript</li>
            <li>Banco de Dados: PostgreSQL</li>
            <li>APIs Externas: REST Countries, GeoNames</li>
          </ul>
          <h2 style={{ marginTop: "30px", fontSize: "22px" }}>👨‍💻 Desenvolvedor</h2>
          <p>
            Projeto criado por <strong>Henrique</strong> como parte de sua evolução
            prática em desenvolvimento full stack no curso de ADS.
          </p>
          <p style={{ marginTop: "20px", opacity: 0.7 }}>
            © {new Date().getFullYear()} — Todos os direitos reservados.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}