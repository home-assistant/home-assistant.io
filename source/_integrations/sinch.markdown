---
title: Sinch SMS
description: Instructions on how to add Sinch notifications to Home Assistant.
ha_category:
  - Notifications
ha_release: 0.101
ha_codeowners:
  - '@bendikrb'
ha_domain: sinch
ha_iot_class: Cloud Push
ha_platforms:
  - notify
ha_integration_type: integration
---

The `sinch` platform uses [Sinch](https://www.sinch.com/products/apis/messaging/sms/) to deliver notifications from Home Assistant.

## Prerequisites

Go to your [Sinch Dashboard](https://dashboard.sinch.com/sms/api/rest) and click "Add new REST API". You should now be able to obtain your `service_plan_id` and `api_key`.

{% include integrations/config_flow.md %}

