export default {
  createRandomId() {
    return Math.random()
      .toString(36)
      .substring(2, 7);
  },

  chooseRandomMurderer(players, detective) {
    const available = players.filter((item, index) => index !== detective);
    return available[Math.floor(Math.random() * available.length)].index;
  },

  getRandom(arr, n) {
    const result = new Array(n);
    let len = arr.length;
    const taken = new Array(len);

    if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }
};
