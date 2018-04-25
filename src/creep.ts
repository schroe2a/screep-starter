
export class CreepRunner {
    public run(creep: Creep) {

        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
	        //store
            var structures = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
            });
            if(structures.length > 0) {
                if(creep.transfer(structures[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structures[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
	        else {

    	        //construct
    	        var sites = creep.room.find(FIND_CONSTRUCTION_SITES);
    	        if(sites.length > 0) {
        	        var found = false;
        	        for(var i=0; i<sites.length; i++) {
                        if(creep.build(sites[i]) != ERR_NOT_IN_RANGE) {
                            found = true;
                        }
                    }
                    if(!found) {
                        creep.moveTo(sites[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
    	        }
                else {
                    //upgrade
                    var controller = Game.getObjectById<StructureController>('a2db077296e87b8');
                    if(controller != null) {
                        var upgradeResult = creep.upgradeController(controller);
                        if(upgradeResult == ERR_NOT_IN_RANGE) {
                            creep.moveTo(controller, {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                        else if(upgradeResult != OK){
                            console.log('Upgrade Attempt result: ' + upgradeResult);
                        }
                    }
                    else {
                        console.log('Upgrade can\'t find controller by ID');
                    }
                }
	        }
	    }
	    else {
            var sourceId: string;
            if(creep.memory.index % 2 == 0) sourceId = '9263077296e02bb';
            else sourceId = 'c12d077296e6ac9';

            var source = Game.getObjectById<Source>(sourceId);
            if(source != null) {
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            else {
                console.log('harvest can\'t find controller by ID');
            }
	    }
    }
}
