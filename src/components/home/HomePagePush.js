import React, { useContext } from "react";

import { AccountContext } from "../../context/AccountContext";

import PushButton from "./PushButton";


function HomePagePush(){
  const accountQuery = useContext(AccountContext);
  
  return (
    <div className="w-4/5 text-white hidden lg:flex justify-center mt-2 mb-28">
      <div className="w-11/12 flex justify-start">
      {accountQuery.data?.authenticated ?
        <PushButton text={'View your previously saved routes'} buttonText={'View Routes'} route={'/saved-routes'} />
      :
        <PushButton text={'Sign up to save and manage your favourite routes'} buttonText={'Sign Up'} route={'/signup'} />}
      </div>
    </div>
  )
}

export default HomePagePush