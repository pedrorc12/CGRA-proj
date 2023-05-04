attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform vec3 limits;
varying vec2 vTextureCoord;
varying vec3 pos;

void main() {
    vTextureCoord = aTextureCoord;

    vec3 transform = aVertexPosition * limits; 

	gl_Position = uPMatrix * uMVMatrix * vec4(transform, 1.0);

    pos = aVertexPosition;
}
