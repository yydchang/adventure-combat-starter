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
    let item = this.currentRoom.getItemByName(itemName);
    this.items.push(item);
    console.log(
      `You added the ${item.name} to your inventory. Type 'i' to check your entire inventory.`
    );
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
    if (item && item.isFood) {
      this.health += 10; // refactor later to have different items worth different health points
      console.log(`You ate the ${item.name} and gained 10 health points.`);
      this.items = this.items.filter((item) => item.name !== itemName);
    } else if (!item) {
      console.log(
        `${itemName} is not in the inventory. If you see ${itemName} in your room, type 'take ${itemName}' first.`
      );
    } else {
      console.log(
        `${itemName} is not food! If you make a habit of eating this, please see your doctor.`
      );
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
    let enemy = this.currentRoom.getEnemyByName(name);
    enemy.applyDamage(this.strength);
    if (enemy.health > 0) {
      console.log(
        `   You hit ${enemy.name}! ${enemy.name}'s health is now ${enemy.health}`
      );
    }
    enemy.attackTarget = this;
    enemy.cooldown = 0;
  }

  die() {
    console.log("You are dead!");
    process.exit();
  }
}


module.exports = {
  Player,
};
