import { ConnectionField } from "./Components/MainPage/ConnectionField";
import Game from "./Components/Game/Game";
import { ChooseCharacters } from "./Components/Game/ChooseCharacters/ChooseCharacters";
import { useDispatch, useSelector } from "react-redux";
import { State } from "./redux";
import "./global.scss";
import { getBrowserLang } from "./utils/langUtils";
import { changeLanguage } from "./redux/lang";
import { useEffect } from "react";

function App() {
  const page = useSelector((state: State) => state.service.page);
  const dispatch = useDispatch();

  useEffect(() => {
    const language = getBrowserLang();
    dispatch(changeLanguage({ language }));
  }, []);

  const mapper = {
    menu: <ConnectionField />,
    characters: <ChooseCharacters />,
    game: <Game />,
  };

  return <div>{mapper[page]}</div>;
}

export default App;
