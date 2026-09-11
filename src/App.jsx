import "./App.css";
import { Routes, Route } from "react-router";
import Header from "./shared/Header";
import Logon from "./features/Logon";
import TodosPage from "./pages/TodosPage";

function App() {
  return (
    <>
      <Header />
      <Routes>{/* Routes */}</Routes>
    </>
  );
}

export default App;
