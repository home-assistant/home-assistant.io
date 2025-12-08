---
layout: post
title: "Shelly joins Works with Home Assistant"
description: "With a great selection of switches and relays built for Z-Wave."
date: 2025-07-29 00:00:01
date_formatted: "July 29, 2025"
author: Miranda Bishop
comments: true
categories: Works-with-Home-Assistant
og_image: /images/blog/2025-07-shelly/art.jpg
---

<img src='/images/blog/2025-07-shelly/art.jpg' style='border: 0;box-shadow: none;' alt="Shelly joins Works with Home Assistant">

We’re excited to welcome [Shelly](https://www.shelly.com/) to the [Works with Home Assistant](https://works-with.home-assistant.io/) program! Shelly is very well-established in both our ecosystem and the smart home world, so it’s great to formally certify a selection of their Z-Wave devices.

Their retrofit smart switches and relays are amazing for turning all sorts of _dumb_ devices, like light fixtures or ceiling fans, into devices you can easily control in _smart_ new ways. Also, being Works with certified means they have been thoroughly tested, ensuring they give the best possible experience with Home Assistant.

The variety of complex settings and functionality, like energy monitoring, makes them popular with our community doing advanced smart retrofits, like connecting an old garage door or motorized shutters. These are perfect for keeping non-smart devices out of the landfill and working for years to come.
<!--more-->

## From A to Z-Wave

Shelly, originally launched in Bulgaria in 2017, has been a mainstay in our community for some years. They became known initially for their WiFi smart switches and relays that could be easily used locally, but now offer a wide range of smart devices and ways to connect them. For this first round of Works with Home Assistant certified products, the focus is firmly on the [Z-Wave](/integrations/zwave_js/) lines.

 If you’re not familiar with Z-Wave, it’s a well-established low-powered wireless technology designed with the smart home in mind. It uses an entirely different bit of radio spectrum than WiFi, meaning it has less chance of experiencing interference. This spectrum makes it better at getting through thick walls and communicating over longer distances — with the recent [Long Range](https://z-wavealliance.org/what-is-z-wave-long-range-how-does-it-differ-from-z-wave/) iteration of the standard, they can [communicate even further](/blog/2024/05/08/zwave-is-not-dead/#range-testing-our-z-wave-stick-prototype).

Given our focus on local control, items that work on Z-Wave are ideal if you want to avoid the cloud. Home Assistant will act as your Z-Wave controller using the [Z-Wave JS add-on](https://github.com/hassio-addons/addon-zwave-js-ui) (another awesome Open Home Foundation project). So, all you need is a Z-Wave adapter to use alongside these devices. _If you haven’t purchased one yet, you might want to wait before hitting that buy button_ 😉.

Shelly shares our focus on interoperability, with items using a variety of protocols, while being available worldwide. These items are also super helpful for the energy-conscious. They have low power consumption, power metering, and can easily blend in with your current home decor, as they sit in the wall behind your existing switches.

<p class='img'><img src='/images/blog/2025-07-shelly/pm-mini.webp' style='border: 0;box-shadow: none;' alt="Shelly Wave PM Mini in hand showing small size">Mini? This thing is microscopic!</p>

## Getting Involved

We’ve been lucky enough to meet the Shelly team on several occasions, and they were kind enough to showcase [how the Las Vegas Mob Museum uses Shelly and Home Assistant](https://www.youtube.com/live/o4Vctz1_KYE?t=6897s) during our annual ‘State of the Open Home’ event. In May, they went one step further and hosted one of our [Community Days](/blog/2025/06/24/community-day-2025-wrap-up/) in South Florida. It’s really exciting to see that partners who join the ‘Works with’ program don’t just see it as a badge to stick on a box, but a real chance to engage with, and contribute to, this amazing community.

<div class="alert">
    <p>"Many of our users already rely on Home Assistant to power their smart homes, and we’ve seen firsthand how important local control, privacy, and flexibility are to them. By joining the <i>Works with Home Assistant</i> program, we’re reinforcing our commitment to open, reliable smart home solutions. With the upcoming launch of our <strong>Shelly Wave Long Range</strong> devices—offering wireless coverage of up to <strong>1 kilometer</strong> — we’re pushing the boundaries of what smart home technology can do. Combined with Home Assistant’s powerful platform, this will be a <strong>market-leading solution</strong>, capable of covering <strong>use cases no other ecosystem today can reach</strong>. Together, we’re building the future of smart homes: open, powerful, and ready for real-world demands."</p>
<em style="text-align: right; display: block;">- Leon Kralj, CTO at Shelly</em>
</div>


## Devices

In case you didn’t know, Works with Home Assistant differs from other certification programs as products are rigorously tested in-house to ensure they work seamlessly out of the box. Any company joining also commits to providing long-term support and firmware updates while being a positive force in the Home Assistant community. Works with Home Assistant is operated by the [Open Home Foundation](https://www.openhomefoundation.org/), and the support of [Home Assistant Cloud](/cloud/) subscribers funds this work.

**What devices have been certified?**

- [Shelly Wave PM Mini](https://www.shelly.com/products/shelly-qubino-wave-pm-mini)

- [Shelly Wave i4](https://www.shelly.com/products/shelly-qubino-wave-i4)

- [Shelly Wave 1PM Mini](https://www.shelly.com/products/shelly-qubino-wave-1pm-mini)

- [Shelly Wave 2PM](https://www.shelly.com/products/shelly-qubino-wave-2pm)

- [Shelly Wave Pro 1PM](https://www.shelly.com/products/shelly-wave-pro-1-pm)

Whilst the Shelly Wave Pro 1PM sits in an electrical box, the remaining devices sit behind a standard plug, switch or device. This means they are a super cost-effective way to retrofit devices, which in turn reduces e-waste. The Minis are very small (duh), and so should fit in most tight places around the home, even with low-profile installations. The Shelly Wave 1PM Mini is the world’s smallest Z-Wave smart switch. In some areas of the world, you may need professional installation by a qualified electrician, so be sure to check your region's regulations. If you’re a confident DIYer, Shelly has a lot of [helpful guides](https://kb.shelly.cloud/knowledge-base/installation-guides) on their site to walk you through installing it yourself.

## The first of many waves

These devices are the first from Shelly to join the program, but certainly won’t be the last, as we look forward to many exciting developments with Z-Wave Long Range. Keep your eyes peeled for our upcoming hardware announcement that will work perfectly with our Z-Wave partners.

Thanks again for your support (by subscribing to [Home Assistant Cloud](/cloud/) and [buying official hardware](https://www.nabucasa.com/#:~:text=the%20first%20boot.-,Official%20Home%20Assistant%20hardware,-Get%20the%20best)), which allows the Open Home Foundation to build these partnerships and certify new devices to join Works with Home Assistant.

### FAQs

**Q: If I have a device that is not listed under ‘Works with Home Assistant does this mean it’s not supported?**

A: No! It just means that it hasn’t gone through a testing schedule with our team yet or doesn’t fit the requirements of the program. It might function well but be added to the testing schedule later down the road, or it might work under a different connectivity type that we don’t currently test under the program. It may also have a feature missing in Home Assistant that we’re working to add.

**Q: Ok, so what’s the point of the Works with program?**

A: It highlights the devices we know work well with Home Assistant and the brands that make a long-term commitment to keeping support for these devices going. The certification agreement specifies that the devices must work well within Home Assistant, operate locally without the need for cloud and will continue to do so long-term.

**Q: How were these devices tested?**

A: All devices in this list were tested using a standard HA Green Hub, a Z-Wave adapter and with our [Z Wave integration](/integrations/zwave_js/). If you have another hub / adapter / integration that’s not a problem but we test against these as they are the most effective way for our team to certify within our ecosystem.

**Q: Will you be adding more Shelly devices to the program?**

A: Absolutely. Shelly has a huge number of product lines and will be expanding their Z-Wave Long Range list. We’re sure they’ll keep our testers busy with a steady stream of devices to add.
