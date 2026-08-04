---
title: VIZIO SmartCast
description: Instructions on how to integrate VIZIO SmartCast TVs and sound bars into Home Assistant.
ha_category:
  - Media player
  - Remote
ha_release: 0.49
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@raman325'
ha_domain: vizio
ha_zeroconf: true
ha_platforms:
  - media_player
  - remote
ha_integration_type: device
---

The **VIZIO SmartCast** {% term integration %} allows you to control [SmartCast](https://www.vizio.com/smartcast-app)-compatible TVs and sound bars (2016+ models).

## Find your device

If `zeroconf` discovery is enabled, your device will get discovered automatically. To discover your device manually, read the subsections below.

### Install `vizaio` locally

{% note %}
If the `pip3` command is not found, try `pip` instead
{% endnote %}

- To install, run `pip3 install 'vizaio[cli]'` in your terminal.
- If `vizaio` is already installed locally, make sure you are using the latest version by running `pip3 install --upgrade 'vizaio[cli]'` in your terminal.

### Discover devices

Find your device using the following command:

```bash
vizaio discover
```

Write down its IP address and port number. If you have trouble finding a device you were expecting to, you can try increasing the discovery timeout period by adding the `--timeout` option (for example `vizaio discover --timeout 10`).

## Pairing

This {% term integration %} requires an access token to communicate with TVs (speakers do not need an access token). An access token can be obtained by going through a pairing process, either manually, or through the Home Assistant frontend.

### Pair using the Home Assistant frontend

 - **Using `configuration.yaml`:** If you have a `vizio` entry in `configuration.yaml` but don't provide an access token value in your configuration, after you initialize Home Assistant, you will see a VIZIO SmartCast device ready to be configured. When you open the configuration window, you will be guided through the pairing process. While Home Assistant will store the access token for the life of your `vizio` {% term entity %}, it is a good idea to note the access token value displayed in the window and add it to your `configuration.yaml`. This will ensure that you will not have to go through the pairing process again in the future if you decide to rebuild your Home Assistant instance.
- **Using discovery or manual setup through the Integrations menu:** To initiate the pairing process, submit your initial configuration with an empty Access Token value.

### Pair manually using `vizaio`

To obtain an auth token manually, make sure that your device is on, then run the interactive pairing command (replace `DEVICE_IP:DEVICE_PORT` with the address obtained in the previous section):

```bash
vizaio pair interactive DEVICE_IP:DEVICE_PORT
```

A PIN code will be displayed at the top of your TV. Enter it when prompted. For scripted use, `vizaio pair begin DEVICE_IP:DEVICE_PORT` starts pairing and prints the matching `vizaio pair complete` command with everything filled in except the PIN.

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

The list of apps is fetched daily from VIZIO's app catalog (with a copy bundled in the [vizaio](https://github.com/raman325/vizaio) library as a fallback). To see the names you can include or exclude, check the `source_list` attribute of your TV's media player entity under {% my developer_states title="**Settings** > **Tools** > **States**" %}.

{% include integrations/actions.md %}

## Remote

The VIZIO SmartCast integration automatically creates a remote entity for each configured device (TVs and speakers). You can use it to send remote control commands via the `remote.send_command` action. Commands are case-insensitive. You can use either the native key name (for example, `vol_up`) or a human-friendly alias (for example, `volume_up`).

### Available commands

#### TV commands

| Command | Additional aliases | Description |
| :------ | :------ | :------ |
| `back` | | Go back to the previous screen |
| `ch_down` | `channel_down` | Channel down |
| `ch_prev` | `previous_channel` | Jump to the previously watched channel |
| `ch_up` | `channel_up` | Channel up |
| `down` | | Navigate down |
| `exit` | | Exit the current menu |
| `guide` | | Open the channel guide |
| `info` | | Show information about the current channel or input |
| `input_next` | `next_input` | Cycle to the next input |
| `left` | | Navigate left |
| `menu` | | Open the on-screen menu |
| `mute_off` | | Unmute the audio |
| `mute_on` | | Mute the audio |
| `mute_toggle` | `mute`, `toggle_mute` | Toggle mute |
| `num_0` through `num_9` | | Enter a channel digit (models without a tuner reject these) |
| `ok` | `enter`, `select` | Confirm the current selection |
| `pause` | | Pause playback |
| `play` | | Resume playback |
| `pow_off` | `off`, `power_off` | Turn the device off |
| `pow_on` | `on`, `power_on` | Turn the device on |
| `pow_toggle` | `power`, `power_toggle`, `toggle_power` | Toggle the power state |
| `right` | | Navigate right |
| `seek_back` | `reverse`, `rewind` | Rewind playback |
| `seek_fwd` | `forward`, `fast_forward`, `ff` | Fast-forward playback |
| `smartcast` | | Open the SmartCast Home screen |
| `up` | | Navigate up |
| `vol_down` | `volume_down` | Volume down |
| `vol_up` | `volume_up` | Volume up |

#### Speaker commands

Speakers support a subset of the commands above:

`input_next`, `mute_off`, `mute_on`, `mute_toggle`, `pause`, `play`, `pow_off`, `pow_on`, `pow_toggle`, `vol_down`, `vol_up`

Aliases that map to these commands (for example, `mute`, `volume_up`, `on`, `off`) also work on speakers.

### Examples

Send a single command:

```yaml
action: remote.send_command
target:
  entity_id: remote.vizio_smartcast
data:
  command:
    - enter
```

Send multiple commands:

```yaml
action: remote.send_command
target:
  entity_id: remote.vizio_smartcast
data:
  command:
    - down
    - down
    - enter
```

Repeat a command with a delay between each repeat:

```yaml
action: remote.send_command
target:
  entity_id: remote.vizio_smartcast
data:
  command:
    - volume_up
  num_repeats: 5
  delay_secs: 0.4
```

## Notes and limitations

### Turning device on

If the `Power Mode` of your device is set to `Eco Mode`, turning the device on won't work.

### Changing tracks

Changing tracks works like switching channels. If the current input is anything other than regular TV, this command might not do anything.
