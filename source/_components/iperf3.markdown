---
layout: page
title: "Iperf3 Sensor"
description: "How to use Iperf3 within Home Assistant to measure your network bandwidth."
date: 2018-05-01 02:00
sidebar: true
comments: false
sharing: true
footer: true
logo: iperf3.png
ha_category:
  - System Monitor
  - Sensor
ha_release: 0.71
ha_iot_class: Local Polling
redirect_from:
  - /components/sensor.iperf3/
---

The `iperf3` sensor component allows you to measure network bandwidth performance against a private or public Iperf3 server.

Enabling this component will automatically create the Iperf3 Sensors for the monitored conditions (below).

By default, it will run every hour. The user can change the update frequency in the config by defining the `scan_interval` for a iperf3 test to run.

## {% linkable_title Configuration %}

To add the `iperf3` sensor to your installation, add the following to your `configuration.yaml` file:

Once per hour, on the hour (default):

```yaml
# Example configuration.yaml entry
iperf3:
  hosts:
    - host: iperf.he.net
```

{% configuration %}
  monitored_conditions:
    description: Sensors to display in the frontend.
    required: false
    type: list
    keys:
      download:
        description: Download speed (Mbit/s)
      upload:
        description: Upload speed (Mbit/s)
  hosts:
    description: A list of Iperf3 servers to perform the test against.
    required: true
    type: list
  scan_interval:
    description: "Minimum time interval between updates. Supported formats: `scan_interval: 'HH:MM:SS'`, `scan_interval: 'HH:MM'` and Time period dictionary (see example below)."
    required: false
    default: 60 minutes
    type: time
  manual:
    description: >
      `true` or `false` to turn manual mode on or off. Manual mode will disable scheduled tests.
    required: false
    type: boolean
    default: false
{% endconfiguration %}

Configuration variables (host):
{% configuration %}
  host:
    description: Server name/ip address running Iperf3 to test against.
    required: true
    type: string
  port:
    description: Port that Iperf3 is running on.
    required: false
    default: 5201
    type: integer
  duration:
    description: Specify the test duration in seconds. Default is 10 and the valid range is from 5 to 10.
    required: false
    default: 10
    type: integer
  parallel:
    description: Specify the number of concurrent streams to connect to the server. Default is 1 and the valid range is from 1 to 20.
    default: 1
    type: integer
  protocol:
    description: Specify the protocol to be used on the test. Default is TCP and the valid values are TCP or UDP. If your Iperf3 server is located in the Internet, consider to use TCP instead of UDP. If the protocol is set to use UDP, the sensor may not get updated due to package retransmission issues due to its nature.
    required: false
    default: tcp
    type: string
{% endconfiguration %}

#### {% linkable_title Time period dictionary example %}

```yaml
scan_interval:
  # At least one of these must be specified:
  days: 0
  hours: 0
  minutes: 3
  seconds: 30
  milliseconds: 0
```

You can find a list of public Iperf3 servers [here](https://iperf.fr/iperf-servers.php). You can also start your own Iperf3 server using the [mlabbe/iperf3's](https://hub.docker.com/r/mlabbe/iperf3/) docker image or just refer to your `iperf3` command's man page.

The frequency when the test will be automatically triggered can be adjusted by setting the value `scan_interval` in seconds.

Parallel streams can help in some situations. As TCP attempts to be fair and conservative, you may consider increasing the `parallel` attribute. Use this value with careful and refer to Iperf3 man page for more information.

You can use the service `sensor.iperf3_update` to trigger a manual speed test for all sensors. Iperf3 has its own service call that allow to perform a speed test on a particular entity.

### {% linkable_title Service %}

Once loaded, the `iperf3` component will expose a service (`iperf3.speedtest`) that can be called to run a speed test on demand. This can be useful if you have enabled manual mode.

| Service data attribute | Description |
| `host` | String that point at a configured `host` from configuration.yaml. Otherwise, tests will be run against all configured hosts.


## {% linkable_title Notes %}

- When running on Raspberry Pi, just note that the maximum speed is limited by its 100 Mbit/s LAN adapter.
- This component requires the `iperf3` command to be installed on your OS. Please, refer to the [official Iperf3 documentation](http://software.es.net/iperf/obtaining.html) for installation instructions.
