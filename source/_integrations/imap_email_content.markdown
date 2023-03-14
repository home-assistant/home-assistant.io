---
title: IMAP Email Content
description: Instructions on how to integrate IMAP email content sensor into Home Assistant.
ha_category:
  - Mailbox
ha_iot_class: Cloud Push
ha_release: 0.25
ha_domain: imap_email_content
ha_platforms:
  - sensor
ha_integration_type: integration
---

The `imap_email_content` integration will read emails from an IMAP email server and report them as a state change within Home Assistant. This is useful if you have a device that only reports its state via email.

{% include integrations/config_flow.md %}

## IMAP server setup

For the configuration of the IMAP email content sensor The server hostname or IP address of the IMAP server together with username and password are required.
Further it is required to supply a list of allowed senders. Use a `;` as separator if there is more than one sender. One sensor is set up for every entry that is set up.

You can specify a different folder at the IMAP server (default = `INBOX`). If for example you want to select the subfolder `Notifications` under `INBOX`, you should specify `INBOX.Notifications` as folder.

## Using the value template

By default the state will be the `subject` of the first email that matches, or `unknown` if there is no valid email received.
You can also use the `value_template` setting to render the state. Extra variables are `from` (The from address or sender of the email), `body` (The body of the email), `subject` (The subject of the email) or `date` (The date and time the email was sent).

The integration is searching for email that were sent today or yesterday when it is loaded.

## Example - keyword spotting

The following example shows how to use the `value_template` setting with the IMAP email content sensor to scan the subject of an email for text, in this case, an email from the APC SmartConnect service which tells whether the UPS is running on battery or not.

{% raw %}

```jinja
{% if 'UPS On Battery' in subject %}
  power_out
{% elif 'Power Restored' in subject %}
  power_on
{% endif %}
```

{% endraw %}

The same template structure can scan the `date`, `body` or sender (`from`) for matching text before setting the state of the sensor.

## Example - extracting formatted text from an email using template sensors

This example shows how to extract numbers or other formatted data from an email to change the value of a template sensor to a value extracted from the email. In this example, we will be extracting energy use, cost, and billed amount from an email (from Georgia Power) and putting it into sensor values using a template sensor that runs against our IMAP email sensor already set up. A sample of the body of the email used is below:

```text
Yesterday's Energy Use:                             76 kWh
Yesterday's estimated energy cost:                  $8
Monthly Energy use-to-date for 23 days:             1860 kWh
Monthly estimated energy cost-to-date for 23 days:  $198

To view your account for details about your energy use, please click here.
```

Below are template sensors which extract the information from the body of the email in our IMAP email sensor (named sensor.energy_email) into 3 sensors for the energy use, daily cost, and billing cycle total.

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
