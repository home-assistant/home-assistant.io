---
description: Instructions on how to integrate INDI Allsky with Home Assistant.
ha_release: '2026.10'
ha_domain: indi_allsky
---

The **INDI Allsky** {% term integration %} connects Home Assistant with your [INDI Allsky](https://github.com/aaronwmorris/indi-allsky) camera server. INDI Allsky is an allsky camera system designed for astrophotography, night sky capture, cloud cover monitoring, and atmospheric monitoring.

## Prerequisites

Your INDI Allsky server must be running and connected to your local network. In most cases, Home Assistant automatically discovers your server using Zeroconf/mDNS.

If your server is not automatically discovered, you need the connection details of your INDI Allsky web server instance, including the hostname or IP address and port number (defaults to port `443` with SSL enabled).

If your instance requires a login, you also need the username and password of an INDI Allsky user account.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The hostname or IP address of your INDI Allsky web server (for example, `allsky.local` or `192.168.1.100`)."
Port:
  description: "The web server port number for INDI Allsky (default: `443`)."
Username:
  description: "The username of your INDI Allsky user account. Required if your INDI Allsky instance requires a login to view pages, for example when `INDI_ALLSKY_AUTH_ALL_VIEWS` is enabled. Enter both the username and password, or leave both empty."
Password:
  description: "The password of your INDI Allsky user account. Required if your INDI Allsky instance requires a login."
SSL:
  description: "Whether to connect using HTTPS/SSL (default: `true`)."
Verify SSL:
  description: "Whether to verify the SSL certificate of the INDI Allsky web server (default: `true`)."
{% endconfiguration_basic %}

If you change the password in INDI Allsky or turn on login after setting up the integration, Home Assistant asks you to enter the username and password.

## Supported functionality

The **INDI Allsky** {% term integration %} provides the following entities:

### Binary sensor

- **Night**: Indicates whether the latest capture occurred during nighttime.

### Camera

- **Latest capture**: Provides the latest image from your INDI Allsky server.

### Image

- **Latest keogram**: Displays the most recently generated keogram image composite.
- **Latest star trail**: Displays the most recently generated star trail image composite.

### Sensors

- **Camera sensor temperature**: Camera sensor temperature (in °C).
- **Camera SQM**: Sky Quality Meter magnitude calculated from camera exposures.
- **Camera SQM ADU**: Camera SQM raw Analog-to-Digital Unit (ADU) count.
- **Device SQM**: Sky Quality Meter magnitude reading from a dedicated hardware SQM device.
- **Dew heater duty cycle**: Dew heater power output level (in %).
- **Dew point**: Calculated atmospheric dew point temperature (in °C).
- **Exposure time**: The exposure duration of the latest capture (in seconds).
- **Fan duty cycle**: Cooling fan output level (in %).
- **Frost point**: Calculated atmospheric frost point temperature (in °C).
- **Heat index**: Calculated heat index temperature (in °C).
- **Sky quality**: Sky Quality Meter (SQM) reading.
- **Stars**: The number of stars detected in the latest image.
- **Wind direction**: Measured wind direction (in degrees).

- **Binning mode** (disabled by default): The binning mode used for capture.
- **Camera ID** ([disabled by default](/docs/configuration/customizing-entities/#disabling-or-enabling-an-entity)): The identifier of the camera.
- **CPU temperature** (disabled by default): Server host CPU temperature (in °C).
- **Exposure creation time** (disabled by default): Timestamp when the exposure was created.
- **Filename** (disabled by default): The filename of the latest captured image.
- **Gain** (disabled by default): The camera gain setting.

### Dynamic hardware sensors

Additional hardware sensors connected to your INDI Allsky instance (such as ambient temperature, relative humidity, barometric pressure, voltage, current, power, or illuminance sensors) are automatically discovered and created dynamically with appropriate units of measurement and device classes.

## Data updates

The camera entity fetches the latest image on-demand from the INDI Allsky server whenever requested by Home Assistant. Sensor data is pushed in real time via a persistent local WebSocket connection.

## Troubleshooting

### Cannot connect during setup

If you see a "Cannot connect" error during setup, verify that:

1. The INDI Allsky server is powered on and connected to your local network.
2. The hostname or IP address and port number are correct and reachable from Home Assistant.
3. If connecting using HTTPS with a self-signed SSL certificate, disable **Verify SSL** in the configuration options.

Most INDI Allsky servers are discovered automatically via Zeroconf. If your server is not discovered, verify that Zeroconf/mDNS (Avahi) is enabled on your INDI Allsky server and that multicast traffic is not blocked across network subnets or VLANs.

## Known limitations

- The integration can't sign in with OpenID Connect (OIDC). If you use OIDC with INDI Allsky, keep username and password sign-in turned on (`LOCAL_AUTH_ENABLE` set to `true`) and use a local user account for Home Assistant.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
