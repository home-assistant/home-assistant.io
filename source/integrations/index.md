---
layout: default
---

{%- comment -%}Can't use where to count nil because of https://github.com/jekyll/jekyll/issues/6038{%- endcomment -%}
{%- assign tot = 0 -%}
{%- for comp in site.integrations -%}
{%- if comp.ha_category -%}
{%- if comp.ha_category.first -%}
{%- assign tot = tot | plus: comp.ha_category.size -%}
{%- else -%}
{%- assign tot = tot | plus: 1 -%}
{%- endif -%}
{%- endif %}
{%- endfor -%}

{%- assign components = site.integrations | sort: 'title' -%}
{%- assign components_by_version = site.integrations | group_components_by_release -%}
{%- assign categories = components | map: 'ha_category' | join: ',' | join: ',' | split: ',' | uniq | sort -%}

<div class="container mx-auto text-center mb-[100px] mt-[150px] md:mb-[71px] md:mt-[200px]">
    <div class="mx-auto w-full max-w-[348px] md:max-w-[615px]">
        <div
            class="absolute translate-y-[-50%] left-1/2 w-[80%] translate-x-[-50%] md:top-[40px] md:relative text-white focus-within:text-gray-400">
            <div class="absolute inset-y-0 left-0 pl-5 md:pl-[40px]  flex items-center pointer-events-none">
                <img class="w-[25px] h-[25px]" src="{{site.baseurl}}images/icon/search-build.png" />
            </div>
            <div class="component-search">
              <form onsubmit="event.preventDefault(); return false">
                <input type="text" name="search" id="search" class="search focus:outline-none w-full max-h-[56px] md:max-h-[83px] rounded-[60px] py-[20px] md:py-[30px] pl-[69px] md:pl-[126px] pr-[46px] md:pr-[66px] bg-white text-sm md:text-xl placeholder-black placeholder-opacity-[.33] font-semibold text-black shadow-[0_4px_24px_rgba(0,0,0,0.3)]" style="-webkit-appearance: none" type="search" placeholder="Search integrations..." role="search" autofocus />
              </form>
            </div>
        </div>
    </div>
</div>

<div class="bg-[#F9F9F9] xl:px-[9%] integrations">
    <div class="container mx-auto">
        <div class="flex gap-3 pt-12 md:pt-10">
            <div class="pl-[5%] flex-1">
                <label class="block md:hidden text-[16px] font-semibold text-[black] opacity-1 md:opacity-[0.33] md:uppercase cursor-pointer filter-open" id="filter-label">Filters</label>
            </div>
            <div class="pr-[5%]">
                <p id="popular-first" class="text-[16px] font-semibold text-[black] cursor-pointer">Popular first</p>
            </div>
        </div>
        <div class="md:flex flex-row gap-3">
            <!-- FILTERS -->
            <div id="filter-items" class="w-[350px] block filter-items">
                <div class="md:border-r-[1px] md:pb-[400px] px-4" style="border-color:rgba(0, 0, 0, 0.1)">
                    <div class="absolute top-[20px] right-[20px] block md:hidden" id="close-filter">
                      <img class="opacity-[0.5]" src="{{site.baseurl}}images/icon/arrow-left.svg" alt="close filter items">
                    </div>
                    <div class="mt-[36px] filter-button-group">
                        <label class="font-bold text-[20px] mt-[36px]">Categories</label>
                        {%- for category in categories -%}
                        {%- assign components_count = components | where: 'ha_category', category | size -%}
                        {%- if category and category != 'Other' and components_count != 0 -%}
                        <a href='#{{ category | slugify }}' onclick="document.querySelector('.page-content').scrollTop = 0" class="grid grid-cols-5 gap-4 my-3 items-start">
                            <div class="col-span-4 text-sm">
                                <label for="{{ category }}" class="font-medium text-[16px]"> {{ category }} ({{ components_count }})</label>
                            </div>
                            <div class="col-span-1 items-center h-5">
                                <input id="{{category}}" name="{{category}}" type="checkbox"
                                    class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded check-mark" >
                            </div>
                        </a>
                        {%- endif -%}
                        {%- endfor -%}
                    </div>
                </div>
            </div>
            <!-- end FILTERS -->
            <div class="w-[100%]">
                <div class="mx-auto px-[5%] pb-[50px]">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-[20px] md:gap-[4%] md:gap-y-[25px] items-center mt-[32px] mb-[50px]" id="componentContainer"></div>
                </div>
            </div>
        </div>
    </div>
</div>

<script
  src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
  integrity="sha256-4+XzXVhsDmqanXGHaHvgh1gMQKX40OUvDEBTu8JcmNs="
  crossorigin="anonymous"></script>
  <script
    src="https://cdnjs.cloudflare.com/ajax/libs/mustache.js/2.3.0/mustache.min.js"
    integrity="sha384-wlIoxluAn4R0ncWYWAibi4AATy1rxh4LzxfPhzhRfBwpYzbAQT7FDApW3TTf4KC+"
    crossorigin="anonymous"></script>
  <script
    src="https://cdnjs.cloudflare.com/ajax/libs/vanilla-lazyload/10.17.0/lazyload.min.js"
    integrity="sha384-vJtpZDYI5wEvw5lJzoCEeYTiRzgoR1NmzkWtzy04p4AaQjHXAzxNqSEVlIsutpxa"
    crossorigin="anonymous"></script>

{% raw %}

<script id="component-template" type="text/x-custom-template">
  {{#components}}
    <a href="{{url}}" class="bg-white rounded-[24px] option-card">
        <div class="relative px-2 h-[210px]  border-2 rounded-[24px] mx-auto" style="border-color:rgba(0, 0, 0, 0.1)">
            <div class="pt-[50px] img-container">{{{image}}}</div>
            <div class="pt-[20px]">
                <p class="font-semibold text-center text-[32px] leading-[38.4px]">{{title}}</p>
            </div>
        </div>
    </a>
{{/components}}
{{^components}}
  <p class='note'>Nothing found!</p>
{{/components}}
</script>

{% endraw %}

<script type="text/javascript">
// This object contains all components we have
var allComponents = [
  {%- for component in components -%}
    {%- if component.ha_category -%}
      {%- assign sliced_version = component.ha_release | split: '.' -%}
      {%- assign minor_version = sliced_version[1]|plus: 0 -%}
      {%- assign major_version = sliced_version[0]|plus: 0 -%}

      {% capture domain %}{{ component.ha_supporting_domain | default: component.ha_domain }}{% endcapture %}
      {% assign active_installations = site.data.analytics_data.integrations[domain] | default: 0 %}
      {% assign percentage = 100.0 | times: active_installations | divided_by: site.data.analytics_data.reports_integrations | round: 1 %}
      
      {% assign categories = "" | split: ',' %}
      {%- for ha_category in component.ha_category -%}
        {% capture category %}"{{ ha_category | slugify | downcase }}"{% endcapture %}
        {% assign categories = categories | push: category %}
      {%- endfor -%}
      {url:"{{ component.url }}", title:"{{component.title}}", cat: [{{categories|join: ","}}], featured: {% if component.featured %}true{% else %}false{% endif %}, v: "{{major_version}}.{{minor_version}}", logo: "{{component.logo}}", domain: "{{component.ha_domain}}", percent: "{{percentage}}"},
    {% endif -%}
  {%- endfor -%}
  false
];
allComponents.pop(); // remove placeholder element at the end
  jQuery('#filter-label').click(function() {
    jQuery('.filter-items').css({
      '-webkit-transform' : 'translateX(350px)',
      '-moz-transform'    : 'translateX(350px)',
      '-ms-transform'     : 'translateX(350px)',
      '-o-transform'      : 'translateX(350px)',
      'transform'         : 'translateX(350px)'
    });
  });
  jQuery('#close-filter').click(function() {
    jQuery('.filter-items').css({
      '-webkit-transform' : 'translateX(0)',
      '-moz-transform'    : 'translateX(0)',
      '-ms-transform'     : 'translateX(0)',
      '-o-transform'      : 'translateX(0)',
      'transform'         : 'translateX(0)'
    });
  });
  jQuery(window).resize(function(){     
    if (jQuery(window).width() > 767 ){
      jQuery('.filter-items').css({
        '-webkit-transform' : 'translateX(0)',
        '-moz-transform'    : 'translateX(0)',
        '-ms-transform'     : 'translateX(0)',
        '-o-transform'      : 'translateX(0)',
        'transform'         : 'translateX(0)'
      });
    }
  });
</script>

<script src="{{ site.baseurl }}assets/js/integrations-filter.js"></script>

<noscript>
  <ul>
    {%- for component in components -%}
    {%- if component.ha_category -%}
    <li><a href='{{ component.url }}'>{{ component.title }}</a></li>
    {%- endif -%}
    {%- endfor -%}
  </ul>
</noscript>
