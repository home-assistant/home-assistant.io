---
title: "Pair sensor"
action: guardian.pair_sensor
domain: guardian
description: "Adds a new paired sensor to the valve controller."
related_actions:
  - guardian.unpair_sensor
  - guardian.upgrade_firmware
---

The **Pair sensor** action adds a new paired sensor to a Guardian valve controller.

This is handy when you want to add a leak sensor from an automation or a script instead of pairing it by hand, for example as part of a setup routine when you install a new sensor.

{% include actions/ui_header.md %}

To pair a sensor from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Guardian: Pair sensor**.
6. Select the **Valve controller** to add the sensor to, and enter the sensor **UID**.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Valve controller:
  description: The valve controller to add the sensor to.
  required: true
UID:
  description: The unique device ID printed on the bottom of the sensor.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `guardian.pair_sensor`. A basic example looks like this:

{% example %}
action: |
  action: guardian.pair_sensor
  data:
    device_id: 1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d
    uid: "5410EC688BCF"
{% endexample %}

This pairs the sensor with the given UID to the selected valve controller.

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The ID of the valve controller device to add the sensor to.
  required: true
  type: string
uid:
  description: >
    The unique device ID printed on the bottom of the sensor.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
