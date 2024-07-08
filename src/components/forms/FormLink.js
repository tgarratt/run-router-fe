import React from "react";
import { Link } from "react-router-dom";


function FormLink({text, to}){

  return (
    <div className="text-[#4A6BE2] text-center mt-3">
        <Link to={to}>{text}</Link>
    </div>
  )
}

export default FormLink