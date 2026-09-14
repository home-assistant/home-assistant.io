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

The **OpenDisplay** {% term integration %} lets you use [OpenDisplay](https://opendisplay.org/) e-paper displays with Home Assistant over Bluetooth Low Energy. You can upload images to the display from automations and scripts.

## Supported devices

Any device running the [OpenDisplay firmware](https://opendisplay.org/firmware/install/) is supported. For a full list of supported boards and displays, see the [OpenDisplay hardware compatibility page](https://opendisplay.org/firmware/seeed_display_compatibility.html).

## Unsupported devices

- Displays with 40-pin or 60-pin connectors, such as 10.3-inch monochrome panels, are not supported because of connector incompatibility.
- Shelly Bluetooth proxies do not support active Bluetooth Low Energy connections and cannot upload images.

## Prerequisites

- A working [Bluetooth](/integrations/bluetooth) setup that supports active connections, for example:
  - Built-in Bluetooth adapter
  - ESPHome Bluetooth proxy with firmware 2022.9.3 or later
- An OpenDisplay device that is powered on and within Bluetooth range.

{% include integrations/config_flow.md %}

Once the [Bluetooth](/integrations/bluetooth) integration is active, OpenDisplay devices are discovered automatically.

### Encryption

OpenDisplay devices can require AES-128 encryption for Bluetooth Low Energy communication. If your device requires encryption, the setup flow asks for the 32-character hexadecimal encryption key after the initial connection attempt. The device shows the key when it starts.

{% tip %}
To avoid typing the key, scan the QR code on the device display. The page that opens shows the encryption key. Copy the key, and paste it into Home Assistant.
{% endtip %}

If the encryption key changes after you set up the device, Home Assistant prompts you to enter the new key.

## Supported functionality

The **OpenDisplay** integration provides the following entities.

### Binary sensors

- **Connectivity**: Reports whether Home Assistant has recently received a Bluetooth Low Energy advertisement from the device.

### Sensors

OpenDisplay devices provide the following diagnostic sensors, which are disabled by default:

- **Temperature**: The device chip temperature.
- **Battery voltage**: The voltage of the attached battery. Available when the device uses battery or solar power.
- **Battery**: The battery charge as a percentage. Available when the device uses battery or solar power.

### Button events

OpenDisplay devices with configured physical inputs provide {% term event %} entities. Home Assistant creates one event entity for each physical button.

- `button_down`: The button was pressed.
- `button_up`: The button was released.

{% note %}
Home Assistant detects button events by comparing Bluetooth Low Energy advertisements, so it does not need an active Bluetooth connection. A press and release that happens between two advertisements might not be detected.
{% endnote %}

{% include integrations/actions.md %}

## OpenDisplay automation examples

You can use automations to show information or images at useful times.

{% include docs/paste_yaml_tip.md %}

### Automation: Show a daily image every morning

Show an image from your media folder on the display each morning.

- **Trigger**: Time: 07:00:00
- **Action**: OpenDisplay: Upload image
  - **Device**: Your OpenDisplay device
  - **Image**: The image to show

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Show the daily image on the display"
  triggers:
    - trigger: time
      at: "07:00:00"
  actions:
    - action: opendisplay.upload_image
      data:
        device_id: "a1b2c3d4e5f6"
        image:
          media_content_id: "media-source://media_source/local/daily.png"
          media_content_type: "image/png"
{% endexample %}

{% enddetails %}

### Automation: Show an image at sunset

Change the display image when the sun sets.

- **Trigger**: Sun: sunset
- **Action**: OpenDisplay: Upload image
  - **Device**: Your OpenDisplay device
  - **Image**: The image to show

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Show a sunset image on the display"
  triggers:
    - trigger: sun
      event: sunset
  actions:
    - action: opendisplay.upload_image
      data:
        device_id: "a1b2c3d4e5f6"
        image:
          media_content_id: "media-source://media_source/local/sunset.png"
          media_content_type: "image/png"
{% endexample %}

{% enddetails %}

## Known limitations

- Bluetooth Low Energy range is limited. Displays far from a Bluetooth adapter can have unreliable transfers.
- Starting a new image upload cancels an upload that is already in progress for the same integration entry.

## Troubleshooting

### Device is not discovered

#### Resolution

Check that the [Bluetooth](/integrations/bluetooth) integration is set up and working. Then, confirm that your OpenDisplay device is powered on and within range of your Home Assistant host or an ESPHome Bluetooth proxy.

### Authentication fails

#### Description

The encryption key stored in Home Assistant no longer matches the key on the device.

#### Resolution

Go to {% my integration domain="opendisplay" title="**Settings** > **Devices & services** > **OpenDisplay**" %}, and select **Re-authenticate** to enter the correct key.

### Image upload fails with a connection error

#### Description

Bluetooth Low Energy connections can drop at longer ranges.

#### Resolution

Move the display closer to your Bluetooth adapter. If you use an ESPHome Bluetooth proxy, check that it has a stable Wi-Fi connection.

### Image appears rotated or upside down

#### Description

Home Assistant applies EXIF orientation automatically before processing the image.

#### Resolution

If the image is still rotated, use the **Rotation** option in the **Upload image** action to correct it.

## Removing the integration

{% include integrations/remove_device_service.md %}
