import {Route, Routes} from "react-router";
import {Layout} from "./components/Layout.tsx";
import {SeriesOverview} from "./components/SeriesOverview.tsx";
import {Watchlist} from "./components/Watchlist.tsx";

function App() {

  return (
    <Routes>
        <Route path="/" element={<Layout/>}>
            <Route path="/series" element={<SeriesOverview/>}/>
            <Route path="/watchlist" element={<Watchlist/>}/>
        </Route>
    </Routes>
  )
}

export default App
