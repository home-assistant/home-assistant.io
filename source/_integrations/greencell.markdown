---
title: Greencell
description: Instructions on how to use the Greencell EVSE integration in Home Assistant.
ha_category:
  - Sensor
ha_release: 2025.9
ha_codeowners:
  - '@BrzezowskiGC'
ha_domain: greencell
ha_integration_type: integration
---

The Greencell integration allows to integrate Greencell electric vehicles charging devices into Home Assistant.

## Supported devices

Currently integration support only [HabuDen](https://greencell.global/en/555-ev-chargers#/power-22kw_8_stage_regulation).

## Base functionalities

- Monitoring of the device status
- Measurement of electrical parameters (voltage, current, power)
- We plan to add charging control process

## Communication

Communication is handled via MQTT, and the integration supports:

- Dynamic state updates and device availability detection
- Remote start and stop of charging
- Checking the current charging session and vehicle connection status

{% include integrations/config_flow.md %}

## Integration modes

Greencell offers three levels of integration with Home Assistant to suit different user needs:

| Mode      | Description                                                                                         |
|:----------|:-----------------------------------------------------------------------------------------------------|
| **DISABLE** | Integration disabled – the device does not connect to the MQTT broker, and all entities are disabled. |
| **READ**    | Read only – the device sends measurement data (voltage, current, power), states and ignores commands received on the relevant topic except for the `QUERY` command. Buttons and Number entities are disabled. |
| **EXECUTE** | Full access – the device sends measurement data and responds to commands (`START`, `STOP`, `SET_CURRENT`, `QUERY`) received on the relevant topic. All supported entities are enabled. |

## Supported entities

### Sensors

- **Charging power** – Instantaneous charging power of the EVSE (W).
- **Current phase L1** – Current measurement for phase L1 (A).
- **Current phase L2** – Current measurement for phase L2 (A).
- **Current phase L3** – Current measurement for phase L3 (A).
- **Voltage phase L1** – Voltage measurement for phase L1 (V).
- **Voltage phase L2** – Voltage measurement for phase L2 (V).
- **Voltage phase L3** – Voltage measurement for phase L3 (V).
- **EVSE state** – Current state of the EVSE. Possible values:
  - `UNAVAILABLE`
  - `IDLE`
  - `CONNECTED`
  - `WAITING_FOR_CAR`
  - `CHARGING`
  - `FINISHED`
  - `ERROR_CAR`
  - `ERROR_EVSE`

## Adding a new device

To add a new device:

1. Configure the Greencell device in a mode other than **DISABLE**. This can be done using the Greencell application. More information in section [configuration of device using GC application](#configuration-of-device-using-gc-application)
2. Add the MQTT broker to Home Assistant via the MQTT integration.
3. The device should automatically be discovered, and all available entities created.

## MQTT description

### MQTT topic names

To support multiple devices in a single Home Assistant instance, each device publishes to and subscribes to its own set of MQTT topics. The integration includes the device’s serial number (assigned during manufacturing) in each topic for easy identification. Below is the list of topics used by a given device (replace {SERIAL} with the device’s unique serial number). Additionally, when a new device wants to join the network, the integration can send a discovery message on the broadcast topic.

- `/greencell/evse/{SERIAL}/cmd`
- `/greencell/evse/{SERIAL}/voltage`
- `/greencell/evse/{SERIAL}/current`
- `/greencell/evse/{SERIAL}/power`
- `/greencell/evse/{SERIAL}/status`
- `/greencell/evse/{SERIAL}/device_state`
- `/greencell/broadcast`
- `/greencell/broadcast/device`

### Payload examples

Below is a presentation of the messages exchanged on each topic.

#### /greencell/evse/{SERIAL}/cmd

The message contains commands that the device should execute. Possible command names are `START`, `STOP`, `QUERY`, and `SET_CURRENT`. Command names are case-insensitive. The `SET_CURRENT` command also includes a `current` field specifying the new maximum output current in Amperes.

```json
{
    "name": "START"
}
```

```json
{
    "name" : "SET_CURRENT",
    "current" : 12
}
```

#### /greencell/evse/{SERIAL}/voltage

The message contains the voltages (in volts) for each phase.

```json
{
    "l1" : 230,
    "l2" : 231,
    "l3" : 229
}
```

#### /greencell/evse/{SERIAL}/current

The message contains the currents (in milliamperes) on each phase and the maximal current for each phase (in amperes).

```json
{
    "l1" : 810,
    "l2" : 10987,
    "l3" : 703,
    "i_max" : 32
}
```

#### /greencell/evse/{SERIAL}/power

The message contains the total momentary power (in watts).

```json
{
    "momentary": 11345
}
```

#### /greencell/evse/{SERIAL}/status

The message contains the current charging state of a connected electric/PHEV car. Possible states are:
`UNAVAILABLE`, `IDLE`, `CONNECTED`, `WAITING_FOR_CAR`, `CHARGING`, `FINISHED`, `ERROR_CAR`, `ERROR_EVSE`

```json
{
    "state" : "CHARGING"
}
```

#### /greencell/evse/{SERIAL}/device_state

This message contains information about the current state of Home Assistant integration access and the HEMS current set by HA on the device. It isn't sent synchronously, but can be queried by sending a `QUERY` command on the `/greencell/evse/{SERIAL}/cmd` topic. Possible states are: `READ`, `EXECUTE`, `DISABLED`. The `DISABLED` state is sent only if HA was enabled and the user subsequently disabled it during program execution.

```json
{
    "level" : "EXECUTE",
    "hems_current" : 9
}
```

#### /greencell/broadcast

This topic is used to send a `BROADCAST` command to notify all devices on the local network that a new device is being added to the integration.

```json
{
    "name" : "BROADCAST"
}
```

#### /greencell/broadcast/device

On this topic, devices send their serial numbers in response to a broadcast request.

```json
{
    "id" : "{SERIAL}"
}
```

## Configure your device using the GC App

This section describes how to configure your device for the Home Assistant integration using the **GC App** from Greencell.

> **Prerequisites:** Your device must be nearby. The app connects over Bluetooth Low Energy (BLE), so keep your phone close to the device during setup.

1. Open the GC App and make sure the device is **added to your account**.
2. Go to the device **Settings** (tap the cogwheel in the top-right corner of the device tile).
   The app shows the **Advanced settings** screen:

   ![Advanced settings menu](/images/integrations/greencell/main_menu_screen_greencell_hass.jpeg)

3. In **Advanced settings**, open **Home Assistant**.
   If the device has never been added to Home Assistant or the integration was disabled earlier, you will see the default screen:

   ![Default Home Assistant integration screen](/images/integrations/greencell/default_screen_greencell_hass.jpeg)

4. Enable the integration by toggling the switch. Then tap **Change configuration data** to open the MQTT settings screen:

   ![Device configuration screen](/images/integrations/greencell/device_configuration_screen_greencell_hass.jpeg)

5. Fill in the MQTT connection details:

   - **MQTT broker address** – Hostname or IP of your MQTT broker (for example, `mqtt.local` or `192.168.1.10`).
   - **MQTT broker port** – TCP port of the broker (for example `1883`).
   - **Username** *(optional)* – MQTT username if your broker requires authentication.
   - **Password** *(optional)* – MQTT password for the above user.

6. Tap **Save**. The device stores the settings and attempts to connect to the MQTT broker.
   The app displays a progress view:

   ![Waiting for connection screen](/images/integrations/greencell/waiting_for_connection_screen_greencell_hass.jpeg)

7. Connection result

    - **Connected** – The device successfully connected to the MQTT broker.
    - **Connecting → error after ~30 s** – One of the following is shown:
    - **Network error** – The device can’t reach the MQTT broker (wrong address/port, broker down, or network/firewall issue).
    - **Authentication error** – The device reached the server but failed authentication (wrong username/password).
