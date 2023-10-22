import { BrowserRouter, Routes, Route } from 'react-router-dom'


// Pages and Components
import Home from './pages/home';
import { TopNavbar, SideNavbar } from './components/navbar';
import { StudentView } from './pages/StudentView';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <TopNavbar />
      <div className="body-wrapper">
        <SideNavbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/students" element={<StudentView></StudentView>}/>
            </Routes>
          </div>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
