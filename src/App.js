import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

import './App.css';

import MapContainer from './components/home/MapContainer';
import Nav from "./components/global/Nav";
import { CsrfContext } from "./context/CsrfContext";
import { AccountContext } from "./context/AccountContext";

function App() {
  
  // todo...


  const query = useQuery({
    queryKey: ['account'],
    queryFn: () => axios.get('api/account').then((res) => (
        res.data
    )),
    staleTime: Infinity
  });

  const csrfToken = document.cookie.replace(/(?:(?:^|.*;\s*)csrftoken\s*\=\s*([^;]*).*$)|^.*$/, '$1');

  return (
    <AccountContext.Provider value={query}>
      <CsrfContext.Provider value={csrfToken}>
        {query.isSuccess &&
          <>
            <Nav />
            <MapContainer />
          </>    
        }
      </CsrfContext.Provider>
    </AccountContext.Provider>
  );
}

export default App;
