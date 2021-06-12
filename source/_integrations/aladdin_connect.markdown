---
title: Aladdin Connect
description: Instructions how to integrate Genie Aladdin Connect garage door covers into Home Assistant.
ha_category:
  - Cover
ha_release: 0.75
ha_iot_class: Cloud Polling
ha_domain: aladdin_connect
ha_platforms:
  - cover
---

The `aladdin_connect` cover platform lets you control Genie Aladdin Connect garage doors through Home Assistant.

<div class='note'>
Only doors that are owned by your Aladdin Connect account will be available. Doors that your account has been granted shared access to are not yet supported.
</div>

## Configuration

To use your Aladdin Connect cover in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
cover:
  - platform: aladdin_connect
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

{% configuration %}
username:
  description: Your Aladdin Connect account username.
  required: true
  type: string
password:
  description: Your Aladdin Connect account password.
  required: true
  type: string
{% endconfiguration %}
