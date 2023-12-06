// Import necessary functions
const {
    mapNumberToCard,
    isStraightFlush,
    isQuads,
    isFullHouse,
    isFlush,
    isStraight,
    isTrips,
    isTwoPair,
    isJacksOrBetter,
  } = require('./your-functions-file'); // Replace './your-functions-file' with the actual file path
  
  // Test function for checking a royal flush
  test('Check Royal Flush', () => {
    const royalFlush = [8, 9, 10, 11, 12]; // Assuming these card numbers represent a royal flush
    const notRoyalFlush = [10, 1, 2, 3, 4]; // Not a royal flush
  
    expect(isStraightFlush(royalFlush)).toBe(true);
    expect(isStraightFlush(notRoyalFlush)).toBe(false);
  });
  
  // Test function for checking quads
  test('Check Quads', () => {
    const quads = [1, 14, 27, 39, 40]; // Assuming these card numbers represent four of a kind
    const notQuads = [5, 1, 2, 3, 4]; // Not four of a kind
  
    expect(isQuads(quads)).toBe(true);
    expect(isQuads(notQuads)).toBe(false);
  });
  
  // Test function for checking a full house
  test('Check Full House', () => {
    const fullHouse = [1, 14, 27, 2, 15]; // Assuming these card numbers represent a full house
    const notFullHouse = [5, 1, 2, 3, 4]; // Not a full house
  
    expect(isFullHouse(fullHouse)).toBe(true);
    expect(isFullHouse(notFullHouse)).toBe(false);
  });
  
  // Test function for checking a flush
  test('Check Flush', () => {
    const flush = [8, 9, 10, 11, 3]; // Assuming these card numbers represent a flush
    const notFlush = [21, 1, 2, 3, 4]; // Not a flush
  
    expect(isFlush(flush)).toBe(true);
    expect(isFlush(notFlush)).toBe(false);
  });
  
  // Test function for checking a straight
  test('Check Straight', () => {
    const straight = [3, 4, 5, 6, 28].sort(); // Assuming these card numbers represent a straight
    const notStraight = [10, 1, 2, 3, 4]; // Not a straight
  
    expect(isStraight(straight)).toBe(true);
    expect(isStraight(notStraight)).toBe(false);
  });
  
  // Test function for checking trips
  test('Check Trips', () => {
    const trips = [2, 14, 27, 39, 40]; // Assuming these card numbers represent three of a kind
    const notTrips = [5, 1, 2, 3, 4]; // Not three of a kind
  
    expect(isTrips(trips)).toBe(true);
    expect(isTrips(notTrips)).toBe(false);
  });
  
  // Test function for checking two pair
  test('Check Two Pair', () => {
    const twoPair = [1, 14, 3, 16, 5]; // Assuming these card numbers represent two pairs
    const notTwoPair = [5, 1, 2, 3, 4]; // Not two pairs
  
    expect(isTwoPair(twoPair)).toBe(true);
    expect(isTwoPair(notTwoPair)).toBe(false);
  });
  
  // Test function for checking jacks or better
  test('Check Jacks or Better', () => {
    const jacks = [1, 2, 3, 11, 24]; // Assuming these card numbers represent jacks or better
    const notJacks = [5, 18, 2, 3, 4]; // Not jacks or better
  
    expect(isJacksOrBetter(jacks)).toBe(true);
    expect(isJacksOrBetter(notJacks)).toBe(false);
  });
  