import { useFormik } from "formik";
import { connectToWS } from "../../ws";
import { useDispatch } from "react-redux";
import { setPage } from "../../redux/service";

export function ConnectionField() {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      url: "localhost:8999",
    },
    onSubmit: (values) => {
      connectToWS(values.url);
      dispatch(setPage({ page: "characters" }));
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
