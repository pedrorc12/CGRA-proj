#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec4 filter;
varying vec2 shellCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform sampler2D uSampler3;

void main() {
	vec4 color = texture2D(uSampler, vTextureCoord);
	vec4 shell = texture2D(uSampler3, shellCoord);
	
	vec4 filter = texture2D(uSampler2, vTextureCoord);

	if (shell.b == shell.r && shell.b == shell.g) gl_FragColor = color*filter;
	else gl_FragColor = shell;
}