# Tedbin
Tedbin - Template Data Binding with Bracket Notation - Working Title

JavaScript library for client side data binding to html templates with brackets notation.

<span style="font-weight: bold">Example</span>

Given an html template, with the following markup:

&lt;div&gt;{{address.streetNumber}} {{address.streetName}}&lt;div&gt;
  
When bound with:

{ address: { 
             streetName: 'Oxford Street',
             streetNumber: 100 }
}

Will result in:

&lt;div&gt;100 Oxford Street&lt;div&gt;

Or rendered as:

100 Oxford Street
