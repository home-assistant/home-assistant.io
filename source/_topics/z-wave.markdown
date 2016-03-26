---
layout: page
title: "Z-Wave"
description: "Extended instructions how to setup Z-Wave."
date: 2016-03-24 08:49 -0700
sidebar: false
comments: false
sharing: true
footer: true
---

![Under Construction](https://i.imgur.com/WkBB4BV.gif)

Z-Wave is a popular home automation protocol that is not always straightforward to setup. This page will try to help you make sense of it all.

- Note: Upon first run, the z-wave component will take time to initialize entities and entities may appear with incomplete names. Running a network heal may expidite this proccess.

## {% linkable_title Supported Z-Wave Sticks %}

| Device                  | Works on Linux | Works on Windows | Works on OSX | Comments  |
|-------------------------|----------------|------------------|--------------|-----------|
| Aeotec Z-Stick Series 2 | X              |                  |              |           |
| Aeotec Z-Stick Series 5 | X              |                  |              |           |


## {% linkable_title Stick Alternatives %}

The alternative to a stick is a hub that supports Z-Wave. Home Assistant supports the following hubs with Z-Wave support:

 - [Vera](/components/vera/)
