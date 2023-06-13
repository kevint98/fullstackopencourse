# New Note in SPA Diagram

```sequence
    participant browser
    participant server

    browser->server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa

    Note right of browser: The browser sends user input \n to the server as JSON data

    server-->browser: HTTP Status Code 201 Created

    Note right of browser: The browser sends no further HTTP requests\n but uses the JavaScript code fetched from \nthe server to update the page with the new \n content

```
