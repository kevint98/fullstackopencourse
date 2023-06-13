# Single Page App Diagram

```sequence
    participant browser
    participant server

    browser->server: GET https://studies.cs.helsinki.fi/exampleapp/spa

    server-->browser: HTML document

    browser->server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    server-->browser: the CSS file

    browser->server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    server-->browser: the Javascipt file


    Note right of browser: The browser starts executing \nthe JavaScript code that \nfetches the JSON from the server

    browser->server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    server-->browser:  [{ "content": "HTML is easy", "date": "2023-1-1" }, ..., \n{"content": New note", "date": "2023-6-13"} ]

    Note right of browser: The browser executes the \nccode that renders the notes
```
