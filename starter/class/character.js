const { Room } = require("./room");
const { Item } = require("./item");

class Character {
  constructor(name, description, currentRoom) {
    this.name = name;
    this.description = description;
    this.currentRoom = currentRoom;
    this.health = 100;
    this.strength = 10;
    this.items = [];
  }

  applyDamage(amount) {
    this.health -= amount;
    if (this.health <= 0) {
      this.die();
    }
  }

  die() {
    for (let item of this.items) {
      this.currentRoom.items.push(item);
    }
    this.items = [];
    this.currentRoom = null;
  }
}


module.exports = {
  Character,
};
