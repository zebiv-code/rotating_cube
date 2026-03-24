// ─── Main: init, render loop, resize ────────────────────────────
import * as M4 from './mat4.js';
import { createProgram } from './gl-utils.js';
import { initCube, drawCube } from './cube.js';

const canvas = document.getElementById('webgl-canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gl = canvas.getContext('webgl');
if (!gl) { document.body.textContent = 'WebGL not supported'; }

gl.viewport(0, 0, canvas.width, canvas.height);
gl.enable(gl.DEPTH_TEST);
gl.depthFunc(gl.LEQUAL);
gl.enable(gl.BLEND);
gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
gl.clearColor(0.0, 0.0, 0.0, 1.0);

const program = createProgram(gl);
initCube(gl, program);

const uProj = gl.getUniformLocation(program, 'uProjectionMatrix');
const uMV = gl.getUniformLocation(program, 'uModelViewMatrix');

const proj = M4.create();
const fov = 45 * Math.PI / 180, zNear = 0.1, zFar = 100;
M4.perspective(proj, fov, canvas.width / canvas.height, zNear, zFar);
gl.uniformMatrix4fv(uProj, false, proj);

let ax = 0, ay = 0;
const mv = M4.create();

function render() {
    ax += 0.01;
    ay += 0.02;
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    M4.identity(mv);
    M4.rotateX(mv, ax);
    M4.rotateY(mv, ay);
    mv[14] = -6;
    gl.uniformMatrix4fv(uMV, false, mv);
    drawCube(gl);
    requestAnimationFrame(render);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
    M4.perspective(proj, fov, canvas.width / canvas.height, zNear, zFar);
    gl.uniformMatrix4fv(uProj, false, proj);
});

render();
