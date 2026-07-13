---
title: Harbor Sleep
description: Instructions on how to set up Harbor Sleep baby monitors in Home Assistant.
ha_category:
  - Sensor
ha_config_flow: true
ha_release: 2026.8
ha_iot_class: Local Push
ha_codeowners:
  - '@Lash-L'
  - '@afgarcia86'
ha_domain: harbor
ha_platforms:
  - sensor
ha_integration_type: device
ha_quality_scale: bronze
works_with:
  - local
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

### Getting the client certificate and private key

To get the client certificate and private key from the Harbor app:

1. Open the app
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
  description: "Optional local IP address for the Harbor device. Leave this empty to let Home Assistant find the device automatically."
{% endconfiguration_basic %}

## Supported functionality

The Harbor Sleep integration provides sensors for the connected Harbor device.

### Sensors

- **Viewers**: The number of active viewers.
- **Temperature**: The temperature reported by the Harbor device.
- **Bitrate**: The current stream bitrate.
- **Wi-Fi strength**: The Wi-Fi signal strength reported by the Harbor device.
- **Stream quality**: The current stream quality. Possible values are **Excellent**, **Good**, **Fair**, **Poor**, and **Unknown**.

## Data updates

The Harbor Sleep integration uses local push. Home Assistant keeps a local connection to the Harbor device and updates entities when the device sends new data.

## Actions

This integration does not provide additional actions.

## Known limitations

The integration currently provides sensor entities only. To get the camera stream, you must setup a WHIP endpoint on `go2rtc`, `frigate`, or similar and then add a camera entity connecting to the server that is ingesting the WHIP endpoint. See [here](https://github.com/Harbor-Systems/harbor-python#whip-endpoint) for more information.

## Troubleshooting

### Cannot connect

If Home Assistant cannot connect to the Harbor device during setup, try these steps:

1. Make sure the Harbor device is powered on.
2. Make sure the Harbor device and Home Assistant are on the same local network.
3. Make sure the serial number is exactly 10 digits.
4. Make sure the client certificate and private key are copied completely.
5. If automatic discovery does not work, enter the local IP address of the Harbor device.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
