const { Character } = require("./character");
const { Enemy } = require("./enemy");
// const { Food } = require("./food");
// const { Room } = require("../class/room.js");
// const { World } = require("./world");

class Player extends Character {
  constructor(name, startingRoom) {
    super(name, "main character", startingRoom);
  }

  move(direction) {
    const nextRoom = this.currentRoom.getRoomInDirection(direction);

    // If the next room is valid, set the player to be in that room
    if (nextRoom) {
      this.currentRoom = nextRoom;

      nextRoom.printRoom(this);
    } else {
      console.log("You cannot move in that direction");
    }
  }

  printInventory() {
    if (this.items.length === 0) {
      console.log(`${this.name} is not carrying anything.`);
    } else {
      console.log(`${this.name} is carrying:`);
      for (let i = 0; i < this.items.length; i++) {
        console.log(`  ${this.items[i].name}`);
      }
    }
  }

  takeItem(itemName) {
    this.items.push(this.currentRoom.getItemByName(itemName));
    this.currentRoom.items = this.currentRoom.items.filter(
      (item) => item.name !== itemName
    );
  }

  dropItem(itemName) {
    this.currentRoom.items.push(this.getItemByName(itemName));
    this.items = this.items.filter((item) => item.name !== itemName);
  }

  eatItem(itemName) {
    let item = this.getItemByName(itemName);
    if (item.isFood === true) {
      this.items = this.items.filter((item) => item.name !== itemName);
    }
  }

  getItemByName(name) {
    for (const item of this.items) {
      if (item.name === name) {
        return item;
      }
    }
  }

  hit(name) {
    // const enemy = this.currentRoom.getItemByName(name);
    // enemy.applyDamage(30);
    // enemy.attackTarget = this;
  }

  die() {
    console.log("You are dead!");
    process.exit();
  }
}

module.exports = {
  Player,
};
