---
title: myChevrolet
description: Instructions on how to integrate Chevy Bolt car into Home Assistant.
ha_category:
  - Car
ha_release: 0.62
ha_iot_class: Cloud Polling
ha_domain: mychevy
ha_platforms:
  - binary_sensor
  - sensor
---

The `mychevy` integration communicates with the [my.chevrolet](https://my.chevrolet.com) website using the javascript API that the website uses (as of Dec 2018). The MyChevy website has been known to be both unstable (interfaces changing somewhat willy nilly) and has substantial outages. So be forwarned in using this component.

This integration provides the following platforms:

- Binary sensors: if the car is plugged in
- Sensors: Battery Level, Charge Mode, EST Range, Total Distance Traveled

## Configuration

To use MyChevy in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
mychevy:
  username: YOUR_E_MAIL_ADDRESS
  password: YOUR_PASSWORD
```

{% configuration %}
username:
  description: The email address associated with your my.chevrolet account.
  required: true
  type: string
password:
  description: The password for your given my.chevrolet account.
  required: true
  type: string
country:
  description: Which country's servers to contact. Supports 'us' or 'ca'.
  required: false
  default: us
  type: string
{% endconfiguration %}

### Limitations

The architecture of the GM automotive networking imposes some limitations on the functionality of the component.

The OnStar network link is very slow, and takes 1 - 3 minutes to get information back from the car. As such the `mychevy` integration only polls every 30 minutes to not overwhelms that connection.

The OnStar network (or more specifically the gateway used by the my.chevrolet website) appears to suffer more than most networks when the car is a) in a garage, and b) it's cold outside (like < 15 degrees F). One of the provided sensors is a status sensor which indicates if we got connectivity with the car on the last polling cycle or not.

The "API" for this is written through using some existing API calls from the Javascript web user interface. As such, it only currently is known to work if you have a Chevy Bolt EV or a Chevy Volt, and only 1 Chevy car connected to OnStar. Patches for extended support should go to the [https://github.com/sdague/mychevy](https://github.com/sdague/mychevy) project first, then Home Assistant can be extended.
