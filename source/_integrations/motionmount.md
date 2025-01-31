---
title: Vogel's MotionMount
description: Instructions on how to integrate Vogel's MotionMount into Home Assistant.
ha_category:
  - Number
  - Select
  - Binary sensor
  - Sensor
ha_release: 2024.1
ha_iot_class: Local Push
ha_config_flow: true
ha_platforms:
  - number
  - select
  - binary_sensor
  - sensor
ha_codeowners:
  - '@RJPoelstra'
ha_domain: motionmount
ha_zeroconf: true
---

The `motionmount` {% term integration %} allows you to control the position of your [TVM 7675 Pro](https://www.vogels.com/p/tvm-7675-pro-motorized-tv-wall-mount-black) SIGNATURE MotionMount from Vogel's.

This integration uses the Ethernet (IP) connection of your MotionMount. It's not possible to connect using the RS-232 connection.

It provides information about the current position of the mount and allows setting a new position.

A use case would be to position the TV based on whether anyone is actively watching. The MotionMount provides an HDMI connection to monitor whether the TV is turned on and in response move it to a preset position or the last known position. However, if you also use the TV for background music, you probably don't want the MotionMount to extend. By using a presence sensor to check whether anyone is actually in front of the TV, you can ensure the MotionMount only extends when the TV is actively being watched.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: Hostname or IP address of the device, for example:`192.168.1.2`.
Port:
  description: The TCP port of the device. Defaults to 23. Only change this when you're absolutely certain that it shouldn't be 23.
PIN:
  description: The user level pincode, if configured on the device.
{% endconfiguration_basic %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

## Data updates

The MotionMount pushes new data to the integration.
The only exception is the presets. Changes to the presets are {% term polling polled %}, by default every 60 seconds.

## Known limitations

The integration does not provide the ability to configure the MotionMount.
All settings, including configuring presets, should be done via the MotionMount app.

Only IP connections are supported. Connection via RS-232 or Bluetooth Low Energy is not supported.

## Supported devices

The following devices are supported:

- TVM 7675 Pro (SIGNATURE MotionMount with Pro extension)

## Unsupported devices

The following devices are *not* supported:

- TVM 7675 (SIGNATURE MotionMount without Pro extension)
- TVM 7355 (NEXT MotionMount)

## Supported functionality

### Entities

#### Sensors

- **Moving**
  - **Description**: Indicates whether the MotionMount is moving.

- **Error Status**
  - **Description**: The error status of the MotionMount.
    - None: There is no error.
    - Motor: There is a problem communicating with the motor.
    - Internal: There is an internal error. Refer to the MotionMount app for support.

#### Numbers

- **Extension**
  - **Description**: The current extension of the MotionMount from the wall.

- **Turn**
  - **Description**: The current rotation of the MotionMount.

#### Selects

- **Presets**
  - **Description**: If the MotionMount is at a preset location, this shows the corresponding preset.
        Any preset can be selected to move the MotionMount to this preset position.

## Troubleshooting

### Can't connect to device

1. Make sure the device is powered on.
2. Make sure the device is connected to the same network as Home Assistant.
3. Make sure the IP address of the MotionMount is configured correctly.
    - In case of doubt, perform a network reset by holding the reset button for approx. 5 seconds.
      - **Result**: The LED will start to blink slowly. This indicates that the network configuration is being reset to use DHCP.
      - **Important**: Don't hold the reset button for too long (approx. 10 s). Holding the button for 10 s or longer starts a factory reset. A factory reset is indicated by the LED blinking fast.

