(function () {
    var template = $('#component-template').html();
    Mustache.parse(template); // make future calls to render faster

    function init() {
      // do the lowerCase transformation once
      for (i = 0; i < allComponents.length; i++) {
        title = allComponents[i].title.toLowerCase();
        domain = allComponents[i].domain;
        title_normalized = title
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        title_dedashed = title.replace(/[-_]/g, " ");
        title_normalized_dedashed = title_normalized.replace(/[-_]/g, " ");

        allComponents[i].titleLC = title;
        allComponents[i].search = `${title} ${title_normalized} ${title_dedashed} ${title_normalized_dedashed} ${domain}`;
      }

      // sort the components alphabetically
      allComponents.sort(function (a, b) {
        return a.titleLC.localeCompare(b.titleLC);
      });

      if (location.hash !== '' && location.hash.indexOf('#search/') === 0) {
        // set default value in search from URL
        jQuery('.component-search input').val(decodeURIComponent(location.hash).substring(8));
      }

      // add focus to the search field - even on IE
      setTimeout(function () {
        jQuery('.component-search input').focus();
      }, 1);
    }
    init();

    /**
     * filter all components, based on the location's hash and render them into the component box
     */ 
    function applyFilter(sort) {
      var logoLazyLoad = new LazyLoad({
        elements_selector: ".option-card img"
      });
      var rendered, i, filter, search;
      var hash = location.hash || '';
      var data = {
        components: [],
        image: function () {
          if (this.logo === '') {
            return '<img class="card-logo" src="https://brands.home-assistant.io/_/' + this.domain + '/logo.png" srcset="https://brands.home-assistant.io/_/' + this.domain + '/logo@2x.png 2x">';
          } else {
            return '<img class="card-logo" data-src="/images/supported_brands/' + this.logo + '">';
          }
        }
      };

      // fade-out css effect on the old elements. This is actually not visible on fast browsers
      $('#componentContainer').addClass('remove-items');

      if (hash.indexOf('#search/') === -1) {
        // reset search box when not searching
        jQuery('.component-search input').val(null);
      }

      if (hash === '#all') {
        // shortcut: no need to filter
        data.components = allComponents;
      } else {
        if (hash.indexOf('#search/') === 0) {
          // search through title and category
          search = decodeURIComponent(hash).substring(8).toLowerCase();
          filter = function (comp) {
            return (
              comp.search.indexOf(search) !== -1 ||
              comp.cat.find((c) => c.includes("#")) != undefined
            );
          };

        } else if (hash === '#featured' || hash === '') {
          // only show those with featured = true
          filter = function (comp) {
            return comp.featured;
          };

        } else if (hash.indexOf('#version/') === 0) {
          // compare against a version
          search = decodeURIComponent(hash).substring(9).toLowerCase();
          filter = function (comp) {
            // compare version string against version js
            return comp.v === search;
          };

        } else {
          // regular filter categories
          search = hash.substring(1);
          filter = function (comp) {
            return comp.cat.includes(search);
          };
        }

        // filter all components using the filter function
        for (i = 0; i < (allComponents.length); i++) {
          if (filter(allComponents[i])) {
            data.components.push(allComponents[i]);
          }
        }
      }

      if(sort) {
        data.components.sort((a, b) => {
          if ( parseInt(a.percent) < parseInt(b.percent) ){
            return 1;
          }
          if ( parseInt(a.percent) > parseInt(b.percent) ){
            return -1;
          }
          return 0;
        })
      } 

      rendered = Mustache.render(template, data);

      // set active class on active menu item
      jQuery('.filter-button-group a.active').removeClass('active');
      jQuery(`.filter-button-group a .check-mark`).removeAttr("checked");
      jQuery(`.filter-button-group a[href="${hash}"]`).addClass('active');
      jQuery(`.filter-button-group a[href*="${hash}"] .check-mark`).attr("checked", "checked");
      
      if (hash === "") {
        jQuery('.filter-button-group a[href*="#featured"]').addClass('active');
      }

      // remove previous elements and css classes, add the new stuff and then trigger the fade-in css animation
      $('#componentContainer').html('').removeClass('show-items remove-items').html(rendered).addClass('show-items');
      logoLazyLoad.update();
    }

    /**
     * update the browser location hash. This enables users to use the browser-history
     */
    function updateHash(newHash) {
      if ('pushState' in history) {
        history.pushState('', '', newHash);
      } else {
        location.hash = newHash;
      }
    }

    // update view by filter selection
    jQuery('.filter-button-group a').click(function () {
      var href = this.getAttribute('href');
      if(jQuery(`.filter-button-group a[href*="${href}"]`).hasClass('active')) {
        updateHash('#');
      } else {
        updateHash(this.getAttribute('href'));
      }

      applyFilter(false);

      return false;
    });

    // update view on select change
    jQuery('select').change(function () {
      updateHash(this.value);
      applyFilter(false);

      return false;
    });

    // sort popular first
    jQuery('#popular-first').click(function () {
      applyFilter(true);
    });

    /**
     * Simple debounce implementation, based on http://davidwalsh.name/javascript-debounce-function
     */
    function debounce(func, wait, immediate) {
      var timeout;
      return function () {
        var context = this,
          args = arguments;
        var later = function () {
          timeout = null;
          if (!immediate) {
            func.apply(context, args);
          }
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {
          func.apply(context, args);
        }
      };
    };

    // update view by search text
    $('.component-search input').keyup(debounce(function () {
      var text = $(this).val();
      // sanitize input
      text = text.replace(/[(\?|\&\{\}\(\))]/gi, '').trim();
      if (typeof text === "string" && text.length >= 1) {
        updateHash('#search/' + text);
      }
      else {
        updateHash('#all');
      }
      applyFilter(false);
    }, 500));

    window.addEventListener('hashchange', applyFilter);
    applyFilter();
  })();
