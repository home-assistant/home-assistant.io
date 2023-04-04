---
title: KAT Bulgaria
description: Gets the current user obligations/fines from the official government website of KAT Bulgaria.
ha_category:
  - Binary Sensor
ha_release: 2023.5
ha_iot_class: Cloud Polling
ha_quality_scale: No score
ha_codeowners:
  - '@Nedevski'
ha_domain: kat_bulgaria
ha_platforms:
  - binary_sensor
ha_integration_type: integration
---

The `kat_bulgaria` sensor platform allows users to get details about any fines from the Bulgarian Traffic Police (KAT).
The integration is a wrapper around the official government website.
([e-uslugi.mvr.bg](https://e-uslugi.mvr.bg/services/kat-obligations)).

For each entry in the `configuration.yaml` this integration will create a single [binary_sensor](/integrations/binary_sensor) indicating if you have a fine or not. You can add as many entries as you need.

If you don't provide a name for the person you are checking for, the entities will use the Driver License Number for their naming (ex. `globi_123456789`). If you provide a `person_name`, that will be used instead (ex. `globi_nikola`)

## Configuration

To enable the platform, add the following lines to your `configuration.yaml`
file:

```yaml
sensor:
  - platform: kat_bulgaria
    person_name: "PERSON_NAME"
    egn: "PERSON_EGN"
    driver_license_number: "PERSON_DRIVING_LICENSE_NUMBER"
```

## Secure Configuration

Since your EGN and Driver License Number are sensitive, it's better if you use secrets to store them.

You can do that by adding your data to the `secrets.yaml` file. Of course feel free to rename the secrets with the name of the person you are going to check for:

```yaml
NAME_egn: "PERSON_EGN"
NAME_driving_license: "PERSON_DRIVING_LICENSE_NUMBER"
```

Then add them to you `configuration.yaml` file:

```yaml
sensor:
  - platform: kat_bulgaria
    person_name: "PERSON_NAME"
    egn: !secret NAME_egn
    driver_license_number: !secret NAME_driving_license
```


{% configuration %}
egn:
  description: The person's EGN.
  required: true
  type: string
driver_license_number:
  description: The person's driving license number.
  required: true
  type: string
person_name:
  description: The person's name.
  required: false
  type: string
{% endconfiguration %}
