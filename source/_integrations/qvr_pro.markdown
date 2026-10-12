---
title: QVR Pro
description: Instructions on how to integrate QVR Pro within Home Assistant.
ha_category:
  - Camera
ha_iot_class: Local Polling
ha_release: 0.107
ha_domain: qvr_pro
ha_codeowners:
  - '@oblogic7'
ha_platforms:
  - camera
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

[QVR Pro](https://www.qnap.com/en/software/qvr-pro) allows you to create 
an independent and expandable surveillance environment on your QNAP NAS. The 
`qvr_pro` integration allows you to view your QVR Pro channels in Home Assistant.

Currently, only cameras are supported by this integration.

## Configuration

To enable QVR Pro integration, add the following to your
{% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
qvr_pro:
  host: YOUR_HOST
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
```

{% configuration %}
host:
  description: The IP address where QVR Pro is accessible.
  required: true
  type: string
username:
  description: The username for accessing your QVR account.
  required: true
  type: string
password:
  description: The password for accessing your QVR account.
  required: true
  type: string
port:
  description: The port where QVR accepts connections.
  required: false
  default: 8080
  type: integer
exclude_channels:
  description: Comma separated list of channel numbers to be excluded.
  required: false
  type: list
{% endconfiguration %}

Enabling the QVR Pro camera platform will add all QVR Pro channels by
default. Please see `exclude_channels` if you would like to exclude
specific channels from showing up in Home Assistant.

{% important %}
The QVR Pro user must have Surveillance Management permission.
{% endimportant %}

{% include integrations/actions.md %}

## QVR Pro automation examples

With the recording actions, Home Assistant decides when your QVR Pro server records.

{% include docs/paste_yaml_tip.md %}

### Automation: record the driveway when motion is detected

Start recording the driveway camera on your QVR Pro server as soon as the motion sensor detects motion.

- **Trigger**: State changed
  - **Entity**: Driveway motion (`binary_sensor.driveway_motion`)
  - **To**: Detected
- **Action**: Start record
  - **GUID**: The GUID of the driveway camera channel

{% details "YAML example for recording when motion is detected" %}

{% example %}
automation: |
  alias: "Record the driveway when motion is detected"
  triggers:
    - trigger: state
      entity_id: binary_sensor.driveway_motion
      to: "on"
  actions:
    - action: qvr_pro.start_record
      data:
        guid: "YOUR_CHANNEL_GUID"
{% endexample %}

{% enddetails %}

### Automation: stop recording when the driveway is quiet again

Stop recording the driveway camera when the motion sensor has not detected motion for 2 minutes.

- **Trigger**: State changed
  - **Entity**: Driveway motion (`binary_sensor.driveway_motion`)
  - **To**: Clear
  - **For at least**: 2 minutes
- **Action**: Stop record
  - **GUID**: The GUID of the driveway camera channel

{% details "YAML example for stopping the recording when it's quiet" %}

{% example %}
automation: |
  alias: "Stop recording when the driveway is quiet"
  triggers:
    - trigger: state
      entity_id: binary_sensor.driveway_motion
      to: "off"
      for:
        minutes: 2
  actions:
    - action: qvr_pro.stop_record
      data:
        guid: "YOUR_CHANNEL_GUID"
{% endexample %}

{% enddetails %}
