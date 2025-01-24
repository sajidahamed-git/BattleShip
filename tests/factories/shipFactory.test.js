import createShip from '../../src/factories/shipFactory';

describe('Ship Factory', () => {
    test('creates ship with correct length', () => {
        const ship = createShip(3);
        expect(ship.length).toBe(3);
    });

    test('hits should update', () => {
        const ship = createShip(3);
        ship.hit();
        expect(ship.hits).toBe(1);
    });
    test('works with multiple hits', () => {
        const ship = createShip(3);
        ship.hit();
        ship.hit();
        expect(ship.hits).toBe(2);
    });
    test('ship is sunk when hits equal length', () => {
        const ship = createShip(2);
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toBe(true);
    });
    test('ship is not sunk with partial hits', () => {
        const ship = createShip(3);
        ship.hit();
        expect(ship.isSunk()).toBe(false);
    });
    test('cannot be hit more times than length', () => {
        const ship = createShip(2);
        ship.hit();
        ship.hit();
        ship.hit();
        expect(ship.hits).toBe(2);
    });
    test('if length is negative, throw error', () => {
        expect(() => createShip(-1)).toThrow('Length must be positive');
    });
    test('if length is 0, throw error', () => {
        expect(() => createShip(0)).toThrow('Length must be positive');
    });
    test('hit() returns status', () => {
        const ship = createShip(2);
        expect(ship.hit()).toBe('success');  // First hit
        expect(ship.hit()).toBe('success');  // Second hit
        expect(ship.hit()).toBe('failed');   // Third hit (beyond length)
    });
});

