
import './App.css'
import Sidebar from './components/Sidebar'
import Home from './pages/Home/Home.jsx'
import PlayerBox from './components/Player.jsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Browse from './pages/Home/Browse.jsx';
import Library from './pages/Home/Library.jsx';
import Topbar from './components/Topbar.jsx';


function App() {


  return (
    <Router>
      <div className='app' >
        <Sidebar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/browse' element={<Browse />} />
          <Route path='/library' element={<Library />} />
        </Routes>
        <PlayerBox />
      </div>


    </Router>
  )
}

export default App
