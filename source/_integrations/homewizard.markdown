---
title: HomeWizard
description: Instructions on how to integrate HomeWizard into Home Assistant.
ha_release: 2022.2
ha_category:
  - Energy
ha_iot_class: Local Polling
ha_config_flow: true
ha_domain: homewizard
ha_codeowners:
  - '@DCSBL'
ha_platforms:
  - button
  - diagnostics
  - number
  - select
  - sensor
  - switch
ha_zeroconf: true
ha_integration_type: device
ha_quality_scale: platinum
works_with:
  - local
ha_dhcp: true
---

Integration for the [HomeWizard](https://www.homewizard.com/) platform. It can collect data locally from HomeWizard products and create them as sensors in Home Assistant. Use this integration to monitor your energy, gas, and water usage to optimize your energy consumption. The information collected by this integration can be used by the [Energy dashboard](/home-energy-management).

## Supported devices

- [P1 Meter](https://www.homewizard.com/p1-meter/): Sensors for power import/export, energy consumption (single or three phases), and information about your smart meter and gas (model: `HWE-P1`).
- [Energy Socket](https://www.homewizard.com/energy-socket/): Sensors for power import/export and energy consumption, and switches for controlling the outlet (model: `HWE-SKT`).
- [Watermeter](https://www.homewizard.com/watermeter/): Sensors for active and total water usage (model: `HWE-WTR`).
- [kWh Meter 1-Phase](https://www.homewizard.com/kwh-meter/): Sensors for power import/export and energy consumption (model: `HWE-KWH1`, `SDM230-wifi`)..
- [kWh Meter 3-Phase](https://www.homewizard.com/kwh-meter/): Sensors for power import/export and energy consumption (models: `HWE-KWH3`, `SDM630-wifi`).
- [Plug-In Battery](https://www.homewizard.com/plug-in-battery/): Sensors for power import/export, energy consumption, production, and state of charge (model: `HWE-BAT`).

## Enable the API

You have to enable the local API to allow Home Assistant to communicate with your device. Do this in the HomeWizard app:

{% tip %}
You can skip this step if you are configuring one of the following devices:

- Wi-Fi P1 Meter with firmware version 6 or higher
- Wi-Fi kWh Meter with firmware version 5 or higher
- Plug-In Battery

These products use a different authentication method that doesn't require enabling the local API.
{% endtip %}

  1. Go to Settings (gear icon in the upper-right).
  2. Go to 'Meters'.
  3. Select your device.
  4. Scroll down and turn on 'Local API'.

{% include integrations/config_flow.md %}

{% configuration_basic %}
IP address:
  description: "The IP address of your device. You can find it in your router."
{% endconfiguration_basic %}

## Supported functionality

The HomeWizard integration provides sensors about what your device is measuring or doing. All of them are provided as {% term entities %} in Home Assistant. Below is an overview of the entities provided by this integration.

### P1 Meter

_Not all sensors are provided by all Smart Meters, only the available sensors are shown in the integration._

- **Energy import/export (kWh)**: Total energy imported or exported since installation of your smart meter. Each tariff has its own sensor (e.g., T1, T2) and a sensor for the combined value.
- **Power (W)**: Active consumed power measured, each phase has its own sensor. The sensors reading will negative if the power is generated.
- **Voltage (V)**: Active voltage measured, each phase has its own sensor.
- **Current (A)**: Active current measured, each phase has its own sensor.
- **Tariff**: Current tariff that is used. Can be used to keep consumption as low as possible during peak hours.
- **Frequency (Hz)**: Net frequency.
- **Voltage sags and swells**: Number of times a voltage sag or swell has been detected.
- **Power failures**: Two sensors indicate the number of power failures detected by the smart meter. One for all power failures and another for 'long' power failures.
- **Peak demand**: Belgium users are starting to get charged for the peak usage per month (see [capaciteitstarief](https://www.fluvius.be/thema/factuur-en-tarieven/capaciteitstarief)). Two sensors are available: one shows the current quarterly average, and another shows the peak measured this month. Both sensors are provided directly from the smart meter and can be used to keep the peak as low as possible.
- **Status light brightness**: Controls the brightness of the green status light. Error statuses are always visualized, even when the brightness is set to 0.

External meters, like a gas or water meter, can be connected to your Smart meter. Each device is exposed as a separate {% term device %} with its own measurement.

### kWh Meter

- **Energy import/export (kWh)**: Total energy imported or exported measured by kWh meter.
- **Power (W)**: Active consumed power that is measured, each phase has its own sensor. The sensors reading will negative if the power is generated.
- **Production power (W)**: Active production power measured. The reading will negative if the power is consumed. This sensor can be used in the energy dashboard as solar production power sensor.
- **Voltage (V)**: Active voltage measured, each phase has its own sensor.
- **Current (A)**: Active current measured, each phase has its own sensor.
- **Frequency (Hz)**: Net frequency.
- **Reactive power (VAR)**: Active reactive power measurement, each phase has its own sensor.
- **Apparent power (VA)**: Active apparent power measurement, each phase has its own sensor.

### Energy Socket

- **Energy import/export (kWh)**: Total energy imported or exported measured by Energy Socket.
- **Power (W)**: Active power that is measured. The sensors reading will negative if the power is generated.
- **Production power (W)**: Active production power measured. The reading will negative if the power is consumed. This sensor can be used in the energy dashboard as solar production power sensor.
- **Voltage (V)**: Active voltage measured.
- **Current (A)**: Active current measured.
- **Frequency (Hz)**: Net frequency.
- **Reactive power (VAR)***: Active reactive power measurement.
- **Apparent power (VA)***: Active apparent power measurement.

{% note %}
Reactive power and apparent power are not available for all hardware versions, this depends on the internal metering chip.
{% endnote %}

The Energy Socket also has a switch to control the outlet state and a status light that can be controlled.

- **Switch**: Controls the outlet state of the Energy Socket. This switch is permanently on when _Switch Lock_ is turned on. Use this to control the power of simple devices, such as a heater or a charger.
- **Switch lock**: Forces the outlet state to the _on_ position and disables the physical button. This option is useful when the socket is used for a device that must not be turned off, such as a refrigerator.
- **Status light brightness**: Controls the brightness of the green status light. This light turns on when the switch is on.

### Watermeter

- **Water usage (L/min)**: Flow of water measured at that time.
- **Total water usage (m³)**: Total water usage since the installation of the Watermeter.

### Plug-In Battery

- **Energy import/export (kWh)**: Total energy imported or exported by the battery.
- **Power (W)**: Active power consumed or produced by the battery. The sensors reading will negative if the power is generated.
- **Production power (W)**: Active production power measured. The sensors reading will negative if the power is consumed. This sensor is to be used in the energy dashboard as battery power sensor.
- **Voltage (V)**: Active voltage measured.
- **Current (A)**: Active current consumed or produced by the battery.
- **Frequency (Hz)**: Net frequency.
- **Cycles**: Number of charge cycles the battery has gone through.
- **State of charge (%)**: The current state of charge of the battery.
- **Status light brightness**: Controls the brightness of the LED strip. Error statuses are always visualized, even when the brightness is set to 0.

#### Battery group mode

The group of connected Plug-In Batteries can be controlled in three different modes using the **Battery group mode** select entity:

- **Zero mode**: In this mode, the Plug-In Battery works to keep your home's net power consumption or production as close to zero as possible. The battery will automatically charge or discharge to maintain a balanced power flow. This is the default setting and helps you maximize self-consumption and minimize grid interaction.
- **Zero mode (charge only)**: The Plug-In Battery will only charge to absorb excess solar production, aiming to keep your home's power production at zero. Discharging is disabled in this mode. This is useful if you want to store solar energy for later use, such as during the evening or when energy prices are higher.
- **Zero mode (discharge only)**: The Plug-In Battery will only discharge to supply power when your home's consumption exceeds solar production, aiming to keep your home's power consumption at zero. Charging is disabled in this mode. This can be helpful when energy prices are high and you prefer to use stored energy or sell excess solar production to the grid.
- **Manual charge mode**: All connected Plug-In Batteries will be charged to 100%, regardless of the power consumption/production of your home. When all batteries are fully charged, the Plug-In Battery will switch to the standby mode.
- **Standby**: Batteries will enter standby mode. This means that the Plug-In Battery will neither charge nor discharge.

You can find the **Battery group mode** select entity on the device that manages your batteries: either your P1 Meter or kWh Meter, depending on which is set as your mains connection in the HomeWizard app. This entity is not available directly on the battery itself. If you add Plug-In Batteries after your initial setup, the **Battery group mode** entity may be disabled by default; see [I can't find entities](#i-cant-find-entities-like-voltage-current-or-battery-group-mode) for how to enable it.

{% tip %}
"Zero mode (charge only)" and "Zero mode (discharge only)" are only available for:

- P1 Meter with firmware version 6.0300 or higher
- kWh Meter with firmware version 5.0100 or higher

To learn how to update your device to the latest version, see [How do I check if I have the latest software on my HomeWizard product?](https://helpdesk.homewizard.com/en/articles/9167578-how-do-i-check-if-i-have-the-latest-software-on-my-homewizard-product)
{% endtip %}

## Identify

The identify button can be pressed to let the status light blink for a few seconds.
_This feature is not available for the kWh Meter._

## Cloud communication

The HomeWizard Energy devices are designed to work with the HomeWizard Energy app and require communication with the HomeWizard cloud to function with the app. The "Cloud connection" configuration toggle can be used to turn off all communication with the HomeWizard cloud, making the device fully local. The device cannot communicate with the app, and the device won't receive any future firmware updates.

This feature is not available for the Plug-In Battery. Cloud communication is restored when the switch is turned on again. Cloud communications are also restored after a factory reset, or when the device is put in pairing mode.

## Examples

### Send a notification when your washing machine is done

If you know the energy characteristics of your washing machine, you can create an automation that sends a notification when the energy usage drops below a certain threshold. This can notify you when your washing machine is done. You can use the following blueprint for this:

- [Appliance Power Monitor Blueprint With Elapsed Time and Energy Used Variables](https://community.home-assistant.io/t/549073), created by [@Jhonattan-Souza](https://community.home-assistant.io/u/jhonattan-souza)

### Add your Energy data to the Energy dashboard

The HomeWizard Energy integration provides data that can be used in the Energy dashboard. To add your data to the Energy dashboard, follow the steps in the [Energy dashboard documentation](/home-energy-management).

## Data fetching interval

The integration is {% term polling %} new data every 5 seconds. There is no limitation on the number or frequency of requests that can be made to the device.

{% include common-tasks/define_custom_polling.md %}

## Known limitations

### Watermeter cannot be used with batteries

The Watermeter can be powered via a USB-C cable and with batteries. When using batteries, it only connects to Wi-Fi every couple of hours. Because of this, the API can only be used when powered via the USB-C cable. It is not possible to use this integration when the Watermeter is powered by batteries.

### P1 Meter may update slowly

The P1 Meter is updated by the smart meter, which usually updates every 1 or 10 seconds. This means that the P1 Meter may not update as fast as the other devices.

## Troubleshooting

### My device is not showing up

It may happen that you can't find your devices or they won't show up in the integration setup. This can be caused by the following:

- The device is not connected to the network. You have to connect your new device to the network first via the HomeWizard Energy app.
- Make sure you have updated the device to the latest firmware. Follow this guide to learn how to update your device: [How do I check if I have the latest software on my HomeWizard product?](https://helpdesk.homewizard.com/en/articles/9167578-how-do-i-check-if-i-have-the-latest-software-on-my-homewizard-product)
- Make sure you have enabled the local API in device settings via the HomeWizard Energy app.
- Make sure both Home Assistant and the device are on the same network.

### Which button do I need to press to configure the device?

1. During setup, you may be asked to press a button on your device to authenticate it with Home Assistant.  
    - **P1 Meter**: Press the white button on the front of the P1 Meter.  
    - **Plug-In Battery**: Press the black touch button on the front of the device. You will hear a beep.
    - **kWh Meter**: Press and hold the button with the Wi‑Fi icon for two seconds. Release the button before the display shows "AP".
    - **Energy Socket** and **Watermeter**: they do not require this step.
2. After pressing the button, you must select **Continue** within 30 seconds to complete the setup. 
    - If the setup times out, you may need to press the button again.
    
## I can't find entities like voltage, current, or battery group mode

Some entities are disabled by default. You can enable them in the integration setup. See the [enabling or disabling entities](/common-tasks/general/#enabling-or-disabling-entities) documentation for more information.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

After deleting the integration, go to the HomeWizard app and disable the local API if no other integrations are using it.
