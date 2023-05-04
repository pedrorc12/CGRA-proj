import {CGFobject, CGFtexture, CGFappearance} from '../lib/CGF.js';
import { MyQuad } from "./MyQuad.js";
/**
 * MyCubeMap
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCubeMap extends CGFobject {
	constructor(scene, textureTop, textureFront, textureRight, textureBack, textureLeft, textureBottom) {
		super(scene);
        this.scene = scene;

        this.quad = new MyQuad(scene);

        this.quadMaterial = new CGFappearance(scene);
        this.quadMaterial.setAmbient(0, 0, 0, 1);
        this.quadMaterial.setDiffuse(0, 0, 0, 1);
        this.quadMaterial.setSpecular(0, 0, 0, 1);
        this.quadMaterial.setShininess(10.0);
        this.quadMaterial.setEmission(1, 1, 1, 1);
        this.quadMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.textureTop = textureTop;
        this.textureFront = textureFront;
        this.textureRight = textureRight;
        this.textureBack = textureBack;
        this.textureLeft = textureLeft;
        this.textureBottom = textureBottom;

	}
	
	display() {

        this.scene.pushMatrix();

        this.scene.translate(this.scene.camera.position[0], this.scene.camera.position[1], this.scene.camera.position[2]);
        this.scene.scale(500, 500, 500);

        //FACE FRONTAL
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.quadMaterial.setTexture(this.scene.textureFront);
        this.quadMaterial.apply();
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.quad.display();
        this.scene.popMatrix();

        //FACE ESQUERDA
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.quadMaterial.setTexture(this.scene.textureLeft);
        this.quadMaterial.apply();
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.quad.display();
        this.scene.popMatrix();

        //FACE DE TRÁS
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.quadMaterial.setTexture(this.scene.textureBack);
        this.quadMaterial.apply();
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.quad.display();
        this.scene.popMatrix();

        //FACE DIREITA
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(Math.PI*3/2, 0, 1, 0);
        this.quadMaterial.setTexture(this.scene.textureRight);
        this.quadMaterial.apply();
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.quad.display();
        this.scene.popMatrix();

        //FACE DE CIMA
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(Math.PI/2, -1, 0, 0);
        this.quadMaterial.setTexture(this.scene.textureTop);
        this.quadMaterial.apply();
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.quad.display();
        this.scene.popMatrix();

        //FACE DEBAIXO
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.quadMaterial.setTexture(this.scene.textureBottom);
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.quadMaterial.apply();
        this.quad.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}