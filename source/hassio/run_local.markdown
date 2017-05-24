---
layout: page
title: "Run local things"
description: "Instructions on how-to run local script for HomeAssistant."
date: 2017-04-30 13:28
sidebar: true
comments: false
sharing: true
footer: true
---

On a normal installation you have access to base machine and can install or add every things of script they you can call with a `command_line` sensor/switch. Since Hass.IO use docker and every application is strict limited to other, you can not use this old way to perform local stuff. For first view it look very limited but if you look better to that conecpt you will see that make all very stable and a wrong thing can not break your system. It will also warrenty that your system is in every time clear to eatch running thing.

If you need run a script to read data for a sensor or switch commands to other device, you can do that with a add-on or on HomeAssistant container with a custom component. We look now to do that in a modern way inside a add-on. For custom component you can look into [devoloper site][custom-component].

Before you read more on that page, please read the [add-ons turtorial][addons-turtorial]. Now you can resize your horizen to new way to do things safe.

First you need install a MQTT broker. You can use our [mqtt broker add-on][mqtt-addon]. Make sure you use logins and disable anonymos access if you want control sensible systems. We provide no Hass.IO way to exchange data, that will be not realy good for security and is also to slow to exchange data between containers or stop and go stuff.

### {% linkable_title Sensors %}

Short story of that caption: We loop in our script to fetch data push to mqtt and wait until next processing is ready. Here is a basic example and struct for that process.

Our Dockerfile need to install:

```
RUN apk --no-cache add tzdata jq mosquitto-clients
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
Short story of that caption: We wait on incoming data from mqtt broker to do some things. We can also use on HomeAssistant input_boolean that trigger a automation to publish a custom command to mqtt topic they can process multible things in one add-on.

Our Dockerfile need to install:

```
RUN apk --no-cache add tzdata jq mosquitto-clients
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

done <<(mosquitto_sub -h "$MQTT_SERVER" -p "$MQTT_PORT" -u "$USER" -P "$PASSWORD" -t "$TOPIC" -q 1)

```


[mqtt-addon]: /addons/mosquitto/
[custom-component]: /developers/component_loading/
[addons-turtorial]: /hassio/addon_tutorial/

