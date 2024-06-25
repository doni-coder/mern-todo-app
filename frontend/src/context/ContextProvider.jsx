import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { createContext } from "react";
axios.defaults.withCredentials = true;

const todoContext = createContext();

const ContextProvider = ({ children }) => {
  
  const [tasksCount, setTaskCount] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const ApiUrl = "https://mern-todo-app-backend-ppfx.onrender.com"

  useEffect(() => {
    const getLoggedInStatus = async () => {
      try {
        const response = await axios.post(`${ApiUrl}/api/v1/users/status`);
        const data = response.data;
        console.log("isloggedin", data);
        setIsLoggedIn(data.data.loggedIn);
        console.log("LoggedIn status:", data.data.loggedIn);
      } catch (error) {
        console.log("Error: getLoggedInStatus", error);
      } finally {
        setIsLoading(false);
      }
    };
    getLoggedInStatus();
  }, []);

  return (
    <todoContext.Provider
      value={{
        tasksCount,
        setTaskCount,
        tasks,
        setTasks,
        isLoggedIn,
        setIsLoggedIn,
        isLoading,
        setIsLoading,
        ApiUrl
      }}
    >
      {children}
    </todoContext.Provider>
  );
};

const useTodoContext = () => {
  return useContext(todoContext);
};

export { useTodoContext };
export default ContextProvider;
