//console.log('Hello');
//When the page first loads, the first text field should be in focus by default.
$('#name').focus();
//Include a text field that will be revealed when the "Other" option is selected from the "Job Role" drop down menu.
$('#other-title').hide();
$('#title').change(function() {
    if ($(this).val() === 'other') {
        $('#other-title').show();
    } else {
        $('#other-title').hide();
    }
});
/*...
When the form is initially loaded, we need to update the "Design" and "Color" fields so that it's
clear to the user that they need to select a theme before selecting a color. Use jQuery to:
● Hide the “Select Theme” `option` element in the “Design” menu.
● Update the “Color” field to read “Please select a T-shirt theme”.
● Hide the colors in the “Color” drop down menu.
● NOTE: Be sure to check out the helpful links in the second section of this Study Guide if
you’re unsure of how to accomplish these steps.

...*/
$('#design').find("option").eq(0).hide();
$('#colors-js-puns label').text("Please select a T-shirt theme.");
$('#color').hide();

$('#design').change(function() {
    $('#colors-js-puns label').text("Color");
    $('#color').show();
    //$(this).find("option").eq(0).hide();
    if ($(this).val() === 'js puns') {
        $('#color option').eq(0).attr('selected', true);
        $("#color > option").each(function() {
            if (this.text.toLowerCase().indexOf("js puns")>=0){
                $(this).show();
            } else {
                $(this).hide();
            }
            
        });
    } else if ($(this).val() === 'heart js'){
        $('#color option').eq(3).attr('selected', true);
        $("#color > option").each(function() {
            if (this.text.toLowerCase().indexOf("js puns")>=0){
                $(this).hide();
            } else {
                $(this).show();
            }
            
        });
    }
});
