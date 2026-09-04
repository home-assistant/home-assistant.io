---
title: OpenEVSE
description: Instructions on how to integrate OpenEVSE charging stations with Home Assistant.
ha_category:
  - Binary sensor
  - Car
  - Energy
  - Select
  - Sensor
  - Switch
ha_release: 0.38
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@c00w'
  - '@firstof9'
ha_domain: openevse
ha_zeroconf: true
ha_platforms:
  - binary_sensor
  - button
  - diagnostics
  - number
  - select
  - sensor
  - switch
ha_integration_type: device
ha_quality_scale: silver
---

The **OpenEVSE** {% term integration %} connects your Home Assistant installation to an [OpenEVSE](https://www.openevse.com/) electric vehicle charging station that runs the OpenEVSE Wi-Fi firmware. The integration talks to the charger locally over your home network, so it works without an internet connection and without a cloud account.

Use the integration to monitor your <abbr title="electric vehicle">EV</abbr> charging sessions, track energy consumption for the [Energy dashboard](/home-energy-management), adjust the charging current, and react to charger state changes in automations.

## Use cases

The OpenEVSE integration is useful in scenarios like the following:

- Track how much energy each charging session uses and feed it into the [Energy dashboard](/home-energy-management) to see your home’s EV charging costs over time.
- Lower the charge rate during peak electricity hours and raise it again when off-peak rates start.
- Match the charge rate to the surplus power your solar panels produce, so your car charges from clean energy whenever possible.
- Get a notification when your car is plugged in, when charging starts or finishes, or when the charger reports a fault.
- Pause charging when other large loads (such as an oven or heat pump) are running, to stay below the limit of your electrical service.

## Supported devices

This integration supports OpenEVSE charging stations that run the official [OpenEVSE Wi-Fi firmware](https://github.com/OpenEVSE/openevse_esp32_firmware) on either an ESP8266 or an ESP32 Wi-Fi module. The Wi-Fi module is what exposes the local HTTP API and WebSocket interface that this integration uses.

The OpenEVSE Advanced Series chargers are known to work with this integration. If your charger runs the OpenEVSE Wi-Fi firmware and exposes the local web interface in a browser, it is expected to work with this integration.

### Unsupported devices

The following devices are not supported:

- OpenEVSE chargers without the Wi-Fi module, since they have no network interface to communicate with.
- Older OpenEVSE Wi-Fi firmware versions that do not expose the modern HTTP API. If the local web interface does not show energy totals or a status page, update the firmware first.

## Prerequisites

- The OpenEVSE charger is on the same network as Home Assistant.

{% include integrations/config_flow.md %}

In most cases, the charger is discovered automatically and shown as a newly discovered device. If automatic discovery does not find your charger, you can add it manually by entering its IP address or hostname.

{% configuration_basic %}
Host:
  description: "The IP address or hostname of your OpenEVSE charger on your local network, for example `192.168.1.50` or `openevse.local`. This is the same address you use to open the OpenEVSE web interface in a browser."
Username:
  description: "The username for the OpenEVSE web interface. Only required if you have enabled authentication on the charger. Leave empty if you have not set a username."
Password:
  description: "The password for the OpenEVSE web interface. Only required if you have enabled authentication on the charger. Leave empty if you have not set a password."
{% endconfiguration_basic %}

If the credentials on the charger change later, Home Assistant prompts you to re-enter them through the reauthentication flow without removing and re-adding the integration.

## Supported functionality

The integration adds a single device per charger to Home Assistant and exposes the following entities. Some entities are disabled by default to keep the device page tidy. You can enable them from the device page if you need them.

### Sensors

Charging and session information:

- **Charging status**: The current state reported by the charger, such as `Not connected`, `Connected`, `Charging`, or `Sleeping`.
- **Charge time elapsed**: How long the current charging session has been running.
- **Usage this session**: Energy delivered to the vehicle during the current session.
- **Total energy usage**: Lifetime energy delivered by the charger. Use this with the [Energy dashboard](/home-energy-management) to track EV charging consumption.
- **Vehicle charge completion**: Estimated time at which charging will finish, when the vehicle reports this value.

Live electrical measurements:

- **Charging current**: Current that is currently flowing to the vehicle.
- **Charging voltage**: Voltage measured at the charger.
- **Charging power**: Real-time power delivered to the vehicle.
- **Current power**: Instantaneous power reading from the charger.
- **Current capacity**: The charging current the charger is configured to deliver.
- **Current limit**: The hard maximum the charger will deliver. This is the limit you select with the **Charge rate** number entity.

Energy totals across different time windows (disabled by default):

- **Daily energy usage**
- **Weekly energy usage**
- **Monthly energy usage**
- **Yearly energy usage**

Temperatures from the charger’s onboard sensors:

- **Ambient temperature**
- **IR temperature** (disabled by default)
- **RTC temperature** (disabled by default)
- **ESP temperature** (disabled by default)

Vehicle information, when the connected vehicle reports it through the charger:

- **Vehicle state of charge**: The battery level reported by the car as a percentage.
- **Vehicle range**: The remaining driving range reported by the car.

Power shaper sensors, which are used when the charger limits power based on the rest of your home’s electrical load (disabled by default):

- **Shaper live power**
- **Shaper available current**
- **Shaper maximum power**

Diagnostic sensors that help with troubleshooting and that are disabled by default:

- **Service level**: Whether the charger is operating in Level 1 (120V), Level 2 (240V), or automatic mode.
- **Minimum amperage** and **Maximum amperage**: The current range the charger supports.
- **Wi-Fi signal**: Signal strength of the charger’s Wi-Fi connection.
- **GFCI trip count**, **No ground trip count**, **Stuck relay trip count**: Counters for safety events.
- **Uptime** and **Free memory**: Information about the Wi-Fi module itself.

### Binary sensors

- **Vehicle connected**: On when a vehicle is plugged in to the charger.
- **Divert active**: On when the charger is in solar divert (eco) mode and is matching its output to available surplus power.
- **Shaper active**: On when the power shaper is actively limiting the charge rate to stay below a household power limit.
- **Limit active** (disabled by default): On when an energy, time, or session limit is currently being enforced.
- **Ethernet connected** (disabled by default): On when the charger is using its wired Ethernet connection instead of Wi-Fi.
- **MQTT connected** (disabled by default): On when the charger has an active MQTT connection.

### Number

- **Charge rate**: Sets the maximum current the charger will deliver, in amperes. The minimum and maximum follow the limits that the charger reports for itself, so you cannot set a value outside the safe range for your hardware.

### Buttons

- **Restart**: Restarts the charging module.
- **Restart Wi-Fi**: Restarts the charger's Wi-Fi module. Use this if the charger drops off your network but is otherwise powered.

### Switches

- **Current shaper**: Enables or disables the power shaper feature to dynamically limit charging power based on whole-home electrical load.
- **Manual override**: Toggles manual override on the charger to start or pause charging regardless of scheduled or automatic claim states.
- **Solar PV divert**: Enables or disables solar divert (eco) mode to dynamically match charging output to surplus solar power generation.

### Select

- **Override state**: Sets the manual override state on the charger. Available options are **Auto** (clears override), **Active** (force charging active), or **Disabled** (force charging paused). This entity requires OpenEVSE Wi-Fi firmware 4.0.1 or later.

## Examples

### Notify when your car is plugged in

This automation sends a notification whenever a vehicle is connected to the charger.

{% example %}
automation:
  - alias: "Notify when EV is plugged in"
    triggers:
      - trigger: state
        entity_id: binary_sensor.openevse_vehicle_connected
        from: "off"
        to: "on"
    actions:
      - action: notify.mobile_app_my_phone
        data:
          title: "EV plugged in"
          message: "Your car is now connected to the charger."
{% endexample %}

### Lower the charge rate during peak hours

This automation reduces the charge rate to 10A between 5 PM and 9 PM, then returns it to 32A afterwards. Adjust the times and current values to match your electricity tariff and your charger’s limits.

{% example %}
automation:
  - alias: "OpenEVSE peak rate"
    triggers:
      - trigger: time
        at: "17:00:00"
    actions:
      - action: number.set_value
        target:
          entity_id: number.openevse_charge_rate
        data:
          value: 10

  - alias: "OpenEVSE off-peak rate"
    triggers:
      - trigger: time
        at: "21:00:00"
    actions:
      - action: number.set_value
        target:
          entity_id: number.openevse_charge_rate
        data:
          value: 32
{% endexample %}

### Add EV charging to the Energy dashboard

Use the **Total energy usage** sensor as an individual device on the [Energy dashboard](/home-energy-management):

1. Go to {% my energy title="**Settings** > **Dashboards** > **Energy**" %}.
2. Under **Individual devices**, select **Add device**.
3. Choose the **Total energy usage** sensor from your OpenEVSE charger.

The dashboard then shows how much energy your car consumes compared to the rest of your home.

## Data updates

The OpenEVSE integration uses a push model. After it connects, it opens a WebSocket to the charger, and the charger sends new data as soon as a value changes. This means entity states reflect what the charger is doing within seconds, without waiting for a polling interval.

As a safety net, the integration also polls the charger every five minutes. This catches the rare case where the WebSocket connection drops without a clean disconnect, so the entities are refreshed on the next {% term polling poll %} even if the push channel is interrupted.

You do not need to configure any update interval yourself.

## Known limitations

- The integration manages a single OpenEVSE charger per config entry. If you have multiple chargers, add each one as a separate integration instance.
- Only OpenEVSE chargers with the official Wi-Fi firmware are supported. Chargers reached only over MQTT, or third-party firmware variants, are not.
- The **Vehicle state of charge** and **Vehicle range** sensors depend on the connected vehicle reporting this information through the charger. Many vehicles do not, in which case these sensors stay unavailable.
- Configuring OpenEVSE through YAML is deprecated. Existing YAML configuration is automatically imported into the UI, and the YAML support is removed in a future Home Assistant release. After import, remove the `openevse` block from your {% term "`configuration.yaml`" %} file.

## Troubleshooting

### The charger is not discovered automatically

Automatic discovery uses zeroconf (mDNS), which only works when Home Assistant and the charger are on the same network segment. If your charger is on a different VLAN or subnet, add it manually:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. Select **Add integration** and search for **OpenEVSE**.
3. Enter the charger’s IP address or hostname.

### Setup fails with "Failed to connect"

This message means Home Assistant cannot reach the charger at the address you entered. To resolve it:

1. Open the charger’s web interface in a browser on the same network as Home Assistant. If the page does not load, the problem is between your network and the charger, not Home Assistant.
2. Check the address you entered. Use the same value (IP address or `*.local` hostname) that loads the web interface.
3. Make sure the charger’s Wi-Fi signal is strong enough. Move the charger closer to your access point or use the Ethernet port if your hardware has one.
4. Confirm that no firewall on your network is blocking traffic between Home Assistant and the charger.

### Setup fails with "Invalid authentication"

The charger has authentication enabled and the username or password you entered is incorrect. Re-enter the credentials you use to log in to the OpenEVSE web interface. If you have forgotten them, reset the credentials from the charger’s web interface.

### Home Assistant asks you to reauthenticate

If you change the username or password on the charger, Home Assistant detects the failed authentication and starts a reauthentication flow. Select **Reconfigure** on the integration’s notification and enter the new credentials. The integration reconnects without losing any of your existing entities or automations.

### Entities show "Unavailable"

If most entities go unavailable at the same time, the integration has lost contact with the charger. Check the following:

1. The charger has power and its status LED is on.
2. The charger’s web interface still loads in a browser.
3. The charger has not picked up a new IP address from your router. Use a static IP or a DHCP reservation to avoid this.

After the charger is reachable again, entities recover automatically on the next WebSocket message or {% term polling %} cycle.

### A specific sensor is always "Unavailable" or shows 0

Some sensors only report values when the charger has the matching hardware or the connected vehicle provides the data:

- Temperature sensors (**IR temperature**, **RTC temperature**, **Ambient temperature**) require the corresponding optional temperature probe to be installed.
- **Vehicle state of charge**, **Vehicle range**, and **Vehicle charge completion** require a vehicle that exposes this data through the charger’s integration.
- Power shaper sensors are only meaningful when the OpenEVSE power shaper feature is enabled in the charger’s configuration.

If you do not need a sensor, you can leave it disabled.

### Charging current cannot be set above a certain value

The **Charge rate** number entity is limited by the minimum and maximum amperage your charger reports. These values are set in the charger’s configuration and reflect the rating of your hardware and electrical installation. To raise the maximum, update the configuration in the OpenEVSE web interface, and only after confirming that your wiring and breaker support the higher current.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
