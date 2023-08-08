const { Character } = require("./character");
const { Room } = require("./room");
// const { Food } = require("./food");
// const { Item } = require("./item");
// const { Player } = require("./player");
// const { World } = require("./world");

class Enemy extends Character {
  constructor(name, description, currentRoom, health) {
    super(name, description, currentRoom);
    this.health = health;
    this.cooldown = 3000;
    this.attackTarget = null;
    this.player = null;
    this.currentRoom.enemies.push(this);
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
    const resetCooldown = function () {
      this.cooldown = 0;
      this.act();
    };
    setTimeout(resetCooldown.bind(this), this.cooldown);
  }

  attack() {
    this.cooldown += 3000;
    this.attackTarget.applyDamage(this.strength);
    this.alert(
      `${this.name} attacks! Your health is now ${this.attackTarget.health}.`
    );
  }

  // applyDamage(amount) {
  // currently using parent class function but can do more here later
  // super.applyDamage(amount);
  // }

  act() {
    if (this.health <= 0) {
      this.die();
      console.log(`${this.name} is dead.`);
    } else if (this.cooldown > 0) {
      this.rest();
    } else {
      this.scratchNose();
      this.rest();
    }

    // Fill this in
  }

  scratchNose() {
    this.cooldown += 4000;

    this.alert(`${this.name} scratches its nose`);
  }
}

module.exports = {
  Enemy,
};
