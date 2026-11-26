---
title: "How Home Assistant runs"
description: "Home Assistant runs all the time on its own system in your home. Learn why, what the requirements are, which systems you can use, and how to install Home Assistant on them."
---

Home Assistant runs on its own system in your home, day and night. It connects to your devices, runs your automations, and keeps the history of your sensors. You use it from your other devices. For example, you can use your phone, a tablet on the wall, or your laptop. You open it in a browser or in the [Home Assistant Companion app](https://companion.home-assistant.io/).

Home Assistant runs locally, so automations and devices that use local protocols can keep working when the internet is down. Devices that rely on a vendor's cloud still need an internet connection. Your data stays in your home. To use Home Assistant when you're away from home, set up [remote access](/docs/configuration/remote/).

## A system that stays on all the time

Home Assistant controls your home around the clock. For example, it turns on the porch light at sunset, or sends you a notification when a leak sensor detects water. If the system that runs Home Assistant is turned off or goes to sleep, none of this happens. The Companion app on your phone can't take over, because it only shows and controls what Home Assistant does.

That's why the system that runs Home Assistant stays on all the time. A small, quiet device works well for this. For example, you can use [Home Assistant Green](/green/) or a Raspberry Pi.

## No screen needed

The system that runs Home Assistant doesn't need a monitor, keyboard, or mouse. You connect it to power and to your home network. Then you open Home Assistant in a browser on another device on the same network.

Connect the system to your router with an Ethernet cable if you can. Ethernet is more reliable than Wi-Fi. The installation guides use an Ethernet connection to set up the system.

## A system just for Home Assistant

The recommended way to run Home Assistant is the {% term "Home Assistant Operating System" %}. It's a complete operating system. Besides Home Assistant itself, it provides tools for updates, backups, and {% term apps %}. When you install it directly on a device, everything on that device's drive is erased; in a virtual machine, only the virtual machine's disk is affected.

You can run Home Assistant OS in one of the following ways:

- On a device that only runs Home Assistant.
  - For example, Home Assistant Green, a Raspberry Pi, or a mini PC that you no longer use for anything else.
- In a virtual machine on a computer that you also use for other things.
  - Home Assistant OS then only uses the virtual machine, not the entire computer. The computer must still stay on all the time.

Home Assistant isn't an app that you install on Windows or macOS like other software. To use your Windows or Mac computer, you run Home Assistant OS in a virtual machine on it.

There is also {% term "Home Assistant Container" %}, which runs next to other software on your own Linux system. It doesn't support apps. For the differences, refer to [About installation types](/installation/#about-installation-types).

## Systems you can run Home Assistant on

The quickest way to start is Home Assistant Green, which comes with Home Assistant already installed. You can also use hardware that you already have.

You can run Home Assistant on the following systems. Each link leads to the installation guide.

- [Home Assistant Green](/green/).
- [Home Assistant Yellow](/installation/yellow/).
- A [Raspberry Pi](/installation/raspberrypi/) 4 or 5 with at least 2&nbsp;GB of RAM, and an SD card of at least 32&nbsp;GB.
- An [ODROID](/installation/odroid/) board, like the ODROID-N2+ or the ODROID-M1.
- A [mini PC or other computer](/installation/generic-x86-64/) with a 64-bit Intel or AMD processor that can start in UEFI mode.
  - Most computers made in the last 10 years can do this. The installation guide shows how to turn on UEFI mode.
- A virtual machine with at least 2&nbsp;GB of RAM and 2 virtual processors.
  - For most homes, 4&nbsp;GB of RAM and 4 virtual processors work better.
  - You create the virtual machine with virtualization software. For example, you can use VirtualBox, KVM, Proxmox, VMware, or Hyper-V. For the steps, refer to [Linux](/installation/linux/), [macOS](/installation/macos/), [Windows](/installation/windows/), or [Other systems](/installation/alternative/).
- Home Assistant Container, on your own [Linux](/installation/linux/) system with Docker.

## Ways to install Home Assistant

How you install Home Assistant depends on the system. For most systems, you use the Home Assistant OS image. An image is a single file that contains the complete operating system.

- Home Assistant Green comes with Home Assistant already installed. You connect power and your network.
- For a Raspberry Pi, an ODROID, or a mini PC, you write the Home Assistant OS image to its drive. For example, you can use Raspberry Pi Imager. The installation guide of your system has the steps.
- For a virtual machine, you download the Home Assistant OS image for your virtualization software, and create a virtual machine with it.

When the installation is finished, open `homeassistant.local` in a browser on a device on the same network for Home Assistant OS. For Home Assistant Container, open `http://YOUR_HOST:8123`, where `YOUR_HOST` is the host name or IP address of the computer running the container. Then, [create your account and set up Home Assistant](/getting-started/onboarding/).
