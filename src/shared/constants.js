module.exports = Object.freeze({
    PLAYER_RADIUS: 20,
    PLAYER_MAX_HP: 3,
    PLAYER_SPEED: 400,
    PLAYER_FIRE_COOLDOWN: 4,//4 second cooldown between fireballs unless you hit a player in which you can instantly shoot again

    BULLET_RADIUS: 3,
    BULLET_SPEED: 800,
    BULLET_DAMAGE: 1,

    SCORE_BULLET_HIT: 20,
    SCORE_PER_SECOND: 0,

    MAP_SIZE: 3000,
    MSG_TYPES:{
        JOIN_GAME: 'join_game',
        GAME_UPDATE: 'update',
        INPUT: 'input',
        SHOOT: 'shoot',
        GAME_OVER: 'dead',
    },
});