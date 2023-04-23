import { Route, Switch } from "react-router-dom";
import Header from "./components/UI/Header";
// import Body from "./components/UI/Body";
import IsraelMap from "./components/Tests/IsraelMap";
import Sites from "./components/Sites/Sites";
import FloatingButton from "./components/Accessibility/FloatingButton";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
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
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;
