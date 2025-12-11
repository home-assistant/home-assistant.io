---
title: "Laundry Sensors with NodeMCU and Home Assistant"
description: "Nolan describes how he gets notified when laundry is done."
date: 2016-08-03 10:22 -0700
date_formatted: "August 2, 2016"
author: Nolan Gilley
categories: User-Stories
og_image: /images/blog/2016-07-laundry-automation/protoboard.jpg
---

_This is a guest post by Home Assistant user and contributor [Nolan Gilley](https://github.com/nkgilley)._

Today I'll show you how I used Home Assistant, a NodeMCU (ESP8266), and a couple of accelerometers to automate our laundry room.  This is a rewrite of an [old post](/blog/2015/08/26/laundry-automation-with-moteino-mqtt-and-home-assistant/) where I did the same thing using a Moteino & Raspberry Pi.  This version only requires a NodeMCU.

We have an older washer and dryer which doesn't have any form of notification when cycles complete.  Home Assistant was the obvious solution, I just needed to create sensors for the washer and dryer.  I tried using sound sensors but found them unreliable.  I ended up using an accelerometer attached to the back of each appliance.  I also added magnetic reed switches on the doors of the washer and dryer to detect whether they're open or closed.  I connected the accelerometers and reed switches to an NodeMCU which will relay the data to my MQTT broker.

<p class='img'>
  <img src='/images/blog/2016-07-laundry-automation/block-diagram.png' />
  Block diagram of schematic
</p>

<!--more-->

After taking some sample data from the accelerometers while each appliance was in operation, I decided to plot the data to help determine the proper thresholds of when the devices were running or off.  I had to do this in order to get precise ranges so the dryer sensor wouldn't get tripped by the washer or vice versa.  In the plot below you can see the acceleration in each direction for the accelerometer connected to the dryer.   It's easy to see when the dryer is in operation here.  I used the same technique for the washer's accelerometer.

<p class='img'>
  <img src='/images/blog/2016-07-laundry-automation/data-graph.png' />
  Graph showing the accelerometer data
</p>

Next it was just a matter of integrating everything with Home Assistant.  I was able to use the [MQTT component](/integrations/mqtt/) to read the washer and dryer states from the Moteino and display it in Home Assistant.

<p class='img'>
  <img src='/images/blog/2016-07-laundry-automation/screenshot-ha.png' />
  Status of the dryer and washer in Home Assistant
</p>

Next I wrote [scripts](/integrations/script/) that are run whenever the washer or dryer completes a load.  This is triggered by the [automation component](/getting-started/automation/).  When the laundry is complete I have the lights in the house turn red and [notify me via Join](/integrations/joaoapps_join).  Once the door is opened and laundry emptied another script runs that sets the lights back to normal.  So far it has been very helpful and very reliable.

<p class='img'>
  <a href='/images/blog/2016-07-laundry-automation/protoboard.jpg'>
    <img src='/images/blog/2016-07-laundry-automation/protoboard.jpg' />
  </a>
  NodeMCU connected to MPU-6050 accelerometer.
</p>

Materials used:

 - [NodeMCU](https://amzn.to/2Y9Mmxk)
 - [2 x Accelerometers](https://amzn.to/2WXa2s5)
 - [2 x Reed switch](https://amzn.to/2X0ZuZ2)

[Sketch for the NodeMCU is available here.](https://github.com/nkgilley/nodemcu-laundry/blob/master/nodemcu-laundry.ino)

Home Assistant Configuration:

```yaml
mqtt:
  broker: 192.168.1.100
  port: 1883
  keepalive: 60
  qos: 0

sensor:
  - platform: mqtt
    name: "Dryer Status"
    state_topic: "sensor/dryer"
    unit_of_measurement: ""

  - platform: mqtt
    name: "Washer Status"
    state_topic: "sensor/washer"
    unit_of_measurement: ""

automation:
  - alias: "Washer complete"
    trigger:
      platform: state
      entity_id: sensor.washer_status
      from: "Running"
      to: "Complete"
    action:
      service: script.turn_on
      target:
        entity_id: script.washer_complete

  - alias: "Washer emptied"
    trigger:
      platform: state
      entity_id: sensor.washer_status
      from: "Complete"
      to: "Empty"
    action:
      service: scene.turn_on
      target:
        entity_id: scene.normal

script:
  washer_complete:
    alias: "Washer Complete"
    sequence:
      - alias: "Join Notification"
        service: notify.join
        data:
          message: "The washing machine has finished its cycle, please empty it!"
      - alias: "Living Room Lights Blue"
        service: scene.turn_on
        target:
          entity_id: scene.blue
```

Resources used:

 - [Inspiration and Help with Arduino code](http://www.instructables.com/id/Uber-Home-Automation-w-Arduino-Pi/step13/Washer-Dryer-Smartifier-Water-Leak-Sensor/)
