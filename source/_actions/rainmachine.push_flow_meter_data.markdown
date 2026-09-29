---
title: "Push flow meter data"
action: rainmachine.push_flow_meter_data
domain: rainmachine
description: "Sends flow meter data from Home Assistant to the RainMachine device."
related_actions:
  - rainmachine.push_weather_data
---

The **Push flow meter data** action sends a flow meter reading from Home Assistant to a RainMachine controller. This lets you feed the controller flow data from a meter that Home Assistant can read but RainMachine cannot reach directly.

{% include actions/ui_header.md %}

To push flow meter data from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **RainMachine: Push flow meter data**.
6. Select the **Controller** and enter the **Value**, and optionally a **Unit of measurement**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Controller:
  description: The controller to send flow meter data to.
  required: true
Value:
  description: The flow meter value to send. Any positive number is accepted.
  required: true
Unit of measurement:
  description: "The flow meter units to send: clicks, gal, litre, or m3."
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `rainmachine.push_flow_meter_data`. A basic example looks like this:

{% example %}
action: |
  action: rainmachine.push_flow_meter_data
  data:
    device_id: 4de41b1e3d8f0b6e3c0e2a3b1f5a7c9d
    value: 100
    unit_of_measurement: "litre"
{% endexample %}

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The controller to send flow meter data to.
  required: true
  type: string
value:
  description: >
    The flow meter value to send. Any positive number is accepted.
  required: true
  type: float
unit_of_measurement:
  description: >
    The flow meter units to send: clicks, gal, litre, or m3.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
