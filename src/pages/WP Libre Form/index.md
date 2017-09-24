# WP Libre Form
WP Libre Form is a "direct replacement" to Contact Form 7. That means it has the same features (and more) out of box, but it does everything better. It: 
* can send submissions via email and it saves the submissions to the database by default. 
* doesn't mess with your code. The markup you enter to the form is exactly what you get when the form renders, no extra paragraph tags. 
* has built-in Polylang support that makes forms multilingual using placeholder tags. 
* allows you to run code after form submission (trigger a file download, view change, whatever you want to do based on the response, that is fully customizable.  

## Where it falls short? 
As forms are pure HTML (shortcodes and placeholders exist though) most clients can't edit the forms. You might get away with clients maintaining forms by themselves if you provide them with many element samples and strict instructions. 

_But_ there is a form builder in the making for it. It will follow the same principle and should be very developer friendly. You as a developer can creat fields directly from plugin or theme code. Those fields will then render as drag and drop form builder that your average Joe should be able to use.

## F.A.Q
### Can it do "multipage" forms? 
Absolutely. You just create the markup and use JavaScript to turn that markup into a multipage form. There is no "save" functionality for submissions out of the box, but such thing should be easy to implement. 

Code samples coming sometime soon. 

### Is it any good with React? 
YES. Your new best friend: react-html-parser. You can rip the form apart in a few lines of code and supercharge your forms with React.

### What can I do with it?
Depends on how insane you are. Legends tell of a developer that used it to bypass WooCommerce checkout process and send e-cards. Using multipage forms. Important parts of the source code consist of a few hundred lines of code, and are filled with hooks. If you think you need another hook, implement it and contribute it back! 
