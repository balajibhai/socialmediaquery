// src/services/tabsService.js

const BASE = "http://localhost:4000";

export async function fetchState() {
  const res = await fetch(`${BASE}/state`);
  if (!res.ok) throw new Error(`Error ${res.status}`);
  return await res.json();
}

export async function addComponent(key, type, data) {
  const res = await fetch(`${BASE}/components`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key, type, data }),
  });
  if (!res.ok) throw new Error(`Error ${res.status}`);
  return await res.json();
}

export async function updateComponent(id, key, data) {
  const res = await fetch(`${BASE}/components/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key, data }),
  });
  if (!res.ok) throw new Error(`Error ${res.status}`);
  return await res.json();
}

export async function clearComponents(key) {
  const res = await fetch(`${BASE}/components?key=${encodeURIComponent(key)}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(`Error ${res.status}`);
  // no JSON body on 204
}

export async function mergeHome(key) {
  const res = await fetch(`${BASE}/merge`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key }),
  });
  if (!res.ok) throw new Error(`Error ${res.status}`);
  return await res.json();
}

export async function setActiveTab(key) {
  const res = await fetch(`${BASE}/activeTab`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key }),
  });
  if (!res.ok) throw new Error(`Error ${res.status}`);
}
