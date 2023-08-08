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

  takeItem(itemName) {
    const item = this.currentRoom.getItemByName(itemName);
    this.items.push(item);
    this.currentRoom.items = this.currentRoom.items.filter(
      (item) => item.name !== itemName
    );
    return item;
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
}

module.exports = {
  Character,
};
