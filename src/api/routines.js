const API = import.meta.env.VITE_API;

async function send(path, options) {
  const response = await fetch(API + path, options);
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw Error(data.message || "Request failed");
  }
  if (response.status === 204) return;
  return response.json();
}

export function getRoutines() {
  return send("/routines");
}

export function getRoutine(id) {
  return send("/routines/" + id);
}

export function createRoutine(token, routine) {
  return send("/routines", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
    body: JSON.stringify(routine),
  });
}

export function deleteRoutine(token, id) {
  return send("/routines/" + id, {
    method: "DELETE", headers: { Authorization: "Bearer " + token },
  });
}

export function addSet(token, id, set) {
  return send("/routines/" + id + "/sets", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
    body: JSON.stringify(set),
  });
}

export function deleteSet(token, id) {
  return send("/sets/" + id, {
    method: "DELETE", headers: { Authorization: "Bearer " + token },
  });
}
