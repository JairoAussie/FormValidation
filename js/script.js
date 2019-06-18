//When the page first loads, the first text field should be in focus by default.
$('#name').focus();
//Include a text field that will be revealed when the "Other" option is selected from the "Job Role" drop down menu.
$('#other-title').hide();
//Show/hide the input depending on 'other' is selected or not
$('#title').change(function() {
    if ($(this).val() === 'other') {
        $('#other-title').show();
    } else {
        $('#other-title').hide();
    }
});

//T-SHIRT SECTION

//Hide the “Select Theme” `option` element in the “Design” menu.
$('#design').find("option").eq(0).hide();
//Update the “Color” field to read “Please select a T-shirt theme”.
$('#colors-js-puns label').text("Please select a T-shirt theme.");
//Hide the colors in the “Color” drop down menu.
$('#color').hide();

//event that controls when a design option has been changed
$('#design').change(function() {
    //update color label and show the options
    $('#colors-js-puns label').text("Color");
    $('#color').show();
    //If JS Puns design is selected
    if ($(this).val() === 'js puns') {
        //Select the firts option
        $('#color option').eq(0).attr('selected', true);
        //iterate the options and ask if the text contains 'js puns', according to this answer hide or show the option
        $("#color option").each(function() {
            if (this.text.toLowerCase().indexOf("js puns")>=0){
                $(this).show();
            } else {
                $(this).hide();
            }
            
        });
    } //If Heart JS design is selected
    else if ($(this).val() === 'heart js'){
        //Tomato will be the selected option
        $('#color option').eq(3).attr('selected', true);
        //the same iteration but doing the opposite according to the contains 'js puns'.
        $("#color option").each(function() {
            if (this.text.toLowerCase().indexOf("js puns")>=0){
                $(this).hide();
            } else {
                $(this).show();
            }
            
        });
    }
});

//ACTIVITIES SECTION