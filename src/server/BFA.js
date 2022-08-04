//used to hold collider data on the server

 //change depending on the map size present in the array of points copied.. vital to scaling the colliders sizes and locations properly

let BFA = [
    [
        -35,
        -117.5,
        173,
        -203,
        3200,
        3150.7999999999997
    ],
    [
        -368,
        -181.5,
        326,
        -175,
        3200,
        3150.7999999999997
    ],
    [
        -79,
        -149.5,
        86,
        -208,
        3200,
        3150.7999999999997
    ],
    [
        116,
        -78.5,
        177,
        -212,
        3200,
        3150.7999999999997
    ],
    [
        155,
        -47.5,
        458,
        -207,
        3200,
        3150.7999999999997
    ],
    [
        280,
        -11.5,
        87,
        -36,
        3200,
        3150.7999999999997
    ],
    [
        314,
        23.5,
        398,
        -64,
        3200,
        3150.7999999999997
    ],
    [
        274,
        -320.5,
        100,
        187,
        3542.8812408671333,
        3238.481240867132
    ],
    [
        -231,
        -131.5,
        29,
        24,
        3542.8812408671333,
        3238.481240867132
    ],
    [
        268,
        -45.5,
        63,
        40,
        3542.8812408671333,
        3238.481240867132
    ],
    [
        50,
        273.5,
        51,
        33,
        3542.8812408671333,
        3238.481240867132
    ],
    [
        -273,
        183.5,
        78,
        62,
        3542.8812408671333,
        3238.481240867132
    ],
    [
        -608,
        -236.5,
        32,
        32,
        3542.8812408671333,
        3238.481240867132
    ],
    [
        -343,
        -375.5,
        157,
        187,
        3019.1756133823587,
        3195.5841845922846
    ],
    [
        -362,
        -195.5,
        124,
        43,
        3019.1756133823587,
        3195.5841845922846
    ],
    [
        -407,
        -170.5,
        88,
        52,
        3019.1756133823587,
        3195.5841845922846
    ],
    [
        -443,
        -129.5,
        62,
        43,
        3019.1756133823587,
        3195.5841845922846
    ],
    [
        -282,
        -124.5,
        37,
        26,
        3019.1756133823587,
        3195.5841845922846
    ],
    [
        -183,
        266.5,
        285,
        182,
        3019.1756133823587,
        3195.5841845922846
    ],
    [
        104,
        296.5,
        58,
        156,
        3019.1756133823587,
        3195.5841845922846
    ],
    [
        396,
        337.5,
        144,
        97,
        3019.1756133823587,
        3195.5841845922846
    ],
    [
        -474,
        -91.5,
        61,
        188,
        3019.1756133823587,
        3195.5841845922846
    ],
    [
        -536,
        49.5,
        116,
        82,
        3019.1756133823587,
        3195.5841845922846
    ],
    [
        545,
        357.5,
        142,
        75,
        3019.1756133823587,
        3195.5841845922846
    ],
    [
        520,
        352.5,
        85,
        76,
        3019.1756133823587,
        3195.5841845922846
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