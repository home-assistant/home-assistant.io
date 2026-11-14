---
description: Discover, connect, and monitor bluetooth devices.
ha_release: 2022.8
ha_domain: bluetooth
related:
  - docs: /connectivity/bluetooth/
    title: Bluetooth connections in Home Assistant
  - docs: /docs/configuration/
    title: Configuration file
  - docs: /integrations/default_config/
    title: Default config
---

The **Bluetooth** {% term integration %} supports Bluetooth Low Energy devices. Bluetooth Classic devices are not supported. Compatible devices discovered nearby appear on {% my integrations title="**Settings** > **Devices & services**" %}.

To learn how to connect Bluetooth devices, which adapters and proxies you can use, and how to improve your Bluetooth connections, refer to [Bluetooth](/connectivity/bluetooth/).

{% include integrations/config_flow.md %}

## Configuration

While this integration is part of [`default_config:`](/integrations/default_config/) to enable automatic discovery of the Bluetooth Adapter, it will only be enabled by setting up the configuration flow, or manually adding it to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
bluetooth:
```

## Requirements for Linux systems

For Bluetooth to function on Linux systems:

- The [D-Bus](https://en.wikipedia.org/wiki/D-Bus) socket must be accessible to Home Assistant.
- The Bluetooth adapter must be accessible to D-Bus and running [BlueZ](http://www.bluez.org/) >= 5.43. It is highly recommended to use BlueZ >= 5.63 as older versions have been reported to be unreliable.
- The D-Bus implementation should be [dbus-broker](https://github.com/bus1/dbus-broker).
- The host system should be running Linux kernel 5.15.62 or later.

### Additional requirements by install method

- Home Assistant Operating System: Upgrade to Home Assistant OS version 9.0 or later. All Bluetooth requirements are automatically configured.
- Home Assistant Container: The host system must run BlueZ, and the D-Bus socket must be accessible to Home Assistant **inside** the container. Additional configuration is required (see below).

### Additional details for Container

{% note %}
You only need these configuration steps for Home Assistant Container installations. Home Assistant Operating System automatically handles all Bluetooth configuration. To check your installation type, go to {% my info title="**Settings** > **About**" %} and look for **Installation method**.
{% endnote %}

{% details "Container configuration for Bluetooth" %}

Home Assistant Container requires specific configuration to access Bluetooth adapters.

**Required capabilities:**

Add the following Linux capabilities to your container configuration to enable full Bluetooth management:

**Docker Compose:**

```yaml
cap_add:
  - NET_ADMIN
  - NET_RAW
volumes:
  - /run/dbus:/run/dbus:ro
```

**Docker run:**

```bash
docker run --cap-add=NET_ADMIN --cap-add=NET_RAW -v /run/dbus:/run/dbus:ro ...
```

**D-Bus socket:**

For most systems, the D-Bus socket is in `/run/dbus`. You need to make the socket available in the container for Home Assistant to connect to D-Bus and access the Bluetooth adapter. If the D-Bus socket is in `/var/run/dbus` on your host system, use `-v /var/run/dbus:/run/dbus:ro` instead.

**What happens without these capabilities:**

If `NET_ADMIN` and `NET_RAW` capabilities are missing:

- Your Bluetooth will operate in a degraded mode with limited functionality
- Automatic adapter recovery is unavailable - your adapters cannot be reset when they stop responding
- Connection parameters and management API commands will fail
- Raw advertising data will be missing, causing unreliable updates for your devices
- An error will appear in your logs: "Missing required permissions for Bluetooth management"

{% enddetails %}

{% details "Switching from dbus-daemon to dbus-broker" %}

Follow [the instructions](https://github.com/bus1/dbus-broker/wiki) to switch to dbus-broker.

{% enddetails %}

{% details "Installing BlueZ" %}

On Debian based host systems, the `sudo apt-get -y install bluez` command will install BlueZ.

{% enddetails %}

## Configuration options

1. In Home Assistant, go to {% my config_bluetooth title="**Settings** > **Connectivity** > **Bluetooth**" %}.
2. Select **Adapters**.
3. On the adapter of interest, select the {% icon "mdi:cog-outline" %} cogwheel icon, then select your options.
   - Not all adapters have configuration options. If you don't see a cogwheel icon, your adapter does not support configuration options.
   - Under **Scanning mode**, pick **Auto**, **Active**, or **Passive**. For what each mode does, refer to [Scanning modes](/connectivity/bluetooth/#scanning-modes).

## Troubleshooting

{% details "Bluetooth adapter requires additional permissions" %}

### Symptom: "Bluetooth adapter requires additional permissions"

Under {% my repairs title="**Settings** > **System** > **Repairs**" %}, you see a repair saying that your Bluetooth adapter is operating in degraded mode, because your container needs additional permissions.

#### Description

Home Assistant can use your Bluetooth adapter, but only with limited functions. For example, it can't reset an adapter that stops responding, and updates from your devices can be less reliable. This happens when Home Assistant runs in a container that doesn't have the permissions it needs to manage Bluetooth.

#### Resolution

1. Go to {% my info title="**Settings** > **About**" %} and check the **Installation method**.
2. If it says **Home Assistant Container** or **Unsupported Third Party Container**, add the required permissions to your container. Follow the steps in [Additional details for Container](#additional-details-for-container), then recreate the container with the new settings. For example, with Docker Compose, run `docker compose up -d`. Restarting the container isn't enough, because Docker only applies the new permissions when it creates the container.
3. If it says **Home Assistant OS** or **Home Assistant Supervised**, you don't need to change any permissions yourself, because they're set up automatically. If you still see the repair, [report the issue](/help/reporting_issues/) and include your [system information](/more-info/system-information/).

{% enddetails %}

For problems with your Bluetooth connections, such as slow connections or interference, refer to [Troubleshooting Bluetooth connections](/connectivity/bluetooth/#troubleshooting).

### Integrations that require exclusive use of the Bluetooth Adapter

While newer integrations can share the Bluetooth Adapter, some legacy integrations require exclusive use of the adapter. Enabling this integration may prevent an integration that has not been updated to use newer methods from functioning.

Deleting the config entry for this integration will release control of the adapter and allow another integration to gain exclusive use of the Bluetooth adapter. If you have manually added `bluetooth:` to your {% term "`configuration.yaml`" %}, you must also remove it to prevent the configuration from being recreated. Consider adding a second Bluetooth adapter on Linux systems if you need to continue using legacy integrations, as more integrations will move to use the Bluetooth integration in the future.

## Discovered integrations

The following integrations are automatically discovered by the Bluetooth integration:

- [Acaia](/integrations/acaia/)
- [Airthings BLE](/integrations/airthings_ble/)
- [Aranet](/integrations/aranet/)
- [BlueMaestro](/integrations/bluemaestro/)
- [BTHome](/integrations/bthome/)
- [Dormakaba dKey](/integrations/dormakaba_dkey/)
- [eQ-3 Bluetooth Smart Thermostats](/integrations/eq3btsmart/)
- [EufyLife](/integrations/eufylife_ble/)
- [Fjäråskupan](/integrations/fjaraskupan/)
- [Gardena Bluetooth](/integrations/gardena_bluetooth/)
- [Govee Bluetooth](/integrations/govee_ble/)
- [HomeKit Device](/integrations/homekit_controller/)
- [Husqvarna Automower BLE](/integrations/husqvarna_automower_ble/)
- [iBeacon Tracker](/integrations/ibeacon/)
- [IKEA Idasen Desk](/integrations/idasen_desk/)
- [Improv via BLE](/integrations/improv_ble/)
- [INKBIRD](/integrations/inkbird/)
- [IronOS](/integrations/iron_os/)
- [Kegtron](/integrations/kegtron/)
- [Keymitt MicroBot Push](/integrations/keymitt_ble/)
- [Kuler Sky](/integrations/kulersky/)
- [La Marzocco](/integrations/lamarzocco/)
- [LD2410 BLE](/integrations/ld2410_ble/)
- [LED BLE](/integrations/led_ble/)
- [Medcom Bluetooth](/integrations/medcom_ble/)
- [Melnor Bluetooth](/integrations/melnor/)
- [Moat](/integrations/moat/)
- [Mopeka](/integrations/mopeka/)
- [Motionblinds Bluetooth](/integrations/motionblinds_ble/)
- [Oral-B](/integrations/oralb/)
- [Probe Plus](/integrations/probe_plus/)
- [Qingping](/integrations/qingping/)
- [RAPT Bluetooth](/integrations/rapt_ble/)
- [Ruuvi BLE](/integrations/ruuvitag_ble/)
- [Sensirion BLE](/integrations/sensirion_ble/)
- [SensorPro](/integrations/sensorpro/)
- [SensorPush](/integrations/sensorpush/)
- [Snooz](/integrations/snooz/)
- [SwitchBot Bluetooth](/integrations/switchbot/)
- [ThermoBeacon](/integrations/thermobeacon/)
- [ThermoPro](/integrations/thermopro/)
- [Tilt Hydrometer BLE](/integrations/tilt_ble/)
- [Xiaomi BLE](/integrations/xiaomi_ble/)
- [Yale Access Bluetooth](/integrations/yalexs_ble/)
