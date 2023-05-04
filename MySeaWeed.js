import { CGFobject, CGFappearance } from '../lib/CGF.js';
import { MyPyramid } from './MyPyramid.js'

export class MySeaWeed extends CGFobject{
    constructor(scene, x, z){
        super(scene);
        this.scene = scene;
        
        this.maxHeight = 2.0;
        this.minHeight = 1.0;

        this.seaWeeds = [];
        this.heights = [];
        this.leafx = [];
        this.leafz = [];

        this.colors = [];

        let maxNumber = 4;
        this.leafNumber = Math.floor(Math.random()*maxNumber);
        for(let i = 0; i <this.leafNumber; i++){
            this.seaWeeds.push(new MyPyramid(scene));
            this.heights.push(Math.random()*(this.maxHeight - this.minHeight) + this.minHeight);
            this.leafx.push(Math.random()*this.maxHeight);
            this.leafz.push(Math.random()*this.maxHeight);

            let greenDelta = Math.random()*0.3;
            this.scene.seaWeedMaterial = new CGFappearance(this.scene);
            this.scene.seaWeedMaterial.setAmbient(0.1, 0.34+greenDelta, 0.15, 1);
            this.scene.seaWeedMaterial.setDiffuse(0.1, 0.34+greenDelta, 0.15, 1);
            this.scene.seaWeedMaterial.setSpecular(0.1, 0.1, 0.1, 1);
            this.scene.seaWeedMaterial.setShininess(120);
            this.colors.push(this.scene.seaWeedMaterial);

        }


        this.x = x;
        this.z = z;

        
    }
    
    getX(){
        return this.x;
    }
    getZ(){
        return this.z;
    }

    display(){
        this.scene.pushMatrix();
        this.scene.scale(0.10, 1, 0.10);
        
        for(let i = 0; i < this.leafNumber; i++){
            this.colors[i].apply();
            this.scene.scale(1, this.heights[i], 1);
            this.scene.translate(this.leafx[i], 0, this.leafz[i]);
            this.seaWeeds[i].display();
        }

        this.scene.popMatrix();

    }
}