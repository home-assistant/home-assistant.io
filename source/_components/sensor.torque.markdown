---
layout: page
title: "Torque (OBD2)"
description: "Instructions on how to integrate Torque sensors into Home Assistant."
date: 2015-12-20 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: torque.png
ha_category: Transport
ha_release: "0.10"
ha_iot_class: "Cloud Polling"
---

The `torque` platform will allow you to monitor [Torque](http://torque-bhp.com/) data relayed from a Bluetooth OBD2 stick via the Torque mobile application.

## {% linkable_title Configuration %}
To use Torque sensors with your installation, you must configure both the Torque mobile application and Home Assistant.

### {% linkable_title Torque application %}

In **Settings** -> **Data Logging & Upload**:

Under the **Logging Preferences** header:

- Touch **Select what to log**, activate the menu in the upper right, and select **Add PID to log**.
- Select items of interest.

Under the **Realtime Web Upload** header:

- Check **Upload to web-server**.
- Enter `http://HOST:PORT/api/torque?api_password=YOUR_PASSWORD` as the **Web-server URL**, where `HOST` and `PORT` are your externally accessible Home Assistant HTTP host and port and YOUR_PASSWORD is your Home Assistant's [API password](/components/http/). It highly recommended that you protect your Home Assistant instance with [SSL/TSL](/docs/ecosystem/certificates/).
- Enter an email address in **User Email Address**.
- Optionally set the **Web Logging Interval**. The 2-second default may quickly fill up the Home Assistant history database.

### {% linkable_title Home Assistant %}

Add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: torque
    email: your_configured@email.com
```

Configuration variables:

- **name** (*Optional*): Vehicle name (your choice).
- **email**  (*Required*): Email address configured in Torque application.
