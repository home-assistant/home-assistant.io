---
layout: post
title: "Konnected joins Works with Home Assistant"
description: "Konnected brings smart garage door openers and alarm panels to the program."
date: 2025-10-07 00:00:01
date_formatted: "October 7, 2025"
author: Miranda Bishop
comments: true
categories: Works-with-Home-Assistant
og_image: /images/blog/2025-10-konnected/art.webp
---

<img src='/images/blog/2025-10-konnected/art.webp' style='border: 0;box-shadow: none;' alt="Konnected joins Works with Home Assistant">

[Works with Home Assistant](https://works-with.home-assistant.io/) is *opening its doors* to another new partner who is bringing the first Garage Door Openers and Alarm Panel to the program, all of which are using [ESPHome](https://esphome.io/) under the hood. [Konnected](https://konnected.io/) are well known for their devices that let you retrofit new smarts into the devices you already have,  allowing you to use them in Home Assistant and keep them working longer. <!--more-->

## Getting Konnected

Konnected have been well-known in the Home Assistant community, as they’ve been active members for years. As members of the community, they know how hard it can be to connect the devices that are already built into your home, whether they’re smart or not. That’s why Konnected’s first product was their drop-in replacement alarm panel boards, which allow you to take decades-old wired alarm systems and add them into Home Assistant.

Another challenge the community was facing was garage door openers (GDOs), especially cloud-based openers. In the early days of Home Assistant, the community figured out the APIs for these providers and controlled them that way. Some manufacturers noticed this and [put barriers up](/blog/2023/11/06/removal-of-myq-integration/) blocking people from controlling the devices they own, claiming it as “unauthorized usage” 🙄.

The community was naturally incensed, and did what tinkerers tend to do when a cloud gets in their way — they began tinkering with hardware. A community emerged to take back control of these devices, starting with projects like ratgdo, which Konnected used as a base for their work. Today, because of these projects, there are multiple great open source tools to control a large number of these GDOs, ranging from DIY schematics to finished controllers. Konnected has an open source solution which works locally, as well as having the form factor and safety standards to match. Even better, Konnected devices are available in over 60 countries.

For anyone who has used Konnected for quite some time, you’ll notice that they had their own integration, which has [now been deprecated](/integrations/konnected/) in favor of the ESPHome firmware, so that it’s always straightforward to find (or build) the firmware you need. They even [publish all their code on GitHub](https://github.com/konnected-io) 👏, which allows the community to help them fix issues and add features.

<div class="alert">
<p>"We've been users of Home Assistant ourselves since 2018 and thrilled to finally be officially part of the Works with Home Assistant program. Konnected shares many of the same founding principles as Home Assistant, including our commitment to 100% local control, open-source firmware, and high-quality hardware that makes your home smarter, safer and accessible to everyone."</p>
<em style="text-align: right; display: block;">- Nate Clark, Founder / CEO at Konnected</em>
</div>

Konnected is another example of [ESPHome](/integrations/esphome/) (a project from the Open Home Foundation) fostering an entirely new ecosystem of Open Home projects. It works fully locally, and it’s perfect for tinkerers, allowing you to build DIY smart home devices yourself (get started with one of our [ready-made projects](https://esphome.io/projects/)). Konnected also have a thriving [community](http://community.konnected.io) of their own if you have questions or comments.

Creators can also use it to make pre-built, plug-and-play products that give users a really seamless experience. Devices are easily discovered and added to your Wi-Fi network and Home Assistant, along with a one-click update within Home Assistant. To learn more about how Konnected uses ESPHome, look out for Nate on the next [ESPHome live stream](https://www.youtube.com/watch?v=9YfRkqCdD4c) on October 14!

Remember, the development of projects like ESPHome from the [Open Home Foundation](https://www.openhomefoundation.org/) is supported by [Home Assistant Cloud](/cloud/) subscribers and anyone who purchases Home Assistant hardware. While all of Konnected’s devices work locally, if you’re interested in remote access, allowing you to keep tabs on your home’s security when you’re out and about, check out [Home Assistant Cloud](/cloud/).

## Devices

<p class="img">
    <img src="/images/blog/2025-10-konnected/garage-door-opener.webp" alt="Konnected Smart Garage Door Opener blaQ">
    The Konnected Smart Garage Door Opener blaQ
</p>

For anyone new to the Works With Home Assistant program, it’s a way for us to formally certify devices that have been tested by our team, and help you know what works great out of the box with Home Assistant. Any company joining also commits to providing long-term support and firmware updates. Works With Home Assistant is operated by the [Open Home Foundation](https://www.openhomefoundation.org/), and the support of [Home Assistant Cloud](/cloud/) subscribers funds this work. These items were all tested by members of the ESPHome team to see exactly how they function in their own homes.

The Konnected certified devices are listed below:

* [Konnected Smart Garage Door Opener blaQ](https://konnected.io/products/smart-garage-door-opener-blaq-myq-alternative)  
* [Konnected Smart Garage Door Opener White (v2)](https://konnected.io/products/smart-garage-door-opener)  
* [Konnected Alarm Panel Pro](https://konnected.io/collections/smart-alarm-panels)

## Let’s Konnect

A nice benefit of retrofitting your old wired security system is not needing to maintain loads of battery-powered sensors 🪫. The Alarm Panel Pro has the ability to connect 12 zones (security speak for individual or joined up sensors), it also allows you to connect keypads and sirens, and includes 12V power for the devices that need that.  It’s highly customizable, and there’s also plenty of support available if you need [help with installation](https://support.konnected.io/).  You can power it using 12V or Power-over-Ethernet, or both! The Alarm Panel Pro is designed to be always-on, and they’ve designed it to consume very little power. This also allows it to easily run for hours on their [backup battery](https://konnected.io/products/backup-battery).

You’ll also probably be wondering why there are two different variants of the garage door openers, and that’s because each supports a different set of manufacturers. There is a [wizard](https://konnected.io/collections/shop-now) to help you figure out which variant will work with your opener. Between the Konnected GDO blaQ and White, you get support for some of the biggest manufacturers out there, including Chamberlain, LiftMaster, Craftsman, Merlin, Genie, Stanley, and more.

Even with the Konnected controlling your garage door opener, you’re still able to use the included remote or the original manufacturer’s app (if you like that kind of torture). The GDO White features a built-in optical laser sensor that detects whether your garage door is open or closed. The GDO blaQ offers control over the opener’s light and lock, and can even partially open the door (for openers that support these features).

As we mentioned at the top, it’s great to have more products added to the program that help people get the most out of the things they already own. A big part of the Open Home Foundation’s mission is sustainability in the smart home, and Konnected are helping our community get longer lasting use of their existing security and garage door systems.

## FAQs

**Q: If I have a device that is not listed under ‘Works with Home Assistant does this mean it’s not supported?**

A: No! It just means that it hasn’t gone through a testing schedule with our team or doesn’t fit the requirements of the program. It might function perfectly well, but has not yet been added to the testing schedule, or it might work under a different connectivity type that we don’t currently test under the program.

**Q: Ok, so what’s the point of the Works with program?**

A: It highlights the devices we know work well with Home Assistant and the brands that make a long-term commitment to keeping support for these devices going. The certification agreement specifies that the devices must have full functionality within Home Assistant, operate locally without the need for cloud and will continue to do so long-term.

**Q: How were these devices tested?**

A: All devices in this list were tested using a standard Home Assistant Green Hub with the ESPHome integration.  If you have another set-up that’s not a problem, but we test against these as they are the most effective way for our team to certify within our ecosystem.

**Q: Will you be adding more Konnected devices to the program?**

A: Why not! Konnected are also looking to do some exciting things with Matter soon, so we’re excited to work together on any upcoming releases or add in further products that are not yet listed here.
