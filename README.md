# Tedbin
Tedbin - Template Data Binding with Bracket Notation - Working Title

JavaScript library for client side data binding to html templates with brackets notation.

Example

Given an html template, with the following markup:

<div>{{address.streetNumber}} {{address.streetName}}<div>
  
When bound with:

{ address: { 
             streetName: 'Oxford Street',
             streetNumber: 100 }
}

Will result in:

<div>100 Oxford Street<div>

