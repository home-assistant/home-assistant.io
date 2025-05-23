---
layout: post
title: "Home Assistant officially Matters"
description: "Home Assistant gains certification, but also a powerful tool for any open source project"
date: 2025-03-10 00:00:01
date_formatted: "March 10, 2025"
author: Marcel van der Veldt
comments: true
categories: 
  - Announcements
  - Matter
og_image: /images/blog/2025-03-matter-certification/art.jpg
---

<p><img src='/images/blog/2025-03-matter-certification/art.jpg' alt="Home Assistant is officially matter certified" class='no-shadow' /></p>

Matter in Home Assistant has been officially certified! 🎉 The Connectivity Standards Alliance (CSA) has certified [Home Assistant](https://csa-iot.org/csa_product/home-assistant/) and the [Open Home Foundation Matter Server](https://csa-iot.org/csa_product/open-home-foundation-matter-server/), the first open-source project to receive this certification. Certification is proof that open source projects can sit among, or even above, big tech when it comes to providing the best smart home experience.

Home Assistant, as part of the [Open Home Foundation](https://www.openhomefoundation.org/), strongly believes in open standards. They embody our values of choice, privacy, and sustainability in the smart home. When a standard is well supported, consumers get access to a wide range of smart home devices that should work far into the future, which is great for sustainability. Best of all, they work locally, keeping your smart home data in your home.

All these benefits led us to include open standards certification [in our roadmap](/blog/2024/06/12/roadmap-2024h1/#open-standards-certified-quality). Home Assistant's implementations of Matter, Zigbee, and Z-Wave are already industry-leading, so it only makes sense to clearly signal and give users peace of mind that we provide true compatibility. This most recent certification is not just big for Home Assistant, but read on to see how it also helps any open source project looking to use Matter.

<!--more-->

## Matter matters

<p class="img"><lite-youtube videoid="rEugjMk-4II" videotitle="State of Matter 2024"></lite-youtube>Our live stream from 2024 explains Matter in depth</p>

Matter is the latest smart home open standard, which is looking to connect and control smart home devices regardless of their manufacturer or which ecosystem you want to control them from. Like the other open standards we support, it can be controlled fully locally, meaning these devices are not reliant on the cloud to work. The Connectivity Standards Alliance (CSA) is the body behind the Matter standard, representing its many members. They certify devices and set the rules on how they work together.

If you're not familiar with Matter, I'm not surprised. Though its adoption is growing, it's only a [couple of years old](https://csa-iot.org/newsroom/matter-arrives/). The most important companies in the smart home space have joined this standard, but support is still growing and becoming more consistent. If it fulfills its promise, any smart home product should work with your ecosystem of choice, and that makes us optimistic about its future.

More and more Matter devices are entering the market, and if you're buying new smart devices, it will just be a matter of time 😉 before you own one. To this point, Matter devices are even a part of our [Works With Home Assistant](https://partner.home-assistant.io/) program. [Aqara was the first](/blog/2024/09/03/aqara-joins-works-with-home-assistant/) to join our program with Matter devices, and we tested these devices ourselves to ensure they give the best experience possible in Home Assistant. This year, we expect many more Matter devices to join the program, and we should have more updates soon.

From a technical perspective, Matter is really interesting---it can work with different smart home systems at the same time. It also keeps the way devices connect and communicate separate, allowing it to connect to devices over Wi-Fi, Ethernet, and [Thread](/integrations/thread/) (a new mesh network technology for smart devices). Read our [State of Matter blog](/blog/2024/01/25/matter-livestream-blog/) or watch Paulus' appearance on [the Vergecast Matter Holiday Spec-Tacular](https://youtu.be/0Y75XEXAXfY?si=nSDpP6THkWhkARuc&t=3493) for a deeper dive into the standard.

## What certification brings

<p class="img"><img src='/images/blog/2025-03-matter-certification/ha-matter.png' alt="Home Assistant Matter certification"/>Well, this is a bit... awesome</p>

First and foremost, from a usability perspective, nothing will change for you. We are consistently the first to adopt the newest Matter versions, currently providing the highest version available. We'll keep on improving the Matter Server and the Matter integration at the same pace, ensuring that all device types in the Matter spec will work perfectly with Home Assistant---just from now on it will come with this certification badge.

The [Open Home Foundation Matter Server](https://csa-iot.org/csa_product/open-home-foundation-matter-server/) is now an officially trusted/certified software component, while [Home Assistant](https://csa-iot.org/csa_product/home-assistant/) is a certified "User Interface Component" (more on this distinction below). This allows us to clearly show this with a logo, along with being listed on the Matter website. For new Home Assistant users, this helps build confidence, knowing it is a supported way to use Matter. Similarly, for brands that don't know much about Home Assistant, these references can be surprisingly helpful, and it's our goal to have more brands target Home Assistant in their development. Another handy part of being certified is getting more access to pre-test new devices and SDK revisions, which will help development going forward.

### Why two certifications (and the server add-on)

<p class="img"><img src='/images/blog/2025-03-matter-certification/ohf-matter.png' alt="Open Home Foundation Matter Server is certified"/>So much fun we did it twice</p>

If you're confused why we certified both Home Assistant and Open Home Foundation Matter Server, there are a couple of legal/procedural reasons, but it comes with some useful benefits. We certified the server as a standalone component to allow any project to use it. Each project that uses it, including Home Assistant, will have to go through a certification process to acknowledge that it uses a certified component as a "User Interface Component". Certification for the Open Home Foundation Matter Server means it properly connects and communicates with other Matter devices, while certification for Home Assistant is about being able to display the Matter trademark.

This separation is important because it means that we won't need to go through recertification every time we update Home Assistant. This way we can keep the Matter-related backend isolated in both a software and certification sense. This is also why we will need to continue to have the Open Home Foundation Matter Server as an add-on, and it cannot be built into [Home Assistant Core](/installation/#about-installation-methods).

## The road to certification

Becoming Matter certified was not easy. When we started certification, the process was tooled up to test and certify devices, not Matter controllers, let alone completely software-based (and open source) controllers. We chose to collaborate with [Resillion](https://www.resillion.com/services/conformance-interoperability/wireless-product-testing/matter-certification/) for our certification. They are a testing and certification house based in Belgium with a lot of experience certifying Matter products. They do the formal testing and submit the results to the CSA. Together, we collaborated to write thousands of lines of test scripts, ensuring that as many test cases as possible were automated.

<p class="img"><img src='/images/blog/2025-03-matter-certification/lab.jpg' alt="Marcel van der Veldt at the Resillion lab"/>My visit to Resillion's lab, I brought my own lab coat</p>

We really appreciate Resillion for taking on this challenge. Not only were we the first controller they certified, but we also went for all the device types in the Matter 1.3 specification. This was a huge effort for all involved, but now that these test scripts exist, they only require minor updates for each new version; we can reuse them whenever we need to recertify.

<div class="alert">
    <p>“At Resillion, we strongly support interoperability in connected home technology, and assure, secure and innovate to help make this technology work for everyone. For us, this was not only a fantastic way to contribute to the Home Assistant open-source project, but also upgrade our own Home Assistant instances with Matter, as enthusiasts of the project running active instances of HA in our own homes.</p>
    <p>“Working on a controller utilizing the full Matter 1.3 feature set presents a great opportunity to advance HA and Matter, and we look forward to supporting the developed codebase and further contributing to an open smart home.”</p>
    <em style="text-align: right; display: block;">- Jan Claes, Head of testing services - C&I Global, Resillion</em>
</div>

This is another example of something that's only possible because of the support we get from users subscribing to [Home Assistant Cloud](/cloud/). Certification would be very difficult for any other open-source project, but we have the funding first to build a great server and also to pay for the required testing. Now this open source implementation exists and can be used by any project looking to add Matter.

## The future Matters

As we continue improving our Matter implementation, the Matter standard itself is also evolving. Even with the progress it has made in the past year, there are still challenges to overcome. Matter is completely built on IPv6, and its rollout is uncovering the poor state of IPv6 support in today's network hardware. Also, as it's a complicated standard, it can be difficult to explain concepts like Thread and Fabrics to the average user, but hopefully users won't need to be experts in the future to get the most out of Matter in their homes.

Some might call Matter the smart home standard to replace all others, but we believe that there's room for multiple standards, each providing its own unique benefits. We are focused on providing the highest support for all local smart home standards ([certifying other standards is on our roadmap](/blog/2024/11/15/roadmap-2024h2/#open-protocols)) and ensuring they work far into the future, which is great for consumer choice and sustainability.

As Home Assistant grows and takes important steps like certification, the more credibility we gain in the industry---it's a virtuous circle that helps us and Open Home projects continuously improve. Thanks for your support and helping us make this possible 🙏.

**Try the Matter in Home Assistant today:**
[<img src='https://my.home-assistant.io/badges/config_flow_start.svg' style='border: 0;box-shadow: none;' alt="!Open your Home Assistant instance and show the dashboard of an add-on.">](https://my.home-assistant.io/redirect/config_flow_start?domain=matter)
