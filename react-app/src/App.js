import { Route, Switch } from "react-router-dom";
import Header from "./components/UI/Header";
// import Body from "./components/UI/Body";
import IsraelMap from "./components/Tests/IsraelMap";
import Sites from "./components/Sites/Sites";
import FloatingButton from "./components/Accessibility/FloatingButton";

function App() {
  return (
    <div>
      <Header />
      <FloatingButton />
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
    </div>
  );
}

export default App;
