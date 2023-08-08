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
      console.log(`You are not carrying anything.`);
    } else {
      console.log(`You are carrying:`);
      for (let i = 0; i < this.items.length; i++) {
        console.log(`  ${this.items[i].name}: ${this.items[i].description}`);
      }
    }
  }

  takeItem(itemName) {
    const item = super.takeItem(itemName);
    console.log(
      `You added the ${item.name} to your inventory. Type 'i' to check your entire inventory.`
    );
    if (item.isFood) {
      console.log(`You can eat ${item.name} now or save it for later.`);
    }
  }

  hit(name) {
    let enemy = this.currentRoom.getEnemyByName(name);
    if (enemy !== undefined) {
      if (enemy.player && enemy.player.currentRoom === enemy.currentRoom) {
        enemy.applyDamage(this.strength);
        if (enemy.health > 0) {
          console.log(
            `   You hit ${enemy.name}! ${enemy.name}'s health is now ${enemy.health}`
          );
        }
        enemy.attackTarget = this;
        enemy.cooldown = 0;
      } else {
        console.log(`${name} isn't here. Go find them!`);
      }
    } else {
      console.log(`${name} isn't here. Go find them!`);
    }
  }

  die() {
    console.log("You are dead!");
    process.exit();
  }
}


module.exports = {
  Player,
};
