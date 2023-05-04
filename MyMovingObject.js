import {CGFobject} from '../lib/CGF.js';

export class MyMovingObject extends CGFobject {

    constructor(scene, object){
        super(scene);
        this.scene = scene;
        this.speedLimit = 0.5;
        this.angleLimit = 0.25;
        this.orientation = 0;
        
        this.angleVelocity = 0,
        this.velocity = 0;
        
        this.x = 0;
        this.y = 0;
        this.z = 0;


        this.object = object;
    }

    update() {
        this.x += Math.sin(this.orientation)*this.velocity;
        this.z += Math.cos(this.orientation)*this.velocity;
        this.orientation += this.angleVelocity;

        this.object.update(this.velocity, this.angleVelocity);
    }

    turn(val) {
        if (this.angleVelocity < this.angleLimit && val > 0) this.angleVelocity += val;
        if (this.angleVelocity > -this.angleLimit && val < 0) this.angleVelocity += val;
    }

    accelerate(val) {
        if (this.velocity < this.speedLimit && val > 0) this.velocity += val;
        if (this.velocity > -this.speedLimit && val < 0) this.velocity += val;
    }

    reset() {
        this.orientation = 0;

        this.angleVelocity = 0;
        this.velocity = 0;
        
        this.x = 0;
        this.z = 0;
        this.y = 0;
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(this.orientation, 0, 1, 0);
        this.object.display();
        this.scene.popMatrix();
    }
}