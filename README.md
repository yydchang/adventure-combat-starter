# App Academy Adventure Combat

Welcome to App Academy Adventure! For this project, you will be extending your
original adventure game with an enemy class and asynchronous combat.

## Running the code

Type `node game.js` to run the project.

Type `npm install` to install the test packages, then `mocha` to run tests.


## Tasks

1. [x] Create a `Character` class which is the parent of `Player` and `Enemy`
   classes
2. [x] Create an `Enemy` class which performs actions on a cooldown timer
3. [x] Fill in the appropriate code gaps (look at the test specs) until you see
   the goblin scratching its nose every 3 seconds
4. [x] Implement the ability for the goblin to move to a different room on a
   cooldown timer
5. [x] Implement the ability for the player to hit the goblin for damage
6. [x] Implement the ability for the goblin to attack the player back after being
   hit once
7. [x] The goblin should attack the player on sight once hit
8. [x] All enemy actions should increase the cooldown timer, and the enemy should
   not act unless cooldown is 0
9. [x] The player and enemies should die once their health is at or below 0

## Tips

* Copy your `Item` code from the previous project. Do test specs still pass?
  Did the OOP principles make this process easy or difficult?
* Take a look at the `Enemy.rest()` setTimeout loop. There is a bug in this
  code. Can you find it?
* Use the tests to your advantage! They will give you many hints about how the
  code should work.

## Bonus tasks

1. [x] Make the goblin pick up food when in the same room
2. [] Modify strength and health values for the player and goblin
3. [] Create a `Weapon` class that inherits from `Item` that can be wielded for more strength
   [x] Create Weapon class file
   [x] Export Weapon class into World
   [x] Add Weapon to world-data
   [x] Add function to equip player with Weapon. Currently doing this upon picking up the weapon.
   [x] Add function for Weapon to increase strength of character. Currently doing this upon picking up the weapon.
   [] Add function for Enemy to steal items
   [] Limit weapon to one at a time
4. [] Create an `Armor` class that can be worn to reduce damage
5. [x] Increase health when `Food` is eaten
6. [] Create new combat abilities and scenarios
7. [] Grow the world and enemies for more complex scenarios
8. [] Create a friendly `Shopkeeper` character that cannot be attacked and will sell you items
   [] Add currency system
   [] Add limit to inventory
9. [] Use your imagination! The sky is the limit.
   [] Add win condition when all enemies are defeated
