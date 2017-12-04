'use babel'

import { CompositeDisposable, Range } from 'atom'
import * as defaultProbes from './probes'

let subscriptions
export let trace = false
export let probes = defaultProbes

export function activate (_state) {
  trace = localStorage.getItem('mdfld-trace') === 'true' // eslint-disable-line
  // todo: subscribe to changes and update value of trace
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
      'mdfld:fold-current-row': () => foldCurrentRow(),
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
  const tokens = lineTokenArray(editor)

  let lastTokenIndex = tokens.length - 1
  let end = { row: lastTokenIndex, col: tokens[lastTokenIndex].len }
  for (let row = end.row; row >= 0; row--) {
    const token = tokens[row]
    if (token.headingLevel === 0 || token.headingLevel > level) continue
    foldRange({ row, col: token.len }, end)
    if (row !== 0) end = { row: row - 1, col: tokens[row - 1].len }
  }
}

export function foldCurrentRow () {
  const editor = atom.workspace.getActiveTextEditor()
  const currentRow = editor.getCursorBufferPosition().row
  const tokens = lineTokenArray(editor)
  // find starting point of current section
  let startPoint
  for (let i = currentRow; i >= 0; i--) {
    let token = tokens[i]
    if (token.headingLevel > 0) {
      startPoint = { row: i, col: token.len }
      break
    }
  }
  if (!startPoint) return
  foldRange(startPoint, sectionEndPoint(tokens, startPoint.row))
}

// todo: inline
export function sectionEndPoint (tokens, headingRow) {
  let headingLevel = tokens[headingRow].headingLevel
  // find last col of line before next heading at this level or lower
  for (let i = headingRow + 1; i < tokens.length; i++) {
    let token = tokens[i]
    let level = token.headingLevel
    if (level > 0 && level <= headingLevel) {
      return { row: i - 1, col: tokens[i - 1].len }
    }
  }
  // otherwise section ends at last col of last line
  let lastRowIndex = tokens.length - 1
  return { row: lastRowIndex, col: tokens[lastRowIndex].len }
}

// todo: editor as first arg
export function foldRange (start, end, editor) {
  editor = editor || atom.workspace.getActiveTextEditor()
  const cpos = editor.getCursorBufferPosition()
  if (trace) probes.foldRange(start, end)
  editor.setSelectedBufferRange(
    new Range([start.row, start.col], [end.row, end.col])
  )
  editor.foldSelectedLines()
  editor.setCursorBufferPosition(cpos)
}

export function lineTokenArray (editor) {
  if (trace) probes.lineTokenArrayStart()
  const ret = Array.from(headingLevels(lineTypes(lineText(editor))))
  if (trace) probes.lineTokenArrayEnd()
  return ret
}

export function * lineText (editor) {
  let lastRowIndex = editor.getLastBufferRow()
  for (let i = 0; i <= lastRowIndex; i++) {
    const text = editor.lineTextForBufferRow(i)
    const length = text.length
    const lineToken = { text, len: length }
    if (trace) probes.lineToken(lineToken)
    yield lineToken
  }
}

export function * lineTypes (tokens) {
  let inCodeBlock = false
  let type
  for (let token of tokens) {
    let isFenceLine = /^```/.test(token.text)
    if (isFenceLine) {
      type = 'code'
      inCodeBlock = !inCodeBlock
    } else if (inCodeBlock) {
      type = 'code'
    } else {
      type = 'regular'
    }
    yield Object.assign(token, { type })
  }
}

export function * headingLevels (tokens) {
  for (let token of tokens) {
    let headingLevel = 0
    if (token.type !== 'code') {
      const [__, octos] = token.text.match(/^(#+)?/)
      if (octos) headingLevel = octos.length
    }
    yield Object.assign(token, { headingLevel })
  }
}
