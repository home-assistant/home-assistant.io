---
title: "Why doesn't this entity have a unique ID?"
description: "A unique ID is a permanent identifier (such as a serial number) that some entities don't have. Without one, you can't rename the entity from the UI."
ha_category: Configuration
---

When you open the configuration dialog of an {% term entity %}, you may see this message:

![Screenshot of popup for no unique ID](/images/faq/faq_no_unique_id.jpg)

A unique ID is a permanent identifier (for example, a serial number) that is guaranteed never to change. Without one, Home Assistant cannot safely let you rename the entity or change its settings from the user interface, because there would be no reliable way to track which entity you meant.

You will typically see this on entities you created manually in YAML, or on entities from an {% term integration %} that has no way to determine a unique ID for the underlying device. This is not an error, but a limitation of the integration. A few integrations (such as [`template`](/integrations/template/) and [`mqtt`](/integrations/mqtt/)) let you define a unique ID yourself in YAML.

### Where each ID is used

**Unique ID:**

- Used only internally in Home Assistant.

**Entity ID:**

- Entity with a unique ID: the entity ID is only used as a reference, for example in automations or dashboards.
- Entity without a unique ID: the entity ID acts as the replacement for the missing unique ID, _and_ as the reference in automations or dashboards.

### Can the IDs be changed?

**Unique ID:**

- No. It is a static identifier.

**Entity ID:**

- Entity with a unique ID: the entity ID can be changed freely, as long as it follows the format `<domain>.<id>` and does not collide with another entity. If you change the entity ID, remember to update the references in automations and dashboards.
- Entity without a unique ID: the entity ID is treated as a fixed identifier and cannot be changed.

If your entity has no unique ID, you can still adjust some properties through the [manual customization options](/docs/configuration/customizing-devices) in YAML.

### Can I add a unique ID myself?

No. As an end user, you cannot add a unique ID to an entity that does not have one. Unique IDs must come from the integration itself, because they need to consistently identify the same physical device or service across restarts.

If an integration does not provide unique IDs, it could potentially be improved to do so. Contributions are welcome. See the [developer documentation](https://developers.home-assistant.io/docs/development_index) to get started, and the [entity registry documentation](https://developers.home-assistant.io/docs/entity_registry_index/) for more on unique IDs.
