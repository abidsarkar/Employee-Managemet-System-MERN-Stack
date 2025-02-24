import React, { createContext, useEffect, useState } from "react";
import { getLocalStorage } from "../utils/LocalStroage";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { employees, admin } = getLocalStorage();
    setUserData({ employees: employees || [], admin: admin || null });
    setLoading(false); // Set loading to false after fetching data
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Prevents rendering children before data is available
  }

  return (
    <AuthContext.Provider value={userData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
