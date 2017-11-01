- current features
  - mimics the built-in "fold at indent level" commands but for heading levels. uses same keyboard shortcuts

- planned features
  - fold and unfold current row. should work like it does for indent-based folds
  - "focus" mode: hides everything (above and below) except the the current section, its heading, and parent headings
  - `***` style horizontal treated as fold boundaries and not foldable content

- commands
  - current
    - `_md:fold-at-heading-level-{1-6}`
    - `_md:unfold-all`
  - planned
    - `_md:fold-current-row`
    - `_md:unfold-current-row`
    - `_md:focus-current-section`
    - `_md:unfocus`

- works well with
  - remember folds package

- context / assumptions / constraints
  - the style of headings with `----` or `====` underlines is not supported

- resources
  + https://github.com/atom/line-ending-selector/blob/master/lib/main.js
  - assuming this is "good style" for an atom package?
  + https://github.com/JoseBlanca/markdown-folding
  - updated version of the below package. does a kind of "cycle" folding that doesn't map to atom's default folding behavior
  + https://github.com/tshort/markdown-folder
  - original folding package. no longer works
