Filters are applied as follows:

1. No filter: all entities included
2. Only includes: specified entities included
3. Only excludes: specified entities excluded
4. Domain and/or glob includes (may also have excludes):
  - Entity listed in entities include: include
  - Otherwise, entity listed in entities exclude: exclude
  - Otherwise, entity matches glob include: include     
  - Otherwise, entity matches glob exclude: exclude     
  - Otherwise, entity matches domain include: include
  - Otherwise: exclude
5. Domain and/or glob excludes:
  - Entity listed in entities include: include
  - Otherwise, entity listed in exclude: exclude
  - Otherwise, entity matches glob exclude: exclude     
  - Otherwise, entity matches domain exclude: exclude     
  - Otherwise: include
6. No Domain and/or glob includes or excludes
  - Entity listed in entities include: include
  - Otherwise: exclude

The following characters can be used in entity globs:

`*` - The asterisk represents zero, one, or multiple characters
`?` - The question mark represents a single character
