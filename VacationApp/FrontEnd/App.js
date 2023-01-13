import logo from './logo.svg';
import './App.css';
import {  BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Login from'./component/Login/Login'
import Register from './component/Register/Register'
import VacationCalendar from "./calendar/Calendar"
import Navbar from '../src/component/navbar/Navbar'
import Formular from "./component/formular/Formular";
import List from "./component/List/List";
function App() {
  return (
      <Router>
          <Navbar/>
          <Routes>
              <Route exact path='/' exact element={<Login/>}></Route>
              <Route exact path='/register' exact element={<Register/>}></Route>
              <Route exact path='/login' exact element={<Login/>}></Route>
              <Route exact path='/calendar' exact element={<VacationCalendar/>}></Route>
              <Route exact path='/list' exact element={<List/>}></Route>
              <Route exact path='/formular' exact element={<Formular/>}></Route>
          </Routes>
      </Router>
  );
}

export default App;
