git@github.com:smcpeck/home-assistant.io.git---
title: IMAP Email Content
description: Instructions on how to integrate IMAP email content sensor into Home Assistant.
ha_category:
  - Mailbox
ha_iot_class: Cloud Push
ha_release: 0.25
ha_domain: imap_email_content
ha_platforms:
  - sensor
---

The `imap_email_content` integration will read emails from an IMAP email server and report them as a state change within Home Assistant. This is useful if you have a device that only reports its state via email.

## Configuration

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: imap_email_content
    server: imap.gmail.com
    port: 993
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
    folder: YOUR_FOLDER
    senders:
      - example@gmail.com
```

{% configuration %}
server:
  description: The IP address or hostname of the IMAP server.
  required: true
  type: string
port:
  description: The port where the server is accessible.
  required: false
  default: 993
  type: integer
name:
  description: Name of the IMAP sensor.
  required: false
  type: string
username:
  description: Username for the IMAP server.
  required: true
  type: string
password:
  description: Password for the IMAP server.
  required: true
  type: string
folder:
  description: Folder to get mails from.
  required: false
  default: INBOX
  type: string
senders:
  description: A list of sender email addresses that are allowed to report state via email. Only emails received from these addresses will be processed.
  required: true
  type: string
keep:
  description: Keep existing message until another arrives. Default behavior will set sensor to `Unknown` next time the IMAP account is checked and no new message has arrived. This is useful if you want a sensor's value to persist based on the last received e-mail (like a date value).
  required: false
  default: false
  type: boolean
daysback:
  description: Number of days back to look for e-mail. This is mainly intended to be used with `keep: true` so your last state is restored on a restart (like other sensors that "query" an existing entity and discover the proper state). It isn't perfect, but will offer some value. During normal operation, the last UID is tracked so older e-mails won't continuously be re-processed.
value_template:
  description: If specified this template will be used to render the state of the sensor. If a template is not supplied the message subject will be used for the sensor value. The following attributes will be supplied to the template.
  required: false
  type: template
  keys:
    from:
      description: The from address of the email.
    body:
      description: The body of the email.
    subject:
      description: The subject of the email.git.
    date:
      description: The date and time the email was sent.
{% endconfiguration %}

## Example - keyword spotting

The following example shows the usage of the IMAP email content sensor to scan the subject of an email for text, in this case, an email from the APC SmartConnect service which tells whether the UPS is running on battery or not.

{% raw %}

```yaml
sensor:
  - platform: imap_email_content
    server: imap.gmail.com
    name: house_electricity
    port: 993
    username: MY_EMAIL_USERNAME
    password: MY_EMAIL_PASSWORD
    keep: true
    daysback: 5
    senders:
      - no-reply@smartconnect.apc.com
    value_template: >-
      {% if 'UPS On Battery' in subject %}
        power_out
      {% elif 'Power Restored' in subject %}
        power_on
      {% endif %}
```

{% endraw %}

The same template structure can scan the date, body or sender for matching text before setting the state of the sensor.

## Example - extracting formatted text from an email using template sensors

This example shows how to extract numbers or other formatted data from an email to change the value of a template sensor to a value extracted from the email. In this example, we will be extracting energy use, cost, and billed amount from an email (from Georgia Power) and putting it into sensor values using a template sensor that runs against our IMAP email sensor already set up. A sample of the body of the email used is below:

```text
Yesterday's Energy Use:                             76 kWh
Yesterday's estimated energy cost:                  $8
Monthly Energy use-to-date for 23 days:             1860 kWh
Monthly estimated energy cost-to-date for 23 days:  $198

To view your account for details about your energy use, please click here.
```

Below is the template sensor which extracts the information from the body of the email in our IMAP email sensor (named sensor.energy_email) into 3 sensors for the energy use, daily cost, and billing cycle total.

{% raw %}

```yaml
template:
  - sensor:
    - name: "Previous Day Energy Use"
      unit_of_measurement: "kWh"
      state: >
       {{ state_attr('sensor.energy_email','body')
         | regex_findall_index("\*Yesterday's Energy Use:\* ([0-9]+) kWh") }}
    - name: "Previous Day Cost"
      unit_of_measurement: "$"
      state: >
        {{ state_attr('sensor.energy_email', 'body')
          | regex_findall_index("\*Yesterday's estimated energy cost:\* \$([0-9.]+)") }}
    - name: "Billing Cycle Total"
      unit_of_measurement: "$"
      state: >
        {{ state_attr('sensor.energy_email', 'body')
          | regex_findall_index("\ days:\* \$([0-9.]+)") }}
```

{% endraw %}

By making small changes to the regular expressions defined above, a similar structure can parse other types of data out of the body of other emails.
