---
title: Papouch
description: Instructions on how to integrate Papouch devices into Home Assistant.
ha_category:
  - Sensor
ha_release: 2026.8
ha_iot_class: Local Polling
ha_domain: papouch
ha_config_flow: true
ha_codeowners:
  - '@VladislavLevitskii'
ha_platforms:
  - sensor
ha_integration_type: device
ha_quality_scale: bronze
---

The **Papouch** integration allows you to integrate your [Papouch](https://papouch.com/) hardware devices into Home Assistant.

The integration polls the device at the interval you choose and updates the corresponding Home Assistant sensor entities.

{% include integrations/config_flow.md %}

## Supported devices

Currently, only Ethernet devices in **WEB** mode are supported. The integration provides sensor entities for the following devices based on their connected hardware and configuration:

- **Quido ETH** (Input/output modules): Reads temperature and pulse counts. ([Official manual](https://papouch.com/quido-eth-4-4-4-vstupy-4-vystupy-teplomer-ethernet-p4646/?cid=145&vid=1797)).
- **TH2E** (Thermometers and environmental sensors): Provides environmental readings depending on the configured sensor type. ([Official manual](https://papouch.com/th2e-ethernetovy-teplomer-s-vlhkomerem-p4825/?vid=2374)).
- **TME / TME Multi / TME Radio** (Multi-channel thermometers): Provides environmental readings depending on the configured sensor type. ([TME manual](https://papouch.com/tme-ethernetovy-teplomer-p4602/?sti=635677&vid=1879), [TME Multi/Radio manual](https://papouch.com/tme-radio-bezdratovy-meric-teploty-a-vlhkosti-p4603/?sti=635678&vid=2965)).
- **Papago** (Ethernet sensors and meteo stations):
  - **Meteo**: Provides environmental readings depending on the type of the sensor. ([Official manual](https://papouch.com/papago-meteo-eth-zakladna-prumyslove-meteostanice-s-ethernetem-a-poe-p6878/?vid=4887)).
  - **5HDI DO**: Reads temperature and pulse counts. ([Official manual](https://papouch.com/papago-5hdi-do-eth-5-digitalni-vstup-a-1-rele-p3132/)).
  - **2TH**: Provides environmental readings depending on the type of the sensor. ([Official manual](https://papouch.com/papago-2th-eth-2-mereni-teploty-vlhkosti-a-rosneho-bodu-s-ethernetem-p2989/)).
  - **TH 2DI DO**: Reads temperature, pulse counts, and various environmental metrics depending on the type of the sensor. ([Official manual](https://papouch.com/papago-th-2di-do-eth-environment-monitor-p3159/)).

## Configuration

{% configuration_basic %}
IP address:
  description: The IP address of your Papouch device on the local network.
Polling interval:
  description: The frequency in seconds at which Home Assistant will fetch new data from the device.
Password:
  description: An optional password to access the device if authentication is enabled.
{% endconfiguration_basic %}

Setup:

1. Enter the device's IP address, your preferred polling interval, and the admin password (if set).
2. In the final step, you can assign the device to an area and customize its name.

{% note %}
If the device doesn't have any password set and you provide one in the setup, it will work; however, the reverse will fail if the device expects a password that is not provided.
{% endnote %}

{% note %}
Some devices can run in different modes, like TCP client or TCP server. If you try to set up a device that is not in **WEB** mode, the integration will abort the setup. These modes are not supported, and the device must run in **WEB** mode for the integration to work.
{% endnote %}

{% note %}
The device must be powered on and reachable by Home Assistant during the initial setup. The integration cannot be configured with an offline IP address because it needs to fetch the hardware configuration data to create a valid instance.
{% endnote %}

If you need to change your selection during setup, close the setup dialog and start the process again.

## Using the device

For now, the integration only provides `sensor` entities to read data from the devices. Support for controlling outputs and configuring settings will be added in future updates.

### Known limitations

#### Units of measurement

Changing the physical unit of measurement on the device's web interface will not automatically update the unit in Home Assistant. Doing so may also disrupt your long-term statistics and require you to fix the historical data manually.

#### Dynamic entities

Some devices (for example, TH2E) expose a variable number of entities depending on the configured sensor type. If you change the sensor type in the device web interface, some previously active entities may become unavailable. You can safely delete these orphaned entities from Home Assistant. Their historical data will remain intact, and they will be recreated if you switch the sensor type back. To recreate entities after changing hardware configurations, reload the integration (**Settings** > **Devices & services** > three-dot menu > **Reload**).

## Troubleshooting

The integration detects supported sensors and outputs during its initial setup. If you change the physical configuration of your Papouch device (for example, plugging a new sensor into an empty port, or switching a port's operating mode between a thermometer and a hygrometer), the new entities will not appear automatically, and the old ones will not be removed.

To apply these hardware changes:

1. Make sure your device has fully restarted and is working with the new configuration.
2. Navigate to **Settings** > **Devices & services**.
3. Select the three-dot menu next to your Papouch integration, then select **Reload**.

The integration will fetch the updated hardware layout and create the new entities. The old entity (for example, the previous thermometer) will become `unavailable`, and you can manually delete it from the Home Assistant entity registry. Thanks to MAC address identification, you will not lose any historical data for the sensors that remained untouched.