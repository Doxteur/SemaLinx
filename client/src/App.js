import { Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "pages/Dashboard";
import { useEffect, useState } from "react";
import Login from "components/Login";
import Request from "components/Request";

// Tailwind CSS Style Sheet
import "assets/styles/tailwind.css";
import axios from "axios";

function App() {
  const [isLogged, setIsLogged] = useState(localStorage.getItem("isLogged"));

  useEffect(() => {
    if (isLogged) {
      setIsLogged(true);
    }
  }, [isLogged]);

  return (
    <>
      {!isLogged && <Redirect to="/login" />}
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route
          exact
          path="/login"
          render={(props) => (
            <Login {...props} isLogged={isLogged} setIsLogged={setIsLogged} />
          )}
        />
        <Route exact path="/test" component={Request} />
      </Switch>
    </>
  );
}

export default App;
