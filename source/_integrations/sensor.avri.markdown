---
title: Avri Waste Sensor
description: Instructions on how to set up Avri Waste sensor within Home Assistant.
logo: avri.jpeg
ha_category: 
  - Sensor
ha_iot_class: "Cloud Polling"
ha_release: '0.106'
ha_codeowners:
  - '@timvancann'
---

The `Avri Waste` platform allows you to track the next scheduled waste pickup and what type of waste from [Avri](https://www.avri.nl/). 

## Configuration

To enable this sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: avri
    postcode: YOUR_POST_CODE
    house_number: YOUR_HOUSE_NUMBER
```

{% configuration %}
postcode:
  description: Your postcode 
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
  default: ''
county_code:
  description: Your country code
  required: false
  type: string
  default: NL
{% endconfiguration %}

The default frequency for pulling data from the Avri API is once every 4 hours.

<p class='note warning'>
The Avri sensor uses the an unofficial API to obtain data. Use at your own risk.
</p>
