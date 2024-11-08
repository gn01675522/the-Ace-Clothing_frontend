import { FC, lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout/MainLayout.component";

const App: FC = () => {
  return (
    <div className="App">
      <Suspense>
        <Routes>
          <Route path="/" element={<MainLayout />}></Route>
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
