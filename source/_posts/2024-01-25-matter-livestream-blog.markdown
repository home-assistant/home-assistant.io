---
layout: post
title: "The State of Matter"
description: "Catch up on all of the highlights of the State of Matter livestream that we streamed on Wednesday, January 10, 2024."
date: 2024-01-25 00:00:01
date_formatted: "January 25, 2024"
author: Marcel van der Veldt
comments: true
categories: Matter
og_image: /images/blog/2024-01-matter/matter.png
---
During our State of Matter live stream two weeks ago, we explained what Matter is, how it relates to Thread, and how you can compare it with existing protocols you may already know, like Zigbee or Z-Wave. 

In this blog post, we’ve extracted the highlights of the stream for you. We also link to our updated [Matter](/integrations/matter/) and [Thread](/integrations/thread/) documentation where relevant.

You can watch the entire live stream here:

<lite-youtube videoid="rEugjMk-4II" videotitle="State of Matter"></lite-youtube>

We’ll also highlight each segment of the live stream in this blog under each corresponding heading, so you can start watching the specific parts that interest you!

<!--more-->

## Why we believe in Matter

<lite-youtube videoid="rEugjMk-4II" videoStartAt="213" videotitle="State of Matter"></lite-youtube>

We believe in Matter: it’s open source, and most importantly, it’s fully local by default. Matter will allow us to control devices ranging from lights, to robot vacuums, to TVs, and to many other IP-connected devices, all through a standardized protocol. It is a huge step forward towards having more sustainable and worry-free smart home products. For this reason, Nabu Casa uses the revenue we get from the subscribers to Home Assistant Cloud (thank you all!) to employ developers who are dedicated to implementing Matter. And we have even joined the Connectivity Standards Alliance (CSA) - the organization behind the Matter standard - as a participant to have a front-row seat and to defend the [Open Home values](/blog/2021/12/23/the-open-home/) during the development of the standard.

Matter launched only one year ago, compared to twenty years for a standard like Zigbee, so it’s important to account for that in your expectations. If you’ve already invested heavily in an existing local standard, like Zigbee or Z-Wave, Matter is probably not your best choice at this point. We think there is no reason to throw these current smart home devices out, especially when they still work fine - after all, sustainability is one of our [Open Home values](/blog/2021/12/23/the-open-home/). But if you are new to the smart home scene and looking for devices with local, cloud-free standards that will still work even many years from now, keep an eye on Matter. The standard is rapidly evolving, with major updates twice a year where new device types and enhancements to existing ones are released.

After this first year, the current selection of Matter devices is still a bit limited, but a lot of companies have been using this time to develop them, and we expect more to be released soon. More and more companies are [joining the CSA](https://csa-iot.org/members/) and taking up the standard every month. We think Matter is here to stay and is going to be widely adopted.

## Demystifying Matter

<lite-youtube videoid="rEugjMk-4II" videoStartAt="525" videotitle="State of Matter"></lite-youtube>

To really understand what we’re talking about when it comes to Matter, we recommend you read our [updated Matter documentation](/integrations/matter/) or watch this chapter from our live stream.

<p><img src='/images/blog/2024-01-matter/matter-diagram.png' class='no-shadow' /></p>

In this segment, our product manager JLo explains Matter in an easy-to-understand, visual manner, using the diagram you see above. You’ll no longer have to wonder about Thread, Border routers, Bridges, or other Matter terminology after you’ve watched this video.

## The current state of Matter in Home Assistant

For the past year, we have been working on getting the foundation ready to support Matter devices in Home Assistant. Our implementation is based on the official Matter SDK, and we plan for it to become officially certified by the CSA to show that it will work problem-free with all products that carry the Matter logo. But we are not there yet; that is why we still label Matter as Beta in the integrations list. This will not change until our implementation has been certified.

We are still ironing out bugs, writing documentation, adding missing features, and doing a lot of troubleshooting. We are not alone on this, as many manufacturers needed this first year to get comfortable with the new standard as well, resulting in some unstable early devices coming to the market. We’ve also had to tweak our Home Assistant Operating System to work well with Matter, Thread, and its IPv6 requirement.

It has been a bumpy - sometimes even frustrating - ride, but everything is slowly getting into good shape. Vendors have ironed out bugs in their Matter device firmware, all kinds of new devices are popping up in stores, and the Matter 1.1 and 1.2 updates brought tons of stability fixes to the standard. 

From our perspective, it’s amazing that Matter is already in this state after being started only a couple of years ago. You can clearly see the enormous power of so many companies, from small to big, believing in Matter and working together to improve it.

### Get started with Matter in Home Assistant

<lite-youtube videoid="rEugjMk-4II" videoStartAt="2652" videotitle="State of Matter"></lite-youtube>

If you want to get started with Matter in Home Assistant, it is really important that you read the [documentation](/integrations/matter/) or watch this chapter of our live stream, which covers it all.

Matter has a few gotcha’s you should know about, and because we are still in the Beta stage, not everything is as polished as we want it to be.

If you follow the requirements/recommendations in the documentation, you will see that there are four scenarios that are stable and work well in Home Assistant today:

- Using WiFi-based Matter devices, like TP-Link (Matter) power plugs.
- Using Matter bridges, like the Aqara M2 or SwitchBot Hub 2.
- Using Thread-based Matter devices; if you have an Apple iPhone and one or more Apple devices that can be utilized by Home Assistant as a Thread Border router: HomePod gen2, HomePod Mini, Apple TV 4K (with ethernet).
- Using Thread-based Matter devices; if you have an Android phone and one or more Google devices that can be utilized by Home Assistant as a Thread Border router:
Google Nest Hub v2, Google Nest Hub Max, Google Nest WiFi Pro

It’s *very* important to note here that for Thread-based devices, the current recommended setup utilizes border routers from Apple or Google that match the type of phone you have. Please don’t worry - this doesn’t mean you have to add your devices to their ecosystems. Home Assistant will just use them to get access to the Thread radio network. The communication between the Home Assistant Matter controller and your Matter devices is completely encrypted and secure.

Using Home Assistant itself as a Thread border router (for example, by using the Thread radio in the Home Assistant Yellow or Home Assistant SkyConnect) is still under development at this point and is only recommended for the more technically experienced users. Currently, due to a bug, it can only be set up if you use an Android phone. Setting the Home Assistant SkyConnect or Home Assistant Yellow up as a Thread border router is not yet possible for users in the iOS/Apple ecosystem. We recommend that iOS users place, for example, a HomePod Mini or other Apple border router near their Thread devices to get the required Thread coverage. Alternatively, you can stay with WiFi-based Matter devices.

### Important

You do *not* need any additional hardware or radios to work with Matter devices. Any device that is running Home Assistant Operating System, be it a Home Assistant Green, a Raspberry Pi, or any other installation, is already a fully functional Matter Controller. You can connect to WiFi-based Matter devices straight out of the box. Only if you plan to use Thread-based Matter devices do you need additional hardware in the form of a Thread border router.

### Our tips for a frustration-free Matter experience:

- Read the [documentation](/integrations/matter/) for Matter.
- The easiest devices to get started with are WiFi-based Matter devices and Matter bridges. Do note that many brands with Matter bridges also have excellent native integrations in Home Assistant, and these integrations may offer features not yet available in the Matter standard.
- You need to run the Home Assistant Operating System. Other installation types are not supported.
- You need a standard (flat) network. Enterprise-like network setups with VLANs, mDNS responders, etc., break the expectations that Matter has about the network and are not supported. Keep it simple, and it will just work.
- Enable IPv6 on your home router and Home Assistant Operating System. You don’t need to get IPv6 from your internet provider, as the Matter devices operate locally. But you do need to make sure it’s enabled on your home network.
- If you are planning on using Thread-based Matter devices, you will need one or more [Thread border routers](/integrations/thread/) in your home. Home Assistant can work with third-party Thread border routers from Google or Apple as well, without having to add your devices to their ecosystem.
- Always check the device packaging to make sure it has a Matter badge. Thread is also used for other standards, so a device with a Thread badge on the packaging does not have to be a Matter device.
- Note that Matter is still in an early stage, so not every advanced feature you are used to may currently be implemented in this standard.

- Use the latest version of both Home Assistant and the Home Assistant Companion apps, as we are improving Matter support and fixing bugs continuously. Using the latest version can make the difference in being able to add a device to Home Assistant or not.

### Support

If you run into problems, please join our [Discord server](/join-chat/), where we have a dedicated Matter channel. Both our developers and many very experienced members of our community are active there to help you out with your Matter setup. Please only open an issue on our GitHub issue tracker if you encounter an actual bug.

## The Future of Matter in Home Assistant

<lite-youtube videoid="rEugjMk-4II" videoStartAt="4450" videotitle="State of Matter"></lite-youtube>

In the near future, we are focusing on improving the user experience to onboard and manage Matter devices. Especially adding new Matter devices to Home Assistant should be as stress-free as possible.

<p><img src='/images/blog/2024-01-matter/matter-roadmap.png' class='no-shadow' /></p>

This is what we are focusing on now:
- Functionality to 'share' a device from Home Assistant to another Matter controller.
- Showing basic device information and diagnostics about a device in the Home Assistant interface, as well as adding some troubleshooting options such as forcing a full interview.

This is what we will be focusing on next:
- A simpler flow to add Matter devices (a process called commissioning), where we guide our users step-by-step all the way from unboxing a device to being able to control it in Home Assistant. For now, we are focusing on the stable scenarios we mentioned previously. This means that we are improving the commissioning flow in our companion apps, relying on the Matter functionality built into your phone, and using (if necessary) Thread networks managed by the vendor of your phone (Google or Apple).
- A better handling of sharing of devices between controllers (a functionality called multi-admin). Adding a brand new Matter device (commissioning) and sharing a device that is already controlled by a Matter controller (multi-admin) are not part of the same flow. This difference is dictated by the Matter standard and its security features; a current controller (admin) has to allow a device to join another controller. This is often misunderstood today, and we are trying to create a better flow that guides our users toward the right path for their devices.
- We want to implement some missing features in the current platforms, such as light transitions and scenes.

This is what we want to achieve in the long run:
- The ability to use the Home Assistant SkyConnect or Home Assistant Yellow as a Thread border router to connect to Thread-based Matter devices instead of using Apple or Google Border routers.

On top of this, we will continuously focus on extending the support for new devices as new device types are added to the specification or existing ones are extended. In some cases, manufacturers even contribute to Home Assistant themselves to ensure a new device type is supported. 

We are also continuously keeping the quality of our Matter integration up to the standard of Home Assistant and fixing the most impactful issues our users are facing. For example, right now, we are making sure Matter devices that lose power are handled better in Home Assistant.

## Using Home Assistant Yellow or Home Assistant SkyConnect

<lite-youtube videoid="rEugjMk-4II" videoStartAt="5209" videotitle="State of Matter"></lite-youtube>

As we mentioned while talking about the recommended scenarios earlier, using the Home Assistant Yellow or Home Assistant SkyConnect for Thread is still in development and only recommended for technically experienced users.

That’s why our current recommendation for Home Assistant Yellow and Home Assistant SkyConnect is to use the Zigbee firmware to power your Zigbee network. This is a stable solution that has worked reliably since the introduction of these products and offers a great experience.

As we continue to work on Matter in Home Assistant, we’re now focused on ensuring that the Thread experience will catch up and become a first-class citizen, making it easy to connect to your Thread-based devices in Home Assistant without a third-party Thread border router. The Thread firmware is already fully functional under the hood, but we still have some work to do to make the experience of using Thread-based devices in Home Assistant feel good. As we mentioned in our chapter on the future of Matter in Home Assistant, we expect great strides in this area within the following months. Once the experience has improved, we will recommend using this Thread firmware to power your Thread network as an alternative to using third-party Thread border routers from Apple or Google.

There is a third, experimental, firmware option that supports multiprotocol, which allows the Silicon Labs chip in these products to connect to both Zigbee and Thread networks with one radio. We announced our intent to release a firmware supporting multiprotocol when we launched Home Assistant Yellow and Home Assistant SkyConnect, and this firmware has been available since December 2022. It integrates the Silicon Labs SDK, which adds this support for multiprotocol. During the further development and testing of the multiprotocol firmware, we have concluded that while Silicon Labs’ multiprotocol works, it comes with technical limitations. These limitations mean users will not have the best experience compared to using dedicated Zigbee and Thread radios. That is why we do not recommend using this firmware, and it will remain an experimental feature of Home Assistant Yellow and Home Assistant SkyConnect. If you currently have the multiprotocol firmware installed but don’t actively use it to connect to Thread devices, we recommend that you [disable multiprotocol](https://skyconnect.home-assistant.io/procedures/disable-multiprotocol/).

Nothing changes for current users of the multiprotocol firmware who are happy with their experience. The experimental multiprotocol firmware will remain available, but we will not recommend it to new users. Instead, we will focus on making sure the dedicated Zigbee and Thread firmwares deliver the best experience to users.

## Thank you

After our first year of implementing Matter, we’re very happy that the technical foundation is in good shape. We can now take the next steps to ensure the entire Matter experience is as good as it can possibly be! Thank you to all of the users who have been on this journey with us, have provided us with valuable feedback and bug reports, and have shared their experiences so we know how we can make Matter in Home Assistant even better. And thank you to all of the viewers of the live stream and everyone who sent in questions beforehand and during the stream; your input helps us make these streams the best they can be. And if you made it all the way down here - thank you for reading!

If you have any more questions or experience problems with Matter in Home Assistant, please join our [Discord server](/join-chat/)! We have a dedicated Matter channel there, and our developers and many experienced members of our community can help you out.
 