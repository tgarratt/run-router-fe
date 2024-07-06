import React from "react";


function FormInput(props){

  return (
    <input
        {...props}
        className="my-2 rounded-md pr-1 pl-2 pt-1 pb-1 w-full"
    />
  )
}

export default FormInput