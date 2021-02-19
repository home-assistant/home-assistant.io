---
title: Brunt Blind Engine
description: Instructions on how to set up Brunt Blind Engine within Home Assistant.
ha_category:
  - Cover
ha_release: 0.75
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@eavanvalkenburg'
ha_domain: brunt
ha_platforms:
  - cover
---

The `brunt` platform allows one to control Blind Engines by [Brunt](https://www.brunt.co). To use this sensor, you need a Brunt App Account. All Brunt Blind devices registered to your account are automatically added to your Home Assistant with the names given them through the Brunt app.

## Configuration

To enable this integration, add the following lines to your `configuration.yaml`:

```yaml
cover:
  - platform: brunt
    username: BRUNT_USERNAME
    password: BRUNT_PASSWORD
```

{% configuration %}
name:
  description: Cover name
  required: false
  default: "brunt blind engine"
  type: string
username:
  description: Account username of your Brunt app
  required: true
  type: string
password:
  description: Account password of your Brunt app
  required: true
  type: string
{% endconfiguration %}

<div class='note warning'>
This integration is not affiliated with Brunt and retrieves data from the endpoints of the mobile application. Use at your own risk.
</div>
