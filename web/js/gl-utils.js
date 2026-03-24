// ─── WebGL shader utilities ─────────────────────────────────────

const VERTEX_SRC = `
    attribute vec3 aPosition;
    attribute vec4 aColor;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    varying vec4 vColor;
    void main() {
        vColor = aColor;
        gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);
    }
`;

const FRAGMENT_SRC = `
    precision mediump float;
    varying vec4 vColor;
    void main() {
        gl_FragColor = vColor;
    }
`;

function compileShader(gl, source, type) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader error:', gl.getShaderInfoLog(shader));
        return null;
    }
    return shader;
}

export function createProgram(gl) {
    const program = gl.createProgram();
    gl.attachShader(program, compileShader(gl, VERTEX_SRC, gl.VERTEX_SHADER));
    gl.attachShader(program, compileShader(gl, FRAGMENT_SRC, gl.FRAGMENT_SHADER));
    gl.linkProgram(program);
    gl.useProgram(program);
    return program;
}
