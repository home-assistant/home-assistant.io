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

Available actions:

- `start`
- `pause`
- `stop`
- `return_to_base`
- `locate`
- `clean_spot`
- `clean_area`
- `set_fan_speed`
- `send_command`.

Before calling one of these actions, make sure your vacuum platform supports it.

### Start vacuum

The `vacuum.start` action starts or resumes a cleaning task.

| Data attribute | Optional | Description |
| -------------- | -------- | ----------- |
| `entity_id`    | yes      | Only act on specific vacuum. Use `entity_id: all` to target all. |

### Pause vacuum

The `vacuum.pause` action pauses a cleaning task.

| Data attribute | Optional | Description |
| -------------- | -------- | ----------- |
| `entity_id`    | yes      | Only act on specific vacuum. Use `entity_id: all` to target all. |

### Stop vacuum

The `vacuum.stop` action stops the current activity of the vacuum.

| Data attribute | Optional | Description |
| -------------- | -------- | ----------- |
| `entity_id`    | yes      | Only act on specific vacuum. Use `entity_id: all` to target all. |

### Return vacuum to base

The `vacuum.return_to_base` action tells the vacuum to return home.

| Data attribute | Optional | Description |
| -------------- | -------- | ----------- |
| `entity_id`    | yes      | Only act on specific vacuum. Use `entity_id: all` to target all. |

### Locate vacuum

The `vacuum.locate` action locates the vacuum cleaner robot.

| Data attribute | Optional | Description |
| -------------- | -------- | ----------- |
| `entity_id`    | yes      | Only act on specific vacuum. Use `entity_id: all` to target all. |

### Clean spot

The `vacuum.clean_spot` action tells the vacuum cleaner to do a spot clean-up.

| Data attribute | Optional | Description |
| -------------- | -------- | ----------- |
| `entity_id`    | yes      | Only act on specific vacuum. Use `entity_id: all` to target all. |

### Clean area

The `vacuum.clean_area` action tells the vacuum to clean one or more Home Assistant areas. To use this action, the vacuum's [segments must first be mapped to areas](#mapping-your-vacuum-areas-to-home-assistant-areas).

| Data attribute     | Optional | Description |
| ------------------ | -------- | ----------- |
| `entity_id`        | yes      | Only act on specific vacuum. Use `entity_id: all` to target all. |
| `cleaning_area_id` | no       | List of areas for the vacuum to clean. |

### Set vacuum fan speed

The `vacuum.set_fan_speed` action sets the fan speed of the vacuum. The `fanspeed` can be a label, as `balanced` or `turbo`, or be a number; it depends on the `vacuum` platform.

| Data attribute | Optional | Description |
| -------------- | -------- | ----------- |
| `entity_id`    | yes      | Only act on specific vacuum. Use `entity_id: all` to target all. |
| `fan_speed`    | no       | Platform dependent vacuum cleaner fan speed, with speed steps, like 'medium', or by percentage, between 0 and 100. |

### Send command to vacuum

The `vacuum.send_command` action sends a platform-specific command to the vacuum cleaner.

| Data attribute | Optional | Description |
| -------------- | -------- | ----------- |
| `entity_id`    | yes      | Only act on specific vacuum. Use `entity_id: all` to target all. |
| `command`      | no       | Command to execute. |
| `params`       | yes      | Parameters for the command. |

## Creating an automation to send the vacuum to clean specific areas

When your vacuum supports area cleaning, you can create an automation in Home Assistant to send your vacuum to clean specific areas. For example, you can set up an automation to have the vacuum clean the living room every day at 2 PM.

Creating such an automation involves two steps:

1. [Mapping your vacuum areas to Home Assistant areas](#mapping-your-vacuum-areas-to-home-assistant-areas). This is a one-time setup step to link the areas defined in your vacuum's app to the areas defined in Home Assistant.
2. [Sending your vacuum to clean specific areas](#sending-your-vacuum-to-clean-specific-areas). This is where you create the automation that tells your vacuum to clean specific areas based on certain triggers.

### Mapping your vacuum areas to Home Assistant areas

Before you can send your vacuum to clean specific areas, you need to map the areas of your vacuum to the areas in Home Assistant.

1. Go to {% my entities title="**Settings** > **Devices & services** > **Entities**" %}.
2. Select your vacuum entity.
3. In the entity settings, select the cogwheel {% icon "mdi:cog-outline" %}.
4. Select **Map vacuum segments to areas**.
   - Result: In the dialog, you should see the vacuum areas listed on the left and the Home Assistant areas on the right.
   - If you do not see the **Map vacuum segments to areas** option, your vacuum does not support area cleaning. You cannot use the `vacuum.clean_area` action with this vacuum.
   - Troubleshooting: If there are no areas listed on the left, make sure the areas are properly set up in the vacuum's app. You might need to save or confirm them again in the app.
5. In the **Map vacuum segments to areas** dialog, for each area reported by your vacuum, select the corresponding Home Assistant area.
6. Select **Save**.

### Sending your vacuum to clean specific areas

Once you have the areas mapped, you can send your vacuum to clean specific areas using the `vacuum.clean_area` action.

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Select **Create automation**.
3. Set up your trigger. For example, you can use a time trigger to have the vacuum clean every day at 2 PM.
4. Select **Add action** and under **Targets**, search for `vacuum` and select the `vacuum.clean_area` action.
5. Under **Targets**, select your vacuum entity.
6. Under **Area**, select the area to clean. You can select multiple areas.
7. Give your automation a name and select **Save**.
8. Test your automation by selecting **Run actions**. Your vacuum should start cleaning the specified areas.

## Triggers

{% include integrations/labs_entity_triggers_note.md %}

The vacuum {% term integration %} provides purpose-specific automation triggers.

These triggers only fire when the entity transitions from a known, valid state.
If a device goes offline and reconnects (transitioning from `unavailable` or `unknown` back to an active state), the trigger does not execute for that recovery.

To learn more about these triggers, see [Entity triggers](/docs/automation/trigger/#entity-triggers).

### Creating an automation with a vacuum trigger

To create an automation that uses a vacuum trigger:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. From the search box, select a vacuum trigger.
5. Under **Targets**:
   - To monitor specific entities, select the entities.
   - To monitor all vacuum entities in an area or a floor, select the area or floor.
6. Under **Behavior**, select how the automation triggers:
   - **First**: if monitoring multiple vacuums, the automation only fires when one of them has completed the action.
     The next ones don't trigger the automation.
   - **Last**: if monitoring multiple vacuums, the automation only fires after both vacuums have completed the action.
   - **Any**: the automation fires whenever a monitored vacuum returns to dock.
7. In the **Then do** section, select **Add action** and choose your preferred notification action.
8. Select **Save** and give your automation a meaningful name.

For example, to create an automation that sends a mobile notification when both your upstairs and downstairs vacuums have finished cleaning and docked, select the following:

- **Trigger**: Vacuum returned to dock
  - **Target**: `Upstairs vacuum` and `Downstairs vacuum`
  - **Behavior**: Last
- **Action**: Notifications: Send a notification via mobile app
  - **Message**: Both vacuums have finished cleaning and docked.

{% details "YAML example for this automation" %}

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

{% enddetails %}

### Vacuum returned to dock

{% include integrations/labs_entity_triggers_note.md %}

The `vacuum.docked` trigger fires when the vacuum cleaner docks.

For example, to trigger the automation after both of your vacuums dock, select the following when you [create an automation](#creating-an-automation-with-a-vacuum-trigger):

- **Trigger**: Vacuum returned to dock
- **Target**: `Upstairs vacuum` and `Downstairs vacuum`
- **Behavior**: **Last**

{% details "YAML example for this trigger" %}

```yaml
automation:
  triggers:
    - trigger: vacuum.docked
      target:
        entity_id:
          - vacuum.upstairs
          - vacuum.downstairs
      options:
        behavior: last
```

| Data attribute | Optional | Description |
| -------------- | -------- | ----------- |
| `target`       | no       | The `vacuum` entity to monitor. |
| `behavior`     | yes      | Controls which events trigger the automation when multiple vacuums are targeted. Options: `any` (fires every time any targeted vacuum docks), `first` (fires only when the first targeted vacuum docks), `last` (fires only after the last targeted vacuum has docked). |

{% enddetails %}

### Vacuum encountered an error

{% include integrations/labs_entity_triggers_note.md %}

The `vacuum.errored` trigger fires when the vacuum cleaner encounters an error.

For example, to trigger the automation as soon as one of the vacuums reports an error, select the following when you [create an automation](#creating-an-automation-with-a-vacuum-trigger):

- **Trigger**: Vacuum encountered an error
- **Target**: `Upstairs vacuum` and `Downstairs vacuum`
- **Behavior**: **First**

{% details "YAML example for this trigger" %}

```yaml
automation:
  triggers:
    - trigger: vacuum.errored
      target:
        entity_id:
          - vacuum.upstairs
          - vacuum.downstairs
      options:
        behavior: first
```

| Data attribute | Optional | Description |
| -------------- | -------- | ----------- |
| `target`       | no       | The `vacuum` entity to monitor. |
| `behavior`     | yes      | Controls which events trigger the automation when multiple vacuums are targeted. Options: `any` (fires every time any targeted vacuum encounters an error), `first` (fires only when the first targeted vacuum encounters an error), `last` (fires only after the last targeted vacuum has encountered an error). |

{% enddetails %}

### Vacuum paused cleaning

{% include integrations/labs_entity_triggers_note.md %}

The `vacuum.paused_cleaning` trigger fires when the vacuum cleaner pauses its cleaning run.

For example, to trigger the automation as soon as one of the vacuums pauses cleaning, select the following when you [create an automation](#creating-an-automation-with-a-vacuum-trigger):

- **Trigger**: Vacuum cleaner paused cleaning
- **Target**: `Upstairs vacuum` and `Downstairs vacuum`
- **Behavior**: **First**

{% details "YAML example for this trigger" %}

```yaml
automation:
  triggers:
    - trigger: vacuum.paused_cleaning
      target:
        entity_id:
          - vacuum.upstairs
          - vacuum.downstairs
      options:
        behavior: first
```

| Data attribute | Optional | Description |
| -------------- | -------- | ----------- |
| `target`       | no       | The `vacuum` entity to monitor. |
| `behavior`     | yes      | Controls which events trigger the automation when multiple vacuums are targeted. Options: `any` (fires every time any targeted vacuum pauses cleaning), `first` (fires only when the first targeted vacuum pauses cleaning), `last` (fires only after the last targeted vacuum has paused cleaning). |

{% enddetails %}

### Vacuum started cleaning

{% include integrations/labs_entity_triggers_note.md %}

The `vacuum.started_cleaning` trigger fires when the vacuum cleaner begins a cleaning run.

For example, to trigger the automation as soon as one of the vacuums starts cleaning, select the following when you [create an automation](#creating-an-automation-with-a-vacuum-trigger):

- **Trigger**: Vacuum cleaner started cleaning
- **Target**: `Upstairs vacuum` and `Downstairs vacuum`
- **Behavior**: **First**

{% details "YAML example for this trigger" %}

```yaml
automation:
  triggers:
    - trigger: vacuum.started_cleaning
      target:
        entity_id:
          - vacuum.upstairs
          - vacuum.downstairs
      options:
        behavior: first
```

| Data attribute | Optional | Description |
| -------------- | -------- | ----------- |
| `target`       | no       | The `vacuum` entity to monitor. |
| `behavior`     | yes      | Controls which events trigger the automation when multiple vacuums are targeted. Options: `any` (fires every time any targeted vacuum starts cleaning), `first` (fires only when the first targeted vacuum starts cleaning), `last` (fires only after the last targeted vacuum has started cleaning). |

{% enddetails %}

### Vacuum started returning to dock

{% include integrations/labs_entity_triggers_note.md %}

The `vacuum.started_returning` trigger fires when the vacuum cleaner starts heading back to its dock.

For example, to trigger the automation as soon as one of the vacuums starts returning to the dock, select the following when you [create an automation](#creating-an-automation-with-a-vacuum-trigger):

- **Trigger**: Vacuum cleaner started returning to dock
- **Target**: `Upstairs vacuum` and `Downstairs vacuum`
- **Behavior**: **First**

{% details "YAML example for this trigger" %}

```yaml
automation:
  triggers:
    - trigger: vacuum.started_returning
      target:
        entity_id:
          - vacuum.upstairs
          - vacuum.downstairs
      options:
        behavior: first
```

| Data attribute | Optional | Description |
| -------------- | -------- | ----------- |
| `target`       | no       | The `vacuum` entity to monitor. |
| `behavior`     | yes      | Controls which events trigger the automation when multiple vacuums are targeted. Options: `any` (fires every time any targeted vacuum starts returning to the dock), `first` (fires only when the first targeted vacuum starts returning), `last` (fires only after the last targeted vacuum has started returning). |

{% enddetails %}

## Conditions

{% include integrations/labs_entity_triggers_note.md %}

The vacuum {% term integration %} provides purpose-specific automation conditions.

Entities that are `unavailable` or `unknown` are excluded from the check. With `behavior: any` (the default), the condition fails if all targeted entities are `unavailable` or `unknown`. With `behavior: all`, the condition passes if all targeted entities are `unavailable` or `unknown`.

To learn more about these conditions, see [Entity conditions](/docs/automation/condition/#entity-conditions).

### Vacuum is cleaning

{% include integrations/labs_entity_triggers_note.md %}

The `vacuum.is_cleaning` condition passes when the vacuum cleaner is cleaning.

For example, to let the automation continue only when both vacuums are cleaning, select the following when you [create an automation](#creating-an-automation-with-a-vacuum-trigger):

- **Condition**: Vacuum cleaner is cleaning
- **Target**: `Upstairs vacuum` and `Downstairs vacuum`
- **Behavior**: **All**

{% details "YAML example for this condition" %}

```yaml
automation:
  conditions:
    - condition: vacuum.is_cleaning
      target:
        entity_id:
          - vacuum.upstairs
          - vacuum.downstairs
      options:
        behavior: all
```

| Data attribute | Optional | Description |
| -------------- | -------- | ----------- |
| `target`       | no       | The `vacuum` entity to check. |
| `behavior`     | yes      | How to evaluate when multiple vacuums are targeted. Defaults to `any` if not specified. Options: `any` (passes if at least one vacuum is cleaning), `all` (passes only if all targeted vacuums are cleaning). |

{% enddetails %}

### Vacuum is docked

{% include integrations/labs_entity_triggers_note.md %}

The `vacuum.is_docked` condition passes when the vacuum cleaner is docked.

For example, to let the automation continue only when both vacuums are docked, select the following when you [create an automation](#creating-an-automation-with-a-vacuum-trigger):

- **Condition**: Vacuum cleaner is docked
- **Target**: `Upstairs vacuum` and `Downstairs vacuum`
- **Behavior**: **All**

{% details "YAML example for this condition" %}

```yaml
automation:
  conditions:
    - condition: vacuum.is_docked
      target:
        entity_id:
          - vacuum.upstairs
          - vacuum.downstairs
      options:
        behavior: all
```

| Data attribute | Optional | Description |
| -------------- | -------- | ----------- |
| `target`       | no       | The `vacuum` entity to check. |
| `behavior`     | yes      | How to evaluate when multiple vacuums are targeted. Defaults to `any` if not specified. Options: `any` (passes if at least one vacuum is docked), `all` (passes only if all targeted vacuums are docked). |

{% enddetails %}

### Vacuum is encountering an error

{% include integrations/labs_entity_triggers_note.md %}

The `vacuum.is_encountering_an_error` condition passes when the vacuum cleaner is in an error state.

For example, to let the automation continue only when both vacuums are in an error state, select the following when you [create an automation](#creating-an-automation-with-a-vacuum-trigger):

- **Condition**: Vacuum cleaner is encountering an error
- **Target**: `Upstairs vacuum` and `Downstairs vacuum`
- **Behavior**: **All**

{% details "YAML example for this condition" %}

```yaml
automation:
  conditions:
    - condition: vacuum.is_encountering_an_error
      target:
        entity_id:
          - vacuum.upstairs
          - vacuum.downstairs
      options:
        behavior: all
```

| Data attribute | Optional | Description |
| -------------- | -------- | ----------- |
| `target`       | no       | The `vacuum` entity to check. |
| `behavior`     | yes      | How to evaluate when multiple vacuums are targeted. Defaults to `any` if not specified. Options: `any` (passes if at least one vacuum is in an error state), `all` (passes only if all targeted vacuums are in an error state). |

{% enddetails %}

### Vacuum is paused

{% include integrations/labs_entity_triggers_note.md %}

The `vacuum.is_paused` condition passes when the vacuum cleaner is paused.

For example, to let the automation continue only when both vacuums are paused, select the following when you [create an automation](#creating-an-automation-with-a-vacuum-trigger):

- **Condition**: Vacuum cleaner is paused
- **Target**: `Upstairs vacuum` and `Downstairs vacuum`
- **Behavior**: **All**

{% details "YAML example for this condition" %}

```yaml
automation:
  conditions:
    - condition: vacuum.is_paused
      target:
        entity_id:
          - vacuum.upstairs
          - vacuum.downstairs
      options:
        behavior: all
```

| Data attribute | Optional | Description |
| -------------- | -------- | ----------- |
| `target`       | no       | The `vacuum` entity to check. |
| `behavior`     | yes      | How to evaluate when multiple vacuums are targeted. Defaults to `any` if not specified. Options: `any` (passes if at least one vacuum is paused), `all` (passes only if all targeted vacuums are paused). |

{% enddetails %}

### Vacuum is returning

{% include integrations/labs_entity_triggers_note.md %}

The `vacuum.is_returning` condition passes when the vacuum cleaner is returning to the dock.

For example, to let the automation continue only when both vacuums are returning to the dock, select the following when you [create an automation](#creating-an-automation-with-a-vacuum-trigger):

- **Condition**: Vacuum cleaner is returning
- **Target**: `Upstairs vacuum` and `Downstairs vacuum`
- **Behavior**: **All**

{% details "YAML example for this condition" %}

```yaml
automation:
  conditions:
    - condition: vacuum.is_returning
      target:
        entity_id:
          - vacuum.upstairs
          - vacuum.downstairs
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

{% enddetails %}
