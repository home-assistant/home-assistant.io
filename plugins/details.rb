module Jekyll
  class DetailsBlock < Liquid::Block

    def initialize(tag_name, title, tokens)
      super
      @title = title
      @details_idx = 1
    end

    def render(context)
      contents = super(context)
      if @title.nil? || @title.empty? then
        title = "More info"
      else
        title = @title
      end
      title = title.to_s.delete("\"")

      idx = context["details_idx"]
      if idx.nil? then
        idx = 0
      end
      context["details_idx"] = idx + 1

      <<~MARKUP
        <script>
        function showDetails(el) {
          const content = el.parentElement.querySelector(".details-block-content");
          const up = el.querySelector("svg#up");
          const down = el.querySelector("svg#down");
          const shouldExpand = down.style.display === "block";
          up.style.display = shouldExpand ? "block" : "none";
          down.style.display = !shouldExpand ? "block" : "none";
          content.hidden = !shouldExpand;
          el.ariaExpanded = shouldExpand;
        }
        </script>
        <div class="details-block">
          <div class='details-block-item'>
            <button class='details-block-title' onclick='showDetails(this)' aria-controls="content_#{idx}" aria-expanded="false">
              #{title}
              <div class='details-block-arrow'>
              <svg id="down" style="display: block;" width="24" height="24" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
              <svg id="up" style="display: none;" width="24" height="24" viewBox="0 0 24 24"><path d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z" /></svg>
              </div>
            </button>
            <div class='details-block-content' id="content_#{idx}" hidden>#{contents}</div>
          </div>
        </div>
      MARKUP
    end
  end
end

Liquid::Template.register_tag('details', Jekyll::DetailsBlock)