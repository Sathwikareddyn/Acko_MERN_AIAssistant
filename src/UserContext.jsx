import { createContext, useContext, useState } from "react";

// Create context
const UserContext = createContext();

// Create provider
export const UserProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null); // 'doctor' or 'patient'

  return (
    <UserContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use context
export const useUser = () => useContext(UserContext);
