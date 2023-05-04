import {CGFobject} from '../lib/CGF.js';
/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPyramid extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
            //Base
			-1, 0, 0,	//0
			0, 0, 1,	//1
			1,  0, 0,	//2
            //Topo
            0, 1, 0     //3
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			2, 1, 0,
			1, 3, 0,
            2, 3, 1,
            0, 3, 2
		];
		
		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1, 
            0, 1, 0
		];
		

		this.texCoords = [
			0,   0.5,
			0,   1,
			0.5, 1
		]

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
		this.initNormalVizBuffers();
	}
	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
}

