---
layout: page
title: "IMAP Email Content"
description: "Instructions how to integrate IMAP email content sensor into Home Assistant."
date: 2016-09-09 12:30
sidebar: true
comments: false
sharing: true
footer: true
logo: smtp.png
ha_category: Sensor
ha_iot_class: "Local Polling"
ha_release: 0.25
---


The `imap_email_content` sensor platform will read emails from an IMAP email server and report them as a state change within Home Assistant. This is useful if you have a device that only reports its state via email.

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: imap_email_content
    server: imap.gmail.com
    port: 993
    username: USERNAME
    password: PASSWORD
    senders:
      - example@gmail.com
```

Configuration variables:

- **server** (*Required*): The IP address or hostname of the IMAP server.
- **port** (*Required*): The port where the server is accessible.
- **name** (*Optional*): Name of the IMAP sensor to use in the frontend.
- **username** (*Required*): Username for the IMAP server.
- **password** (*Required*): Password for the IMAP server.
- **senders** (*Required*): A list of sender email addresses that are allowed to report state via email. Only emails received from these addresses will be processed.
- **value_template** (*Optional*): If specified this template will be used to render the state of sensor. If a template is not supplied the message subject will be used for the sensor value. The following attributes will be supplied to the template:

   * **from**: The from address of the email
   * **body**: The body of the email
   * **subject**: The subject of the email
   * **date**: The date and time the email was sent
