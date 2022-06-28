Filters are applied as follows:

1. No includes or excludes: all entities included
2. Includes, no excludes: specified entities included
3. Excludes, no includes: specified entities excluded
4. Both includes and excludes:
   - Domain and/or glob includes:
      - Entity listed in entities include: include
      - Otherwise, entity listed in entities exclude: exclude
      - Otherwise, entity matches glob include: include     
      - Otherwise, entity matches glob exclude: exclude     
      - Otherwise, entity matches domain include: include
      - Otherwise: exclude
   - Domain and/or glob excludes and no domain and/or glob includes:
      - Entity listed in entities include: include
      - Otherwise, entity listed in exclude: exclude
      - Otherwise, entity matches glob exclude: exclude     
      - Otherwise, entity matches domain exclude: exclude     
      - Otherwise: include
   - No Domain and/or glob includes or excludes
      - Entity listed in entities include: include
      - Otherwise: exclude

The following characters can be used in entity globs:

`*` - The asterisk represents zero, one, or multiple characters
`?` - The question mark represents a single character
