import 'whatwg-fetch'; // fetch polyfill
import svgToMiniDataURI from 'mini-svg-data-uri';

const googleMapMarkerIcon = function(src, dims = {
  width:  48,
  height: 48,
}) {
  return fetch(src)
  .then((response) => {

    if(response.headers.get('content-type') !== 'image/svg+xml') {
      // Non-SVGs, binary/raster images
      return response.blob()
      .then((blob) => {
        let srcUrl = URL.createObjectURL(blob);
        return srcUrl;
      });
    }

    // SVGs
    return response.text()
    .then((text) => {
      const parser = new DOMParser();
      const doc    = parser.parseFromString(text, 'image/svg+xml');
      const svg    = doc.firstChild; // assuming one <svg> as 1st node

      svg.setAttribute('width',  dims.width);
      svg.setAttribute('height', dims.height);

      var serializer = new XMLSerializer();
      let newText    = serializer.serializeToString(svg);
      let srcUrl     = svgToMiniDataURI(newText);
      return srcUrl;
    });

  });
}

export default googleMapMarkerIcon;
