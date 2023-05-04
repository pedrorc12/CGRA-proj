import { CGFobject } from '../lib/CGF.js'
import { MyMovingFish } from './MyMovingFish.js'

export class MyBot extends CGFobject{
    constructor(scene, width, radius, angleSpeed, x, z, color, texture){
        super(scene);
        this.scene = scene;
        this.radius = radius;
        this.x = x;
        this.z = z;
        let velocity = angleSpeed*radius;

        this.movingFish = new MyMovingFish(scene, width, color, texture);

        this.movingFish.accelerate(velocity);
        this.movingFish.turn(angleSpeed);
    }
    update(){
        this.movingFish.update();
    }
    display(){
        this.scene.pushMatrix();
        this.scene.translate(-this.radius + this.x, 0, this.z);
        this.movingFish.display();
        this.scene.popMatrix();
    }

}