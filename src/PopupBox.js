import React, { useState } from "react"

export default function PopupBox(props) {
    return(
        <div>
            {props.visible && <div
                className="popup-box"
                style={{
                    left: props.coords[0] - 32,
                    top: props.coords[1] - 32
                }}
            ></div>}
        </div>
    )
}