---
title: "Set speed limit"
action: teslemetry.speed_limit
domain: teslemetry
description: "Turns the vehicle's speed limit on or off."
related_actions:
  - teslemetry.valet_mode
  - teslemetry.navigation_gps_request
---

The **Set speed limit** action turns Speed Limit Mode on or off for your Tesla vehicle. When active, it caps the car's maximum speed. The setting is protected by a 4-digit PIN.

Use it to keep a cap on the car's speed in certain situations, for example when a younger or newer driver is borrowing it.

{% include actions/ui_header.md %}

To set the speed limit from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Teslemetry: Set speed limit**.
6. Select the **Vehicle** to control.
7. Turn **Enable** on to activate the speed limit, or off to deactivate it.
8. Enter the 4-digit **PIN**.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Vehicle:
  description: The vehicle to control.
Enable:
  description: Turn the speed limit on or off.
PIN:
  description: A 4-digit code used to enable or disable the speed limit.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `teslemetry.speed_limit`. A basic example looks like this:

{% example %}
action: |
  action: teslemetry.speed_limit
  data:
    device_id: 0d462c0c4c0b064b1a91cdbd1ffcbd31
    enable: true
    pin: 1234
{% endexample %}

This activates the speed limit and protects it with the PIN `1234`.

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The ID of the vehicle to control.
  required: true
  type: string
enable:
  description: >
    Turn the speed limit on or off.
  required: true
  type: boolean
pin:
  description: >
    A 4-digit code (1000 to 9999) used to enable or disable the speed limit.
  required: true
  type: integer
{% endoptions_yaml %}

## Good to know

- The PIN must be a 4-digit number between 1000 and 9999.
- To turn the speed limit off, you must provide the same PIN that was used to turn it on.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
