---
title: "Backfill weight statistics"
action: withings.backfill_weight_statistics
domain: withings
description: "Imports historical weight readings into the existing weight sensor's statistics."
---

The **Withings: Backfill weight statistics** action imports available historical weight readings into your existing weight sensor's long-term statistics. It does not create another sensor or change the current sensor value.

## Run the action

To import your weight history:

1. Make sure your account's weight sensor is enabled and included in Recorder.
2. As an administrator, go to **Developer tools** > **Actions**.
3. Select **Backfill weight statistics**.
4. Select the Withings account and select **Perform action**.

If the weight sensor does not exist yet, take a new measurement and let it sync to the Withings app and Home Assistant first.

### Options in the UI

{% options_ui %}
Account:
  description: The Withings account whose weight history you want to import.
  required: true
{% endoptions_ui %}

## YAML

In YAML, refer to this action as `withings.backfill_weight_statistics`.

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: The configuration entry ID of the Withings account to import.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- Each imported hour contains the minimum, maximum, and mean of the readings taken during that hour. Hours without readings stay empty.
- The current and previous hour are excluded so Recorder can process recent readings.
- Existing statistics, including earlier imports, are preserved. Running the action again fills missing hours but does not replace existing values with later corrections from Withings.
- Unassigned or ambiguous readings and weight goals are excluded.
- Imported values use the existing statistics unit. Use a statistics graph card to view them; the action does not import individual sensor-state events.
- The action runs when you request it. It does not import history automatically.

{% include actions/related.md %}
