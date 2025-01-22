const HIT_STATUS = {
    SUCCESS: 'success',
    FAILED: 'failed'
};

function createShip(length) {
    if (length <= 0) {
        throw new Error('Length must be positive');
    }
    let hits = 0;
    function hit() {
        if (hits < length) {
            hits++;
            return HIT_STATUS.SUCCESS;
        }
        return HIT_STATUS.FAILED;
    }
    function isSunk() {
        return hits >= length;
    }
    return {
      length,
      hit,
      isSunk,
      get hits() {
        return hits;
      }
    };
  }
  
  export default createShip;  
