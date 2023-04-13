import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ConnectionField } from "./Components/MainPage/ConnectionField";
import Game from "./Components/Game/Game";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ConnectionField />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
