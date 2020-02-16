---
title: Synology SRM
description: Instructions on how to integrate Synology SRM routers into Home Assistant.
logo: synology.png
ha_category:
  - Presence Detection
  - System Monitor
ha_release: 0.87
ha_codeowners:
  - '@aerialls'
  - '@i00'
---

This platform allows you to detect presence by looking at connected devices to a [Synology SRM](https://www.synology.com/en-us/srm) router.

You can also configure a sensor to obtain information about the router.

## Configuration

To use this device tracker in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: synology_srm
    host: IP_ADDRESS
    password: YOUR_ADMIN_PASSWORD
```

{% configuration %}
host:
  description: The Synology SRM router host or IP address, e.g., `192.168.1.1` or `router.mydomain.local`
  required: true
  type: string
port:
  description: The port to connect to the Synology SRM router.
  required: false
  default: 8001
  type: integer
username:
  description: The username of a user with administrative privileges.
  required: false
  default: admin
  type: string
password:
  description: The password for your given admin account.
  required: true
  type: string
ssl:
  description: Use HTTPS instead of HTTP to connect.
  required: false
  default: true
  type: boolean
verify_ssl:
  description: Enable or disable SSL certificate verification.
  required: false
  default: false
  type: boolean
{% endconfiguration %}

## Sensor

The state of the Synology SRM sensor contains the external IP address for the router - however this is only set if the monitored_conditions is not specified or contains core.ddns_extip.

The sensors attributes are filled with other information obtained from the router.

```yaml
# Example configuration.yaml entry
sensor:
  - platform: synology_srm
    host: IP_ADDRESS
    password: PASSWORD
    monitored_conditions:
      - core.ddns_extip
      - core.system_utilization
```

{% configuration %}
host:
  description: The Synology SRM router host or IP address, e.g., `192.168.1.1` or `router.mydomain.local`
  required: true
  type: string
port:
  description: The port to connect to the Synology SRM router.
  required: false
  default: 8001
  type: integer
username:
  description: The username of a user with administrative privileges.
  required: false
  default: admin
  type: string
password:
  description: The password for your given admin account.
  required: true
  type: string
ssl:
  description: Use HTTPS instead of HTTP to connect.
  required: false
  default: true
  type: boolean
verify_ssl:
  description: Enable or disable SSL certificate verification.
  required: false
  default: false
  type: boolean
name:
  description: Allows a custom name to be set for the sensor - it is recommended that this be set when more than one router is being monitored. 
  required: false
  default: synology_srm
  type: string
monitored_conditions:
  description: This specifies what information is obtained from the router and stored in the entity's attributes.
  required: false
  default: core.ddns_extip
  type: list
  keys:
    base.encryption
    base.info
    core.ddns_extip
    core.ddns_record
    core.system_utilization
    core.network_nsm_device
    mesh.network_wanstatus
    mesh.network_wifidevice
    mesh.system_info
{% endconfiguration %}

### Example

The following will create two entities that will store the routers current WAN traffic:

```yaml
sensor:
  - platform: synology_srm
    host: SynologyRouter.local
    password: !secret SynologyRouter
    monitored_conditions:
      - core.ddns_extip
      - core.system_utilization
  - platform: template
    sensors:
      wan_download:
        value_template: "{% set i = namespace() %}{% set i.i = 0 %}{% for item in states.sensor.synology_srm.attributes.core.system_utilization.network if item.device|regex_match('^(usbnet|ppp)', ignorecase=true) %}{% set i.i = i.i + item.rx %}{% endfor %}{{ ((i.i / 1024 / 1024) * 8)|round(2) }}"
        friendly_name: Download
        unit_of_measurement: Mbit/s
        icon_template: 'mdi:download'
      wan_upload:
        value_template: "{% set i = namespace() %}{% set i.i = 0 %}{% for item in states.sensor.synology_srm.attributes.core.system_utilization.network if item.device|regex_match('^(usbnet|ppp)', ignorecase=true) %}{% set i.i = i.i + item.tx %}{% endfor %}{{ ((i.i / 1024 / 1024) * 8)|round(2) }}"
        friendly_name: Upload
        unit_of_measurement: Mbit/s
        icon_template: 'mdi:upload'
```

## Notes

It's not possible to create another account in SRM with admin permissions. You'll need to use your admin account (or the one you renamed at creation) for this connection.

List of models known to be supported:

- RT1900ac
- RT2600ac

See the [device tracker integration page](/integrations/device_tracker/) for instructions on how to configure the people to be tracked.
