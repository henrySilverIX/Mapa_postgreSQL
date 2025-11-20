import { useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import CardAdmin from "./components/CardAdmin";

export default function AdminHome() {
  const nav = useNavigate();

  return (
    <AdminLayout>
      <h1>Painel Administrativo</h1>

      <div className="admin-card-grid">
        <CardAdmin title="Continentes" onClick={() => nav("/admin/continentes")} />
        <CardAdmin title="Países" onClick={() => nav("/admin/paises")} />
        <CardAdmin title="Cidades" onClick={() => nav("/admin/cidades")} />
      </div>
    </AdminLayout>
  );
}
