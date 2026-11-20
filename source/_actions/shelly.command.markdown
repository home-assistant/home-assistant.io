---
title: "Send command"
action: shelly.command
domain: shelly
description: "Sends a command to a Shelly device and returns the device's response."
since: "2026.12"
related_actions:
  - shelly.get_kvs_value
  - shelly.set_kvs_value
---

The **Send command** action sends a command directly to a Shelly device and returns the device's response. This is handy when you want to use a device feature that doesn't have its own {% term entity %} or action in Home Assistant, for example a timer that runs on the device, a device setting, or a list of the schedules stored on the device.

You provide the command and, when needed, its parameters. The commands are defined by the device, not by Home Assistant, and they depend on the [generation of your Shelly device](/integrations/shelly/#shelly-device-generations):

- **Generation 2 and later**: the command is the name of a method, for example `Switch.Set`. See the [Shelly API reference for generation 2 and later](https://shelly-api-docs.shelly.cloud/gen2/).
- **Generation 1**: the command is an HTTP endpoint, for example `relay/0`. See the [Shelly API reference for generation 1](https://shelly-api-docs.shelly.cloud/gen1/).

{% caution %}
Commands can change the configuration of your device, including settings that Home Assistant uses to reach it, such as Wi-Fi and authentication. Check the command in the Shelly API reference before you send it.
{% endcaution %}

{% include actions/ui_header.md %}

To send a command from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for **Send command** and select the one from Shelly.
6. Set **Device** to the Shelly device, and **Command** to the command you want to send.
7. If the command needs parameters, turn on **Parameters** and enter them as key-value pairs.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Device:
  description: The Shelly device to send the command to.
Command:
  description: The command to send. For generation 2 and later devices, this is the method name, for example Switch.Set. For generation 1 devices, this is the HTTP endpoint, for example relay/0.
Parameters:
  description: The parameters of the command, as one or more key-value pairs.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `shelly.command`. A basic example that turns on a switch and lets the device turn it off again after 30 seconds looks like this:

{% example %}
action: |
  action: shelly.command
  data:
    device_id: abcdef0123456789abcdef0123456789
    command: "Switch.Set"
    params:
      id: 0
      on: true
      toggle_after: 30
{% endexample %}

The timer runs on the device, so the switch also turns off when Home Assistant or your Wi-Fi network is not available.

### Options in YAML

{% options_yaml %}
device_id:
  description: The Shelly device to send the command to.
  required: true
  type: string
command:
  description: The command to send. For generation 2 and later devices, this is the method name, for example `Switch.Set`. For generation 1 devices, this is the HTTP endpoint, for example `relay/0`.
  required: true
  type: string
params:
  description: The parameters of the command, as one or more key-value pairs.
  required: false
  type: map
{% endoptions_yaml %}

## Response data

This action can return the response from the device, exactly as the device sent it. The contents depend on the command, so the fields vary from one command to another. If a command returns nothing, the response is empty.

Using the response is optional. To capture it, set a `response_variable` and use it in a later step. This example lists the Wi-Fi networks that the device can see, with their signal strength:

{% example %}
action: |
  action: shelly.command
  data:
    device_id: abcdef0123456789abcdef0123456789
    command: "WiFi.Scan"
  response_variable: result
{% endexample %}

## Commands for generation 1 devices

On generation 1 devices, the command is the HTTP endpoint and the parameters are sent as the query string of the request. This example turns off the status LED of the device:

{% example %}
action: |
  action: shelly.command
  data:
    device_id: abcdef0123456789abcdef0123456789
    command: "settings"
    params:
      led_status_disable: true
{% endexample %}

A leading slash in the command is accepted, so `/relay/0` and `relay/0` are the same command. Each parameter value must be text, a number, or a boolean. Nested values, such as a mapping or a list, are not supported on generation 1 devices.

## Good to know

- The available commands and their parameters are defined by the device, not by Home Assistant. A command that works on one Shelly model might not exist on another.
- On generation 2 and later devices, the parameters are passed to the device unchanged, so they can contain nested values.
- Only administrators can run this action directly. Automations and scripts that use it are not affected.
- Battery-powered devices that sleep most of the time are not supported. The action returns an error for these devices.
- Commands that would reset the device are not allowed, and Home Assistant doesn't send them: `Shelly.FactoryReset` and `Shelly.ResetWiFiConfig` on generation 2 and later devices, and `settings` with a `reset` parameter on generation 1 devices.
- When [debug logging](/docs/configuration/troubleshooting/#enabling-debug-logging) is turned on for the Shelly integration, the command, its parameters, and the response are written to the log. This includes sensitive parameters, such as a Wi-Fi password. Check your logs before you share them.

## Troubleshooting

If the action fails, the error message tells you why:

- **Command ... is not allowed for ...**: The command is one of the reset commands that Home Assistant doesn't send.
- **... is a sleeping device and does not support commands**: The device is battery-powered and sleeps most of the time, so Home Assistant can't reach it on demand.
- **Command parameters for ... must be text, number or boolean values**: A parameter for a generation 1 device contains a nested value.
- **Command ... failed for ... with error ...**: A generation 2 or later device rejected the command. The error code and the message come from the device and describe what is wrong, for example a missing parameter or an unknown method.
- **Command ... failed for ... with HTTP status ...**: A generation 1 device rejected the command. Status 404 means the endpoint doesn't exist on the device. Status 400 means a parameter is not valid.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: run a water pump for a fixed time

When you water the garden every morning, you can let the device switch the pump off by itself. Because the timer runs on the device, the pump stops after 10 minutes even when Home Assistant or your Wi-Fi network is not available.

- **Trigger**: Time
  - **At**: 06:00
- **Action**: Shelly: Send command
  - **Device**: Garden pump
  - **Command**: Switch.Set
  - **Parameters**: `id: 0`, `on: true`, `toggle_after: 600`

{% details "YAML example for running a water pump for a fixed time" %}

{% example %}
automation: |
  alias: "Run the garden pump for 10 minutes"
  triggers:
    - trigger: time
      at: "06:00:00"
  actions:
    - action: shelly.command
      data:
        device_id: abcdef0123456789abcdef0123456789
        command: "Switch.Set"
        params:
          id: 0
          on: true
          toggle_after: 600
{% endexample %}

{% enddetails %}

### Automation: use a shorter auto-off timer at night

When a Shelly switch turns the hallway light off automatically, you can change how long the light stays on. This automation sets the auto-off timer of the device to 2 minutes at the end of the day.

- **Trigger**: Time
  - **At**: 23:00
- **Action**: Shelly: Send command
  - **Device**: Hallway light
  - **Command**: Switch.SetConfig
  - **Parameters**: `id: 0`, and a `config` with `auto_off: true` and `auto_off_delay: 120`

{% details "YAML example for a shorter auto-off timer at night" %}

{% example %}
automation: |
  alias: "Shorten the hallway light auto-off timer at night"
  triggers:
    - trigger: time
      at: "23:00:00"
  actions:
    - action: shelly.command
      data:
        device_id: abcdef0123456789abcdef0123456789
        command: "Switch.SetConfig"
        params:
          id: 0
          config:
            auto_off: true
            auto_off_delay: 120
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
