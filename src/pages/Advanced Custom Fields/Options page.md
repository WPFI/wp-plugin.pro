# Options page
Options pages are useful when you have content that needs to be editable from wp-admin, but doesn't really belong to any spesific posts or page.
Adding one is easy.
```php
if (function_exists("acf_add_options_page")) {
  $parent = acf_add_options_page([
    "page_title" => "My Options Page",
    "menu_slug" => "acf-opts",
  ]);
}
```

## Multilingual
When the site has multiple languages, options pages have to get translated too. No plugins are required if you're already using Polylang. Simply create multiple pages:

```php
if (function_exists("acf_add_options_page")) {
  $parent = acf_add_options_page([
    "page_title" => "My Options Page",
    "menu_slug" => "acf-opts",
  ]);

  if (function_exists("pll_languages_list")) {
    $names = pll_languages_list([
      "fields" => "name",
    ]);

    foreach ($names as $name) {
      $fields = [
        "page_title" => $name,
        "menu_title" => $name,
        "parent_slug" => $parent["menu_slug"],
      ];

      if ($name === "English") {
        $fields["menu_slug"] = "acf-options";
      }

      acf_add_options_sub_page($fields);
    }
  }
}
```

Then you create a new field field group for your options, add the fields you want, and **disable** the field group.

You then create one field group per language, and use the ACF clone field to clone all fields from the field group you disabled earlier. The slug of the content field **has** to be the language slug that `pll_current_language()` outputs when viewing the site on target language.

**Example**: You create a `copyright` field in your options page base. You have two languages, English and Finnish. Your clone field slugs are `en` and `fi`, so the keys that get saved into wp_options are `en_copyright` and `fi_copyright`. Accessing them is easy.

```php
$copyright = get_field(pll_current_language() . "_copyright", "options");
echo $copyright;



// Having to type that over and over again sure gets annoying. Abstract it!

namespace ProjectName;

function get_translated_option($key) {
  $lang = pll_current_language();
  return get_field("{$lang}_{$key}", "options");
}

// then when you need it
echo \ProjectName\get_translated_option("copyright");
```

The drawback of this approach is that there's no (easy) way to translate ACF field keys and messages.
