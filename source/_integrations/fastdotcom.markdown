---
title: Fast.com
description: How to integrate Fast.com within Home Assistant.
ha_category:
  - Sensor
  - System Monitor
ha_release: 0.88
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@rohankapoorcom'
ha_domain: fastdotcom
ha_platforms:
  - sensor
ha_integration_type: integration
---

The `fastdotcom` integration uses the [Fast.com](https://fast.com/) web service to measure network bandwidth performance.

<div class='note'>

Currently, the Fast.com integration only supports measuring download bandwidth.
If you want to measure bandwidth metrics other then download such as ping and upload, utilize the [Speedtest.net](/integrations/speedtestdotnet) integration.

</div>

Enabling this integration will automatically create the Fast.com Sensor.

By default, a speed test will be run every hour. The user can change the update frequency in the configuration by defining the `scan_interval` for a speed test to run.

## Configuration

To add Fast.com to your installation, add the following to your `configuration.yaml` file:

Once per hour, on the hour (default):

```yaml
fastdotcom:
```

Every half hour of every day:

```yaml
fastdotcom:
  scan_interval:
      minutes: 30
```

{% configuration %}
scan_interval:
  description: "Minimum time interval between updates. Supported formats: `scan_interval: 'HH:MM:SS'`, `scan_interval: 'HH:MM'` and Time period dictionary (see example below)."
  required: false
  default: 60 minutes
  type: time
manual:
  description: Turn manual mode on or off. Manual mode will disable scheduled speedtests.
  required: false
  default: false
  type: boolean
{% endconfiguration %}

#### Time period dictionary example

```yaml
scan_interval:
  # At least one of these must be specified:
  days: 0
  hours: 0
  minutes: 3
  seconds: 30
  milliseconds: 0
```

### Service

Once loaded, the `fastdotcom` integration will expose a service (`fastdotcom.speedtest`) that can be called to run a Fast.com speed test on demand. This service takes no parameters. This can be useful if you have enabled manual mode.

```yaml
action:
  service: fastdotcom.speedtest
```

## Notes

- When running on Raspberry Pi 3 or older, the maximum speed is limited by its 100 Mbit/s LAN adapter.
- The sensor will return the maximum measured speed during a 15-second test.
- Speed tests consume data depending on your internet speed, make sure to consider this if your internet connection has limited bandwidth.
