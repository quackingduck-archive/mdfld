- current features
  - mimics the built-in "fold at indent level" commands but for heading levels. uses same keyboard shortcuts

- planned features
  - "focus" mode: hides everything (above and below) except the the current section, its heading, and parent headings
  - fold-current-row folds the next level up when pressed twice
  - remembering previous fold levels?
  - `***` style horizontal treated as fold boundaries and not foldable content

- commands
  - current
    - `mdfld:fold-at-heading-level-{1-6}`
    - `mdfld:unfold-all`
  - planned
    - `mdfld:fold-current-row`
    - `mdfld:unfold-current-row`
    - `mdfld:focus-current-section`
    - `mdfld:unfocus`

- works well with
  - remember folds package

***

- context / assumptions / constraints
  - the style of headings with `----` or `====` underlines is not supported

- data structures
  - line token
    - type: "regular" | "code"
    - len: number. last col of line
    - heading_level: 0..6 (0 means not a heading)

- algorithms
  - fold at level
    - starting at the end of the file
    - store position as "end"
    - iterate upwards, terminating at the top row
      - if line is heading at deeper level that target, continue
      - set "start" to end position of that line
      - make selection from start to end and fold
      - unless row is top row
        - set "end" to end position of line above

  - fold current row
    - starting at position of cursor
    - iterate upwards, terminating at the top row
      - if line is not heading continue
      - capture heading level
      - set start to end position of row
      - seek down until line begins another header of same level or higher
        - end of selection is beginning of this line
      - otherwise end of selection is end of last line
      - fold selection

***

- resources
  + https://github.com/atom/line-ending-selector/blob/master/lib/main.js
  - assuming this is "good style" for an atom package?
  + https://github.com/JoseBlanca/markdown-folding
  - updated version of the below package. does a kind of "cycle" folding that doesn't map to atom's default folding behavior
  + https://github.com/tshort/markdown-folder
  - original folding package. no longer works
