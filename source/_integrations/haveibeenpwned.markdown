---
title: HaveIBeenPwned
description: Instructions on how to integrate HaveIBeenPwned sensor into Home Assistant.
ha_category:
  - Sensor
ha_release: 0.31
ha_iot_class: Cloud Polling
ha_domain: haveibeenpwned
ha_platforms:
  - sensor
---

The `haveibeenpwned` sensor platform creates sensors that check for breached email accounts on [haveibeenpwned](https://haveibeenpwned.com).

## Configuration

In order to use this integration you need to purchase an API key. Visit the [API key page](https://haveibeenpwned.com/API/Key) on the HIBP website to purchase one.

## Configuration

To enable this sensor, add the following lines to your `configuration.yaml`, it will list every specified email address as a sensor showing the number of breaches on that email account.

```yaml
# Example configuration.yaml entry using cloud based emoncms
sensor:
  - platform: haveibeenpwned
    email:
      - your_email1@domain.com
      - your_email2@domain.com
    api_key: API_KEY
```

{% configuration %}
email:
  description: List of email addresses.
  required: true
  type: list
api_key:
  description: HaveIBeenPwned API Key
  required: true
  type: string
{% endconfiguration %}

## Breach meta data

If one of your email accounts is breached the sensor will display breach meta data. It will list the title of the site where your email
account has been breached as well as the added date of the breach data. This data is displayed in descending order so that the state attribute
`breach 1` will always contain the last known breach for the specific email account, if there are any breaches detected.

<p class='img'>
  <img src='/images/integrations/haveibeenpwned/sensor.png' />
</p>

<div class='note warning'>
  The sensor will scan all email addresses specified with a 5 second delay between all breach data requests on Home Assistant startup.
  After this initial startup scanning, the sensor will only scan one email account per 15 minutes to prevent abuse, and not hammer "the
  Have I been Pwned" service, as this breach data almost never changes.
</div>
