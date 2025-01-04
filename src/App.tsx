import { FC, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// import ClientRoutes from "./routes/Client.routes";
// import AdminRoutes from "./routes/Admin.routes";

const ClientRoutes = lazy(() => import("./routes/Client.routes"));
const AdminRoutes = lazy(() => import("./routes/Admin.routes"));
const Login = lazy(() => import("./pages/Login/Login.component"));
const Loading = lazy(() => import("./components/Loading/Loading.component"));

const App: FC = () => {
  return (
    <div className="App">
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="*" element={<ClientRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
