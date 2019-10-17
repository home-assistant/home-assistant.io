---
title: "Sinch SMS"
description: "Instructions on how to add Sinch SMS notifications to Home Assistant."
logo: sinch.png
ha_category:
  - Notifications
ha_release: "0.101"
---

The `sinch_sms` notification component enables sending SMS notifications via [Sinch](https://sinch.com).

Before you can get started you need to setup a account at [Sinch](https://dashboard.sinch.com/signup).
When you're done, you should be able to obtain your `service_plan_id` and `api_key`.

To use this notification platform in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - name: sinch_sms
      platform: sinch_sms
      api_key: CONF_API_KEY
      service_plan_id: CONF_SERVICE_PLAN_ID
      recipient: [E164_PHONE_NUMBER]
      from_number: E164_PHONE_NUMBER or SENDER_ID
```


{% cfiguration %}
api_key:
  description: API Key given by Sinch.
  required: true
  type: string
service_plan_id:
  description: service_plan_id given by Sinch.
  required: true
  type: string
recipient:
    description: An array of recipient [E.164](https://en.wikipedia.org/wiki/E.164) formatted phone numbers.
    required: true
    type: string
from_number:
  description: An [E.164](https://en.wikipedia.org/wiki/E.164) formatted phone number, like +14151234567.  Alternatively, a sender ID can be used instead of a phone number.
  required: true
  type: string
name:
  description: Setting the optional parameter `name` allows multiple notifiers to be created. The notifier will bind to the service `notify.NOTIFIER_NAME`.
  required: false
  default: "`notify`"
  type: string
{% endconfiguration %}

### Usage

To use Sinch SMS in you automations, please see the [getting started with automation page](/getting-started/automation/).
