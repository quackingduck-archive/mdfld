# mdfld

Atom's built-in folding commands use line indentation level to deduce the structure of the editor buffer. This works for most programming languages, but doesn't work for markdown documents.

This package reimplements the default editor fold commands, but uses heading levels instead of indentation levels.

Currently implemented

```
editor:fold-all                   mdfld:fold-all                  cmd-alt-{
editor:unfold-all                 mdfld:unfold-all                cmd-alt-} or cmd-k cmd-0
editor:fold-current-row           mdfld:fold-current-row          cmd-alt-[
editor:fold-at-indent-level-1     mdfld:fold-at-heading-level-1   cmd-k cmd-1
editor:fold-at-indent-level-2     mdfld:fold-at-heading-level-2   cmd-k cmd-2
editor:fold-at-indent-level-3     mdfld:fold-at-heading-level-3   cmd-k cmd-3
editor:fold-at-indent-level-4     mdfld:fold-at-heading-level-4   cmd-k cmd-4
editor:fold-at-indent-level-5     mdfld:fold-at-heading-level-5   cmd-k cmd-5
editor:fold-at-indent-level-6     mdfld:fold-at-heading-level-6   cmd-k cmd-6
```

![Demo](demo.gif)

## See also

* [markdown-folder](https://atom.io/packages/markdown-folder) - Good feature set, but was not updated to work with latest versions of Atom
* [markdown-folding](https://atom.io/packages/markdown-folding) - I couldn't get used to the "cycle" command for folding sections
* [markdown-fold](https://atom.io/packages/markdown-fold) - Only folds all heading levels or just the first
