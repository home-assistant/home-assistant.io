---
title: IMAP
description: Instructions on how to integrate IMAP unread email into Home Assistant.
ha_category:
  - Mailbox
ha_release: 0.25
ha_iot_class: Cloud Push
ha_domain: imap
ha_platforms:
  - sensor
ha_integration_type: integration
ha_codeowners:
  - '@engrbm87'
  - '@jbouwh'
ha_config_flow: true
---

The IMAP integration is observing your [IMAP server](https://en.wikipedia.org/wiki/Internet_Message_Access_Protocol). It can report the number of unread emails and can send a custom event that can be used to trigger an automation. Other search criteria can be used, as shown in the example below.

{% include integrations/config_flow.md %}

### Gmail with App Password

If you’re going to use Gmail, you need to create an [App Password](https://support.google.com/mail/answer/185833).

1. Go to your [Google Account](https://myaccount.google.com/)
2. Select **Security**
3. Under “Signing in to Google” select **App Passwords**
4. Sign in to your Account, and create a new App Password for Gmail.
5. Then you can setup the intergation as below:
    - Server: `imap.gmail.com`
    - Port: `993`
    - Username: Your full email address
    - Password: The new app password

### Configuring IMAP Searches

By default, this integration will count unread emails. By configuring the search string, you can count other results, for example:

* `ALL` to count all emails in a folder
* `FROM`, `TO`, `SUBJECT` to find emails in a folder (see [IMAP RFC for all standard options](https://tools.ietf.org/html/rfc3501#section-6.4.4))
* [Gmail's IMAP extensions](https://developers.google.com/gmail/imap/imap-extensions) allow raw Gmail searches, like `X-GM-RAW "in: inbox older_than:7d"` to show emails older than one week in your inbox. Note that raw Gmail searches will ignore your folder configuration and search all emails in your account!

### Selecting a charset supported by the imap server

Below is an example for setting up the integration to connect to your Microsoft 365 account that requires `US_ASCII` as charset:
  - Server: `outlook.office365.com`
  - Port: `993`
  - Username: Your full email address
  - Password: Your password
  - Charset: `US-ASCII`

### Selecting an alternate SSL cipher list (advanced mode)

If the default IMAP server settings do not work, you might try to set an alternate SLL cipher list.
The SSL cipher list option allows to select the list of SSL ciphers to be accepted from this endpoint. `default` (_system default_), `modern` or `intermediate` (_inspired by [Mozilla Security/Server Side TLS](https://wiki.mozilla.org/Security/Server_Side_TLS)_)

<div class='note info'>

The SSL cipher list is an advanced setting. The option is available only when advanced mode is enabled (see user settings).

</div>

### Troubleshooting

Email providers may limit the number of reported emails. The number may be less than the limit (10,000 at least for Yahoo) even if you set the `IMAP search` to reduce the number of results. If you are not getting expected events and cleaning your Inbox or the configured folder is not desired, set up an email filter for the specific sender to go into a new folder. Then create a new config entry or modify the existing one with the desired folder.

### Using events

When a new message arrives that meets the search criteria the `imap` integration will send a custom [event](/docs/automation/trigger/#event-trigger) that can be used to trigger an automation.
It is also possible to use to create a template [`binary_sensor` or `sensor`](/integrations/template/#trigger-based-template-binary-sensors-buttons-numbers-selects-and-sensors) based the [event data](/docs/automation/templating/#event).

The table below shows what attributes come with `trigger.event.data`. The data is a dictionary that has the keys that are shown below:

{% configuration_basic %}
server:
  description: The IMAP server name
username:
  description: The IMAP user name
search:
  description: The IMAP search configuration
folder:
  description: The IMAP folder configuration
text:
  description: The email body `text` of the the message (only the first 2048 bytes will be available)
sender:
  description: The `sender` of the message
subject:
  description: The `subject` of the message
date:
  description: A `datetime` object of the `date` sent
headers:
  description: The `headers` of the message in the for of a dictionary. The values are iterable as headers can occur more than once.

{% endconfiguration_basic %}

The `event_type` for the custom event should be set to `imap_content`. The configuration below shows how you can use the event data in a template `sensor`.

{% raw %}

```yaml
template:
  - trigger:
      - platform: event
        event_type: "imap_content"
        id: "custom_event"
    sensor:
      - name: imap_content
        state: "{{ trigger.event.data['subject'] }}"
        attributes:
          Message: "{{ trigger.event.data['text'] }}"
          Server: "{{ trigger.event.data['server'] }}"
          Username: "{{ trigger.event.data['username'] }}"
          Search: "{{ trigger.event.data['search'] }}"
          Folder: "{{ trigger.event.data['folder'] }}"
          Sender: "{{ trigger.event.data['sender'] }}"
          Date: "{{ trigger.event.data['date'] }}"
          Subject: "{{ trigger.event.data['subject'] }}"
          To: "{{ trigger.event.data['headers']['Delivered-To'][0] }}"
          Subject: "{{ trigger.event.data['headers']['Subject'][0] }}"
          Return_Path: "{{ trigger.event.data['headers']['Return-Path'][0] }}"
          Received-first: "{{ trigger.event.data['headers']['Received'][0] }}"
          Received-last: "{{ trigger.event.data['headers']['Received'][-1] }}"
```

{% endraw %}

## Example - keyword spotting

The following example shows the usage of the IMAP email content sensor to scan the subject of an email for text, in this case, an email from the APC SmartConnect service, which tells whether the UPS is running on battery or not.

{% raw %}

```yaml
template:
  - trigger:
      - platform: event
        event_type: "imap_content"
        id: "custom_event"
        event_data:
          sender: "no-reply@smartconnect.apc.com"
    sensor:
      - name: house_electricity
        state: >-
          {% if 'UPS On Battery' in trigger.event.data["subject"] %}
            power_out
          {% elif 'Power Restored' in trigger.event.data["subject"] %}
            power_on
          {% endif %}
```

{% endraw %}

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
  - trigger:
      - platform: event
        event_type: "imap_content"
        id: "custom_event"
        event_data:
          sender: "no-reply@smartconnect.apc.com"
  - sensor:
    - name: "Previous Day Energy Use"
      unit_of_measurement: "kWh"
      state: >
       {{ trigger.event.data["text"]
         | regex_findall_index("\*Yesterday's Energy Use:\* ([0-9]+) kWh") }}
    - name: "Previous Day Cost"
      unit_of_measurement: "$"
      state: >
        {{ trigger.event.data["text"]
          | regex_findall_index("\*Yesterday's estimated energy cost:\* \$([0-9.]+)") }}
    - name: "Billing Cycle Total"
      unit_of_measurement: "$"
      state: >
        {{ trigger.event.data["text"]
          | regex_findall_index("\ days:\* \$([0-9.]+)") }}
```

{% endraw %}

By making small changes to the regular expressions defined above, a similar structure can parse other types of data out of the body text of other emails.
