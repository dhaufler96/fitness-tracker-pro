import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";
import { getActivities } from "../api/activities";
import { getRoutine, deleteRoutine, addSet, deleteSet } from "../api/routines";
export default function RoutineDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [routine, setRoutine] = useState(null);
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState("");
  async function refresh() { setRoutine(await getRoutine(id)); }
  useEffect(() => {
    refresh().catch(e => setError(e.message));
    getActivities().then(setActivities).catch(e => setError(e.message));
  }, [id]);
  async function removeRoutine() {
    setError("");
    try { await deleteRoutine(token, id); navigate("/routines"); }
    catch (e) { setError(e.message); }
  }
  async function submitSet(formData) {
    setError("");
    try {
      await addSet(token, id, { activityId: Number(formData.get("activityId")), count: Number(formData.get("count")) });
      await refresh();
    } catch (e) { setError(e.message); }
  }
  async function removeSet(setId) {
    setError("");
    try { await deleteSet(token, setId); await refresh(); }
    catch (e) { setError(e.message); }
  }
  const sets = routine?.sets || [];
  return <><h1>Routine Details</h1>{error && <p role="alert">{error}</p>}
    {routine && <><h2>{routine.name}</h2><p>Goal: {routine.goal}</p>
      <p>Created by: {routine.creatorName || routine.creator?.username || routine.creator?.name || "Unknown"}</p>
      {token && <button onClick={removeRoutine}>Delete routine</button>}
      <h2>Sets</h2>
      {sets.length === 0 ? <p>No sets yet. Add a set!</p> : <ul>{sets.map(set => <li key={set.id}>
        {set.activity?.name || set.activityName || activities.find(a => a.id === set.activityId)?.name || "Activity"} - {set.count} reps
        {token && <button onClick={() => removeSet(set.id)}>Delete set</button>}
      </li>)}</ul>}
      {token && <><h2>Add a set</h2><form action={submitSet}>
        <label>Activity <select name="activityId" required>
          <option value="">Select an activity</option>
          {activities.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
        </select></label>
        <label>Reps <input name="count" type="number" min="1" required /></label>
        <button>Add set</button>
      </form></>}
    </>}
  </>;
}
