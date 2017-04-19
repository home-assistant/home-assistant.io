---
layout: page
title: "Z-Wave USB Controllers"
description: "Extended instructions how to setup Z-Wave."
date: 2016-03-24 08:49 -0700
sidebar: true
comments: false
sharing: true
footer: true
---

Z-Wave is a popular home automation protocol that is not always straightforward to setup. This page will try to help you make sense of it all.

<p class='note'>
Upon first run, the z-wave component will take time to initialize entities and entities may appear with incomplete names. Running a network heal may expidite this proccess.
</p>

## {% linkable_title Supported Z-Wave Sticks %}

| Device                  | Works on Linux | Works on Windows | Works on OSX |
|-------------------------|----------------|------------------|--------------|
| Aeotec Z-Stick Series 2 |   &#10003;     |                  |              |
| Aeotec Z-Stick Series 5 |   &#10003;     |                  |              |
| Razberry GPIO Module    |   &#10003;     |                  |              |


## {% linkable_title Stick Alternatives %}

The alternative to a stick is a hub that supports Z-Wave. Home Assistant supports the following hubs with Z-Wave support:

 - [Vera](/components/vera/)
