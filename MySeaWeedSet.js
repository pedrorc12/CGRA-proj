import { CGFobject } from '../lib/CGF.js';
import { MySeaWeed } from './MySeaWeed.js'

export class MySeaWeedSet extends CGFobject {
	constructor(scene) {
		super(scene);
        this.scene = scene;
        this.numberOfSeaWeeds = 50;
        this.seaWeeds = [];
        
        for(let i = 0; i < this.numberOfSeaWeeds; i++){
            this.seaWeeds.push(new MySeaWeed(scene, Math.random()*40 - 25, Math.random()*40 - 25));
        }
     
	}

    display(){
        this.scene.material.apply();
        
        for(let i = 0; i < this.numberOfSeaWeeds; i++){
            this.scene.pushMatrix();
            this.scene.translate(this.seaWeeds[i].getX(), -1, this.seaWeeds[i].getZ());
            this.seaWeeds[i].display();
            this.scene.popMatrix();
        }


    }
}