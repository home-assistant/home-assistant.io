---
title: Fedex Sensor
description: "Instructions on how to set up FedEx sensors within Home Assistant."
logo: fedex.png
ha_category:
  - Postal Service
ha_release: 0.39
ha_iot_class: Cloud Polling
---

<div class="note warning">

This integration is deprecated and will be removed in Home Assistant 0.100.0.

For more information see [Architecture Decision Record: 0004](https://github.com/home-assistant/architecture/blob/master/adr/0004-webscraping.md).

</div>

The `fedex` platform allows one to track deliveries by [FedEx](http://www.fedex.com/). To use this sensor, you need a [FedEx Delivery Manager](https://www.fedex.com/us/delivery/) account.

## Configuration

To enable this sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: fedex
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

Configuration options for the FedEx Sensor:

- **username** (*Required*): The username to access the FedEx Delivery Manager service.
- **password** (*Required*): The password for the given username.
- **name** (*Optional*): Name the sensor.
- **scan_inverval** (*Optional*): Minimum time interval between updates. Default is 1 hour. Supported formats:
  - `scan_interval: 'HH:MM:SS'`
  - `scan_interval: 'HH:MM'`
  - Time period dictionary, e.g.:
    <pre>scan_interval:
        # At least one of these must be specified:
        days: 0
        hours: 0
        minutes: 3
        seconds: 30
        milliseconds: 0
    </pre>

<div class='note warning'>
The FedEx sensor logs into the FedEx Delivery Manager website to scrape package data. It does not use an API. Use at your own risk.
</div>
