# jQuery.ui.vScroll

This is designed vertical scrollbar with [jQuery UI Slider](http://jqueryui.com/demos/slider/)

## Required Framework 
* [jQuery](http://jquery.com/) (developed with jQuery 1.5)
* [jQuery UI Slider](http://jqueryui.com/demo/slider/) (developed with jQuery UI 1.8.11)

## Usage

### JavaScript example
<pre><code>$(function () {
/* $(some selector).vScroll() */
$('.mod_vScroll').vScroll({
    sliderWrapperClassName: "sliderWrap",
    sliderClassName: "sliderVertical"
});
});</code></pre>

### HTML example
<pre><code>&lt;div class=&quot;mod_vScroll&quot;&gt;&lt;-- Scroll wrapper --&gt;
&lt;div class=&quot;content&quot;&gt;&lt;-- Scroll contents --&gt;
&lt;!-- Some vertical scroll contents here --&gt;
&lt;/div&gt;

&lt;!-- Slider (generated from JavaScript) --&gt;
&lt;div class=&quot;sliderWrap&quot;&gt;&lt;!-- Slider wrapper. "sliderWrap" class is optional --&gt;
&lt;div class=&quot;sliderVertical ui-slider ui-slider-vertical ui-widget ui-widget-content ui-corner-all&quot;&gt;&lt;!-- "sliderVertial" class is optional --&gt;
&lt;a href=&quot;#&quot; class=&quot;ui-slider-handle ui-state-default ui-corner-all&quot;&gt;&lt;/a&gt;&lt;!-- Scroll handle --&gt;
&lt;/div&gt;
&lt;/div&gt;

&lt;/div&gt;</code></pre>

### CSS example
<pre><code>/* ".mod_vScroll" is specified by jQuery selector */
.mod_vScroll {
    position: relative;
    width: 200px;
    height: 300px;
}
/* ".content" is fixed */
.mod_vScroll .content {
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
}
.mod_vScroll ul li {
    list-style-type: none;
    margin-bottom: 10px;
}

/* ".sliderWrap" is optional */
.sliderWrap {
    position: absolute;
    top: 0;
    right: 0;
    width: 14px;
    background-color: #eee;
}
/* ".sliderVertical" is optional */
.sliderVertical {
    position: relative;
    height: 100%;
}
/* ".ui-slider-wrap" is fixed */
.ui-slider-handle {
    display: block;
    position: absolute;
    width: 12px;
    height: 10px;
    cursor: default;
    border: 1px solid #999;
}</code></pre>
