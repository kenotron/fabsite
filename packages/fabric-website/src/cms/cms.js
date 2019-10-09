/**
 * The default export of `netlify-cms-app` is an object with all of the Netlify CMS
 * extension registration methods, such as `registerWidget` and
 * `registerPreviewTemplate`.
 */
import CMS from "netlify-cms-app";
import NetlifyCmsWidgetMarkdown from "./netlify-cms-widget-markdown";

/**
 * Register the imported widget:
 */
CMS.registerWidget(
  "fabricmarkdown",
  NetlifyCmsWidgetMarkdown.controlComponent,
  NetlifyCmsWidgetMarkdown.previewComponent
);
