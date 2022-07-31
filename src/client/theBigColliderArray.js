//this entire script is made just to hold collision data and send it to the colliderGenerator...
//it is effectively just for debugging colliders, since it will also need to be present on the 
//server which will be calculating all the collisions to prevent cheating and keep it in the true .io fashion.

const Constants = require('../shared/constants');

let arrMapSize = 1600; //change depending on the map size present in the array of points copied.. vital to scaling the colliders sizes and locations properly

let BFA = [
    [
        15,
        47,
        22,
        21,
        800,
        800
    ],
    [
        27,
        -29,
        10,
        10,
        800,
        800
    ],
    [
        -69,
        -54,
        8,
        12,
        800,
        800
    ]
];


export function getBFA(){
    console.log('getBFA() was run');
    return BFA;
}
export function getBFAMapSize(){
    return arrMapSize;
}