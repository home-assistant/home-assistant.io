---
title: Person
description: Instructions on how to set up people tracking within Home Assistant.
ha_category:
  - Presence detection
ha_release: 0.88
ha_quality_scale: internal
ha_domain: person
ha_iot_class: Calculated
ha_integration_type: system
---

The **Person** {% term integration %} allows connecting [device tracker](/integrations/device_tracker/) entities to one or more person entities. The state updates of a connected device tracker will set the state of the person. When multiple device trackers are used, the state of person will be determined in this order:

1. If there are stationary trackers (non-GPS trackers, e.g., a router or Bluetooth device tracker) presenting the state `home`, the tracker most recently updated will be used.
2. If there are trackers of type `gps`, then the most recently updated tracker will be used.
3. Otherwise, the latest tracker with state `not_home` will be used.

Let's say, for example, that you have three trackers: `tracker_gps`, `tracker_router` and `tracker_ble`.

1. You're at home, all three devices show state `home` - the state of your Person entity will be `home` with source `tracker_router` or `tracker_ble`, whichever was most recently updated.
2. You just left home. `tracker_gps` shows state `not_home`, but the other two trackers show state `home` (they may not have yet updated due to their `consider_home` setting see [device_tracker](/integrations/device_tracker/#configuring-a-device_tracker-platform)). Since the stationary trackers have priority, you are considered `home`.
3. After some time, both stationary trackers show state `not_home`. Now your Person entity has state `not_home` with source `tracker_gps`.
4. While you are away from home, your Home Assistant instance is restarted. Until the `tracker_gps` receives an update, your status will be determined by the stationary trackers, since they will have the most recent update after a restart. Obviously, the state will be `not_home`.
5. Then you're going into a zone you have defined as `zone1`, `tracker_gps` sends an update, and now your state is `zone1` with source `tracker_gps`.
6. You've returned home and your mobile device has connected to the router, but `tracker_gps` hasn't updated yet. Your state will be `home` with source `tracker_router`.
7. After the `tracker_gps` update occurs, your state will still be `home` with source `tracker_router` or `tracker_ble`, whichever has the most recent update.

In short, when you're at home, your position is determined first by stationary trackers (if any) and then by GPS. When you're outside your home, your position is determined firstly by GPS and then by stationary trackers.

**Hint**: When you use multiple device trackers together, especially stationary and GPS trackers, it's advisable to set `consider_home` for stationary trackers as low as possible see [device_tracker](/integrations/device_tracker/#configuring-a-device_tracker-platform)).

You can manage persons {% my people title="via the UI from the person page inside the configuration panel" %}  or via `YAML` in your {% term "`configuration.yaml`" %} file.

## Adding a person to Home Assistant

If you have administrator rights, you can add other persons to Home Assistant and create them a user account. Depending on the rights you give them, they can then use Home Assistant on their own devices, can have their own dashboards, and be used in automations.

1. Go to {% my people title="**Settings** > **People**" %} and select **Add person**.
2. Enter their **Name**.
3. Add an image if you like.
4. Under **Allow login**, select if they should be able to log in.
   - If they cannot log in, they do not get a user account, and they cannot do much with Home Assistant.
   - They cannot have their own dashboard, for example.
   - But they can still be used for device tracking and show up on a map and be used in automations.
5. If they are able to log in, fill in the user information.
   - Check if the username is correct. A suggestion is made based on the person name. But they do not have to be identical.
     - The username must be lowercase and contain no spaces.
     - The username is required to log in.
     - The person name is the name displayed in the UI.
   - Enter a password and store it in a safe location.
   - Define if they should have **Local access only**.
     - If this is enabled, they won't have access to Home Assistant when they are outside your network, for example from their phone.
   - Define if they should have **Administrator** rights.
   - Select **Create**.
6. If you have already set up devices for [presence detection](/getting-started/presence-detection/), **select the devices that belong to this person**.

### Customizing the picture for a person

You can easily upload a picture in the frontend. Simply click on a person, select or drop an image in the input field, and then crop it.

<lite-youtube videoid="rOlRnwaaT7Y" videotitle="Changing a profile picture" posterquality="maxresdefault"></lite-youtube>

See the documentation about [hosting files](/integrations/http/#hosting-files) for more information about the `www` folder.

## Configuring the `person` integration via the Home Assistant configuration panel

This integration is by default enabled, unless you've disabled or removed the [`default_config:`](/integrations/default_config/) line from your configuration. If that is the case, the following example shows you how to enable this integration manually:

```yaml
person:
```

## Configuring the `person` integration via YAML

If you prefer YAML, you can also configure your persons via the {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
person:
  - name: Ada
    id: ada6789
    device_trackers:
      - device_tracker.ada
```

{% configuration %}
  id:
    description: A unique id of the person.
    required: true
    type: string
  name:
    description: The name of the person.
    required: true
    type: string
  user_id:
    description: The user ID of the Home Assistant user account for the person. `user_id` (aka `ID`) of users can be inspected in the "Users"/"Manage users" screen in the configuration panel.
    required: false
    type: string
  device_trackers:
    description: A list of device tracker entity IDs to track. These will represent the state of the person.
    required: false
    type: [string, list]
{% endconfiguration %}

An extended example would look like the following sample:

```yaml
# Example configuration.yaml entry
person:
  - name: Ada
    id: ada6789
    device_trackers:
      - device_tracker.ada
  - name: Stacey
    id: stacey12345
    user_id: 12345678912345678912345678912345
    device_trackers:
      - device_tracker.stacey
      - device_tracker.beacon
```

If you change the YAML, you can reload it by calling the `person.reload` action.

## Triggers

The person {% term integration %} provides purpose-specific [automation triggers](/docs/automation/trigger/#entity-triggers). These are available when the **Purpose-specific triggers and conditions** feature in {% my labs title="**Settings** > **System** > **Labs**" %} is enabled.

There is an important asymmetry in how these triggers handle `unavailable` and `unknown` states:

- **Entered home** (`person.entered_home`): Does not fire when a person's state recovers from `unavailable` or `unknown` back to `home`. If someone returns home but their device briefly went offline, this trigger does not fire on recovery.
- **Left home** (`person.left_home`): _Does_ fire when a person's state changes from `home` to `unavailable` or `unknown`. If a device loses tracking while at home, this trigger fires. This can cause unexpected behavior in automations that assume the person physically left, such as "turn off lights when everyone has left." To prevent false triggers, consider adding a condition to check that the person is `not_home` rather than simply `unavailable`.

### Trigger: Entered home

{% include integrations/labs_entity_triggers_note.md %}

The `person.entered_home` trigger fires when the person arrives home.

The following example triggers the automation as soon as the first of the two targeted people arrives home:

```yaml
automation:
  triggers:
    - trigger: person.entered_home
      target:
        entity_id:
          - person.ada
          - person.bob
      options:
        behavior: first
```

- **`target`**
  - **Description**: The `person` entity to monitor.
  - **Optional**: No
- **`options`**
  - **`behavior`**
    - **Description**: Controls which arrivals trigger the automation when multiple people are targeted. Options: `any` (fires every time any targeted person arrives home), `first` (fires only when the first targeted person arrives home), `last` (fires only after the last targeted person has arrived home).
    - **Optional**: Yes

### Trigger: Left home

{% include integrations/labs_entity_triggers_note.md %}

The `person.left_home` trigger fires when the person leaves home.

The following example triggers the automation only after the last of the two targeted people has left home:

```yaml
automation:
  triggers:
    - trigger: person.left_home
      target:
        entity_id:
          - person.ada
          - person.bob
      options:
        behavior: last
```

- **`target`**
  - **Description**: The `person` entity to monitor.
  - **Optional**: No
- **`options`**
  - **`behavior`**
    - **Description**: Controls which departures trigger the automation when multiple people are targeted. Options: `any` (fires every time any targeted person leaves home), `first` (fires only when the first targeted person leaves home), `last` (fires only after the last targeted person has left home).
    - **Optional**: Yes

## Conditions

The person {% term integration %} provides purpose-specific [automation conditions](/docs/automation/condition/#entity-conditions). These are available when the **Purpose-specific triggers and conditions** feature in {% my labs title="**Settings** > **System** > **Labs**" %} is enabled.

Entities that are `unavailable` or `unknown` are excluded from the check. With `behavior: any` (the default), the condition fails if all targeted entities are `unavailable` or `unknown`. With `behavior: all`, the condition passes if all targeted entities are `unavailable` or `unknown`.

### Condition: Person is home

{% include integrations/labs_entity_triggers_note.md %}

The `person.is_home` condition passes when the person is home.

The following example passes only when both Ada and Bob are home:

```yaml
automation:
  conditions:
    - condition: person.is_home
      target:
        entity_id:
          - person.ada
          - person.bob
      options:
        behavior: all
```

- **`target`**
  - **Description**: The `person` entity to check.
  - **Optional**: No
- **`options`**
  - **`behavior`**
    - **Description**: How to evaluate when multiple people are targeted. Defaults to `any` if not specified. Options: `any` (passes if at least one person is home), `all` (passes only if all targeted people are home).
    - **Optional**: Yes

### Condition: Person is not home

{% include integrations/labs_entity_triggers_note.md %}

The `person.is_not_home` condition passes when the person is not home.

The following example passes only when both Ada and Bob are not home:

```yaml
automation:
  conditions:
    - condition: person.is_not_home
      target:
        entity_id:
          - person.ada
          - person.bob
      options:
        behavior: all
```

- **`target`**
  - **Description**: The `person` entity to check.
  - **Optional**: No
- **`options`**
  - **`behavior`**
    - **Description**: How to evaluate when multiple people are targeted. Defaults to `any` if not specified. Options: `any` (passes if at least one person is not home), `all` (passes only if all targeted people are not home).
    - **Optional**: Yes
