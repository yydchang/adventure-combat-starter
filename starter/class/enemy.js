const { Character } = require("./character");
const { Food } = require("./food");
const { Item } = require("./item");
const { Player } = require("./player");
const { Room } = require("./room");
const { World } = require("./world");

class Enemy extends Character {
  constructor(name, description, currentRoom) {
    super(name, description, currentRoom);
    this.cooldown = 3000;
    this.player = {};
  }

  setPlayer(player) {
    // Fill this in
  }

  randomMove() {
    // Fill this in
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
    setTimeout(resetCooldown, this.cooldown);
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
    this.cooldown += 1000;

    this.alert(`${this.name} scratches its nose`);
  }
}

module.exports = {
  Enemy,
};
