# Polylang
Polylang is a multilingual plugin that offers string and post translation.

# Why use it?
If you wanted to build a multilingual site in 2007, you pretty much had to use WPML. WordPress didn't make things too easy back then, and WPML team created their own solutions to problems.

Because of the massive legacy codebase, performance is terrible, and updates often break things in ways including, but not limited to:
* visual changes to elements on the frontside that break the layout
* official addons are not compatible with the updated version
* just plain PHP errors

Polylang used to lack certain features such as WooCommerce support until recently, but nowadays there really aren't any good reasons for using the 10 years old monolith.

## Getting started
The [function reference](https://polylang.wordpress.com/documentation/documentation-for-developers/functions-reference/) is your best friend.

Basically you install the plugin, activate it, go to the settings page, add a few languages and so on.

### Registering strings
To make strings translatable, you have to call `pll_register_string` *in wp-admin*. In themes, you can just use functions.php.

```php
$name = "mytheme"
$group = "polylang";
$multiline = false;

pll_register_string($name, "I want to translate this sentence!", $group, $multiline);
pll_register_string($name, "Latest posts", $group, $multiline);
```

### Translating strings
Couldn't get any easier.

```php
// Current language
echo pll__("Latest posts");

// Some other language (barely ever needed?) (barely ever needed?)
echo pll_translate_strings("Latest posts", "ru");
```
