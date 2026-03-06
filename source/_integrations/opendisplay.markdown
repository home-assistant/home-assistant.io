---
title: OpenDisplay
description: Instructions on how to integrate OpenDisplay e-paper displays into Home Assistant.
ha_category:
  - DIY
ha_bluetooth: true
ha_release: 2026.4
ha_iot_class: Local Push
ha_codeowners:
  - '@g4bri3lDev'
ha_domain: opendisplay
ha_config_flow: true
ha_platforms:
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

## Actions

### Action: Upload image (`opendisplay.upload_image`)

Uploads an image to a display. The image is resized and dithered to match the display's resolution and color palette.

| Data attribute    | Description                                                                                      | Required | Default   |
| ----------------- | ------------------------------------------------------------------------------------------------ | -------- | --------- |
| `device_id`       | The OpenDisplay device to upload the image to.                                                  | Yes      | -         |
| `image`           | The image to upload, selected from a media source.                                              | Yes      | -         |
| `rotation`        | Clockwise rotation in degrees: 0, 90, 180, or 270.                                              | No       | 0         |
| `dither_mode`     | Dithering algorithm for converting to the display's color palette.                              | No       | Burkes    |
| `refresh_mode`    | Refresh mode to use. Full clears ghosting but is slower; fast is not supported on all displays. | No       | Full      |
| `fit_mode`        | How the image is fitted to the display.                                                         | No       | Contain   |
| `tone_compression`| Dynamic range compression strength as a percentage (0-100). Omit to use automatic adjustment.   | No       | Automatic |

**Refresh modes**:

- **Full**: Clears ghosting but takes longer
- **Fast**: Faster refresh, not supported on all displays

**Dither modes**: None, Burkes, Ordered, Floyd-Steinberg, Atkinson, Stucki, Sierra, Sierra Lite, Jarvis, Judice, and Ninke

**Fit modes**:

- **Contain**: Scale to fit within the display, pad remaining space with white
- **Cover**: Scale to fill the display, crop edges that overflow
- **Stretch**: Distort to fill the exact display dimensions
- **Crop**: Center-crop at native resolution without scaling

## Examples

### Uploading an image

{% details "Upload an image from local media" %}

{% raw %}

```yaml
action: opendisplay.upload_image
data:
  device_id: "your_device_id"
  image:
    media_content_id: "media-source://media_source/local/photo.png"
    media_content_type: "image/png"
```

{% endraw %}

{% enddetails %}

### Updating the display on a schedule

You can use an {% term automation %} to refresh the display at a set time each day.

{% details "Update display daily at 8:00 AM" %}

{% raw %}

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

{% endraw %}

{% enddetails %}

## Sensors

The following sensors are provided. All are in the {% term diagnostic %} category.

| Sensor          | Unit | Description                                                  | Enabled by default |
|-----------------|------|--------------------------------------------------------------|--------------------|
| Battery         | %    | State of charge estimated from battery voltage and chemistry | Yes                |
| Battery voltage | mV   | Raw battery voltage from the ADC                             | No                 |
| Temperature     | °C   | Internal microcontroller temperature                         | No                 |

Battery and voltage sensors are only created for battery- or solar-powered devices. The temperature reading reflects the microcontroller's internal temperature, not ambient temperature.

## Known limitations

- BLE range is limited. Displays far from a Bluetooth adapter may experience unreliable transfers.
- Starting a new upload while one is already in progress cancels the ongoing transfer.

## Troubleshooting

{% details "Device is not discovered" %}

Check that the [Bluetooth](/integrations/bluetooth) integration is set up and working, then confirm your OpenDisplay device is powered on and in range of your Home Assistant host or a Bluetooth proxy.

{% enddetails %}

{% details "Upload fails with a connection error" %}

BLE connections can drop at longer ranges. Try moving the display closer to your Bluetooth adapter. If you are using an ESPHome proxy, check that it has a stable Wi-Fi connection.

{% enddetails %}

{% details "Image appears rotated or upside down" %}

The integration applies EXIF orientation automatically. If the result is still rotated, use the `rotation` parameter in the **Upload image** action to correct it manually.

{% enddetails %}

## Removing the integration

{% include integrations/remove_device_service.md %}
