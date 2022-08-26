//used to hold collider data on the server

 //change depending on the map size present in the array of points copied.. vital to scaling the colliders sizes and locations properly

let BFA = [
    [
        125.5,
        -90,
        109,
        188,
        2264.259554412564,
        3115.601818829281
    ],
    [
        125.5,
        -90,
        109,
        188,
        2264.259554412564,
        3115.601818829281
    ],
    [
        193.5,
        101,
        140,
        55,
        2264.259554412564,
        3115.601818829281
    ],
    [
        193.5,
        101,
        140,
        55,
        2264.259554412564,
        3115.601818829281
    ],
    [
        159.5,
        -125,
        269,
        30,
        2264.259554412564,
        3115.601818829281
    ],
    [
        159.5,
        -125,
        269,
        30,
        2264.259554412564,
        3115.601818829281
    ],
    [
        233.5,
        -102,
        101,
        202,
        2264.259554412564,
        3115.601818829281
    ],
    [
        233.5,
        -102,
        101,
        202,
        2264.259554412564,
        3115.601818829281
    ],
    [
        320.5,
        -115,
        45,
        72,
        2264.259554412564,
        3115.601818829281
    ],
    [
        320.5,
        -115,
        45,
        72,
        2264.259554412564,
        3115.601818829281
    ],
    [
        362.5,
        -121,
        35,
        53,
        2264.259554412564,
        3115.601818829281
    ],
    [
        362.5,
        -121,
        35,
        53,
        2264.259554412564,
        3115.601818829281
    ],
    [
        255.5,
        -217,
        186,
        94,
        2264.259554412564,
        3115.601818829281
    ],
    [
        255.5,
        -217,
        186,
        94,
        2264.259554412564,
        3115.601818829281
    ],
    [
        226.5,
        -185,
        48,
        55,
        2264.259554412564,
        3115.601818829281
    ],
    [
        226.5,
        -185,
        48,
        55,
        2264.259554412564,
        3115.601818829281
    ],
    [
        195.5,
        -155,
        42,
        28,
        2264.259554412564,
        3115.601818829281
    ],
    [
        195.5,
        -155,
        42,
        28,
        2264.259554412564,
        3115.601818829281
    ],
    [
        130.5,
        49,
        241,
        54,
        2455.6910377492864,
        2818.545335492558
    ],
    [
        130.5,
        49,
        241,
        54,
        2455.6910377492864,
        2818.545335492558
    ],
    [
        227.5,
        13,
        149,
        42,
        2455.6910377492864,
        2818.545335492558
    ],
    [
        227.5,
        13,
        149,
        42,
        2455.6910377492864,
        2818.545335492558
    ],
    [
        239.5,
        97,
        89,
        70,
        2455.6910377492864,
        2818.545335492558
    ],
    [
        239.5,
        97,
        89,
        70,
        2455.6910377492864,
        2818.545335492558
    ],
    [
        308.5,
        81,
        61,
        56,
        2455.6910377492864,
        2818.545335492558
    ],
    [
        308.5,
        81,
        61,
        56,
        2455.6910377492864,
        2818.545335492558
    ],
    [
        -109.5,
        70,
        405,
        49,
        2917.7803521967912,
        2731.6007305698326
    ],
    [
        -109.5,
        70,
        405,
        49,
        2917.7803521967912,
        2731.6007305698326
    ],
    [
        -101.5,
        107,
        398,
        85,
        2917.7803521967912,
        2731.6007305698326
    ],
    [
        -101.5,
        107,
        398,
        85,
        2917.7803521967912,
        2731.6007305698326
    ],
    [
        -171.5,
        15,
        144,
        100,
        3371.4049760275084,
        2812.111824468437
    ],
    [
        -171.5,
        15,
        144,
        100,
        3371.4049760275084,
        2812.111824468437
    ],
    [
        -241.5,
        98,
        201,
        54,
        3371.4049760275084,
        2812.111824468437
    ],
    [
        -241.5,
        98,
        201,
        54,
        3371.4049760275084,
        2812.111824468437
    ],
    [
        -209.5,
        125,
        168,
        49,
        3371.4049760275084,
        2812.111824468437
    ],
    [
        -209.5,
        125,
        168,
        49,
        3371.4049760275084,
        2812.111824468437
    ],
    [
        -51.5,
        48,
        187,
        71,
        3371.4049760275084,
        2812.111824468437
    ],
    [
        -51.5,
        48,
        187,
        71,
        3371.4049760275084,
        2812.111824468437
    ],
    [
        -59.5,
        105,
        202,
        110,
        3371.4049760275084,
        2812.111824468437
    ],
    [
        -59.5,
        105,
        202,
        110,
        3371.4049760275084,
        2812.111824468437
    ],
    [
        -16.5,
        198,
        159,
        44,
        3371.4049760275084,
        2812.111824468437
    ],
    [
        -16.5,
        198,
        159,
        44,
        3371.4049760275084,
        2812.111824468437
    ],
    [
        -105.5,
        84,
        309,
        216,
        3613.529976027509,
        2812.111824468437
    ],
    [
        -105.5,
        84,
        309,
        216,
        3613.529976027509,
        2812.111824468437
    ],
    [
        -145.5,
        205,
        63,
        58,
        3613.529976027509,
        2812.111824468437
    ],
    [
        -145.5,
        205,
        63,
        58,
        3613.529976027509,
        2812.111824468437
    ],
    [
        -129.5,
        113,
        142,
        189,
        3917.729976027508,
        2812.111824468437
    ],
    [
        -129.5,
        113,
        142,
        189,
        3917.729976027508,
        2812.111824468437
    ],
    [
        -165.5,
        29,
        111,
        192,
        4064.9820358917304,
        2921.0409441968814
    ],
    [
        -165.5,
        29,
        111,
        192,
        4064.9820358917304,
        2921.0409441968814
    ],
    [
        -259.5,
        -34,
        76,
        221,
        4257.104390654118,
        3019.23829895927
    ],
    [
        -259.5,
        -34,
        76,
        221,
        4257.104390654118,
        3019.23829895927
    ],
    [
        -303.5,
        98,
        68,
        62,
        4257.104390654118,
        3019.23829895927
    ],
    [
        -303.5,
        98,
        68,
        62,
        4257.104390654118,
        3019.23829895927
    ],
    [
        -233.5,
        163,
        142,
        61,
        4257.104390654118,
        3019.23829895927
    ],
    [
        -233.5,
        163,
        142,
        61,
        4257.104390654118,
        3019.23829895927
    ],
    [
        -196.5,
        -1,
        146,
        171,
        4257.104390654118,
        3019.23829895927
    ],
    [
        -196.5,
        -1,
        146,
        171,
        4257.104390654118,
        3019.23829895927
    ],
    [
        -70.5,
        40,
        105,
        132,
        4257.104390654118,
        3019.23829895927
    ],
    [
        -70.5,
        40,
        105,
        132,
        4257.104390654118,
        3019.23829895927
    ],
    [
        -104.5,
        62,
        256,
        131,
        4388.459671067237,
        3017.437608983829
    ],
    [
        -104.5,
        62,
        256,
        131,
        4388.459671067237,
        3017.437608983829
    ],
    [
        -109.5,
        38,
        243,
        159,
        4615.309671067225,
        3017.437608983829
    ],
    [
        -109.5,
        38,
        243,
        159,
        4615.309671067225,
        3017.437608983829
    ],
    [
        115.5,
        66,
        73,
        131,
        4615.309671067225,
        3017.437608983829
    ],
    [
        115.5,
        66,
        73,
        131,
        4615.309671067225,
        3017.437608983829
    ],
    [
        177.5,
        98,
        44,
        92,
        4615.309671067225,
        3017.437608983829
    ],
    [
        177.5,
        98,
        44,
        92,
        4615.309671067225,
        3017.437608983829
    ],
    [
        -122.5,
        -192,
        42,
        413,
        4955.496925650494,
        3336.701651864101
    ],
    [
        -122.5,
        -192,
        42,
        413,
        4955.496925650494,
        3336.701651864101
    ],
    [
        -447.5,
        -213,
        380,
        375,
        4912.982130431654,
        3402.561846583161
    ],
    [
        -447.5,
        -213,
        380,
        375,
        4912.982130431654,
        3402.561846583161
    ],
    [
        -2.5,
        -177,
        274,
        68,
        4472.776536212394,
        3707.7573406233323
    ],
    [
        -2.5,
        -177,
        274,
        68,
        4472.776536212394,
        3707.7573406233323
    ],
    [
        -25.5,
        -158,
        262,
        75,
        4472.776536212394,
        3707.7573406233323
    ],
    [
        -25.5,
        -158,
        262,
        75,
        4472.776536212394,
        3707.7573406233323
    ],
    [
        -64.5,
        -186,
        76,
        65,
        4472.776536212394,
        3707.7573406233323
    ],
    [
        -64.5,
        -186,
        76,
        65,
        4472.776536212394,
        3707.7573406233323
    ],
    [
        -190.5,
        -266,
        180,
        121,
        4472.776536212394,
        3707.7573406233323
    ],
    [
        -190.5,
        -266,
        180,
        121,
        4472.776536212394,
        3707.7573406233323
    ],
    [
        -145.5,
        -63,
        52,
        20,
        4472.776536212394,
        3707.7573406233323
    ],
    [
        -145.5,
        -63,
        52,
        20,
        4472.776536212394,
        3707.7573406233323
    ],
    [
        -39.5,
        -254,
        345,
        121,
        4155.8488587979655,
        3431.640119433087
    ],
    [
        -39.5,
        -254,
        345,
        121,
        4155.8488587979655,
        3431.640119433087
    ],
    [
        24.5,
        -157,
        281,
        74,
        4155.8488587979655,
        3431.640119433087
    ],
    [
        24.5,
        -157,
        281,
        74,
        4155.8488587979655,
        3431.640119433087
    ],
    [
        63.5,
        -92,
        244,
        36,
        4155.8488587979655,
        3431.640119433087
    ],
    [
        63.5,
        -92,
        244,
        36,
        4155.8488587979655,
        3431.640119433087
    ],
    [
        93.5,
        -65,
        208,
        32,
        4155.8488587979655,
        3431.640119433087
    ],
    [
        93.5,
        -65,
        208,
        32,
        4155.8488587979655,
        3431.640119433087
    ],
    [
        123.5,
        -39,
        198,
        55,
        4155.8488587979655,
        3431.640119433087
    ],
    [
        123.5,
        -39,
        198,
        55,
        4155.8488587979655,
        3431.640119433087
    ],
    [
        100.5,
        -94,
        52,
        20,
        3712.582484486243,
        3290.6237451213615
    ],
    [
        100.5,
        -94,
        52,
        20,
        3712.582484486243,
        3290.6237451213615
    ],
    [
        -121.5,
        -133,
        18,
        12,
        3434.3013048935773,
        3243.7425655286947
    ],
    [
        -121.5,
        -133,
        18,
        12,
        3434.3013048935773,
        3243.7425655286947
    ],
    [
        -155.5,
        176,
        63,
        28,
        3434.3013048935773,
        3243.7425655286947
    ],
    [
        -155.5,
        176,
        63,
        28,
        3434.3013048935773,
        3243.7425655286947
    ],
    [
        167.5,
        87,
        44,
        52,
        3434.3013048935773,
        3414.6925655286946
    ],
    [
        167.5,
        87,
        44,
        52,
        3434.3013048935773,
        3414.6925655286946
    ],
    [
        -15.5,
        119,
        139,
        100,
        3434.3013048935773,
        3414.6925655286946
    ],
    [
        -15.5,
        119,
        139,
        100,
        3434.3013048935773,
        3414.6925655286946
    ],
    [
        113.5,
        146,
        143,
        96,
        3434.3013048935773,
        3414.6925655286946
    ],
    [
        113.5,
        146,
        143,
        96,
        3434.3013048935773,
        3414.6925655286946
    ],
    [
        252.5,
        180,
        94,
        76,
        3434.3013048935773,
        3414.6925655286946
    ],
    [
        252.5,
        180,
        94,
        76,
        3434.3013048935773,
        3414.6925655286946
    ],
    [
        49.5,
        -210,
        321,
        378,
        3395.2607150972444,
        3832.967764670697
    ],
    [
        49.5,
        -210,
        321,
        378,
        3395.2607150972444,
        3832.967764670697
    ],
    [
        23.5,
        150,
        354,
        175,
        3395.2607150972444,
        3832.967764670697
    ],
    [
        23.5,
        150,
        354,
        175,
        3395.2607150972444,
        3832.967764670697
    ],
    [
        77.5,
        0,
        131,
        178,
        3311.6951253009115,
        4142.733354467027
    ],
    [
        77.5,
        0,
        131,
        178,
        3311.6951253009115,
        4142.733354467027
    ],
    [
        46.5,
        128,
        114,
        105,
        3311.6951253009115,
        4142.733354467027
    ],
    [
        46.5,
        128,
        114,
        105,
        3311.6951253009115,
        4142.733354467027
    ],
    [
        13.5,
        190,
        89,
        76,
        3311.6951253009115,
        4142.733354467027
    ],
    [
        13.5,
        190,
        89,
        76,
        3311.6951253009115,
        4142.733354467027
    ],
    [
        -20.5,
        228,
        72,
        120,
        3311.6951253009115,
        4142.733354467027
    ],
    [
        -20.5,
        228,
        72,
        120,
        3311.6951253009115,
        4142.733354467027
    ],
    [
        61.5,
        137,
        42,
        41,
        3227.756020057513,
        4344.958929778309
    ],
    [
        61.5,
        137,
        42,
        41,
        3227.756020057513,
        4344.958929778309
    ],
    [
        124.5,
        19,
        167,
        90,
        3227.756020057513,
        4344.958929778309
    ],
    [
        124.5,
        19,
        167,
        90,
        3227.756020057513,
        4344.958929778309
    ],
    [
        235.5,
        -68,
        94,
        150,
        3227.756020057513,
        4344.958929778309
    ],
    [
        235.5,
        -68,
        94,
        150,
        3227.756020057513,
        4344.958929778309
    ],
    [
        154.5,
        -29,
        178,
        251,
        3345.9069091749575,
        4166.683040660868
    ],
    [
        154.5,
        -29,
        178,
        251,
        3345.9069091749575,
        4166.683040660868
    ],
    [
        -155.5,
        -139,
        60,
        30,
        3345.9069091749575,
        4166.683040660868
    ],
    [
        -155.5,
        -139,
        60,
        30,
        3345.9069091749575,
        4166.683040660868
    ],
    [
        -122.5,
        -40,
        22,
        18,
        3157.337418916385,
        4350.052530919439
    ],
    [
        -122.5,
        -40,
        22,
        18,
        3157.337418916385,
        4350.052530919439
    ],
    [
        -71.5,
        151,
        64,
        34,
        3157.337418916385,
        4350.052530919439
    ],
    [
        -71.5,
        151,
        64,
        34,
        3157.337418916385,
        4350.052530919439
    ],
    [
        -218.5,
        12,
        75,
        158,
        3157.337418916385,
        4350.052530919439
    ],
    [
        -218.5,
        12,
        75,
        158,
        3157.337418916385,
        4350.052530919439
    ],
    [
        -266.5,
        -111,
        91,
        248,
        3157.337418916385,
        4350.052530919439
    ],
    [
        -266.5,
        -111,
        91,
        248,
        3157.337418916385,
        4350.052530919439
    ],
    [
        -383.5,
        -228,
        282,
        351,
        3083.8078807797315,
        4113.230928495622
    ],
    [
        -383.5,
        -228,
        282,
        351,
        3083.8078807797315,
        4113.230928495622
    ],
    [
        -420.5,
        -227,
        375,
        402,
        3063.62309440678,
        3858.465714868574
    ],
    [
        -420.5,
        -227,
        375,
        402,
        3063.62309440678,
        3858.465714868574
    ],
    [
        106.5,
        -13,
        19,
        13,
        3273.850458015058,
        3689.967366386688
    ],
    [
        106.5,
        -13,
        19,
        13,
        3273.850458015058,
        3689.967366386688
    ],
    [
        -110.5,
        50,
        14,
        16,
        3273.850458015058,
        3689.967366386688
    ],
    [
        -110.5,
        50,
        14,
        16,
        3273.850458015058,
        3689.967366386688
    ],
    [
        -295.5,
        -189,
        199,
        186,
        3273.850458015058,
        3689.967366386688
    ],
    [
        -295.5,
        -189,
        199,
        186,
        3273.850458015058,
        3689.967366386688
    ],
    [
        -295.5,
        -48,
        133,
        83,
        3273.850458015058,
        3689.967366386688
    ],
    [
        -295.5,
        -48,
        133,
        83,
        3273.850458015058,
        3689.967366386688
    ],
    [
        -290.5,
        23,
        90,
        39,
        3273.850458015058,
        3689.967366386688
    ],
    [
        -290.5,
        23,
        90,
        39,
        3273.850458015058,
        3689.967366386688
    ],
    [
        -273.5,
        54,
        49,
        34,
        3273.850458015058,
        3689.967366386688
    ],
    [
        -273.5,
        54,
        49,
        34,
        3273.850458015058,
        3689.967366386688
    ],
    [
        -209.5,
        92,
        265,
        55,
        3052.416538644829,
        3378.1834470164595
    ],
    [
        -209.5,
        92,
        265,
        55,
        3052.416538644829,
        3378.1834470164595
    ],
    [
        -336.5,
        124,
        292,
        155,
        3052.416538644829,
        3378.1834470164595
    ],
    [
        -336.5,
        124,
        292,
        155,
        3052.416538644829,
        3378.1834470164595
    ],
    [
        -41.5,
        147,
        125,
        119,
        2664.100582741314,
        3389.6739322107405
    ],
    [
        -41.5,
        147,
        125,
        119,
        2664.100582741314,
        3389.6739322107405
    ],
    [
        -75.5,
        168,
        121,
        150,
        2664.100582741314,
        3389.6739322107405
    ],
    [
        -75.5,
        168,
        121,
        150,
        2664.100582741314,
        3389.6739322107405
    ],
    [
        -138.5,
        206,
        181,
        160,
        2664.100582741314,
        3389.6739322107405
    ],
    [
        -138.5,
        206,
        181,
        160,
        2664.100582741314,
        3389.6739322107405
    ],
    [
        101.5,
        28,
        178,
        202,
        2394.2167257342126,
        3597.9293594648393
    ],
    [
        101.5,
        28,
        178,
        202,
        2394.2167257342126,
        3597.9293594648393
    ],
    [
        70.5,
        121,
        234,
        229,
        2394.2167257342126,
        3597.9293594648393
    ],
    [
        70.5,
        121,
        234,
        229,
        2394.2167257342126,
        3597.9293594648393
    ],
    [
        112.5,
        -94,
        276,
        266,
        2319.8040949816477,
        3941.7676701307437
    ],
    [
        112.5,
        -94,
        276,
        266,
        2319.8040949816477,
        3941.7676701307437
    ],
    [
        136.5,
        151,
        268,
        48,
        2319.8040949816477,
        3941.7676701307437
    ],
    [
        136.5,
        151,
        268,
        48,
        2319.8040949816477,
        3941.7676701307437
    ],
    [
        168.5,
        173,
        234,
        168,
        2319.8040949816477,
        3941.7676701307437
    ],
    [
        168.5,
        173,
        234,
        168,
        2319.8040949816477,
        3941.7676701307437
    ],
    [
        90.5,
        -245,
        222,
        164,
        2568.669350847622,
        4422.243601487113
    ],
    [
        90.5,
        -245,
        222,
        164,
        2568.669350847622,
        4422.243601487113
    ],
    [
        -15.5,
        -169,
        164,
        46,
        2568.669350847622,
        4422.243601487113
    ],
    [
        -15.5,
        -169,
        164,
        46,
        2568.669350847622,
        4422.243601487113
    ],
    [
        198.5,
        -105,
        111,
        135,
        2568.669350847622,
        4422.243601487113
    ],
    [
        198.5,
        -105,
        111,
        135,
        2568.669350847622,
        4422.243601487113
    ],
    [
        72.5,
        -132,
        137,
        121,
        2568.669350847622,
        4422.243601487113
    ],
    [
        72.5,
        -132,
        137,
        121,
        2568.669350847622,
        4422.243601487113
    ],
    [
        19.5,
        -144,
        60,
        65,
        2568.669350847622,
        4422.243601487113
    ],
    [
        19.5,
        -144,
        60,
        65,
        2568.669350847622,
        4422.243601487113
    ],
    [
        49.5,
        -100,
        27,
        28,
        2568.669350847622,
        4422.243601487113
    ],
    [
        49.5,
        -100,
        27,
        28,
        2568.669350847622,
        4422.243601487113
    ],
    [
        -137.5,
        -6,
        47,
        31,
        2296.259908467132,
        4185.656932277226
    ],
    [
        -137.5,
        -6,
        47,
        31,
        2296.259908467132,
        4185.656932277226
    ],
    [
        88.5,
        -128,
        33,
        23,
        2296.259908467132,
        3916.2319322772273
    ],
    [
        88.5,
        -128,
        33,
        23,
        2296.259908467132,
        3916.2319322772273
    ],
    [
        -85.5,
        -173,
        19,
        19,
        3022.9255203781886,
        3173.6891558998955
    ],
    [
        -85.5,
        -173,
        19,
        19,
        3022.9255203781886,
        3173.6891558998955
    ],
    [
        -278.5,
        -112,
        22,
        17,
        3022.9255203781886,
        3173.6891558998955
    ],
    [
        -278.5,
        -112,
        22,
        17,
        3022.9255203781886,
        3173.6891558998955
    ],
    [
        -158.5,
        -94,
        57,
        33,
        2294.5339147476343,
        3189.3444363130166
    ],
    [
        -158.5,
        -94,
        57,
        33,
        2294.5339147476343,
        3189.3444363130166
    ],
    [
        25.5,
        -136,
        33,
        22,
        2294.5339147476343,
        3189.3444363130166
    ],
    [
        25.5,
        -136,
        33,
        22,
        2294.5339147476343,
        3189.3444363130166
    ],
    [
        -255.5,
        -124,
        137,
        282,
        2396.089328756996,
        4555.805814616044
    ],
    [
        -255.5,
        -124,
        137,
        282,
        2396.089328756996,
        4555.805814616044
    ],
    [
        -287.5,
        -93,
        74,
        248,
        2396.089328756996,
        4555.805814616044
    ],
    [
        -287.5,
        -93,
        74,
        248,
        2396.089328756996,
        4555.805814616044
    ],
    [
        -319.5,
        -50,
        76,
        240,
        2396.089328756996,
        4555.805814616044
    ],
    [
        -319.5,
        -50,
        76,
        240,
        2396.089328756996,
        4555.805814616044
    ],
    [
        -348.5,
        35,
        69,
        181,
        2396.089328756996,
        4555.805814616044
    ],
    [
        -348.5,
        35,
        69,
        181,
        2396.089328756996,
        4555.805814616044
    ],
    [
        -362.5,
        -109,
        132,
        190,
        2313.8174547659437,
        4732.693278403427
    ],
    [
        -362.5,
        -109,
        132,
        190,
        2313.8174547659437,
        4732.693278403427
    ],
    [
        -395.5,
        -72,
        131,
        181,
        2313.8174547659437,
        4732.693278403427
    ],
    [
        -395.5,
        -72,
        131,
        181,
        2313.8174547659437,
        4732.693278403427
    ],
    [
        2.5,
        -188,
        38,
        29,
        2189.4899241924854,
        4962.970808976877
    ],
    [
        2.5,
        -188,
        38,
        29,
        2189.4899241924854,
        4962.970808976877
    ],
    [
        -94.5,
        -288,
        79,
        184,
        1975.6128643282602,
        4978.5978688411
    ],
    [
        -94.5,
        -288,
        79,
        184,
        1975.6128643282602,
        4978.5978688411
    ],
    [
        -215.5,
        -256,
        161,
        183,
        1975.6128643282602,
        4978.5978688411
    ],
    [
        -215.5,
        -256,
        161,
        183,
        1975.6128643282602,
        4978.5978688411
    ],
    [
        -251.5,
        -226,
        64,
        144,
        1975.6128643282602,
        4978.5978688411
    ],
    [
        -251.5,
        -226,
        64,
        144,
        1975.6128643282602,
        4978.5978688411
    ],
    [
        -286.5,
        -195,
        87,
        123,
        1975.6128643282602,
        4978.5978688411
    ],
    [
        -286.5,
        -195,
        87,
        123,
        1975.6128643282602,
        4978.5978688411
    ],
    [
        -295.5,
        -182,
        257,
        90,
        1730.548654482805,
        4999.491898452535
    ],
    [
        -295.5,
        -182,
        257,
        90,
        1730.548654482805,
        4999.491898452535
    ],
    [
        -392.5,
        -152,
        303,
        94,
        1730.548654482805,
        4999.491898452535
    ],
    [
        -392.5,
        -152,
        303,
        94,
        1730.548654482805,
        4999.491898452535
    ],
    [
        -278.5,
        -167,
        386,
        88,
        1491.9783595846345,
        5049.562193350699
    ],
    [
        -278.5,
        -167,
        386,
        88,
        1491.9783595846345,
        5049.562193350699
    ],
    [
        -378.5,
        -134,
        206,
        89,
        1491.9783595846345,
        5049.562193350699
    ],
    [
        -378.5,
        -134,
        206,
        89,
        1491.9783595846345,
        5049.562193350699
    ],
    [
        -378.5,
        -77,
        168,
        62,
        1491.9783595846345,
        5049.562193350699
    ],
    [
        -378.5,
        -77,
        168,
        62,
        1491.9783595846345,
        5049.562193350699
    ],
    [
        -136.5,
        -13,
        34,
        18,
        1491.9783595846345,
        5049.562193350699
    ],
    [
        -136.5,
        -13,
        34,
        18,
        1491.9783595846345,
        5049.562193350699
    ],
    [
        297.5,
        71,
        55,
        30,
        1491.9783595846345,
        5049.562193350699
    ],
    [
        297.5,
        71,
        55,
        30,
        1491.9783595846345,
        5049.562193350699
    ],
    [
        174.5,
        108,
        56,
        38,
        2379.8799185533244,
        4904.6106343820065
    ],
    [
        174.5,
        108,
        56,
        38,
        2379.8799185533244,
        4904.6106343820065
    ],
    [
        125.5,
        -176,
        56,
        32,
        3889.3071272490492,
        4908.124550545499
    ],
    [
        125.5,
        -176,
        56,
        32,
        3889.3071272490492,
        4908.124550545499
    ],
    [
        53.5,
        -111,
        51,
        26,
        4166.803206662608,
        4432.378471131958
    ],
    [
        53.5,
        -111,
        51,
        26,
        4166.803206662608,
        4432.378471131958
    ],
    [
        -223.5,
        -167,
        47,
        92,
        3991.2285928939937,
        3780.894656363789
    ],
    [
        -223.5,
        -167,
        47,
        92,
        3991.2285928939937,
        3780.894656363789
    ],
    [
        -176.5,
        -127,
        28,
        261,
        3991.2285928939937,
        3780.894656363789
    ],
    [
        -176.5,
        -127,
        28,
        261,
        3991.2285928939937,
        3780.894656363789
    ],
    [
        -152.5,
        -54,
        47,
        190,
        3991.2285928939937,
        3780.894656363789
    ],
    [
        -152.5,
        -54,
        47,
        190,
        3991.2285928939937,
        3780.894656363789
    ],
    [
        -238.5,
        -85,
        111,
        347,
        3991.2285928939937,
        3780.894656363789
    ],
    [
        -238.5,
        -85,
        111,
        347,
        3991.2285928939937,
        3780.894656363789
    ],
    [
        -237.5,
        -192,
        158,
        350,
        3991.2285928939937,
        4104.919656363788
    ],
    [
        -237.5,
        -192,
        158,
        350,
        3991.2285928939937,
        4104.919656363788
    ],
    [
        -339.5,
        28,
        198,
        174,
        3991.2285928939937,
        4104.919656363788
    ],
    [
        -339.5,
        28,
        198,
        174,
        3991.2285928939937,
        4104.919656363788
    ],
    [
        -332.5,
        162,
        154,
        66,
        3991.2285928939937,
        4104.919656363788
    ],
    [
        -332.5,
        162,
        154,
        66,
        3991.2285928939937,
        4104.919656363788
    ],
    [
        -347.5,
        183,
        77,
        80,
        3991.2285928939937,
        4104.919656363788
    ],
    [
        -347.5,
        183,
        77,
        80,
        3991.2285928939937,
        4104.919656363788
    ],
    [
        75.5,
        -109,
        135,
        147,
        4077.6370415549873,
        3969.111207702794
    ],
    [
        75.5,
        -109,
        135,
        147,
        4077.6370415549873,
        3969.111207702794
    ],
    [
        206.5,
        -146,
        106,
        118,
        4077.6370415549873,
        3969.111207702794
    ],
    [
        206.5,
        -146,
        106,
        118,
        4077.6370415549873,
        3969.111207702794
    ],
    [
        189.5,
        -119,
        59,
        135,
        4077.6370415549873,
        3969.111207702794
    ],
    [
        189.5,
        -119,
        59,
        135,
        4077.6370415549873,
        3969.111207702794
    ],
    [
        258.5,
        41,
        32,
        27,
        4077.6370415549873,
        3969.111207702794
    ],
    [
        258.5,
        41,
        32,
        27,
        4077.6370415549873,
        3969.111207702794
    ],
    [
        141.5,
        -92,
        59,
        32,
        4769.355727173955,
        3797.961060861819
    ],
    [
        141.5,
        -92,
        59,
        32,
        4769.355727173955,
        3797.961060861819
    ],
    [
        -47.5,
        213,
        37,
        22,
        4769.355727173955,
        3797.961060861819
    ],
    [
        -47.5,
        213,
        37,
        22,
        4769.355727173955,
        3797.961060861819
    ]
];

let colliders = [];
generateColliders();
//generate colliders only needs to run once at the start of the game

function generateColliders(){
    console.log("generating colliders");
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
    //console.log(colliders);
    return (colliders); //return the array containing all the arrays of coordinates
}

function getBFA(){
    console.log('getBFA() was run');
    return colliders;
}
module.exports = getBFA;