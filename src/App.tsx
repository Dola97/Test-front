import { Route, Routes } from "react-router-dom";
import { AppLayout, AuthLayout } from "./app/layouts";
import { HomePage, SignInPage } from "./app/pages";

const App = () => {
  return (
    <Routes>
      {/* <Protected Routes> */}
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>
      {/* <Protected Routes /> */}

      {/* <Auth Routes> */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<SignInPage />} />
      </Route>
      {/* <Auth Routes /> */}
    </Routes>
  );
};

export default App;
