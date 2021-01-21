---
title: "This entity does not have a unique ID?"
description: "This entity does not have a unique ID?"
ha_category: Configuration
---

If you try to access the configuration dialog for an entity in your Home Assistant, you might end up seeing this message:

```text
This entity ("<Entity ID>") does not have a unique ID, therefore its settings cannot be managed from the UI. See the documentation for more detail.
```

This simply means that this entity does not provide a unique identification (e.g., a serial number)\*. As a result, the normal editing process that allows you to change various settings such as the entity ID, icon, friendly name, etc. is not possible here. Typically, you'll see this when you create entities using YAML, but it can also appear if the integration that provides this entity simply cannot determine a unique ID.

If your user profile has the "Advanced Mode" activated, you will also see the second paragraph in the popup with a link to the [customization user interface](https://www.home-assistant.io/docs/configuration/customizing-devices/#customization-using-the-ui) for this specific entity, which offers some customization options.

\* In case you want to read about more about that, head over to this [developer documentation page](https://developers.home-assistant.io/docs/entity_registry_index/).
