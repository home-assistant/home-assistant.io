---
description: Instructions on how to integrate INDI Allsky with Home Assistant.
ha_release: '2026.10'
ha_domain: indi_allsky
---

The **INDI Allsky** {% term integration %} connects Home Assistant with your [INDI Allsky](https://github.com/aaronwmorris/indi-allsky) camera server. INDI Allsky is an allsky camera system designed for astrophotography, night sky capture, cloud cover monitoring, and atmospheric monitoring.

## Use cases

- Display the latest allsky camera image, keogram, and star trail images on a Home Assistant dashboard.
- Trigger automations or notifications when nighttime capture begins, when sky quality or star counts indicate clear skies, or when dew point and temperature conditions require attention.
- Browse and play historical timelapse videos, and view keograms, star trails, and captured images directly from the Home Assistant media browser.

## Supported devices

This integration supports local **INDI Allsky** server instances that expose the web interface and WebSocket API. Any camera hardware supported by INDI Allsky (via INDI drivers, `libcamera`/`rpicam`, or supported USB/network cameras) as well as connected environmental, Sky Quality Meter (SQM), and host system sensors exposed by INDI Allsky are supported.

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

## Reconfiguring the integration

To update your connection details (host, port, credentials, or SSL settings) after initial setup:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. On the **INDI Allsky** integration entry, select the {% icon "mdi:dots-vertical" %} menu and select **Reconfigure**.
3. Update the connection settings as needed and select **Submit**.

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

## Media source

The integration adds your INDI Allsky camera to the [media browser](/integrations/media_source/), so you can view its images and play its timelapse videos in Home Assistant. To open it, select **Media** in the sidebar, select **INDI Allsky**, and then select your INDI Allsky instance.

The media is organized into three folders:

- **Latest media**: The latest snapshot, keogram, star trail, and timelapse video.
- **Timelapses & generated media**: Day and night timelapse videos, with their keograms and star trails, organized by year and month.
- **Captured images history**: The individual images your camera captured, organized by year, month, day, and hour.

## INDI Allsky automation examples

Here are a few automation ideas to get you started.

{% include docs/paste_yaml_tip.md %}

### Automation: Notify when clear night skies are detected

Send a notification when your camera switches to nighttime capture and detects enough stars to indicate clear skies.

To create this automation in the UI:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and create a new automation.
2. Add a **State** trigger for **INDI Allsky Night** (`binary_sensor.indi_allsky_night`) changing **To** `on`.
3. Add a **Numeric state** condition for **INDI Allsky Stars** (`sensor.indi_allsky_stars`) being **Above** `100`.
4. Add a **Send a notification message** action.
   - In **Target**, select the notification entity for your device, for example **My Phone** (`notify.my_phone`).

{% details "Example YAML configuration" %}

{% example %}
automation: |
  alias: "Notify when clear night skies are detected"
  triggers:
    - trigger: state
      entity_id: binary_sensor.indi_allsky_night
      to: "on"
  conditions:
    - condition: numeric_state
      entity_id: sensor.indi_allsky_stars
      above: 100
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_phone
      data:
        message: >
          Clear night skies detected
          ({{ states('sensor.indi_allsky_stars') }} stars).
{% endexample %}

{% enddetails %}

## Data updates

Sensor readings, exposure metadata, and new keogram or star trail notifications are pushed in real time over a persistent local WebSocket connection. When a new keogram or star trail event arrives, Home Assistant fetches the updated image from the server. The camera entity fetches the latest capture image on demand whenever requested by Home Assistant, and a periodic 10-minute fallback refresh verifies connectivity and sensor state.

## Troubleshooting

{% details "Entities become unavailable" %}

### Symptom: One or more INDI Allsky entities show as unavailable

#### Description

Home Assistant cannot receive updates from the INDI Allsky server.

#### Resolution

1. Verify that the INDI Allsky service is running and reachable from your Home Assistant host.
2. Check **Settings** > **Devices & services** for any reauthentication prompt if login settings or credentials changed on the INDI Allsky server.
3. Home Assistant automatically reconnects the WebSocket stream and restores entity availability once the server responds again.

{% enddetails %}

### Cannot connect during setup

If you see a "Cannot connect" error during setup, verify that:

1. The INDI Allsky server is powered on and connected to your local network.
2. The hostname or IP address and port number are correct and reachable from Home Assistant.
3. If connecting using HTTPS with a self-signed SSL certificate, disable **Verify SSL** in the configuration options.

Most INDI Allsky servers are discovered automatically via Zeroconf. If your server is not discovered, verify that Zeroconf/mDNS (Avahi) is enabled on your INDI Allsky server and that multicast traffic is not blocked across network subnets or VLANs.

### Downloading diagnostics

If you need to report an issue, you can download [diagnostics](/integrations/diagnostics/) from the **INDI Allsky** integration.

The downloaded JSON file contains your connection state and latest coordinator data. Sensitive fields such as your host, username, and password are automatically redacted. Review the file before sharing it to verify that it does not contain any other sensitive information.

## Known limitations

- The integration can't sign in with OpenID Connect (OIDC). If you use OIDC with INDI Allsky, keep username and password sign-in turned on (`LOCAL_AUTH_ENABLE` set to `true`) and use a local user account for Home Assistant.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
