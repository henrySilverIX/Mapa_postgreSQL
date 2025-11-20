import { useEffect, useMemo, useState } from "react";
import AdminLayout from "./AdminLayout";
import Modal from "./components/Modal";
import "./styles/admin.css";

const API_BASE = "http://localhost:4000/api";

interface Continente {
  id: number;
  nome: string;
}

interface Pais {
  id: number;
  nome: string;
  continenteId: number;
  continente?: Continente;
}

interface Cidade {
  id: number;
  nome: string;
  populacao: number;
  latitude: number;
  longitude: number;
  paisId: number;
  pais?: Pais;
}

export default function CidadesPage() {
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [paises, setPaises] = useState<Pais[]>([]);
  const [continentes, setContinentes] = useState<Continente[]>([]);
  const [loading, setLoading] = useState(true);

  const [erro, setErro] = useState<string | null>(null);
  const [mensagem, setMensagem] = useState<string | null>(null);

  // Filtros
  const [filtroContinenteId, setFiltroContinenteId] = useState<string>("");
  const [filtroPaisId, setFiltroPaisId] = useState<string>("");
  const [buscaNome, setBuscaNome] = useState<string>("");

  // Modal / formulário
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editando, setEditando] = useState<Cidade | null>(null);

  const [nome, setNome] = useState("");
  const [populacao, setPopulacao] = useState<string>("");
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");
  const [paisId, setPaisId] = useState<string>("");

  // ========= CARREGAR DADOS =========
  async function carregarContinentes() {
    const resp = await fetch(`${API_BASE}/continentes`);
    const data = await resp.json();
    setContinentes(data);
  }

  async function carregarPaises() {
    const resp = await fetch(`${API_BASE}/paises`);
    const data = await resp.json();
    setPaises(data);
  }

  async function carregarCidades() {
    try {
      setLoading(true);
      const resp = await fetch(`${API_BASE}/cidades`);
      if (!resp.ok) throw new Error("Erro ao carregar cidades");
      const data = await resp.json();
      setCidades(data);
    } catch (e: any) {
      console.error(e);
      setErro(e.message ?? "Erro ao carregar cidades");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        await Promise.all([
          carregarContinentes(),
          carregarPaises(),
          carregarCidades(),
        ]);
      } catch (e: any) {
        console.error(e);
        setErro(e.message ?? "Erro ao carregar dados iniciais");
      }
    })();
  }, []);

  // ========= FILTROS / DERIVADOS =========

  const paisesFiltradosPorContinente = useMemo(() => {
    if (!filtroContinenteId) return paises;
    const cid = Number(filtroContinenteId);
    return paises.filter((p) => p.continenteId === cid);
  }, [paises, filtroContinenteId]);

  const cidadesFiltradas = useMemo(() => {
    return cidades.filter((c) => {
      const nomeMatch = c.nome
        .toLowerCase()
        .includes(buscaNome.toLowerCase());

      const paisMatch = filtroPaisId
        ? c.paisId === Number(filtroPaisId)
        : true;

      const continenteMatch = filtroContinenteId
        ? c.pais?.continenteId === Number(filtroContinenteId)
        : true;

      return nomeMatch && paisMatch && continenteMatch;
    });
  }, [cidades, filtroPaisId, filtroContinenteId, buscaNome]);

  // ========= MODAL / FORM =========

  function abrirModalCriar() {
    setEditando(null);
    setNome("");
    setPopulacao("");
    setLatitude("");
    setLongitude("");
    setPaisId("");
    setErro(null);
    setMensagem(null);
    setModalOpen(true);
  }

  function abrirModalEditar(cidade: Cidade) {
    setEditando(cidade);
    setNome(cidade.nome);
    setPopulacao(String(cidade.populacao));
    setLatitude(String(cidade.latitude));
    setLongitude(String(cidade.longitude));
    setPaisId(String(cidade.paisId));
    setErro(null);
    setMensagem(null);

    // opcional: ajustar filtros conforme a cidade
    if (cidade.pais?.continenteId) {
      setFiltroContinenteId(String(cidade.pais.continenteId));
    }

    setModalOpen(true);
  }

  function fecharModal() {
    if (saving) return;
    setModalOpen(false);
  }

  async function salvarCidade(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setMensagem(null);

    if (!nome.trim() || !paisId) {
      setErro("Nome e país são obrigatórios.");
      return;
    }

    const dados = {
      nome: nome.trim(),
      populacao: Number(populacao) || 0,
      latitude: Number(latitude),
      longitude: Number(longitude),
      paisId: Number(paisId),
    };

    setSaving(true);

    try {
      if (editando) {
        const resp = await fetch(
          `${API_BASE}/cidades/${editando.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados),
          }
        );
        if (!resp.ok) throw new Error("Erro ao atualizar cidade");
        setMensagem("Cidade atualizada com sucesso!");
      } else {
        const resp = await fetch(`${API_BASE}/cidades`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dados),
        });
        if (!resp.ok) throw new Error("Erro ao criar cidade");
        setMensagem("Cidade criada com sucesso!");
      }

      await carregarCidades();
      setModalOpen(false);
    } catch (e: any) {
      console.error(e);
      setErro(e.message ?? "Erro ao salvar cidade");
    } finally {
      setSaving(false);
    }
  }

  async function excluirCidade(id: number) {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir esta cidade?"
    );
    if (!confirmar) return;

    try {
      const resp = await fetch(`${API_BASE}/cidades/${id}`, {
        method: "DELETE",
      });

      if (!resp.ok) throw new Error("Erro ao excluir cidade");

      setMensagem("Cidade excluída com sucesso!");
      await carregarCidades();
    } catch (e: any) {
      console.error(e);
      setErro(e.message ?? "Erro ao excluir cidade");
    }
  }

  // ========= RENDER =========

  return (
    <AdminLayout>
      <header style={{ marginBottom: 20 }}>
        <h1>Gerenciar Cidades</h1>
        <p>
          Cadastre, filtre e edite cidades associadas a países e continentes.
        </p>
      </header>

      {/* Filtros */}
      <section className="filters">
        <button className="btn" onClick={abrirModalCriar}>
          + Nova Cidade
        </button>

        <select
          value={filtroContinenteId}
          onChange={(e) => {
            setFiltroContinenteId(e.target.value);
            setFiltroPaisId(""); // reset país ao trocar continente
          }}
        >
          <option value="">Todos os continentes</option>
          {continentes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nome}
            </option>
          ))}
        </select>

        <select
          value={filtroPaisId}
          onChange={(e) => setFiltroPaisId(e.target.value)}
        >
          <option value="">Todos os países</option>
          {paisesFiltradosPorContinente.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nome}
            </option>
          ))}
        </select>

        <input
          placeholder="Buscar cidade..."
          value={buscaNome}
          onChange={(e) => setBuscaNome(e.target.value)}
          style={{ padding: 8, minWidth: 200 }}
        />
      </section>

      {erro && (
        <div style={{ color: "#ff8a8a", marginBottom: 10 }}>{erro}</div>
      )}
      {mensagem && (
        <div style={{ color: "#8affc1", marginBottom: 10 }}>{mensagem}</div>
      )}

      {loading ? (
        <p>Carregando cidades...</p>
      ) : cidadesFiltradas.length === 0 ? (
        <p>Nenhuma cidade encontrada com os filtros atuais.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: 50 }}>ID</th>
              <th>Nome</th>
              <th>País</th>
              <th>Continente</th>
              <th>População</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th style={{ width: 180 }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {cidadesFiltradas.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.nome}</td>
                <td>{c.pais?.nome}</td>
                <td>{c.pais?.continente?.nome}</td>
                <td>{c.populacao.toLocaleString("pt-BR")}</td>
                <td>{c.latitude.toFixed(4)}</td>
                <td>{c.longitude.toFixed(4)}</td>
                <td>
                  <button
                    className="btn"
                    onClick={() => abrirModalEditar(c)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn"
                    style={{ background: "#ff5c5c", marginLeft: 8 }}
                    onClick={() => excluirCidade(c.id)}
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
        <h3>{editando ? "Editar Cidade" : "Nova Cidade"}</h3>

        {erro && (
          <div style={{ color: "#ff8a8a", marginBottom: 10 }}>{erro}</div>
        )}

        <form onSubmit={salvarCidade}>
          <div style={{ marginBottom: 12 }}>
            <label>Nome</label>
            <input
              style={{ width: "100%", padding: 8, marginTop: 4 }}
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: São Paulo"
            />
          </div>

          <div style={{ marginBottom: 12 }}>
            <label>População</label>
            <input
              type="number"
              style={{ width: "100%", padding: 8, marginTop: 4 }}
              value={populacao}
              onChange={(e) => setPopulacao(e.target.value)}
              placeholder="População aproximada"
            />
          </div>

          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            <div style={{ flex: 1 }}>
              <label>Latitude</label>
              <input
                type="number"
                style={{ width: "100%", padding: 8, marginTop: 4 }}
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                placeholder="-23.5505"
              />
            </div>
            <div style={{ flex: 1 }}>
              <label>Longitude</label>
              <input
                type="number"
                style={{ width: "100%", padding: 8, marginTop: 4 }}
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                placeholder="-46.6333"
              />
            </div>
          </div>

          <div style={{ marginBottom: 12 }}>
            <label>País</label>
            <select
              style={{ width: "100%", padding: 8, marginTop: 4 }}
              value={paisId}
              onChange={(e) => setPaisId(e.target.value)}
            >
              <option value="">Selecione um país</option>
              {paisesFiltradosPorContinente.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nome}
                </option>
              ))}
            </select>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 10,
              marginTop: 20,
            }}
          >
            <button
              type="button"
              className="btn"
              style={{ background: "#555" }}
              onClick={fecharModal}
              disabled={saving}
            >
              Cancelar
            </button>
            <button type="submit" className="btn" disabled={saving}>
              {saving ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
}
