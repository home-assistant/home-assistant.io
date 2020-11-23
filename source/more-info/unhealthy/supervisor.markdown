---
title: "Supervisor was not able to update"
description: "More information on why a failed Supervisor update mark a system as unhealthy."
---

## The issue

This can happen if there was a network issue during the startup of the Supervisor

## The solution

Manually update the Supervisor. This can be done from the "System" tab in the Supervisor panel, on the card for "Supervisor" there is a button to update the Supervisor.

This can also be done with the CLI with `ha supervisor update`.
