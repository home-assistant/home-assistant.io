---
title: "Classifying the Internet of Things"
description: ""
date: 2016-02-12 22:31:00 UTC
date_formatted: "February 12, 2016"
author: Paulus Schoutsen
author_twitter: balloob
categories: Internet-of-Things
og_image: /images/blog/2016-02-classifying-internet-of-things/social.png
---

The core of home automation is knowing what’s going on. The faster we know about a state change, the better we can serve the user. If you want to have your lights to turn on when you arrive at home, it doesn’t help if it only knows about it after you’ve already opened the door and manually (!!) turned on the lights.

Each smart device consists of the ‘normal’ device and the piece that makes it ‘smart’: the connectivity. The connectivity part of a device can consists of either control, state or both.

State describes what a device is up to right now. For example, a light can be on with a red color and a medium brightness.

Control is about controlling the smart device by sending commands via an API. These commands can vary from configuring how a device works to mimicking how a user would interact with a device. A media player can allow skipping to the next track and a sensor could allow to configure its sensitivity or polling interval.

The Home Assistant APIs are setup to be as convenient as possible. However, a network is always as weak as it’s weakest link. In our case these are the integrations. Take for example controlling a light that does not report state. The only state Home Assistant can report on after sending a command is the assumed state: what do we expect the state of the light to be if the command worked.

We want our users to get the best home automation experience out there and this starts with making sure they have devices that work well with Home Assistant. That’s why we will start applying the following classifiers to our integrations:

<a name='classifiers'>
<table>
  <tr>
    <th colspan='2'>Classifier</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><iconify-icon icon="mdi:circle-half-full"></iconify-icon></td>
    <td style='white-space: nowrap;'>Assumed State</td>
    <td>
      We are unable to get the state of the device. Best we can do is to assume the state based on our last command.
    </td>
  </tr>

  <tr>
    <td><iconify-icon icon="mdi:cloud-upload"></iconify-icon></td>
    <td>Cloud Polling</td>
    <td>
      Integration of this device happens via the cloud and requires an active internet connection. Polling the state means that an update might be noticed later.
    </td>
  </tr>

  <tr>
    <td><iconify-icon icon="mdi:cloud-download"></iconify-icon></td>
    <td>Cloud Push</td>
    <td>
      Integration of this device happens via the cloud and requires an active internet connection. Home Assistant will be notified as soon as a new state is available.
    </td>
  </tr>

  <tr>
    <td><iconify-icon icon="mdi:download-network-outline"></iconify-icon></td>
    <td>Local Polling</td>
    <td>
      Offers direct communication with device. Polling the state means that an update might be noticed later.
    </td>
  </tr>

  <tr>
    <td><iconify-icon icon="mdi:upload-network-outline"></iconify-icon></td>
    <td>Local Push</td>
    <td>
      Offers direct communication with device. Home Assistant will be notified as soon as a new state is available.
    </td>
  </tr>
</table>

The background to how we got to these classifiers can be read after the break.
<!--more-->

## State

How state is communicated can be broken down into 5 categories. They are not mutually exclusive - a device state can be available both via the cloud and local connectivity.

### No state available
These are devices that do not have the capabilities to make their state available. They only allow to be controlled. For example, devices with infrared remote controls like TVs and ACs. You can press the turn on button on the remote but can only assume that your command was received and executed successfully. The device might not be powered or something is blocking the infrared receiver.

Home automation will have to approach such devices based on the assumption that it’s commands are received correctly: using optimistic updates. This means that after sending a command it will update the state of the device as if the command was received successfully.

Advantages:

 - None

Disadvantages:

 - Home automation will assume the wrong state if the command is not received correctly or if the device is controlled in any other way outside of the home automation system.

### Polling the cloud
These are devices that will only report their state to their own cloud backend. The cloud backend will allow reading the state but will not notify when a new state has arrived. This requires the home automation to check frequently if the state has been updated.

Advantages:

 - Able to control devices while at home or away.
 - Cloud has access to more computing power to mine the device data to suggest optimizations to the user.

Disadvantages:

 - It doesn’t work if the internet is down or the company stops support.
 - You are no longer in control about who has access to your data.

### Cloud pushing new state
All off the previous section applies to this one. On top of that the cloud will now notify the home automation when a new state has arrived. This means that as soon as the cloud knows, the home automation knows.

Advantages:

 - New state known as soon as available in the cloud.

### Polling the local device
These devices will offer an API that is locally accessible. The home automation will have to frequently check if the state has been updated.

Advantages:

 - Does not depend on the internet.

Disadvantages:

 - To be pollable, a device needs to be always online which requires the device to be connected to a power source.

### Local device pushing new state
The best of the best. These devices will send out a notice when they get to a new state. These devices usually use a home automation protocol to pass it’s message to a hub that will do the heavy lifting of managing and notifying subscribers

Advantages:

 - Near instant delivery of new states.
 - Able to get a long battery life by going into deep sleep between state updates.

Disadvantages:

 - If it does not also support polling, home automation will not be made aware of the state after booting up until it changes.
 - If using deep sleep and Wi-Fi, it will suffer a delay when waking up because connecting to WiFi and receiving an IP takes time.


## Control

Controlling a device can, just like state, be done through cloud and/or local connectivity. But the more important part of control is knowing if your command was a success and the new state of the device.

### No control available
These devices are not able to be controlled. They will only offer state.

### Poll State after sending command
These devices will require the state to be polled after sending a command to see if a command was successful.

Advantages:

 - The state will be known right after the command was issued.

Disadvantages:

 - It can take time before the state gets updated. How often do we poll and how long do we wait till we consider the command failed? Also, a state may change because of other factors. Difficult to determine if the updated state is because of our command.

### Device pushes state update
These devices will not return a new state as a result of the command but instead will push a new state right away. The downside of this approach is that we have to assume that a state update coming in within a certain period of time after a command is related to the command.

### Command returns new state
The very best. These devices will answer the command with the new state after executing the command.

## Classifying Home Assistant
Home Assistant tries to offer the best experience possible via its APIs. There are different ways of interacting with Home Assistant but all are local.

 - State polling is available via the REST API
 - There is a stream API that will push new states as soon as they arrive to subscribers. This is how the frontend is able to always stay in sync.
 - Calling a service on Home Assistant will return all states that changed while the service was executing. This sadly does not always include the new state of devices that push their new state, as they might arrive after the service has finished.
