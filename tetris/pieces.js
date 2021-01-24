const pieceLong = [
  [[1, 1, 1, 1]],
  [[1], [1], [1], [1]],
  [[1, 1, 1, 1]],
  [[1], [1], [1], [1]],
]
const pieceReverseL = [
  [[3, null, null], [3, 3, 3]],
  [[3, 3], [3, null], [3, null]],
  [[3, 3, 3], [null, null, 3]],
  [[null, 3], [null, 3], [3, 3]]
]

const pieceL = [
  [[null, null, 2], [2, 2, 2]],
  [[2, null], [2, null], [2, 2]],
  [[2, 2, 2], [2, null, null]],
  [[2, 2], [null, 2], [null, 2]]
]

const pieceSquare = [
  [[4, 4], [4, 4]],
  [[4, 4], [4, 4]],
  [[4, 4], [4, 4]],
  [[4, 4], [4, 4]]
]

const pieceReverseZ = [
  [[null, 7, 7], [7, 7, null]],
  [[7, null], [7, 7], [null, 7]],
  [[null, 7, 7], [7, 7, null]],
  [[7, null], [7, 7], [null, 7]]
]

const pieceTriangle = [
  [[null, 6, null], [6, 6, 6]],
  [[6, null], [6, 6], [6, null]],
  [[6, 6, 6], [null, 6, null]],
  [[null, 6], [6, 6], [null, 6]]
]

const pieceZ = [
  [[5, 5, null], [null, 5, 5]],
  [[null, 5], [5, 5], [5, null]],
  [[5, 5, null], [null, 5, 5]],
  [[null, 5], [5, 5], [5, null]]
]

const pieces = [pieceLong, pieceReverseL, pieceL, pieceSquare, pieceZ,
  pieceReverseZ, pieceTriangle, pieceZ]

export default pieces
