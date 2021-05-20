---
title: Melissa
description: Instructions on how to integrate Melissa Climate into Home Assistant.
ha_category:
  - Hub
  - Climate
ha_release: 0.63
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@kennedyshead'
ha_domain: melissa
ha_platforms:
  - climate
---

The `melissa` integration is the main integration to connect to a [Melissa Climate](https://seemelissa.com/) A/C control.

There is currently support for the following device types within Home Assistant:

- Climate

The climate platform will be automatically configured if Melissa integration is configured.

## Configuration

To set the Melissa integration up, add the following information to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
melissa:
  username: YOUR_MELISSA_USERNAME
  password: YOUR_PASSWORD
```

{% configuration %}
  username:
    description: The username for accessing your Melissa account.
    required: true
    type: string
  password:
    description: The password for accessing your Melissa account.
    required: true
    type: string
{% endconfiguration %}
