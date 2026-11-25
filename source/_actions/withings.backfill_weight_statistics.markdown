---
title: "Backfill weight statistics"
action: withings.backfill_weight_statistics
domain: withings
description: "Imports historical weight readings into the existing weight sensor's statistics."
---

The **Withings: Backfill weight statistics** action imports available historical weight readings into your existing weight sensor's long-term statistics. It does not create another sensor or change the current sensor value.

Use it to bring the weigh-ins you recorded before Home Assistant tracked your weight into your statistics graphs, for example after you first set up the Withings integration.

Before you use this action, make sure your account's weight sensor is enabled and included in Recorder. If the weight sensor does not exist yet, take a new measurement and let it sync to the Withings app and Home Assistant first.

{% include actions/ui_header.md %}

To import your weight history from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Withings: Backfill weight statistics**.
6. Under **Account**, select the Withings account whose weight history you want to import.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Account:
  description: The Withings account whose weight history you want to import.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `withings.backfill_weight_statistics`. A basic example looks like this:

{% example %}
action: |
  action: withings.backfill_weight_statistics
  data:
    config_entry_id: a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4
{% endexample %}

This imports the available weight history of the selected Withings account.

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: The configuration entry ID of the Withings account to import.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- Only administrators can run this action.
- Each imported hour contains the minimum, maximum, and mean of the readings taken during that hour. Hours without readings stay empty.
- The current and previous hour are excluded so Recorder can process recent readings.
- Existing statistics, including earlier imports, are preserved. Running the action again fills missing hours but does not replace existing values with later corrections from Withings.
- Unassigned or ambiguous readings and weight goals are excluded.
- Imported values use the unit of the sensor's existing statistics. If the sensor has no statistics yet, its current unit is used.
- Use a statistics graph card to view the imported values. The action does not import individual sensor-state events.
- The action runs when you request it. It does not import history automatically.

## Try it yourself

To import your weight history now, open {% my tools_actions title="**Settings** > **Tools** > **Actions**" %}, search for **Withings: Backfill weight statistics**, select your Withings account, and select **Perform action**. To see the imported values, add a statistics graph card for your weight sensor.

{% include actions/stuck.md %}

{% include actions/related.md %}
