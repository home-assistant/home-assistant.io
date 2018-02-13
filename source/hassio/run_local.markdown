---
layout: page
title: "Run local scripts"
description: "Instructions on how to run a local script for Home Assistant."
date: 2017-04-30 13:28
sidebar: true
comments: false
sharing: true
footer: true
---

Hass.io is a managed environment, which means you can't install applications that can be embedded into Home Assistant using the `command_line` sensor/switch.

There are three options if you need to run a script which reads data from a sensor or sends commands to other devices on Hass.io.

The first option is to write a custom component for Home Assistant. This implies that you can communicate with your device using Python. For more information about developing a custom component, take a look at [custom-component development][custom-component].

The second option is to use STDIN inside an add-on and use the service `hassio.addon_stdin` to send data. For more information, have a look at [internal add-on communication][communication]. Here you will also find how you can easily access the Home Assistant Rest API.

The third option is to create a local add-on for Hass.io that sends the data to Home Assistant via MQTT. Before we dive into this, read up on [Hass.io add-on development][addons-tutorial] first.

For security and speed, Hass.io does not provide a way for containers to communicate directly. So the first step is to set up a communication channel. We're going to use MQTT for this using the [MQTT broker add-on][mqtt-addon].

### {% linkable_title Sensors %}

We loop in our script to fetch data and push it to MQTT and wait until the next process is ready. Here is a basic example and structure for that process.

In our Dockerfile we need to install:

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

We wait for incoming data from the MQTT broker. We can also use an `input_boolean` that triggers an automation to publish a custom command to MQTT topic that can process multiple things in one add-on.

In our Dockerfile we need to install:

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
[addons-tutorial]: /developers/hassio/addon_tutorial/
[communication]: /developers/hassio/addon_communication/
