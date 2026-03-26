const BASE_URL = "http://localhost:3001";

export async function loginUser(email, password) {
  const res = await fetch(`${BASE_URL}/users?email=${email}`);
  if (!res.ok) throw new Error("Something went wrong");

  const users = await res.json();
  const user = users.find((u) => u.password === password);
  if (!user) throw new Error("Invalid email or password");

  return user;
}

export async function signupUser(userData) {
  const checkRes = await fetch(`${BASE_URL}/users?email=${userData.email}`);
  const existing = await checkRes.json();

  if (existing.length > 0) throw new Error("Email already in use");

  const res = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  return await res.json();
}
