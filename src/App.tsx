import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ConnectionField } from "./Components/MainPage/ConnectionField";
import Game from "./Components/Game/Game";
import { Provider } from "react-redux";
import { store } from "./redux";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ConnectionField />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
