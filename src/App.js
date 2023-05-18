import Background from "./Background";
import React, { useState } from "react"


function App(props) {
  
  return (
    <div>
      <Background coordsList={props.coordsList}/>
    </div>
  );
}

export default App;
