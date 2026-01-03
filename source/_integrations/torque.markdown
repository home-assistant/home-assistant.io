---
title: Torque
description: Instructions on how to integrate Torque sensors into Home Assistant.
ha_category:
  - Car
ha_release: '0.10'
ha_iot_class: Local Push
ha_domain: torque
ha_platforms:
  - sensor
ha_integration_type: integration
ha_quality_scale: legacy
---

The `torque` platform will allow you to monitor [Torque](https://torque-bhp.com/) data relayed from a Bluetooth OBD2 stick via the Torque mobile application.

## Setup

To use Torque sensors with your installation, you must configure both the Torque mobile application and Home Assistant.

### Torque application

In **Settings** -> **Data Logging & Upload**:

Under the **Logging Preferences** header:

- Touch **Select what to log**, activate the menu in the upper right, and select **Add PID to log**.
- Select items of interest.

Under the **Realtime Web Upload** header:

- Check **Upload to web-server**.
- Enter `https://HOST/api/torque` or `https://@/HOST:PORT/api/torque` as the **Web-server URL**, where `HOST` and `PORT` are your externally accessible Home Assistant HTTP host. To use a Bearer Token, this has to be [SSL/TLS](/docs/ecosystem/certificates/).
- Enable **Send https: Bearer Token**  (available since Torque Pro 1.12.46)
- Paste a Long-Lived Access Token from any Home Assistant user in **Set Bearer Token** field.
- Enter an email address in **User Email Address** (this can be any non empty string you like). 
- Optionally set the **Web Logging Interval**. The 2-second default may quickly fill up the Home Assistant history database.

### Configuration

Add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: torque
    email: your_configured@email.com
```

{% configuration %}
name:
  description: Vehicle name (your choice).
  required: false
  default: vehicle
  type: string
email:
  description: Value from the Email address field configured in Torque application. Doesn't have to be in email syntax.
  required: true
  type: string
{% endconfiguration %}
