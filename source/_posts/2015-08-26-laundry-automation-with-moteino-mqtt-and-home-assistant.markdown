---
title: "Laundry Automation: insight and notifications"
description: "Nolan describes how he gets notified when laundry is done."
date: 2015-08-26 08:12 -0700
date_formatted: "August 26, 2015"
author: Nolan Gilley
categories: User-Stories
og_image: /images/blog/2015-08-laundry-automation/moteino-and-sensors.jpg
---


_This is a guest post by Home Assistant user and contributor [Nolan Gilley](https://github.com/nkgilley)._

In our house, laundry has been a struggle for quite some time.  Our washer and dryer both lack a buzzer which leads to forgotten laundry, and stinky mess that needs to be rewashed.  I decided to create a solution by monitoring the washer and dryer myself with some cheap electronics.

As an avid user of Home Assistant, I decided it would be the perfect application to manage the UI and notification system.  Now all I needed was a way to monitor the washer and dryer.  I tried using sound sensors but found them unreliable.  I ended up opting for an accelerometer attached to the back of each appliance.  I also added magnetic reed switches on the doors of the washer and dryer to detect if the doors are open or closed.  I connected the accelerometers and reed switches to a [Moteino](https://lowpowerlab.com/moteino/), an arduino clone with an RF transceiver.  The Moteino can perform the logic to figure out which state the appliances are in and wirelessly communicate that data with another Moteino that is connected via serial to my Raspberry Pi.  The Raspberry Pi reads the serial data and repeats it over MQTT for Home Assistant to use.  This is great because I don't have to run Home Assistant on the Raspberry Pi.  I can run it on a faster machine and point the [MQTT component](/integrations/mqtt/) to my Raspberry Pi.

After taking some sample data from the accelerometers while each appliance was in operation, I decided to plot the data to help determine the proper thresholds of when the devices were running or off.  I had to do this in order to get precise ranges so the dryer sensor wouldn't get tripped by the washer or vice versa.  In the plot below you can see the acceleration in the x direction for the accelerometer connected to the washing machine.   It's easy to see when the washing machine is in operation here.  I used the same technique for the dryer's accelerometer.

<p class='img'>
  <a href='/images/blog/2015-08-laundry-automation/data-graph.png'>
    <img src='/images/blog/2015-08-laundry-automation/data-graph.png' />
  </a>
  Graph showing the accelerometer data
</p>

<!--more-->

Next it was just a matter of integrating everything with Home Assistant.  I was able to use the [MQTT component](/integrations/mqtt/) to read the washer and dryer states from the Moteino and display it in Home Assistant.

<p class='img'>
  <img src='/images/blog/2015-08-laundry-automation/screenshot-ha.png' />
  Status of the dryer and washer in Home Assistant
</p>

Next I wrote [scripts](/integrations/script/) that are run whenever the washer or dryer completes a load.  This is triggered by the [automation component](/getting-started/automation/).  When the laundry is complete I have the lights in the house turn red and [notify me via PushBullet](/integrations/pushbullet).  Once the laundry is taken care of another script runs that sets the lights back to normal.  So far it has been very helpful and very reliable.

<p class='img'>
  <a href='/images/blog/2015-08-laundry-automation/moteino-and-sensors.jpg'>
    <img src='/images/blog/2015-08-laundry-automation/moteino-and-sensors.jpg' />
  </a>
  Top left: reed switch. Bottom left: moteino. Right: Accelerometer.
</p>

Materials used:

 - [Moteino](https://lowpowerlab.com/moteino/)
 - [2 x Accelerometers](https://amzn.to/2WXa2s5)
 - [2 x Reed switch](https://amzn.to/2X0ZuZ2)
 - [Home Assistant](/)

[Sketch for the Moteino is available here.](https://codebender.cc/sketch:144743)

Home Assistant Configuration:

{% note %}
The automation and script syntax here is using a deprecated and no longer supported format.
{% endnote %}

```yaml
mqtt:
  broker: 192.168.1.100
  port: 1883
  keepalive: 60
  qos: 0

sensor:
  platform: mqtt
  name: "Dryer Status"
  state_topic: "sensor/dryer"
  unit_of_measurement: ""

sensor 2:
  platform: mqtt
  name: "Washer Status"
  state_topic: "sensor/washer"
  unit_of_measurement: ""

automation:
  alias: "Dryer complete"

  platform: state
  state_entity_id: sensor.dryer_status
  state_from: "Running"
  state_to: "Complete"

  execute_service: script.turn_on
  service_entity_id: script.dryer_complete

automation 2:
  alias: "Dryer emptied"

  platform: state
  state_entity_id: sensor.dryer_status
  state_from: "Complete"
  state_to: "Empty"

  execute_service: script.turn_on
  service_entity_id: script.dryer_cleared

script:
  dryer_complete:
    alias: "Dryer Complete Script"
    sequence:
      - alias: "Pushbullet Notification"
        execute_service: notify.notify
        service_data:
          message: "The dryer has finished its cycle, please empty it!"
      - alias: "Living Room Lights Red"
        execute_service: scene.turn_on
        service_data:
          entity_id: scene.red
      - delay:
          seconds: 1
      - alias: "Living Room Lights Off"
        execute_service: light.turn_off
        service_data:
          entity_id: group.living_room
      - delay:
          seconds: 1
      - alias: "Living Room Lights Red"
        execute_service: scene.turn_on
        service_data:
          entity_id: scene.red

  dryer_cleared:
    alias: "Dryer Cleared Script"
    sequence:
      - alias: "Living Room Lights Off"
        execute_service: light.turn_off
        service_data:
          entity_id: group.living_room
      - delay:
          seconds: 1
      - alias: "Living Room Lights Normal"
        execute_service: scene.turn_on
        service_data:
          entity_id: scene.normal
```

Resources used:

 - [Inspiration and Help with Arduino code](http://www.instructables.com/id/Uber-Home-Automation-w-Arduino-Pi/step13/Washer-Dryer-Smartifier-Water-Leak-Sensor/)
 - [Moteino Code](https://github.com/LowPowerLab/RFM69/)
