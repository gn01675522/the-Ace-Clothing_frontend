import { Suspense } from "react";

import MainRoutes from "./routes/Main.routes";
import { Loading } from "./components/index";

import type { FC } from "react";

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
