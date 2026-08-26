---
title: Hot Spring
description: Instructions on how to integrate Hot Spring spas into Home Assistant.
ha_release: 2026.8
ha_category:
  - Binary sensor
  - Light
  - Number
  - Sensor
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@Moustachauve'
ha_domain: hotspring
ha_platforms:
  - binary_sensor
  - diagnostics
  - light
  - number
  - sensor
ha_integration_type: device
ha_zeroconf: true
---

The **Hot Spring** {% term integration %} allows you to monitor and control your [Hot Spring](https://www.hotspring.com/) spa equipped with the **HotSpring Connected Spa Kit 2** (part number 79994) module directly from Home Assistant.

## Supported devices

- Hot Spring spas equipped with the **HotSpring Connected Spa Kit 2** (part number 79994) local network module.

## Prerequisites

1. Install and set up the **HotSpring Connected Spa Kit 2** on your spa following the manufacturer's quick start guide.
2. Use the official **HotSpring Connected Spa** app to connect the spa module to your home Wi-Fi or local network.
3. Verify that your Home Assistant instance and the Hot Spring spa module are on the same local network subnet.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
    description: "The hostname or IP address of your Hot Spring HNA (Home Network Adapter) on your local network (for example, `192.168.1.150`)."
{% endconfiguration_basic %}

{% note %}
When setting up or reconfiguring the integration, ensure you enter the IP address of the **HNA** (Home Network Adapter) and _not_ the IP address of the **SNA** (Spa Network Adapter).
{% endnote %}

### Reconfiguration

If the IP address of your Hot Spring spa changes, reconfigure the integration:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. Select the **Hot Spring** integration.
3. Select **Menu** {% icon "mdi:dots-vertical" %} > **Reconfigure**.

## Supported functionality

The **Hot Spring** integration provides the following entities:

### Binary sensor

- **Heating**
  - **Description**: Indicates whether the spa heater is actively heating water.
- **Problem**
  - **Description**: Indicates whether a failure or error condition is detected on the spa.
- **Spa connected**
  - **Description**: Indicates whether the wireless radio link between the Home Network Adapter (HNA) and the Spa Network Adapter (SNA) is connected.

### Light

- **Light zone 1**
  - **Description**: Controls a light zone on the spa (one entity is created per enabled light zone). Supports turning the light on and off, adjusting brightness, and setting an RGB color.

### Number

- **Target temperature**
  - **Description**: Allows setting the target water temperature for the spa.
  - **Range**: 80 °F to 104 °F

### Sensor

- **Current temperature**
  - **Description**: Current water temperature of the spa.
- **Salt 10-day check timer**
  - **Description**: Number of days remaining until the next 10-day salt water test reminder.
  - **Availability**: Available when a FreshWater Salt System cartridge is installed.
- **Salt cartridge age**
  - **Description**: Number of days the FreshWater Salt System cartridge has been in use.
  - **Availability**: Available when a FreshWater Salt System cartridge is installed.
- **Salt value**
  - **Description**: Current salt level reading from the FreshWater Salt System.
  - **Availability**: Available when a FreshWater Salt System cartridge is installed.
- **Control box version**
  - **Description**: Firmware version of the spa control box.
  - **Remarks**: Disabled by default.
- **FreshWater Salt System version**
  - **Description**: Firmware version of the FreshWater Salt System module.
  - **Remarks**: Disabled by default. Available when a FreshWater Salt System is detected.
- **Wi-Fi dongle version**
  - **Description**: Firmware version of the Wi-Fi dongle.
  - **Remarks**: Disabled by default.

## Hot Spring automation examples

Here are a few ideas to get you started.

{% include docs/paste_yaml_tip.md %}

### Notify when the 10-day salt check timer is due

Get a reminder to test your Hot Spring spa water with a salt test strip when the 10-day check timer expires.

{% details "Example YAML configuration" %}

{% example %}
automation: |
  alias: "Notify when 10-day salt check is due"
  description: "Send a notification when the 10-day salt check timer reaches 0 days."
  triggers:
    - trigger: numeric_state
      entity_id: sensor.hot_spring_salt_10_day_check_timer
      below: 1
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.notify
      data:
        title: "Hot Spring spa"
        message: "The 10-day salt water test timer has expired. Please test your spa water with a test strip."
{% endexample %}

{% enddetails %}

### Notify when the spa reaches target temperature

Get notified when your spa water has reached the desired target temperature and is ready for use.

{% details "Example YAML configuration" %}

{% example %}
automation: |
  alias: "Notify when spa reaches target temperature"
  description: "Send a notification when the spa water temperature reaches the target temperature."
  triggers:
    - trigger: numeric_state
      entity_id: sensor.hot_spring_current_temperature
      above: 101
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.notify
      data:
        title: "Hot Spring spa"
        message: "The spa is ready! Current water temperature is {{ states('sensor.hot_spring_current_temperature') }} °F."
{% endexample %}

{% enddetails %}

## Data updates

The **Hot Spring** integration uses local {% term polling %} to fetch status updates directly from the spa module on your local network.

## Troubleshooting

### Cannot connect to Hot Spring spa

If Home Assistant cannot establish a connection to your Hot Spring spa:

- Make sure your Hot Spring spa module is powered on and connected to your local network.
- Verify that you are using the IP address of the **HNA** (Home Network Adapter) and _not_ the **SNA** (Spa Network Adapter).
- Verify that you can locate the device on your local network router client list.
- Double-check that the IP address or hostname entered is correct and reachable from your Home Assistant instance.
- Restart the Hot Spring spa module and reload the integration in Home Assistant.

## Diagnostics

The Hot Spring {% term integration %} provides diagnostics to help with troubleshooting. The download includes:

- Redacted configuration entry data
- Spa hardware information and firmware versions
- Current state and telemetry for the spa heater, jets, blower, lights, clean cycle, spa lock, water care, FreshWater IQ, energy savings schedules, connection status, and test metrics

Sensitive information, such as the host, IP address, and MAC address, is redacted.

To download diagnostics:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. Select the **Hot Spring** integration.
3. Open the three-dot {% icon "mdi:dots-vertical" %} menu on the integration entry and select **Download diagnostics**.

Attach the downloaded file when reporting an issue. For more information, see [Download diagnostics](/docs/configuration/troubleshooting/#download-diagnostics).

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
