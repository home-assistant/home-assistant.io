---
title: "The Supervisor joins the party"
description: "In celebration of the 7th anniversary of Home Assistant, we’ve got some Supervisor updates to show you."
date: 2020-09-16 00:00:00
date_formatted: "September 16, 2020"
comments: true
author: Joakim Sørensen
author_twitter: ludeeus
categories: Announcements
og_image: /images/blog/2020-09-16-supervisor-joins-the-party/social.png
---

The Supervisor is responsible for managing your system so that you can manage your home. It’s the beating heart of the Home Assistant Operating System and it ensures that your system stays secure and up to date. When things do go wrong, the Supervisor is there to help you recover the system.

Earlier this year, we limited the scope of what systems we support with the Supervisor. This has given us the opportunity to invest more time and resources into stability, usability improvements and new features.

## Crash Reporting

The Supervisor can now share anonymized diagnostics and crash information with the Home Assistant developers that work on the Supervisor. This option is, of course, opt-in and disabled by default. With this enabled, you submit issues without needing to open an issue!

![diagnostics graphic](/images/blog/2020-09-16-supervisor-joins-the-party/diagnostics.png)

Since we introduced this feature, over 25,000 events have been sent, generating around 120 unique issues. We have already fixed over 80 issues! With each release, fixes have been made as a result of these reports, making the Supervisor even more stable; This really shows how powerful it is.

Big thanks to [Sentry][sentry], for powering and sponsoring this great feature.

<blockquote>
   "Accurate information is a key part of motivation." - Mary Ann Allison
</blockquote>

## Improve add-on availability with the new watchdog feature

Add-ons for Home Assistant allow you to run third-party applications easily. These applications will benefit from the same management features also used to manage your Home Assistant installation.

Add-on developers will be able to activate additional functionality for their add-on with the new “watchdog” add-on option. This enables application-level monitoring and allows the Supervisor to check if the add-on is behaving correctly using the ways specified by the developer.

Not all add-ons have this feature and an add-on can still get themselves into problems that they can’t recover from, causing the application not to work as expected and crash. For this purpose, we have introduced a new watchdog toggle for advanced users. The functionality is similar to Docker’s health checks but operates outside of the container, making it a more robust option.

![watchdog graphic](/images/blog/2020-09-16-supervisor-joins-the-party/watchdog.png)

When the watchdog is enabled for an add-on, the Supervisor will automatically restart the add-on if it stops, regardless of the reason (crash/manual stop). The watchdog does not know if you’re testing an add-on or playing around with different options, and so it might restart when you don’t need it. You should only enable the watchdog after you are finished setting the add-on up and want to make sure it’s running 24/7.

<blockquote>
   "Never stop never stopping." - Conner4Real
</blockquote>

## Network Manager

The most requested feature is here! You can now manage the network settings from the Supervisor interface. Previously you would have to fiddle with “nmcli” or go through the tedious act of importing configuration files from USB-sticks just to set a static IP address for your Home Assistant installation. With the introduction of the Supervisor’s Network Manager this can now be handled from the Supervisor panel in your Home Assistant UI. You will find this under the system tab.

![dialog graphic](/images/blog/2020-09-16-supervisor-joins-the-party/dialog.png)

This is just the start to make advanced host management more accessible and it only touches a minimal part of what we will be able to do with it. Support for Wi-Fi and Bluetooth will follow later as part of our usability improvements.

<blockquote>
   "OMG. Finally." - @cogneato
</blockquote>

## Observer Plugin

The Supervisor provides several other services using “plugins”. Plugins are microservices that add features to help run Home Assistant + add-ons and manage your system. The latest plugin added is the [Observer plugin][observer]. The observer keeps an eye on the Supervisor. It provides a diagnostics portal on port `4357`(HELP). In case you ever lose access to the Supervisor, you can go to the Observer Portal to get the Supervisor status and logs and diagnose what’s wrong (and share it with us). The benefit of having this as a web portal is that you no longer need to attach a monitor and keyboard to your device or know the Linux commands to get the information out.

This is the first version and will be extended with more information and functionality in the future.

![observer graphic](/images/blog/2020-09-16-supervisor-joins-the-party/observer.png)

<blockquote>
   "Better to have, and not need, than to need, and not have." - Franz Kafka
</blockquote>

## Improved Audio

Early this year, we built a new Audio layer with a central sound server based on [PulseAudio][pulseaudio]. With this system in place, all add-ons and Home Assistant can simultaneously use audio devices and paired Bluetooth-speakers work flawlessly.

![audio graphic](/images/blog/2020-09-16-supervisor-joins-the-party/audio.png)

We will be working on exposing more of these features via the UI in the future, such as controlling the audio volume. The command-line interface supports most of the functionality already and is accessible via the SSH & Web Terminal add-on and entering `ha audio --help`.

<p class='img'>
   <img src='/images/blog/2020-09-16-supervisor-joins-the-party/spotify.png' alt='Screenshot of Spotify connected to Home Assistant as audio output.'>
   The <a href="https://github.com/hassio-addons/addon-spotify-connect">Spotify Connect add-on</a> from Community Add-Ons allows playing Spotify via Home Assistant
</p>

## Improved mDNS

Hostnames on your network often end with `.local`, for example, `http://homeassistant.local:8123`. This is a feature called mDNS. With Home Assistant OS and Supervised systems, this hasn’t always been functioning as well as it should have. This is a side effect caused by using the Docker layers to power the systems.

Last year we introduced a new DNS backend based on [CoreDNS][coredns]. This year, we’ve extended our DNS plugin with mDNS support and are forwarding all multicast traffic from mDNS onto the Supervisor’s internal network.

This means we now have support for `.local` domains everywhere and it is transparent throughout the whole system, including Home Assistant and all add-ons.

<blockquote>
   "It’s not DNS. There’s no way it’s DNS. It was DNS. - anonymous
</blockquote>

## That’s it!

There have been a lot of updates to the Supervisor. In the end, we hope that you don’t notice any of them. Because if the Supervisor does it’s job, you’re just automating your home without worrying about maintenance of your system.

[coredns]: https://coredns.io/
[observer]: https://github.com/home-assistant/plugin-observer
[sentry]: http://sentry.io/
[pulseaudio]: https://www.freedesktop.org/wiki/Software/PulseAudio/About/
