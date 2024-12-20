import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

import './styles/App.css';

import { CsrfContext } from "./context/CsrfContext";
import { AccountContext } from "./context/AccountContext";
import { MessageContext } from "./context/MessageContext";

import Links from "./Links";
import Message from "./components/global/Message";
import ModalProvider from "./provider/ModalProvider";


function App() {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const delay = ms => new Promise(res => setTimeout(res, ms));

    const resetNotification = async () => {
      await delay(3000);
      setNotification(null)
    };

    if(notification){
      resetNotification();
    }
  },[notification])

  const query = useQuery({
    queryKey: ['account'],
    queryFn: () => axios.get(`${process.env.REACT_APP_API_URL}/api/account`,{
      withCredentials: true,
    }).then((res) => (
        res.data
    )),
    onSuccess: (data) => {
        document.cookie = `csrftoken=${data.token}; Secure; SameSite=None`;
    },
    staleTime: Infinity
  });


  const csrfToken = document.cookie.replace(/(?:(?:^|.*;\s*)csrftoken\s*=\s*([^;]*).*$)|^.*$/, '$1');

  return (
    <AccountContext.Provider value={query}>
      <CsrfContext.Provider value={csrfToken}>
        <MessageContext.Provider value={{notification, setNotification}}>
          <ModalProvider>
            {notification && <Message text={notification.text} colour={notification.colour} className="top" />}
            {query.isSuccess &&
              <Links />
            }
          </ModalProvider>
        </MessageContext.Provider>
      </CsrfContext.Provider>
    </AccountContext.Provider>
  );
}

export default App;
