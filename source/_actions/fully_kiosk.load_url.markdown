---
title: "Load URL"
action: fully_kiosk.load_url
domain: fully_kiosk
description: "Loads a URL on Fully Kiosk Browser."
related_actions:
  - fully_kiosk.set_config
  - fully_kiosk.start_application
---

The **Load URL** action tells Fully Kiosk Browser to open a specific web address on your device.

{% include actions/ui_header.md %}

To load a URL from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Fully Kiosk Browser: Load URL**.
6. Select the **Device ID** to load the URL on.
7. Enter the **URL** to load.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Device ID:
  description: The device running Fully Kiosk Browser to load the URL on.
  required: true
URL:
  description: The URL to load.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `fully_kiosk.load_url`:

{% example %}
action: |
  action: fully_kiosk.load_url
  data:
    device_id: a674c90eca95eca91f6020415de07713
    url: "https://www.home-assistant.io"
{% endexample %}

This opens the Home Assistant website on the selected device.

### Options in YAML

{% options_yaml %}
device_id:
  description: The device running Fully Kiosk Browser to load the URL on.
  required: true
  type: string
url:
  description: The URL to load.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
