import React from "react";


function Form({onSubmit, children}){

  return (
    <form onSubmit={onSubmit} className="flex flex-col">
      {children}
    </form>
  )
}

export default Form