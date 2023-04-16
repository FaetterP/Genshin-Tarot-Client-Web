import { ConnectionField } from "./Components/MainPage/ConnectionField";
import Game from "./Components/Game/Game";
import { ChooseCharacters } from "./Components/Game/ChooseCharacters";
import { useSelector } from "react-redux";
import { State } from "./redux";

function App() {
  const page = useSelector((state: State) => state.service.page);

  const mapper = {
    menu: <ConnectionField />,
    characters: <ChooseCharacters />,
    game: <Game />,
  };

  return <div>{mapper[page]}</div>;
}

export default App;
