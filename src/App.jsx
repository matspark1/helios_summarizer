import Hero from "./components/hero";
import Demo from "./components/demo";
import Nav from "./components/nav";
import "./styles/css/App.css";

const App = () => {
  return (
    <div className="">
      <div className="gradient" />
      <div className="app">
        <Nav />
        <Hero />
        <Demo />
      </div>
    </div>
  );
};

export default App;
