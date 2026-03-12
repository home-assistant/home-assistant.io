---
title: Humidity
description: This integration provides humidity automation triggers.
ha_category:
  - Other
ha_release: 2026.4
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: humidity
ha_integration_type: system
---

The **Humidity** {% term integration %} provides purpose-specific [automation triggers](/docs/automation/trigger/#entity-triggers) for humidity-related entities. It works with sensors that have device class `humidity`, as well as `climate`, `humidifier`, and `weather` entities. There are no configuration options for this integration.

{% note %}
These triggers are part of the **Purpose-specific triggers and conditions** preview feature. To use them, enable this feature under {% my labs title="**Settings** > **System** > **Labs**" %} first.
{% endnote %}

## Triggers

### Trigger: Humidity changed

{% include integrations/labs_entity_triggers_note.md %}

The `humidity.changed` trigger fires whenever the humidity value of the target entity changes. You can optionally limit it to only fire when the new value falls within a specific range using the `above` and `below` fields.

The following example triggers the automation whenever the bedroom humidity changes, but only when the new value is between 40% and 70%:

```yaml
automation:
  triggers:
    - trigger: humidity.changed
      target:
        entity_id: sensor.bedroom_humidity
      options:
        above: 40
        below: 70
```

- **`target`**
  - **Description**: The entity to monitor. Can be a humidity sensor, or a `climate`, `humidifier`, or `weather` entity.
  - **Optional**: No
- **`options`**
  - **`above`**
    - **Description**: Only trigger if the new humidity value is above this percentage (0–100).
    - **Optional**: Yes
  - **`below`**
    - **Description**: Only trigger if the new humidity value is below this percentage (0–100).
    - **Optional**: Yes

### Trigger: Humidity crossed threshold

{% include integrations/labs_entity_triggers_note.md %}

The `humidity.crossed_threshold` trigger fires when the humidity value crosses a defined threshold. This is useful for automations that should react when humidity moves into or out of a specific range.

The following example triggers the automation when the first of the two targeted sensors crosses above the 75% threshold:

```yaml
automation:
  triggers:
    - trigger: humidity.crossed_threshold
      target:
        entity_id:
          - sensor.bathroom_humidity
          - sensor.bedroom_humidity
      options:
        threshold_type: above
        lower_limit: 75
        behavior: first
```

- **`target`**
  - **Description**: The entity to monitor. Can be a humidity sensor, or a `climate`, `humidifier`, or `weather` entity.
  - **Optional**: No
- **`options`**
  - **`threshold_type`**
    - **Description**: How the threshold is defined. Types: `above`, `below`, `between`, `outside`.
    - **Optional**: No
  - **`lower_limit`**
    - **Description**: The lower threshold value, as a humidity percentage (0–100).
    - **Optional**: Required when threshold type is `above`, `between`, or `outside`.
  - **`upper_limit`**
    - **Description**: The upper threshold value, as a humidity percentage (0–100).
    - **Optional**: Required when threshold type is `below`, `between`, or `outside`.
  - **`behavior`**
    - **Description**: Controls which crossings trigger the automation when multiple sensors are targeted. Options: `any` (fires every time any targeted sensor crosses the threshold), `first` (fires only when the first targeted sensor crosses the threshold), `last` (fires only after the last targeted sensor has crossed the threshold).
    - **Optional**: Yes

#### Threshold type options

- `above`: Fires when the value rises above `lower_limit`.
- `below`: Fires when the value falls below `upper_limit`.
- `between`: Fires when the value moves into the range between `lower_limit` and `upper_limit`.
- `outside`: Fires when the value moves outside the range between `lower_limit` and `upper_limit`.
