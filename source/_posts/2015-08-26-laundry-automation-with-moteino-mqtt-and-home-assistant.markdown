---
layout: post
title: "Laundry Automation: insight and notifications"
description: "Nolan describes how he gets notified when laundry is done."
date: 2015-08-26 08:12 -0700
date_formatted: "August 26, 2015"
author: Nolan Gilley
comments: true
categories: User-Stories
og_image: /images/blog/2015-08-laundry-automation/protoboard.jpg
---


_This is a guest post by Home Assistant user and contributor [Nolan Gilley](https://github.com/nkgilley)._

Today I'll show you how I used Home Assistant, a NodeMCU (ESP8266), and a couple of accelerometers to automate our laundry room.

We have an older washer and dryer which doesn't have any form of notification when cycles complete.  Home Assistant was the obvious solution, I just needed to create sensors for the washer and dryer.  I tried using sound sensors but found them unreliable.  I ended up using an accelerometer attached to the back of each appliance.  I also added magnetic reed switches on the doors of the washer and dryer to detect whether they're open or closed.  I connected the accelerometers and reed switches to an NodeMCU which will relay the data to my MQTT broker.

After taking some sample data from the accelerometers while each appliance was in operation, I decided to plot the data to help determine the proper thresholds of when the devices were running or off.  I had to do this in order to get precise ranges so the dryer sensor wouldn't get tripped by the washer or vice versa.  In the plot below you can see the acceleration in each direction for the accelerometer connected to the dryer.   It's easy to see when the dryer is in operation here.  I used the same technique for the washer's accelerometer.

<p class='img'>
  <a href='/images/blog/2015-08-laundry-automation/data-graph.png'>
    <img src='/images/blog/2015-08-laundry-automation/data-graph.png' />
  </a>
  Graph showing the accelerometer data
</p>

<!--more-->

Next it was just a matter of integrating everything with Home Assistant.  I was able to use the [MQTT component](/components/mqtt/) to read the washer and dryer states from the Moteino and display it in Home Assistant.

<p class='img'>
  <img src='/images/blog/2015-08-laundry-automation/screenshot-ha.png' />
  Status of the dryer and washer in Home Assistant
</p>

Next I wrote [scripts](/components/script/) that are run whenever the washer or dryer completes a load.  This is triggered by the [automation component](/getting-started/automation/).  When the laundry is complete I have the lights in the house turn red and [notify me via Join](/components/notify.joaoapps_join/).  Once the door is opened and laundry emptied another script runs that sets the lights back to normal.  So far it has been very helpful and very reliable.

<p class='img'>
  <a href='/images/blog/2015-08-laundry-automation/protoboard.jpg'>
    <img src='/images/blog/2015-08-laundry-automation/protoboard.jpg' />
  </a>
  Top left: reed switch. Bottom left: moteino. Right: Accelerometer.
</p>

Materials used:

 - [NodeMCU](https://www.amazon.com/HiLetgo-Version-NodeMCU-Internet-Development/dp/B010O1G1ES)
 - [2 x Accelerometers](http://www.amazon.com/gp/product/B008BOPN40)
 - [2 x Reed switch](http://www.amazon.com/gp/product/B004PARDRO)

[Sketch for the NodeMCU is available here.](https://codebender.cc/sketch:352315)

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
  - alias: Washer complete
    trigger:
      platform: state
      entity_id: sensor.washer_status
      from: 'Running'
      to: 'Complete'
    action:
      service: script.turn_on
      entity_id: script.washer_complete

  - alias: Washer emptied
    trigger:
      platform: state
      entity_id: sensor.washer_status
      from: 'Complete'
      to: 'Empty'
    action:
      service: scene.turn_on
      entity_id: scene.normal

script:
  washer_complete:
    alias: Washer Complete
    sequence:
      - alias: Join Notification
        service: notify.join
        data:
          message: "The washing machine has finished its cycle, please empty it!"
      - alias: Living Room Lights Blue
        service: scene.turn_on
        data:
          entity_id: scene.blue
```

Resources used:

 - [Inspiration and Help with Arduino code](http://www.instructables.com/id/Uber-Home-Automation-w-Arduino-Pi/step13/Washer-Dryer-Smartifier-Water-Leak-Sensor/)

