---
title: CCL Electronics
description: Instructions on how to integrate your CCL Electronics devices into Home Assistant.
ha_category:
  - Sensor
ha_release: 2025.2
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@fkiscd'
ha_domain: ccl
ha_platforms:
  - sensor
  - binary_sensor
---

The **CCL Electronics** {% term integration %} is a local-only {% term integration %} that reads weather data from CCL HA series weather station on the local network.

{% include integrations/config_flow.md %}

## Weather Station configuration

1. In the **Settings** → **Devices & services**, click **Add integration** and select **CCL Electronics** from the pop-up menu.
2. Follow the instructions and press **Submit** to generate the following details.  
  For example:
   - Server IP: '192.168.1.154'
   - Port: '8123'
   - Path: '/webhook/api/54fa0b9c'
3. Open the **WSLink** app on your mobile device.
4. Connect your mobile device to your weather station in AP mode.
5. In the WSLink app, go to **Weather Server** → **Home Assistant**, and enter the Server IP, Port, and Path assigned by Home Assistant.
6. Save
  {% configuration_basic %}
  Server IP:
    description: "Your Home Assistant IP address."
  Port:
    description: "Your Home Assistant port number. Should always be '8123'."
  Path:
    description: "It includes a unique 8-digits passkey and can be occupied by the first device as an identifier."
  {% endconfiguration_basic %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

After deleting the integration, go to the app of the manufacturer and remove the Home Assistant integration from there as well.

## Sensors

One weather station includes 3 components. Each of them represents a "device" in Home Assistant:

- Console & Sensor Array

  The basic sensors of a weather station, provide the bare essential data:
  - Air pressure
  - Dew point, Feels like, Heat index, WBGT & Wind chill
  - Indoor/Outdoor Temperature
  - Indoor/Outdoor Humidity
  - Light intensity
  - Rainfall & Rain rate
  - UVI
  - Wind direction, Wind gust & Wind speed

- Other Sensors

  Optional sensor channels if added, including:
  - Air quality
  - Leakage
  - Lightning
  - Thermo‐hygrometer

- Status

  - Battery
  - Connection
