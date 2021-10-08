---
title: U.S. Citizenship and Immigration Services (USCIS)
description: Instructions on how to set up USCIS within Home Assistant.
ha_category:
  - Sensor
ha_release: 0.68
ha_iot_class: Cloud Polling
ha_domain: uscis
ha_platforms:
  - sensor
---

The `uscis` sensor integration allows you get updates on your USCIS case using your case/receipt number. The sensor gets the case information from the [USCIS Website](https://egov.uscis.gov/casestatus/landing.do).

## Configuration

To use this sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
sensor:
  - platform: uscis
    case_id: YOUR_CASE_NUMBER
    name: OPTIONAL_NAME
```

{% configuration %}
name:
  description: Name of the sensor in Home Assistant.
  required: false
  default: USCIS
  type: string
case_id:
  description: Case/receipt number used to get the case details from the USCIS web client.
  required: true
  type: string
{% endconfiguration %}

All the data will be fetched from [USCIS](https://egov.uscis.gov/casestatus/mycasestatus.do).
