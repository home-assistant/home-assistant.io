---
title: "Restart device"
action: knx.restart_device
domain: knx
description: "Sends a basic restart to a KNX device."
related_actions:
  - knx.read
  - knx.send
---

The **Restart device** action restarts a single KNX device, addressed by its individual address. It sends a basic restart. The device keeps its parameters and application program. Only administrators can use this action.

This is useful when a device stops responding as expected and you want to restart it without opening ETS or switching off the bus voltage.

To restart a device right away, without building an automation, use the KNX panel. This requires an ETS project file uploaded in the KNX panel.

1. Go to **Settings** > **Connectivity** > **KNX** and select **Project**.
2. Open the **Devices** tab.
3. Next to the device, select the three dots {% icon "mdi:dots-vertical" %} menu and select **Restart device**.
4. In the confirmation dialog, select **Restart**.

{% include actions/ui_header.md %}

To restart a KNX device from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **KNX: Restart device**.
6. Enter the **Individual address** of the device, such as `1.1.5`.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Individual address:
  description: The individual address of the KNX device to restart, in the format `area.line.device`, such as `1.1.5`.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `knx.restart_device`. A basic example looks like this:

{% example %}
action: |
  action: knx.restart_device
  data:
    individual_address: "1.1.5"
{% endexample %}

This sends a basic restart to the device with the individual address `1.1.5`.

### Options in YAML

{% options_yaml %}
individual_address:
  description: >
    The individual address of the KNX device to restart, in the format
    `area.line.device`, such as `1.1.5`.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- The device does not confirm a basic restart. The action succeeds as soon as the restart request is sent to the KNX bus. It does not wait for the device to start up again.
- While it restarts, the device does not react to telegrams for a short time. Afterward, it behaves as configured in ETS for a restart. Depending on its parameters, an actuator can switch its outputs or a device can send its current values.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Script: restart a KNX device on demand

This script restarts a KNX presence detector. Add the script to a dashboard to restart the device with a single tap.

{% details "YAML example for restarting a device" %}

{% example %}
script: |
  alias: "Restart hallway presence detector"
  sequence:
    - action: knx.restart_device
      data:
        # Hallway presence detector
        individual_address: "1.1.12"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
