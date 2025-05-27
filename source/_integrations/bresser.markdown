---
title: Bresser
description: Instructions on how to integrate your Bresser devices into Home Assistant.
ha_category:
  - Sensor
ha_release: 2025.7
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@fkiscd'
ha_domain: ccl
ha_platforms:
  - sensor
---

The **Bresser** {% term integration %} is a local-only {% term integration %} that reads weather data from Bresser weather station on the local network.

{% include integrations/config_flow.md %}

After adding the integration to Home Assistant, follow these steps:

1. Open the **WSLink** app on your mobile device.
2. Connect your mobile device to your weather station in AP mode.
3. In the WSLink app, go to **Weather Server** > **Home Assistant**, and enter the Server IP, Port, and Path assigned by Home Assistant.
4. Save.

{% configuration_basic %}
Server IP:
  description: "Your Home Assistant IP address. For example, `192.168.1.154`."
Port:
  description: "Your Home Assistant port number. Should always be '8123'."
Path:
  description: "It includes a unique 8-digits passkey and can be occupied by the first device as an identifier. For example, `/webhook/api/54fa0b9c`"
{% endconfiguration_basic %}


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
 
## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

After deleting the integration, go to the app of the manufacturer and remove the Home Assistant integration from there as well.
