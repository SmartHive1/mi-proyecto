const TEST_USER = {
  email: "admin@smarthive.com",
  password: "SmartHive2024",
  name: "Administrador",
  role: "admin",
};

export type User = { email: string; name: string; role: string };

export async function login(email: string, password: string) {
  await new Promise((r) => setTimeout(r, 1200));
  if (email === TEST_USER.email && password === TEST_USER.password) {
    const user: User = { email, name: TEST_USER.name, role: TEST_USER.role };
    localStorage.setItem("smarthive_user", JSON.stringify(user));
    return { success: true as const, user };
  }
  return { success: false as const, error: "Credenciales incorrectas. Intentá de nuevo." };
}

export function logout() {
  localStorage.removeItem("smarthive_user");
}

export function getStoredUser(): User | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("smarthive_user");
  return raw ? JSON.parse(raw) : null;
}
