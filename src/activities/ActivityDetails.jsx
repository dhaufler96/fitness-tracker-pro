import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";
import { getActivity, deleteActivity } from "../api/activities";
export default function ActivityDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [activity, setActivity] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => { getActivity(id).then(setActivity).catch(e => setError(e.message)); }, [id]);
  async function remove() {
    setError("");
    try { await deleteActivity(token, id); navigate("/activities"); }
    catch (e) { setError(e.message); }
  }
  return <><h1>Activity Details</h1>{error && <p role="alert">{error}</p>}
    {activity && <><h2>{activity.name}</h2><p>{activity.description}</p>
      <p>Created by: {activity.creatorName || activity.creator?.username || activity.creator?.name || "Unknown"}</p>
      {token && <button onClick={remove}>Delete</button>}</>}
  </>;
}
