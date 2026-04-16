import './App.css';
import Home from './Routes/Home';
import Todo from './Routes/Todo';
import Login from './Auth/Login';
import Register from './Auth/Register';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/todo' element={<Todo/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
