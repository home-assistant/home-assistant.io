---
title: VIZIO SmartCast
description: Instructions on how to integrate VIZIO SmartCast TVs and sound bars into Home Assistant.
ha_category:
  - Media player
ha_release: 0.49
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@raman325'
ha_domain: vizio
ha_zeroconf: true
ha_platforms:
  - media_player
ha_integration_type: device
---

The **VIZIO SmartCast** {% term integration %} allows you to control [SmartCast](https://www.vizio.com/smartcast-app)-compatible TVs and sound bars (2016+ models).

## Find your device

If `zeroconf` discovery is enabled, your device will get discovered automatically. To discover your device manually, read the subsections below.

### Install `pyvizio` locally

{% note %}
If the `pip3` command is not found, try `pip` instead
{% endnote %}

- To install, run `pip3 install pyvizio` in your terminal.
- If `pyvizio` is already installed locally, make sure you are using the latest version by running `pip3 install --upgrade pyvizio` in your terminal.

### Discover devices

Find your device using the following command:

```bash
pyvizio --ip=0 discover
```

Write down its IP address and port number. If you have trouble finding a device you were expecting to, you can try increasing the discovery timeout period by adding the `--timeout` option (e.g., `pyvizio --ip=0 discover --timeout=10`).

## Pairing

This {% term integration %} requires an access token in order to communicate with TVs (speakers do not need an access token). An access token can be obtained by going through a pairing process, either manually, or through the Home Assistant frontend.

### Pair using the Home Assistant frontend

 - **Using `configuration.yaml`:** If you have a `vizio` entry in `configuration.yaml` but don't provide an access token value in your configuration, after you initialize Home Assistant, you will see a VIZIO SmartCast device ready to be configured. When you open the configuration window, you will be guided through the pairing process. While Home Assistant will store the access token for the life of your `vizio` {% term entity %}, it is a good idea to note the access token value displayed in the window and add it to your `configuration.yaml`. This will ensure that you will not have to go through the pairing process again in the future if you decide to rebuild your Home Assistant instance.
- **Using discovery or manual setup through the Integrations menu:** To initiate the pairing process, submit your initial configuration with an empty Access Token value.

### Pair manually using the CLI

The following script, written by [JeffLIrion](https://github.com/JeffLIrion) can be run to obtain an auth token. You will need to replace `<IP>` with your IP and `<PORT>` (which is typically 7345 or 9000).

```bash
#!/bin/bash

VIZIO_IP="<IP>"
VIZIO_PORT="<PORT>"

curl -k -H "Content-Type: application/json" -X PUT -d '{"DEVICE_ID":"pyvizio","DEVICE_NAME":"Python Vizio"}' https://${VIZIO_IP}:${VIZIO_PORT}/pairing/start

read -p "PIN:  " VIZIO_PIN
read -p "PAIRING_REQ_TOKEN:  " VIZIO_PAIRING_REQ_TOKEN

curl -k -H "Content-Type: application/json" -X PUT -d '{"DEVICE_ID": "pyvizio","CHALLENGE_TYPE": 1,"RESPONSE_VALUE": "'"${VIZIO_PIN}"'","PAIRING_REQ_TOKEN": '"${VIZIO_PAIRING_REQ_TOKEN}"'}' https://${VIZIO_IP}:${VIZIO_PORT}/pairing/pair
```

### Pair manually using `pyvizio`

To obtain an auth token manually, follow these steps:

Make sure that your device is on before continuing.

| Parameter     | Description                                                             |
| :------------ | :---------------------------------------------------------------------- |
| `ip`          | `IP Address:Port` (obtained from the previous section)                  |
| `device_type` | The type of device you are connecting to. Options are `tv` or `speaker` |

Enter the following command to initiate pairing:

```bash
pyvizio --ip={ip:port} --device_type={device_type} pair
```

Initiation will show you two different values:

| Value           | Description                                                                                             |
| :-------------- | :------------------------------------------------------------------------------------------------------ |
| Challenge type  | Usually, it should be `"1"`.                                                                            |
| Challenge token | Token required to finalize pairing in the next step                                                     |

At this point, a PIN code should be displayed at the top of your TV. With all these values, you can now finish pairing:

```bash
pyvizio --ip={ip:port} --device_type={device_type} pair-finish --token={challenge_token} --pin={pin} --ch_type={challenge_type}
```

You will need the authentication token returned by this command to configure Home Assistant.

## Configuration

To add your VIZIO TV to your installation, add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
vizio:
  - host: "DEVICE_IP:DEVICE_PORT"
    access_token: AUTH_TOKEN
```

{% configuration %}
host:
  description: "`IP Address:Port` for your device (port is optional but recommended)."
  required: true
  type: string
name:
  description: Nickname for your device that will be used to generate the device's entity ID. If multiple VIZIO devices are configured, the value must be unique for each entry.
  required: false
  type: string
  default: VIZIO SmartCast
access_token:
  description: Authentication token you received in the last step of the pairing process. This token is only needed if your device is a TV, and you can opt not to provide it in your configuration and instead go through the pairing process via the Home Assistant frontend.
  required: false
  type: string
device_class:
  description: The class of your device. Valid options are `tv` or `speaker`.
  required: false
  type: string
  default: "`tv`"
volume_step:
  description: The number of steps that the volume will be increased or decreased by at a time.
  required: false
  type: integer
  default: 1
apps:
  description: Use this section to define app specific settings (only applicable for VIZIO Smart TVs).
  required: false
  type: map
  keys:
    include:
      description: List of apps to include in the source list. Cannot be used in combination with `exclude`.
      required: exclusive
      type: list
    exclude:
      description: List of apps to exclude from the source list. Cannot be used in combination with `include`.
      required: exclusive
      type: list
    additional_configs:
      description: List of manually configured apps that aren't available in the default app list provided by the integration.
      required: false
      type: map
      keys:
        name:
          description: The name of the app that will be used in the source list and used to launch the app.
          required: true
          type: string
        config:
          description: The app configuration that will be used to detect and launch the app.
          required: true
          type: map
          keys:
            APP_ID:
              description: See [Obtaining an app configuration](#obtaining-an-app-configuration) section below.
              required: true
              type: string
            NAME_SPACE:
              description: See [Obtaining an app configuration](#obtaining-an-app-configuration) section below.
              required: true
              type: integer
            MESSAGE:
              description: See [Obtaining an app configuration](#obtaining-an-app-configuration) section below.
              required: false
              type: string
              default: null
{% endconfiguration %}

```yaml
# Complete configuration.yaml entry
vizio:
  - host: "DEVICE_IP:DEVICE_PORT"
    access_token: AUTH_TOKEN
    name: MY_VIZIO_DEVICE
    device_class: tv
    volume_step: 1
    apps:
      include:
        - APP_1
        - APP_2
      exclude:
        - APP_1
        - APP_2
      additional_configs:
        - name: MY_CUSTOM_APP
          config:
            APP_ID: 9
            NAME_SPACE: 9
            MESSAGE: MY_MESSAGE
```

### Obtaining an app configuration

If there is an app you want to be able to launch from Home Assistant that isn't detected by default, you will need to specify the app configuration in {% term "`configuration.yaml`" %}. This configuration can be obtained from the `app_id` state attribute when an unknown app is running on your device.

### Obtaining a list of valid apps to include or exclude

The list of apps that are provided by default is statically defined [here](https://github.com/vkorn/pyvizio/blob/master/pyvizio/const.py#L23). If you'd prefer a more concise list, you can either view the source list of a VIZIO Smart TV in the Home Assistant frontend, or run the following command (requires `pyvizio` to be installed locally):

```bash
pyvizio --ip=0 get-apps-list
```

## Action `vizio.update_setting`

This action allows you to update a setting on a given VIZIO device. You will need to know the type of setting and the name of the setting to perform this action. You can determine this by using the SmartCast app and going to device settings for your target device. The setting type is the lowercase version of the first menu item you'd select (e.g., display, audio, system), and the setting name is what you see in the app, but spaces are replaced with underscores and it is also all lowercase (e.g., AV delay would be called `av_delay`).

| Data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | ------- |
| `entity_id` | yes | The devices to update a setting for. | `media_player.vizio_smartcast`
| `setting_type` | no | The type of setting. | `audio`
| `setting_name` | no | The name of the setting. | `eq`
| `new_value` | no | The new value to set the setting to. | `Music`

## Notes and limitations

### Turning device on

If the `Power Mode` of your device is set to `Eco Mode`, turning the device on won't work.

### Changing tracks

Changing tracks works like switching channels. If the current input is anything other than regular TV, this command might not do anything.
