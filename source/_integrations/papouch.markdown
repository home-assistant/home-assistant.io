---
title: Papouch
description: Instructions on how to integrate Papouch devices into Home Assistant.
ha_category:
  - Binary Sensor
  - Button
  - Number
  - Select
  - Sensor
  - Switch
ha_release: 2026.8
ha_iot_class: Local Polling
ha_config_flow: true
ha_domain: papouch
---

The **Papouch** integration allows you to integrate your [Papouch](https://papouch.com/) hardware devices into Home Assistant.

## Supported devices

Currently, only Ethernet devices in WEB mode are supported:

- **Quido ETH** (Input/output modules)
- **TH2E** (Thermometers and environmental sensors)
- **TME** (Multi-channel thermometers)
  - **TME Multi / Radio**
- **Papago** (Ethernet sensors and meteo stations)

## Device discovery

All supported Papouch devices feature DHCP discovery. Once the integration is active in your Home Assistant instance, devices sending DHCP requests will automatically appear in the **Discovered** section on the Integrations page. Clicking **Configure** will guide you through the setup process.

Active discovery is also triggered automatically when you manually add the integration via the user interface. It will scan your local network using UDP broadcasts and present a list of available, unregistered devices along with their names, locations, and IP addresses.

{% note %}
If your Home Assistant instance is running in an isolated network environment (such as WSL or specific Docker network configurations) where UDP broadcasts cannot reach the container, automatic discovery will fail. In this case, you can simply select the option to enter the IP address manually during the configuration flow.
{% endnote %}

{% include integrations/config_flow.md %}

If your device was not discovered automatically, you can complete the setup manually:

1. The setup flow will always begin with an active network scan. 
2. If the list of discovered devices is empty, or if you prefer not to select any of the automatically discovered devices, choose the option to enter the IP address manually.
3. Enter the device's IP address and your preferred polling interval.
4. In the final step, you can assign the device to an area and customize its name.

{% note %}
Some of the devices can be run in various modes (e.g. TCP client/server etc.). That means if you are trying to configure a device that is for example in TCP server, the integration will notice that and provide you a choice if you want to switch it to the WEB mode or abort the configuration. We don't support other modes since there is no point of not changing it to WEB mode in that particular case.
{% endnote %}

{% note %}
The device must be powered on and reachable by Home Assistant during the initial setup. The integration cannot be configured with an offline IP address because it needs to fetch the hardware configuration data to create a valid instance.
{% endnote %}

If you need to change your selection during the manual configuration, simply close the setup dialog and start the process again.

## Using the device

This section describes usage of the devices, their nuances and limitations.

Remember that the integration doesn't (and shouldn't) provide the settings of the device, for that there is a web page. But some of the settings will be leaked here for better user experience.

{% note %}
We suggest you to always reset the integration after manipulating with the device from web page, it will bring the integration to real state. You can do so by clicking three dots and *refresh*.
{% endnote %}

### Nuances

Here are nuances that are applicable to all of the devices:

#### Number

There are UI problems with number entities in manual operation, when you are typing the proper number in the field and typing enter, it will automatically send the proper command to the device, but if you are using arrows to increase or decrease the number it will automatically send the number, even if it is not the right number you want.

#### Select

Select entities (e.g. modes of the counters or sensor types) are not polled every scan interval, that means if you are changing it from the web page of the device, Home Assistant can't know that you did it, and it may break the integration.

#### Units

Beware that changing the units in web page shouldn't automatically be present in the integration. Moreover if you change the unit Home Assistant can ask you to recalculate the data for long term statistics.

#### Entities

Some devices (e.g. TH2E) support various types of sensors, that means 1 sensor can create 1 sensor entity while other can create 3, and if you are changing the types, there can be phantom entities. Feel free to delete them, because you can create them back by changing the sensor type and then refreshing the device. The data of the deleted entities will stay intact.

### Quido

The integration provides these entities:

- **Buttons** For massive connecting and disconnecting the coils and resetting the counters
- **Sensors** For counting the pulses and temperature
- **Binary sensor** For watching the state of the inputs.
- **Number**:
  - Decreasing counters by some value (note that value of the counter must be bigger or the same), uses natural numbers, the maximum is 2<sup>32</sup> - 1
  - Connecting (disconnecting) outputs for some time, min: 0.5 s, max: 127.5 s, step: 0.5 s
- **Switch** For changing the state of the output
- **Select** For changing the mode of the counter

[Documentation of the device](https://papouch.com/quido-eth-4-4-4-vstupy-4-vystupy-teplomer-ethernet-p4646/?cid=145&vid=1797) below in download tab.

### TH2E

The integration provides these entities:

- **Sensors** Various sensors depending on the type of the sensor.
- **Buttons** Automatic type configuration of the sensor
- **Select** Manual type configuration of the sensor

[Documentation of the device](https://papouch.com/th2e-ethernetovy-teplomer-s-vlhkomerem-p4825/?vid=2374) below in download tab.

### TME / TME Multi / TME Radio

The integration provides these entities:

- **Sensors** Various sensors depending on the type of the sensor.

Documentation of the [TME](https://papouch.com/tme-ethernetovy-teplomer-p4602/?sti=635677&vid=1879) and [TME Multi/Radio](https://papouch.com/tme-radio-bezdratovy-meric-teploty-a-vlhkosti-p4603/?sti=635678&vid=2965) below in download tab.

### Papago

#### METEO

#### 5HDI DO

#### 2TH

#### TH 2DI DO