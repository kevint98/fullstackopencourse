# New Note Diagram

```sequence
    participant browser
    participant server

    browser->server: POST https://studies.cs.helsinki.fi/exampleapp/new_note

    Note right of browser: The browser sends user input \n to the server

    server-->browser: HTTP Status Code 302

    Note left of server: The server asks the browser \nto do a new HTTP GET request \nwith a URL redirect

    browser->server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    server-->browser: HTML document

    browser->server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    server-->browser: the CSS file

    browser->server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    server-->browser: the Javascipt file


    Note right of browser: The browser starts executing \nthe JavaScript code that \nfetches the JSON from the server

    browser->server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    server-->browser:  [{ "content": "HTML is easy", "date": "2023-1-1" }, ..., \n{"content": New note", "date": "2023-6-13"} ]

    Note right of browser: The browser executes the \ncallback function that renders the notes
```
