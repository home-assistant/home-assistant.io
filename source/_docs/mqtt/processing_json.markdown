---
title: "Processing JSON"
description: "Instructions on how to process the MQTT payload."
logo: mqtt.png
---

The MQTT [switch](/integrations/switch.mqtt/) and [sensor](/integrations/sensor.mqtt/) platforms support processing JSON over MQTT messages and parsing them using JSONPath. JSONPath allows you to specify where in the JSON the value resides that you want to use. The following examples will always return the value `100`.

| JSONPath query | JSON |
| -------------- | ---- |
| `somekey` | `{ 'somekey': 100 }`
| `somekey[0]` | `{ 'somekey': [100] }`
| `somekey[0].value` | `{ 'somekey': [ { value: 100 } ] }`

To use this, add the following key to your `configuration.yaml`:

```yaml
switch:
  platform: mqtt
  state_format: 'json:somekey[0].value'
```
It is also possible to extract JSON values by using a value template:

```yaml
switch:
  platform: mqtt
  value_template: '{% raw %}{{ value_json.somekey[0].value }}{% endraw %}'
```

More information about the full JSONPath syntax can be found [in their documentation](https://github.com/kennknowles/python-jsonpath-rw#jsonpath-syntax).
