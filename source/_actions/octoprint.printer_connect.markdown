---
title: "Connect to a printer"
action: octoprint.printer_connect
domain: octoprint
description: "Instructs the OctoPrint server to connect to a printer."
---

Use this action to tell your OctoPrint server to connect to a printer. You can let OctoPrint pick the connection settings automatically, or specify a printer profile, serial port, and baud rate.

This is handy in automations, for example to reconnect to your printer automatically after the server reboots, so it is ready to start a print without manual steps.

{% include actions/ui_header.md %}

To connect to a printer from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **OctoPrint: Connect to a printer**.
6. Select the **Server** that should connect. Optionally, set a profile name, serial port, and baud rate.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Server:
  description: The OctoPrint server that should connect to the printer.
  required: true
Profile name:
  description: The printer profile to connect with.
  required: false
Serial port:
  description: The port name to connect on.
  required: false
Baudrate:
  description: The baud rate to connect with.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `octoprint.printer_connect`. A basic example looks like this:

{% example %}
action: |
  action: octoprint.printer_connect
  data:
    device_id: a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4
{% endexample %}

This tells the selected OctoPrint server to connect to its printer using the automatic connection settings.

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The OctoPrint server that should connect to the printer.
  required: true
  type: string
profile_name:
  description: >
    The printer profile to connect with.
  required: false
  type: string
port:
  description: >
    The serial port name to connect on.
  required: false
  type: string
baudrate:
  description: >
    The baud rate to connect with. One of 9600, 19200, 38400, 57600,
    115200, 230400, or 250000.
  required: false
  type: string
{% endoptions_yaml %}

## Good to know

- When you leave the profile name, serial port, and baud rate empty, OctoPrint uses its automatic connection settings.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: reconnect to the printer after the server reboots

When the OctoPrint server comes back online, tell it to connect to the printer so it is ready for the next print.

- **Trigger**: The OctoPrint server becomes available
- **Action**: OctoPrint: Connect to a printer

{% details "YAML example for reconnecting after a reboot" %}

{% example %}
automation: |
  alias: "Reconnect OctoPrint to the printer"
  triggers:
    - trigger: state
      entity_id: binary_sensor.octoprint_printing
      from: "unavailable"
  actions:
    - action: octoprint.printer_connect
      data:
        device_id: a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
