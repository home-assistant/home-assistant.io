---
title: ASUSWRT
description: Instructions on how to integrate ASUSWRT into Home Assistant.
ha_category:
  - Hub
  - Presence Detection
  - Sensor
ha_release: 0.83
ha_config_flow: true
ha_iot_class: Local Polling
ha_codeowners:
  - '@kennedyshead'
ha_domain: asuswrt
---

The `asuswrt` integration is the main integration to connect to a [ASUSWRT](https://www.asus.com/ASUSWRT/) based router.

There is currently support for the following device types within Home Assistant:

- **Presence Detection** - The ASUSWRT platform offers presence detection by looking at connected devices to a ASUSWRT based router.
- **Sensor** - The ASUSWRT sensor platform allows you to get upload and download data from your ASUSWRT within Home Assistant.

## Configuration via frontend

To add your ASUSWRT devices into your Home Assistant installation, go to:

**Configuration** -> **Integrations** in the UI, click the button with `+` sign and from the list of integrations select **ASUSWRT**.

### Configuration via YAML

_YAML configuration is still around for people that prefer YAML, but it's deprecated, and you should not use it anymore._

To use an ASUSWRT router in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
asuswrt:
  host: YOUR_ROUTER_IP
  username: YOUR_ADMIN_USERNAME
```

{% configuration %}
host:
  description: "The IP address of your router, e.g., `192.168.1.1`."
  required: true
  type: string
username:
  description: "The username of a user with administrative privileges, usually `admin`."
  required: true
  type: string
password:
  description: "The password for your given admin account (use this if no SSH key is given)."
  required: false
  type: string
protocol:
  description: "The protocol (`ssh` or `telnet`) to use."
  required: false
  type: string
  default: ssh
port:
  description: SSH port to use.
  required: false
  type: integer
  default: 22
mode:
  description: "The operating mode of the router (`router` or `ap`)."
  required: false
  type: string
  default: router
ssh_key:
  description: The path to your SSH private key file associated with your given admin account (instead of password).
  required: false
  type: string
require_ip:
  description: If the router is in access point mode.
  required: false
  type: boolean
  default: true
interface:
  description: "The interface of the router that you want statistics from (e.g. eth0,eth1 etc)"
  required: false
  type: string
  default: eth0
dnsmasq:
  description: "The location of the dnsmasq.leases files"
  required: false
  type: string
  default: /var/lib/misc 
{% endconfiguration %}

<div class='note warning'>

You need to enable telnet on your router if you choose to use `protocol: telnet`.

</div>

## Sensor Configuration

These sensors are automatically created in status **disabled** and associated to the router device:

- Connected devices sensor
- Download sensor (unit_of_measurement: Gigabyte - *Daily accumulation*)
- Download Speed sensor (unit_of_measurement: Mbit/s)
- Upload sensor (unit_of_measurement: Gigabyte - *Daily accumulation*)
- Upload Speed sensor (unit_of_measurement: Mbit/s)

To use ASUSWRT sensors, simply **enable** them in the devices page.

## Integration Options

It is possible to change some behaviors through the integration options. These can be changed at **ASUSWRT** -> **Options** on the Integrations page.

- **Interface**: The interface that you want statistics from (e.g. eth0,eth1 etc)
- **Dnsmasq**: The location in the router of the dnsmasq.leases files
- **Require IP**: If devices must have IP (this option is available only for access point mode)

## Padavan custom firmware (The rt-n56u project)

The [rt-n56u project](https://bitbucket.org/padavan/rt-n56u) does not store `dnsmasq.leases` which is used to track devices at `/var/lib/misc/` as `asuswrt` do. However this integration can still be used for the rt-n56u project by changing the dnsmasq location using the `dnsmasq` variable to `dnsmasq: '/tmp'`
Also, to get the statistics for the `WAN` port, specify `interface: 'eth3'` as this is the interface used in the rt-n56u project
