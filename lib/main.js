'use babel'

import { CompositeDisposable, Range } from 'atom'

let subscriptions

export function activate (_state) {
  subscriptions = new CompositeDisposable()
  subscriptions.add(
    atom.commands.add('atom-workspace', {
      'mdfld:fold-all': () => foldAtLevel(1),
      'mdfld:unfold-all': () => unfoldAll(),
      'mdfld:fold-at-heading-level-1': () => foldAtLevel(1),
      'mdfld:fold-at-heading-level-2': () => foldAtLevel(2),
      'mdfld:fold-at-heading-level-3': () => foldAtLevel(3),
      'mdfld:fold-at-heading-level-4': () => foldAtLevel(4),
      'mdfld:fold-at-heading-level-5': () => foldAtLevel(5),
      'mdfld:fold-at-heading-level-6': () => foldAtLevel(6),
    })
  )
}

export function deactivate () {
  subscriptions.dispose()
}

export function unfoldAll () {
  const editor = atom.workspace.getActiveTextEditor()
  let lrow = editor.getLastBufferRow()
  for (let row = 0; row < lrow; row++) {
    editor.unfoldBufferRow(row)
  }
}

export function foldAtLevel (level) {
  const editor = atom.workspace.getActiveTextEditor()
  for (let { bottom, top } of foldPointsFromBottom({
    maxHeadingLevel: level,
  })) {
    // todo: foldRange(top, bottom)
    const cpos = editor.getCursorBufferPosition()
    editor.setSelectedBufferRange(new Range(bottom, top))
    editor.foldSelectedLines()
    editor.setCursorBufferPosition(cpos)
  }
}

export function * foldPointsFromBottom ({ maxHeadingLevel, __ctx }) {
  const editor = atom.workspace.getActiveTextEditor()
  let brow = editor.getLastBufferRow()
  let bcol = editor.buffer.lineLengthForRow(brow)
  for (let row = brow; row >= 0; row--) {
    const text = editor.lineTextForBufferRow(row)
    let m = text.match(/^#+/)
    let l = m && m[0].length
    if (!m || l > maxHeadingLevel) continue
    yield {
      bottom: [brow, bcol],
      top: [row, editor.buffer.lineLengthForRow(row)],
    }
    if (row !== 0) {
      brow = row - 1
      bcol = editor.buffer.lineLengthForRow(row - 1)
    }
  }
}
