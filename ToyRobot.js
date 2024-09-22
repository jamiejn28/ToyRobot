"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RobotSim = void 0;
var readline = require("readline");
var RobotSim = /** @class */ (function () {
    function RobotSim() {
        this.dimensionMax = 5;
        this.position = null;
    }
    RobotSim.prototype.executeCommand = function (command) {
        var parts = command.trim().split(' ');
        switch (parts[0].toUpperCase()) {
            case 'PLACE':
                if (!parts[1]) {
                    console.log("Invalid command: ".concat(command));
                }
                else {
                    this.place(parts[1]);
                }
                break;
            case 'LEFT':
                this.rotate('LEFT');
                break;
            case 'RIGHT':
                this.rotate('RIGHT');
                break;
            case 'MOVE':
                this.move();
                break;
            case 'REPORT':
                this.report();
                break;
            case 'EXIT':
                process.exit();
            default:
                console.log("Invalid command: ".concat(command));
        }
    };
    RobotSim.prototype.isValidPosition = function (x, y) {
        return (x >= 0 && x < this.dimensionMax) && (y >= 0 && y < this.dimensionMax);
    };
    RobotSim.prototype.isValidDirection = function (direction) {
        return ['NORTH', 'EAST', 'SOUTH', 'WEST'].includes(direction.toUpperCase());
    };
    RobotSim.prototype.rotate = function (turnDirection) {
        if (!this.position) {
            console.log('PLACE robot first');
            return;
        }
        var compass = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
        var currentDirection = compass.indexOf(this.position.direction);
        var newDirection = currentDirection;
        if (turnDirection === 'LEFT') {
            newDirection = (currentDirection + 3) % 4; // remainder becomes new index
        }
        else {
            newDirection = (currentDirection + 1) % 4;
        }
        this.position.direction = compass[newDirection];
    };
    RobotSim.prototype.move = function () {
        if (!this.position) {
            console.log('PLACE robot first');
            return;
        }
        var _a = this.position, x = _a.x, y = _a.y, direction = _a.direction;
        var x1 = x, y1 = y;
        switch (direction) {
            case 'NORTH':
                y1++;
                break;
            case 'EAST':
                x1++;
                break;
            case 'SOUTH':
                y1--;
                break;
            case 'WEST':
                x1--;
                break;
        }
        if (this.isValidPosition(x1, y1)) {
            this.position.x = x1;
            this.position.y = y1;
        }
        else {
            console.log('You are at the edge. Rotate robot!');
        }
    };
    RobotSim.prototype.place = function (params) {
        var _a = params.split(','), xInput = _a[0], yInput = _a[1], direction = _a[2];
        var x = parseInt(xInput);
        var y = parseInt(yInput);
        if (this.isValidPosition(x, y) && this.isValidDirection(direction)) {
            this.position = { x: x, y: y, direction: direction.toUpperCase() };
        }
        else {
            console.log('Use valid PLACE command (e.g. PLACE 0,0,NORTH)');
        }
    };
    RobotSim.prototype.report = function () {
        if (!this.position) {
            console.log('PLACE robot first');
            return;
        }
        console.log("Output: ".concat(this.position.x, ",").concat(this.position.y, ",").concat(this.position.direction));
    };
    return RobotSim;
}());
exports.RobotSim = RobotSim;
var readUser = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function promptUser() {
    readUser.question('Enter command: ', function (command) {
        game.executeCommand(command);
        promptUser(); // Prompt for the next command
    });
}
var game = new RobotSim();
console.log("Control your Toy Robot!");
console.log("Place your robot on a 5x5 board");
console.log("Commands: PLACE X,Y,DIRECTION | MOVE | LEFT | RIGHT | REPORT | EXIT");
promptUser();
