import { defaultUser } from "../../config/defaultUser";

const setupUser = async () => {
  try {
    await fetch("http://localhost:3001/users/delete-by-email", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: defaultUser.email }),
    });

    const roleRes = await fetch("http://localhost:3001/users/role", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "traveler3", permissions: ["read", "create"] }),
    });
    const roleData = await roleRes.json();

    await fetch("http://localhost:3001/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nickname: defaultUser.nickname,
        email: defaultUser.email,
        password: defaultUser.password,
        roleId: roleData.id || 1,
      }),
    });

    const loginRes = await fetch("http://localhost:3001/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: defaultUser.email, password: defaultUser.password }),
    });
    const loginData = await loginRes.json();

    localStorage.setItem("token", loginData.accessToken);
    return true;
  } catch (e) {
    console.error("Setup error:", e);
    return false;
  }
};

export default setupUser;
