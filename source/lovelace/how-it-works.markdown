---
title: "How Lovelace Works"
description: "Explains how Lovelace works under the hood."
---

The old user interface relied solely on the state machine. This caused trouble as it meant that the state machine was now not only the source for device states, but also for user interface configuration. With Lovelace, we're taking a completely different approach. All user interface configuration will live in a separate file, controlled by the user.

<p class='img'>
<img
  src='/images/lovelace/lovelace-ui-comparison.png'
  alt='Diagram showing how states no longer contain UI configuration.'>
Visual comparison of old configuration versus new configuration
</p>

<!-- source: https://docs.google.com/drawings/d/1O1o7-wRlnsU1lLgfdtn3s46P5StJjSL5to5RU9SV8zs/edit?usp=sharing -->
