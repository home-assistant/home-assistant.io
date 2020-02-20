---
title: "QVR Pro"
description: "Instructions on how to integrate QVR Pro within Home Assistant."
logo: qvr_pro.png
ha_category:
  - Camera
ha_release: "0.106"
---

[QVR Pro](https://www.qnap.com/solution/qvr-pro-official) allows you to create 
an independent and expandable surveillance environment on your QNAP NAS.  The 
`qvr_pro` component allows you to view your QVR Pro channels in Home Assistant.

Currently only cameras are supported by this integration.

## Configuration

To enable QVR Pro integration, add the following to your
`configuration.yaml` file:

```yaml
# Example configuration.yaml entry
qvr_pro:
  host: YOUR_HOST
  username: pyqvruser
  password: password
  exclude_channels: 2,5,6
```

{% configuration %}
host:
  description: The IP address where QVR Pro is accessible.
  required: true
  type: string
username:
  description: The username for accessing your Ring account.
  required: true
  type: string
password:
  description: The password for accessing your Ring account.
  required: true
  type: string
exclude_channels:
  description: Comma separated list of channel numbers to be excluded.
  required: false
  type: list
{% endconfiguration %}

Enabling the QVR Pro camera platform will add all QVR Pro channels by
default. Please see `exclude_channels` if you would like to exclude
specific channels from showing up in Home Assistant.

<p class="note warning">
The QVR Pro user must have Surveillance Management permission.
</p>
