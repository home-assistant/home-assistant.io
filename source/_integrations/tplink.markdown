---
title: TP-Link Smart Home
description: Instructions on integrating TP-Link Smart Home Devices to Home Assistant.
ha_category:
  - Binary sensor
  - Button
  - Camera
  - Climate
  - Fan
  - Hub
  - Light
  - Number
  - Select
  - Sensor
  - Siren
  - Switch
  - Vacuum
ha_release: 0.89
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@rytilahti'
  - '@bdraco'
  - '@sdb9696'
ha_domain: tplink
ha_platforms:
  - binary_sensor
  - button
  - camera
  - climate
  - diagnostics
  - fan
  - light
  - number
  - select
  - sensor
  - siren
  - switch
  - vacuum
ha_dhcp: true
ha_integration_type: integration
ha_quality_scale: platinum
---

The `tplink` integration allows you to control your [TP-Link Kasa Smart Home Devices](https://www.tp-link.com/kasa-smart/) and [TP-Link Tapo Devices](https://www.tapo.com/) such as cameras, doorbells, chimes, lights, plugs, wall switches, robot vacuums, hubs, and hub-attached devices.

## How you can use this integration

The TP-Link integration lets you do many things, such as switching devices on and off based on schedules or events, monitoring energy usage in the Home Assistant dashboards, viewing live camera feeds, and controlling device configurations manually or via automations.

## Prerequisites

You need to provision your newly purchased device to connect to your network before it can be added via the integration. This can be done either by using [kasa command-line tool](https://python-kasa.readthedocs.io/en/latest/cli.html#provisioning) or by adding it to the official Kasa or Tapo app before trying to add them to Home Assistant. Some apps for TP-Link's other products, such as the Deco app, also allow you to add Kasa and Tapo devices. Since these devices use the same TP-Link Cloud Account for authorization, they work with this integration as well.

If your device is a newer Kasa or Tapo device it will require your TP-Link cloud username and password to authenticate for local access.
If you have an older device that does not currently require authentication, you may consider disabling automatic firmware updates to keep it that way.

{% include integrations/config_flow.md %}

{% configuration_basic %}

Host:
  description: |
    Hostname or IP address of your TP-Link device.
Username:
  description: |
    Your TP-Link cloud username which is your *case-sensitive* email address. Required for Tapo and newer Kasa devices.
Password:
  description: |
    Your TP-Link cloud password. Required for Tapo and newer Kasa devices.
Live view:
  description: |
    Checkbox to enable live view will create the live view camera entity for Tapo cameras. Requires your camera account credentials which you set up from the Tapo app under **Device Settings** > **Advanced Settings** > **Camera Account**.
Camera account username:
  description: |
    Your camera account username as configured in the Tapo app.
Camera account password:
  description: |
    Your camera account password configured for the device in the Tapo app.

{% endconfiguration_basic %}

## Supported Devices

See [Supported Devices in python-kasa](https://python-kasa.readthedocs.io/en/stable/SUPPORTED.html) for an up to date list that includes hardware and firmware versions.

Devices not listed below may work but if you encounter issues submit a bug report to [python-kasa](https://github.com/python-kasa/python-kasa).

{% note %}
The hub attached Tapo buttons S200B and S200D, which do not currently support alerting when the button is pressed.
{% endnote %}

{% note %}
Some firmware versions of Tapo Cameras will not authenticate unless you enable **Tapo Lab** > **Third-Party Compatibility** in the native Tapo app.
Alternatively, you can factory reset and then prevent the device from accessing the internet.
{% endnote %}

### Supported Kasa devices

- **Plugs**: EP10, EP25[^1], HS100[^2], HS103, HS105, HS110, KP100, KP105, KP115, KP125, KP125M[^1], KP401
- **Power Strips**: EP40, EP40M[^1], HS107, HS300, KP200, KP303, KP400
- **Wall Switches**: ES20M, HS200[^2], HS210, HS220[^2], KP405, KS200, KS200M, KS205[^1], KS220, KS220M, KS225[^1], KS230, KS240[^1]
- **Bulbs**: KL110, KL120, KL125, KL130, KL135, KL50, KL60, LB110
- **Light Strips**: KL400L5, KL420L5, KL430
- **Hubs**: KH100[^1]
- **Hub-Connected Devices[^3]**: KE100[^1]

### Supported Tapo[^1] devices

- **Plugs**: P100, P110, P110M, P115, P125M, P135, TP15
- **Power Strips**: P210M, P300, P304M, P306, TP25
- **Wall Switches**: S210, S220, S500D, S505, S505D
- **Bulbs**: L510B, L510E, L530E, L630
- **Light Strips**: L900-10, L900-5, L920-5, L930-5
- **Cameras**: C100, C210, C220, C225, C325WB, C520WS, C720, TC65, TC70
- **Doorbells and chimes**: D100C, D130, D230
- **Vacuums**: RV20 Max Plus, RV30 Max
- **Hubs**: H100, H200
- **Hub-Connected Devices[^3]**: S200B, S200D, T100, T110, T300, T310, T315

[^1]: Model requires authentication
[^2]: Newer versions require authentication
[^3]: Devices may work across TAPO/KASA branded hubs


## Supported functionality

### Cameras, doorbells and chimes

Only Tapo cameras, doorbells, and chimes are currently supported.
In order for live view to work on devices that support it, you will need to enable your camera account in the Tapo App under **Device Settings** > **Advanced Settings** > **Camera Account**.
If you do not want to do this, keep **Live view** unchecked when adding the device. This can be changed at a later date using the `reconfigure` option on the integration entry.

Depending on the supported features of the camera, you can control various settings such as privacy mode, pan/tilt, and motion detection alerts.

### Lights

Light entities are added for bulbs, light strips, and dimmer switches. 
Depending on the supported features of the device, the integration will allow changing brightness, color, color temperature, and light effects.

If light effects are supported by a device, they can be selected from the bottom of the light card.
Light presets are also supported and can be set via the config preset drop down on the device page.

Depending on the supported features of the device you can control various other configuration settings such as on/off transitions and auto-on/off.

### Plugs and switches

Switch entities are added for plugs, simple wall switches and power strips. In addition to turning devices on and off, you can control the various configuration options that the device supports, such as auto-on/off and automatic firmware updates.

### Robot vacuums

Vacuum entities are added for robot vacuums. In addition to starting and pausing devices, you can call them home, locate them, and control the various configuration options such as fan speed.

### Energy monitoring

If a device supports energy monitoring sensors will be created for consumption metrics which can be fed into the Home Assistant energy dashboard.

### Hub-attached devices

Various hub attached devices are supported such as those providing climate control, motion detection, humidity monitoring and water leak detection.


## Data updates

Devices are polled for data updates every 5 seconds. When you make changes through Home Assistant (e.g., switching a device on), the device's state is updated immediately rather than waiting for the next poll.
The integration connects locally to the devices without going via the TP-Link cloud. This is different from the native Tapo and Kasa apps which will connect to the devices via the TP-Link cloud if the device has access to the internet.

## Known limitations

### Camera connections

Some firmware versions of Tapo Cameras will not authenticate unless you enable **Tapo Lab** > **Third-Party Compatibility** in the native Tapo app.
Alternatively, you can factory reset and then prevent the device from accessing the internet.

### Subnets and discovery

If devices are on a different subnet to Home Assistant, automatic discovery will not work.
In this instance it is recommended to add devices by IP address and configure them with static IP addresses to prevent issues when IP addresses change.

### Buttons

The hub-attached Tapo buttons S200B and S200D, do not currently support alerting when the button is pressed.

### Hub-attached cameras

Hub attached cameras will be supported in the future. Due to battery considerations they do not support live view.

### No light effects on kasa bulbs

Light effects are currently not supported on Kasa bulbs.

### Kasa power strips

Due to limitations of the devices, the energy monitoring state of Kasa power strip child plugs is only updated every 60 seconds.

If required, you can manually trigger an update via **Developer tools** > **Actions** > **Home Assistant Core Integration: Update entity** passing a list of the child entities.

## Troubleshooting

### Device connections

- Take note of the known limitation for subnets above.
- Ensure that your username is your TP-Link cloud username, which is your *case-sensitive* email address.
- Ensure you have enabled **Tapo Lab** > **Third-Party Compatibility** in the Tapo app. You may need to factory reset and re-add to the Tapo app after this step.
- Disable or remove any custom integrations that interact with TPLink devices supported by this integration.
- Ensure stable network connectivity between Home Assistant and the device.
- Check the [reported connection solutions](#reported-connection-solutions) section below.
- Check the [supported device list](#supported-devices) to see if the device is tested to work with the integration. 
- Try running the [kasa tool](https://github.com/python-kasa/python-kasa) to connect to the device. An easy way to do this is to [install uv](https://docs.astral.sh/uv/getting-started/installation/) and run `uvx --from python-kasa kasa --username <tplink cloud username> --password <tplink cloud password>`
- Raise a support issue.  See the [section below](#raising-support-issues) for guidelines.

#### Reported connection solutions

These are some of the solutions that Home Assistant users have reported as solving their device connection issues:

- Make the first letter of your TP-Link cloud username email upper-case. This could be because it was automatically capitalized when first entered into the Tapo app.
- Remove the device from the Tapo app and re-add by searching for the correct model (i.e. do not use auto-discovery)
- Log out of the Tapo and Kasa apps, factory reset the device, log back in to the Tapo app, then re-add the device to the Tapo app.
- Specifically for cameras, disable and re-enable the **Settings** > **Advanced Settings** > **Camera account** options in the Tapo app.
- Specifically for cameras, reset the **Settings** > **Advanced Settings** > **Camera account** credentials in the Tapo app.

### Unavailable entities

Some entities might be showing as Unavailable if they have been removed from the integration.

#### Total consumption sensor

This entity is only reported by older kasa devices.
Currently, Tapo devices and newer Kasa devices do not report total consumption, although briefly during 2024.6, they incorrectly reported today's consumption as "total consumption." You can safely delete this entity if it is reported as unavailable on a newer Kasa or Tapo device.

#### Update available sensor

This entity has been removed from the integration due to stability issues, calling the TPLink cloud API to check for updates. It will be replaced in a future release with a new Update entity, but if you have an Unavailable entity ID starting with `binary_sensor.` and ending with `update`, you can safely delete it.

### Raising support issues

For the maintainers of the TP-Link integration to be able to properly assist with a support issue, please follow these guidelines:

- Raise an issue with [Home Assistant Core](https://github.com/home-assistant/core/issues).
- Fill in as many of the fields in the issue template as you can.
- If applicable, list all steps taken from the [Troubleshooting device connections](#device-connections) section above.
- Upload [debug logs](#enable-debug-logging) that run from Home Assistant first starting up, until the error is encountered.

### Enable debug logging

To capture debug logs from Home Assistant first starting up, update [`configuration.yaml`](https://www.home-assistant.io/docs/configuration/) to look like this:

```yaml
logger:
  default: warning  # This will already be present. Add the lines below.
  logs:
    homeassistant.components.tplink: debug
    kasa: debug
```

Then restart Home Assistant, trigger the error, and download the logs from **Settings** > **System** > **Logs** > **Download logs**

{% note %}
Remember to disable debug logging after troubleshooting to prevent excessive log growth and performance impact.
{% endnote %}

## Examples

### Automation ideas 

- Turn on lights when it gets dark and turn them off again with a voice command.
- Turn off privacy mode and turn on motion detection for internal cameras when you leave home (with geofencing) and toggle back when you get home.

### Light effect services

There are two services for light effects that can be used in automations.

These are available on devices that support light effects such as bulbs and light strips, except for [kasa bulbs](#no-light-effects-on-kasa-bulbs)

#### Random Effect - Action `tplink.random_effect`

Light strips allow setting a random effect.

| Data attribute | Description |
| ---------------------- | ----------- |
| `entity_id` | The entity_id of the light strip to set the effect on |
| `init_states` | Initial HSV sequence |
| `backgrounds` | List of HSV sequences (Max 16) |
| `segments` | List of segments (0 for all) |
| `brightness` | Initial brightness |
| `duration` | Duration |
| `transition` | Transition |
| `fadeoff` | Fade off |
| `hue_range` | Range of hue |
| `saturation_range` | Range of saturation |
| `brightness_range` | Range of brightness |
| `transition_range` | Range of transition |
| `random_seed` | Random seed |

```yaml
#Example action
action: tplink.random_effect
target:
  entity_id:
    - light.strip
data:
  init_states: 199,99,96
  backgrounds:
    - - 199
      - 89
      - 50
    - - 160
      - 50
      - 50
    - - 180
      - 100
      - 50
  segments: 0, 2, 4, 6, 8
  brightness: 90
  transition: 2000
  fadeoff: 2000
  hue_range: 340, 360
  saturation_range: 40, 95
  brightness_range: 90, 100
  transition_range: 2000, 6000
  random_seed: 80
```

#### Sequence Effect - Action `tplink.sequence_effect`

Light strips allow setting a sequence effect.

| Data attribute | Description |
| ---------------------- | ----------- |
| `entity_id` | The entity_id of the light strip to set the effect on |
| `sequence` | List of HSV sequences (Max 16) |
| `segments` | List of segments (0 for all) |
| `brightness` | Initial brightness |
| `duration` | Duration |
| `repeat_times` | Repetitions (0 for continuous) |
| `transition` | Transition |
| `spread` | Speed of spread |
| `direction` | Direction |

```yaml
#Example action
action: tplink.sequence_effect
target:
  entity_id:
    - light.strip
data:
  sequence:
    - - 340
      - 20
      - 50
    - - 20
      - 50
      - 50
    - - 0
      - 100
      - 50
  segments: 0, 2, 4, 6, 8
  brightness: 80
  transition: 2000
  spread: 1
  direction: 1
```

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
