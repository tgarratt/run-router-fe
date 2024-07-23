import React from "react";


function SaveRouteForm({setRouteName, routeName, setRouteDescription, routeDescription}){
  return (
    <div className="flex flex-col mx-6">
      <label htmlFor="email" className="font-medium my-auto text-white">Route Name*</label>
      <div className="flex">
        <input
            type="text"
            id="routeName"
            name="routeName"
            placeholder="my new route"
            aria-label="routeName"
            value={routeName}
            onChange={(e) => {setRouteName(e.target.value)}}
            required
            autoComplete="on"
            className={`bg-slate-200 rounded mb-4 pl-2 w-full`}
        />
      </div>
      <div className="flex justify-between my-auto text-white">
        <label htmlFor="email" className="font-medium">Small Description</label>
        <p className={`text-xs ${routeDescription.length > 100 ? 'text-[#ff0000]' : 'text-white'}`}>{routeDescription.length}/100</p>
      </div>
      <div className="flex">
        <textarea
            type="text"
            id="routeDescription"
            name="routeDescription"
            placeholder="small description..."
            aria-label="routeDescription"
            value={routeDescription}
            onChange={(e) => {setRouteDescription(e.target.value)}}
            required
            autoComplete="on"
            className={`bg-slate-200 rounded mb-4 pl-2 w-full`}
        />
      </div>
    </div>
  )
}

export default SaveRouteForm