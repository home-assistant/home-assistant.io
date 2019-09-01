---
title: "Livebox"
description: "Instructions on how to integrate Orange Livebox routers into Home Assistant."
logo: orange_livebox.svg
ha_category:
  - Network
  - Presence Detection
  - Sensor
ha_release: 0.99
ha_iot_class: Local Polling
redirect_from:
  - /components/device_tracker.livebox/
  - /components/sensor.livebox/
---

The `livebox` integration allows you to observe and control [Livebox router](http://www.orange.fr/).

There is currently support for the following device types within Home Assistant:

* [Sensor](#sensor) with traffic metrics
* [Device tracker](#presence-detection) for connected devices

## Configuration

The preferred way to setup the Orange Livebox platform is by enabling the discovery component.
Add your equipment via the Integration menu

If you have enabled the [discovery component](/components/discovery/),
your Livebox should be detected automatically. Otherwise, you can set it
up manually in your `configuration.yaml` file:

```yaml
livebox:
  host: 192.168.1.1
  port: 80
  username: 'admin'
  password: 'xxxxxx'
```

{% configuration %}
host:
  description: The ip address of the Livebox.
  required: true
  type: string
  default: '192.168.1.1'
port:
  description: The http port the Livebox is listening on.
  required: true
  type: integer
  default: 80
userename:
  description: Login ID of the livebox
  required: false
  type: string
  default: 'admin'
password:
  description: The password of Login ID.
  required: true
  type: string
{% endconfiguration %}

You can find out your Livebox host and port by opening the address livebox.home/ws in your browser. The
returned json should contain an api_domain (`host`) and a http_port (`port`).


### Initial setup

<div class='note warning'>
You must have set a password for your Livebox router web administration page. 
</div>

The first time Home Assistant will connect to your Livebox, you will need to specify the password of livebox


### Supported routers

Only the routers with Livebox OS are supported:

* Livebox v3 
* Livebox v4 (not tested)

## Presence Detection

This platform offers presence detection by keeping track of the
devices connected to a [Livebox](http://www.orange.fr/) router.

Ability to disable this option by integration options

### Notes

Note that the Livebox waits for some time before marking a device as
inactive, meaning that there will be a small delay (1 or 2 minutes)
between the time you disconnect a device and the time it will appear
as "away" in Home Assistant. You should take this into account when specifying
the `consider_home` parameter.
On the contrary, the Livebox immediately reports devices newly connected, so
they should appear as "home" almost instantly, as soon as Home Assistant
refreshes the devices states.

## Sensor

This platform offers you sensors to monitor a Livebox router. The monitored conditions are
instant upload and download rates in Mb/s.

