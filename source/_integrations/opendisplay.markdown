---
title: OpenDisplay
description: Instructions on how to integrate OpenDisplay e-paper displays into Home Assistant.
ha_category:
  - Binary sensor
  - DIY
  - Event
ha_bluetooth: true
ha_release: 2026.4
ha_iot_class: Local Push
ha_codeowners:
  - '@g4bri3lDev'
ha_domain: opendisplay
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - diagnostics
  - event
  - sensor
ha_integration_type: device
ha_quality_scale: platinum
related:
  - docs: /integrations/bluetooth/
    title: Bluetooth integration
  - url: https://opendisplay.org/
    title: OpenDisplay project
---

The **OpenDisplay** {% term integration %} lets you use [OpenDisplay](https://opendisplay.org/) e-paper displays with Home Assistant over Bluetooth Low Energy.

## Use cases

With the OpenDisplay integration, you can:

- Show a calendar, weather overview, or dashboard snapshot on an e-paper display, updated on a schedule. Because e-paper screens only draw power when the image changes, battery-powered displays can run for a long time between charges.
- Create a digital art frame that shows a new artwork or photo from your media library every day.
- Use the physical buttons on OpenDisplay Flex devices to trigger any Home Assistant automation.

## Supported devices

Any device running the [OpenDisplay firmware](https://opendisplay.org/firmware/install/).
For a full list of supported boards and displays, see the [OpenDisplay hardware compatibility page](https://opendisplay.org/firmware/seeed_display_compatibility.html).

## Unsupported devices

- Displays with 40-pin or 60-pin connectors (for example, 10.3" monochrome panels) are not supported due to connector incompatibility.
- Shelly Bluetooth proxies do not support active BLE connections and cannot be used to upload images.

## Prerequisites

- A working [Bluetooth](/integrations/bluetooth) setup that supports active connections:
  - **Built-in adapter**: Supported
  - **ESPHome Bluetooth proxy**: Supported (firmware 2022.9.3 or later)
  - **Shelly Bluetooth proxy**: Not supported
- An OpenDisplay device powered on and within Bluetooth range.

{% include integrations/config_flow.md %}

Once the [Bluetooth](/integrations/bluetooth) integration is active, OpenDisplay devices are discovered automatically.

### Encryption

OpenDisplay devices can be configured to require AES-128 encryption for all Bluetooth Low Energy communication.

If your device has encryption enabled, the setup flow will ask for a _32-character hexadecimal encryption key_ after the initial connection attempt. The key is shown on the display when the device boots.

{% tip %}
To avoid typing the key manually, scan the QR code on your device's display. The encryption key is shown on the page that opens, tap it to copy it to your clipboard, then paste it into Home Assistant.
{% endtip %}

If the encryption key changes after the device has been set up, Home Assistant will prompt you to re-enter the key.

## Supported functionality

The **OpenDisplay** integration provides the following entities.

### Binary sensors

- **Connectivity**
  - **Description**: Indicates whether Bluetooth advertisements from the device are currently being received. It only reflects that the device is in range and broadcasting — it does not mean an active connection is open or that the device is ready to receive commands.
  - **Available for devices**: all
  - **Remarks**: This is a diagnostic entity.

### Events

- **Button** (one {% term event %} {% term entity %} per configured physical button)
  - **Description**: Fires a `button_down` event when the button is pressed and a `button_up` event when it is released.
  - **Available for devices**: OpenDisplay Flex devices with configured physical inputs.
  - **Remarks**: Events are detected by comparing consecutive BLE advertisements, so no active Bluetooth connection is needed. A very fast press-and-release between two advertisements may not be observed.

### Sensors

- **Battery**
  - **Description**: Estimated battery charge percentage, calculated from the measured battery voltage.
  - **Available for devices**: devices running in battery or solar power mode.
  - **Remarks**: This is a diagnostic entity.

- **Battery voltage**
  - **Description**: The measured voltage of the attached battery, in millivolts.
  - **Available for devices**: devices running in battery or solar power mode.
  - **Remarks**: This is a diagnostic entity and is disabled by default. You can enable it from the entity settings if needed.

- **Temperature**
  - **Description**: The internal chip temperature of the device.
  - **Available for devices**: all
  - **Remarks**: This is a diagnostic entity and is disabled by default. You can enable it from the entity settings if needed.

{% include integrations/actions.md %}

## OpenDisplay automation examples

Here are a few ideas to get you started.

{% include docs/paste_yaml_tip.md %}

### Automation: Show an image when a button is pressed

Use a physical button on an OpenDisplay Flex device to put a specific image on the display, for example to switch a room sign to "Do not disturb".

- **Trigger**: Event entity: `button_down`
- **Action**: OpenDisplay: Upload image
  - **Device**: Your OpenDisplay device
  - **Image**: The image to show

{% details "YAML example for showing an image on button press" %}

{% example %}
automation: |
  alias: "Show do-not-disturb sign on button press"
  triggers:
    - trigger: state
      entity_id: event.opendisplay_1234_button_1
      attribute: event_type
      to: button_down
  actions:
    - action: opendisplay.upload_image
      data:
        device_id: "your_device_id"
        image:
          media_content_id: "media-source://media_source/local/do_not_disturb.png"
          media_content_type: "image/png"
{% endexample %}

{% enddetails %}

### Automation: Turn on a light when a button is pressed

The buttons on an OpenDisplay Flex device can trigger any Home Assistant automation, for example turning on a light.

- **Trigger**: Event entity: `button_down`
- **Action**: Turn on light

{% details "YAML example for turning on a light on button press" %}

{% example %}
automation: |
  alias: "Turn on a light on button press"
  triggers:
    - trigger: state
      entity_id: event.opendisplay_1234_button_1
      attribute: event_type
      to: button_down
  actions:
    - action: light.turn_on
      target:
        entity_id: light.my_light
{% endexample %}

{% enddetails %}

## Data updates

The **OpenDisplay** integration receives all state updates passively from the Bluetooth Low Energy advertisements that the device broadcasts. The device is not {% term polling polled %} and there is no configurable update interval — sensors, button events, and the connectivity status update as soon as a new advertisement is received.

The `opendisplay.upload_image` action opens an active Bluetooth connection on demand to transfer the image. Starting a new upload cancels an upload that is already in progress.

## Known limitations

- BLE range is limited. Displays far from a Bluetooth adapter may experience unreliable transfers.
- Only one image transfer per device can be in progress at a time.

## Troubleshooting

### Device is not discovered

Check that the [Bluetooth](/integrations/bluetooth) integration is set up and working, then confirm your OpenDisplay device is powered on and in range of your Home Assistant host or a Bluetooth proxy.

### Authentication failed

This means the encryption key stored in Home Assistant no longer matches the key configured on the device. Go to {% my integration domain="opendisplay" title="**Settings** > **Devices & services** > **OpenDisplay**" %} and select **Re-authenticate** to enter the correct key.

### Upload fails with a connection error

BLE connections can drop at longer ranges. Try moving the display closer to your Bluetooth adapter. If you are using an ESPHome proxy, check that it has a stable Wi-Fi connection.

### Image appears rotated or upside down

The integration applies EXIF orientation automatically. If the result is still rotated, use the `rotation` parameter in the **Upload image** action to correct it manually.

## Removing the integration

{% include integrations/remove_device_service.md %}
