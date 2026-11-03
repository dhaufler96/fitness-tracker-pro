import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../auth/AuthContext";
import { getRoutines, createRoutine } from "../api/routines";
export default function RoutinesPage() {
  const { token } = useAuth();
  const [routines, setRoutines] = useState([]);
  const [error, setError] = useState("");
  async function refresh() { try { setRoutines(await getRoutines()); } catch (e) { setError(e.message); } }
  useEffect(() => { refresh(); }, []);
  async function submit(formData) {
    setError("");
    try { await createRoutine(token, { name: formData.get("name"), goal: formData.get("goal") }); await refresh(); }
    catch (e) { setError(e.message); }
  }
  return <><h1>Routines</h1>{error && <p role="alert">{error}</p>}
    <ul>{routines.map(r => <li key={r.id}><Link to={"/routines/" + r.id}>{r.name}</Link></li>)}</ul>
    {token && <><h2>Add a routine</h2><form action={submit}>
      <label>Name <input name="name" required /></label>
      <label>Goal <input name="goal" required /></label>
      <button>Create routine</button>
    </form></>}
  </>;
}
