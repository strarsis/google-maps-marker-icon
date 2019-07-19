# google-maps-marker-icon
Helper function for forcing dimensions of SVGs to be used as [Google Map marker](https://developers.google.com/maps/documentation/javascript/markers).

## Problem and purpose of this module
[Google Maps Markers can use SVGs as icon](https://developers.google.com/maps/documentation/javascript/markers).
However, when the SVGs themselves got no specific width or height (or not one that fits an icon), there is currently no way for forcing the intended dimesions as icon on them, instead the SVG is shown in its full or non-icon size on the map.
Even using the `size` property, adding the marker icon as a [Complex icons](https://developers.google.com/maps/documentation/javascript/markers#complex_icons), will have no effect on the size of the SVG icon images.

This helper provides an alternative by fetching all icon image files first, 
checking for the downloaded image being an SVG by inspecting the `Content-Type` in response, 
passing non-SVG, raster images (like PNGs), that are correctly resized by Google Maps, directly through, 
while parsing SVG images, applying the intended dimensions as `width` and `height` attributes to it and 
then passing the modified SVG as usbale, serialized `data:image/svg+xml` URL.

## Usage
````
# with npm
> npm install --save google-maps-marker-icon

# with yarn
> yarn add google-maps-marker-icon
````

```js
import googleMapsMarkerIcon from 'google-maps-marker-icon';

// ... then in your code for adding markers to map
googleMapsMarkerIcon( '/img/some-icon.svg', { width: 48, height: 48 } )
.then((icon) => {
  // the icon from promise can be passed to `setIcon(...)`.
  marker.setIcon(icon);
})
````
The helper also works without any issues with URLs that aren't obviously SVGs (determined by `Content-Type`) and with non-SVG URLs, when SVGs and non-SVGs are used together as markers and it should just work correctly.

## Just applying SVG dimensions
If you don't need the extra fetch logic with `Content-Type` detection you can also just use the `dimsToSvgText` method shipped with this module. It accepts a string with SVG XML, parses it and applies the intended dimensions as `width` and `height` attributes, then returns the modified SVG again as XML string.

Note: The best way for further using a SVG XML string as Google Maps Marker icon is to escape it as a text/svg data URL, you can use a module like [`mini-svg-data-uri`](https://www.npmjs.com/package/mini-svg-data-uri) (this is also used by the main helper method by the way).

```js
import dimsToSvgText from 'google-maps-marker-icon';
import svgToMiniDataURI from 'mini-svg-data-uri';

let newText = dimsToSvgText(svgText, { width: 48, height: 48 }); // new SVG XML string
let icon = svgToMiniDataURI(newText); // make compatible

marker.setIcon(icon);
````
