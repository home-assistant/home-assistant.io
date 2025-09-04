---
title: "This entity does not have a unique ID?"
description: "This entity does not have a unique ID?"
ha_category: Configuration
---

If you try to access the configuration dialog for an entity in your Home Assistant, you might end up seeing this message:

![Screenshot of popup for no unique ID](/images/faq/faq_no_unique_id.jpg)

This means that this entity does not have a unique identification, e.g., a serial number or another identifier that is guaranteed to be static and never changes. As a result, the normal editing process that allows you to change various settings through the user interface (such as the entity ID, icon, friendly name, etc.) is not possible here.

Typically, you'll see this when you create entities manually using YAML, but it can also appear if the integration that provides this entity cannot determine a unique ID. This is not an error, but rather a limitation of the integration you use. A few selected integrations (such as [`template`](/integrations/template/) and [`mqtt`](/integrations/mqtt/)) allow you to define a unique ID.

### Used where?

**Unique ID:**

- Only internally in Home Assistant.

**Entity ID:**

- Entity with a unique ID: Entity ID only used as a reference, e.g., in automations or dashboards.
- Entity without a unique ID: Entity ID acts as the replacement for the non-existing unique ID plus as a reference, e.g., in automations or dashboards.

### Can be changed?

**Unique ID:**

- No. It is a static identifier.

**Entity ID:**

- Entity with a unique ID: Entity ID can be adjusted freely (as long as it follows the format `<domain>.<id>` and does not result in duplicates in your Home Assistant). Keep in mind that if you change the entity ID, you also need to update the references, e.g., in automations and dashboards.<br>
- Entity without a unique ID: Entity ID is considered a fixed, static identifier and cannot be changed.

In case your entity has no unique ID and therefore cannot be changed through the UI, there are some [manual customization options](/docs/configuration/customizing-devices) directly through YAML files.

### Can I add a unique ID myself?

No, as an end-user, you cannot add a unique ID to an entity that doesn't have one. Unique IDs are a feature that must be provided by the integration itself. This is because the unique ID needs to be persistent across restarts and should consistently identify the same physical device or service.

If an integration currently doesn't provide unique IDs for its entities, this means the integration could potentially be modernized to include this capability. However, providing unique IDs is not currently a mandatory requirement for all integrations.

The Home Assistant project always welcomes code contributions to enhance integrations with this capability. If you're interested in improving an integration to provide unique IDs, you can contribute code to the Home Assistant project. For more information on contributing, please visit the [developer documentation](https://developers.home-assistant.io/docs/development_index).

In case you want to read more about unique IDs, head over to this [developer documentation page](https://developers.home-assistant.io/docs/entity_registry_index/).
