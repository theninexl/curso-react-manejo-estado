import { UseState } from './UseState.js';
import { ClassState } from './ClassState.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <UseState
        name='UseState'
      />
      <hr size="1"/>
      <ClassState
        name='ClassState'
      />
    </div>
  );
}

export default App;
