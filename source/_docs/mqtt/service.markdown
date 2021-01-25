---
title: "MQTT Publish service"
description: "Instructions on how to setup the MQTT Publish service within Home Assistant."
logo: mqtt.png
---

The MQTT integration will register the service `mqtt.publish` which allows publishing messages to MQTT topics. There are two ways of specifying your payload. You can either use `payload` to hard-code a payload or use `payload_template` to specify a [template](/topics/templating/) that will be rendered to generate the payload.

### Service `mqtt.publish`

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `topic` | no | Topic to publish payload to.
| `payload` | yes | Payload to publish.
| `payload_template` | yes | Template to render as payload value. Ignored if payload given.
| `qos` | yes | Quality of Service to use. (default: 0)
| `retain` | yes | If message should have the retain flag set. (default: false)

<div class='note'>
You need to include either payload or payload_template, but not both.
</div>

```yaml
topic: home-assistant/light/1/command
payload: on
```

{% raw %}
```yaml
topic: home-assistant/light/1/state
payload_template: "{{ states('device_tracker.paulus') }}"
```
{% endraw %}

`payload` must be a string. If you want to send JSON then you need to format/escape it properly. Like:

```yaml
topic: home-assistant/light/1/state
payload: "{\"Status\":\"off\", \"Data\":\"something\"}"
```

Example of how to use `qos` and `retain`:

```yaml
topic: home-assistant/light/1/command
payload: on
qos: 2
retain: true
```

### Service `mqtt.dump`

Listen to the specified topic matcher and dumps all received messages within a specific duration into the file `mqtt_dump.txt` in your configuration folder. This is useful when debugging a problem.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `topic` | no | Topic to dump. Can contain a wildcard (`#` or `+`).
| `duration` | yes | Duration in seconds that we will listen for messages. Default is 5 seconds.

```yaml
topic: openzwave/#
```
