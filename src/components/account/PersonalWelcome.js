import React, { useContext } from "react";

import { AccountContext } from "../../context/AccountContext";


function PersonalWelcome(){
  const accountQuery = useContext(AccountContext);

  return (
    <div className="w-4/5 lg:flex mt-28 mb-12 z-10">
      <div className="w-5/5 flex flex-col md:flex-row justify-start text-5xl">
      <h1 className="text-[#4A6BE2]">Hello, &nbsp;</h1>
      <h1 className="break-all">{accountQuery.data.username}.</h1>
      </div>
    </div>
  )
}

export default PersonalWelcome