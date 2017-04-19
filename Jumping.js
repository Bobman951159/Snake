/**
 * Created by Brian Rasmussen on 4/17/2017.
 * updated by Jason yo
 */
DIRECTION = {
	RIGHT: 'RIGHT',
	LEFT: 'LEFT',
	DOWN: 'DOWN',
	UP: 'UP'
};
KEY = {
	RIGHT: 39,
	LEFT: 37,
	DOWN: 40,
	UP: 38
};
TICK_LENGTH = 100;

var Snake = function () {
	this.direction = DIRECTION.RIGHT;
	this.body = [{
		x: 5,
		y: 5
	}, {
		x: 15,
		y: 5
	}];

	this.start = function () {
		var canvas = document.getElementById('canvas');
		if (canvas.getContext) {
			this.ctx = canvas.getContext('2d');
		} else {
			console.error('No Context Available!');
		}

		// onKeyDown.bind means that when onKeyDown is call 'this' will refer to what is passed into the bind function
		// window.addEventListener('keydown', this.onKeyDown); <-- when onKeyDown is called like this, "this" in the onKeyDown method is something else
		window.addEventListener('keydown', this.onKeyDown.bind(this));
		this.nextTick = performance.now() // performance is more accurate than Date.now()
		window.requestAnimationFrame(this.tick.bind(this)); // same bind problem as with the keydown event listener
	}

	// this method gets looped
	this.tick = function () {
		var now = performance.now();
		// instead of blocking the code until we get to the next tick, we let the loop continue and the screen keeps running, we just don't move or draw again until the next tick has passed
		if (now >= this.nextTick) {
			this.nextTick = now + TICK_LENGTH;
			this.move();
			this.draw();
		}
		window.requestAnimationFrame(this.tick.bind(this));
	}

	// methods this = gameSnake
	this.move = function () {
		// console.log('moving...', this.direction)
		var tail = this.body.pop(); //lower case properties are usually the standard
		var head = this.body[0];
		tail.x = head.x;
		tail.y = head.y;
		switch (this.direction) {
		case DIRECTION.RIGHT:
			tail.x += 10;
			break;
		case DIRECTION.LEFT:
			tail.x -= 10;
			break;
		case DIRECTION.UP:
			tail.y -= 10;
			break;
		case DIRECTION.DOWN:
			tail.y += 10;
			break;
		}
		this.body.unshift(tail);
	};

	this.draw = function () {
		//ctx is now a property of the snake object
		this.ctx.clearRect(0, 0, canvas.width, canvas.height);
		for (var index = 0; index < this.body.length; index++) {
			this.ctx.fillRect(this.body[index].x, this.body[index].y, 8, 8);
		}
	}

	// this method gets called whenever the a key is pressed
	this.onKeyDown = function (e) {
		var keyNum = e.keyCode;
		if (keyNum === KEY.RIGHT && this.direction != DIRECTION.LEFT) {
			this.direction = DIRECTION.RIGHT;
		} else if (keyNum === KEY.LEFT && this.direction != DIRECTION.RIGHT) {
			this.direction = DIRECTION.LEFT;
		} else if (keyNum === KEY.UP && this.direction != DIRECTION.DOWN) {
			this.direction = DIRECTION.UP;
		} else if (keyNum === KEY.DOWN && this.direction != DIRECTION.UP) {
			this.direction = DIRECTION.DOWN;
		}
	}
}

window.onload = function () {
	var gameSnake = new Snake();
	gameSnake.start()
};
