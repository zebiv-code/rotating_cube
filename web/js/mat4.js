// ─── Matrix math ────────────────────────────────────────────────
export function create() { return new Float32Array(16); }

export function identity(m) {
    m.fill(0); m[0] = m[5] = m[10] = m[15] = 1;
}

export function perspective(out, fov, aspect, near, far) {
    const f = 1 / Math.tan(fov / 2), nf = 1 / (near - far);
    out.fill(0);
    out[0] = f / aspect; out[5] = f;
    out[10] = (far + near) * nf; out[11] = -1;
    out[14] = 2 * far * near * nf;
}

export function multiply(a, b, out) {
    const t = new Float32Array(16);
    for (let i = 0; i < 4; i++)
        for (let j = 0; j < 4; j++)
            for (let k = 0; k < 4; k++)
                t[i * 4 + j] += a[i * 4 + k] * b[k * 4 + j];
    out.set(t);
}

export function rotateX(m, a) {
    const r = create(); identity(r);
    r[5] = Math.cos(a); r[6] = -Math.sin(a);
    r[9] = Math.sin(a); r[10] = Math.cos(a);
    multiply(m, r, m);
}

export function rotateY(m, a) {
    const r = create(); identity(r);
    r[0] = Math.cos(a); r[2] = Math.sin(a);
    r[8] = -Math.sin(a); r[10] = Math.cos(a);
    multiply(m, r, m);
}
