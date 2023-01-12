import { useState } from "react";
import Lottie from "lottie-react";
import "./App.css";
import { saveData } from "./assets/saveData";
import slime from "./assets/slime-test.json";

function App() {
  const [count, setCount] = useState(0);
  // const options = {
  //   animationData: slime,
  //   loop: true,
  // };
  // const { view } = useLottie(options);

  return (
    <div className="App">
      <h1>Weather Wizard</h1>
      <div className="card">
      <div>
        <Lottie className="logo" animationData={slime} loop={true} />
      </div>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
    </div>
  );
}

export default App;
