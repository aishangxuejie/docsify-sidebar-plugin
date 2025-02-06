# Docsify Sidebar Plugin

This is a plugin for Docsify that automatically generates a sidebar.

## Installation

1. Download the `docsify-sidebar-plugin.min.js` file from the [GitHub repository](https://github.com/yourusername/your-repo-name).

2. Include the plugin in your `index.html` file:

   ```html
   <!DOCTYPE html>
   <html>
   <head>
     <meta charset="UTF-8">
     <title>Docsify Sidebar Plugin</title>
     <link rel="stylesheet" href="//unpkg.com/docsify/lib/themes/vue.css">
   </head>
   <body>
     <div id="app"></div>
     <script src="//unpkg.com/docsify/lib/docsify.min.js"></script>
     <script src="docsify-sidebar-plugin.min.js"></script>
     <script>
       window.$docsify = {
         // Other Docsify configurations
       };
     </script>
   </body>
   </html>