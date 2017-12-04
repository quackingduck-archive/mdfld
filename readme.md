# mdfld

Atom's built-in folding commands use line indentation level to deduce the structure of the editor buffer. This works for most programming languages, but doesn't work for markdown documents.

This package reimplements the default editor fold commands, but uses heading levels instead of indentation levels.

Currently implemented

```
editor:fold-all                   mdfld:fold-all
editor:unfold-all                 mdfld:unfold-all
editor:fold-current-row           mdfld:fold-current-row
editor:fold-at-indent-level-1     mdfld:fold-at-heading-level-1
editor:fold-at-indent-level-2     mdfld:fold-at-heading-level-2
editor:fold-at-indent-level-3     mdfld:fold-at-heading-level-3
editor:fold-at-indent-level-4     mdfld:fold-at-heading-level-4
editor:fold-at-indent-level-5     mdfld:fold-at-heading-level-5
editor:fold-at-indent-level-6     mdfld:fold-at-heading-level-6
```
