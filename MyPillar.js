import { CGFobject, CGFappearance, CGFshader, CGFtexture} from '../lib/CGF.js';
import { MyCylinder } from './MyCylinder.js';

export class MyPillar extends CGFobject {
	constructor(scene, texture, sides) {
		super(scene);
        this.scene = scene;
        this.size = 0.25;
        this.yScale = 12;
        this.floor = -1;
        this.material = new CGFappearance(scene);
		this.material.setAmbient(0.3, 0.3, 0.3, 1);
		this.material.setDiffuse(0.7, 0.7, 0.7, 1);
		this.material.setSpecular(0.0, 0.0, 0.0, 1);
		this.material.setShininess(120);
        this.material.setTextureWrap('REPEAT', 'REPEAT');
        this.material.setTexture(texture);
        
        this.cylinder = new MyCylinder(scene, sides);
     
	}
    display(){
        this.material.apply(); 
        this.scene.pushMatrix();
        
        this.scene.translate(10, this.floor,-6)
        this.scene.scale(this.size, this.yScale, this.size);
        this.cylinder.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();
        
        this.scene.translate(10, this.floor,-9)
        this.scene.scale(this.size, this.yScale, this.size);
        this.cylinder.display();

        this.scene.popMatrix();
        this.material.apply(); 
        this.scene.pushMatrix();
        
        this.scene.translate(15, this.floor,-6)
        this.scene.scale(this.size, this.yScale, this.size);
        this.cylinder.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();
        
        this.scene.translate(15, this.floor,-9)
        this.scene.scale(this.size, this.yScale, this.size);
        this.cylinder.display();

        this.scene.popMatrix();
        this.material.apply(); 
        this.scene.pushMatrix();
        
        this.scene.translate(20, this.floor,-6)
        this.scene.scale(this.size, this.yScale, this.size);
        this.cylinder.display();

        this.scene.popMatrix();
        this.scene.pushMatrix();
        
        this.scene.translate(20, this.floor,-9)
        this.scene.scale(this.size, this.yScale, this.size);
        this.cylinder.display();

        this.scene.popMatrix();
    }
    

    

}