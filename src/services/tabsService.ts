// src/services/tabsService.ts
const BASE = "http://localhost:4000";

export interface DataPoint {
  date: string;
  distance: number;
}
export type ComponentType = "GRAPH" | "TABLE" | "TEXT";

export interface Tab {
  key: string;
  components: {
    id: string;
    type: ComponentType;
    data: DataPoint[];
  }[];
}

// fetch the entire tabs state
export async function fetchState(): Promise<{
  tabs: Tab[];
  activeTabKey: string;
}> {
  const res = await fetch(`${BASE}/state`);
  if (!res.ok) throw new Error(`Error ${res.status}`);
  return res.json();
}

// add one component
export async function addComponent(
  key: string,
  type: ComponentType,
  data: DataPoint[]
): Promise<Tab> {
  const res = await fetch(`${BASE}/components`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key, type, data }),
  });
  if (!res.ok) throw new Error(`Error ${res.status}`);
  return res.json();
}

// update one component
export async function updateComponent(
  id: string,
  key: string,
  data: DataPoint[]
): Promise<Tab> {
  const res = await fetch(`${BASE}/components/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key, data }),
  });
  if (!res.ok) throw new Error(`Error ${res.status}`);
  return res.json();
}

// clear all components for one tab
export async function clearComponents(key: string): Promise<void> {
  const res = await fetch(`${BASE}/components?key=${encodeURIComponent(key)}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(`Error ${res.status}`);
}

// merge home into another tab
export async function mergeHome(key: string): Promise<Tab> {
  const res = await fetch(`${BASE}/merge`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key }),
  });
  if (!res.ok) throw new Error(`Error ${res.status}`);
  return res.json();
}

// set the active tab on the server
export async function setActiveTab(key: string): Promise<void> {
  const res = await fetch(`${BASE}/activeTab`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key }),
  });
  if (!res.ok) throw new Error(`Error ${res.status}`);
}
