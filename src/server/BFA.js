//used to hold collider data on the server

let arrMapSize = 1600; //change depending on the map size present in the array of points copied.. vital to scaling the colliders sizes and locations properly

let BFA = [
    [
        60,
        188,
        88,
        84,
        3200,
        3200
    ],
    [
        108,
        -116,
        40,
        40,
        3200,
        3200
    ],
    [
        -276,
        -216,
        32,
        48,
        3200,
        3200
    ]
];

let colliders = [];
generateColliders();
//generate colliders only needs to run once at the start of the game

function generateColliders(){
    for (let i = 0; i < BFA.length; i++){
        let coordSet = [];//each temp contains 2 coordinates, and 4 elements.. 
                      //temp[0] = top left x, temp[1] = top left y, temp[2] = bottom right x, temp[3] = bottom right y
        for (let o = 0; o < 4; o++){
            //For the X coordinates
            if (BFA[i][2] < 0){//if drawn backwards
                //top left x = playerx(the player coord for when the collider was drawn) + (mouseDownX - windowWidth + width)--width is negative in this case so its actually subtracting it
                coordSet[0] = BFA[i][4] + (BFA[i][0] + BFA[i][2]);
                coordSet[2] = BFA[i][4] + (BFA[i][0]);
            }else{
                coordSet[0] = BFA[i][4] + (BFA[i][0]);
                coordSet[2] = BFA[i][4] + (BFA[i][0] + BFA[i][2]);
            }
            //For the Y coordinates
            if (BFA[i][3] < 0){//if drawn up
                //top left y = playerY(for the player when drawn) + (mousedownY - windowHeight + height)--height is negative in this case so its actually subtracting it
                coordSet[1] = BFA[i][5] + (BFA[i][1] + BFA[i][3])
                coordSet[3] = BFA[i][5] + (BFA[i][1]);
            }
            else{
                coordSet[1] = BFA[i][5] + (BFA[i][1])
                coordSet[3] = BFA[i][5] + (BFA[i][1] + BFA[i][3]);
            }  
        }
        colliders.push(coordSet); //add a set of coordinates to the array of coordinate sets
    }
    console.log(colliders);
    return (colliders); //return the array containing all the arrays of coordinates
}

function getBFA(){
    console.log('getBFA() was run');
    return colliders;
}
module.exports = getBFA;