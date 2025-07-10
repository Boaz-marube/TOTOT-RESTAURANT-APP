import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import HomePage from "./Pages/HomePage/Page";
import MainDishes from "./Pages/MainDishes/Page";
import Layout from "./components/Layout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/mandishes" element={<MainDishes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
