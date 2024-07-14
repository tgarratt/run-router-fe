import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

import './styles/App.css';

import { CsrfContext } from "./context/CsrfContext";
import { AccountContext } from "./context/AccountContext";
import { MessageContext } from "./context/MessageContext";

import Links from "./Links";
import Message from "./components/global/Message";


function App() {
  // todo

  // saved maps page

  // responsive css
  // tidy code

  const [notification, setNotification] = useState(null);

  const delay = ms => new Promise(res => setTimeout(res, ms));

  const resetNotification = async () => {
    await delay(3000);
    setNotification(null)
  };

  useEffect(() => {
    if(notification){
      resetNotification();
    }
  },[notification, resetNotification])

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
        <MessageContext.Provider value={{notification, setNotification}}>
          {notification && <Message text={notification.text} colour={notification.colour} className="top" />}
          {query.isSuccess &&
            <Links />
          }
        </MessageContext.Provider>
      </CsrfContext.Provider>
    </AccountContext.Provider>
  );
}

export default App;
