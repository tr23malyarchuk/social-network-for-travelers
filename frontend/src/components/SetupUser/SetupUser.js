import { defaultUser } from "../../config/defaultUser";

const setupUser = async () => {
  try {
    const roleRes = await fetch("http://localhost:3001/users/role", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "traveler3", permissions: ["read", "create"] }),
    });
    const { id: roleId = 1 } = await roleRes.json();

    await fetch("http://localhost:3001/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...defaultUser, roleId }),
    });

    const loginRes = await fetch("http://localhost:3001/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: defaultUser.email, password: defaultUser.password }),
    });
    const { accessToken } = await loginRes.json();

    localStorage.setItem("token", accessToken);
    return true;
  } catch {
    return false;
  }
};

export default setupUser;
