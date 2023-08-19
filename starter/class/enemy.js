const { Character } = require("./character");

class Enemy extends Character {
  constructor(name, description, currentRoom, health) {
    // Stats
    super(name, description, currentRoom);
    this.health = health;
    // Actions
    this.cooldown = 3000;
    this.actions = [
      // Actions are currently weighted purely by having duplicate array entries. Refactor so different actions can be tied to different enemies and with different weight.
      this.randomMove.bind(this),
      this.attack.bind(this),
      this.attack.bind(this),
      this.attack.bind(this),
      this.scratchNose.bind(this),
    ];
    this.attackTarget = null;
    this.player = null;
    // Status
    this.currentRoom.enemies.push(this);
  }

  setPlayer(player) {
    this.player = player;
  }

  randomMove() {
    this.cooldown += 5000;
    const exits = this.currentRoom.getExits();
    const randomExit = exits[Math.floor(Math.random() * exits.length)];
    const randomConnectingRoom =
      this.currentRoom.getRoomInDirection(randomExit);
    this.currentRoom = randomConnectingRoom;
    this.currentRoom.enemies.push(this);
    this.takeFood();
    console.log(`${this.name} moved to the ${this.currentRoom.name}`);
  }

  takeFood() {
    for (const item of this.currentRoom.items) {
      if (item.isFood) {
        this.takeItem(item.name);
      }
    }
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
    if (this.attackTarget) {
      this.attackTarget.applyDamage(this.strength);
      this.alert(
        `${this.name} attacks! Your health is now ${this.attackTarget.health}.`
      );
    }
  }

  applyDamage(amount) {
    super.applyDamage(amount);
    this.cooldown = 0;
  }

  act() {
    if (this.health <= 0) {
      this.die();
      console.log(
        `${this.name} is dead. Type 'l' to see if they dropped any items.`
      );
    } else if (this.cooldown > 0) {
      this.rest();
    } else {
      if (this.player && this.player.currentRoom === this.currentRoom) {
        const randomAct =
          this.actions[Math.floor(Math.random() * this.actions.length)];
        randomAct();
      }
      this.rest();
    }
  }

  scratchNose() {
    this.cooldown += 3000;

    this.alert(`${this.name} scratches its nose`);
  }
}

module.exports = {
  Enemy,
};
