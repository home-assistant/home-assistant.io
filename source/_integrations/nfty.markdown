---
title: "ntfy Notifications"
description: "Instructions on how to add ntfy notifications to Home Assistant."
ha_category:
  - Notifications
ha_release: 2022.12
ha_domain: ntfy
---

The `ntfy` notification platform allows you to deliver [ntfy](https://ntfy.sh) notifications from Home Assistant.

To enable the ntfy notification in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: ntfy
    topic: TOPIC
    url: https://ntfy.sh
```

{% configuration %}
name:
  description: Setting the optional parameter `name` allows multiple notifiers to be created. The notifier will bind to the service `notify.NOTIFIER_NAME`.
  required: false
  default: notify
  type: string
url:
  description: The ntfy server URL.
  required: false 
  default: https://ntfy.sh
  type: string
topic:
  description: The topic to send the notification to.
  required: true
  type: string
verify_ssl:
  description: Verify the SSL certificate of the server.
  required: false
  type: boolean
  default: True
username:
  description: The username for accessing the ntfy server.
  required: false
  type: string
password:
  description: The password for accessing the ntfy server.
  required: false
  type: string
{% endconfiguration %}

Users can add any [additional payload data](https://ntfy.sh/docs/publish/#publish-as-json) to the ntfy notification by providing a JSON body in the `data` field of the [service call](/notify). For example:

```json
{
  "tags": ["warning","cd"],
  "priority": 4,
  "attach": "https://filesrv.lan/space.jpg",
  "filename": "diskspace.jpg"
}
```

The explicit `title` and `message` parameters (along with the topic) will automatically be added to the payload. Adding a `title` or `message` to the payload will override the explicit value.

`target` is ignored.

To use notifications, please see the [getting started with automation page](/getting-started/automation/).


