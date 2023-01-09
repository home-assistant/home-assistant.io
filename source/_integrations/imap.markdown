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

The `imap` integration is observing your [IMAP server](https://en.wikipedia.org/wiki/Internet_Message_Access_Protocol) and reporting the amount of unread emails. Other search criteria can be used as shown in the example below.

{% include integrations/config_flow.md %}

### Gmail with App Password

If you’re going to use Gmail, you need to create a [App Password](https://support.google.com/mail/answer/185833).

1. Go to your [Google Account](https://myaccount.google.com/)
2. Select **Security**
3. Under “Signing in to Google” select **App Passwords**
4. Sign in to your Account, and create a new App Password for Gmail.

You can now use this as your password for Gmail, in your configuration.

### Configuring IMAP Searches

By default, this integration will count unread emails. By configuring the search string, you can count other results, for example:

* `ALL` to count all emails in a folder
* `FROM`, `TO`, `SUBJECT` to find emails in a folder (see [IMAP RFC for all standard options](https://tools.ietf.org/html/rfc3501#section-6.4.4))
* [Gmail's IMAP extensions](https://developers.google.com/gmail/imap/imap-extensions) allow raw Gmail searches, like `X-GM-RAW "in: inbox older_than:7d"` to show emails older than one week in your inbox. Note that raw Gmail searches will ignore your folder configuration and search all emails in your account!

#### Config entry sample with search examples

```
  server: imap.gmail.com
  port: 993
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
  folder: INBOX
  search: FROM <sender@email.com>, SUBJECT <subject here>
  # Or use X-GM-RAW search-term like this, to find unread emails from the last 7 days in your inbox
  # search: 'X-GM-RAW "in: inbox newer_than:7d is:unread"'

# Example entry for Office 365

  server: outlook.office365.com
  port: 993
  username: email@address.com
  password: password
  search: FROM <sender@email.com>, SUBJECT <subject here>
  charset: US-ASCII
```
