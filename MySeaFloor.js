import { CGFobject, CGFappearance, CGFshader, CGFtexture} from '../lib/CGF.js';
import { MyPlane } from './MyPlane.js';

export class MySeaFloor extends CGFobject {
	constructor(scene, texture, divisions) {
		super(scene);
        this.scene = scene;
        divisions = 50;
        this.shellPosx = 10;
        this.shellposz = 10;
        
        this.numberOfrocks = 10;
        this.rockCounter = 0;

        this.rockPositions = [];

        for(let i = 0; i < this.numberOfrocks; i++){
            let pos = [Math.random()*(11 - 9) + 9, -1.40, Math.random()*(11 - 9) + 9];
            this.rockPositions.push(pos);
        }


        this.material = new CGFappearance(scene);
		this.material.setAmbient(0.3, 0.3, 0.3, 1);
		this.material.setDiffuse(0.7, 0.7, 0.7, 1);
		this.material.setSpecular(0.0, 0.0, 0.0, 1);
		this.material.setShininess(120);
        this.material.setTextureWrap('REPEAT', 'REPEAT');
        this.material.setTexture(texture);

        this.sandMap = new CGFtexture(scene, "images/sandMap.png");
        this.shell = new CGFtexture(scene, "images/shell.png");

        this.sandShader = new CGFshader(scene.gl, "shaders/sand.vert", "shaders/sand.frag");
        this.sandShader.setUniformsValues({uSampler2: 1, uSampler3: 2, shellPosx: this.shellPosx/50, shellPosz: this.shellposz/50});
        
        this.plane = new MyPlane(scene, divisions, 0, 1, 0, 1);
        
     
	}
    getShellX(){
        return this.shellPosx;
    }
    getShellZ(){
        return this.shellposz;
    }
    getNextRockX(){
        return this.rockPositions[this.rockCounter][0];
    }
    getNextRockY(){
        return this.rockPositions[this.rockCounter][1];
    }
    getNextRockZ(){
        return this.rockPositions[this.rockCounter][2];
    }

    receiveRock(rock){
        rock.setX(this.rockPositions[this.rockCounter][0]);
        rock.setY(this.rockPositions[this.rockCounter][1]);
        rock.setZ(this.rockPositions[this.rockCounter][2]);
        if(this.rockCounter < this.numberOfrocks) this.rockCounter++;
    }
    


    display(){
        this.scene.setActiveShader(this.sandShader); 
        this.material.apply();
        this.sandMap.bind(1);
        this.shell.bind(2);

        this.scene.pushMatrix();
        
        this.scene.translate(0, -1, 0);
        this.scene.scale(50, 1, 50);

        this.scene.rotate(-Math.PI/2, 1, 0, 0);

        this.plane.display();

        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);
    }
    

    

}