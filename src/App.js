import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Principal from './Pages/principal';
import User from './Pages/user';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Principal />}/>
        <Route path='/user' element={<User />} />
        <Route path='/user/:id' element = {<User />} />
        <Route path='*' element={<p>Not Found</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
