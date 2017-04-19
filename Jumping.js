/**
 * Created by Brian Rasmussen on 4/17/2017.
 * whats up
 */
DIRECTION =
    {
        RIGHT :'RIGHT',
        LEFT : 'LEFT',
        DOWN : 'DOWN',
        UP : 'UP'
    };
KEY =
    {
        RIGHT :39,
        LEFT : 37,
        DOWN : 40,
        UP : 38
    };
function updateSnakeByKey(e)
{
    //does this update
    var keyNum = e.keyCode;
    console.log(keyNum);
    console.log(keyNum);
        if (keyNum === KEY.RIGHT && gameSnake.Direction !== DIRECTION.LEFT) {
            gameSnake.Direction = DIRECTION.RIGHT;
        }
        else if (keyNum === KEY.LEFT && gameSnake.Direction !== DIRECTION.RIGHT) {
            gameSnake.Direction = DIRECTION.LEFT;
        }
        else if (keyNum === KEY.UP && gameSnake.Direction !== DIRECTION.DOWN) {
            gameSnake.Direction = DIRECTION.UP;
        }
        else if (keyNum === KEY.DOWN && gameSnake.Direction !== DIRECTION.UP) {
            gameSnake.Direction = DIRECTION.DOWN;
        }

}
function drawSnake() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for(var index = 0 ; index < gameSnake.body.length ; index++)
        {
            ctx.fillRect(gameSnake.body[index].x,gameSnake.body[index].y,8,8);
        }
    }
}
 var theSnake = function()
    {
        this.body = [
            {
                x: 5,
                y: 5
            },
            {
                x: 15,
                y: 5
            }
        ];
        this.Direction = DIRECTION.RIGHT;
        window.addEventListener('keydown',updateSnakeByKey);
};
function moveSnake()
{
    var Tail = gameSnake.body.pop();
    var Head = gameSnake.body[0];
    Tail.x = Head.x;
    Tail.y = Head.y;
    switch (gameSnake.Direction) {
        case DIRECTION.RIGHT:
            Tail.x += 10;
            break;
        case DIRECTION.LEFT:
            Tail.x -= 10;
            break;
        case DIRECTION.UP:
            Tail.y -= 10;
            break;
        case DIRECTION.DOWN:
            Tail.y += 10;
            break;
    }
    gameSnake.body.unshift(Tail);
}
function run()
{
    var now = Date.now();
    var nextTick = now + TICK_LENGTH;
    while(now <nextTick)
    {
        now = Date.now();
    }
    moveSnake();
    drawSnake();
      window.requestAnimationFrame(run);

}
var gameSnake = new theSnake();
var TICK_LENGTH = 100;
window.onload = function()
{
    run();
};