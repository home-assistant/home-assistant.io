---
title: "Activating Tasker tasks from Home Assistant using command line switches"
description: "Step-by-step guide how to start using Tasker on your Android phone with Home Assistant"
date: 2015-12-10 10:39:41 +0000
date_formatted: "December 10, 2015"
author: Rowan Hine
categories: How-To
og_image: /images/blog/2015-12-tasker/screenshot-2.png
---

<img src='/images/blog/2015-12-tasker/tasker-logo.png' style='clear: right; border:none; box-shadow: none; float: right; margin-bottom: 12px;' width='200' />
In this tutorial I will explain how you can activate Tasker tasks from Home Assistant command line switches. We are going to set up a switch that when toggled will make your Android device say either "On" or "Off".

You could also do this with the automation component instead so whenever you put your house to sleep mode for example your Android device will open up Google Play Books or the Kindle app ready for you to read as well as dimming your lights, but this tutorial is all about the switches.

<!--more-->

### AutoRemote URL

First things first you should install [Tasker](https://play.google.com/store/apps/details?id=net.dinglisch.android.taskerm) and [AutoRemote](https://play.google.com/store/apps/details?id=com.joaomgcd.autoremote) onto your Android device and launch AutoRemote. You should see a URL above the QR code, visit it in your browser and it should bring up a page a bit like this.

<p class='img'>
<img src='/images/blog/2015-12-tasker/screenshot-1.png'>
</p>

Now type in `SayOn` in the `Message` box and you should see a box appear on the right with a URL in it, this is what we will be using in the Python script later on so save that for later. Do the same thing again but this time replace `SayOn` with `SayOff`. Now just click the `Send message now!` button to test that your commands will get sent to your Android device, if they do you will see a toast message at the bottom of your screen like this one.

<p class='img'>
<img src='/images/blog/2015-12-tasker/screenshot-2.png' height='450' />
</p>

### Tasker Setup

Open up Tasker and make sure you're in the `PROFILES` tab, then select the plus icon to create a new profile. Select `Event` -> `Plugin` -> `AutoRemote` -> `AutoRemote` and then the pencil icon to configure the AutoRemote event. Select `Message Filter` and enter in `SayOn` then go back until it asks you for a task. Select `New task` then just leave the next field blank and select the tick icon. 
This is where we'll configure our task, so select the plus icon to select an action. Select `Alert` -> `Say` to add a Say action. Enter `On` in the text field and go back to test your task, make sure your media volume is up then select the play icon, you should hear your device say "On".

<p class='img'>
<img src='/images/blog/2015-12-tasker/screenshot-3.png' height='450' />
</p>

Now you can go back to the main Tasker screen and create another profile but this time replace `SayOn` with `SayOff` and `On` with `Off`. After you've done that go to the main screen again and select the menu button at the top then `Exit` and `Save first` to make sure everything is saved properly.

### Python Script

Now it's time to set it up the script, so create a new Python script and name it `On.py` then enter this code: 

```python
import requests
requests.get('[URL]')
```

Enter in your "On" URL then save it. Create another script but this time call it `Off.py` and enter your "off" URL instead.

### Home Assistant Configuration

Add a command line switch to your Home Assistant configuration:

```yaml
switch:
  platform: command_switch
  switches:
    tasker_say:
      oncmd: python "[LocationOfOnScript]"
      offcmd: python "[LocationOfOffScript]"
```

Now load up Home Assistant and whenever you toggle the switch you created your Android device will respond with either "On" or "Off". :-)
