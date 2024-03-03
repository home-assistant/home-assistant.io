---
title: SIP Call
description: How to call a SIP phone using notify
ha_category:
  - Notifications
  - Utility
ha_release: 1.0
ha_iot_class: Local Polling
ha_codeowners:
  - '@philipp-fischer'
ha_domain: sipcall
ha_platforms:
  - notify
ha_integration_type: integration
---

Ever wanted to ring a phone and hang up as a form of notification?
Use this simple integration with your local or cloud-based SIP account.

**Note:** This integration is still very rudimentary.
It works when used with a local FRITZ!Box as a SIP registrar, but is known
to have issues with cloud-based registrars.
Let us know if you are facing issues or want to extend it.

{% include integrations/config_flow.md %}

The `sipcall` platform allows you to ring a SIP phone from Home Assistant. Once set up, the integration provides a new notification service that you can use as an action in your automations.

When you add the integration, you will be asked for your SIP server credentials:
- SIP Server:
  - Either your registrar's server to connect to (IP address or domain), or a local SIP server like a FRITZ!Box IP address.
- SIP Domain:
  - Often the same as SIP Server. Consult your registrar to obtain the SIP domain for your credentials.
- Username:
  - The username used to log in. Many providers use the phone number as user name.
- Password:
  - The password associated with that account / user.

To use notifications, please see the [getting started with automation page](/getting-started/automation/).
Search for a service called `notify.NAME` where `NAME` starts with your SIP user name.

You can also add multiple accounts with this integration.
