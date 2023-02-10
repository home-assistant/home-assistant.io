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
ha_config_flow: true
---

The IMAP integration is observing your [IMAP server](https://en.wikipedia.org/wiki/Internet_Message_Access_Protocol) and reporting the number of unread emails. Other search criteria can be used, as shown in the example below.

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
