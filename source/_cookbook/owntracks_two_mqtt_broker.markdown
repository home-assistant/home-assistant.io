---
title: "OwnTracks with two MQTT brokers"
description: "Setting up OwnTracks with 2 MQTT brokers bridged for use with the MQTT bridge for SmartThings."
ha_category: Infrastructure
---

I ([surge919](https://github.com/surge919)) successfully tied in [OwnTracks](http://owntracks.org/) to Home Assistant and [SmartThings](https://www.smartthings.com/) while using authentication for external access. The MQTT bridge doesn't support authentication so I set up 2 MQTT instances.
 
Here are the steps I performed. Hopefully it saves someone else some time.
 
It seems to be working pretty well but if anyone sees something incorrect in my configuration, please let me know. This is my first real interaction with MQTT.
 
Here's a summary of my setup:
 
Two Docker instances for MQTT

- 1 for internal use (the MQTT bridge for SmartThings - no authentication)
- 1 for external use (for OwnTracks - with authentication)
 
All Docker configuration files are on my NAS so the Docker containers can be destroyed without affecting my actual configuration files.
 
#### Docker setup for the Mosquitto internal instance. No authentication for use with the MQTT bridge.

```bash
$ docker run -ti -p 1883:1883  \
    -v /volume1/data/mosquitto-int/config:/mqtt/config:ro \
    -v /volume1/data/mosquitto-int/log:/mqtt/log \
    -v /volume1/data/mosquitto-int/data/:/mqtt/data/ \
    --name mosquitto-int -d toke/mosquitto
```

#### Docker setup for the mosquitto external instance. With authentication for use with Owntracks.

```bash
$ docker run -ti -p 1884:1883  \
    -v /volume1/data/mosquitto-ext/config:/mqtt/config:ro \
    -v /volume1/data/mosquitto-ext/log:/mqtt/log \
    -v /volume1/data/mosquitto-ext/data/:/mqtt/data/ \
    -v /volume1/data/mosquitto-ext/etc:/etc/mosquitto \
    --name mosquitto-ext -d toke/mosquitto
```
 
Here are the configuration files:

`/volume1/data/mosquitto-int/config/mosquitto.conf`
 
```bash
connection mosquitto-ext
persistence_file mosquitto.db
try_private true
address 10.0.0.20:1884
start_type automatic
username test
password test
notifications true
topic owntracks/# in
log_type all
log_dest file /mqtt/log/mqtt.log 
log_facility 5
```
 
`/volume1/data/mosquitto-ext/config/mosquitto.conf`
 
```bash
connection mosquitto-int
persistence_file mosquitto.db
try_private true
address 10.0.0.20:1883
start_type automatic
username test
password test
notifications true
topic owntracks/# out
log_type all
log_dest file /mqtt/log/mqtt.log
log_facility 5
allow_anonymous false
password_file /etc/mosquitto/pwfile
```
 
Create a password for `mosquitto-ext`
 
```bash
docker exec -it mosquitto-ext /bin/bash
cd /etc/mosquitto/
mosquitto_passwd -c /etc/mosquitto/pwfile <userID>
```
 
### OwnTracks settings for Android
 
```bash
Preferences / Connection / Mode - Private MQTT
 
Fill out
 Host
 Identification
 Security: TLS disabled
```

<img src="//community-home-assistant-assets.s3.amazonaws.com/original/2X/5/5ce27145e5b37bac72859e4c36b8269d14f85ce1.png" width="649" height="500">
