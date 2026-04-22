### Behavior with multiple targets

When you target more than one entity (or select an area, floor, or label that contains several), the **Condition passes if** option controls how the results combine:

- **Any** (default): the condition passes if at least one of the targeted entities matches. For example, if you check three smoke sensors and only one of them detects smoke, the condition still passes. This is useful for questions like "is there smoke anywhere in the house?"
- **All**: the condition passes only when every targeted entity matches. For example, if you check the same three smoke sensors, the condition passes only once all three report cleared. This is useful for "is the entire house safe now?" checks, so your automation does not send an all-clear while one room still has a reading.
