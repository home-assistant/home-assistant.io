---
title: HALO Home
description: Instructions on integrating HALO Home smart lights into Home Assistant.
ha_category:
  - Light
ha_release: 2021.11
ha_iot_class: Assumed State
ha_codeowners:
  - '@nayaverdier'
ha_domain: halohome
ha_platforms:
  - light
---

Integrates [HALO Home](https://www.cooperlighting.com/global/brands/halo-home) smart lights into Home Assistant.

## Configuration

To integrate with HALO Home, just add HALO Home login credentials to `configuration.yaml`:

```yaml
light:
  - platform: halohome
    username: EMAIL
    password: PASSWORD
```

{% configuration %}
username:
  description: The username/email of the HALO Home account.
  required: true
  type: string
password:
  description: The password of the HALO Home account.
  required: true
  type: string
{% endconfiguration %}
