import { RobotSim } from "../ToyRobot"

describe('Toy Robot application', () => {
    console.log = jest.fn();
    let game: RobotSim

    beforeEach(() => {
        game = new RobotSim()
    })
    test('places robot on board', async () => {
        game.executeCommand('PLACE 0,0,EAST')
        game.report()
        expect(console.log).toHaveBeenCalledWith('Output: 0,0,EAST')
    })
    test('places robot outside of board', async () => {
        game.executeCommand('PLACE 9,3,EAST')
        game.report()
        expect(console.log).toHaveBeenCalledWith('Use valid PLACE command (e.g. PLACE 0,0,NORTH)');
    })
    test('executes command before placing robot', async () => {
        game.executeCommand('move')
        game.report()
        expect(console.log).toHaveBeenCalledWith('PLACE robot first');
    })
    test('moves robot within board', async () => {
        game.executeCommand('PLACE 0,0,EAST')
        game.executeCommand('move')
        game.report()
        expect(console.log).toHaveBeenCalledWith('Output: 1,0,EAST')
    })
    test('moves robot outside of board', async () => {
        game.executeCommand('PLACE 0,0,WEST')
        game.executeCommand('move')
        expect(console.log).toHaveBeenCalledWith('You are at the edge. Rotate robot!')
    })
    test('enters invalid command', async () => {
        game.executeCommand('shoot')
        expect(console.log).toHaveBeenCalledWith('Invalid command: shoot')
    })
    test('rotates robot left', async () => {
        game.executeCommand('PLACE 0,0,EAST')
        game.executeCommand('left')
        game.report()
        expect(console.log).toHaveBeenCalledWith('Output: 0,0,NORTH')
    })
    test('rotates robot right', async () => {
        game.executeCommand('PLACE 0,0,EAST')
        game.executeCommand('right')
        game.report()
        expect(console.log).toHaveBeenCalledWith('Output: 0,0,SOUTH')
    })
})