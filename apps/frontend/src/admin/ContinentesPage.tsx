import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import Modal from "./components/Modal";
import "./styles/admin.css";

interface Continente {
  id: number;
  nome: string;
  descricao: string | null;
}

const API_BASE = "http://localhost:4000/api"; // se mudar a porta, muda só aqui

export default function ContinentesPage() {
  const [continentes, setContinentes] = useState<Continente[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editando, setEditando] = useState<Continente | null>(null);

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");

  const [saving, setSaving] = useState(false);
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  async function carregarContinentes() {
    try {
      setLoading(true);
      const resp = await fetch(`${API_BASE}/continentes`);
      if (!resp.ok) throw new Error("Falha ao carregar continentes");

      const data = await resp.json();
      setContinentes(data);
    } catch (e: any) {
      console.error(e);
      setErro(e.message ?? "Erro ao carregar continentes");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarContinentes();
  }, []);

  function abrirModalCriar() {
    setEditando(null);
    setNome("");
    setDescricao("");
    setErro(null);
    setMensagem(null);
    setModalOpen(true);
  }

  function abrirModalEditar(c: Continente) {
    setEditando(c);
    setNome(c.nome);
    setDescricao(c.descricao ?? "");
    setErro(null);
    setMensagem(null);
    setModalOpen(true);
  }

  function fecharModal() {
    if (saving) return; // evita fechar no meio do submit
    setModalOpen(false);
  }

  async function salvarContinente(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setMensagem(null);

    if (!nome.trim()) {
      setErro("O nome do continente é obrigatório.");
      return;
    }

    setSaving(true);

    try {
      if (editando) {
        // UPDATE
        const resp = await fetch(
          `${API_BASE}/continentes/${editando.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              nome: nome.trim(),
              descricao: descricao.trim(),
            }),
          }
        );

        if (!resp.ok) throw new Error("Erro ao atualizar continente");
        setMensagem("Continente atualizado com sucesso!");
      } else {
        // CREATE
        const resp = await fetch(`${API_BASE}/continentes`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nome: nome.trim(),
            descricao: descricao.trim(),
          }),
        });

        if (!resp.ok) throw new Error("Erro ao criar continente");
        setMensagem("Continente criado com sucesso!");
      }

      await carregarContinentes();
      setModalOpen(false);
    } catch (e: any) {
      console.error(e);
      setErro(e.message ?? "Erro ao salvar continente");
    } finally {
      setSaving(false);
    }
  }

  async function excluirContinente(id: number) {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este continente?"
    );
    if (!confirmar) return;

    try {
      const resp = await fetch(`${API_BASE}/continentes/${id}`, {
        method: "DELETE",
      });

      if (!resp.ok) throw new Error("Erro ao excluir continente");

      setMensagem("Continente excluído com sucesso!");
      await carregarContinentes();
    } catch (e: any) {
      console.error(e);
      setErro(e.message ?? "Erro ao excluir continente");
    }
  }

  return (
    <AdminLayout>
      <header style={{ marginBottom: "20px" }}>
        <h1>Gerenciar Continentes</h1>
        <p>Cadastre, edite e remova continentes usados no mapa.</p>
      </header>

      <div style={{ marginBottom: "20px" }}>
        <button className="btn" onClick={abrirModalCriar}>
          + Novo Continente
        </button>
      </div>

      {erro && (
        <div style={{ color: "#ff8a8a", marginBottom: 10 }}>{erro}</div>
      )}
      {mensagem && (
        <div style={{ color: "#8affc1", marginBottom: 10 }}>{mensagem}</div>
      )}

      {loading ? (
        <p>Carregando continentes...</p>
      ) : continentes.length === 0 ? (
        <p>Nenhum continente cadastrado.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: "60px" }}>ID</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th style={{ width: "180px" }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {continentes.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.nome}</td>
                <td>{c.descricao}</td>
                <td>
                  <button
                    className="btn"
                    onClick={() => abrirModalEditar(c)}
                    style={{ marginRight: 8 }}
                  >
                    Editar
                  </button>
                  <button
                    className="btn"
                    onClick={() => excluirContinente(c.id)}
                    style={{ background: "#ff5c5c" }}
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
        <h3>{editando ? "Editar Continente" : "Novo Continente"}</h3>

        {erro && (
          <div style={{ color: "#ff8a8a", marginBottom: 10 }}>{erro}</div>
        )}

        <form onSubmit={salvarContinente}>
          <div style={{ marginBottom: 12 }}>
            <label>Nome</label>
            <input
              style={{ width: "100%", padding: 8, marginTop: 4 }}
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: América do Sul"
            />
          </div>

          <div style={{ marginBottom: 12 }}>
            <label>Descrição</label>
            <textarea
              style={{ width: "100%", padding: 8, marginTop: 4 }}
              rows={4}
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Descrição opcional do continente..."
            />
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
