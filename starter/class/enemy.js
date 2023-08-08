const { Character } = require("./character");
const { Room } = require("./room");
// const { Food } = require("./food");
// const { Item } = require("./item");
// const { Player } = require("./player");
// const { World } = require("./world");

class Enemy extends Character {
  constructor(name, description, currentRoom) {
    super(name, description, currentRoom);
    this.cooldown = 3000;
    this.attackTarget = null;
    this.player = null;
  }

  setPlayer(player) {
    this.player = player;
  }

  randomMove() {
    const exits = this.currentRoom.getExits();
    const randomExit = exits[Math.floor(Math.random() * exits.length)];
    const randomConnectingRoom =
      this.currentRoom.getRoomInDirection(randomExit);
    this.currentRoom = randomConnectingRoom;
    this.currentRoom.enemies.push(this);
    this.cooldown += 500;
  }

  takeSandwich() {
    // Fill this in
  }

  // Print the alert only if player is standing in the same room
  alert(message) {
    if (this.player && this.player.currentRoom === this.currentRoom) {
      console.log(message);
    }
  }

  rest() {
    // Wait until cooldown expires, then act
    // Is there a way to end this loop?
    const resetCooldown = function () {
      this.cooldown = 0;
      this.act();
    };
    setTimeout(resetCooldown.bind(this), this.cooldown);
  }

  attack() {
    // Fill this in
  }

  applyDamage(amount) {
    // Fill this in
  }

  act() {
    if (this.health <= 0) {
      this.die();
    } else if (this.cooldown > 0) {
      this.rest();
    } else {
      this.scratchNose();
      this.rest();
    }

    // Fill this in
  }

  scratchNose() {
    this.cooldown += 3000;

    this.alert(`${this.name} scratches its nose`);
  }
}

// Test
let enemy;
let room;
room = new Room("Test Room", "A test room");
enemy = new Enemy("enemy", "an ordinary character", room);
enemy.act();

module.exports = {
  Enemy,
};
