export class HashMap {
  #capacity = 16;
  #loadFactor = 0.75;
  #hashMap = [];

  constructor() {
    this.init(this.#hashMap);
  }

  init(hashMap) {
    for (let i = 0; i < this.#capacity; i++) {
      hashMap.push(new Map());
    }
    return hashMap;
  }

  #hash(keyVal) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < keyVal.length; i++) {
      hashCode =
        (primeNumber * hashCode + keyVal.charCodeAt(i)) % this.#capacity;
    }

    return hashCode;
  }

  entries() {
    let res = [];
    for (let i = 0; i < this.#hashMap.length; i++) {
      this.#hashMap[i].forEach((value, key) => res.push([key, value]));
    }
    return res;
  }

  has(key) {
    const hashCode = this.#hash(key);
    return this.#hashMap[hashCode].has(key);
  }

  get(key) {
    const hashCode = this.#hash(key);
    const value = this.#hashMap[hashCode].get(key);
    return value ?? null;
  }

  clear() {
    this.#hashMap = [];
    this.init(this.#hashMap);
  }

  length() {
    return this.#hashMap.reduce((acc, map) => acc + map.size, 0);
  }

  values() {
    let res = [];
    this.#hashMap.forEach((map) => map.forEach((value) => res.push(value)));
    return res;
  }

  keys() {
    let res = [];
    this.#hashMap.forEach((map) => map.forEach((v, key) => res.push(key)));
    return res;
  }

  remove(key) {
    const hashCode = this.#hash(key);
    return this.#hashMap[hashCode].delete(key);
  }

  set(key, value) {
    const hashCode = this.#hash(key);
    const maxLoad = Math.ceil(this.#capacity * this.#loadFactor);
    this.#hashMap[hashCode].set(key, value);
    if (maxLoad < this.length()) {
      //time to expand!
      this.#capacity *= 2;
      const largerMap = this.init([]);
      //copy over all the values now
      for (let i = 0; i < this.#hashMap.length; i++) {
        this.#hashMap[i].forEach((value, key) => {
          largerMap[i].set(key, value);
        });
      }
      this.#hashMap = largerMap;
    }
  }
}
