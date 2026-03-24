// ─── Cube geometry ──────────────────────────────────────────────
// Position (3) + color with alpha (4) = 7 floats per vertex

const VERTICES = new Float32Array([
    // Front (red)
    -1,-1, 1, 1,0,0,0.7,  1,-1, 1, 1,0,0,0.7,  1, 1, 1, 1,0,0,0.7, -1, 1, 1, 1,0,0,0.7,
    // Back (green)
    -1,-1,-1, 0,1,0,0.7, -1, 1,-1, 0,1,0,0.7,  1, 1,-1, 0,1,0,0.7,  1,-1,-1, 0,1,0,0.7,
    // Top (blue)
    -1, 1,-1, 0,0,1,0.7, -1, 1, 1, 0,0,1,0.7,  1, 1, 1, 0,0,1,0.7,  1, 1,-1, 0,0,1,0.7,
    // Bottom (yellow)
    -1,-1,-1, 1,1,0,0.7,  1,-1,-1, 1,1,0,0.7,  1,-1, 1, 1,1,0,0.7, -1,-1, 1, 1,1,0,0.7,
    // Right (purple)
     1,-1,-1, 1,0,1,0.7,  1, 1,-1, 1,0,1,0.7,  1, 1, 1, 1,0,1,0.7,  1,-1, 1, 1,0,1,0.7,
    // Left (cyan)
    -1,-1,-1, 0,1,1,0.7, -1,-1, 1, 0,1,1,0.7, -1, 1, 1, 0,1,1,0.7, -1, 1,-1, 0,1,1,0.7
]);

const INDICES = new Uint16Array([
    0,1,2, 0,2,3,  4,5,6, 4,6,7,  8,9,10, 8,10,11,
    12,13,14, 12,14,15,  16,17,18, 16,18,19,  20,21,22, 20,22,23
]);

export function initCube(gl, program) {
    const vBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuf);
    gl.bufferData(gl.ARRAY_BUFFER, VERTICES, gl.STATIC_DRAW);

    const iBuf = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuf);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, INDICES, gl.STATIC_DRAW);

    const stride = 7 * 4;
    const aPos = gl.getAttribLocation(program, 'aPosition');
    const aCol = gl.getAttribLocation(program, 'aColor');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, stride, 0);
    gl.enableVertexAttribArray(aCol);
    gl.vertexAttribPointer(aCol, 4, gl.FLOAT, false, stride, 12);
}

export function drawCube(gl) {
    gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
}
