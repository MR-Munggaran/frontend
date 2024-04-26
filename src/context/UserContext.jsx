import { createContext, useEffect, useState } from "react";

export const Usercontext = createContext();

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);
  return (
    <Usercontext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </Usercontext.Provider>
  );
};

export default UserProvider;
