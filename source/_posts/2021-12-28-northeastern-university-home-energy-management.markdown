---
title: "Energy management research using Home Assistant"
description: "Learn how Prof. Kane from Northeastern University is conducting research using Home Assistant."
date: 2021-12-28 00:01:00
date_formatted: "December 28, 2021"
author: Paulus Schoutsen
author_twitter: balloob
categories: Video
og_image: /images/blog/2021-12-northeastern-university/overview.png
---

Two weeks ago we hosted the [State of the Open Home](/state-of-the-open-home/). It included a presentation by [Prof. Michael Kane](https://coe.northeastern.edu/people/kane-michael/) and [Maharsi Pathak](https://www.linkedin.com/in/maharshi-pathak-) from the department of Civil and Environmental Engineering at [Northeastern University](https://www.northeastern.edu/).

They presented about their research into lowering grid demand by reducing thermostat temperatures. They want to learn when and why a reduced temperature is too uncomfortable causing tenants to become thermally frustrated and reverting the reduction.

<lite-youtube videoid="6ZMXE5PXPqU" videotitle="State of the Open Home 2021" videoStartAt="8042" posterquality="maxresdefault"></lite-youtube>

With Home Assistant we want every home to be about [privacy, choice and sustainability](/blog/2021/12/23/the-open-home/) and it's how we built Home Assistant. Because we believe in choice, all data in Home Assistant is accessible and one can extend or built on top of our platform.

This architecture made it possible for Prof. Kane to create a custom version of Home Assistant for his research that gathers data about all devices, surveys users based on changes to devices and exports all this data back to their research lab. For this they leverage device integrations, added a custom survey feature to the UI and push notifications from the Home Assistant companion app to draw the user's attention to the surveys.

But what makes me extra happy is that their research is focusing on home energy management. This has been a feature we added to Home Assistant in 2020 as [our way to help tackle the climate crisis](/blog/2021/08/04/home-energy-management/). It makes me proud to see that we are able to help researchers do their work and we hope to see more of this. We're also looking forward to collaborating with Prof. Kane on using his research to improve Home Assistant.

![Overview of their deployment](/images/blog/2021-12-northeastern-university/overview.png)
