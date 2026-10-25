---
title: SNMP
description: Instructions on how to integrate SNMP into Home Assistant.
ha_category:
  - Network
  - Presence detection
  - Sensor
  - Switch
ha_iot_class: Local Polling
ha_release: 0.57
ha_domain: snmp
ha_platforms:
  - device_tracker
  - sensor
  - switch
ha_integration_type: hub
ha_codeowners:
  - '@nmaggioni'
  - '@IsaccoBenedetti'
ha_quality_scale: legacy
---

Many routers, Wi-Fi access points, printers, and other network-connected devices support the [Simple Network Management Protocol (SNMP)](https://en.wikipedia.org/wiki/Simple_Network_Management_Protocol). This is a standardized method for monitoring/managing network-connected devices. SNMP uses a tree-like hierarchy where each node is an object. Many of these objects contain continuously updated lists of metrics like network interfaces throughput, disk activity, active devices on the network, toner levels, and such.

The following sections describe how to configure and use the integration:

- [Adding the integration](#adding-the-integration)
  - [SNMP v1 and v2c configuration](#snmp-v1-and-v2c-configuration)
  - [SNMP v3 configuration](#snmp-v3-configuration)
  - [Base OID](#base-oid)
  - [Finding the Base OID](#finding-the-base-oid)
  - [Tracking a second table](#tracking-a-second-table)
  - [Enabling tracked devices](#enabling-tracked-devices)
  - [Polling](#polling)
- [YAML configuration](#yaml-configuration)
  - [Device tracker (deprecated)](#device-tracker-deprecated)
  - [Sensor](#sensor)
    - [Finding OIDs](#finding-oids)
    - [Examples](#examples)
      - [Printer uptime minutes](#printer-uptime-minutes)
  - [Switch](#switch)
- [Removing the integration](#removing-the-integration)

{% important %}
This device tracker needs SNMP to be enabled on the target network device. It could be that you need to install SNMP support manually on your router, switch, server, or any other device that you will be trying to extract information from.
{% endimportant %}

{% important %}
Due to SNMP limitations, it is impossible to reliably fetch a stable MAC address from the server. Because of this, the integration cannot follow Home Assistant best practices when it comes to using the MAC address or some other unique reliable string as a `unique_id`. For this reason, you should make sure to set up a static IP address or a DHCP reservation.
{% endimportant %}

## Adding the integration

The `device_tracker` platform is configured through the user interface as part of adding the SNMP integration.

{% include integrations/config_flow.md %}

The setup flow asks for the following information, in this order:

1. **Host**: The IP address or hostname of the SNMP device.
2. **Port**: The SNMP port. The default is `161`.
3. **SNMP version**: Choose `1`, `2c`, or `3`.
4. **Credentials**: For SNMP v1 or v2c, enter the community string. Most devices use `public` with read-only permission, which is sufficient for most purposes. For SNMP v3, enter the user name. Optionally, enter an authentication key and protocol, and a privacy key and protocol. A privacy key requires an authentication key.
5. **Base OID**: The OID of the table column that holds the MAC addresses of the connected devices. The setup flow asks for the Base OID directly after the credentials.

### SNMP v1 and v2c configuration

- **Community**: The SNMP community which is set for the device. Most devices have a default community set to `public` with read-only permission (which is sufficient for most purposes).

### SNMP v3 configuration

If you choose version 3, you will also need to provide:

- **Username**
- **Authentication key** and **protocol** (such as MD5 or SHA)
- **Privacy key** and **protocol** (such as DES or AES)
- **Context name** (optional)

### Base OID

The Base OID is the OID of a table column, not the OID of the table itself or of a single row. The column must contain the MAC addresses of the connected devices.

For example:

- `1.3.6.1.2.1.4.22.1.2` is the MAC address column of the ARP table.
- `1.3.6.1.2.1.17.4.3.1.1` is the MAC address column of the bridge forwarding table, used by switches and access points.

Enter a numeric OID. Object names are rejected with the message "The OID could not be resolved." To find the Base OID, check your device's documentation or its MIB file.

### Finding the Base OID

The following OIDs refer to the current MAC Address table from various common router brands. These reflect all recent devices seen on the network. However, since devices are usually not removed from these internal tables until after a predefined timeout (typically in a range of 5-15 minutes after they were last active on the network, depending on the specific manufacturer's implementation), this is less effective for [device tracking](/integrations/device_tracker/) than desirable. If near-realtime values are needed, it is recommended to use [Ping](/integrations/ping) or [Nmap](/integrations/nmap_tracker) integrations instead.

| Brand    | Device/Firmware                  | OID                                             |
| -------- | -------------------------------- | ----------------------------------------------- |
| Aerohive | AP230                            | `1.3.6.1.4.1.26928.1.1.1.2.1.2.1.1`             |
| Apple    | Airport Express (2nd gen.) 7.6.9 | `1.3.6.1.2.1.3.1.1.2` or `1.3.6.1.2.1.4.22.1.2` |
| Aruba    | IAP325 on AOS 6.5.4.8            | `1.3.6.1.4.1.14823.2.3.3.1.2.4.1.1`             |
| BiPAC    | 7800DXL Firmware 2.32e           | `1.3.6.1.2.1.17.7.1.2.2.1.1`                    |
| DD-WRT   | unknown version/model            | `1.3.6.1.2.1.4.22.1.2`                          |
| IPFire   | 2.25                             | `1.3.6.1.2.1.4.22.1.2`                          |
| MikroTik | unknown RouterOS version/model   | `1.3.6.1.4.1.14988.1.1.1.2.1.1`                 |
| MikroTik | RouterOS 6.x on RB2011           | `1.3.6.1.2.1.4.22.1.2`                          |
| OpenWrt  | Chaos Calmer 15.05               | `1.3.6.1.2.1.4.22.1.2`                          |
| OPNsense | 19.1                             | `1.3.6.1.2.1.4.22.1.2`                          |
| pfSense  | 2.2.4                            | `1.3.6.1.2.1.4.22.1.2`                          |
| Ruckus   | ZoneDirector 9.13.3              | `1.3.6.1.4.1.25053.1.2.2.1.1.3.1.1.1.6`         |
| TP-Link  | Archer VR1600v                   | `1.3.6.1.2.1.3.1.1.2.16.1`                      |
| TP-Link  | Archer VR2600v                   | `1.3.6.1.2.1.3.1.1.2.19.1`                      |
| TP-Link  | Archer VR600                     | `1.3.6.1.2.1.3.1.1.2`                           |
| Ubiquiti | Edgerouter Lite v1.9.0           | `1.3.6.1.2.1.4.22.1.2`                          |

### Tracking a second table

One SNMP device can track several tables. To add another device tracker:

1. Open the SNMP integration entry.
2. Select **Add device tracker**.
3. Enter the Base OID of the other table.

Each device tracker polls its own table independently. To change the Base OID of an existing device tracker, select the three dots {% icon "mdi:dots-vertical" %} next to it and select **Reconfigure**. Changing the Base OID stops tracking the previous table, so the devices that only appeared in it are removed.

### Enabling tracked devices

Tracked devices are created as entities that are disabled by default. If a device with the same MAC address is already known to another integration, its entity is enabled automatically.

To enable a tracked device:

1. Go to {% my entities title="**Settings** > **Devices & services** > **Entities**" %}.
2. Select the SNMP device tracker entity.
3. Select the {% icon "mdi:cog" %} icon and turn on **Enabled**.

### Polling

The integration polls each device tracker every 30 seconds. This is fixed and cannot be changed.

## YAML configuration

The `sensor` and `switch` platforms are configured in YAML. The `device_tracker` platform can also still be configured in YAML, but this is deprecated.

### Device tracker (deprecated)

The YAML `device_tracker` platform is deprecated and will be removed in Home Assistant Core 2027.5. While it is configured, a repair issue in Home Assistant points you to the user interface setup.

Only the `device_tracker` platform is affected. The `sensor` and `switch` platforms remain YAML-only and are not deprecated.

```yaml
# Example configuration.yaml entry for SNMP version 1 or 2c
device_tracker:
  - platform: snmp
    host: 192.168.1.1
    community: public
    baseoid: 1.3.6.1.4.1.14988.1.1.1.2.1.1
```

To migrate from YAML to the user interface:

1. Stop Home Assistant.
2. Remove the SNMP `device_tracker` platform from your `configuration.yaml` file.
3. Delete the devices tracked by SNMP, matched by MAC address, from `known_devices.yaml`.
4. Start Home Assistant.
5. Add the SNMP integration through the user interface and enter the Base OID.
6. Enable the device tracker entities you want to use, and optionally rename them to the entity IDs you used before.

Delete the entries from `known_devices.yaml` before starting Home Assistant. A restored legacy entry keeps its entity ID, so if it is still present when the new tracker is created, the new entity gets a `_2` suffix instead of the previous entity ID.

The legacy `consider_home` and `new_device_defaults` options are not carried over. A device is marked as away as soon as it leaves the tracked table.

See the [device tracker integration page](/integrations/device_tracker/) for instructions on how to configure the people to be tracked.

### Sensor

The `snmp` sensor platform displays values made available by network devices through the SNMP protocol.

To enable this sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: snmp
    host: 192.168.1.32
    baseoid: 1.3.6.1.4.1.2021.10.1.3.1
```

{% configuration %}
accept_errors:
  description: "Determines whether the sensor should start and keep working even if the SNMP host is unreachable or not responding. This allows the sensor to be initialized properly even if, for example, your printer is not on when you start Home Assistant."
  required: false
  type: string
  default: false
auth_key:
  description: Authentication key to use for SNMP v3.
  required: false
  type: string
  default: no key
auth_protocol:
  description: Authentication protocol to use for SNMP v3.
  required: false
  type: string
  default: 'none'
baseoid:
  description: The OID where the information is located. Use numerical notation.
  required: true
  type: string
community:
  description: "The SNMP community which is set for the device for SNMP v1 and v2c. Most devices have a default community set to `public` with read-only permission (which is sufficient for most devices that don't accept direct modifications of their parameters via SNMP, such as printers)."
  required: false
  type: string
  default: 'public'
default_value:
  description: "Determines what value the sensor should take if `accept_errors` is set and the host is unreachable or not responding. If not set, the sensor will have value `unknown` in case of errors."
  required: false
  type: string
device_class:
  description: Sets the [class of the device](/integrations/sensor#device-class), changing the device state and icon that is displayed on the frontend.
  required: false
  type: string
host:
  description: The IP address of your host (for example, `192.168.1.32`).
  required: false
  type: string
  default: 'localhost'
icon:
  description: Defines a template for the icon of the SNMP sensor.
  required: false
  type: template
name:
  description: Defines a template for the name of the SNMP sensor.
  required: false
  type: template
  default: SNMP
picture:
  description: Defines a template for the entity picture of the SNMP sensor.
  required: false
  type: template
port:
  description: The SNMP port of your host.
  required: false
  type: string
  default: '161'
priv_key:
  description: Privacy key to use for SNMP v3.
  required: false
  type: string
  default: no key
priv_protocol:
  description: Privacy protocol to use for SNMP v3.
  required: false
  type: string
  default: 'none'
state_class:
  description: The [state_class](https://developers.home-assistant.io/docs/core/entity/sensor#available-state-classes) of the sensor.
  required: false
  type: string
unique_id:
  description: An ID that uniquely identifies this entity. This allows changing the `name`, `icon` and `entity_id` from the web interface.
  required: false
  type: string
unit_of_measurement:
  description: Defines the units of measurement of the sensor, if any.
  required: false
  type: string
username:
  description: Username to use for authentication.
  required: false
  type: string
  default: ''
value_template:
  description: "Defines a [template](/docs/templating/where-to-use/#processing-incoming-data) to parse the value."
  required: false
  type: template
version:
  description: "Version of SNMP protocol, `1`, `2c` or `3`. Version `2c` or higher is needed to read data from 64-bit counters."
  required: false
  type: string
  default: '1'
{% endconfiguration %}

{% include integrations/using_templates.md %}

Valid values for `auth_protocol`:

- **none**
- **hmac-md5**
- **hmac-sha**
- **hmac128-sha224**
- **hmac192-sha256**
- **hmac256-sha384**
- **hmac384-sha512**

Valid values for `priv_protocol`:

- **none**
- **des**
- **3des-ede**
- **aes-cfb-128**
- **aes-cfb-192**
- **aes-cfb-256**

#### Finding OIDs

OIDs may vary on different systems because they are vendor-specific. The best place to find OIDs is in your device's manual or vendor documentation. For example, the following OIDs are for the load of a Linux system.

- 1 minute Load: `1.3.6.1.4.1.2021.10.1.3.1`
- 5 minute Load: `1.3.6.1.4.1.2021.10.1.3.2`
- 15 minute Load: `1.3.6.1.4.1.2021.10.1.3.3`

There is a large amount of tools available to work with SNMP. `snmpwalk` let you easily retrieve the value of an OID.

```bash
$ snmpwalk -Os -c public -v 2c 192.168.1.32 1.3.6.1.4.1.2021.10.1.3.1
laLoad.1 = STRING: 0.19
```

#### Examples

##### Printer uptime minutes

According to the most common SNMP standard, the uptime of a device is accessible under OID `1.3.6.1.2.1.1.3.0`. The value represented using a format called `TimeTicks`, in units of hundredths of a second.

To create a sensor that displays the uptime for your printer in minutes, you can use this configuration:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: snmp
    name: "Printer uptime"
    host: 192.168.2.21
    baseoid: 1.3.6.1.2.1.1.3.0
    accept_errors: true
    unit_of_measurement: "minutes"
    value_template: "{{((value | int) / 6000) | int}}"
```

The `accept_errors` option will allow the sensor to work even if the printer is not on when Home Assistant is first started: the sensor will just display a `-` instead of a minute count.

The `value_template` option converts the original value to minutes.

### Switch

The `snmp` switch platform allows you to control SNMP-enabled equipment.

Currently, only SNMP OIDs that accept integer values are supported. SNMP v1, v2c and v3 are supported.

To use an SNMP switch in your installation:

```yaml
# Example configuration.yaml entry:
switch:
  - platform: snmp
    host: 192.168.0.2
    baseoid: 1.3.6.1.4.1.19865.1.2.1.4.0
```

{% configuration %}
baseoid:
  description: The SNMP BaseOID which to poll for the state of the switch.
  required: true
  type: string
command_oid:
  description: The SNMP OID which to set to turn the switch on and off, if different from `baseoid`.
  required: false
  type: string
host:
  description: The IP/host which to control.
  required: false
  type: string
  default: 'localhost'
port:
  description: The port on which to communicate.
  required: false
  type: string
  default: '161'
community:
  description: community string to use for authentication (SNMP v1 and v2c).
  required: false
  type: string
  default: 'private'
username:
  description: Username to use for authentication.
  required: false
  type: string
  default: ''
auth_key:
  description: Authentication key to use for SNMP v3.
  required: false
  type: string
  default: no key
auth_protocol:
  description: Authentication protocol to use for SNMP v3.
  required: false
  type: string
  default: 'none'
priv_key:
  description: Privacy key to use for SNMP v3.
  required: false
  type: string
  default: no key
priv_protocol:
  description: Privacy protocol to use for SNMP v3.
  required: false
  type: string
  default: 'none'
version:
  description: SNMP version to use - either `1`, `2c` or `3`.
  required: false
  type: string
  default: '1'
payload_on:
  description: What return value represents an `On` state for the switch. The same value is used in writes to turn on the switch if `command_payload_on` is not set.
  required: false
  type: string
  default: '1'
payload_off:
  description: What return value represents an `Off` state for the switch. The same value is used in writes to turn off the switch if `command_payload_off` is not set.
  required: false
  type: string
  default: '0'
command_payload_on:
  description: The value to write to turn on the switch, if different from `payload_on`.
  required: false
  type: string
command_payload_off:
  description: The value to write to turn off the switch, if different from `payload_off`.
  required: false
  type: string
vartype:
  description: The SNMP vartype for the `payload_on` and `payload_off` commands as defined in [RFC1902](https://tools.ietf.org/html/rfc1902.html).
  required: false
  type: string
  default: 'none'
{% endconfiguration %}

You should check with your device's vendor to find out the correct OID and what values turn the switch on and off.

Valid values for `auth_protocol`:

- **none**
- **hmac-md5**
- **hmac-sha**
- **hmac128-sha224**
- **hmac192-sha256**
- **hmac256-sha384**
- **hmac384-sha512**

Valid values for `priv_protocol`:

- **none**
- **des**
- **3des-ede**
- **aes-cfb-128**
- **aes-cfb-192**
- **aes-cfb-256**

Valid values for `vartype`:

- **Counter32**
- **Counter64**
- **Gauge32**
- **Integer32**
- **Integer**
- **IpAddress**
- **ObjectIdentifier**
- **OctetString**
- **Opaque**
- **TimeTicks**
- **Unsigned32**

Complete examples:

```yaml
switch:
  - platform: snmp
    name: SNMP v1 switch
    host: 192.168.0.2
    community: private
    baseoid: 1.3.6.1.4.1.19865.1.2.1.4.0
    payload_on: 1
    payload_off: 0

  - platform: snmp
    name: SNMP v3 switch
    host: 192.168.0.3
    version: "3"
    username: "myusername"
    auth_key: "myauthkey"
    auth_protocol: "hmac-sha"
    priv_key: "myprivkey"
    priv_protocol: "aes-cfb-128"
    baseoid: 1.3.6.1.4.1.19865.1.2.1.4.0
    payload_on: 1
    payload_off: 0

  - platform: snmp
    name: Enable PoE on NETGEAR switch port 2 using SNMP v3
    host: 192.168.0.4
    version: "3"
    username: "myusername"
    auth_key: "myauthkey"
    auth_protocol: "hmac-sha"
    priv_key: "myprivkey"
    priv_protocol: "des"
    baseoid: 1.3.6.1.4.1.4526.11.15.1.1.1.1.1.2
    payload_on: 15400
    payload_off: 3000
    vartype: Gauge32
```

## Removing the integration

To stop tracking a table, open the SNMP integration entry, select the three dots {% icon "mdi:dots-vertical" %} next to the device tracker, and select **Delete**.

The `sensor` and `switch` platforms are configured in YAML. To remove the SNMP device and all of its device trackers, remove those platforms from your `configuration.yaml` file and restart Home Assistant, then delete the integration entry:

{% include integrations/remove_device_service.md %}
