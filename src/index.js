class HashMap {
  loadFactor = 0.75;
  capacity = 16;
  map = Array(16);
  mapLength = 0;

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + (key.charCodeAt(i) % this.capacity);
    }

    return hashCode % this.capacity;
  }

  set(key, value) {
    const index = this.hash(key);
    if (!this.map[index]) {
      this.map[index] = new Node(key, value);
      this.mapLength++;
    } else if (this.map[index].key === key) {
      this.map[index].value = value;
    } else {
      let node = this.map[index];
      while (node) {
        if (node.key === key) {
          node.value = value;
        } else if (!node.nextNode) {
          node.nextNode = new Node(key, value);
          this.mapLength++;
        }
        node = node.nextNode;
      }
    }
    this.largerMap();
  }

  largerMap() {
    if (this.mapLength / this.capacity > this.loadFactor) {
      this.mapLength = 0;
      this.capacity *= 2;
      const entries = this.entries();
      this.map = Array(this.capacity);
      for (const [key, value] of entries) {
        this.set(key, value);
      }
    }
  }

  get(key) {
    const index = this.hash(key);
    if (this.map[index]) {
      if (this.map[index].key === key) {
        return this.map[index].value;
      } else if (this.map[index].nextNode) {
        let node = this.map[index].nextNode;
        while (node) {
          if (node.key === key) {
            return node.value;
          }
          node = node.nextNode;
        }
        return null;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  has(key) {
    const index = this.hash(key);
    if (this.map[index]) {
      if (this.map[index].key === key) {
        return true;
      } else if (this.map[index].nextNode) {
        let node = this.map[index].nextNode;
        while (node) {
          if (node.key === key) {
            return true;
          }
          node = node.nextNode;
        }
        return false;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  remove(key) {
    const index = this.hash(key);
    if (this.map[index]) {
      if (this.map[index].key === key) {
        this.map[index] = this.map[index].nextNode;
        this.mapLength--;
      } else if (this.map[index].nextNode) {
        let node = this.map[index].nextNode;
        let previous = this.map[index];
        while (node) {
          if (node.key === key) {
            previous.nextNode = node.nextNode;
            this.mapLength--;
            return;
          }
          node = node.nextNode;
          previous = previous.nextNode;
        }
        return false;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  length() {
    return this.mapLength;
  }

  clear() {
    this.map = Array(16);
  }

  keys() {
    const keys = [];
    for (let item of this.map) {
      while (item) {
        keys.push(item.key);
        item = item.nextNode;
      }
    }
    return keys;
  }

  values() {
    const values = [];
    for (let item of this.map) {
      while (item) {
        values.push(item.value);
        item = item.nextNode;
      }
    }
    return values;
  }

  entries() {
    const entries = [];
    for (let item of this.map) {
      while (item) {
        entries.push([item.key, item.value]);
        item = item.nextNode;
      }
    }
    return entries;
  }
}

class Node {
  constructor(key, value, nextNode = null) {
    this.key = key;
    this.value = value;
    this.nextNode = nextNode;
  }
}

const hashMap = new HashMap();

hashMap.set("apple", "red");
hashMap.set("banana", "yellow");
hashMap.set("carrot", "orange");
hashMap.set("dog", "brown");
hashMap.set("elephant", "gray");
hashMap.set("frog", "green");
hashMap.set("grape", "purple");
hashMap.set("hat", "black");
hashMap.set("ice cream", "white");
hashMap.set("jacket", "blue");
hashMap.set("kite", "pink");
hashMap.set("lion", "golden");
hashMap.set("Sita", "I am old value");
hashMap.set("Sita", "I am new value");
hashMap.set("Rama", "LALA");
hashMap.set("Rama", "NOPE");
hashMap.set("Rama", "TRALALA");

console.log(hashMap.get("Rama"));
console.log(hashMap.remove("Sita"));
console.log(hashMap.length());
console.log(hashMap.keys());
console.log(hashMap.values());
console.log(hashMap.entries());
console.log(hashMap.largerMap());
console.log(hashMap.length());
console.log(hashMap);
