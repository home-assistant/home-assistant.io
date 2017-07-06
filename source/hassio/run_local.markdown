---
layout: page
title: "Run local script"
description: "Instructions on how-to run local script for Home Assistant."
date: 2017-04-30 13:28
sidebar: true
comments: false
sharing: true
footer: true
---

On a normal Home Assistant installation you have access to the base machine and can install or add scripts that you can call with a `command_line` sensor/switch. Since Hass.IO uses Docker, you can not use this old way to perform local stuff. On its face, it looks quite restrictive, but it makes the whole system stable.

However, if you need to run a script to read data for a sensor or send commands to other devices on Hass.IO, you can do that with a add-on or on inside the Home Assistant container with a custom component. Here is one way to accomplish that using an add-on. For custom component, look at the [devoloper site][custom-component] and also read the [add-ons tutorial][addons-tutorial]. Now you can get started with your custom component in the right way.

First you need install a MQTT broker. You can use our [MQTT broker add-on][mqtt-addon]. Make sure you use logins and disable anonymous access if you want to secure the system. We provide no Hass.IO way to exchange data, that will be not realy good for security and is also to slow to exchange data between containers or stop and go stuff. That is the reason why we use a mqtt broker for it.

### {% linkable_title Sensors %}

Short story of that caption: We loop in our script to fetch data and push it to MQTT and wait until next process is ready. Here is a basic example and structure for that process.

Our Dockerfile need to install:

```
RUN apk --no-cache add jq mosquitto-clients
```

Now we can process it with `run.sh`:
```bash
#!/bin/bash
set -e

CONFIG_PATH=/data/options.json

# possible options for processing
MQTT_SERVER=$(jq --raw-output '.server' $CONFIG_PATH)
MQTT_PORT=$(jq --raw-output '.port' $CONFIG_PATH)
TOPIC=$(jq --raw-output '.topic' $CONFIG_PATH)
USER=$(jq --raw-output '.user' $CONFIG_PATH)
PASSWORD=$(jq --raw-output '.password' $CONFIG_PATH)
WAIT_TIME=$(jq --raw-output '.seconds' $CONFIG_PATH)

# read data
while true
do
  if OUTPUT="$(/read_my_sensor.sh)"
  then
    mosquitto_pub -h "$MQTT_SERVER" -p "$MQTT_PORT" -u "$USER" -P "$PASSWORD" -t "$TOPIC" -m "$OUTPUT" || true
  else
    echo "$(data) [ERROR] can't read sensor: $OUTPUT"
  fi

  sleep "$WAIT_TIME"
done

```

### {% linkable_title Commands %}
Short story of that caption: We wait for incoming data from MQTT broker. We can also use an `input_boolean` that triggers an automation to publish a custom command to MQTT topic that can process multiple things in one add-on.

Our Dockerfile need to install:

```
RUN apk --no-cache add jq mosquitto-clients
```

Now we can process it with `run.sh`:
```bash
#!/bin/bash
set -e

CONFIG_PATH=/data/options.json

# possible options for processing
MQTT_SERVER=$(jq --raw-output '.server' $CONFIG_PATH)
MQTT_PORT=$(jq --raw-output '.port' $CONFIG_PATH)
TOPIC=$(jq --raw-output '.topic' $CONFIG_PATH)
USER=$(jq --raw-output '.user' $CONFIG_PATH)
PASSWORD=$(jq --raw-output '.password' $CONFIG_PATH)

# read data
while read -r message
do
  if [ "$message" == "on" ]; then
    /do_command_on.sh || true
  else
    /do_command_off.sh || true
  fi

done < <(mosquitto_sub -h "$MQTT_SERVER" -p "$MQTT_PORT" -u "$USER" -P "$PASSWORD" -t "$TOPIC" -q 1)

```


[MQTT-addon]: /addons/mosquitto/
[custom-component]: /developers/component_loading/
[addons-tutorial]: /hassio/addon_tutorial/
