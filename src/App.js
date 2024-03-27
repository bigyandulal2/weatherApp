import React, { useState, useEffect } from "react";
import "./App.css";
import CardName from "./Components/CardName";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
const App = () => {
  return (
    <div className="App">
      <Header />
      <CardName />
      <Footer />
    </div>
  );
};

export default App;
