---
title: "Time of use settings"
action: teslemetry.time_of_use
domain: teslemetry
description: "Updates the time of use settings for a Tesla energy site."
related_actions:
  - teslemetry.set_scheduled_charging
---

The **Time of use settings** action updates the time of use tariff for a Tesla energy site, such as a Powerwall. The tariff tells the energy site when electricity is cheap or expensive, so it can decide when to charge from the grid and when to draw from the battery.

Use it to keep your Powerwall in sync with your utility's pricing, for example switching to a seasonal tariff when your rates change.

{% include actions/ui_header.md %}

To update the time of use settings from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Teslemetry: Time of use settings**.
6. Select the **Energy site** to configure.
7. Enter the tariff **Settings**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Energy site:
  description: The energy site to configure.
Settings:
  description: The time of use tariff settings. See the [Tesla Fleet API documentation](https://developer.tesla.com/docs/fleet-api#time_of_use_settings) for the structure.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `teslemetry.time_of_use`. The `tou_settings` value is a mapping that follows the structure in the [Tesla Fleet API documentation](https://developer.tesla.com/docs/fleet-api#time_of_use_settings).

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The ID of the energy site to configure.
  required: true
  type: string
tou_settings:
  description: >
    The time of use tariff settings. See the [Tesla Fleet API documentation](https://developer.tesla.com/docs/fleet-api#time_of_use_settings) for the structure.
  required: true
  type: map
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
