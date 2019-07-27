# kshitij-srv.github.io
A single page web app to display live stocks data

# Project Notes:
This app pulls live stocks data from ws://stocks.mnet.website and displays it in a tabular format.
1. The connection can be initiated or closed using buttons provided in the UI.
2. If a stock value goes up, the value is indicated by a green background.
3. If a stock value goes down, the value is indicated by a read background.
4. The latest update time is indicated beside the stock value.

Since ws://stocks.mnet.website may cause mixed-content error when the app is hosted via https due to security rules enforced by the browser. Following are the workarounds:
    1. Hosting the app via http instead of https (this can create vulnerability in the app for man-in-the-middle)
    2. Enabling SSL for the web socket server and hosting it over wss will ensure the server works with both http as well as https enabled websites.
