---
description: Instructions on how to integrate Schlage WiFi smart locks into Home Assistant.
ha_release: 2023.9
ha_domain: schlage
---

[Schlage] is a lock manufacturer whose Encode range of smart deadbolts and levers connects directly to your WiFi network, without needing a separate hub or bridge.

The **Schlage** {% term integration %} controls those locks through Schlage's cloud API. It reports lock state, battery level, and keypad status, and exposes the lock's settings so they can be changed from Home Assistant.

Here are some of the things you can do once your locks are in Home Assistant:

- Lock all doors at bedtime or when the last person leaves home.
- Get notified when a lock jams, its battery runs low, or its keypad is disabled after too many wrong codes.
- Give a cleaner, pet sitter, or guest a PIN code that only works during a set time window.

[Schlage]: https://www.schlage.com/

## Supported devices

The following devices are known to work with the integration:

- Schlage Encode Smart WiFi Deadbolt
- Schlage Encode Smart WiFi Lever
- Schlage Encode Plus Smart WiFi Deadbolt

Other Schlage WiFi locks that you control with the Schlage Home app may work, but have not been tested and may not support every feature.

## Unsupported devices

The following devices are not supported by the integration:

- Schlage Connect locks, which use Z-Wave instead of WiFi. Use the [Z-Wave](/integrations/zwave_js/) integration instead.
- Locks that you control with the Schlage Breeze app, which uses a different cloud service.

## Prerequisites

1. Install the **Schlage Home** app on your phone and create a Schlage account.
2. Add your locks to your account in the app.

The integration signs in with the email address and password of your Schlage account. Only accounts that sign in with an email address and password are supported.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Username:
  description: "The email address of your Schlage account."
Password:
  description: "The password of your Schlage account."
{% endconfiguration_basic %}

## Supported functionality

The **Schlage** integration provides the following entities for each lock.

### Binary sensors

- **Keypad disabled**: Indicates that the keypad has been disabled because too many incorrect codes were entered. Turns off again when the lock records a newer event in its activity log.

### Locks

- **Lock**: Locks and unlocks the lock, and shows whether it is locked, unlocked, or jammed. The entity has the same name as the lock itself. The `changed_by` attribute shows what last changed the lock, such as the thumbturn, the keypad, or a mobile device.

### Selects

- **Auto-lock time**: How long the lock waits before it locks itself.
  - **Options**: Disabled, or a delay. The available delays depend on the lock model, and match the ones in the Schlage Home app.

### Sensors

- **Battery**: The remaining battery level of the lock, as a percentage.

### Switches

- **1-touch locking**: When turned on, you can lock the door from the outside with a press of the Schlage button.
- **Keypress beep**: When turned on, the lock beeps when you press a key.

{% include integrations/actions.md %}

## Schlage automation examples

Here are a few ideas to get you started.

{% include docs/paste_yaml_tip.md %}

### Automation: Notify you when a lock jams

A jammed lock may leave your door unsecured. Send a notification to your phone as soon as it happens.

- **Trigger**: Lock jammed
  - **Target**: Front door lock
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a jammed lock notification" %}

{% example %}
automation: |
  alias: "Notify when the front door lock jams"
  triggers:
    - trigger: lock.jammed
      target:
        entity_id: lock.front_door
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Front door lock jammed"
        message: "Check the front door. It may not be locked."
{% endexample %}

{% enddetails %}

### Automation: Notify you when the keypad is disabled

When someone enters too many incorrect codes, the lock disables its keypad. Find out right away, because it could mean that someone is trying to get in.

- **Trigger**: State: Keypad disabled changes to on
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a disabled keypad notification" %}

{% example %}
automation: |
  alias: "Notify when the front door keypad is disabled"
  triggers:
    - trigger: state
      entity_id: binary_sensor.front_door_keypad_disabled
      to: "on"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Front door keypad disabled"
        message: "Too many incorrect codes were entered."
{% endexample %}

{% enddetails %}

## Data updates

The **Schlage** integration {% term polling polls %} Schlage's cloud API for the state of your locks every 30 seconds. After you lock or unlock from Home Assistant, it also updates right away. Changes made in another way, such as with the keypad or the thumbturn, can take up to 30 seconds to show up.

## Known limitations

- The integration only works through Schlage's cloud. When your internet connection or Schlage's service is down, you can't control your locks from Home Assistant.
- A lock that has been switched from WiFi to Bluetooth in the Schlage Home app is no longer connected to the cloud, so Home Assistant can't control it and may show an outdated state.
- The integration can create permanent PIN codes and temporary PIN codes, but not PIN codes with a recurring weekly schedule.
- Adding new locks to your account, managing key fobs, scheduled locking, and firmware updates are not supported. Use the Schlage Home app instead.

## Troubleshooting

{% details "Can't sign in during setup" %}

### Symptom: "Invalid authentication"

When you set up the integration, the form shows the message "Invalid authentication".

#### Description

Schlage didn't accept the email address and password you entered, or your account doesn't sign in with an email address and password.

#### Resolution

1. In the **Username** field, enter the full email address of your Schlage account.
2. Check that you can sign in to the Schlage Home app with the same email address and password. Accounts for the Schlage Breeze app are not supported.

{% enddetails %}

{% details "A lock is missing" %}

### Symptom: A lock in the Schlage Home app doesn't show up in Home Assistant

Setup succeeds, but one or more of your locks are missing.

#### Description

The integration only finds locks that are connected to your Schlage account through WiFi. A lock that has been added to Apple Home may no longer be available through Schlage's cloud.

#### Resolution

1. In the Schlage Home app, check that the lock is added to the account you used to set up the integration, and that it is connected to WiFi.
2. If the lock has been added to Apple Home, remove it from there.

{% enddetails %}

{% details "A lock is unavailable" %}

### Symptom: The entities of a lock are unavailable

The entities of one lock are unavailable, while your other locks work.

#### Description

Schlage's cloud reports that the lock is not connected.

#### Resolution

1. In the Schlage Home app, check that the lock is online.
2. Check the battery level of the lock, and replace the batteries if needed.
3. Make sure the lock is within range of your WiFi network.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
