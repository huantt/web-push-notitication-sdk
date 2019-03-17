# Folders strcuture:

- sources: Development source code
- distributions: Complete source code (After build) 

# How to build:
```
npm run build
```

# Deployment:
Public the files in distributions folder

# How to integrate:
- Add service-worker.js file into your website (`{{path-to-this-file}}`)

    - serivce-worker.js file's content:
    
    ```javascript
    importScripts('https://{{domain.com}}/service-worker.js');
    ```

- Add this script to the head tag on all pages of your site that user can subscribe to.

    ```html
    <script src="https://{{domain.com}}/webpush-sdk.js"></script>
    <script>
        window.webpushInit({
            service_worker: "{{path-to-this-file}}/service-worker.js",
            tags: {
                "source": "dantri.vn",
                "any_tag": "any_value"
            }
        })
    </script>
    ```
