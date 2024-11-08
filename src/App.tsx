import { FC, lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout/MainLayout.component";

const Home = lazy(() => import("./pages/Home/Home.component"));

const App: FC = () => {
  console.log(process.env.APP_API_URL);
  return (
    <div className="App">
      <Suspense>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
