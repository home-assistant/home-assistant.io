---
title: UniFi Access
description: Instructions on how to integrate UniFi Access with Home Assistant.
ha_category:
  - Doorbell
  - Lock
  - Sensor
ha_release: 2026.4
ha_domain: unifi_access
ha_iot_class: Local Push
ha_quality_scale: silver
ha_config_flow: true
ha_codeowners:
  - "@imhotep"
  - "@RaHehl"
ha_platforms:
  - binary_sensor
  - button
  - event
  - image
  - lock
  - select
  - sensor
  - switch
ha_integration_type: hub
---

The **UniFi Access** {% term integration %} allows you to control and monitor [Ubiquiti UniFi Access](https://ui.com/door-access) devices from Home Assistant.

UniFi Access is a modern, IP-based door access control system by [Ubiquiti](https://ui.com). It supports a range of access readers, door locks, and hubs that can be managed through a local UniFi Access controller (such as a UniFi Dream Machine Pro or a dedicated UniFi Access application host).

With this integration, you can unlock doors, see whether doors are open or closed, receive doorbell notifications, and track access events directly from your Home Assistant dashboards and automations.

This integration communicates with the UniFi Access controller over the local network using its REST API and WebSocket interface, providing real-time door status updates without polling.

## Supported devices

This integration supports any door managed by a UniFi Access controller, including doors equipped with:

- UniFi Access Reader (UA Reader, UA Reader Pro, UA Reader Lite)
- UniFi Access Lock (UA Lock)
- UniFi Access Hub (UA Hub, UA Hub Ultra)

## Prerequisites

Before setting up this integration, make sure you have the following:

- A running UniFi Access controller (for example, on a UniFi Dream Machine Pro or Cloud Key Gen2 Plus with the Access application installed).
- An API token generated from the UniFi Access controller settings:
  1. Open the UniFi Access web interface.
  2. Navigate to **Settings** > **Advanced**.
  3. Under **API Token**, select **Create Token**.
  4. Give the token a descriptive name (for example, _Home Assistant_) and save it.
  5. Copy the generated token — you will need it during setup.
- Your Home Assistant instance must be able to reach the UniFi Access controller on your local network.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
description: "The hostname or IP address of the UniFi Access controller."
API Token:
description: "The API token generated in the UniFi Access controller settings. See [Prerequisites](#prerequisites) for how to create one."
Verify SSL:
description: "Whether to verify the SSL certificate of the controller. Disable this if you are using a self-signed certificate. Disabled by default."
{% endconfiguration_basic %}

## Supported functionality

### Entities

The **UniFi Access** integration provides the following entities.

#### Buttons

Each door registered in your UniFi Access controller is represented as an **unlock button** entity in Home Assistant.

- **Unlock**: Triggers the configured door lock relay to open the door for its configured duration.

#### Events

Each door provides two **event** entities:

- **Doorbell**: Fires a `ring` event when someone presses the doorbell at the door.

  {% note %}
  Doorbell entities are created for all doors because the UniFi Access API does not expose per-door doorbell capability information. Not every hardware combination supports doorbell ring events, and there is currently no official list of supported combinations. If you do not receive ring events, your device may not support this feature.
  {% endnote %}

- **Access**: Fires an event when someone attempts to unlock a door:
  - `access_granted`: The door was successfully unlocked (API result: `ACCESS`).
  - `access_denied`: The access attempt was denied (API result: `BLOCKED` or any other non-`ACCESS` value).

  The event includes the following additional attributes when available:
  - `actor`: The name of the person who attempted access.
  - `authentication`: The authentication method used (for example, NFC, PIN code, Face).
  - `result`: The raw result from the UniFi Access controller (for example, `ACCESS`, `BLOCKED`).

#### Images

- **Door thumbnail**
  - **Description**: Shows the most recent snapshot captured by the door's camera. The image is updated automatically whenever the UniFi Access controller sends a new thumbnail via WebSocket, for example after an access event.

#### Binary sensors

Each door registered in your UniFi Access controller is represented by a **binary sensor** entity that reports the door position.

- **Door**: Turns on when the door is open and off when the door is closed.

#### Switches

The integration provides two switch entities for controlling the emergency modes of your UniFi Access controller.

{% important %}
These switches affect _all_ doors managed by the controller at once and have direct physical security and safety implications. Make sure to restrict access to these switches in your dashboards and avoid triggering them accidentally in automations.
{% endimportant %}

- **Evacuation**
  - **Description**: Activates or deactivates the evacuation mode on your UniFi Access controller. When turned on, all doors managed by the controller are unlocked to allow evacuation.
- **Lockdown**
  - **Description**: Activates or deactivates the lockdown mode on your UniFi Access controller. When turned on, the controller triggers a facility-wide lockdown, locking all doors to restrict access.

#### Selects

For controllers that support temporary lock rules, each supported door also exposes a **select** entity:

- **Door Lock Rule**: Applies a temporary lock rule to the door. Common options are `custom`, `keep_lock`, `keep_unlock`, and `reset`. When the controller reports schedule-based lock rules, the entity can also show `schedule` and `lock_early`.

#### Sensors

For controllers that support temporary lock rules, each door also exposes the following diagnostic sensor entities:

- **Door Lock Rule**: Reports the currently active temporary lock rule for the door. Possible states are `custom`, `keep_lock`, `keep_unlock`, `lock_early`, `lock_now`, `reset`, and `schedule`. Returns `unknown` when no temporary rule is active.
- **Rule End Time**: Reports the date and time when the active temporary lock rule expires. Returns `unknown` when no temporary rule is active or when the rule has no expiry.

### Actions

For controllers that support temporary lock rules, the integration also provides the `unifi_access.set_lock_rule` action.

Use this action to apply a temporary lock rule to a specific door from an automation or script. In the automation editor, select the UniFi Access door device you want to target.

| Data attribute | Optional | Description                                                                                                   |
| -------------- | -------- | ------------------------------------------------------------------------------------------------------------- |
| `device_id`    | no       | The UniFi Access door device to update.                                                                       |
| `rule`         | no       | The lock rule to apply. Supported values are `custom`, `keep_lock`, `keep_unlock`, `lock_early`, and `reset`. |
| `interval`     | yes      | Rule duration in minutes. Defaults to `10`.                                                                   |

Example action:

```yaml
action: unifi_access.set_lock_rule
target:
  device_id: 0123456789abcdef0123456789abcdef
data:
  rule: keep_lock
  interval: 30
```

## Data updates

The integration uses a local push architecture via WebSocket. When a door's lock or position status changes, or when the emergency mode (evacuation or lockdown) is updated, the UniFi Access controller pushes updates to Home Assistant in real time. No {% term polling %} is performed.

## Examples

### Send a notification when the doorbell rings

{% raw %}

```yaml
alias: "Doorbell notification"
triggers:
  - trigger: state
    entity_id: event.front_door_doorbell
actions:
  - action: notify.mobile_app_my_phone
    data:
      title: "Doorbell"
      message: "Someone is at the front door!"
```

{% endraw %}

### Log who unlocked a door

{% raw %}

```yaml
alias: "Access granted notification"
triggers:
  - trigger: state
    entity_id: event.front_door_access
conditions:
  - condition: state
    entity_id: event.front_door_access
    attribute: event_type
    state: "access_granted"
actions:
  - action: notify.mobile_app_my_phone
    data:
      title: "Door unlocked"
      message: >
        {{ trigger.to_state.attributes.actor }}
        unlocked the front door
        via {{ trigger.to_state.attributes.authentication }}.
```

{% endraw %}

### Alert on denied access attempts

{% raw %}

```yaml
alias: "Access denied alert"
triggers:
  - trigger: state
    entity_id: event.front_door_access
conditions:
  - condition: state
    entity_id: event.front_door_access
    attribute: event_type
    state: "access_denied"
actions:
  - action: notify.mobile_app_my_phone
    data:
      title: "Access denied!"
      message: >
        Access denied at front door
        for {{ trigger.to_state.attributes.actor }}
        ({{ trigger.to_state.attributes.authentication }}).
```

{% endraw %}

## Known limitations

- **No per-door lock command**: The UniFi Access API only supports unlocking individual door entities. The controller-wide lockdown emergency mode is a separate feature and can lock all doors simultaneously.
- **Single controller**: Each configuration entry connects to one UniFi Access controller. If you have multiple controllers, add a separate integration entry for each.

## Troubleshooting

### Cannot connect to the controller

#### Symptom: "Could not connect" error during setup

When trying to set up the integration, the form shows a connection error.

##### Description

This means your Home Assistant instance cannot reach the UniFi Access controller on the network.

##### Resolution

To resolve this issue, try the following steps:

1. Verify that the UniFi Access controller is reachable from your Home Assistant instance (check the host or IP address).
2. Make sure no firewall is blocking the connection.
3. Ensure the UniFi Access application is running on the controller.

### Invalid authentication

#### Symptom: "Invalid authentication" error during setup

The integration reports invalid authentication when trying to connect.

##### Description

The API token may have been revoked, expired, or entered incorrectly.

##### Resolution

To resolve this issue, try the following steps:

1. Verify that the API token has not been revoked or expired in the UniFi Access controller settings.
2. Re-enter the token or generate a new one.
3. If the integration was already set up, use the **Reconfigure** option in the integration settings.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

After removal, you may also want to revoke the API token in your UniFi Access controller settings.
