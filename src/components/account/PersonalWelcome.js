import React, { useContext } from "react";

import { AccountContext } from "../../context/AccountContext";


function PersonalWelcome(){
  const accountQuery = useContext(AccountContext);

  return (
    <div className="w-4/5 lg:flex mt-28 mb-12">
      <div className="w-6/12 flex justify-start text-5xl">
      <h1 className="text-[#4A6BE2]">Hello</h1>
      <h1>, {accountQuery.data.username}.</h1>
      </div>
    </div>
  )
}

export default PersonalWelcome