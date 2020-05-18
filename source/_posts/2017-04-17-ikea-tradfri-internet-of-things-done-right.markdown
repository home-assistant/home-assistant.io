---
title: "IKEA Trådfri: Internet of Things done right"
description: "We analyzed the recently released IKEA Trådfri hardware. It is the perfect companion hardware to Home Assistant."
date: 2017-04-17 08:04:05 +0000
date_formatted: "April 17, 2017"
author: Paulus Schoutsen
author_twitter: balloob
categories: Internet-of-Things
og_image: /images/blog/2017-04-tradfri/gateway.jpg
---

Last month IKEA released a new home automation lineup called [Trådfri][tradfri]. It consists of white bulbs, dimming remotes, color temperature remotes and motion sensors. After almost two weeks of research, we have come to the conclusion that this is going to be the perfect companion hardware to work with Home Assistant. Here is the gist of our breakdown:

 - **Works out of the box.** You can get started by just buying the already paired light and remote. You only need to buy the gateway if you want to set time-based rules for your lights or use your phone as a remote.
 - **Local only hub.** No cloud that gathers data about how you live your life and it will keep working even if IKEA stops supporting it.
 - **Based on open standards.** It uses Zigbee between devices and CoAP/dTLS to talk to the gateway. This means that you are not locked into a single vendor. You can pair it with Philips Hue bulbs and other compatible vendors.
 - **Affordable.** Lights start at $12 standalone and $20 if bundled with a remote (USA prices).
 - **Useful design.** The gateway has built-in space to hide excess cables and remotes come with magnetic holders for on the wall.
 - **Able to subscribe to changes (local push).** Automations will be able to instantly respond to changes to device states by subscribing to the gateway for changes.
 - **Full integration in Home Assistant 0.43 (scheduled for release April 22).** Our community built a standalone library [pytradfri] and we use it in Home Assistant. Home Assistant will automatically discover gateways on your network and guide the user to set them up.
 - **Downside: no integration with other systems yet.** There are rumors that Homekit support will land in October and I expect both Google Home and Amazon Echo to eventually add support. Use Home Assistant to connect them all in the meanwhile.
 - **Semi-downside: you can’t control your lights remotely.** Because it’s local only, you won’t be able to control your lights remotely unless via a third-party integration.

Full breakdown available after clicking read more.

_(Note: we are not affiliated with IKEA nor do we receive commission for sales. We are just big fans of their new line up!)_

<!--more-->
## Works out of the box

IKEA Trådfri focuses on the basics: making a product that works out of the box. They sell various dimming kits. Each contain a light and a remote paired to control the light. You put the light into the socket, slide the battery into the remote and. it. works. No need to purchase a gateway, download an app and use your phone to set it up. Heck, you don’t even need internet to get started!

You will only need to buy the gateway if you want to use your phone as a remote or set up home automation.

## Only works locally

The gateway only works locally. It only reaches out to the internet to synchronize the time and to check for firmware updates. This is awesome for many different reasons.

**Privacy & Security.** No one but yourself will have access to the state of your house. And inside your house your communication with the gateway is encrypted.

**Reliability & Speed.** All communication will always happen locally. Even if your internet will go out, you can still control your lights and your automations will still run. Even if IKEA would decide to drop support it will still continue to work.

Check out [this blog post by Matthew Garrett][mjg59] for a more in-depth analysis of the security of the gateway. His conclusion:

<blockquote>
  Overall: as far as design goes, this is one of the most secure IoT-style devices I've looked at. I haven't examined the COAP stack in detail to figure out whether it has any exploitable bugs, but the attack surface is pretty much as minimal as it could be while still retaining any functionality at all. I'm impressed.
</blockquote>

## Based on open standards

IKEA Trådfri devices use the open standard Zigbee to communicate. The gateway speaks both Zigbee and connects to your network to offer an API based on the open standard CoAP. The API communication is secured via the open standard DTLS.

Because it’s based on Zigbee, you don’t have to just buy IKEA devices the rest of your life. For example, Philips Hue lights will pair just fine with the IKEA gateway.

Note that there are reports that the other way around, pairing an IKEA light to the Philips Hue hub is currently not possible. IKEA is working on it according to [a post by Philips Hue support][hue-support]:

<blockquote>
  The non-interoperability between the newly launched IKEA smart lighting products and the Philips Hue bridge has been analyzed. One of the issues found is that the IKEA bulbs report their ProfileID as corresponding to the Zigbee Home Automation (ZHA) profile rather than the Zigbee Light Link (ZLL) profile. As the IKEA bulbs do not behave fully compliant with the ZLL standard, they are rejected by the Hue bridge. IKEA is aware of this and informed us their intent is to have the IKEA smart lighting bulbs to work with the Philips Hue bridge.
</blockquote>

## Affordable

A white IKEA light bulb that just supports dimming starts at $12. You’ll have to shell out $18 If you want a white bulb that can control the light temperature to allow for different shades of white (relax, cool, focus etc). These prices are slightly lower than the competition. Right now on Amazon the cheapest just-dimming white bulbs come in at $15.

However what really differentiates this system is the availability of all the cheap remotes and motion sensors. Ranging between $20 and $27 you get a light and a remote. Standalone Zigbee remotes on Amazon currently start at $21!

Remotes are [a very important aspect of home automation][perfect]. The electricity has to be always on for the bulbs to function so you’ll need Zigbee switches and remotes to control your lights. The fact that they are so cheap will really help with adoption.

<p class='img'>
<img src='/images/blog/2017-04-tradfri/prices.png' />
Prices of the various available dimming kits.
</p>

## Useful design

The lights and gateway are all made with a simple design and will easily blend into your home.  They did sneak in some great and useful things. You can slide the cover off the gateway and open it up. Inside is a mini case for the actual electronics but mainly it’s just empty space so you can roll up any excess network and usb cable from the hub inside!

<p class='img'>
<img src='/images/blog/2017-04-tradfri/gateway.jpg' />
The cables you don't need can be hidden in the gateway.
</p>

Another nice feature is that the remote comes with a magnetic mount for the wall.

## Able to subscribe to changes (local push)

This is a feature that I am really excited about. By being able to subscribe to changes in the Zigbee network Home Assistant will be able to instantly be notified about changes and trigger automations if necessary.

This means that you will be able to turn the power on for a light and see it instantly turn on in Home Assistant.

[_(Learn more about the different ways IoT devices broadcast changes)_][classification]

## Full integration in Home Assistant 0.43 (scheduled for release April 22)

Home Assistant will automatically discover gateways on your network and guide the user to set them up.

Once IKEA Trådfri got released, our community, lead by [Patrik], got quickly organized and started analyzing the different aspects [in our forums][forums]. I am happy to say that the end result is a standalone Python library [pytradfri] to control the gateway. This means that starting from our next release, Home Assistant 0.43, we will auto discover your gateway and integrate all your lights.

The initial version of our integration will not yet stream events from the gateway. We’re still working on figuring out that part of the API.

<p class='img'>
<img src='/images/blog/2017-04-tradfri/discovery.png' />
After automatic discovery, Home Assistant will ask the user to finish pairing with the gateway.
</p>

## Downside: not many integrations yet

The one major downside right now is that there are not many integrations yet because the system is brand new. There are [rumors] that Homekit is planned for October. And given the way the API is set up, I expect Google Home and Amazon Echo (Alexa) to eventually announce integration too.

Since Home Assistant does integrate with it, you can use Home Assistant to bridge to these systems. For Homekit use [Homebridge] with the [Home Assistant plugin][hb-hass]. For integration with Google Home and Amazon Echo use [the Emulated Hue component][emulated_hue]. For Google Home you can also use [the API.ai integration][apiai] and Amazon Echo can also work with [Haaska].

## Semi-downside: you can’t control your lights remotely

Because the system is local only, you won’t be able to control your lights remotely. As with the previous downside, you will be able to use Home Assistant to make your system available remotely.

Classified this as a semi-downside because besides showing off, the actual use cases are very rare. Although it makes [great marketing material].

## Conclusion

With Trådfri, IKEA has managed to put out an affordable and secure home automation system that does not compromise on functionality or design. There are still some downsides which I expect to get resolved in the future.

As it currently stands, this is going to be the perfect companion hardware to work with Home Assistant: local, affordable, secure. And as cherry on the pie, local push will make us aware of changes right away.

[tradfri]: http://www.ikea.com/us/en/catalog/categories/departments/lighting/36812/
[mjg59]: http://mjg59.dreamwidth.org/47803.html
[hue-support]: https://developers.meethue.com/content/philips-hue-and-ikea-tr%C3%A5dfri#comment-2686
[perfect]: /blog/2016/01/19/perfect-home-automation/#you-should-not-have-to-adapt-to-technology
[Patrik]: https://github.com/ggravlingen
[forums]: https://community.home-assistant.io/t/ikea-tradfri-gateway-zigbee/14788
[pytradfri]: https://github.com/ggravlingen/pytradfri
[rumors]: https://github.com/bwssytems/ha-bridge/issues/570#issuecomment-293505087
[Homebridge]: https://github.com/nfarina/homebridge
[hb-hass]: https://github.com/home-assistant/homebridge-homeassistant
[emulated_hue]: /integrations/emulated_hue/
[apiai]: /integrations/dialogflow
[Haaska]: https://github.com/auchter/haaska
[great marketing material]: https://i2.wp.com/blog.smartthings.com/wp-content/uploads/2014/06/summer-vacay-683x405-blog.png?fit=683%2C405&ssl=1
[classification]: /blog/2016/02/12/classifying-the-internet-of-things/
