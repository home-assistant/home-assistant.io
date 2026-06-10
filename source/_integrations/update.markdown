---
title: Update
description: Instructions on how to use update entities with Home Assistant.
ha_category: []
ha_release: 2022.4
ha_quality_scale: internal
ha_domain: update
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
related:
  - docs: /docs/configuration/customizing-devices/
    title: Customizing devices
  - docs: /dashboards/
    title: Dashboard
---

An update {% term entity %} is an entity that indicates if an update is available for a
device or service. This can be any update, including update of a firmware
for a device like a light bulb or router, or software updates for things like
add-ons or containers.

{% include integrations/building_block_integration.md %}

For a list of {% term integrations %} offering update entities, on the integrations page, select the ["Update" category](/integrations/#update).

## The state of an update entity

The state of an update {% term entity %} reflects whether an update is available or not.
When the state is **On**, it means there is an update available; when everything
is up-to-date, the state is **Off**.

In addition, the entity can have the following states:

- **Unavailable**: The entity is currently unavailable.
- **Unknown**: The state is not yet known.

The following state attributes are exposed to provide more
information on the update state:

- `title`: The title/name of the available software or firmware. As the device
  name or entity name can be changed in Home Assistant, this title will provide
  the actual name of the software or firmware.
- `installed_version`: The current version that is currently installed and in use.
- `latest_version`: The latest version that is available for installation.
- `skipped_version`: If a version update is skipped, this attribute will be set
  and contains the actual version that was skipped.
- `release_summary`: A summary of the release notes for the update available.
- `release_url`: A link to the full release announcement for the update available.

## Device class

{% include integrations/device_class_intro.md %}

The following device classes are supported for update entities:

- **`None`**: A generic software update. This is the default and doesn't need
  to be set.
- **`firmware`**: This update {% term integration %} provides firmwares.

{% include integrations/triggers.md %}

{% include integrations/conditions.md %}

## Actions

The update {% term entity %} exposes three actions that can be used to install,
skip, or restore (clear previously skipped) an offered software update.

### Action: Install

The `update.install` action can be used to install an offered update to the device or service.

This action is only available for an update {% term entity %} if an {% term integration %} provides
this capability. Additionally, if allowed by the {% term integration %}, the action
provides for installing a specific version and even could make a
backup before installing the update.

#### Action data attributes

{% configuration_basic %}
entity_id (required):
  description: "String or list of strings that point at `entity_id`s of updates. To target all updates, set `entity_id` to `all`."
version:
  description: "A specific update version to install, if not provided, the latest available update will be installed. Availability of this attribute is dependent on the {% term integration %}."
backup:
  description: "If set to `true`, a backup will be made before installing the update. Availability of this attribute is dependent on the {% term integration %}."
{% endconfiguration_basic %}

Example action:

```yaml
action: update.install
target:
  entity_id:
    - update.my_light_bulb
```

### Action: Skip

The `update.skip` action can be used to skip an offered update to the device or service.

After skipping an offered update, the {% term entity %} will return to the `off` state,
which means there is no update available.

```yaml
action: update.skip
target:
  entity_id:
    - update.my_light_bulb
```

Even if an update is skipped and shows as `off` (meaning no update), if there
is a newer version available, calling the `update.install` action on the entity
will still install the latest version.

### Action: Clear skipped

The `update.clear_skipped` action can be used to remove the skipped version marker of a previously skipped offered update to the device or service.

After skipping an offered update, the {% term entity %} will return to the `off` state,
but will not return to it until a newer version becomes available again.

Using the `update.clear_skipped` action, the skipped version marker can be
removed and thus the entity will return to the `on` state and the update
notification will return.

```yaml
action: update.clear_skipped
target:
  entity_id:
    - update.my_light_bulb
```

This can be helpful to, for example, in an automation that weekly unskips
all updates you have previously marked as skipped; as a reminder to update.

## Update automation examples

Update entities are useful when you want to stay informed about available
updates or take action at the right time. Here are a few examples to help you
get started.

{% include docs/paste_yaml_tip.md %}

### Automation: send a notification when an update becomes available

If an update for a device or service becomes available, this automation sends a
notification to your phone right away.

- **Trigger**: Update became available
  - **Target**: Office router update
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for notifying you about a new update" %}

{% example %}
automation: |
  alias: "Send a notification when an update becomes available"
  triggers:
    - trigger: update.update_became_available
      target:
        entity_id: update.office_router_firmware
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Update available"
        message: >
          A new update is available for the office router.
{% endexample %}

{% enddetails %}

### Automation: install an update during the evening if it is still available

If you prefer to install updates at a quieter time, this automation checks each
evening whether an update is still available and starts the installation.

- **Trigger**: Time: 21:00
- **Condition**: Update is available
  - **Target**: Office router update
- **Action**: Install update

{% details "YAML example for installing an update in the evening" %}

{% example %}
automation: |
  alias: "Install an update during the evening if it is still available"
  triggers:
    - trigger: time
      at: "21:00:00"
  conditions:
    - condition: update.is_available
      target:
        entity_id: update.office_router_firmware
  actions:
    - action: update.install
      target:
        entity_id: update.office_router_firmware
{% endexample %}

{% enddetails %}
