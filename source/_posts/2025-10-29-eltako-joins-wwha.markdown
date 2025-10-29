---
layout: post
title: ELTAKO joins Works with Home Assistant
description: ELTAKO’s pro-standard Matter relays join our Home Assistant program.
date: 2025-10-29 00:00:01
date_formatted: "October 29, 2025"
author: Miranda Bishop
comments: true
categories: Works-with-Home-Assistant
og_image: /images/blog/2025-10-eltako/art.webp
---

<img src='/images/blog/2025-10-eltako/art.webp' style='border: 0;box-shadow: none;' alt="ELTAKO joins Works with Home Assistant">

We’re delighted to welcome [ELTAKO](https://www.eltako.com/en/) to the [Works with Home Assistant](https://works-with.home-assistant.io/) program! ELTAKO’s robust relay switches have formed the blueprint for smart building and smart home control across Europe for decades – *and* happen to be the first Matter relays to join the program.

You may never have seen one of ELTAKO’s little blue devices before, and that’s the point. They usually sit quietly behind walls, furniture and in distribution boards, doing their jobs without interfering with interiors. Now, thanks to their joining the Works with Home Assistant program, you can bring these professional-level installations to your own smart set-up.<!--more-->

## Out of the blue and into the open home

ELTAKO has been a well-known name in the German building trade and throughout Europe for more than 75 years. In fact, the name itself derives from ‘**EL**ektrischer **TA**st-**KO**ntakt’ (electrical push-button contact) in a nod to ELTAKO’s first impulse switch innovation that started it all back in 1949.

For those of us who haven’t been around quite that long, an impulse switch (also known as a latching or step relay) toggles a circuit on or off each time it receives an electrical pulse. Instead of requiring constant power, it ‘remembers’ its state until the next signal. As well as using less energy, this means it’s possible to control a single light or system from multiple switches without complex wiring – with obvious advantages for the smart home. So synonymous is the brand with this type of device that impulse switches are still referred to as ‘ELTAKOS’ by the professional electricians and engineers who use them.

Because of this innovative spirit, it’s perhaps no surprise that over the years ELTAKO has broadened its range to a full ecosystem of sensors, dimmers, and energy meters – all based on wired or wireless technologies, such as RS485, EnOcean, Modbus or DALI, which are built for longevity and local control, rather than cloud dependency.

True to that philosophy, ELTAKO has embraced open standards such as Matter, ensuring its products speak the same languages that support our mission to keep homes open, private, and locally controlled.

<div class="alert">
<p>"As a manufacturer that has relied on open standards like Matter and EnOcean from the very beginning, joining the Works with Home Assistant program is a natural step for us. This allows us to make our products accessible to an even larger community and enables our customers to integrate them seamlessly into diverse smart home environments. We are convinced that the future lies in openness and interoperability – which is why we deliberately embrace partnerships that offer users long-term investment security and maximum flexibility."</p>
<em style="text-align: right; display: block;">- Kai Sepp, Sales Director North & West Europe at ELTAKO</em>
</div>

## Devices

ELTAKO’s [integration](/integrations/eltako/) with Home Assistant starts with items from the 64 series, which was awarded the SmartHome Germany Award this year. This is the brand’s line that uses Matter over Wi-Fi, showing just how serious they are about interoperability moving forward.

We were also lucky enough to see the ELTAKO team at ISE Barcelona this year, and we’ll be catching up with them again at the Connectivity Standards Alliance (CSA) meeting in November, also in Barca. Since CSA certification is a must for brands joining the program, it’s great to see ELTAKO so engaged.

As always, all the devices below have gone through our rigorous certification process to ensure they meet our standards for performance, reliability and open-home compatibility.

What devices have been certified?

* [ELTAKO Universal Dimming Actuator EUD64NPN-IPM](https://www.eltako.com/en/catalog/products/1761/eud64npn-ipm) (and the previous version [here](https://www.eltako.com/en/catalog/products/1238/eud62npn-ipm110-240v/))
* [ELTAKO Impulse Switch ESR64PF-IPM](https://www.eltako.com/en/catalog/products/1760/esr64pf-ipm/)  
* [ELTAKO Impulse Switch ESR64NP-IPM](https://www.eltako.com/en/catalog/products/1759/esr64np-ipm)  
* [ELTAKO Shading Actuator ESB64NP-IPM](https://www.eltako.com/en/catalog/products/1792/esb64np-ipm/)

These Matter devices that work over Wi-Fi are all about giving you freedom to control your current hardware – switch lights on and off and dim them automatically – without replacing it all. The shading actuator is particularly useful in continental Europe, where shutters are more common. It has a good energy-saving use case to reduce the need for air conditioning, since automatic shutters help keep your home cool in summer and warm in winter, potentially reducing utility bills. This also reflects ELTAKO’s wider focus on sustainability – from low-power devices to recyclable packaging and shipping materials.

In case you didn’t know, when using Matter devices with Home Assistant you have local control with no need for external internet for day-to-day operation. If you do want to access your dashboard while you’re away from home, using [Home Assistant Cloud](/cloud/) is a simple, secure, way to do this (and help fund Home Assistant’s development in the process!).

## Professional quality, support for all

Like all brands within the Works with Home Assistant program, ELTAKO isn’t just adding our little blue logo to their little blue products – they’re joining our community. That means active engagement and shared expertise to help everyone get the best from their devices. Because ELTAKO’s products are built to professional standards, installation can sometimes require a qualified electrician – especially for wired set-ups. That’s where ELTAKO’s directory of system partners and specialists in many regions, as well as a tech support hotline, can help you find the installation advice you need, whether you’re a complete novice or electrical enthusiast.

With ELTAKO on board, we hope Home Assistant users will have further flexibility to explore new devices and experiment with different set-ups, as well as open up more ways to mix and match products to build a professional-standard smart home.

## FAQs

**Q: If I have a device that is not listed under ‘Works with Home Assistant’ does this mean it’s not supported?**

A: No! It just means that it hasn’t gone through a testing schedule with our team or doesn’t fit the requirements of the program. It might function perfectly well but be added to the testing schedule later down the road, or it might work under a different connectivity type that we don’t currently test under the program.

**Q: OK, so what’s the point of the Works with program?**

A: It highlights the devices we know work well with Home Assistant and the brands that make a long-term commitment to keeping support for these devices going. The certification agreement specifies that the devices must have key functionality within Home Assistant, operate locally without the need for cloud, and will continue to do so long-term.

**Q: How were these devices tested?**

A: All devices in this list were tested using a standard HA Green Hub and with our [certified Matter Integration](/integrations/matter/). If you have another set-up that’s not a problem, but we test against these as they are the most effective way for our team to certify within our ecosystem.

**Q: Will you be adding more ELTAKO devices to the program?**

A: Why not! We’re thrilled to foster a close relationship with the team at ELTAKO to work together on any upcoming releases, or add in further products that are not yet listed here. We’re really excited about what ELTAKO are doing with EnOcean and green power generally, but we haven’t tested or certified any of these products yet. We don’t have this protocol as part of the Works with Home Assistant certification (even if people are already using [EnOcean in Home Assistant](/integrations/enocean/)), and could explore how we certify these kinds of products.
