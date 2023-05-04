attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform sampler2D uSampler3;
uniform float shellPosx;
uniform float shellPosz;

varying vec2 shellCoord;
varying vec2 vTextureCoord;
varying vec4 shell;

void main() {
	vTextureCoord = aTextureCoord;
    float radius = 1.0;
    vec3 offset = aVertexNormal*(texture2D(uSampler2, vTextureCoord).b*5.0 - 2.5);

	shellCoord = vec2(vTextureCoord.s - 0.45 - shellPosx, vTextureCoord.t - 0.45 - shellPosz)*10.0;
	vec4 shell = texture2D(uSampler3, shellCoord);
	
	vec3 shellOffset = aVertexNormal*(- 0.5);
	
	if (shell.b == shell.r) gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset, 1.0);
	else gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+shellOffset, 1.0);

}
