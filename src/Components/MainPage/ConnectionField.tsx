import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { connectToWS } from "../../ws";

export function ConnectionField() {
  const goToPage = useNavigate();
  const formik = useFormik({
    initialValues: {
      url: "localhost:8999",
    },
    onSubmit: (values) => {
      connectToWS(values.url);
      goToPage("/game");
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <h1>Введите url для подключения</h1>
        <input
          name="url"
          onChange={formik.handleChange}
          value={formik.values.url}
        />
        <button type="submit">Подключиться</button>
      </form>
    </div>
  );
}
