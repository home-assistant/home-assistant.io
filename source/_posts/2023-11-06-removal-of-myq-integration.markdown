---
layout: post
title: "Removal of MyQ integration"
description: "Why the MyQ integration will be removed in Home Assistant 2023.12"
date: 2023-11-06 00:00:00
date_formatted: "November 6, 2023"
author: Paulus Schoutsen
comments: true
categories: Public-Service-Announcement
---

**TL;DR:** The MyQ integration will be removed from Home Assistant in release 2023.12 on December 6, 2023. Chamberlain Group, the owners of MyQ, have released a public statement saying they will continue blocking access to third-party apps, like the MyQ integration. For current MyQ users we recommend [ratgdo], a device that physically connects to your MyQ garage door opener and allows you to control it locally.

If you own a garage door opener from Chamberlain or Liftmaster, you are probably familiar with MyQ. It’s a cloud-based smart home brand owned by Chamberlain Group, best known for its smart garage devices. MyQ is also currently one of the most problematic integrations for Home Assistant users. The MyQ garage door opener integration has, for the past months, been in a state of [constant repair](https://community.home-assistant.io/t/the-current-state-of-myq-from-the-codeowner/630623) as the integration breaks, is fixed, and then breaks again. This is a direct result of actions taken by MyQ to block access from third parties.

<!--more-->
Last month, Chamberlain Group put out a [statement](https://chamberlaingroup.com/press/a-message-about-our-decision-to-prevent-unauthorized-usage-of-myq) by their CTO, Dan Phillips, on this matter:

> Chamberlain Group recently made the decision to prevent unauthorized usage of our myQ ecosystem through third-party apps. This decision was made so that we can continue to provide the best possible experience for our 10 million+ users, as well as our authorized partners who put their trust in us. We understand that this impacts a small percentage of users, but ultimately this will improve the performance and reliability of myQ, benefiting all of our users.

This _‘unauthorized usage’_ appears to refer to the MyQ integration for Home Assistant which was added to Home Assistant in February, 2017. We have reached out to Chamberlain Group in several ways to see if we can come to an understanding, but we have not received an official response. We can only assume that this means Chamberlain Group has made its decision and will force customers to use only the MyQ app or those of their authorized partners.

You may wonder if Home Assistant could become an authorized partner. In their partner program, the partner companies pay Chamberlain Group for the privilege of letting MyQ owners control their own garage doors. We are open to working together with Chamberlain Group, but as Home Assistant is an open-source project, we cannot pay a partnership fee. Not only is this financially not viable, it also goes against our values. MyQ users should be able to access the devices they paid for and the data they own in any way they want, without a third party having to pay an additional fee.

So, to quote the maintainer of the MyQ integration, [Lash-L](https://github.com/Lash-L):

> We are playing a game of cat and mouse with MyQ and right now it looks like the cat is winning.

Once a company decides to be hostile to its customers, the only way we can win is by not playing their game at all. Do not buy products or services from companies that treat their customers this way. Tell your friends not to deal with companies that treat their customers this way. Buy products that work locally and won’t stop functioning when management wants an additional revenue stream.

Because we cannot continue to work around Chamberlain Group if they keep blocking access to third parties, the MyQ integration will be removed from Home Assistant in the upcoming 2023.12 release on December 6, 2023. We are very disappointed that it has come to this and sincerely hope that Chamberlain Group is willing to reconsider its position. We would happily welcome this integration back if Chamberlain Group would work with us for the good of their customers.

For now, if you are a MyQ owner, we’re afraid you are in the ‘small percentage of users’ Chamberlain Group refuses to serve. We recommend buying [ratgdo].

Ratgdo is a fully local, ESPHome-based, solution that is compatible with MyQ’s security+ protocol and can be installed on an existing MyQ system by connecting three wires. It offers the same garage door controls that MyQ does and even adds features that MyQ does not have, like motion events, controlling the light, and locking out wired remotes.

[ratgdo]: https://paulwieland.github.io/ratgdo/
