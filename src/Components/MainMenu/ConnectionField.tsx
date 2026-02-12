import { useFormik } from "formik";
import { connectToWS } from "../../ws";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../redux/service";
import { State } from "../../redux";

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

  const enterUrlText =
    useSelector((state: State) => state.lang.service.enterUrl) || "service.enterUrl";
  const connectText =
    useSelector((state: State) => state.lang.service.connect) || "service.connect";

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <h1>{enterUrlText}</h1>
        <input name="url" onChange={formik.handleChange} value={formik.values.url} />
        <button type="submit">{connectText}</button>
      </form>
    </div>
  );
}
