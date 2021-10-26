---
title: shiftr.io
description: Transfer events to Shiftr.io.
ha_category:
  - History
ha_iot_class: Cloud Push
ha_release: 0.48
ha_codeowners:
  - '@fabaff'
ha_domain: shiftr
---

The `shiftr` integration makes it possible to transfer details collected with Home Assistant to [Shiftr.io](https://shiftr.io) and visualize the flow of the information. Keep in mind that your details will be public!

## Configuration

Create a new [namespace](https://shiftr.io/new) and generate a new token. You will need to use `Key (Username)` and `Secret (Password)` to setup the component.

To use the `shiftr` integration in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
shiftr:
  username: YOUR_NAMESPACE_USERNAME
  password: YOUR_NAMESPACE_PASSWORD
```

{% configuration %}
username:
  description: Username for the Shiftr namespace.
  required: true
  type: string
password:
  description: Password for the Shiftr namespace.
  required: true
  type: string
{% endconfiguration %}
