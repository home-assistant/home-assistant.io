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
4. In the **Then do** section, select **Add action**, and from the list, select the **Vacuum: Clean area with vacuum cleaner** action.
5. Under **Targets**, select your vacuum entity.
6. Under **Areas**, select the area to clean. You can select multiple areas.
7. Give your automation a name and select **Save**.
8. Test your automation by selecting **Run actions**. Your vacuum should start cleaning the specified areas.

{% include integrations/triggers_conditions_actions.md %}

## Vacuum example automations

Use the vacuum triggers, conditions, and actions together to turn automation ideas into reliable routines that fit your household.
Start from one small pain point, then decide which vacuum signal kicks things off, which condition keeps it safe, and which action finishes the job.

{% include docs/paste_yaml_tip.md %}

### Automation: Pause cleaning during meetings

When the vacuum starts a run during a scheduled meeting, pause it automatically so the call stays quiet, then send yourself a reminder to resume the job later.

- **Trigger**: `vacuum.started_cleaning` for the office vacuum.
- **Conditions**: A calendar or busy [sensor](/integrations/binary_sensor/) reports that a meeting is in progress, and `vacuum.is_cleaning` confirms the robot is still running.
- **Actions**: `vacuum.pause` to stop the run, followed by a mobile notification that explains why the vacuum paused.

{% details "YAML example for pausing during meetings" %}

```yaml
automation:
  alias: "Mute vacuum during meetings"
  triggers:
    - trigger: vacuum.started_cleaning
      target:
        entity_id: vacuum.office
  conditions:
    - condition: state
      entity_id: binary_sensor.meeting_in_progress
      state: "on"
    - condition: vacuum.is_cleaning
      target:
        entity_id: vacuum.office
  actions:
    - action: vacuum.pause
      target:
        entity_id: vacuum.office
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The office vacuum paused because a meeting started. Resume it when the call ends."
```

{% enddetails %}
