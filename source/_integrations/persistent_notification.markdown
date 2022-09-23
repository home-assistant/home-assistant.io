---
title: Persistent Notification
description: Instructions on how to integrate persistent notifications into Home Assistant.
ha_category:
  - Other
ha_iot_class: Local Push
ha_release: 0.23
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: persistent_notification
ha_integration_type: integration
---

The `persistent_notification` integration can be used to show a notification on the frontend that has to be dismissed by the user.

<p class='img'>
  <img src='/images/screenshots/persistent-notification.png' />
</p>

### Service

The service `persistent_notification.create` takes in `message`, `title`, and `notification_id`.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `message`              |       no | Body of the notification. Accepts [templates](/topics/templating/).
| `title`                |      yes | Title of the notification. Accepts [templates](/topics/templating/).
| `notification_id`      |      yes | If `notification_id` is given, it will overwrite the notification if there already was a notification with that ID.

Here is how an [action](/getting-started/automation-action/) of your [automation setup](/getting-started/automation/) with static content could look like.

```yaml
action:
  service: persistent_notification.create
  data:
    message: "Your message goes here"
    title: "Custom subject"
```

If you want to show some runtime information, you have to use [templates](/topics/templating/).

{% raw %}

```yaml
action:
  service: persistent_notification.create
  data:
    title: >
      Thermostat is {{ state_attr('climate.thermostat', 'hvac_action') }}
    message: "Temperature {{ state_attr('climate.thermostat', 'current_temperature') }}"
```

{% endraw %}

The service `persistent_notification.dismiss` requires a `notification_id`.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `notification_id`      |      no  | the `notification_id` is required to identify the notification that should be removed.

This service allows you to remove a notifications by script or automation.

```yaml
action:
  service: persistent_notification.dismiss
  data:
    notification_id: "1234"
```

### Markdown support

The message attribute supports the [Markdown formatting syntax](https://daringfireball.net/projects/markdown/syntax). Some examples are:

| Type | Message |
| ---- | ------- |
| Headline 1 | `# Headline` |
| Headline 2 | `## Headline` |
| Newline | `\n` |
| Bold | `**My bold text**` |
| Cursive | `*My cursive text*` |
| Link | `[Link](https://home-assistant.io/)` |
| Image | `![image](/local/my_image.jpg)` |

<div class="note">

  `/local/` in this context refers to the `.homeassistant/www/` folder.

</div>

### Create a persistent notification

Choose the **Services** tab from the **Developer Tools** sidebar item, then select the `persistent_notification.create` service from the "Service" dropdown. Enter something like the sample below into the **Service Data** field and press the **CALL SERVICE** button.

```json
{
  "notification_id": "1234",
  "title": "Sample notification",
  "message": "This is a sample text"
}
```
This will create the notification entry shown above.

### Example Markdown variable notification

```yaml
service: persistent_notification.create
data:
  notification_id: os-agent            ## <<< this can be whatever 12343232
  title: "There is an update in Os-Agent!"
  message: >-
    OS_Agent "{{ states('sensor.home_assistant_os_agent_latest_tag') }}" is
    available<br></br> [os-agent](https://github.com/home-assistant/os-agent)
    <br></br> wget
    https://github.com/home-assistant/os-agent/releases/download/{{
    states('sensor.home_assistant_os_agent_latest_tag')
    }}/os-agent_1.4.0_linux_x86_64.deb<br></br> sudo dpkg -i os-agent_{{
    states('sensor.home_assistant_os_agent_latest_tag')
    }}_linux_x86_64.deb<br></br>

```

This is the output.
![persistant_notification_msgCapture](https://user-images.githubusercontent.com/36288425/191888076-0895e15a-2cc2-4e31-9755-c758135b108e.PNG)
