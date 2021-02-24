const Distance = (compare, left, right) => {
  if (left.length == 0) {
    return [...right].length
  }
  if (right.length == 0) {
    return [...left].length
  }

  let a
  let b
  if (left.length > right.length) {
    a = [...left]
    b = [...right]
  } else {
    a = [...right]
    b = [...left]
  }
  
  let f = []
  for (let i = 0; i <= b.length; i++) {
    f[i] = i
  }

  for (let i2 = 0; i2 < a.length; i2++) {
    let prev = f[0]++

    for (let i3 = 0; i3 < b.length; i3++) {
      let diff = 0 !== compare(b[i3], a[i2])
      let swap
      if (diff && f[i3+1] <= f[i3] && f[i3+1] > prev) {
        swap = prev
        prev = f[i3+1]
        f[i3+1] = swap+1
      } else if (diff && f[i3+1] <= f[i3]) {
        swap = f[i3+1]
        prev = f[i3+1]
        f[i3+1] = swap+1
      } else if (f[i3+1] <= f[i3] && f[i3+1]+1 > prev) {
        swap = prev
        prev = f[i3+1]
        f[i3+1] = swap
      } else if (f[i3+1] <= f[i3]) {
        swap = f[i3+1]
        prev = f[i3+1]
        f[i3+1] = swap+1
      } else if (diff && f[i3] > prev) {
        swap = prev
        prev = f[i3+1]
        f[i3+1] = swap+1
      } else if (diff) {
        swap = f[i3]
        prev = f[i3+1]
        f[i3+1] = swap+1
      } else if (f[i3]+1 > prev) {
        swap = prev
        prev = f[i3+1]
        f[i3+1] = swap
      } else {
        swap = f[i3]
        prev = f[i3+1]
        f[i3+1] = swap+1
      }
    }

  }

  return f[f.length-1]
}

module.exports = {
  Distance
}
