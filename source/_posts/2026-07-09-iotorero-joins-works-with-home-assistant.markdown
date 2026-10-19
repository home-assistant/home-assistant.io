---
layout: post
title: "IoTorero joins Works with Home Assistant"
description: "The first pre-flashed ESPHome smart plugs and relays to join Works with Home Assistant are here. Meet: IoTorero!"
date: 2026-07-09 00:00:01
date_formatted: "July 9, 2026"
author: Miranda Bishop
comments: true
categories: Works-with-Home-Assistant
og_image: /images/blog/2026-07-iotorero/art.webp
---

<img src="/images/blog/2026-07-iotorero/art.webp" alt="IoTorero joins Works with Home Assistant" style="border: 0;box-shadow: none;">

The Works with Home Assistant program powers up this month as we welcome our new partner, <a href="https://www.athom.tech/" target="_blank" rel="noopener noreferrer">IoTorero</a>! 🎉 Experts in pre-flashed smart home hardware, IoTorero bring the very first ESPHome-ready smart plugs and relays to the program (and that’s not all).<!--more-->

## IoTorero enters the ring

If you’ve spent any time browsing pre-flashed smart home tech online, there’s a good chance you’ve come across IoTorero. And if you haven’t, let us introduce you! Founded in 2020, the company (formerly Athom Technology) was tinkering with <a href="https://esphome.io/" target="_blank" rel="noopener noreferrer">ESPHome</a> right out of the gate. Their new name is a nod to the Internet of Things (IoT), but unlike standard IoT gadgets that stop working if your internet drops or a company closes its servers, IoTorero champion open source firmware.

Other smart devices run manufacturer-written software, which is tuned to work well with Home Assistant for certification to the program. IoTorero go a step further to make sure their tech is accessible for all: all seven of their certified devices are pre-flashed with ESPHome, meaning there’s no installation required – the devices will integrate into your Home Assistant setup straight out of the box. And because their devices are genuinely open, you can always tweak and customize them if you want to.

<div class="alert">
<p>“Since inception in 2020, IoTorero (Athom Technology) has been dedicated to the research, development, and manufacturing of open source smart home hardware products. We provide Home Assistant users with high-quality devices pre-flashed with ESPHome firmware. By joining the Works with Home Assistant program, we ensure that customers can select and purchase our products with complete confidence.”</p>
<em style="text-align: right; display: block;">- Aiden Tang, CTO and Co-Founder, IoTorero</em>
</div>

That same spirit of openness carried over to last year’s Community Day, where IoTorero donated a stack of samples for attendees to try – a gesture we loved to see, and one that speaks to how seriously they take supporting our community 💪. It shows up in their approach to code, too: IoTorero maintain a public <a href="https://github.com/athom-tech/esp32-configs" target="_blank" rel="noopener noreferrer">GitHub repository</a> of configs for all their devices, free for anyone to learn from or build on.

Speaking of community, the development of projects like ESPHome from the <a href="https://www.openhomefoundation.org/" target="_blank" rel="noopener noreferrer">Open Home Foundation</a> is supported by Home Assistant Cloud subscribers and anyone who purchases Home Assistant hardware. While all of IoTorero’s devices work locally, if you’re interested in remote access – for example to check your energy use or open the garage door from a distance – check out [Home Assistant Cloud](/cloud/).

## Right on (Io)Time

For anyone new to it, ESPHome is a powerful platform that allows smart home devices to operate completely locally via the chip inside, with no cloud required. Because IoTorero’s devices arrive pre-flashed, you get all that local power without having to learn how to build or compile firmware yourself. And it *just* got a major upgrade. The ESPHome team recently released a <a href="https://esphome.io/blog/2026/07/02/unbox-your-creativity-with-esphome-2026-6-0/" target="_blank" rel="noopener noreferrer">new UI and Device Builder</a>, swapping the old code editor-inspired dashboard for a visual workspace that can suggest components and layouts as you build.

Since IoTorero’s devices arrive pre-flashed, there’s nothing to set up in advance: just connect them, and they’ll show up in Home Assistant like any other device, ready to control and automate from your normal dashboard. The ESPHome Device Builder is there if you ever want to go further: it allows you to do things like renaming a device or tweaking its config, without needing to touch any code… unless you want to. Whether you’re new to the arena or a seasoned pro, it means a lot less guesswork (and a lot more fun!).

## Devices

Every device that earns Works with Home Assistant certification goes through our in-house testing process, checked against our core requirements of local control, privacy, and long-term support – and IoTorero meets that bar across the board. Their devices also carry the <a href="https://devices.esphome.io/made-for-esphome/" target="_blank" rel="noopener noreferrer">Made for ESPHome</a> certification, a separate badging program and prerequisite for any ESPHome devices joining Works with Home Assistant.

Here’s the full list of IoTorero’s certified devices:

{% include integrations/device_list.html brand="iotorero" %}

Sustainability is one of the Open Home Foundation’s core principles, and IoTorero’s ESP32-C3 plugs are a great example of what that looks like in practice. They turn an ordinary appliance into something smart and measurable, with all four regional variants monitoring voltage, current, power, and total consumption – making it easy to spot energy waste and cut your home’s carbon footprint, as well as your bill.

The Power Monitoring Mini Relay brings that same convenience to hardwired setups. At roughly the size of a matchbox, it’s small enough to tuck behind a wall switch or inside a cabinet, and it’s built for switch control, garage and appliance automation, and other local smart home workflows a standard plug can’t reach.

## Proxy points

Another nifty feature across IoTorero’s devices is that they double as Bluetooth proxies. This means they pick up signals from nearby Bluetooth low-energy (BLE) devices and pass them on to Home Assistant, extending your Bluetooth range without having to buy an extra, dedicated device. The Open Home Foundation’s recent blog post, <a href="https://www.openhomefoundation.org/blog/proxy-all-the-things-no-device-left-behind/" target="_blank" rel="noopener noreferrer">Proxy all the things: no device left behind</a>, explains why this is so important: turning everyday hardware into a “bridge” for other devices means getting more out of what you already own, instead of buying something new for every job. And one less gadget to buy means one less device ending up as e-waste ♻️.

## Old friends, new badge

As one of ESPHome’s earliest adopters, IoTorero have well and truly earned our formal badging, and we’re thrilled to bring their devices to the Home Assistant community – tested, certified, and ready to make the path from unboxing to automating that much smoother. Check out the full lineup of IoTorero’s devices, along with the full range of Works with Home Assistant-compatible tech over at our <a href="https://works-with.home-assistant.io/certified-products/" target="_blank" rel="noopener noreferrer">certified device list</a>.

## FAQs

Q: If I have a device that is not listed under Works with Home Assistant does this mean it’s not supported?

A: No! It just means that it hasn’t gone through a testing schedule with our team or doesn’t fit the requirements of the program. It might function perfectly well but be added to the testing schedule later down the road, or it might work under a different connectivity type that we don’t currently test under the program. We do not certify anything that relies on cloud control.

Q: OK, so what’s the point of the Works with program?

A: It highlights the devices we know work well with Home Assistant and the brands that make a long-term commitment to keeping support for these devices going. The certification agreement specifies that the devices must have the functionality you would expect within Home Assistant, operate locally without the need for cloud and that they will continue to do so long-term.

Q: How were these devices tested?

A: All devices in this list were tested using a standard [Home Assistant Green](/green/) as a hub and using the [ESPHome integration](/integrations/esphome/). If you have a different set-up that’s not a problem, but we test against these as they are the most effective way for our team to certify within our ecosystem.

Q: Will you be adding more IoTorero devices to the program?

A: Why not! We’re thrilled to foster a close relationship with the team at IoTorero to work together on any upcoming releases or add in further products that are not yet listed here.
