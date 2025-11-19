export default function Navbar() {
  return (
    <nav
      style={{
        width: "100%",
        padding: "15px 0",
        background: "#0d0d0d",
        color: "white",
        borderBottom: "1px solid #333",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      {/* CONTAINER CENTRALIZADO */}
      <div
        style={{
          maxWidth: "1920px",
          margin: "0 auto",
          padding: "0 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "22px" }}>🌍 Mapa Mundial</h1>

        <div
          style={{
            display: "flex",
            gap: "20px",
            fontSize: "16px",
            whiteSpace: "nowrap",
          }}
        >
          <a href="/" style={{ color: "white", textDecoration: "none" }}>
            Home
          </a>
          <a href="/sobre" style={{ color: "white", textDecoration: "none" }}>
            Sobre
          </a>
        </div>
      </div>
    </nav>
  );
}
