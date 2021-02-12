---
title: Hikvision
description: Instructions on how to integrate Hikvision camera switches into Home Assistant.
ha_category:
  - Switch
ha_iot_class: Local Polling
ha_release: pre 0.7
ha_codeowners:
  - '@fbradyirl'
ha_domain: hikvisioncam
ha_platforms:
  - switch
---

This `hikvisioncam` switch platform allows you to control your motion detection setting on your [Hikvision](https://www.hikvision.com/) camera.

<div class='note warning'>
Currently works using default https port only.
</div>

To use your Hikvision cam in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: hikvisioncam
    host: 192.168.1.32
```

In the Hikvision camera settings you also need to make a few changes:
- In the camera menu navigate to Network >> Advanced Settings >> Integration Protocol. Check the 'Enable Hikvision-CGI' box and set the 'Hikvision-CGI Authentication' to 'digest/basic'.
- Make sure the camera user has the rights to change parameter settings. In the menu navigate to System Settings >> User Management >> User Management. Select the correct user, click 'Modify' en check the 'Remote: Parameters Settings' box.

{% configuration %}
host:
  description: The IP address of your Hikvision camera, e.g., `192.168.1.32`.
  required: true
  type: string
port:
  description: The port to connect to your Hikvision camera.
  required: false
  default: 80
  type: integer
name:
  description: This parameter allows you to override the name of your camera.
  required: false
  default: Hikvision Camera Motion Detection
  type: string
username:
  description: The username for accessing your Hikvision camera.
  required: false
  default: admin
  type: string
password:
  description: The password to access your Hikvision camera.
  required: false
  default: 12345
  type: string
{% endconfiguration %}
