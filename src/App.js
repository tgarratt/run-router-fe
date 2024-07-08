import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

import './styles/App.css';

import { CsrfContext } from "./context/CsrfContext";
import { AccountContext } from "./context/AccountContext";
import Links from "./Links";

function App() {
  // todo

  // profile icon
  // edit accounts UI is a mess

  // saved maps page

  // notification system 'logged out successfully' etc

  // accept cookies to use the app

  // responsive css
  // tidy code

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
          <Links />
        }
      </CsrfContext.Provider>
    </AccountContext.Provider>
  );
}

export default App;
