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

{% note %}
This will be active if DHCP is enabled in the device.
{% endnote %}

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

While the device's built-in web interface remains the primary place for core configuration, this integration exposes certain settings directly within Home Assistant for your convenience.

{% important %}
If you change settings directly via the device's web interface, the integration will not automatically detect all of these changes. We highly recommend **reloading** the integration (Settings > Devices & Services > three dots > **Reload**) after making external changes to keep the states synchronized.
{% endimportant %}

### Known limitations and nuances

This section describes various limitations and nuances that can/will happen during using the devices.

#### Number entities

When adjusting a `number` entity using the up/down arrows in the Home Assistant UI, every single step immediately sends a command to the device. To jump to a specific value without sending intermediate commands, type the exact number directly into the input field and press Enter.

#### Select entities

Select entities (such as counter modes or sensor types) are not continuously polled. If you change them directly on the device's web interface, Home Assistant will be unaware of the change until the integration is reloaded.

{% warning %}
Changing the operating mode via a `select` entity causes the physical device to restart. For this reason, it is strongly advised **not** to use these select entities in automations.
{% endwarning %}

#### Units of measurement

Changing the physical unit of measurement on the device's web interface will not automatically update the unit in Home Assistant. Doing so may also disrupt your long-term statistics and require you to fix the historical data manually.

#### Dynamic entities

Some devices (e.g., TH2E) expose a variable number of entities depending on the configured sensor type. If you change the sensor type, some previously active entities may become unavailable. You can safely delete these orphaned entities from Home Assistant; their historical data will remain intact, and they will be recreated if you ever switch the sensor type back. But this doesn't mean that entities will be created, use a restart button for that.

### Quido

The integration provides the following entities for Quido devices:

- **Binary sensor**: Watches the state of digital inputs.
- **Button**: Allows bulk connecting/disconnecting of all outputs and resetting counters.
- **Number**:
  - Decreasing counters by a specific value (up to 2<sup>32</sup> - 1).
  - Setting the output connection/disconnection duration (from 0.5 s to 127.5 s with 0.5s step).
- **Select**: Changes the operation mode of the input counters.
- **Sensor**: Reads temperature and pulse counts.
- **Switch**: Changes the state of individual outputs.

The official manual can be found in the downloads section of the [Quido product page](https://papouch.com/quido-eth-4-4-4-vstupy-4-vystupy-teplomer-ethernet-p4646/?cid=145&vid=1797).

### TH2E

The integration provides the following entities for TH2E devices:

- **Button**: Triggers automatic configuration of the connected sensor type. Does restart.
- **Select**: Allows manual selection and configuration of the connected sensor type.
- **Sensor**: Provides environmental readings depending on the configured sensor type.

For more details, see the official manual available in the downloads section of the [TH2E product page](https://papouch.com/th2e-ethernetovy-teplomer-s-vlhkomerem-p4825/?vid=2374).

### TME / TME Multi / TME Radio

The integration provides the following entities for TME devices:

- **Sensor**: Provides environmental readings depending on the connected sensor type.

For more details, see the official manuals available in the downloads section of the [TME](https://papouch.com/tme-ethernetovy-teplomer-p4602/?sti=635677&vid=1879) and [TME Multi/Radio](https://papouch.com/tme-radio-bezdratovy-meric-teploty-a-vlhkosti-p4603/?sti=635678&vid=2965) product pages.

### Papago

Papago is a name for a whole family of devices.

#### METEO

The integration provides these entities:

- **Buttons** Automatic type configuration of the sensor.
  - Only for sensors A and B, since sensor C can have only 1 possible type of a sensor.
  - Note that this doesn't lead to the restart.
- **Sensors** Various sensors depending on the type of the sensor.

The official manual can be found in the downloads section of the [Quido product page](https://papouch.com/quido-eth-4-4-4-vstupy-4-vystupy-teplomer-ethernet-p4646/?cid=145&vid=1797).

#### 5HDI DO

The integration provides the following entities for Quido devices:

- **Binary sensor**: Watches the state of digital inputs.
- **Button**: Allows bulk connecting/disconnecting of all outputs and resetting counters.
- **Number**:
  - Decreasing counters by a specific value (up to 2<sup>32</sup> - 1).
  - Setting the output connection/disconnection duration (from 0.5 s to 127.5 s with 0.5s step).
- **Select**: Changes the operation mode of the input counters.
- **Sensor**: Reads temperature and pulse counts.
- **Switch**: Changes the state of individual outputs.

The official manual can be found in the downloads section of the [Quido product page](https://papouch.com/quido-eth-4-4-4-vstupy-4-vystupy-teplomer-ethernet-p4646/?cid=145&vid=1797).


#### 2TH

#### TH 2DI DO

## Notes

As we all know the local network can be unstable and because of that Home Assistant can get scared and show that the device is broken or something like that. Don't worry you can just wait or delete the device and configure it again, we suggest you to do reconfigurations whenever something is broken. 
