import {CGFobject, CGFtexture, CGFappearance} from '../lib/CGF.js';

export class MyCylinder extends CGFobject{
    constructor(scene, slices) {
        super(scene);
        this.slices = slices;

        this.initBuffers();
    }
    
    initBuffers() {

        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        let angDelta = 2*Math.PI/this.slices;
        let ang = angDelta;
        let texDelta = 1/this.slices;
        let tex = 0;
        let indice = [0, 1, 2, 3];
        let x = 1;
        let z = 0;
        
        //CYLINDER
        this.vertices.push(x, 0, z);
        this.vertices.push(x, 1, z);

        this.texCoords.push(tex, 1);
        this.texCoords.push(tex, 0);

        for(let side = 0; side < this.slices; side++) {
            x = Math.cos(ang);
            z = Math.sin(ang);
            this.vertices.push(x, 0, z);
            this.vertices.push(x, 1, z);

            ang += angDelta;
            tex += texDelta;

            this.indices.push(indice[1], indice[2], indice[0]);
            this.indices.push(indice[1], indice[3], indice[2]);
            this.indices.push(indice[2], indice[1], indice[0]);
            this.indices.push(indice[3], indice[1], indice[2]);

            this.texCoords.push(tex, 1);
            this.texCoords.push(tex, 0);

            this.normals.push(x, 0, z);
            this.normals.push(x, 0, z);
            
            indice = [indice[0] + 2, indice[1] + 2, indice[2] + 2, indice[3] + 2];
        }
        this.indices.push(indice[1], 0, indice[0]);
        this.indices.push(indice[1], 1, indice[2]);
        this.indices.push(0, indice[1], indice[0]);
        this.indices.push(1, indice[1], indice[2]);

        this.texCoords.push(tex, 1);
        this.texCoords.push(tex, 0);

        this.normals.push(x, 0, z);
        this.normals.push(x, 0, z);
            
        

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
}