---
title: "Adding Integrations"
description: "Instructions to add an integration."
---
Let's start by adding your first integration so that you can see and change a smart home device.

From the side bar, click on {% my integrations title="Settings -> Devices & Services" %}. At this screen you will be able to set up integrations with Home Assistant. You might notice a "discovered" section. This section contains integrations that were found on your network and can easily be added with a few clicks. If your integrations are not discovered, click the **Add integration** button in the lower right and search for your integration in that list.

In this example, we'll add a Chromecast to Home Assistant. Chromecast uses the [Google Cast integration](/integrations/cast). Although the below example has already discovered the device, let's add it manually.

First, press the **Add integration** button in the lower right and search for your integration in that list.

![Search for Google Cast](/images/getting-started/add-google-cast-integration.png)

Select **Google Cast** from the list. Because my Chromecast device was already discovered, it asks if I want to add the discovered one or a different one. I will choose the latter and setup another instance.

![Google Cast discovered confirmation](/images/getting-started/google-cast-discovered.png)

It now asks for the network IP address of the device. This is beyond the scope of this article because each network is different however the router is usually a good place to look. In this example, it's *192.168.1.99*.

![Manually setup Google Cast device](/images/getting-started/google-cast-manual-details.png)

If it was successful, it will show a message and allow you to set the area it belongs to. Areas allow you to organize all the devices in your home.

![Search for Google Cast](/images/getting-started/google-cast-integration-added.png)

When you're done, navigate back to the web interface and voila, your devices are ready for you to control. You can always go back to add and remove integrations in the future.

If you get stuck, need more information or want to see what the setup process is like, use the [integration documentation](/integrations).

{% include getting-started/next_step.html step="Automate Home Assistant" link="/getting-started/automation/" %}