---
title: Overkiz
description: Instructions on how to integrate hubs that use the Overkiz IoT platform with Home Assistant.
ha_category:
  - Alarm
  - Binary sensor
  - Button
  - Climate
  - Cover
  - Hub
  - Light
  - Lock
  - Number
  - Scene
  - Select
  - Sensor
  - Siren
  - Switch
  - Water heater
ha_release: 2022.2
ha_config_flow: true
ha_iot_class: Local Polling
ha_codeowners:
  - '@imicknl'
ha_domain: overkiz
ha_dhcp: true
ha_zeroconf: true
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - button
  - climate
  - cover
  - diagnostics
  - light
  - lock
  - number
  - scene
  - select
  - sensor
  - siren
  - switch
  - water_heater
ha_integration_type: hub
---

The Overkiz (by Somfy) IoT platform is used by many different vendors, like Somfy, Hitachi, and Atlantic. This integration will allow users to integrate their devices into Home Assistant using the Overkiz API.

## Supported hubs & devices

- Atlantic Cozytouch
- Bouygues Flexom
- Hitachi Hi Kumo
- Nexity Eugénie
- Sauter Cozytouch
- Simu LiveIn2
- Somfy Connectivity Kit
- Somfy Connexoon IO _(local API available)_
- Somfy Connexoon RTS _(local API available)_
- Somfy TaHoma v2 _(local API available)_
- Somfy TaHoma Beecon _(local API available)_
- Somfy TaHoma Switch _(local API available)_
- Thermor Cozytouch
- Ubiwizz

Over 6000 devices from 60 brands are compatible with the Overkiz platform. This integration will retrieve your devices and map them to the relevant Home Assistant platforms.

{% include integrations/config_flow.md %}

The Overkiz integration supports both the Overkiz cloud API and the local API (only supported by some Somfy hubs). For compatible Somfy hubs, you can connect locally, allowing device control without an internet connection. Start by selecting the server or app that you use to control your devices.

### Login to Overkiz (Cloud API)

{% configuration_basic %}
"Username":
  description: "Username for your Overkiz cloud account (account you use in your IoT app)."
Password:
  description: "Password for your Overkiz cloud account (account you use in your IoT app)."
{% endconfiguration_basic %}

### Login to Overkiz (Local API)

To use the local API, you will need to activate the [Somfy TaHoma Developer Mode](https://github.com/Somfy-Developer/Somfy-TaHoma-Developer-Mode?tab=readme-ov-file#getting-started) via the Somfy website. Activating this mode will enable a local API on your TaHoma box. Your cloud credentials are required to negotiate a token with the cloud API to authenticate your calls to the local API. This is a one-time setup and the token will be stored in your Home Assistant configuration.

Scenarios and climate entities are **not** supported via the Somfy TaHoma Developer Mode.

{% configuration_basic %}
"Host":
  description: "The hostname or IP address of your Overkiz hub. The hostname is your Gateway PIN + .local:8443 (e.g. 1234-4567-8912.local)."
"Username":
  description: "Username for your Overkiz cloud account (account you use in your IoT app)."
Password:
  description: "Password for your Overkiz cloud account (account you use in your IoT app)."
Verify SSL:
  description: "Verify the SSL certificate of your hub. This option is available only when connecting via the hostname."
{% endconfiguration_basic %}

## Data updates

This integration retrieves data from Overkiz every 30 seconds to ensure timely updates. If you only have stateless devices (RTS protocol), the integration will poll for new data every hour to reduce unnecessary load on the Overkiz API.

## Known limitations

### Zigbee, Z-Wave, Hue, and Sonos devices not supported

Even though most Overkiz hubs support adding Zigbee, Z-Wave, Hue, and Sonos devices, this isn't supported in the Overkiz integration. All these platforms have native integrations in Home Assistant, which provide more frequent state updates and are more feature-rich.

### Stateless RTS covers 

RTS covers do not report their state back to the hub, so Home Assistant cannot track their state after they are controlled. If you only control your RTS cover from Home Assistant, you can use the [template cover](/integrations/cover.template/) to create a stateful cover entity. This will help you track the current state (open or closed) and use the cover in automations and scenes.

```yaml
cover:
  - platform: template
    covers:
      stateful_rts_test_shutter: # unique ID
        friendly_name: "Stateful RTS Test Shutter" # your name
        optimistic: true # default when no state is available
        open_cover:
          - action: cover.open_cover
            target:
              entity_id: cover.rts_test_shutter # change to your device id
        close_cover:
          - action: cover.close_cover
            target:
              entity_id: cover.rts_test_shutter # change to your device id
        stop_cover:
          - action: cover.stop_cover
            target:
              entity_id: cover.rts_test_shutter # change to your device id
```

### Overkiz API limits

**Device state changes are not broadcasted for all devices**

Some Overkiz devices do not broadcast status changes. To update their status, the vendor's app (for example, Somfy TaHoma) requests a status update when opened. The app then broadcasts the states via events that the Overkiz integration also listens to. The Overkiz integration cannot replicate this behavior, as it does not know when you access the Home Assistant dashboard or run automations.

As a result, the state of some Overkiz devices in Home Assistant may not always be up-to-date.

**Server busy, please try again later. (Too many executions)**

During peak hours, it could happen that the Overkiz platform is unable to execute your command. The integration will try to retry this command, however, this is not guaranteed to succeed.

**Execution queue is full on gateway**

The Overkiz API only supports 10 requests in its execution queue. If you try to command more devices at the same time, for example with a group, this will fail with `EXEC_QUEUE_FULL`. To work around this, you can create a scenario in the corresponding application and call that scenario instead after syncing it in the integration.

### Device support via the local API

Various sensors, scenarios, and climate entities are **not** supported via the Somfy TaHoma Developer Mode due to limitations of the local API. If your device functions with the Cloud API but not with the Local API, this is an inherent limitation of the Local API and cannot be resolved.

### Device support via HomeKit

If your hub (e.g. Somfy Connectivity Kit) supports HomeKit, a sensor named **HomeKit Setup Code** will be added to Home Assistant. To configure the [HomeKit Controller](/integrations/homekit_controller/) integration for local control, follow these steps:

1. Locate the **HomeKit Setup Code** sensor in Home Assistant.
2. Retrieve the setup code value from the sensor.
3. Use this setup code to configure the [HomeKit Controller](/integrations/homekit_controller/) integration in Home Assistant.

Please note that only a [limited set of devices is supported via HomeKit](https://service.somfy.com/downloads/nl_v5/tahoma-homekitcompatibilitylist_eng.pdf).

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
