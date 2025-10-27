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
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

This `hikvisioncam` switch {% term integration %} allows you to control your motion detection setting on your [Hikvision](https://www.hikvision.com/) camera.

{% important %}
Currently works using default HTTPS port only.
{% endimportant %}

To use your Hikvision cam in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

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
