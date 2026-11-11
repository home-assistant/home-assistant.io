---
title: Voltie Charger
description: Instructions on how to integrate a Voltie EV charger with Home Assistant.
ha_categories:
  - energy.ev_charging
ha_release: '2026.12'
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@lmate'
  - '@voltie-eu'
ha_domain: voltie_charger
ha_platforms:
  - sensor
ha_integration_type: device
ha_quality_scale: bronze
---

The **Voltie Charger** {% term integration %} connects your [Voltie](https://voltie.eu/) EV charger to Home Assistant. Voltie designs and builds smart AC chargers in Hungary, for homes and businesses. A Voltie charger charges at up to 22 kW on three phases, can share the building's supply with your other appliances (load management), and can charge from the surplus of your solar panels.

The integration talks to the charger directly on your home network, through the charger's local HTTP API. It does not use the Voltie cloud, so it keeps working when your internet connection is down.

## Use cases

With this integration, you can:

- **Follow your charging live**: See the status of the charger, the charging power and current, and how much energy the current session has delivered.
- **Track your energy use**: Add the charger to the [Energy dashboard](/docs/energy/) to see how much energy goes into your car.
- **Get notified**: Receive an alert when the **Status** sensor of the charger shows a fault.

## Supported devices

The integration supports Voltie chargers whose firmware offers HTTP API version 5 or newer:

- Voltie Pro, wall-mounted or on a pedestal, on a single-phase or a three-phase supply

Voltie chargers update their firmware by themselves: while online, a charger installs a new version from the Voltie cloud shortly after it is released. Home Assistant does not show or install firmware updates. The integration checks what the charger reports when it starts. After a firmware update, reload the integration to add the entities that the new firmware supports: go to {% my integrations title="**Settings** > **Devices & services**" %}, select **Voltie Charger**, select the three dots {% icon "mdi:dots-vertical" %} menu next to the entry, and select **Reload**.

## Unsupported devices

The following devices are not supported by the integration:

- Voltie chargers whose firmware offers an HTTP API version older than 5. Connect the charger to the internet so it updates its firmware, then set up the integration.

## Prerequisites

1. Connect the charger to the same network as Home Assistant, over Wi-Fi or Ethernet. Ethernet gives the most stable connection.
2. Find the IP address of the charger, for example, in the list of connected devices of your router. To keep the address from changing, reserve it for the charger in your router.
3. In the Voltie app, go to **Settings** > **Advanced settings** > **Integrations** > **HTTP API**, and turn on the HTTP API of the charger. It is off by default.
4. Optional, but recommended: in the same menu, set a username and a password for the HTTP API. Without them, any device on your network can control the charger. Write the password down: the app cannot show it again once you have set it.
5. If you change the port of the HTTP API there, note the new port. The default port is `5059`.

{% include integrations/config_flow.md %}

### Configuration parameters

{% configuration_basic %}
Host:
  description: "The hostname or IP address of your Voltie charger on your home network. For example, `192.168.1.50`."
Port:
  description: "The port of the HTTP API of the charger. The default is `5059`. Keep it, unless you changed it in the Voltie app."
Username:
  description: "The username of the HTTP API of the charger, if you set one in the Voltie app. This is not the email address of your Voltie account. Leave it empty if you did not set one."
Password:
  description: "The password of the HTTP API of the charger, if you set one in the Voltie app. Enter both a username and a password, or neither."
{% endconfiguration_basic %}

If you change the username or the password of the HTTP API in the Voltie app later, remove the integration entry and add the charger again with the new ones.

If the charger gets a new IP address, remove the integration entry and add the charger again with the new address.

## Supported functionality

Each charger is added as a {% term device %} named **Voltie Charger**, followed by the last four characters of its charger ID, for example, **Voltie Charger 1234**. The examples on this page use entity IDs such as `sensor.voltie_charger_1234_status`. Home Assistant creates the entity IDs in the language it is set to, so on a system in another language, your entity IDs can differ.

The integration only creates the entities that your charger supports. It leaves out the readings that the firmware of the charger does not report, such as **Total energy** on older firmware.

### Sensors

{% tip %}
To track the energy that goes into your car, go to {% my config_energy title="**Settings** > **Dashboards** > **Energy**" %} and add the **Total energy** sensor of your charger as an individual device. If your charger does not have the **Total energy** sensor, use **Session energy** instead.
{% endtip %}

- **Status**: What the charger is doing. The following states are not faults:
  - **No car connected** ({% term state %}: `ev_not_connected`)
  - **Car connected** ({% term state %}: `ev_connected_not_charging`): A car is plugged in, but it is not charging.
  - **Charging** ({% term state %}: `ev_connected_charging`): A car is plugged in and charging, or ready to charge.
  - **Charging with ventilation** ({% term state %}: `ev_connected_charging_ventilation`): The same as **Charging**, for a car that asks for ventilation.
  - **Sleeping** ({% term state %}: `sleeping`): A power-saving state that current firmware does not use.
  - **Out of service** ({% term state %}: `disabled`)
  - **Starting up** ({% term state %}: `booting`)
  - **Updating firmware** ({% term state %}: `firmware_update`)
  - **Undetermined** ({% term state %}: `undetermined`)

  The following states are faults:
  - **Car fault** ({% term state %}: `ev_fault`)
  - **Diode check failed** ({% term state %}: `diode_check_failed`)
  - **Humidity too high** ({% term state %}: `over_humidity`)
  - **Internal bus error** ({% term state %}: `i2c_bus_error`)
  - **MID meter missing** ({% term state %}: `mid_meter_missing`)
  - **No ground** ({% term state %}: `no_ground`)
  - **Overcurrent** ({% term state %}: `over_current`)
  - **Overvoltage** ({% term state %}: `overvoltage`)
  - **PE-N fault** ({% term state %}: `pe_n_fault`)
  - **Phase misconnected** ({% term state %}: `phase_misconnected`)
  - **Residual current fault** ({% term state %}: `gfci_fault`)
  - **Residual current self-test failed** ({% term state %}: `gfi_self_test_failure`)
  - **Shut down** ({% term state %}: `shutdown`)
  - **Stuck relay** ({% term state %}: `stuck_relay`)
  - **Temperature too high** ({% term state %}: `over_temperature`)
  - **Undervoltage** ({% term state %}: `undervoltage`)
  - **Unknown power board** ({% term state %}: `power_board_unknown`)

  A fault code that is newer than the integration shows as unknown.
- **Charging power**: The power the charger delivers to the car, in kilowatts (kW).
- **Charging current**: The current the charger delivers to the car, in amperes (A).
- **Session energy**: The energy delivered in the current session, in kilowatt-hours (kWh). It starts from 0 in each new session, and reads 0 while no car is connected.
- **Total energy**: The lifetime energy reading of the charger, in kilowatt-hours (kWh). Only created when the firmware of the charger reports this reading. This is the sensor to use in the Energy dashboard.

<!-- TODO(Voltie): name the first charger software version that reports the lifetime energy reading (Total energy). -->

## Data updates

The integration {% term polling polls %} the charger on your local network:

- **Every 30 seconds**: The live status, for the sensors.

To poll at a different interval, see [Defining a custom polling interval](/common-tasks/general/#defining-a-custom-polling-interval).

## Known limitations

- Home Assistant does not discover Voltie chargers on your network. Add the charger with its IP address.
- The integration only reads the charger. To start or stop charging, or to change the settings of the charger, use the Voltie app.
- The integration checks what the charger reports when it starts. After a firmware update, reload the integration to add the entities that the new firmware supports.
- The **Session energy** sensor reads 0 while no car is connected, and starts from 0 in each new session. For the Energy dashboard, use the **Total energy** sensor when your charger has it. On chargers without a MID meter, the **Total energy** reading may only go up when a session ends, so the Energy dashboard counts the whole session in the hour it ends.
- The HTTP API of the charger uses plain HTTP, without encryption. Keep the charger on a network you trust, and set a username and password for the HTTP API.
- Charging schedules, prepaid RFID balances, and the users of the charger are managed in the Voltie app. The integration does not offer them.
- The charger installs firmware updates by itself, so Home Assistant does not show them.

## Troubleshooting

{% details "Can't connect to the charger" %}

### Symptom: "Failed to connect"

When you set up the integration, the form shows the message **Failed to connect**. Or, after the setup, the entities of the charger are unavailable.

#### Description

Home Assistant cannot reach the HTTP API of the charger at the address and port you entered.

#### Resolution

1. Make sure the charger is powered on and connected to your network, and that the Voltie app shows it as online.
2. Check the IP address of the charger in the list of connected devices of your router. If it has changed, remove the integration entry and add the charger again with the new address. To keep the address from changing, reserve it for the charger in your router.
3. Make sure the HTTP API is turned on in the Voltie app (see [Prerequisites](#prerequisites)), and that the port matches the one in the app.
4. On a computer on the same network, open `http://192.168.1.50:5059/status` in a browser, with the IP address and the port of your charger. If the HTTP API works, the browser shows the status of the charger as JSON text. If the browser asks for a username and password, enter the ones of the HTTP API.
5. If Home Assistant and the charger are on different network segments (VLANs or subnets), allow traffic from Home Assistant to the charger on the port of the HTTP API.

{% enddetails %}

{% details "Wrong username or password" %}

### Symptom: "Invalid authentication"

When you set up the integration, the form shows the message **Invalid authentication**. Or, after you changed the username or the password of the HTTP API in the Voltie app, the entities of the charger are unavailable.

#### Description

The charger rejected the username and password. These are the credentials of the HTTP API that you set in the Voltie app. They are not the email address and password of your Voltie account.

#### Resolution

1. Enter the username and password of the HTTP API that you set in the Voltie app.
2. If you forgot the password, set a new one in the Voltie app, because the app cannot show it again.
3. If you changed the username or the password after the setup, remove the integration entry, and add the charger again with the new ones.
4. If the form shows **Enter both a username and a password, or neither**, fill in both fields, or leave both empty.

{% enddetails %}

{% details "A different charger answers at the address" %}

### Symptom: "A different Voltie charger answers"

The entities of the charger are unavailable, and Home Assistant reports that a different Voltie charger answers at the address of the charger.

#### Description

The address now belongs to another Voltie charger. This happens, for example, when your router gives the old IP address of your charger to another charger.

#### Resolution

1. Find the current IP address of your charger in the list of connected devices of your router.
2. Remove the integration entry, and add the charger again with its new address.
3. To keep the addresses from changing, reserve an IP address for each charger in your router.

{% enddetails %}

{% details "The firmware is too old" %}

### Symptom: "The firmware of the Voltie charger is too old for this integration"

The integration does not load, and its entry shows that the firmware of the Voltie charger is too old for this integration. Or, when you add the charger, the form shows that its firmware is too old.

#### Description

The charger runs firmware with an HTTP API version older than 5 (see [Supported devices](#supported-devices)).

#### Resolution

1. Connect the charger to the internet. While online, it installs the latest firmware from the Voltie cloud by itself.
2. Go to {% my integrations title="**Settings** > **Devices & services**" %}, select **Voltie Charger**, and reload the entry. If you were adding the charger, add it again.
3. If the firmware does not update, contact Voltie support at help@voltie.eu.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

After you remove the integration, you can turn off the HTTP API of the charger in the Voltie app, in the same menu where you turned it on (see [Prerequisites](#prerequisites)). Leave it on if another system still uses it.
