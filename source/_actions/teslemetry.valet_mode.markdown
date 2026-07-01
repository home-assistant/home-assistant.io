---
title: "Set valet mode"
action: teslemetry.valet_mode
domain: teslemetry
description: "Turns valet mode on or off for the vehicle."
related_actions:
  - teslemetry.speed_limit
  - teslemetry.navigation_gps_request
---

The **Set valet mode** action turns valet mode on or off for your Tesla vehicle. Valet mode limits the car's speed and power, locks the glovebox and frunk, and hides personal data, so you can hand the keys to a parking attendant with peace of mind.

Use it to automatically enable valet mode in certain situations, for example when the car arrives at a restaurant or hotel, and turn it back off when you return.

{% include actions/ui_header.md %}

To set valet mode from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Teslemetry: Set valet mode**.
6. Select the **Vehicle** to control.
7. Turn **Enable** on to activate valet mode, or off to deactivate it.
8. Enter a 4-digit **PIN**.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Vehicle:
  description: The vehicle to control.
Enable:
  description: Turn valet mode on or off.
PIN:
  description: A 4-digit code used to enable or disable valet mode.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `teslemetry.valet_mode`. A basic example looks like this:

{% example %}
action: |
  action: teslemetry.valet_mode
  data:
    device_id: 0d462c0c4c0b064b1a91cdbd1ffcbd31
    enable: true
    pin: 1234
{% endexample %}

This activates valet mode and protects it with the PIN `1234`.

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The ID of the vehicle to control.
  required: true
  type: string
enable:
  description: >
    Turn valet mode on or off.
  required: true
  type: boolean
  default: true
pin:
  description: >
    A 4-digit code (1000 to 9999) used to enable or disable valet mode.
  required: true
  type: integer
{% endoptions_yaml %}

## Good to know

- The PIN must be a 4-digit number between 1000 and 9999.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
