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

  useEffect(() => {
    const getLoggedInStatus = async () => {
      try {
        const response = await axios
          .post(`/api/v1/users/status`)
          .then((data) => {
            console.log("is loggedin", data);
            setIsLoggedIn(data.loggedIn);
            console.log(isLoggedIn);
          });
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
