---
title: Tuya
description: Instructions on how to setup the Tuya hub within Home Assistant.
ha_category:
  - Hub
  - Climate
  - Cover
  - Fan
  - Light
  - Scene
  - Switch
ha_iot_class: Cloud Polling
ha_release: 0.74
ha_config_flow: true
ha_domain: tuya
ha_codeowners:
  - '@ollo69'
---

The `tuya` integration is the main integration to integrate [Tuya Smart](https://www.tuya.com) related platforms, except the Zigbee hub. You will need your Tuya account information (username, password and account country code) to discover and control devices which related to your account.

**Important**: Not all Tuya devices are supported by the `tuya API` used by this integration. For more details refer to [TuyaHA Library](https://github.com/PaulAnnekov/tuyaha).

There is currently support for the following device types within Home Assistant:

- **Climate** - The platform supports the air conditioner and heater.
- **Cover** - The platform supports curtains.
- **Fan** - The platform supports most kinds of Tuya fans.
- **Light** - The platform supports most kinds of Tuya light.
- **Scene** - The device state in frontend panel will not change immediately after you activate a scene.
- **Switch** - The platform supports switch and socket.

## Configuration via frontend

To add your Tuya devices into your Home Assistant installation, go to:

**Configuration** -> **Integrations** in the UI, click the button with `+` sign and from the list of integrations select **Tuya**.

During configuration, be careful to select the [country code](https://www.countrycode.org/) and the platform corresponding to those used by you in the app. Once configuration flow is completed, the devices configured in your app will be automatically discovered.

### Configuration via YAML

_YAML configuration is still around for people that prefer YAML, but it's deprecated and you should not use it anymore._

To add your Tuya devices into your Home Assistant installation, add the following to your `configuration.yaml` file:

```yaml
tuya:
  username: YOUR_TUYA_USERNAME
  password: YOUR_TUYA_PASSWORD
  country_code: YOUR_ACCOUNT_COUNTRYCODE
```

{% configuration %}
username:
  description: Your username to log in to Tuya. This may be your phone number which needs to be enquoted as this is a string.
  required: true
  type: string
password:
  description: Your password to log in to Tuya.
  required: true
  type: string
country_code:
  description: "Your account [country code](https://www.countrycode.org/), e.g., 1 for USA or 86 for China, again enquoted."
  required: true
  type: string
platform:
  description: "The app where your account register. `tuya` for Tuya Smart, `smart_life` for Smart Life, `jinvoo_smart` for Jinvoo Smart."
  required: false
  type: string
  default: tuya
{% endconfiguration %}

## Integration Options

It is possible to change various behaviors through the integration options, some common for integration and others specific to each `light` and `climate` devices. These can be changed at **Tuya** -> **Options** on the Integrations page.

### Common Options

- **Discovery device polling interval** (default=605): define the interval between 2 consecutive calls to the `API discovery method`, which is used to get the status for all registered devices with a single call. If you set interval value too low, Tuya API will return errors, so it is suggested to use the default value until
you know that it is possible to use lower values.

- **Query device polling interval** (default=120): this option is available only if you have devices that can use the `API query method`. 
It defines the interval between 2 consecutive calls to the `API query method`, that is used to get the status for a specific device. 
This method is always used when it is available only one device that can use it. If you set interval value too low, Tuya API will return errors 
so it is suggested to use the default value until you know that is possible to use lower values.

- **Device that will use the query method**: this option is available only if you have devices that can use the `API query method`. 
Because it is not possible to make multiple calls to the `API query method`. If you have more than one device that can use it you can choose which one will use. This will give a better status refresh for this specific device.

- **Device to configure (multi-select list)**: this option is available only if you have a `light` or `climate` device. Selecting a device to 
configure to options page related to the device will be opened. You can also select more than one devices to configure them simultaneously, 
but all selected devices must be of the same type.

### Light Options

- **Force color support**: when checked force `color support` for devices that do not report this feature.

- **Brightness range**: change the `brightness range` used for the device. Possible options are:
    - range 1-255 (default)
    - range 10-1000

- **Min color temperature**: set minimum `color temperature` expressed in `kelvin` accepted by the light.

- **Max color temperature**: set maximum `color temperature` expressed in `kelvin` accepted by the light.

- **Max color temperature reported**: set the maximum `color temperature` value reported by the light.

### Climate Options

- **Temperature unit**: change the `temperature unit` used internally by the devices.

- **Temperature values divider**: `all temperatures` reported by device will be divided by this value.

- **Current Temperature value divider**: `current temperature` reported by device will be divided by this value.

- **Min target temperature**: set the minimum allowed `target temperature` for the entity.

- **Max target temperature**: set the maximum allowed `target temperature` for the entity.

## Service

These services are available for the `tuya` component:

- force_update
- pull_devices

Devices state data and new devices will refresh automatically. If you want to refresh all devices information or get new devices related to your account manually, you can call the `force_update` or `pull_devices` service.
