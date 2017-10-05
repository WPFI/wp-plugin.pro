# Menus
If you need to add a custom post type archive or singular posts from a custom post type to a menu, you need to register the post type with truthy values for `has_archive`, `publicly_queryable` and `show_in_nav_menus`. The latter two inherit the value of `public` by default.

```php
add_action('init', function () {
  register_post_type(
    'news',
    [
      'labels' => [
        'name' => __('News'),
        'singular_name' => __('News'),
        'archives' => __('News'),
      ],
      'public' => true,
      'has_archive' => true,
      'rewrite' => [
        'slug' => 'news',
      ],
    ]
  );
});
```

You should see a new metabox called News in the menu editing view. To add the cpt archive to a menu, click "View all", and select the first checkbox with the label "News", and add it to the menu by clicking "Add to Menu".
