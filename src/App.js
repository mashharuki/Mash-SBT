import { useState } from 'react';
import './App.css';
import MainMint from './MainMint';
import NavBar from './NavBar';

function App() {
  const [accounts, setAccounts] = useState([]);
  const [isMinted, setIsMinted] = useState(false);

  return (
    <div className="App">
      <NavBar
        accounts={accounts}
        setAccounts={setAccounts}
        isMinted={isMinted}
        setIsMinted={setIsMinted}
      />
      <MainMint
        accounts={accounts}
        setAccounts={setAccounts}
        isMinted={isMinted}
        setIsMinted={setIsMinted}
      />
    </div>
  );
}

export default App;
