# REST

## Internally routing REST API request
Often you might need to query another endpoint in order to show user the response. Example: Endpoint that has to return page with the ID 7 after midnight and page with the ID 25 before midnight.

```php
$req = new WP_REST_Request("GET", "/wp/v2/pages/25");

// Optionally set some params
// $req->set_param("x", true");
// $req["x"], true");

// You can return $response directly
$response = rest_do_request($req);
```
