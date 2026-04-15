import './App.css';
import Home from './Routes/Home';
import Todo from './Routes/Todo';

import { BrowserRouter,Routes,Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/todo' element={<Todo/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
