import * as readline from 'readline'

type Direction = 'NORTH' | 'EAST' | 'SOUTH' | 'WEST'
type Position = { x: number, y: number, direction: Direction }

export class RobotSim {
    private readonly dimensionMax: number = 5
    private position: Position | null = null

    public executeCommand(command: string): void {
        const parts = command.trim().split(' ')

        switch (parts[0].toUpperCase()) {
            case 'PLACE':
                if (!parts[1]) {
                    console.log(`Invalid command: ${command}`)
                } else {
                    this.place(parts[1])
                }
                break
            case 'LEFT':
                this.rotate('LEFT')
                break
            case 'RIGHT':
                this.rotate('RIGHT')
                break
            case 'MOVE':
                this.move()
                break
            case 'REPORT':
                this.report()
                break
            case 'EXIT':
                process.exit()
            default:
                console.log(`Invalid command: ${command}`)
        }
    }

    private isValidPosition(x: number, y: number): boolean {
        return (x >= 0 && x < this.dimensionMax) && (y >= 0 && y < this.dimensionMax)
    }

    private isValidDirection(direction: string): boolean {
        return ['NORTH', 'EAST', 'SOUTH', 'WEST'].includes(direction.toUpperCase())
    }

    private rotate(turnDirection: 'LEFT' | 'RIGHT'): void {
        if (!this.position) {
            console.log('PLACE robot first')
            return
        }

        const compass: Direction[] = ['NORTH', 'EAST', 'SOUTH', 'WEST']
        const currentDirection = compass.indexOf(this.position.direction)

        let newDirection = currentDirection
        if (turnDirection === 'LEFT') {
            newDirection = (currentDirection + 3) % 4 // remainder becomes new index
        } else {
            newDirection = (currentDirection + 1) % 4
        }

        this.position.direction = compass[newDirection]
    }

    private move(): void {
        if (!this.position) {
            console.log('PLACE robot first')
            return
        }

        const { x, y, direction } = this.position
        let x1 = x, y1 = y

        switch (direction) {
            case 'NORTH':
                y1++
                break
            case 'EAST':
                x1++
                break
            case 'SOUTH':
                y1--
                break
            case 'WEST':
                x1--
                break
        }

        if (this.isValidPosition(x1, y1)) {
            this.position.x = x1
            this.position.y = y1
        } else {
            console.log('You are at the edge. Rotate robot!')
        }
    }

    private place(params: string): void {
        const [xInput, yInput, direction] = params.split(',')

        const x = parseInt(xInput)
        const y = parseInt(yInput)

        if (this.isValidPosition(x, y) && this.isValidDirection(direction)) {
            this.position = { x, y, direction: direction.toUpperCase() as Direction }
        } else {
            console.log('Use valid PLACE command (e.g. PLACE 0,0,NORTH)')
        }
    }

    public report(): void {
        if (!this.position) {
            console.log('PLACE robot first')
            return
        }
        console.log(`Output: ${this.position.x},${this.position.y},${this.position.direction}`)
    }
}

const readUser = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function promptUser() {
    readUser.question('Enter command: ', (command) => {
        game.executeCommand(command)
        promptUser() // Prompt for the next command
    });
}

const game = new RobotSim()

console.log("Control your Toy Robot!")
console.log("Place your robot on a 5x5 board")
console.log("Commands: PLACE X,Y,DIRECTION | MOVE | LEFT | RIGHT | REPORT | EXIT")
promptUser()
