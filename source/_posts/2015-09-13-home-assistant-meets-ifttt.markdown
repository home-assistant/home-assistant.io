---
layout: post
title: "Home Assistant meets IFTTT"
description: "Announcing new integration with IFTTT and some samples to get started."
date: 2015-09-13 09:28:00 -0700
date_formatted: "September 13, 2015"
author: Paulus Schoutsen
comments: true
categories: release-notes how-to
---

 <p>Today we announce the release of Home Assistant v0.7.2 which includes brand new support by
<a href="https://github.com/sfam">@sfam</a> to integrate with <a href="https://ifttt.com">IFTTT</a>. IFTTT stands for If This, Then That and is a
webservice that integrates with almost every possible webservice out there. Adding Home
Assistant to this mix means Home Assistant can connect with all via IFTTT.</p>

<p>It is now possible to disable your irregation system if it is going to be cloudy tomorrow or tweet
if your smoke alarm goes off.</p>

<p class='img'>
  <img src='/images/blog/2015-09-ifttt/splash.png'>
</p>


<p>Head over to the <a href="/components/ifttt.html">setup instructions</a> to get started with IFTTT. Click the
read more button for some example recipes.</p>

<!--more-->

<p>In each of the following examples, make sure to replace the XXX in the url with your correct
host address and api password.</p>

<h2><a class='title-link' name='turn-off-irregation-system-when-not-needed' href='#turn-off-irregation-system-when-not-needed'></a> Turn off irregation system when not needed</h2>

<p class='img'>
  <img src='/images/blog/2015-09-ifttt/recipe-weather.png' />
</p>


<p>Maker channel setup:</p>

<table>
<thead>
<tr>
<th> Field </th>
<th> Value </th>
</tr>
</thead>
<tbody>
<tr>
<td> URL   </td>
<td>  <a href="http://xxx.xxx.xxx.xxx:8123/api/services/switch/turn_off?api_password=xxxxxxxx">http://xxx.xxx.xxx.xxx:8123/api/services/switch/turn_off?api_password=xxxxxxxx</a></td>
</tr>
<tr>
<td> METHOD </td>
<td> POST</td>
</tr>
<tr>
<td> CONTENT TYPE </td>
<td> application/json</td>
</tr>
<tr>
<td> BODY </td>
<td> { &ldquo;entity_id&rdquo;: &ldquo;switch.irrigation&rdquo; }</td>
</tr>
</tbody>
</table>


<h2><a class='title-link' name='tweet-when-important-events-happen' href='#tweet-when-important-events-happen'></a> Tweet when important events happen</h2>

<p class='img'>
  <img src='/images/blog/2015-09-ifttt/recipe-twitter.png' />
</p>


<p>This will tweet a message when a MQTT message is received that the smoke alarm has been triggered.
Setup Maker channel with event name <code>HA_FIRE_ALARM</code> and Twitter channel to tweet the message in
<code>value1</code>.</p>

<figure class='code'><figcaption><span></span></figcaption><div class="highlight"><table><tr><td class="gutter"><pre class="line-numbers"><span class='line-number'>1</span>
<span class='line-number'>2</span>
<span class='line-number'>3</span>
<span class='line-number'>4</span>
<span class='line-number'>5</span>
<span class='line-number'>6</span>
<span class='line-number'>7</span>
<span class='line-number'>8</span>
<span class='line-number'>9</span>
<span class='line-number'>10</span>
</pre></td><td class='code'><pre><code class='yaml'><span class='line'><span class="c1"># Configuration.yaml entry</span>
</span><span class='line'><span class="l-Scalar-Plain">automation</span><span class="p-Indicator">:</span>
</span><span class='line'>  <span class="l-Scalar-Plain">alias</span><span class="p-Indicator">:</span> <span class="l-Scalar-Plain">Post a tweet when fire alarm is triggered</span>
</span><span class='line'>
</span><span class='line'>  <span class="l-Scalar-Plain">platform</span><span class="p-Indicator">:</span> <span class="l-Scalar-Plain">mqtt</span>
</span><span class='line'>  <span class="l-Scalar-Plain">mqtt_topic</span><span class="p-Indicator">:</span> <span class="l-Scalar-Plain">home/alarm/fire</span>
</span><span class='line'>  <span class="l-Scalar-Plain">mqtt_payload</span><span class="p-Indicator">:</span> <span class="s">&#39;on&#39;</span>
</span><span class='line'>
</span><span class='line'>  <span class="l-Scalar-Plain">execute_service</span><span class="p-Indicator">:</span> <span class="l-Scalar-Plain">ifttt.trigger</span>
</span><span class='line'>  <span class="l-Scalar-Plain">service_data</span><span class="p-Indicator">:</span> <span class="p-Indicator">{</span><span class="s">&quot;event&quot;</span><span class="p-Indicator">:</span><span class="s">&quot;HA_FIRE_ALARM&quot;</span><span class="p-Indicator">,</span> <span class="s">&quot;value1&quot;</span><span class="p-Indicator">:</span><span class="s">&quot;The</span><span class="nv"> </span><span class="s">fire</span><span class="nv"> </span><span class="s">alarm</span><span class="nv"> </span><span class="s">just</span><span class="nv"> </span><span class="s">triggered!&quot;</span><span class="p-Indicator">}</span>
</span></code></pre></td></tr></table></div></figure>


<h2><a class='title-link' name='turn-on-lights-when-i-get-home' href='#turn-on-lights-when-i-get-home'></a> Turn on lights when I get home</h2>

<p class='img'>
  <img src='/images/blog/2015-09-ifttt/recipe-geo.png' />
</p>


<p>Maker channel setup:</p>

<table>
<thead>
<tr>
<th> Field </th>
<th> Value </th>
</tr>
</thead>
<tbody>
<tr>
<td> URL   </td>
<td>  <a href="http://xxx.xxx.xxx.xxx:8123/api/services/light/turn_on?api_password=xxxxxxxx">http://xxx.xxx.xxx.xxx:8123/api/services/light/turn_on?api_password=xxxxxxxx</a></td>
</tr>
<tr>
<td> METHOD </td>
<td> POST</td>
</tr>
<tr>
<td> CONTENT TYPE </td>
<td> application/json</td>
</tr>
<tr>
<td> BODY </td>
<td> { &ldquo;entity_id&rdquo;: &ldquo;light.kitchen&rdquo; }</td>
</tr>
</tbody>
</table>


<h2><a class='title-link' name='flash-lights-when-a-new-pr-comes-in-for-home-assistant' href='#flash-lights-when-a-new-pr-comes-in-for-home-assistant'></a> Flash lights when a new PR comes in for Home Assistant</h2>

<p class='img'>
  <img src='/images/blog/2015-09-ifttt/recipe-github.png' />
</p>


<p>Maker channel setup:</p>

<table>
<thead>
<tr>
<th> Field </th>
<th> Value </th>
</tr>
</thead>
<tbody>
<tr>
<td> URL   </td>
<td>  <a href="http://xxx.xxx.xxx.xxx:8123/api/services/light/turn_on?api_password=xxxxxxxx">http://xxx.xxx.xxx.xxx:8123/api/services/light/turn_on?api_password=xxxxxxxx</a></td>
</tr>
<tr>
<td> METHOD </td>
<td> POST</td>
</tr>
<tr>
<td> CONTENT TYPE </td>
<td> application/json</td>
</tr>
<tr>
<td> BODY </td>
<td> { &ldquo;entity_id&rdquo;: &ldquo;group.all_lights&rdquo;, &ldquo;flash&rdquo;:&ldquo;yes&rdquo; }</td>
</tr>
</tbody>
</table>


<h2><a class='title-link' name='fire-events-when-pressing-the-do-button' href='#fire-events-when-pressing-the-do-button'></a> Fire events when pressing the DO button</h2>

<p class='img'>
  <img src='/images/blog/2015-09-ifttt/recipe-do.png' />
</p>


<p>Maker channel setup:</p>

<table>
<thead>
<tr>
<th> Field </th>
<th> Value </th>
</tr>
</thead>
<tbody>
<tr>
<td> URL   </td>
<td>  <a href="http://xxx.xxx.xxx.xxx:8123/api/events/do_button_pressed?api_password=xxxxxxxx">http://xxx.xxx.xxx.xxx:8123/api/events/do_button_pressed?api_password=xxxxxxxx</a></td>
</tr>
<tr>
<td> METHOD </td>
<td> POST</td>
</tr>
<tr>
<td> CONTENT TYPE </td>
<td> application/json</td>
</tr>
</tbody>
</table>

