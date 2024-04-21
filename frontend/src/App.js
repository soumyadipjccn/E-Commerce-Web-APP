import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="">
      <>
        <Header/>
        <main>
        <Outlet/>
        </main>
        <Footer/>
      </>
    </div>
  );
}

export default App;
