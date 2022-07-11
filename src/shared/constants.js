//these are global variables, changing them will change how the game operates. Great for tweaking gameplay settings in testing
module.exports = Object.freeze({
    PLAYER_RADIUS: 20,
    PLAYER_MAX_HP: 3,
    PLAYER_SPEED: 400,
    PLAYER_FIRE_COOLDOWN: 4,//4 second cooldown between fireballs unless you hit a player in which you can instantly shoot again

    //Dashing
    PLAYER_DASH_COOLDOWN: 4,
    PLAYER_DASH_DISTANCE: 400,

    BULLET_RADIUS: 10,
    BULLET_SPEED: 800,
    BULLET_DAMAGE: 1,

    SCORE_BULLET_HIT: 20,
    SCORE_PER_SECOND: 0,

    MAP_SIZE: 6400,
    MSG_TYPES:{
        JOIN_GAME: 'join_game',
        GAME_UPDATE: 'update',
        INPUT: 'input',
        SHOOT: 'shoot',
        DASH: 'dash',
        GAME_OVER: 'dead',
    },
});