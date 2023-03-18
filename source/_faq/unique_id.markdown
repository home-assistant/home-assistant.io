---
title: "This entity does not have a unique ID?"
description: "This entity does not have a unique ID?"
ha_category: Configuration
---

If you try to access the configuration dialog for an entity in your Home Assistant, you might end up seeing this message:

![Screenshot of popup for no unique ID](/images/faq/faq_no_unique_id.jpg)

This means that this entity does not have a unique identification, e.g., a serial number or another identifier that is guaranteed to be static and never changes. As a result, the normal editing process that allows you to change various settings through the user interface (such as the entity ID, icon, friendly name, etc.) is not possible here.

Typically, you'll see this when you create entities manually using YAML, but it can also appear if the integration that provides this entity, cannot determine a unique ID. This however is not an error, but just a limitation of the integration you use. A few selected integrations (such as [`template`](/integrations/template/) and [`mqtt`](/integrations/mqtt/)) allow the user to define a unique ID.

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

In case you want to read more about unique IDs, head over to this [developer documentation page](https://developers.home-assistant.io/docs/entity_registry_index/).
