const { Item } = require("./item");

class Weapon extends Item {
  constructor(name, description, strengthAdjustment) {
    super(name, description);
    this.strengthAdjustment = strengthAdjustment;
    isWeapon = true;
  }
}

module.exports = {
  Weapon,
};
