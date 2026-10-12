---
title: "Start application"
action: fully_kiosk.start_application
domain: fully_kiosk
description: "Starts an application on the device running Fully Kiosk Browser."
related_actions:
  - fully_kiosk.load_url
  - fully_kiosk.set_config
---

This action launches an Android app on the device running Fully Kiosk Browser.

You refer to the app by its package name, for example `de.ozerov.fully` for Fully Kiosk Browser itself.

{% include actions/ui_header.md %}

To start an application from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Fully Kiosk Browser: Start application**.
6. Select the **Device ID** to start the application on.
7. Enter the **Application** package name to start.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Device ID:
  description: The device running Fully Kiosk Browser to start the application on.
  required: true
Application:
  description: The package name of the application to start.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `fully_kiosk.start_application`:

{% example %}
action: |
  action: fully_kiosk.start_application
  data:
    device_id: a674c90eca95eca91f6020415de07713
    application: "de.ozerov.fully"
{% endexample %}

This launches the Fully Kiosk Browser app on the selected device.

### Options in YAML

{% options_yaml %}
device_id:
  description: The device running Fully Kiosk Browser to start the application on.
  required: true
  type: string
application:
  description: The package name of the application to start.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
