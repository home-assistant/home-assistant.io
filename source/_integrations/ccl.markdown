---
title: CCL Electronics
description: Instructions on how to integrate your CCL Electronics devices into Home Assistant.
ha_category:
  - Sensor
  - Weather
ha_release: 2025.1
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
    - Server IP: 192.168.1.154 (your Home Assistant IP address)
    - Port: 42373 (fixed)
    - Path: /54fa0b (random)
3. Open the **WSLink** app in your mobile device.
4. Connect your mobile device to your weather station in AP mode.
5. In the WSLink app, go to **Weather Server** → **Home Assistant**, and enter the Server IP, Port, and Path assigned by Home Assistant.
6. Save

## Sensors

One weather station included 3 components. Each of them represents a “device” in Home Assistant:

- Console & Sensor Array
- Other Sensors
- Status
