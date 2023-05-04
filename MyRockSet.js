import { CGFobject, CGFappearance, CGFshader, CGFtexture} from '../lib/CGF.js';
import { MyRock } from './MyRock.js';

export class MyRockSet extends CGFobject {
	constructor(scene) {
		super(scene);
        this.scene = scene;
        this.numberOfRocks = 10;
        this.rocks = [];

        var slices = 16;
        var stacks = 8;

        this.scale = 0.1;
        
        for(let i = 0; i < this.numberOfRocks; i++){
            this.rocks.push(new MyRock(scene, Math.random()*50 - 25, -0.75, Math.random()*50 - 25, slices, stacks));
        }
        
        this.scene.material = new CGFappearance(scene);
		this.scene.material.setAmbient(0.3, 0.3, 0.3, 1);
		this.scene.material.setDiffuse(0.3, 0.3, 0.3, 1);
		this.scene.material.setSpecular(0.1, 0.1, 0.1, 1);
		this.scene.material.setShininess(120);
     
	}

    getNumberOfRocks(){
        return this.numberOfRocks
    }

    getRocks(){
        return this.rocks;
    }
    update(t){
        for(let i = 0; i < this.numberOfRocks; i++){
            this.rocks[i].update(t);
        }
    }

    display(){
        this.scene.material.apply();
        
        for(let i = 0; i < this.numberOfRocks; i++){
            this.scene.pushMatrix();
            this.scene.translate(this.rocks[i].getX(), this.rocks[i].getY(), this.rocks[i].getZ());
            if (this.rocks[i].isAssociated()) {
                this.scene.rotate(this.rocks[i].getTheta(), 0, 1, 0);
                this.scene.translate(0, 0, 0.5);
            }
            this.scene.scale(this.scale, this.scale, this.scale);
            this.rocks[i].display();
            this.scene.popMatrix();
        }


    }
}