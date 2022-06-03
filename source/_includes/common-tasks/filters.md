Filters are applied as follows:

1. No includes or excludes - pass all entities
2. Includes, no excludes - only include specified entities
3. Excludes, no includes - only exclude specified entities
4. Both includes and excludes:
   - Include domain and/or glob patterns specified
      - If domain is included, and entity not excluded or match exclude glob pattern, accept
      - If entity matches include glob pattern, and entity does not match any exclude criteria (domain, glob pattern or listed), accept
      - If domain is not included, glob pattern does not match, and entity not included, reject
   - Exclude domain and/or glob patterns specified and include does not list domains or glob patterns
      - If domain is excluded and entity not included, reject
      - If entity matches exclude glob pattern and entity not included, reject
      - If entity does not match any exclude criteria (domain, glob pattern or listed), accept
   - Neither include or exclude specifies domains or glob patterns
      - If entity is included, accept (as #2 above)
      - If entity include and exclude, the entity exclude is ignored

The following characters can be used in entity globs:

`*` - The asterisk represents zero, one, or multiple characters
`.` - The period represents a single character
