import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import HomePage from "./Pages/HomePage/Page";
import MainDishes from "./Pages/MainDishes/Page";
import Drinks from "./Pages/Drinks/Page";
import Layout from "./components/Layout";
import Desserts from "./Pages/Desserts/Page";
import Starters from "./Pages/Starters/Page";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/mandishes" element={<MainDishes />} />
          <Route path="/drinks" element={<Drinks />} />
          <Route path="/desserts" element={<Desserts />} />
          <Route path="/starter" element={<Starters />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
