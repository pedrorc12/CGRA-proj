import { CGFscene, CGFaxis, CGFappearance, CGFtexture, CGFshader } from "../lib/CGF.js";
import { CGFcamera2 } from "./CGFcamera2.js"
import { MySphere } from "./MySphere.js";
import { MyCubeMap } from "./MyCubeMap.js";
import { MyCylinder } from "./MyCylinder.js";
import { MySeaFloor } from './MySeaFloor.js';
import { MySeaSurface } from './MySeaSurface.js'
import { MyRock } from './MyRock.js'
import { MyPillar } from './MyPillar.js'
import { MyMovingFish } from "./MyMovingFish.js";
import { MyRockSet } from './MyRockSet.js'
import { MySeaWeedSet } from './MySeaWeedSet.js';
import { MyBot } from './MyBot.js';

/**
* MyScene
* @constructor
*/
export class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);
        
        this.enableTextures(true);

        //------ Textures
            
        this.textureTop = new CGFtexture(this, 'images/underwater_cubemap/top.jpg');
        this.textureBottom = new CGFtexture(this, 'images/underwater_cubemap/bottom.jpg');
        this.textureFront = new CGFtexture(this, 'images/underwater_cubemap/front.jpg');
        this.textureBack = new CGFtexture(this, 'images/underwater_cubemap/back.jpg');
        this.textureRight = new CGFtexture(this, 'images/underwater_cubemap/right.jpg');
        this.textureLeft = new CGFtexture(this, 'images/underwater_cubemap/left.jpg');

        this.pierTexture = new CGFtexture(this, 'images/pier.jpg');
        this.earthTexture = new CGFtexture(this, 'images/earth.jpg'); 
        this.sandTexture = new CGFtexture(this, 'images/sand.png');
        this.pillarTexture = new CGFtexture(this, 'images/pillar.jpg');

        this.fishTexture = new CGFtexture(this, 'images/fish_scales.png');
        let red = [0.8, 0.0, 0.0];
        let green = [0.0, 0.8, 0.0];
        let blue = [0.0, 0.0, 0.8];
        
        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.incompleteSphere = new MySphere(this, 16, 8);
        this.cubeMap = new MyCubeMap(this, this.textureTop, this.textureFront, this.textureRight, this.textureBack, this.textureLeft, this.textureBottom);
        this.cylinder = new MyCylinder(this, 6);
        this.seaFloor = new MySeaFloor(this, this.sandTexture, 20);
        this.pier = new MySeaSurface(this, this.pierTexture);
        this.rock = new MyRock(this, 0, 0, 0, 16, 8);
        this.pillar = new MyPillar(this, this.pillarTexture, 24);
        this.movingFish = new MyMovingFish(this, 0.5, red, this.fishTexture);
        this.rockSet = new MyRockSet(this);
        this.seaWeedSet = new MySeaWeedSet(this); 
        this.bot = new MyBot(this, 0.5, 5, 0.15, 10, 10, blue, this.fishTexture);
        this.bot1 = new MyBot(this, 0.5, 6, 0.1, -7, -3, green, this.fishTexture);

        this.defaultAppearance = new CGFappearance(this);
		this.defaultAppearance.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setEmission(0,0,0,1);
		this.defaultAppearance.setShininess(120);

		this.sphereAppearance = new CGFappearance(this);
		this.sphereAppearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.sphereAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.sphereAppearance.setSpecular(0.0, 0.0, 0.0, 1);
		this.sphereAppearance.setShininess(120);
        this.sphereAppearance.loadTexture('images/earth.jpg');
        this.sphereAppearance.setTextureWrap('REPEAT', 'REPEAT');


        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displayBot1 = true;
        this.displayBot2 = true;

        this.textureIds = { 'Test': 0, 'Demo': 1, 'Alternative': 2, 'Ocean' : 3 };
        this.selectedTexture = -1;

        this.scaleFactor = 1;

        this.speedFactor = 1;
    }
    initLights() {
        this.setGlobalAmbientLight(0.6, 0.6, 0.6, 1.0);

        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera2(1.5, 0.1, 500, vec3.fromValues(2, 2, 2), vec3.fromValues(0, 2, 0));
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setEmission(0,0,0,1);
        this.setShininess(10.0);
    }
    updateCubeBox(){
        if(this.selectedTexture == 0){
            this.textureTop = new CGFtexture(this, 'images/test_cubemap/py.png');
            this.textureBottom = new CGFtexture(this, 'images/test_cubemap/ny.png');
            this.textureFront = new CGFtexture(this, 'images/test_cubemap/pz.png');
            this.textureBack = new CGFtexture(this, 'images/test_cubemap/nz.png');
            this.textureRight = new CGFtexture(this, 'images/test_cubemap/px.png');
            this.textureLeft = new CGFtexture(this, 'images/test_cubemap/nx.png');
        }
        if(this.selectedTexture == 1){
            this.textureTop = new CGFtexture(this, 'images/demo_cubemap/top.png');
            this.textureBottom = new CGFtexture(this, 'images/demo_cubemap/bottom.png');
            this.textureFront = new CGFtexture(this, 'images/demo_cubemap/front.png');
            this.textureBack = new CGFtexture(this, 'images/demo_cubemap/back.png');
            this.textureRight = new CGFtexture(this, 'images/demo_cubemap/right.png');
            this.textureLeft = new CGFtexture(this, 'images/demo_cubemap/left.png');
        }
        if(this.selectedTexture == 2){
            this.textureTop = new CGFtexture(this, 'images/alternative_cubemap/top.png');
            this.textureBottom = new CGFtexture(this, 'images/alternative_cubemap/bottom.png');
            this.textureFront = new CGFtexture(this, 'images/alternative_cubemap/front.png');
            this.textureBack = new CGFtexture(this, 'images/alternative_cubemap/back.png');
            this.textureRight = new CGFtexture(this, 'images/alternative_cubemap/right.png');
            this.textureLeft = new CGFtexture(this, 'images/alternative_cubemap/left.png');
        }
        if(this.selectedTexture == 3){
            this.textureTop = new CGFtexture(this, 'images/underwater_cubemap/top.jpg');
            this.textureBottom = new CGFtexture(this, 'images/underwater_cubemap/bottom.jpg');
            this.textureFront = new CGFtexture(this, 'images/underwater_cubemap/front.jpg');
            this.textureBack = new CGFtexture(this, 'images/underwater_cubemap/back.jpg');
            this.textureRight = new CGFtexture(this, 'images/underwater_cubemap/right.jpg');
            this.textureLeft = new CGFtexture(this, 'images/underwater_cubemap/left.jpg');
        }

        this.cubeMap = new MyCubeMap(this, this.textureTop, this.textureFront, this.textureRight, this.textureBack, this.textureLeft, this.textureBottom);
 
    }

    checkKeys() {
        var text = "Keys pressed: ";
        var keysPressed = false;
        
        if(this.gui.isKeyPressed("KeyW")){
            text += " W ";
            this.movingFish.accelerate(this.speedFactor/8);
            keysPressed = true;
        }

        if(this.gui.isKeyPressed("KeyS")){
            text += " S ";
            this.movingFish.accelerate(-this.speedFactor/8);
            keysPressed = true;
        }

        if(this.gui.isKeyPressed("KeyA")){
            text += " A ";
            this.movingFish.turn(this.speedFactor/8);
            keysPressed = true;
        }

        if(this.gui.isKeyPressed("KeyD")){
            text += " D ";
            this.movingFish.turn(-this.speedFactor/8);
            keysPressed = true;
        }

        if(this.gui.isKeyPressed("KeyR")){
            text += " R ";
            this.movingFish.reset();
            keysPressed = true;
        }
        
        if(this.gui.isKeyPressed("KeyP")){
            text += " P ";
            this.movingFish.submerge();
            keysPressed = true;
        }
        
        if(this.gui.isKeyPressed("KeyL")){
            text += " L ";
            this.movingFish.dive();
            keysPressed = true;
        }

        if(this.gui.isKeyPressed("KeyC")){
            text += " C "
            this.movingFish.tryPickUp(this.rockSet.getNumberOfRocks(), this.rockSet.getRocks(), this.seaFloor.getShellX(), this.seaFloor.getShellZ());
            keysPressed = true;
        }

        //if(keysPressed) console.log(text);
        
    }

    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        this.checkKeys();
        this.movingFish.update();
        this.pier.update(t);
        this.rockSet.update(t);
        this.bot.update();
        this.bot1.update();
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        
        
        this.defaultAppearance.apply();
        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.sphereAppearance.apply();

        var sca = [
            this.scaleFactor,
            0.0,
            0.0,
            0.0,
            0.0,
            this.scaleFactor,
            0.0,
            0.0,
            0.0,
            0.0,
            this.scaleFactor,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
          ];

        // ---- BEGIN Primitive drawing section

        //This sphere does not have defined texture coordinates
        
        this.cubeMap.display();
        
        this.pushMatrix();
        this.multMatrix(sca);
        
        this.defaultAppearance.apply();

        this.seaFloor.display();
        this.pier.display();
        this.defaultAppearance.apply();
        this.pillar.display();
        this.movingFish.display();
        this.rockSet.display();
        this.defaultAppearance.apply();
        this.seaWeedSet.display();
        if (this.displayBot1) this.bot.display();
        if (this.displayBot2) this.bot1.display();
        this.popMatrix();
        
        // ---- END Primitive drawing section
    }
}