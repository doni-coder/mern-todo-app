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
  
  const apiUrl = "http://localhost:5000";

  useEffect(() => {
    const getLoggedInStatus = async () => {
      try {
        const response = await axios.post(`${apiUrl}/api/v1/users/status`);
        console.log(response.data);
        const data = response.data;
        setIsLoggedIn(data.data.loggedIn);
        console.log(isLoggedIn);
      } catch (error) {
        console.log("Error : getLoggedInStatus", error);
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
        apiUrl,
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
