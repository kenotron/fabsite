/**
 * The default export of `netlify-cms-app` is an object with all of the Netlify CMS
 * extension registration methods, such as `registerWidget` and
 * `registerPreviewTemplate`.
 */
import CMS from "netlify-cms-app";

import ImageGalleryWidget from "./image-gallery-widget.js";

/**
 * Register the imported widget:
 */
CMS.registerWidget();
