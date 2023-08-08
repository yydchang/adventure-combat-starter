const { Item } = require("./item");

class Weapon extends Item {
  constructor(name, description, strengthAdjustment) {
    super(name, description);
    this.isWeapon = true;
    this.strengthAdjustment = strengthAdjustment;
  }
}

module.exports = {
  Weapon,
};
