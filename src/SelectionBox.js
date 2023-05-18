import React, { useEffect, useState } from "react"
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

export default function SelectionBox(props) {
    const [coordsList, setCoordsList] = useState([]);
    const firebaseConfig = {
        apiKey: "AIzaSyB-j3QScxkYhwKGSgpcpD3_5OcaSlmkDyw",
        authDomain: "waldo-2b452.firebaseapp.com",
        projectId: "waldo-2b452",
        storageBucket: "waldo-2b452.appspot.com",
        messagingSenderId: "64395669110",
        appId: "1:64395669110:web:09348ccaa25b030d307957"
    };
    const app = initializeApp(firebaseConfig);
    const coordsdb = getFirestore(app);

    async function getCoords(coordsdb) {
        const coordsCol = collection(coordsdb, 'coords');
        const coordsSnapshot = await getDocs(coordsCol);
        setCoordsList(coordsSnapshot.docs.map(doc => doc.data()));
    }

    useEffect(() => {getCoords(coordsdb)}, []);

    const [thingsToFind, setThings] = useState(['Waldo', 'Sea Monster', 'Medieval Knight', 'Too Many Hats']);
    const thingsMap = thingsToFind.map(thing => [
        <span className="thing-to-find" onClick={foundIt}>{thing}</span>
    ])

    function foundIt(e) {
        const clickedThing = e.target.textContent;
        const hitBox = coordsList[0][clickedThing];
        //hitbox is an array, pixel coordinates are [top, bottom, left, right].
        //if click is between top and bottom and left and right then it's good.
        checkHit(hitBox);
    }

    function checkHit(hitBox) {
        const clickX = props.clickCoords[0];
        const clickY = props.clickCoords[1];

        if (clickX >= hitBox[2] && 
            clickX <= hitBox[3] &&
            clickY >= hitBox[0] &&
            clickY <= hitBox[1]) {
                console.log('CORRECT!');
            } else {
                console.log('WRONG!');
            }
    }
    
    return (
        <div>
            {props.visible && <div
                className="selection-box"
                style={{
                    left: props.coords[0] + 40,
                    top: props.coords[1] - 32
                }}
            >
                {thingsMap}
            </div>}
        </div>
    )
}