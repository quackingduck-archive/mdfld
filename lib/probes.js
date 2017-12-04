'use babel'

// tokens displayed in table when collected into an array by lineTokenArray
export function lineTokenArrayStart () {
  this.lineTokens = []
  console.group('foldCurrentRowStart')
}
export function lineToken (lineToken) {
  this.lineTokens.push(lineToken)
}
export function lineTokenArrayEnd () {
  console.table(this.lineTokens)
  console.groupEnd()
  this.lineTokens = []
}
// contents of start and end lines shown
export function foldRange (start, end, editor) {
  start.text = editor.lineTextForBufferRow(start.row)
  end.text = editor.lineTextForBufferRow(end.row)
  console.table({ start, end })
}
