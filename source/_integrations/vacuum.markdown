---
title: Vacuum
description: Instructions on how to setup and use vacuums in Home Assistant.
ha_release: 0.51
ha_domain: vacuum
ha_quality_scale: internal
ha_category:
  - Vacuum
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---

The **Vacuum** {% term integration %} enables the ability to control home cleaning robots within Home Assistant.

{% include integrations/building_block_integration.md %}

## The state of a vacuum entity

A vacuum {% term entity %} can have the following states:

- **Cleaning**: The vacuum is currently cleaning.
- **Docked**: The vacuum is currently docked. It is assumed that docked can also mean charging.
- **Error**: The vacuum encountered an error while cleaning.
- **Idle**: The vacuum is not paused, not docked, and does not have any errors.
- **Paused**: The vacuum was cleaning but was paused without returning to the dock.
- **Returning**: The vacuum is done cleaning and is currently returning to the dock, but not yet docked.
- **Unavailable**: The entity is currently unavailable.
- **Unknown**: The state is not yet known.

## Actions

Available actions: `start`, `pause`, `stop`, `return_to_base`, `locate`, `clean_spot`, `clean_area`, `set_fan_speed`, and `send_command`.

Before calling one of these actions, make sure your vacuum platform supports it.

### Action: Start

The `vacuum.start` action starts or resumes a cleaning task.

| Data attribute | Optional | Description                                                      |
| ---------------------- | -------- | ---------------------------------------------------------------- |
| `entity_id`            | yes      | Only act on specific vacuum. Use `entity_id: all` to target all. |

### Action: Pause

The `vacuum.pause` action pauses a cleaning task.

| Data attribute | Optional | Description                                                      |
| ---------------------- | -------- | ---------------------------------------------------------------- |
| `entity_id`            | yes      | Only act on specific vacuum. Use `entity_id: all` to target all. |

### Action: Stop

The `vacuum.stop` action stops the current activity of the vacuum.

| Data attribute | Optional | Description                                                      |
| ---------------------- | -------- | ---------------------------------------------------------------- |
| `entity_id`            | yes      | Only act on specific vacuum. Use `entity_id: all` to target all. |

### Action: Return to base

The `vacuum.return_to_base` action tells the vacuum to return home.

| Data attribute | Optional | Description                                                      |
| ---------------------- | -------- | ---------------------------------------------------------------- |
| `entity_id`            | yes      | Only act on specific vacuum. Use `entity_id: all` to target all. |

### Action: Locate

The `vacuum.locate` action locates the vacuum cleaner robot.

| Data attribute | Optional | Description                                                      |
| ---------------------- | -------- | ---------------------------------------------------------------- |
| `entity_id`            | yes      | Only act on specific vacuum. Use `entity_id: all` to target all. |

### Action: Clean spot

The `vacuum.clean_spot` action tells the vacuum cleaner to do a spot clean-up.

| Data attribute | Optional | Description                                                      |
| ---------------------- | -------- | ---------------------------------------------------------------- |
| `entity_id`            | yes      | Only act on specific vacuum. Use `entity_id: all` to target all. |

### Action: Clean area

The `vacuum.clean_area` action tells the vacuum to clean one or more Home Assistant areas. To use this action, the vacuum's segments must first be mapped to areas.

| Data attribute | Optional | Description                                                      |
| ---------------------- | -------- | ---------------------------------------------------------------- |
| `entity_id`            | yes      | Only act on specific vacuum. Use `entity_id: all` to target all. |
| `cleaning_area_id`     | no       | List of areas for the vacuum to clean.                           |

### Action: Set fan speed

The `vacuum.set_fan_speed` action sets the fan speed of the vacuum. The `fanspeed` can be a label, as `balanced` or `turbo`, or be a number; it depends on the `vacuum` platform.

| Data attribute | Optional | Description                                                                                                        |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------------------ |
| `entity_id`            | yes      | Only act on specific vacuum. Use `entity_id: all` to target all.                                                   |
| `fan_speed`            | no       | Platform dependent vacuum cleaner fan speed, with speed steps, like 'medium', or by percentage, between 0 and 100. |

### Action: Send command

The `vacuum.send_command` action sends a platform-specific command to the vacuum cleaner.

| Data attribute | Optional | Description                                                      |
| ---------------------- | -------- | ---------------------------------------------------------------- |
| `entity_id`            | yes      | Only act on specific vacuum. Use `entity_id: all` to target all. |
| `command`              | no       | Command to execute.                                              |
| `params`               | yes      | Parameters for the command.                                      |

## Triggers

The vacuum {% term integration %} provides purpose-specific [automation triggers](/docs/automation/trigger/#entity-triggers). These are available when the **Purpose-specific triggers and conditions** feature in {% my labs title="**Settings** > **System** > **Labs**" %} is enabled.

These triggers only fire when the entity transitions from a known, valid state. If a device goes offline and reconnects (transitioning from `unavailable` or `unknown` back to an active state), the trigger does not fire for that recovery.

### Creating a vacuum trigger

This example creates an automation that sends a notification when both your downstairs and upstairs vacuums have finished cleaning and docked.

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and select **Create automation**.
2. Select **Create new automation**.
3. Select **Add trigger**, then in the **Search trigger** field, type "vacuum returned".
4. Select **Vacuum returned to dock** from the list.
5. Under **Target**, select the entities you want to monitor:
   - You can select specific entities, such as **vacuum.downstairs** and **vacuum.upstairs**.
   - You can also select an area or a floor, and all vacuum entities in that area or floor are targeted.
6. Under **Options**, set **Behavior**.
   - If you select **Last**, for example, the automation only fires after both vacuums have docked.
7. In the **Then do** section, select **Add action** and choose your preferred notification action.
8. Select **Save** and give your automation a meaningful name.

The equivalent YAML for this automation looks like this:

```yaml
automation:
  triggers:
    - trigger: vacuum.docked
      target:
        entity_id:
          - vacuum.downstairs
          - vacuum.upstairs
      options:
        behavior: last
  actions:
    - action: notify.mobile_app
      data:
        message: "Both vacuums have finished cleaning and docked."
```

### Trigger: Vacuum returned to dock

{% include integrations/labs_entity_triggers_note.md %}

The `vacuum.docked` trigger fires when the vacuum cleaner docks.

The following example triggers the automation only after both targeted vacuums have docked:

```yaml
automation:
  triggers:
    - trigger: vacuum.docked
      target:
        entity_id:
          - vacuum.my_robot
          - vacuum.second_floor
      options:
        behavior: last
```

- **`target`**
  - **Description**: The `vacuum` entity to monitor.
  - **Optional**: No
- **`options`**
  - **`behavior`**
    - **Description**: Controls which events trigger the automation when multiple vacuums are targeted. Options: `any` (fires every time any targeted vacuum docks), `first` (fires only when the first targeted vacuum docks), `last` (fires only after the last targeted vacuum has docked).
    - **Optional**: Yes

### Trigger: Vacuum encountered an error

{% include integrations/labs_entity_triggers_note.md %}

The `vacuum.errored` trigger fires when the vacuum cleaner encounters an error.

The following example triggers the automation as soon as the first of the two targeted vacuums encounters an error:

```yaml
automation:
  triggers:
    - trigger: vacuum.errored
      target:
        entity_id:
          - vacuum.my_robot
          - vacuum.second_floor
      options:
        behavior: first
```

- **`target`**
  - **Description**: The `vacuum` entity to monitor.
  - **Optional**: No
- **`options`**
  - **`behavior`**
    - **Description**: Controls which events trigger the automation when multiple vacuums are targeted. Options: `any` (fires every time any targeted vacuum encounters an error), `first` (fires only when the first targeted vacuum encounters an error), `last` (fires only after the last targeted vacuum has encountered an error).
    - **Optional**: Yes

### Trigger: Vacuum cleaner paused cleaning

{% include integrations/labs_entity_triggers_note.md %}

The `vacuum.paused_cleaning` trigger fires when the vacuum cleaner pauses its cleaning run.

The following example triggers the automation as soon as the first of the two targeted vacuums pauses cleaning:

```yaml
automation:
  triggers:
    - trigger: vacuum.paused_cleaning
      target:
        entity_id:
          - vacuum.my_robot
          - vacuum.second_floor
      options:
        behavior: first
```

- **`target`**
  - **Description**: The `vacuum` entity to monitor.
  - **Optional**: No
- **`options`**
  - **`behavior`**
    - **Description**: Controls which events trigger the automation when multiple vacuums are targeted. Options: `any` (fires every time any targeted vacuum pauses cleaning), `first` (fires only when the first targeted vacuum pauses cleaning), `last` (fires only after the last targeted vacuum has paused cleaning).
    - **Optional**: Yes

### Trigger: Vacuum cleaner started cleaning

{% include integrations/labs_entity_triggers_note.md %}

The `vacuum.started_cleaning` trigger fires when the vacuum cleaner begins a cleaning run.

The following example triggers the automation as soon as the first of the two targeted vacuums starts cleaning:

```yaml
automation:
  triggers:
    - trigger: vacuum.started_cleaning
      target:
        entity_id:
          - vacuum.my_robot
          - vacuum.second_floor
      options:
        behavior: first
```

- **`target`**
  - **Description**: The `vacuum` entity to monitor.
  - **Optional**: No
- **`options`**
  - **`behavior`**
    - **Description**: Controls which events trigger the automation when multiple vacuums are targeted. Options: `any` (fires every time any targeted vacuum starts cleaning), `first` (fires only when the first targeted vacuum starts cleaning), `last` (fires only after the last targeted vacuum has started cleaning).
    - **Optional**: Yes

### Trigger: Vacuum cleaner started returning to dock

{% include integrations/labs_entity_triggers_note.md %}

The `vacuum.started_returning` trigger fires when the vacuum cleaner starts heading back to its dock.

The following example triggers the automation as soon as the first of the two targeted vacuums starts returning to the dock:

```yaml
automation:
  triggers:
    - trigger: vacuum.started_returning
      target:
        entity_id:
          - vacuum.my_robot
          - vacuum.second_floor
      options:
        behavior: first
```

- **`target`**
  - **Description**: The `vacuum` entity to monitor.
  - **Optional**: No
- **`options`**
  - **`behavior`**
    - **Description**: Controls which events trigger the automation when multiple vacuums are targeted. Options: `any` (fires every time any targeted vacuum starts returning to the dock), `first` (fires only when the first targeted vacuum starts returning), `last` (fires only after the last targeted vacuum has started returning).
    - **Optional**: Yes

## Conditions

The vacuum {% term integration %} provides purpose-specific [automation conditions](/docs/automation/condition/#entity-conditions). These are available when the **Purpose-specific triggers and conditions** feature in {% my labs title="**Settings** > **System** > **Labs**" %} is enabled.

Entities that are `unavailable` or `unknown` are excluded from the check. With `behavior: any` (the default), the condition fails if all targeted entities are `unavailable` or `unknown`. With `behavior: all`, the condition passes if all targeted entities are `unavailable` or `unknown`.

### Condition: Vacuum cleaner is cleaning

{% include integrations/labs_entity_triggers_note.md %}

The `vacuum.is_cleaning` condition passes when the vacuum cleaner is cleaning.

The following example passes only when both targeted vacuums are cleaning:

```yaml
automation:
  conditions:
    - condition: vacuum.is_cleaning
      target:
        entity_id:
          - vacuum.my_robot
          - vacuum.second_floor
      options:
        behavior: all
```

- **`target`**
  - **Description**: The `vacuum` entity to check.
  - **Optional**: No
- **`options`**
  - **`behavior`**
    - **Description**: How to evaluate when multiple vacuums are targeted. Defaults to `any` if not specified. Options: `any` (passes if at least one vacuum is cleaning), `all` (passes only if all targeted vacuums are cleaning).
    - **Optional**: Yes

### Condition: Vacuum cleaner is docked

{% include integrations/labs_entity_triggers_note.md %}

The `vacuum.is_docked` condition passes when the vacuum cleaner is docked.

The following example passes only when both targeted vacuums are docked:

```yaml
automation:
  conditions:
    - condition: vacuum.is_docked
      target:
        entity_id:
          - vacuum.my_robot
          - vacuum.second_floor
      options:
        behavior: all
```

- **`target`**
  - **Description**: The `vacuum` entity to check.
  - **Optional**: No
- **`options`**
  - **`behavior`**
    - **Description**: How to evaluate when multiple vacuums are targeted. Defaults to `any` if not specified. Options: `any` (passes if at least one vacuum is docked), `all` (passes only if all targeted vacuums are docked).
    - **Optional**: Yes

### Condition: Vacuum cleaner is encountering an error

{% include integrations/labs_entity_triggers_note.md %}

The `vacuum.is_encountering_an_error` condition passes when the vacuum cleaner is in an error state.

The following example passes only when both targeted vacuums are in an error state:

```yaml
automation:
  conditions:
    - condition: vacuum.is_encountering_an_error
      target:
        entity_id:
          - vacuum.my_robot
          - vacuum.second_floor
      options:
        behavior: all
```

- **`target`**
  - **Description**: The `vacuum` entity to check.
  - **Optional**: No
- **`options`**
  - **`behavior`**
    - **Description**: How to evaluate when multiple vacuums are targeted. Defaults to `any` if not specified. Options: `any` (passes if at least one vacuum is in an error state), `all` (passes only if all targeted vacuums are in an error state).
    - **Optional**: Yes

### Condition: Vacuum cleaner is paused

{% include integrations/labs_entity_triggers_note.md %}

The `vacuum.is_paused` condition passes when the vacuum cleaner is paused.

The following example passes only when both targeted vacuums are paused:

```yaml
automation:
  conditions:
    - condition: vacuum.is_paused
      target:
        entity_id:
          - vacuum.my_robot
          - vacuum.second_floor
      options:
        behavior: all
```

- **`target`**
  - **Description**: The `vacuum` entity to check.
  - **Optional**: No
- **`options`**
  - **`behavior`**
    - **Description**: How to evaluate when multiple vacuums are targeted. Defaults to `any` if not specified. Options: `any` (passes if at least one vacuum is paused), `all` (passes only if all targeted vacuums are paused).
    - **Optional**: Yes

### Condition: Vacuum cleaner is returning

{% include integrations/labs_entity_triggers_note.md %}

The `vacuum.is_returning` condition passes when the vacuum cleaner is returning to the dock.

The following example passes only when both targeted vacuums are returning to the dock:

```yaml
automation:
  conditions:
    - condition: vacuum.is_returning
      target:
        entity_id:
          - vacuum.my_robot
          - vacuum.second_floor
      options:
        behavior: all
```

- **`target`**
  - **Description**: The `vacuum` entity to check.
  - **Optional**: No
- **`options`**
  - **`behavior`**
    - **Description**: How to evaluate when multiple vacuums are targeted. Defaults to `any` if not specified. Options: `any` (passes if at least one vacuum is returning to the dock), `all` (passes only if all targeted vacuums are returning to the dock).
    - **Optional**: Yes
