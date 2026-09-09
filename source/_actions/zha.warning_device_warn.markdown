---
title: "Start an alert on a warning device"
action: zha.warning_device_warn
domain: zha
description: "Starts a siren and strobe alert on a Zigbee warning device."
related_actions:
  - zha.warning_device_squawk
---

Use this action to start a full alert on a Zigbee warning device, such as a siren. The device alerts the surrounding area with sound and, optionally, a flashing strobe for a set duration. You identify the device by its IEEE address. A common use is to sound a siren when a motion sensor detects someone while you're away.

Only users with administrator rights can run this action.

{% include actions/ui_header.md %}

To start an alert from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Warning device starts alert**.
6. Set the device and, optionally, the mode, strobe, level, duration, and strobe details.
7. Select **Save**.

### Options in the UI

{% options_ui %}
IEEE:
  description: The IEEE address of the warning device.
Mode:
  description: The warning mode, which sets the kind of alarm sound, from 0 to 6. Defaults to 3.
  required: false
Strobe:
  description: Whether the device also flashes its strobe during the alert. Use 1 to flash, 0 for sound only. Defaults to 1.
  required: false
Level:
  description: The loudness of the siren, from 0 (low) to 3 (high). Defaults to 2.
  required: false
Duration:
  description: How long, in seconds, the alert lasts. Defaults to 5 seconds.
  required: false
Duty cycle:
  description: How much of each second the strobe stays on, from 0 to 100 in steps of 10. For example, 40 flashes on for 4 tenths of a second and off for 6 tenths. Defaults to 0.
  required: false
Intensity:
  description: The brightness of the strobe, from 0 (low) to 3 (high). Defaults to 2.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `zha.warning_device_warn`. A basic example looks like this:

{% example %}
action: |
  action: zha.warning_device_warn
  data:
    ieee: "00:0d:6f:00:05:7d:2d:34"
    duration: 10
{% endexample %}

This sounds the siren for 10 seconds.

### Options in YAML

{% options_yaml %}
ieee:
  description: The IEEE address of the warning device.
  required: true
  type: string
mode:
  description: The warning mode, which sets the kind of alarm sound, from 0 to 6. Defaults to 3.
  required: false
  type: integer
strobe:
  description: Whether the device also flashes its strobe during the alert. Use 1 to flash, 0 for sound only. Defaults to 1.
  required: false
  type: integer
level:
  description: The loudness of the siren, from 0 (low) to 3 (high). Defaults to 2.
  required: false
  type: integer
duration:
  description: How long, in seconds, the alert lasts. Defaults to 5 seconds.
  required: false
  type: integer
duty_cycle:
  description: How much of each second the strobe stays on, from 0 to 100 in steps of 10. Defaults to 0.
  required: false
  type: integer
intensity:
  description: The brightness of the strobe, from 0 (low) to 3 (high). Defaults to 2.
  required: false
  type: integer
{% endoptions_yaml %}

## Good to know

- If both the mode and the strobe are set to 0, the duration is ignored and nothing happens.
- The exact sound for each mode depends on the device.

{% include actions/more_examples.md %}

### Automation: sound the siren when motion is detected while away

Start the siren for 30 seconds when a motion sensor turns on and nobody is home.

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Sound the siren on motion while away"
    triggers:
      - trigger: state
        entity_id: binary_sensor.hallway_motion
        to: "on"
    conditions:
      - condition: zone.occupancy_is_not_detected
        options:
          zone: zone.home
    actions:
      - action: zha.warning_device_warn
        data:
          ieee: "00:0d:6f:00:05:7d:2d:34"
          duration: 30
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
