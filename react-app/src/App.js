import { Route, Switch } from "react-router-dom";
import Header from "./components/UI/Header";
// import Body from "./components/UI/Body";
import IsraelMap from "./components/Tests/IsraelMap";
import Sites from "./components/Sites/Sites";
function App() {
  return (
    <>
      <Header />
      <main>
        <Switch>
          <Route path="/" exact>
            <IsraelMap />
          </Route>
          <Route path="/sites/:siteId" exact>
            <Sites />
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;
