import {Routes, Route, BrowserRouter} from 'react-router-dom';
import './App.css';
import AddCompany from './components/AddCompany';
import Home from './components/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/add-company' element={<AddCompany/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
