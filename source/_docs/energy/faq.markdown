---
title: "Frequently Asked Questions about home energy management"
description: "Home Energy Management is a vast topic and not everything might be clear. This page tries to clarify a couple of things."
---

## Energy vs Power

Seldomly these two terms are used to refer to energy, but they are very different physical concepts. Energy is a quantitative measurement of what it takes to produce work (e.g. heat water) while Power measures the speed at which energy is transferred.

Electrical Power is usually measured in Watts (W) and Electrical Energy is usually measured in Watt-Hour (Wh) (not to be confused with Watt/Hour).

This difference is very important in HEM as you need to use the proper entities and/or convert between the two. Please note that Energy (Watt-Hour) is not an average of the Power you are consuming over a given period of time, but the sum of the power function, this comes from the fact that Power is the derivative of Energy over time.

Think of this in a parallel to speed and distance: Power is the speed you are going and Energy is the distance driven.

### From Power to Energy

Utility Providers usually bill their customers on the Energy consumed, therefore you will most certainly require an Energy Sensor. Power sensors are more common (usually because they are cheaper). From the Power sensor you can still create an Energy sensor thanks to [the Integration integration](/integrations/integration/). This creates a sensor which performs the numerical integration of samples provided by the Power sensor to get the amount of energy transferred.
