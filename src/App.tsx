import { Route, Routes } from "react-router-dom";
import { Cards } from "./pages/Cards";
import { Register } from "./pages/Register";
import { HomePage } from "./pages/HomePage";

function App() {
  return (
    <Routes>
      <Route path="/cards/:id" element={<Cards />} />
      <Route path="/cards/register" element={<Register />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

export default App;
