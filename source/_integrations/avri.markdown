---
title: Avri
description: Instructions on how to set up Avri Waste sensor within Home Assistant.
ha_category:
  - Sensor
ha_iot_class: Cloud Polling
ha_release: 0.107
ha_codeowners:
  - '@timvancann'
ha_domain: avri
---

The `Avri Waste` platform allows you to track the next scheduled waste pickup and the type of waste from [Avri](https://www.avri.nl/).

## Configuration

To enable this sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: avri
    zip_code: YOUR_ZIP_CODE
    house_number: YOUR_HOUSE_NUMBER
```

{% configuration %}
zip_code:
  description: Your zip code
  required: true
  type: string
house_number:
  description: Your house number
  required: true
  type: integer
house_number_extension:
  description: Your house number extension
  required: false
  type: string
county_code:
  description: Your country code
  required: false
  type: string
  default: NL
{% endconfiguration %}

The default frequency for pulling data from the Avri API is once every 4 hours. If the Avri API does not return any pickup days the state of the sensor is set to `unknown`.

<p class='note warning'>
The Avri sensor uses an unofficial API to obtain data. Use it at your own risk.
</p>
