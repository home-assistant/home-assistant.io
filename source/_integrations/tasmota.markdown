---
description: Instructions on how to integrate Tasmota with Home Assistant.
ha_release: '0.117'
ha_domain: tasmota
---

This {% term integration %} allows you to control [Tasmota](https://tasmota.github.io/docs/) devices over MQTT.

## Requirements

- MQTT broker and the [MQTT integration](/integrations/mqtt/) set up in Home Assistant.
- Tasmota devices' MQTT setting configured to communicate with the MQTT broker.
- Tasmota devices flashed with version 9.2, or later (`tasmota-lite.bin` does not support this integration).
- Tasmota devices configured for native discovery (`SetOption19 0`). Go to the web interface of your Tasmota device, select **Tools** and then **Console**. Where you can see the placeholder **Enter command** type or paste `SetOption19 0` and hit **Return**.
- Although the Tasmota integration supports custom fulltopic it is strongly suggested to leave fulltopic at its default, Tasmota does not prevent setting an invalid or non-unique fulltopic, for example a fulltopic without the `%prefix%` or `%topic%` tokens.
- The `Camera` functionality of tasmota32-webcam based devices is supported only when the Tasmota device and the Home Assistant server are on the same local network.

## Supported features

Tasmota Buttons, Fans, Lights, Relays, Sensors, Shutters, Switches and Cameras are supported.

- Tasmota Buttons will be added as Home Assistant `automation triggers` when `SetOption73` is enabled. No `binary_sensor` entity will be created. You can find the available `automation triggers` on the device screen. ![automation triggers](/images/integrations/tasmota/tasmota_button_automations.png)
- Tasmota Lights will be added as Home Assistant `light` entities. Single channel Dimmers, RGB lights, RGB lights with Color Temperature control and RGB lights with White control are supported.
- Tasmota Relays will be added as Home Assistant `switch` entities, if `SetOption30 0`. If `SetOption30 1`, relays will be added as `light` entities.
- Tasmota Sensors will be added as Home Assistant `sensor` entities.
- Tasmota Shutters will be added as Home Assistant `cover` entities. Currently only Shutter modes 1 to 4 are supported. Shutter mode 5 and Tuya shutters are not supported.
- Tasmota Switches will be added as either Home Assistant `binary_sensor` entities or `automation triggers` depending on the `switchmode` used when `SetOption114` is enabled.
- The fan functionality in Tasmota devices with module configured as `iFan02` or `iFan03` will be added as Home Assistant `fan` entities. Tuya fans are not supported.
- The camera functionality in ESP32 Tasmota devices with [tasmota32-webcam](https://templates.blakadder.com/ai-thinker_ESP32-CAM.html) firmware will be added as Home Assistant `Camera` entities. Note that this functionality is supported only when the Tasmota device and the Home Assistant server are on the same network.
- The integration will also create up to eight Status Sensors, each one with a different information. All the Status Sensors are [disabled by default](/docs/configuration/customizing-entities/#disabling-or-enabling-an-entity).
  ![iot](/images/integrations/tasmota/tasmota_status_sensors.png)
- The integration adds an `update` entity for each Tasmota device. The entity reports the Tasmota firmware version installed on the device and whether a newer Tasmota release is available. When an update is offered, you can review the release notes. New releases are checked daily. For official Tasmota release builds, the release can be installed from Home Assistant, see [Firmware updates](#firmware-updates).

{% include integrations/config_flow.md %}

You must also configure each Tasmota device's MQTT settings to communicate with whatever MQTT broker you are using. Enter the broker address under host, and enter a username/password combination that allows access to the broker.

If you are using the Home Assistant Mosquitto Broker app, first create a new Home Assistant user under {% my users title="Settings > People" %}. Then, in **Tasmota** > **Configure MQTT** under "Host" enter the address of your Home Assistant instance and under "User" and "Password" enter the Home Assistant user you just created.

## Firmware updates

On devices that run an official Tasmota release build, version 14.0.0 or later, you can install the latest Tasmota release from the device's firmware update entity. The device downloads the release image for its own build variant, for example `tasmota32c3` or `tasmota-DE`, directly from `ota.tasmota.com` and restarts. The update is complete when the device reports the new version.

- The device needs access to `ota.tasmota.com`.
- Before the update starts, the device's OTA URL is reset to the default of its firmware with `OtaUrl 1`. If the update does not complete, the previous OTA URL is restored.
- Installing is not offered for self-built firmware, development builds, `tasmota-minimal` and `safeboot` images, firmware older than 14.0.0, and devices using deep sleep. Official releases older than 14.0.0 cannot be told apart from self-built firmware. Update these devices through their Tasmota web interface.
- Installing is refused while several devices share the same MQTT topic, or when the device uses the Tasmota default group topic `tasmotas` as its topic, because all of these devices would receive the update command.
- The update fails if the device reports an error, restarts with the same version, or does not report a new version within 10 minutes.
