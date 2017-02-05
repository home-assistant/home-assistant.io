---
layout: page
title: ELTA Sensor
description: "Instructions on how to set up Elta sensors within Home Assistant."
date: 2017-02-05 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: http://www.elta.gr/Portals/0/elta.jpg
ha_category: Sensor
ha_release: 0.36
---

The `elta` platform allows one to track deliveries by the [Hellenic Postal Service (ELTA)](https://www.elta.gr/en-us/home.aspx).
TO ADD @@@@@@@@@@@.

To enable this sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: Elta
    code: YOUR_TRACKING_CODE
```

TO BE EDITED @@@@Configuration options for the ELTA Sensor:

- **username** (*Required*): The username to access the MyUSPS service.
- **password** (*Required*): The password for the given username.
- **name** (*Optional*): Name the sensor (default: your mailing address).
- **update_inverval** (*Optional*): Minimum time interval between updates. Default is 1 hour. Supported formats:
  - `update_interval: 'HH:MM:SS'`
  - `update_interval: 'HH:MM'`
  - Time period dictionary, e.g.:
    <pre>update_interval:
        # At least one of these must be specified:
        days: 0
        hours: 0
        minutes: 3
        seconds: 30
        milliseconds: 0
    </pre>

<p class='note warning'>
The ELTA sensor is in BETA and currently only show tracking from ELTA.
</p>
