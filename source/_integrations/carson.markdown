---
title: Carson
description: Instructions on how to integrate your Carson.live Account within Home Assistant.
ha_category:
  - Camera
  - Lock
ha_release: 0.105
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@rado0x54'
---

The `carson` implementation allows you to integrate your [Carson.live](https://carson.live/) account in Home Assistant.

There is currently support for the following device types within Home Assistant:

- [Camera](#camera)
- [Lock](#lock)

## Configuration

Go to the integrations page in your config and click on new **integration** -> **Carson**.

By default, the Carson integration will retrieve accessible cameras from the Carson Interface (e.g. Cameras that you also see within the Carson App).
However, it is also possible to retrieve the cameras directly via the Eagle Eye API (which Carson uses for Integration), which may allow access to
more cameras.

## YAML configuration

YAML configuration is around for people that prefer YAML, but it's not preferred!

To enable device linked in your [Carson.live](https://carson.live/) account, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
carson:
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
```

{% configuration %}
username:
  description: The username for accessing your Carson account (usually an e-mail).
  required: true
  type: string
password:
  description: The password for accessing your Carson account.
  required: true
  type: string
{% endconfiguration %}

## Camera

Once you have enabled the Carson integration, you can start using the camera platform.
The following camera services are supported: `play_stream`, `record`, `snapshot`

Please see the [camera integration](/integrations/camera) for more information about using camera-related services.

## Lock

Once you have enabled the Carson integration, you can start using the lock platform. You will see all the doors available to you.
Doors can be opened (both via service `lock.open` and `lock.unlock`). Note, that Carson does **not** support the `lock.lock` service, since doors "auto-lock" after a short amount of time.

Please see the [lock integration](/integrations/lock) for more information about using lock-related services.
