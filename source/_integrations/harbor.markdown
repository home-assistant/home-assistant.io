---
title: Harbor Sleep
description: Instructions on how to set up Harbor Sleep baby monitors in Home Assistant.
ha_category:
  - Sensor
  - Switch
ha_config_flow: true
ha_release: 2026.8
ha_iot_class: Local Push
ha_codeowners:
  - '@Lash-L'
  - '@afgarcia86'
ha_domain: harbor
ha_platforms:
  - sensor
  - switch
ha_integration_type: device
ha_quality_scale: bronze
---

The **Harbor Sleep** {% term integration %} lets you monitor a [Harbor Sleep](https://harbor.co/) baby monitor in Home Assistant.

## Supported devices

The following devices are supported:

- Harbor Sleep baby monitors

## Prerequisites

Before setting up the integration, make sure you have:

- A Harbor Sleep baby monitor set up in the Harbor app
- The 10-digit serial number printed on the Harbor camera
- The client certificate from the Harbor app
- The private key that matches the client certificate
- The local IP address of the Harbor device on your network

### Getting the client certificate and private key

To get the client certificate and private key from the Harbor app:

1. Open the app.
2. Go to **Live**.
3. Open **Camera Settings**.
4. Scroll all the way down until you find **Advanced Settings**.
5. Select **Request Client Certs**.
6. Save the certs in a location that you can access for integration setup. Delete them once you set up the integration.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Serial number:
  description: "The 10-digit serial number printed on the Harbor device."
Client certificate:
  description: "The client certificate from the Harbor app. Paste the full PEM certificate, including the `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----` lines."
Private key:
  description: "The private key from the Harbor app. Paste the full PEM private key, including the `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` lines."
IP address:
  description: "The local IP address of the Harbor device."
{% endconfiguration_basic %}

## Supported functionality

The Harbor Sleep integration provides sensors and switches for the connected Harbor device.

### Sensors

- **Viewers**: The number of active viewers.
- **Temperature**: The temperature reported by the Harbor device.
- **Bitrate**: The current stream bitrate.
- **Wi-Fi strength**: The Wi-Fi signal strength reported by the Harbor device.
- **Stream quality**: The current stream quality. Possible values are **Excellent**, **Good**, **Fair**, **Poor**, and **Unknown**.

### Switches

- **Camera**: Turns the camera stream on or off.
- **Flip image**: Rotates the camera image by 180 degrees, or restores it upright.
- **Clock overlay**: Shows or hides the clock overlay that is burned into the video.

## Data updates

The Harbor Sleep integration uses local push. Home Assistant keeps a local connection to the Harbor device and updates entities when the device sends new data.

## Actions

This integration does not provide additional actions.

## Known limitations

The integration currently provides sensor and select entities only. To get the camera stream, you must set up a WHIP endpoint on `go2rtc`, `frigate`, or similar and then add a camera entity connecting to the server that is ingesting the WHIP endpoint. See [the Harbor Python README](https://github.com/Harbor-Systems/harbor-python#whip-endpoint) for more information.

## Troubleshooting

### Cannot connect

If Home Assistant cannot connect to the Harbor device during setup, try these steps:

1. Make sure the Harbor device is powered on.
2. Make sure the Harbor device and Home Assistant are on the same local network.
3. Make sure the serial number is exactly 10 digits.
4. Make sure the client certificate and private key are copied completely.
5. Make sure the local IP address you entered belongs to the Harbor device and is reachable from Home Assistant.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
