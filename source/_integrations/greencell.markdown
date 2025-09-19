---
title: Greencell
description: Instructions on how to use the Greencell EVSE integration in Home Assistant.
ha_category:
  - Sensor
ha_iot_class: Local Polling
ha_release: 2025.10
ha_codeowners:
  - '@BrzezowskiGC'
ha_domain: greencell
ha_integration_type: integration
---

## Prerequisites

- Greencell GC App
- Greencell GC account

The **Greencell** {% term integration %} allows to integrate Greencell electric vehicles charging devices into Home Assistant.

## Adding a device to the Greencell GC App

### Prerequisites

- The app connects over Bluetooth Low Energy (BLE), so keep your phone close to the device during setup.

### To add a device to the Greencell GC App

Instructions on adding the device are available in the [official installation guide (PDF)](https://docs.greencell.global/manuals/GC-HabuDen-Installation.pdf). Refer to Chapter 8, starting on **page 24**.

## Configure your device using the GC App

### Prerequisites

- The device must be [added to the Greencell GC App](#adding-a-device-to-the-greencell-gc-app) before you can add it to the Greencell integration in Home Assistant
- The app connects over Bluetooth Low Energy (BLE), so keep your phone close to the device during setup.
- After the device has been configured and added, the app is no longer required for day-to-day use.

### To configure a device using the Greencell GC App

1. Open the GC App and make sure the device is **added to your account**.
2. Go to the device **Settings** (tap the cogwheel in the top-right corner of the device tile).
   The app shows the **Settings** screen:

   ![Advanced settings menu](/images/integrations/greencell/main_menu_screen_greencell_hass.jpeg)

3. In **Settings**, open **Home Assistant**.
   If the device has never been added to Home Assistant or the integration was disabled earlier, you will see the default screen:

   ![Default Home Assistant integration screen](/images/integrations/greencell/default_screen_greencell_hass.jpeg)

4. Enable the integration by toggling the switch. Then tap **Change configuration data** to open the MQTT settings screen:

   ![Device configuration screen](/images/integrations/greencell/device_configuration_screen_greencell_hass.jpeg)

5. Fill in the MQTT connection details:

   - **MQTT server address** – Hostname or IP of your MQTT broker (for example, `mqtt.local` or `192.168.1.10`).
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

## Supported devices

Currently, the integration supports only [HabuDen](https://greencell.global/habuden) devices.

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

## Adding a new device to Home Assistant

To add a new device to Home Assistant, follow these steps::

1. Add the Greencell device to the Greencell GC App and configure device in a mode other than **DISABLE**.
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

## Known limitations

In the initial release, the integration does **not** support device control (START/STOP and current setting). This is due to the initial submission including a single platform. Control options will be added in subsequent releases.

## Troubleshooting

### Can’t set up the device

#### Symptom: “No device responded to the discovery request”

When trying to set up the integration, the form shows the message “No device responded to the discovery request”.

#### Description

No device responded within 30 s to the broadcast discovery message sent by the Greencell integration.

#### Resolution

To resolve this issue, try the following steps:

1. Ensure the device is connected to a Wi-Fi network.
2. Verify the device has been configured in the GC App and that Home Assistant integration is enabled.
3. Check MQTT broker settings:
   - Address/hostname and port are correct.
   - Credentials (username/password) are correct (if required).
4. Confirm the broker is reachable from your HA host (firewall, Docker network, VLANs).
5. Make sure no software (firewall/IPS) is blocking access to the broker.

### My device is unavailable

#### Description

After successful configuration, the device stops reporting and becomes unavailable.

#### Resolution

To resolve this issue, try the following steps:

1. Check that the device is powered.
2. Ensure it remains connected to Wi-Fi (signal strength, AP roaming).
3. Verify in the GC App that the device shows **Connected** and HA integration is enabled.
4. Inspect MQTT broker logs for disconnects/auth failures and confirm the device is publishing topics.
5. If the above does not help, contact Greencell Support.

### My device shows "car error" or "EVSE error" state

#### Description

The device state sensor indicates a **car error** or **EVSE error**.

#### Resolution

To resolve this issue, try the following steps:

1. Check your car for reported charging errors or notifications.
2. In the GC App, review the specific error reported by the device.
3. Contact Greencell Support and include the error details gathered above.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

After deleting the integration, go to the app of the manufacturer and remove the Home Assistant integration from there as well.
