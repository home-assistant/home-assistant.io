---
title: Besen
description: Instructions on how to integrate Besen EV chargers over Bluetooth Low Energy or your local network with Home Assistant.
ha_categories:
  - energy.ev_charging
ha_release: 2026.9
ha_iot_class: Local Push
ha_codeowners:
  - '@moryoav'
ha_domain: besen
ha_bluetooth: true
ha_platforms:
  - diagnostics
  - number
  - select
  - sensor
  - switch
ha_config_flow: true
ha_integration_type: device
ha_quality_scale: platinum
---

The **Besen** {% term integration %} connects Home Assistant to Besen EV chargers over Bluetooth Low Energy or your local network.

This integration talks directly to the charger through Home Assistant's [Bluetooth](/integrations/bluetooth) stack or over Wi-Fi using its local network address. Both connections provide the same entities and charging controls.

## Supported devices

The following device has been verified to work with this integration:

- [Besen BS20 EV Charging Station](https://www.besen-group.com/products/ev-charging-station/bs20/)

Other Besen chargers using the same `ACP#` Bluetooth protocol may also work.

## Prerequisites

- A compatible Besen charger.
- The charger's 6-digit PIN.

For Bluetooth, the charger must advertise as `ACP#...`. You need a Bluetooth adapter or ESPHome Bluetooth proxy that supports active GATT connections. ESPHome Bluetooth proxies need active connections enabled. Each connected charger uses one active GATT connection slot on the selected proxy.

For a local network (LAN) connection, connect the charger to Wi-Fi using its mobile app first. Find its IP address in your router's connected-device list. Home Assistant must be able to reach the charger on that network. A Bluetooth adapter or proxy is not required for LAN control.

Allow incoming UDP traffic on port 28376 to Home Assistant and UDP traffic to the charger's command port, normally 7248. If you run Home Assistant Container, use host networking so it can receive the charger's announcements. LAN communication is unencrypted. Use a trusted local network and do not forward these ports from the internet.

{% include integrations/config_flow.md %}

Home Assistant can discover chargers that advertise as `ACP#...` over Bluetooth. If your charger is not discovered automatically, add the integration manually. Select a charger from the **Device** list for Bluetooth, or enter its IP address or hostname in **LAN address (optional)** for LAN. Enter the charger's PIN for either connection. If you enter a LAN address, Home Assistant uses LAN even if you also select a Bluetooth device.

{% configuration_basic %}
Device:
  description: "The discovered Besen charger to set up over Bluetooth. Leave this empty to use LAN."
LAN address (optional):
  description: "The IP address or hostname of a charger already connected to Wi-Fi. Leave this empty to use Bluetooth."
PIN:
  description: "The charger's 6-digit PIN. Many units default to 123456."
{% endconfiguration_basic %}

### Change the connection

To change an existing charger's connection or update its LAN address:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select **Besen**.
2. Open the {% icon "mdi:dots-vertical" %} menu for the charger and select **Reconfigure**.
3. Select **Use LAN** or **Use Bluetooth**.
4. For LAN, enter **Charger address** and **Charger PIN**. For Bluetooth, enter **Charger PIN**.
5. Submit the form and wait for Home Assistant to verify the connection.

Home Assistant saves the new connection only after verification. Your existing entities and history are kept. If verification fails or you cancel setup, the previous connection settings are kept.

Before switching an existing Bluetooth charger to LAN, Home Assistant needs its serial number from a previous successful connection. A charger first added through LAN has no saved Bluetooth address and cannot switch to Bluetooth through Reconfigure.

Home Assistant uses one selected connection per charger. If it disconnects, Home Assistant retries that connection. It does not automatically switch between LAN and Bluetooth.

## Supported functionality

### Switch

The {% term integration %} provides a **Charge** switch to start or stop charging.

The switch state follows the charging state reported by the charger. It stays off while a scheduled start is pending. To cancel a scheduled start, use the [**Turn off switch**](/actions/switch.turn_off/) action on the **Charge** switch. Because the switch is already off at that point, its toggle on a dashboard cannot send that command.

### Number

The **Charging current** number sets the maximum current the charger can use. The available range starts at 6&nbsp;A and ends at the maximum reported by the charger. Home Assistant uses 32&nbsp;A if the charger does not report a maximum.

### Select

The **Temperature unit** select sets the temperature display on the charger's screen to **Celsius** or **Fahrenheit**. This setting does not change the unit system or temperature sensor display units in Home Assistant.

### Sensors

The following sensors are enabled by default:

- **Charging power**: Current charging power reported by the charger in watts (W).
- **Total energy**: Lifetime energy reported by the charger in kilowatt-hours (kWh). Use this sensor when adding the charger to the [Energy dashboard](/home-energy-management).
- **Session energy**: Energy delivered during the current or most recently completed charging session in kilowatt-hours (kWh). This value can reset when a new session starts, so it is not recommended for the Energy dashboard.
- **Session start**: When the charger started the current or most recently completed charging session.
- **Session duration**: Elapsed time of the current or most recently completed charging session reported by the charger in seconds (s).
- **Internal temperature**: Temperature measured inside the charger in degrees Celsius (°C).
- **Charging status**: High-level charging state reported by the charger.
- **Charging message**: Additional guidance reported for the current charging state.

The **Charging status** sensor reports **Scheduled** (`scheduled`) while a scheduled start is pending. If your automations, scripts, or templates use `canceled` for this state, change it to `scheduled`.

The following sensors are disabled by default:

- **Session current limit**: Current limit recorded for the charging session in amperes (A). This usually matches the **Charging current** setting.
- **Scheduled start**: Start time of a scheduled charging session. For a session that starts immediately, such as one started with the **Charge** switch, this is the time charging was requested.
- **Charging time limit**: Time after which the charger ends the charging session in minutes (min). The value is unknown when no limit is set, which includes sessions started with the **Charge** switch.

The **Scheduled start** and **Charging time limit** sensors report values only while a scheduled start is pending or a charging session is running. Otherwise, their state is unknown.

To set a scheduled start or a charging time limit from Home Assistant, use the [**Start charging** action](/actions/besen.start_charging/). The sensors also report values set elsewhere, for example in the charger's mobile app.

The following diagnostic sensors are disabled by default:

- **External temperature**: External temperature reported by the charger in degrees Celsius (°C).
- **Error state**: Detailed charger fault state.
- **Plug state**: Connection and lock state reported for the charging plug.
- **Output state**: Low-level state of the charger output.
- **Current state**: Low-level operating state reported by the charger.
- **L1 voltage** and **L1 current**: Voltage and current reported for phase L1.
- **L2 voltage**, **L2 current**, **L3 voltage**, and **L3 current**: Voltage and current reported for phases L2 and L3. These sensors are created only for three-phase chargers.

To use an entity that is disabled by default, [enable the entity](/docs/configuration/customizing-devices/#disabling-or-enabling-an-entity) from the charger device page.

## Actions

Use the standard entity actions to control the charger:

- `switch.turn_on` starts charging.
- `switch.turn_off` stops charging and cancels a scheduled start.
- `number.set_value` sets the charging current.
- `select.select_option` changes the temperature unit shown on the charger's screen.

{% include integrations/actions.md %}

## Besen automation examples

Charging when electricity is cheapest is a common use of this integration. Here are a few ideas to get you started. To let the charger start and stop by itself, see the examples for the [**Start charging**](/actions/besen.start_charging/) action.

{% include docs/paste_yaml_tip.md %}

### Automation: start charging when the off-peak tariff starts

Start charging every evening when your off-peak tariff begins.

- **Trigger**: Time: 23:00
- **Action**: Turn on switch
  - **Target**: Charge switch of the charger (`switch.besen_charge`)

{% details "YAML example for starting charging when the off-peak tariff starts" %}

{% example %}
automation: |
  alias: "Start EV charging off peak"
  triggers:
    - trigger: time
      at: "23:00:00"
  actions:
    - action: switch.turn_on
      target:
        entity_id: switch.besen_charge
{% endexample %}

{% enddetails %}

### Automation: stop charging before the peak tariff starts

Stop charging every afternoon before your peak tariff begins.

- **Trigger**: Time: 17:00
- **Action**: Turn off switch
  - **Target**: Charge switch of the charger (`switch.besen_charge`)

{% details "YAML example for stopping charging before the peak tariff starts" %}

{% example %}
automation: |
  alias: "Stop EV charging before peak tariff"
  triggers:
    - trigger: time
      at: "17:00:00"
  actions:
    - action: switch.turn_off
      target:
        entity_id: switch.besen_charge
{% endexample %}

{% enddetails %}

## Data updates

The charger sends status updates after login through Bluetooth notifications or LAN messages. Home Assistant keeps the selected connection active, listens for updates, and responds to charger heartbeats. If updates stop, the integration reconnects automatically using the selected connection.

Sensor values update when the charger sends status and charging-session messages. The temperature unit select updates after a command is sent successfully and when the charger reports the setting. An entity shows an `unknown` value until the charger reports its corresponding value. All charger entities become `unavailable` while the selected connection is unavailable or authentication is incomplete.

This is a local push integration. There is no cloud dependency.

## Known limitations

The integration does not support:

- Changing charger settings such as language, LCD brightness, or device name.
- Reporting Bluetooth signal strength as an entity.
- Wi-Fi provisioning.
- Password reset.
- Device reset.
- Charging history download.
- Firmware updates through Home Assistant.
- Safety-certified load balancing.

## Troubleshooting

### The charger is not discovered

#### Symptom: The charger is missing from setup

Home Assistant does not discover the charger automatically.

#### Resolution

To resolve this issue, try the following steps:

1. Confirm the charger appears in **Settings** > **Connectivity** > **Bluetooth** > **Advertisement monitor** as `ACP#...`.
2. Move an ESPHome Bluetooth proxy closer to the charger.
3. Make sure the proxy is added to Home Assistant through the ESPHome integration.
4. Run an active scan or temporarily place a local Bluetooth adapter near the charger.

### No connectable Bluetooth path is available

#### Symptom: "No connectable Bluetooth path is available"

When setting up or loading the integration, Home Assistant reports that no connectable Bluetooth path is available.

#### Description

The charger may be visible only through a passive or non-connectable adapter. The charger can keep only one active Bluetooth client connection.

#### Resolution

To resolve this issue, try the following steps:

1. Use an ESPHome Bluetooth proxy with active connections enabled, or a local Bluetooth adapter supported by Home Assistant.
2. Stop any app, bridge, container, add-on, or service that may already be connected to the charger.

### The charger becomes unavailable

#### Symptom: The charge switch is unavailable

The charge switch becomes unavailable after the integration was set up.

#### Resolution

For a LAN connection, check that the charger is connected to Wi-Fi and its address is correct. Use **Reconfigure** > **Use LAN** to update a changed address. Check that incoming UDP port 28376 is available to Home Assistant and traffic can reach the charger's command port, normally 7248. Another application using Home Assistant's UDP port 28376 can prevent the integration from loading.

For Bluetooth, try the following steps:

1. Check **Settings** > **Connectivity** > **Bluetooth** > **Connection monitor**.
2. Verify the proxy has free active connection slots.
3. Stop any old MQTT bridge or companion process that may still hold the charger's Bluetooth connection.
4. Prefer Ethernet ESPHome Bluetooth proxies when possible.
5. Avoid placing the proxy next to strong Wi-Fi or USB 3.0 interference sources.

### The PIN is rejected

#### Symptom: The charger rejected the PIN

During setup, Home Assistant reports that the charger rejected the PIN. If the PIN is changed on the charger after setup, Home Assistant detects the rejected PIN and starts a reauthentication flow. The charger's entities stay unavailable, and the integration stops reconnecting until you enter the current PIN.

#### Resolution

- During setup, enter the current 6-digit PIN.
- If Home Assistant asks you to reauthenticate, follow the reauthentication notification and enter the current 6-digit PIN. Home Assistant checks the PIN with the charger and reloads the integration without removing your entities or automations.

A network disconnection alone does not require reauthentication. Check the selected connection if the charger is unavailable without a PIN rejection.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
