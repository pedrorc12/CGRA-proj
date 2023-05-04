#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec2 distorionCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;

void main() {
    vec4 distorion = texture2D(uSampler2, distorionCoord);
    vec2 coords = vec2(vTextureCoord.s - distorion.r/5.0, vTextureCoord.t - distorion.g/5.0);
	
    gl_FragColor = texture2D(uSampler, coords);
}


