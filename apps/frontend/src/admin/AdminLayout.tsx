import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./styles/admin.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-wrapper">
      <Navbar />

      <div className="admin-body">
        {/* SIDEBAR */}
        <aside className="admin-sidebar">
          <h2>Administração</h2>

          <nav>
            <a href="/admin">🏠 Painel</a>
            <a href="/admin/continentes">🌍 Continentes</a>
            <a href="/admin/paises">🇧🇷 Países</a>
            <a href="/admin/cidades">🏙 Cidades</a>
          </nav>
        </aside>

        {/* CONTEÚDO */}
        <main className="admin-content">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}
