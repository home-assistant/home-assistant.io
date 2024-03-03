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

## Notifications

The `sipcall` platform allows you to call a SIP phone from Home Assistant.

To enable file notifications in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - name: sipdoorbell
    platform: sipcall
    uri_from: sip:doorbell@192.168.0.1
    uri_via: 192.168.0.1
    uri_to: sip:1234@192.168.0.1
    username: doorbell
    password: EXAMPLE_PASSWORD
```

{% configuration %}
name:
  description: Setting the optional parameter `name` allows multiple notifiers to be created. The notifier will bind to the service `notify.NOTIFIER_NAME`.
  required: false
  default: notify
  type: string
uri_from:
  description: The SIP identifier of the calling phone. For example `sip:mikephone@192.168.0.1`
  required: true
  type: string
uri_via:
  description: The SIP registrar to contact to execute the call.
  required: true
  type: string
uri_to:
  description: The SIP identifier of the receiving phone. For example `sip:+18551234567@192.168.0.1`
  required: true
  type: string
username:
  description: The username for your registrar
  required: true
  type: string
password:
  description: The password for your registrar
  required: true
  type: string
timestamp:
  description: The number of seconds to wait before hanging up.
  required: false
  default: 2
  type: integer
{% endconfiguration %}

To use notifications, please see the [getting started with automation page](/getting-started/automation/).
