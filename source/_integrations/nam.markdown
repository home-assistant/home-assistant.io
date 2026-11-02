---
description: Instructions on how to integrate Nettigo Air Monitor within Home Assistant.
ha_release: 2021.6
ha_domain: nam
---

The **Nettigo Air Monitor** {% term integration %} allows you to read temperature, humidity, pressure, and air quality data from Nettigo Air Monitor devices. [Nettigo Air Monitor](https://air.nettigo.pl/?setlang=en) is a DIY air quality monitoring system with open source firmware, based on an open hardware project.

## Use cases

- Monitor the air quality and particulate matter levels around your home.
- Get a notification when the air quality is poor.
- Control your ventilation system or air purifier based on the air quality.
- Show the temperature, humidity, and pressure measured by your device on your dashboard.

## Supported devices

The following devices are supported by the integration:

- Nettigo Air Monitor devices running the Nettigo Air Monitor firmware.
- Devices running the [Sensor.Community firmware](https://github.com/opendata-stuttgart/sensors-software) (formerly Luftdaten), which the Nettigo Air Monitor firmware is based on.

The integration supports the following sensor modules:

- BH1750
- BME280
- BMP180
- BMP280
- DHT22
- DS18B20
- HECA
- MH-Z14A
- PMSx003
- SDS011
- SHT3X
- SPS30

## Prerequisites

Make sure your device is powered on and connected to the same network as Home Assistant. If you enabled authentication in the web interface of the device, have the username and password ready.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
    description: "The hostname or IP address of the Nettigo Air Monitor to control."
Username:
    description: "The username you set in the web interface of the device. You are only asked for it if the device has authentication enabled."
Password:
    description: "The password you set in the web interface of the device. You are only asked for it if the device has authentication enabled."
{% endconfiguration_basic %}

## Supported functionality

The **Nettigo Air Monitor** integration provides the following entities. Entity names start with the name of the sensor module, for example **BME280 temperature**. Only entities for the sensors your device reports are created, so which entities you get depends on the hardware and firmware configuration of your device.

### Sensors

- **Temperature**
  - **Description**: Shows the temperature.
  - **Available for sensors**: BME280, BMP180, BMP280, DHT22, DS18B20, HECA, SHT3X
- **Humidity**
  - **Description**: Shows the relative humidity in %.
  - **Available for sensors**: BME280, DHT22, HECA, SHT3X
- **Pressure**
  - **Description**: Shows the atmospheric pressure.
  - **Available for sensors**: BME280, BMP180, BMP280
- **Illuminance**
  - **Description**: Shows the illuminance in lx.
  - **Available for sensors**: BH1750
- **Carbon dioxide**
  - **Description**: Shows the carbon dioxide concentration in ppm.
  - **Available for sensors**: MH-Z14A
- **PM1**
  - **Description**: Shows the concentration of particulate matter smaller than 1 micrometer in µg/m³.
  - **Available for sensors**: PMSx003, SPS30
- **PM2.5**
  - **Description**: Shows the concentration of particulate matter smaller than 2.5 micrometers in µg/m³.
  - **Available for sensors**: PMSx003, SDS011, SPS30
- **PM4**
  - **Description**: Shows the concentration of particulate matter smaller than 4 micrometers in µg/m³.
  - **Available for sensors**: SPS30
- **PM10**
  - **Description**: Shows the concentration of particulate matter smaller than 10 micrometers in µg/m³.
  - **Available for sensors**: PMSx003, SDS011, SPS30
- **Common air quality index**
  - **Description**: Shows the numeric Common Air Quality Index (CAQI) value.
  - **Available for sensors**: PMSx003, SDS011, SPS30
- **Common air quality index level**
  - **Description**: Shows the Common Air Quality Index level. The possible values are **Very low**, **Low**, **Medium**, **High**, and **Very high**.
  - **Available for sensors**: PMSx003, SDS011, SPS30
- **Signal strength**
  - **Description**: Shows the signal strength of the Wi-Fi connection of the device in dBm.
  - **Remarks**: Diagnostic entity. Disabled by default.
- **Uptime**
  - **Description**: Shows when the device was last started.
  - **Remarks**: Diagnostic entity. Disabled by default.

### Buttons

- **Restart**
  - **Description**: Restarts the device.

## Nettigo Air Monitor automation examples

The following example shows how to use the integration in Home Assistant automations. It is just a starting point, and you can use it as inspiration to create your own automations.

{% include docs/paste_yaml_tip.md %}

### Automation: Notify when the PM2.5 level is too high

This automation sends a notification to your mobile device when the PM2.5 level exceeds 25 µg/m³. Replace the entity ID in the example with the entity ID of your device's **PM2.5** sensor.

- **Trigger**: Numeric state crossed threshold
  - **Entity**: SDS011 PM2.5 (`sensor.nettigo_air_monitor_sds011_pm2_5`)
  - **Above**: `25`
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)
  - **Title**: `High PM2.5 level alert`
  - **Message**: A message with the current PM2.5 level

{% details "YAML example for notifying when the PM2.5 level is too high" %}

{% example %}
automation: |
  alias: "Notify when the PM2.5 level is too high"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.nettigo_air_monitor_sds011_pm2_5
      above: 25
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "High PM2.5 level alert"
        message: >
          The PM2.5 level is too high at
          {{ states('sensor.nettigo_air_monitor_sds011_pm2_5') }} µg/m³.
{% endexample %}

{% enddetails %}

## Data updates

The **Nettigo Air Monitor** integration {% term polling polls %} data from the device every 4 minutes. The device is polled over your local network, and no cloud is involved.

## Known limitations

- Entities exist only for the sensor modules the device reports. To add or enable a sensor module, change the firmware configuration of the device. You cannot do this in Home Assistant.

## Troubleshooting

{% details "Can't set up the device" %}

### Symptom: "Failed to connect"

When you try to set up the integration, Home Assistant shows the message "Failed to connect".

#### Description

Home Assistant cannot reach the device. The device may be powered off, the host may be wrong, or the device may not be on the same network as Home Assistant.

#### Resolution

1. Check that the device is powered on and connected to your Wi-Fi network.
2. Check that the host name or IP address you entered is correct.
3. Check that the device and Home Assistant are on the same network.
4. Try again.

### Symptom: "The device is unsupported."

When you try to set up the integration, Home Assistant shows the message "The device is unsupported."

#### Description

The firmware of the device does not provide the information the integration needs, such as the MAC address. This can happen with older firmware.

#### Resolution

1. Update the firmware of the device to the latest version.
2. Try again.

{% enddetails %}

{% details "Authentication fails" %}

### Symptom: "Invalid authentication"

When you try to set up the integration, Home Assistant shows the message "Invalid authentication". Home Assistant also asks you to reauthenticate when the integration loads or when you press the **Restart** button, and the device no longer accepts the stored username and password, for example after you changed them in the web interface of the device.

#### Description

The username or password does not match the credentials configured in the web interface of the device.

#### Resolution

1. Enter the username and password configured in the web interface of the device.
2. When Home Assistant asks for reauthentication, follow the prompt in **Settings** > **Devices & services**.
3. If the reauthentication is unsuccessful, remove the integration entry and set it up again.

{% enddetails %}

{% details "The entities are unavailable" %}

### Symptom: The entities of the device become unavailable

The entities of the device show as unavailable, or {% my logs title="**Settings** > **System** > **Logs**" %} contains messages about errors retrieving data from the device.

#### Description

Home Assistant cannot reach the device. The device may be powered off, have a Wi-Fi problem, or have received a new IP address.

#### Resolution

1. Check that the device is powered on and connected to your network.
2. If the IP address of the device changed, select the **Reconfigure** option of the integration entry and enter the new host. Enter the address of the same device. Home Assistant rejects the address of a different Nettigo Air Monitor.
3. Wait for the next data update. The integration retries automatically every 4 minutes, and the entities become available again when the device responds.
4. If the problem persists, enable [debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics), download the {% term diagnostics %} data, and include both in your issue report.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
