import React, { useState } from "react"
import waldo from './waldo.jpg'
import PopupBox from "./PopupBox";
import SelectionBox from "./SelectionBox";

export default function Background(props) {
    const [boxIsVisible, setBoxVisible] = useState(false);
    const [boxCoords, setBoxCoords] = useState([0, 0]);
    const [clickCoords, setClickCoords] = useState([]);

    function checkClick(e) {
        setClickCoords([e.pageX, e.pageY]);
        setBoxCoords([e.pageX, e.pageY]);
        setBoxVisible(prevVisible => !prevVisible);
    }

    return(
        <div>
            <img
                src={waldo}
                onClick={checkClick}
            />
            <PopupBox visible={boxIsVisible} coords={boxCoords} />
            <SelectionBox visible={boxIsVisible} coords={boxCoords} coordsList={props.coordsList} clickCoords={clickCoords}/>
        </div>
    )
}