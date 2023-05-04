import { CGFobject, CGFappearance, CGFshader, CGFtexture} from '../lib/CGF.js';
import { MyPlane } from './MyPlane.js';

export class MySeaSurface extends CGFobject {
	constructor(scene, texture) {
		super(scene);
        this.scene = scene;
        this.t = 0;

        this.material = new CGFappearance(scene);
		this.material.setAmbient(0.3, 0.3, 0.3, 1);
		this.material.setDiffuse(0.7, 0.7, 0.7, 1);
		this.material.setSpecular(0.0, 0.0, 0.0, 1);
		this.material.setShininess(120);
        this.material.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
        this.material.setTexture(texture);

        this.distortionMap = new CGFtexture(scene, "images/distortionmap.png");

        this.distortionShader = new CGFshader(scene.gl, "shaders/waterDistortion.vert", "shaders/waterDistortion.frag");
        this.distortionShader.setUniformsValues({uSampler2: 1});
        this.distortionShader.setUniformsValues({timeFactor: 0});
        
        this.plane = new MyPlane(scene, 50);
        
	}
    update(t){
        this.t = t;
    }
    display(){
        this.distortionShader.setUniformsValues({timeFactor: this.t / 400 % 100});
      
        this.scene.setActiveShader(this.distortionShader); 
        this.material.apply();
        this.distortionMap.bind(1);
        
        this.scene.pushMatrix();
        
        this.scene.translate(0, 10, 0);
        this.scene.scale(50, 1, 50);

        this.scene.rotate(Math.PI/2, 1, 0, 0);

        this.plane.display();

        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);
    }
    

    

}