---
title: Vizio SmartCast
description: Instructions on how to integrate Vizio SmartCast TVs and sound bars into Home Assistant.
logo: vizio-smartcast.png
ha_category:
  - Media Player
ha_release: 0.49
ha_iot_class: Local Polling
ha_config_flow: true
ha_quality_scale: platinum
ha_codeowners:
  - '@raman325'
ha_quality_scale: platinum
---

The `vizio` integration allows you to control [SmartCast](https://www.vizio.com/smartcast-app)-compatible TVs and sound bars (2016+ models).

## Find your device

If `zeroconf` discovery is enabled, your device will get discovered automatically. To discover your device manually, read the subsections below.

### Install `pyvizio` locally

> NOTE: If the `pip3` command is not found, try `pip` instead

- To install, run `pip3 install pyvizio` in your terminal.
- If `pyvizio` is already installed locally, make sure you are using the latest version by running `pip3 install --upgrade pyvizio` in your terminal.

### Discover devices

Find your device using the following command:

```bash
pyvizio --ip=0 discover
```

Write down its IP address and port number. If you have trouble finding a device you were expecting to, you can try increasing the discovery timeout period by adding the `--timeout` option (e.g., `pyvizio --ip=0 discover --timeout=10`).

## Pairing

This integration requires an access token in order to communicate with TVs (speakers do not need an access token). An access token can be obtained by going through a pairing process, either manually, or through the HA frontend.

### Pair using the HA frontend

 - **Using `configuration.yaml`:** If you have a `vizio` entry in `configuration.yaml` but don't provide an access token value in your configuration, after you initialize HomeAssistant, you will see a Vizio SmartCast device ready to be configured. When you open the configuration window, you will be guided through the pairing process. While HA will store the access token for the life of your `vizio` entity, it is a good idea to note the access token value displayed in the window and add it to your `configuration.yaml`. This will ensure that you will not have to go through the pairing process again in the future if you decide to rebuild your HA instance.
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
$ pyvizio --ip={ip:port} --device_type={device_type} pair
```

Initiation will show you two different values:

| Value           | Description                                                                                             |
| :-------------- | :------------------------------------------------------------------------------------------------------ |
| Challenge type  | Usually, it should be `"1"`. If not, use the additional parameter `--ch_type=your_type` in the next step |
| Challenge token | Token required to finalize pairing in the next step                                                     |

At this point, a PIN code should be displayed at the top of your TV. With all these values, you can now finish pairing:

```bash
$ pyvizio --ip={ip:port} --device_type={device_type} pair-finish --token={challenge_token} --pin={pin}
```

You will need the authentication token returned by this command to configure Home Assistant.

## Configuration

To add your Vizio TV to your installation, add the following to your `configuration.yaml` file:

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
  description: Nickname for your device that will be used to generate the device's entity ID. If multiple Vizio devices are configured, the value must be unique for each entry.
  required: false
  type: string
  default: Vizio SmartCast
access_token:
  description: Authentication token you received in the last step of the pairing process. This token is only needed if your device is a TV, and you can opt not to provide it in your configuration and instead go through the pairing process via the HA frontend.
  required: false
  type: string
device_class:
  description: The class of your device. Valid options are `tv` or `speaker`
  required: false
  type: string
  default: tv
volume_step:
  description: The number of steps that the volume will be increased or decreased by at a time.
  required: false
  type: integer
  default: 1
{% endconfiguration %}

## Notes and limitations

### Turning device on

If the `Power Mode` of your device is set to `Eco Mode`, turning the device on won't work.

### Changing tracks

Changing tracks works like switching channels. If the current input is anything other than regular TV, this command might not do anything.

### Sources

The source list shows all external devices connected to the Vizio device through HDMI, plus a list of internal devices (TV mode, Chromecast, etc.)
