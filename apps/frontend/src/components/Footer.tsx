export default function Footer() {
  return (
    <footer
      style={{
        width: "100%",
        padding: "15px 30px",
        background: "#0d0d0d",
        color: "white",
        textAlign: "center",
        borderTop: "1px solid #333",
        marginTop: "0",
        flexShrink: 0
      }}
    >
      <p style={{ margin: 0 }}>© {new Date().getFullYear()} Mapa Mundial . Desenvolvido por Henrique . Todos os direitos reservados.</p>
    </footer>
  );
}