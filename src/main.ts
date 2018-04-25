import { ErrorMapper } from "utils/ErrorMapper";
import { CreepRunner } from "creep";

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {

    // Automatically delete memory of missing creeps
    for (const name in Memory.creeps) {
        if (!(name in Game.creeps)) {
            delete Memory.creeps[name];
        }
    }
    
    var creepList = _.filter(Game.creeps, (creep) => creep.memory.role == 'creep');

    if (creepList.length < 1 && Game.spawns['Spawn1'].room.energyAvailable < 550) {
        var newName = 'Creep' + Game.time;
        console.log('Spawning new creep: ' + newName);
        var r = Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE], newName, { memory: { role: 'creep', building: false, index: creepList.length } });
        if (r != OK) console.log(r);
    }
    if (creepList.length < 6 && Game.spawns['Spawn1'].room.energyAvailable >= 550) {
        var newName = 'Andy' + Game.time;
        console.log('Spawning new creep: ' + newName);
        var r = Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], newName, { memory: { role: 'creep', building: false, index: creepList.length } });
        if (r != OK) console.log(r);
    }

    var index = 0;
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        new CreepRunner().run(creep);
        index++;
    }
});