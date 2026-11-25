---
title: "Dispatch battery power"
action: teslemetry.dispatch_battery_power
domain: teslemetry
description: "Charges or discharges the Powerwall at a set power for a set time over the local gateway connection."
related_actions:
  - teslemetry.resume_battery_operation
  - teslemetry.time_of_use
---

The **Teslemetry: Dispatch battery power** action charges or discharges the Powerwall of a Tesla energy site at a set power for a set time. It is sent directly to your Powerwall over your local network, so the energy site must be [paired for local control](/integrations/teslemetry/#local-powerwall-control).

Use it to take direct control of your battery for a while, for example to discharge into the grid during a demand response event, or to charge from the grid when your electricity price is negative.

{% include actions/ui_header.md %}

To dispatch battery power from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Teslemetry: Dispatch battery power**.
6. Select the **Energy site** to control.
7. Enter the **Power** in watts. A positive value discharges the battery, a negative value charges it.
8. Enter the **Duration** in seconds.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Energy site:
  description: The energy site to control. It must be paired with its Powerwall for local control.
Power:
  description: The battery power to hold, in watts. A positive value discharges the battery, a negative value charges it.
Duration:
  description: How long to hold the power, in seconds. When it ends, the Powerwall returns to its normal operation by itself.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `teslemetry.dispatch_battery_power`. A basic example looks like this:

{% example %}
action: |
  action: teslemetry.dispatch_battery_power
  data:
    device_id: 0d462c0c4c0b064b1a91cdbd1ffcbd31
    power: -5000
    duration: 1800
{% endexample %}

This charges the battery at 5 kW for 30 minutes, then the Powerwall returns to its normal operation.

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The ID of the energy site to control. It must be paired with its Powerwall for local control.
  required: true
  type: string
power:
  description: >
    The battery power to hold, in watts. A positive value discharges the battery, a negative value charges it.
  required: true
  type: integer
duration:
  description: >
    How long to hold the power, in seconds (1 to 86400). When it ends, the Powerwall returns to its normal operation by itself.
  required: true
  type: integer
{% endoptions_yaml %}

## Good to know

- A new call replaces the power and duration of the previous one.
- To end the dispatch before its duration ends, use the [Resume battery operation](/actions/teslemetry.resume_battery_operation/) action.
- Your Powerwall still applies its own backup reserve and grid limits, so the battery power it actually reaches can be lower than requested.
- The action needs Powerwall firmware that supports battery dispatch. On older firmware, the action fails with an error saying so.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
