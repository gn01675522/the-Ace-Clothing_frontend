import { lazy, Suspense } from "react";

import MainRoutes from "./routes/Main.routes";

import type { FC } from "react";

const Loading = lazy(() => import("./components/Loading/Loading.component"));

const App: FC = () => {
  return (
    <div className="App">
      <Suspense fallback={<Loading />}>
        <MainRoutes />
      </Suspense>
    </div>
  );
};

export default App;
