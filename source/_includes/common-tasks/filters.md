Filters are applied as follows:

1. No includes or excludes - all entities included
2. Includes, no excludes - specified entities included
3. Excludes, no includes - specified entities excluded
4. Both includes and excludes:
   - Include domain and/or glob patterns specified
      - If entity is included, accept
      - If entity is excluded, reject
      - If included by glob, accept
      - If excluded by glob, reject
      - If domain matches, accept
      - reject
   - Exclude domain and/or glob patterns specified and include does not list domains or glob patterns
      - If entity is included, accept
      - If entity is excluded, reject
      - If domain is excluded, reject
      - If excluded by glob, reject
      - accept
   - Neither include or exclude specifies domains or glob patterns
      - If entity is included, accept (as #2 above)
      - If entity included and excluded, the entity exclude is ignored

The following characters can be used in entity globs:

`*` - The asterisk represents zero, one, or multiple characters
`?` - The question mark represents a single character
