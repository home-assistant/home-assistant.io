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

## Creating an automation to send the vacuum to clean specific areas

When your vacuum supports area cleaning, you can create an automation in Home Assistant to send your vacuum to clean specific areas. For example, you can set up an automation to have the vacuum clean the living room every day at 2 PM.

Creating such an automation involves two steps:

1. [Mapping your vacuum areas to Home Assistant areas](#mapping-your-vacuum-areas-to-home-assistant-areas). This is a one-time setup step to link the areas defined in your vacuum's app to the areas defined in Home Assistant.
2. [Sending your vacuum to clean specific areas](#sending-your-vacuum-to-clean-specific-areas). This is where you create the automation that tells your vacuum to clean specific areas based on certain triggers.

### Mapping your vacuum areas to Home Assistant areas

Before you can send your vacuum to clean specific areas, you need to map the areas of your vacuum to the areas in Home Assistant.

1. Go to {% my entities title="**Settings** > **Devices & services** > **Entities**" %} and select your vacuum entity.
2. In the entity settings, select the cogwheel {% icon "mdi:cog-outline" %}.
3. Select **Map vacuum segments to areas**.
   - Result: In the dialog, you should see the vacuum areas listed on the left and the Home Assistant areas on the right.
   - If you do not see the **Map vacuum segments to areas** option, your vacuum does not support area cleaning. You cannot use the `vacuum.clean_area` action with this vacuum.
   - Troubleshooting: If there are no areas listed on the left, make sure the areas are properly set up in the vacuum's app. You might need to save or confirm them again in the app.
4. In the **Map vacuum segments to areas** dialog, for each area reported by your vacuum, select the corresponding Home Assistant area.
5. Select **Save**.

### Sending your vacuum to clean specific areas

Once you have the areas mapped, you can send your vacuum to clean specific areas using the `vacuum.clean_area` action.

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and select **Create automation**.
2. Set up your trigger. For example, you can use a time trigger to have the vacuum clean every day at 2 PM.
3. Select **Add action** and under **Targets**, search for `vacuum` and select the `vacuum.clean_area` action.
4. Under **Targets**, select your vacuum entity.
5. Under **Area**, select the area to clean. You can select multiple areas.
6. Give your automation a name and select **Save**.
7. Test your automation by selecting **Run actions**. Your vacuum should start cleaning the specified areas.