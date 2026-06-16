---
title: "Set configuration"
action: fully_kiosk.set_config
domain: fully_kiosk
description: "Sets a configuration parameter on Fully Kiosk Browser."
related_actions:
  - fully_kiosk.load_url
  - fully_kiosk.start_application
---

The **Set configuration** action changes one of the many configuration parameters of Fully Kiosk Browser on your device.

You can find the list of available keys in the Fully Kiosk Browser remote admin panel by selecting the **Show keys** button.

{% include actions/ui_header.md %}

To set a configuration parameter from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Fully Kiosk Browser: Set configuration**.
6. Select the **Device ID** to change the parameter on.
7. Enter the **Key** and the **Value** to set.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Device ID:
  description: The device running Fully Kiosk Browser to change the parameter on.
  required: true
Key:
  description: The configuration parameter to set.
  required: true
Value:
  description: The value to set the configuration parameter to.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `fully_kiosk.set_config`:

{% example %}
action: |
  action: fully_kiosk.set_config
  data:
    device_id: a674c90eca95eca91f6020415de07713
    key: "motionSensitivity"
    value: "90"
{% endexample %}

This sets the motion sensitivity to `90` on the selected device.

### Options in YAML

{% options_yaml %}
device_id:
  description: The device running Fully Kiosk Browser to change the parameter on.
  required: true
  type: string
key:
  description: The configuration parameter to set.
  required: true
  type: string
value:
  description: The value to set the configuration parameter to.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
