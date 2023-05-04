import { MyFish } from './MyFish.js';
import { MyMovingObject } from './MyMovingObject.js';

export class MyMovingFish extends MyMovingObject {
    constructor(scene, width, color, texture){
        let fish = new MyFish(scene, width, color, texture);
        
        super(scene, fish);
        this.heighLimit = 5;
        this.floorLimit = -0.5;

        this.rockPickUpDist = 1.5;
        this.deliveryDist = 5;
        this.associatedRock;
        this.associatedRockOriginalPos = [0, 0, 0]; //pos[0] = X, pos[1] = Y, pos[2] = Z
        this.hasRock = false;

        this.diveSpeed = 0.25;
        this.goingUp = false;
        this.goingDown = false;
    }
    dive(){
        this.goingDown = (this.y > this.floorLimit);
        if(this.goingUp) this.goingDown = this.goingUp = false;
    }
    submerge(){
        this.goingUp = this.y < this.heighLimit && !this.goingDown;
        if(this.goingDown) this.goingDown = this.goingUp = false;
    }
    distance(x, y, z){
        return Math.sqrt(Math.pow(x - this.x, 2) +
            Math.pow(y - this.y, 2) + 
            Math.pow(z - this.z, 2)
        )
    }
    tryPickUp(numberOfRocks, rocks, shellPosx, shellPosz){
        if(this.hasRock){
            if(this.distance(shellPosx, 0, shellPosz) < this.deliveryDist){
                this.hasRock = false;
                this.associatedRock.dissociate();
                this.associatedRock.launch(this.scene.seaFloor.getNextRockX(), this.scene.seaFloor.getNextRockY(), this.scene.seaFloor.getNextRockZ(), this.x, this.y, this.z);
            }
        }
        else{
            this.findNearRock(numberOfRocks, rocks);
        }
    }
    findNearRock(numberOfRocks, rocks){
        for(let i = 0; i < numberOfRocks; i++){
            let dist = this.distance(rocks[i].getX(), rocks[i].getY(), rocks[i].getZ()); 
            if(dist < this.rockPickUpDist && !rocks[i].isBusy()){
                this.hasRock = true;
                rocks[i].associate();
                console.log("Found Rock")
                this.associatedRockOriginalPos[0] = rocks[i].getX();
                this.associatedRockOriginalPos[1] = rocks[i].getY();
                this.associatedRockOriginalPos[2] = rocks[i].getZ();
                this.associatedRock = rocks[i];
                return;
            }
        }
    }
    reset(){
        super.reset();
        if(this.hasRock){
            this.associatedRock.setX(this.associatedRockOriginalPos[0]);
            this.associatedRock.setY(this.associatedRockOriginalPos[1]);
            this.associatedRock.setZ(this.associatedRockOriginalPos[2]);
            this.associatedRock.dissociate();
            this.hasRock = false;
        }
    }
    update(){
        super.update();

        this.object.update(this.velocity);

        if(this.hasRock){
            this.associatedRock.setX(this.x);
            this.associatedRock.setY(this.y);
            this.associatedRock.setZ(this.z);
            this.associatedRock.setTheta(this.orientation);
        }
        if(this.goingDown && this.y > this.floorLimit) this.y -= this.diveSpeed;
        else this.goingDown = false;

        if(this.goingUp && this.y < this.heighLimit) this.y += this.diveSpeed;
        else this.goingUp = false;
    }

}