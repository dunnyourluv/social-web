import { UserInfo } from "../data/users";
import useUser from "./useUser";

function useAuth() {
  const { getUserByUsername } = useUser();
  function savesesion(user: UserInfo) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  function getUser(): UserInfo | null {
    const user = localStorage.getItem("user");
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  function logout() {
    localStorage.removeItem("user");
    window.location.reload();
  }

  function login(username: string, password: string) {
    let error = "";
    const user = getUserByUsername(username);
    if (user) {
      if (user.password === password) {
        savesesion(user);
      } else {
        error = "Password is incorrect!";
      }
    } else {
      error = "Username is incorrect!";
    }
    return { error, user };
  }

  function register({
    username,
    password,
    name,
    avatar,
  }: {
    username: string;
    password: string;
    name: string;
    avatar: string;
  }) {
    let error = "";
    const user = getUserByUsername(username);
    if (user) {
        error = "Username is already taken!";
        }
    else {
        const newUser = {
            id: Date.now().toString(),
            username,
            password,
            name,
            avatar,
        };
        savesesion(newUser);
    }
    return { error, user };
  }

  return { login, logout, getUser, savesesion, register };
}

export default useAuth;
