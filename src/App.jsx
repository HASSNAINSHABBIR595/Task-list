import Background from "./Components/Background";
import Forground from "./Components/Forground";

const App = () => {
  return (
    <div className="relative w-full h-screen bg-zinc-800">
      <Background />
      <Forground />
    </div>
  );
};

export default App;
