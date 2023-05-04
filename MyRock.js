import {CGFobject} from '../lib/CGF.js';

export class MyRock extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   * @param  {integer} slices - number of slices around Y axis
   * @param  {integer} stacks - number of stacks along Y axis, from the center to the poles (half of sphere)
   */
    constructor(scene, x, y, z, slices, stacks) {
        super(scene);
        this.latDivs = stacks * 2;
        this.longDivs = slices;
        this.initBuffers();

        this.launching = false;

        this.x = x;
        this.y = y;
        this.z = z;
		
		this.x0;
        this.y0;
        this.z0;

		this.time = 0;
    
		this.g = -0.25;
        this.vx = 1;
        this.vz = 1;
		this.dist;
		this.finalT;

        this.associated = false;

        this.theta = 0;
    }

  getX(){
    return this.x;
  }
  getY(){
    return this.y;
  }
  getZ(){
    return this.z;
  }
  getTheta(){
    return this.theta;
  }
  associate(){
    this.associated = true;
  }
  dissociate(){
    this.associated = false;
  }
  
  setX(x){
    this.x = x;
  }
  setY(y){
    this.y = y;
  }
  setZ(z){
    this.z = z;
  }
  setTheta(theta){
    this.theta = theta;
  }
  isAssociated(){
    return this.associated
  }
  isBusy(){
      return this.associated || this.launching;
  }

  launch(xFinal, yFinal, zFinal, x0, y0, z0){
        this.time = 0;
		this.x0 = x0 + 0.5;
		this.y0 = y0;
		this.z0 = z0;
		
		
        this.launching = true;
		this.finalT = Math.sqrt(Math.abs(yFinal - y0)*2/Math.abs(this.g));
		this.vx = (xFinal - x0)/this.finalT;
		this.vz = (zFinal - z0)/this.finalT;
    } 
	
  update(t){
		this.time += 0.20;
		if(this.launching){
			this.y = this.y0 + this.g*Math.pow(this.time, 2)/2;
			this.x = this.vx*this.time + this.x0;
			this.z = this.vz*this.time + this.z0;
			if(this.time >= this.finalT) {
				console.log("Delivered rock")
				this.launching = false;
				this.scene.seaFloor.receiveRock(this);
			}
  	    }
    }


  /**
   * @method initBuffers
   * Initializes the sphere buffers
   */
  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];


    var phi = 0;
    var theta = 0;
    var phiInc = Math.PI / this.latDivs;
    var thetaInc = (2 * Math.PI) / this.longDivs;
    var latVertices = this.longDivs + 1;

    var t = 0;
    var s = 0;
    var tDelta = 1/this.latDivs;
    var sDelta = 1/this.longDivs;

    // build an all-around stack at a time, starting on "north pole" and proceeding "south"
    for (let latitude = 0; latitude <= this.latDivs; latitude++) {
      var sinPhi = Math.sin(phi);
      var cosPhi = Math.cos(phi);
      s = 0;

      // in each stack, build all the slices around, starting on longitude 0
      theta = 0;
      for (let longitude = 0; longitude <= this.longDivs; longitude++) {
        //--- Vertices coordinates

        
        var ran = Math.random()*0.4 + 0.8;
        if (longitude == 0 || longitude == this.longDivs) ran = 1;
        var x = Math.cos(theta) * sinPhi * ran;
        var y = cosPhi * ran;
        var z = Math.sin(-theta) * sinPhi * ran;
        
        this.vertices.push(x, y, z);

        //--- Indices
        if (latitude < this.latDivs && longitude < this.longDivs) {
          var current = latitude * latVertices + longitude;
          var next = current + latVertices;
          // pushing two triangles using indices from this round (current, current+1)
          // and the ones directly south (next, next+1)
          // (i.e. one full round of slices ahead)
          
          this.indices.push( current + 1, current, next);
          this.indices.push( current + 1, next, next +1);
        }

        //--- Normals
        // at each vertex, the direction of the normal is equal to 
        // the vector from the center of the sphere to the vertex.
        // in a sphere of radius equal to one, the vector length is one.
        // therefore, the value of the normal is equal to the position vectro
        this.normals.push(x, y, z);
        theta += thetaInc;

        //--- Texture Coordinates
        this.texCoords.push(s, t);
        
        s += sDelta;
      }
      phi += phiInc;
      t += tDelta;
    }
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
}
