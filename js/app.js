var blockWidth = 101;
var blockHeight = 83;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -blockWidth;
    this.y = (Math.floor(Math.random() * (3 - 1 + 1)) + 1) * blockHeight;
    this.speed = Math.random() * (500 - 100) + 100;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x >= 5 * blockWidth) {
        this.x = -blockWidth;
        this.y = (Math.floor(Math.random() * (3 - 1 + 1)) + 1) * blockHeight;
        this.speed = Math.random() * (500 - 100) + 100;
    }
    else {
        this.x = this.x + this.speed * dt;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = blockWidth * 2;
    this.y = blockHeight * 5;
};

Player.prototype.update = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        if (this.y === allEnemies[i].y) {
            if (this.x <= allEnemies[i].x + 50 && this.x >= allEnemies[i].x - 50) {
                this.x = blockWidth * 2;
                this.y = blockHeight * 5;
            }
        }
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyCode) {
    if (keyCode === 'left') {
        if (this.x !== 0) {
            this.x -= blockWidth;
        }
    }
    if (keyCode === 'up') {
        if (this.y !== 0) {
            this.y -= blockHeight;
            if (this.y <= 0) {
                this.x = blockWidth * 2;
                this.y = blockHeight * 5;
            }
        }
    }
    if (keyCode === 'right') {
        if (this.x !== 4 * blockWidth) {
            this.x += blockWidth;
        }
    }
    if (keyCode === 'down') {
        if (this.y !== 5 * blockHeight) {
            this.y += blockHeight;
        }
    }
};


// Instantiate objects.
// All enemy objects in an array called allEnemies
// The player object in a variable called player
var allEnemies = [
    new Enemy(),
    new Enemy(),
    new Enemy()
];
var player = new Player();



// This listens for key presses and sends the keys to
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
