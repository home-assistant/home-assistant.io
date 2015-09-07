---
layout: page
title: "IFTTT"
description: "Instructions how to setup IFTTT within Home Assistant."
date: 2015-09-07 18:00
sidebar: false
comments: false
sharing: true
footer: true
---
<img src='/images/supported_brands/ifttt.png' class='brand pull-right' />
[IFTTT](https://ifttt.com) is a web service that allows users to create chains of simple conditional statements, so called "recipes". With the ifttt component you can trigger recipes through the "maker" channel.

To load the IFTTT component into Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
ifttt:
  key: xxxxx-x-xxxxxxxxxxxxx
```

You can find your secret key by viewing the properties of the [Maker Channel] (https://ifttt.com/maker)
![](http://i.imgur.com/9JNHmJe.png)

Once you have added your entries to `configuration.yaml`, restart your Home Assistant server.  This will load up the IFTTT component and create a service trigger.

Note: After restarting the server, be sure to watch the console for any logging errors that show up in red, white or yellow.

![](http://i.imgur.com/azkEyUl.png)

You can use the developer tools to test your [Maker Channel] (https://ifttt.com/maker) trigger.
The payload for the trigger should be {"`event`":"`EventName`"}.

Example : `{"event":"TestHA_Trigger"}`

![example](http://i.imgur.com/MV1L2np.png)

On the [Maker Channel] (https://ifttt.com/maker) side of things, you should have a recipe that looks something similiar to this:

![Maker Channel Preview](http://i.imgur.com/znvymX7.png)


