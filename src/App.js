import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

import './styles/App.css';

import Nav from "./components/global/Nav";
import { CsrfContext } from "./context/CsrfContext";
import { AccountContext } from "./context/AccountContext";
import Links from "./Links";
import runRouterBg from "./media/runRouterBg.png";

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
          <div style={{backgroundImage: `url(${runRouterBg})`}}>
            <Nav />
            <Links />
          </div>
        }
      </CsrfContext.Provider>
    </AccountContext.Provider>
  );
}

export default App;
