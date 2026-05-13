const BASE = 'http://localhost:3000/guardx';

export async function getOverview() {

  const res =
    await fetch(
      `${BASE}/overview`
    );

  return await res.json();
}

export async function getRPS() {

  const res =
    await fetch(
      `${BASE}/rps`
    );

  return await res.json();
}

export async function getIps() {
  const res =
    await fetch(
    `${BASE}/top_ips`
    )

  return await res.json();
}
