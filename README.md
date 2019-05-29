# Input Type Setter

Mendix Text Box widget always sets `input.type` to `"text"` (or `password` for Hashed strings). This widget fixes this issue by setting it to `"number"` for **numeric fields** (of type Integer, Long and Decimal).

You can also set **any** other `type` (or other attributes) value of `input` tags using CSS classes like `"set-type-email"` or `"set-min-0"`.

Additionally, it fixes another issue with missing `label.for="{related-input.id}"` in horizontal form orientation.

## Typical usage scenario

It's useful especially for [mobile applications where keyboard type depends](http://mobileinputtypes.com/) on `input.type`, e.g.:
- **numeric keyboard** for `input.type="number"`
- **phone keyboard** for `input.type="tel"`
- **email keyboard** (with `@` and `.com` keys) for `input.type="email"`
- **url keyboard** (with `/` and `.com` keys) for `input.type="url"`


## Usage

Place the widget on your form page and provide the first settings:
- **Widgets selector**: Selector of widget elements wrapping input tags to change.
  - Default setting affects all Text Box widgets: `"div.form-group[class*=mx-name-textBox]"`.
  - You can e.g. extend it for other widgets by removing "class begins with" extension: `"div.form-group"`

This setting alone is enough for changing `input.type` to `"number"` for **numeric fields** (of type Integer, Long and Decimal).

If you need to use other `input.type` (e.g. `"email"` or `"phone"`) or to set other attributes (e.g. `min`, `max`, `step` that make sense for `"number"` and `"range"` inputs), **add special CSS classes to related input widgets**. The class name format is:
```
[<prefix>]<attributeName><separator><value>
```
The `<prefix>` is optional, so it may be omitted:
```
<attributeName><separator><value>
```
And configure two further settings:
- **CSS classes prefix** for `<prefix>`,
- **Parts separator** for `<separator>`.

By default, `<prefix>` is `"set-"` and `<separator>` is `"-"`, so for example:
- using class `"set-type-email"` will set attribute `type` to `"email"`
- using class `"set-min-0"` will set attribute `min` to `"0"`.
