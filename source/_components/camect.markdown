---
layout: page
title: "Camect"
description: "How to integrate Camect into Home Assistant."
date: 2019-03-25 15:28
sidebar: true
comments: false
sharing: true
footer: true
logo: camect.png
ha_category:
  - Hub
  - Camera
ha_release: 0.91
ha_iot_class: Local Polling
redirect_from:
  - /components/camera.camect/
---

The Camect component sets up the integration with your [Camect](https://www.camect.com) instance.
Let you watch your camera streams using WebRTC. It's live stream, not image snapshots.

There is currently support for the following device types within Home Assistant:

- [Camera](#camera)

## {% linkable_title Configuration %}

```yaml
# Example configuration.yaml entry
camect:
  password: ADMIN_PASSWORD
```

{% configuration %}
host:
  description: Your Camect Home's host name, not including the port.
  required: false
  type: string
  default: "`camect.local`"
port:
  description: Port of your Camect Home instance.
  required: false
  type: integer
  default: 8443
username:
  description: Your Camect Home local username, needs to have admin capability.
  required: false
  type: string
  default: "`admin`"
password:
  description: Your Camect Home local password.
  required: true
  type: string
camect_ids:
  description: Comma separated camera IDs.
  required: false
  type: string
  default: "`ALL_AVAILABLE_CAMERAS`"
{% endconfiguration %}

### {% linkable_title Full configuration %}

```yaml
# Example configuration.yaml entry
camect:
  host: camect.local
  port: 8443
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
  camera_ids: aaa,bbbb
```

### {% linkable_title Service %}

Once loaded, the `Camect` component will expose a service (`change_op_mode`) that can be used to change Camect Home's operation mode.

| Service data attribute | Optional | Description  |
|:-----------------------|:---------|:-------------|
| `mode`                 | no       | HOME/AWAY    |


 ```yaml
action:
  service: camect.change_op_mode
  data:
    mode: HOME
```
