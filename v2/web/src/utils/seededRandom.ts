// https://stackoverflow.com/a/19301306
let m_w = 123456789;
let m_z = 987654321;
const mask = 0xffffffff;

// Takes any integer
function seed_rand(i: number) {
    m_w = (123456789 + i) & mask;
    m_z = (987654321 - i) & mask;
}

// Returns number between 0 (inclusive) and 1.0 (exclusive),
// just like Math.random().
export function random(seed: number) {
    seed_rand(seed);

    m_z = (36969 * (m_z & 65535) + (m_z >> 16)) & mask;
    m_w = (18000 * (m_w & 65535) + (m_w >> 16)) & mask;
    let result = ((m_z << 16) + (m_w & 65535)) >>> 0;
    result /= 4294967296;
    return result;
}
