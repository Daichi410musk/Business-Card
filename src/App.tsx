import { Route, Routes } from "react-router-dom";
import { Cards } from "./components/Pages/Cards";

function App() {
  return (
    <Routes>
      <Route path="/cards/:id" element={<Cards />} />
    </Routes>
  );
}

export default App;
