// Maybe need this?
const collide = (ax, ay, aw, ah, bx, by, bw, bh) => {
  // ? Idk
  if (ax < bx + bw && ax + aw > bx && ay < by + bh && ah + ay > by) {
    console.log(ax, ay, aw, ah, bx, by, bw, bh)
    return true
  }
  return false
}

export default collide
