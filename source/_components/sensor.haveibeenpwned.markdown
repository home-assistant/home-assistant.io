---
layout: page
title: "HaveIBeenPwned Sensor"
description: "Instructions on how to integrate HaveIBeenPwned sensor into Home Assistant."
date: 2016-09-29 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: haveibeenpwned.png
ha_category: Sensor
ha_release: 0.31
ha_iot_class: "Cloud Polling"
---

The `haveibeenpwned` sensor platform creates sensors that check for breached email accounts on [haveibeenpwned](https://haveibeenpwned.com).
To enable this sensor, add the following lines to your `configuration.yaml`, it will list every specified email address as a sensor showing
the number of breaches on that email account:

```yaml
# Example configuration.yaml entry using cloud based emoncms
sensor:
  platform: haveibeenpwned
  email: 
    - your_email1@domain.com
    - your_email2@domain.com
```

## {% linkable_title Breach meta data %}

If one of your email accounts is breached the sensor will display breach meta data. It will list the title of the site where your email
account has been breached as well as the added date of the breach data. This data is displayed in descending order so that the state attribute
`breach 1` will always contain the last known breach for the specific email account, if there are any breaches detected.

<p class='img'>
  <img src='/images/components/haveibeenpwned/sensor.png' />
</p>

## {% linkable_title Configuration variables %}

- **email** (*Required*): List of email addresses.

<p class='note warning'>
  The sensor will scan all email addresses specified with a 5 second delay between all breach data requests on Home Assistant startup.
  After this initial startup scanning, the sensor will only scan one email account per 15 minutes to prevent abuse, and not hammer "the
  Have I been Pwned" service, as this breach data almost never changes.
</p>
