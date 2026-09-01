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
ha_quality_scale: silver
---

The **OpenDisplay** {% term integration %} lets you use [OpenDisplay](https://opendisplay.org/) e-paper displays with Home Assistant over Bluetooth Low Energy.

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

### Sensors

- **Temperature**: Chip temperature
- **Battery Voltage**: (Only if the device has a battery configured) Shows the current voltage of the attached battery

### Button events

OpenDisplay Flex devices with configured physical inputs show up as {% term event %} {% term entities %} in Home Assistant. One {% term event %} {% term entity %} is created for each physical button.

- `press_start`: Fires when the button is pressed.
- `press_end`: Fires when the button is released.

{% note %}
Events are detected by comparing consecutive BLE advertisements, so no active Bluetooth connection is needed. A very fast press-and-release between two advertisements may not be observed.
{% endnote %}

{% details "Turn on a light when a button is pressed" %}

```yaml
triggers:
  - trigger: event.received
    target:
      entity_id: event.opendisplay_1234_button_1
    options:
      event_type:
        - press_start
actions:
  - action: light.turn_on
    target:
      entity_id: light.my_light
```
{% enddetails %}

### Binary sensors

- **Connectivity**: Reports whether the device is currently connected to Home Assistant and can receive commands.

{% include integrations/actions.md %}

## Examples

### Uploading an image

{% details "Upload an image from local media" %}

```yaml
action: opendisplay.upload_image
data:
  device_id: "your_device_id"
  image:
    media_content_id: "media-source://media_source/local/photo.png"
    media_content_type: "image/png"
```

{% enddetails %}

### Updating the display on a schedule

You can use an {% term automation %} to refresh the display at a set time each day.

{% details "Update display daily at 8:00 AM" %}

```yaml
triggers:
  - trigger: time
    at: "08:00:00"
actions:
  - action: opendisplay.upload_image
    data:
      device_id: "your_device_id"
      image:
        media_content_id: "media-source://media_source/local/daily.png"
        media_content_type: "image/png"
```

{% enddetails %}

## Known limitations

- BLE range is limited. Displays far from a Bluetooth adapter may experience unreliable transfers.
- Starting a new upload while one is already in progress cancels the ongoing transfer.

## Troubleshooting

{% details "Device is not discovered" %}

Check that the [Bluetooth](/integrations/bluetooth) integration is set up and working, then confirm your OpenDisplay device is powered on and in range of your Home Assistant host or a Bluetooth proxy.

{% enddetails %}

{% details "Authentication failed" %}

This means the encryption key stored in Home Assistant no longer matches the key configured on the device. Go to {% my integration domain="opendisplay" title="**Settings** > **Devices & services** > **OpenDisplay**" %} and select **Re-authenticate** to enter the correct key.

{% enddetails %}

{% details "Upload fails with a connection error" %}

BLE connections can drop at longer ranges. Try moving the display closer to your Bluetooth adapter. If you are using an ESPHome proxy, check that it has a stable Wi-Fi connection.

{% enddetails %}

{% details "Image appears rotated or upside down" %}

The integration applies EXIF orientation automatically. If the result is still rotated, use the `rotation` parameter in the **Upload image** action to correct it manually.

{% enddetails %}

## Removing the integration

{% include integrations/remove_device_service.md %}
