import { CGFobject, CGFtexture, CGFappearance, CGFshader } from '../lib/CGF.js';
import { MyPlane } from './MyPlane.js';
import { MySphere } from './MySphere.js';
import { MyTriangle } from './MyTriangle.js';

/**
 * MyFish
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyFish extends CGFobject {
	constructor(scene, width, color, texture) {
		super(scene);
        this.scene = scene;
        this.width = width;
        this.animationCounter = 0;
        this.rightFinAnimation = 1;
        this.leftFinAnimation = 1;
        this.tailAnimation = 1;
        
        this.scene.body = new MySphere(scene, 16, 8);
        this.scene.rightFin = new MyTriangle(scene);
        this.scene.leftFin = new MyTriangle(scene);
        this.scene.topFin = new MyTriangle(scene);
        this.scene.tail = new MyTriangle(scene);

        this.scene.leftEye = new MySphere(scene, 16, 8);
        this.scene.rightEye = new MySphere(scene, 16, 8);


        this.material = new CGFappearance(scene);
        this.material.setAmbient(0, 0, 0, 1);
        this.material.setDiffuse(0, 0, 0, 1);
        this.material.setSpecular(0, 0, 0, 1);
        this.material.setEmission(1, 1, 1, 1);
        this.material.setShininess(10.0);
        this.material.setTextureWrap('REPEAT', 'REPEAT');


        this.eyeMatriel = new CGFappearance(scene);
        this.eyeMatriel.setAmbient(1, 1, 1, 1);
        this.eyeMatriel.setDiffuse(1, 1, 1, 1);
        this.eyeMatriel.setSpecular(0, 0, 0, 1);
        //this.eyeMatriel.setEmission(1, 1, 1, 1);
        this.eyeMatriel.setShininess(10.0);
        this.eyeMatriel.setTextureWrap('REPEAT', 'REPEAT');
        this.eyeMatriel.loadTexture("images/white.jpg")

        this.fishTexture = texture;

        this.finMaterial = new CGFappearance(scene);
        this.finMaterial.setAmbient(color[0], color[1], color[2], 1);
        this.finMaterial.setDiffuse(color[0], color[1], color[2], 1);
        this.finMaterial.setSpecular(0, 0, 0, 1);
        this.finMaterial.setEmission(0.0, 0, 0, 1);
        this.finMaterial.setShininess(10.0);
        
        
        this.shader = new CGFshader(this.scene.gl, "shaders/fish.vert", "shaders/fish.frag");
        this.eyeShader = new CGFshader(this.scene.gl, "shaders/eye.vert", "shaders/eye.frag");
        this.shader.setUniformsValues({limits: [1.0, 2.0, 1.5], headColor: [color[0], color[1], color[2], 1.0]});
    }
    update(velocity, angleVelocity){
        
        let animationVelocity;
        if(velocity == 0) animationVelocity = 0.25;
        else if(Math.abs(velocity) > 2) animationVelocity = 2;
        else animationVelocity = velocity;
        this.tailAnimation = Math.cos(1.2*this.animationCounter)*animationVelocity;
        
        if(angleVelocity > 0){
            this.rightFinAnimation = 0;
            this.leftFinAnimation = Math.cos(this.animationCounter);
        }
        else if(angleVelocity < 0){
            this.rightFinAnimation = Math.cos(this.animationCounter);
            this.leftFinAnimation = 0;
        }
        if(angleVelocity == 0) {
            this.rightFinAnimation = Math.cos(this.animationCounter);
            this.leftFinAnimation = Math.cos(this.animationCounter);
        }
        
        this.animationCounter +=  4*Math.PI*5/180;
        
    }

    display(){
        //Body
        this.scene.pushMatrix();
        
        let scale = this.width/2;
        this.scene.scale(scale, scale, scale);
        this.material.setTexture(this.fishTexture);
        this.material.apply();
        
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        
        this.scene.setActiveShader(this.shader);
        this.scene.body.display();
        this.scene.popMatrix();
        
        this.scene.setActiveShader(this.scene.defaultShader);

        //Right Fin
        this.scene.pushMatrix();
        this.finMaterial.apply();
        
        this.scene.translate(0.8, -0.5, 0 )
        
        //Animate using this rotate
        this.scene.rotate(Math.PI*this.rightFinAnimation/8, 0, 0, 1);
        this.scene.translate(-0.8, 0.4, 0 )
        this.scene.rotate(-Math.PI/4, 0, 0, 1);
        this.scene.scale(0.8, 0.6, 0.6);
        this.scene.translate(2.2, 0.6, 0.6);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.scene.translate(0, 0, -0.5);
        
        this.scene.rightFin.display();
        this.scene.popMatrix();

        //Left Fin
        this.scene.pushMatrix();
        this.finMaterial.apply();
        
        this.scene.translate(-0.8, -0.5, 0 )
        //Animation
        this.scene.rotate(-Math.PI*this.leftFinAnimation/8, 0, 0, 1);
        this.scene.translate(0.8, 0.4, 0 )
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.scene.scale(0.8, 0.6, 0.6);
        this.scene.translate(-2.2, 0.6, 0.6);
        this.scene.rotate(-Math.PI/4, 0, 1, 0);
        this.scene.translate(0, 0, -0.5);
        
        this.scene.leftFin.display();
        this.scene.popMatrix();

        //Top fin
        this.scene.pushMatrix();
        this.finMaterial.apply();
        
        this.scene.translate(0, 2, 0);
        this.scene.scale(0.8, 0.8, 0.8);
        this.scene.rotate(Math.PI*3/4, 1, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        
        this.scene.topFin.display();
        this.scene.popMatrix();

        //Tail
        this.scene.pushMatrix();
        this.finMaterial.apply();
        
        this.scene.translate(0, 0, -2);
        //Use this rotate for animation
        this.scene.rotate(Math.PI*this.tailAnimation/8, 0, 1, 0);
        this.scene.translate(0, 0, -1);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        
        this.scene.tail.display();
        this.scene.popMatrix();

        //Left eye
        this.scene.pushMatrix();
        this.eyeMatriel.apply();
        this.scene.setActiveShader(this.eyeShader);
        
        this.scene.translate(0.6, 0.6, 1.2);
        this.scene.scale(0.2, 0.2, 0.2);
        this.scene.rotate(-Math.PI*1/6, 0, 1, 0)
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.rotate(Math.PI/2, 0, 0, 1);

        this.scene.leftEye.display();
        this.scene.popMatrix();
        
        //Right eye
        this.scene.pushMatrix();
        this.eyeMatriel.apply();
        
        this.scene.translate(-0.6, 0.6, 1.2);
        this.scene.scale(0.2, 0.2, 0.2);
        this.scene.rotate(Math.PI*1/6, 0, 1, 0)
        this.scene.rotate(Math.PI/2, 0, 0, 1);

        this.scene.rightEye.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.popMatrix();
    }

    setTailAnimation(tailAnimation){
        this.tailAnimation = tailAnimation;
    }
    getTailAnimation(){
        return this.tailAnimation;
    }
    
}