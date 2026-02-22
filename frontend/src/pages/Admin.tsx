import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import PortfolioPage from "../components/PortfolioPage";

export default function Admin() {
  const [session, setSession] = useState<{ user: { id: string; email?: string } } | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) checkAdmin(session.user.id);
      else setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) checkAdmin(session.user.id);
      else {
        setIsAdmin(false);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function checkAdmin(userId: string) {
    const { data } = await supabase
      .from("admin_users")
      .select("user_id")
      .eq("user_id", userId)
      .single();
    setIsAdmin(!!data);
    setLoading(false);
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setAuthLoading(false);
    if (error) setError(error.message);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Carregando...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-sm space-y-4">
          <h1 className="text-2xl font-bold text-gray-800">Admin</h1>
          <form onSubmit={handleLogin} className="space-y-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-900 placeholder-gray-500"
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-900 placeholder-gray-500"
            />
            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-2 bg-gray-800 text-white rounded hover:bg-gray-700 disabled:opacity-50"
            >
              {authLoading ? "Entrando..." : "Entrar"}
            </button>
          </form>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Você não tem permissão de admin.</p>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Sair
          </button>
        </div>
      </div>
    );
  }

  const adminHeader = (
    <div className="flex justify-end gap-2 p-4 border-b border-gray-200">
      <span className="text-sm text-gray-500 mr-2">{session.user.email}</span>
      <Link
        to="/"
        className="px-3 py-1 text-sm text-blue-600 hover:underline"
      >
        Ver site
      </Link>
      <button
        onClick={handleLogout}
        className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
      >
        Sair
      </button>
    </div>
  );

  return (
    <PortfolioPage
      canDrag={true}
      header={adminHeader}
    />
  );
}
