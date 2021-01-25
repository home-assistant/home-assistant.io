---
title: "This entity does not have a unique ID?"
description: "This entity does not have a unique ID?"
ha_category: Configuration
---

When you see

```text
This entity does not have a unique ID, therefore its settings cannot be managed from the UI
```

this simply means that you can't change the `entity_id` or the friendly name from the UI. You can still use the _Customizations_ menu to customize that entity. Typically you'll see this when you create entities using YAML.
