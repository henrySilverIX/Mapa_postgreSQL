import { useEffect, useMemo, useState } from "react";
import AdminLayout from "./AdminLayout";
import Modal from "./components/Modal";
import "./styles/admin.css";

interface Continente {
  id: number;
  nome: string;
}

interface Pais {
  id: number;
  nome: string;
  codigoISO3: string;
  populacao: number;
  idioma_oficial: string;
  moeda: string;
  continenteId: number;
  continente?: Continente;
}

const API_BASE = "http://localhost:4000/api";

export default function PaisesPage() {
  const [paises, setPaises] = useState<Pais[]>([]);
  const [continentes, setContinentes] = useState<Continente[]>([]);
  const [loading, setLoading] = useState(true);

  const [erro, setErro] = useState<string | null>(null);
  const [mensagem, setMensagem] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editando, setEditando] = useState<Pais | null>(null);

  // Campos do formulário
  const [nome, setNome] = useState("");
  const [codigoISO3, setCodigoISO3] = useState("");
  const [populacao, setPopulacao] = useState<string>("");
  const [idioma, setIdioma] = useState("");
  const [moeda, setMoeda] = useState("");
  const [continenteId, setContinenteId] = useState<string>("");

  // FILTROS
  const [filtroContinenteId, setFiltroContinenteId] = useState<string>("");
  const [buscaNome, setBuscaNome] = useState<string>("");
  const [filtroIdioma, setFiltroIdioma] = useState<string>("");

  // ====== CARREGAR DADOS ======
  async function carregarContinentes() {
    const resp = await fetch(`${API_BASE}/continentes`);
    const data = await resp.json();
    setContinentes(data);
  }

  async function carregarPaises() {
    try {
      setLoading(true);
      const resp = await fetch(`${API_BASE}/paises`);
      const data = await resp.json();
      setPaises(data);
    } catch (e: any) {
      console.error(e);
      setErro("Erro ao carregar países");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarContinentes();
    carregarPaises();
  }, []);

  // ====== FILTRAGEM ======
  const paisesFiltrados = useMemo(() => {
    return paises.filter((p) => {
      const nomeMatch = p.nome.toLowerCase().includes(buscaNome.toLowerCase());

      const continenteMatch = filtroContinenteId
        ? p.continenteId === Number(filtroContinenteId)
        : true;

      const idiomaMatch = filtroIdioma
        ? p.idioma_oficial.toLowerCase().includes(filtroIdioma.toLowerCase())
        : true;

      return nomeMatch && continenteMatch && idiomaMatch;
    });
  }, [paises, filtroContinenteId, filtroIdioma, buscaNome]);

  // ====== MODAL ======
  function abrirModalCriar() {
    setEditando(null);
    setNome("");
    setCodigoISO3("");
    setIdioma("");
    setMoeda("");
    setPopulacao("");
    setContinenteId("");
    setErro(null);
    setMensagem(null);
    setModalOpen(true);
  }

  function abrirModalEditar(p: Pais) {
    setEditando(p);
    setNome(p.nome);
    setCodigoISO3(p.codigoISO3);
    setIdioma(p.idioma_oficial);
    setMoeda(p.moeda);
    setPopulacao(String(p.populacao));
    setContinenteId(String(p.continenteId));
    setErro(null);
    setMensagem(null);
    setModalOpen(true);
  }

  function fecharModal() {
    if (saving) return;
    setModalOpen(false);
  }

  // ====== SALVAR ======
  async function salvarPais(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setMensagem(null);

    if (!nome.trim() || !codigoISO3.trim() || !continenteId) {
      setErro("Preencha todos os campos obrigatórios.");
      return;
    }

    const dados = {
      nome,
      codigoISO3: codigoISO3.toUpperCase(),
      idioma_oficial: idioma,
      moeda,
      populacao: Number(populacao),
      continenteId: Number(continenteId),
    };

    setSaving(true);

    try {
      if (editando) {
        const resp = await fetch(`${API_BASE}/paises/${editando.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dados),
        });
        if (!resp.ok) throw new Error("Erro ao atualizar país");
        setMensagem("País atualizado com sucesso!");
      } else {
        const resp = await fetch(`${API_BASE}/paises`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dados),
        });
        if (!resp.ok) throw new Error("Erro ao criar país");
        setMensagem("País criado com sucesso!");
      }

      await carregarPaises();
      setModalOpen(false);
    } catch (e: any) {
      console.error(e);
      setErro(e.message);
    } finally {
      setSaving(false);
    }
  }

  async function excluirPais(id: number) {
    if (!confirm("Tem certeza que deseja excluir este país?")) return;

    try {
      const resp = await fetch(`${API_BASE}/paises/${id}`, {
        method: "DELETE",
      });
      if (!resp.ok) throw new Error("Erro ao excluir país");
      await carregarPaises();
    } catch (e: any) {
      console.error(e);
      setErro(e.message);
    }
  }

  return (
    <AdminLayout>
      <header style={{ marginBottom: 20 }}>
        <h1>Gerenciar Países</h1>
        <p>Filtre, cadastre e edite países associados aos continentes.</p>
      </header>

      {/* FILTROS */}
      <section className="filters">
        <button className="btn" onClick={abrirModalCriar}>
          + Novo País
        </button>

        <select
          value={filtroContinenteId}
          onChange={(e) => setFiltroContinenteId(e.target.value)}
        >
          <option value="">Todos os continentes</option>
          {continentes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nome}
            </option>
          ))}
        </select>

        <input
          placeholder="Buscar país..."
          value={buscaNome}
          onChange={(e) => setBuscaNome(e.target.value)}
          style={{ padding: 8, minWidth: 200 }}
        />

        <input
          placeholder="Filtrar por idioma..."
          value={filtroIdioma}
          onChange={(e) => setFiltroIdioma(e.target.value)}
          style={{ padding: 8, minWidth: 200 }}
        />
      </section>

      {erro && <p style={{ color: "red" }}>{erro}</p>}
      {mensagem && <p style={{ color: "#8affc1" }}>{mensagem}</p>}

      {loading ? (
        <p>Carregando países...</p>
      ) : paisesFiltrados.length === 0 ? (
        <p>Nenhum país encontrado.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>ISO3</th>
              <th>Continente</th>
              <th>População</th>
              <th>Idioma</th>
              <th>Moeda</th>
              <th style={{ width: 180 }}>Ações</th>
            </tr>
          </thead>

          <tbody>
            {paisesFiltrados.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nome}</td>
                <td>{p.codigoISO3}</td>
                <td>{p.continente?.nome}</td>
                <td>{p.populacao.toLocaleString("pt-BR")}</td>
                <td>{p.idioma_oficial}</td>
                <td>{p.moeda}</td>
                <td>
                  <button className="btn" onClick={() => abrirModalEditar(p)}>
                    Editar
                  </button>
                  <button
                    className="btn"
                    style={{ background: "#ff5c5c", marginLeft: 8 }}
                    onClick={() => excluirPais(p.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* MODAL */}
      <Modal open={modalOpen} onClose={fecharModal}>
        <h3>{editando ? "Editar País" : "Novo País"}</h3>

        {erro && <p style={{ color: "red" }}>{erro}</p>}

        <form onSubmit={salvarPais}>
          <div style={{ marginBottom: 12 }}>
            <label>Nome</label>
            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: 12 }}>
            <label>ISO3</label>
            <input
              value={codigoISO3}
              onChange={(e) => setCodigoISO3(e.target.value)}
              maxLength={3}
            />
          </div>

          <div style={{ marginBottom: 12 }}>
            <label>População</label>
            <input
              type="number"
              value={populacao}
              onChange={(e) => setPopulacao(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: 12 }}>
            <label>Idioma</label>
            <input
              value={idioma}
              onChange={(e) => setIdioma(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: 12 }}>
            <label>Moeda</label>
            <input
              value={moeda}
              onChange={(e) => setMoeda(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: 12 }}>
            <label>Continente</label>
            <select
              value={continenteId}
              onChange={(e) => setContinenteId(e.target.value)}
            >
              <option value="">Selecione...</option>
              {continentes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome}
                </option>
              ))}
            </select>
          </div>

          <button className="btn" disabled={saving}>
            {saving ? "Salvando..." : "Salvar"}
          </button>
        </form>
      </Modal>
    </AdminLayout>
  );
}
