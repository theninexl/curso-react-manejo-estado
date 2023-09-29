import { UseState } from './UseState.js';
import { UseReducer } from './useReducer.js';
import './App.css';


function App() {
  return (
    <div className="App">
      <UseState
        name='UseState'
      />
      <hr size="1"/>
      <UseReducer
        name='UseReducer'
      />
      
    </div>
  );
}

export default App;
