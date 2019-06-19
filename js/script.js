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
//create a variable so I can store the value of the total checked conferences 
let totalCost = 0;
//create a new element to show the total and add it to 'activities' div
const labelTotalCost = document.createElement('label');
labelTotalCost.className = 'totalCost';
labelTotalCost.innerText='Total: $0';
$('.activities').append(labelTotalCost);

//calculate the total adding when the course is checked and subtrackting if it's unchecked
//I'm not able to do it using 'this' so I'll use 'e' and 'e.target'
$('.activities').change(function(e) {
    //get the text of the label
    const actInput=$(e.target).parent().text();
    let cost;
    let dateTime;
     //get the cost of the course and add it to the total
        //I solved like this first time
        //totalCost += parseInt(actInput.split('$').pop());
        //Then, when I learnt how to slice the date and time I used a regex for this one too
        const regexCost = /\$(\d+)$/;

        actInput.match(regexCost);
        cost = RegExp.$1;
        //console.log(cost);
        

        //take the date and time substring
        const regexDate = /—([\w\d- ]+),/;
        actInput.match(regexDate);
        dateTime = RegExp.$1;
        //console.log(dateTime);
    if (e.target.checked){
        event.preventDefault();
        totalCost += parseInt(cost);
               //console.log(totalCost);
        //check if there is another activity same day at the same time
        $('.activities label').each(function(index,element){
            if ($(element).text().indexOf(dateTime)>=0){
                //console.log('match' + $(element).text());
                $(element).children().attr('disabled', true);
                //css style
                $(element).addClass('disabledActivity');
                //I have to add this so the checked activity won't be disabled
                $(e.target).attr('disabled', false);
                $(e.target).parent().removeClass('disabledActivity');
            }
        });
    } else if (e.target.checked === false ){
        event.preventDefault();
        //get the cost of the course and add it to the total
        totalCost -= parseInt(cost);
        //console.log(totalCost);
        //check if there is another activity same day at the same time
        $('.activities label').each(function(index,element){
            if ($(element).text().indexOf(dateTime)>=0){
                //console.log('match' + $(element).text());
                $(element).children().attr('disabled', false);
                $(element).removeClass('disabledActivity');
            }
        });

    }
    labelTotalCost.innerText='Total: $'+totalCost;
});

//PAYMENT
//hide the first option
$('#payment option:first').attr('hidden', true);

//credit card as default option, and hide the rest
$('option[value="credit card"]').attr('selected', true);
$('#credit-card').next().attr('hidden', true);
$('#credit-card').next().next().attr('hidden', true);

//event on payment selection change
$('#payment').on('change', (e) => {
    //this variable stores the payment option
    const paymentOp= $('#payment option:selected').attr('value');
    //console.log(payment);
    //show/hide div according to the selected option
    if (paymentOp === 'credit card'){
        $('#credit-card').attr('hidden', false);
        $('#credit-card').next().attr('hidden', true);
        $('#credit-card').next().next().attr('hidden', true);
    } else if (paymentOp ==='paypal'){
        $('#credit-card').attr('hidden', true);
        $('#credit-card').next().attr('hidden', false);
        $('#credit-card').next().next().attr('hidden', true);
    } else {
        $('#credit-card').attr('hidden', true);
        $('#credit-card').next().attr('hidden', true);
        $('#credit-card').next().next().attr('hidden', false);
    }
});

//FORM VALIDATION
 
 const name = $('#name');
 const mail = $('#mail');
 const activity = $('.activities legend');
 const creditCard = $('#cc-num');
 const zipCode = $('#zip');
 const cvv = $('#cvv');

 
 //validation functions
 function isValidName(username) {
     return /^[a-zA-Z- ]+$/.test(username);
 }
 // Must be a valid email address
function isValidEmail(email) {
    return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
  }
 function isValidCreditCard(number) {
     return /^\d{13,16}$/.test(number);
 }
 function isValidZip(number) {
     return /^\d{5}$/.test(number);
 }
 function isValidCVV(number) {
     return /^\d{3}$/.test(number);
 }
 //count all the checked activities
 function isCheckedActivity() {  
    let actBool = false;
    $('.activities label input').each(function(){
        if (this.checked){
            actBool = true;
            //console.log('checked');
        }
    });
    //console.log(actBool)
    return actBool;
}
 
 
 //when the register button is clicked, check validation of all the input section
 $('form').on('submit', (e) => {
     //same logic for all of them if the validation is not correct, show in red the input and preventDefault
     //If it's correct take the red off by removing the css class
     //Some function is a better solution to avoid the DRY, but I'm running out of time...
    //name
     if (!isValidName(name.val())){
        //console.log('invalid name');
        name.addClass('nonValidatedInput');
        e.preventDefault();
     }else{
        name.removeClass('nonValidatedInput');
     }
     //email
     if (!isValidEmail(mail.val())){
       mail.addClass('nonValidatedInput');
       e.preventDefault();
    }else{
       mail.removeClass('nonValidatedInput');
    }
    //activities
     if(!isCheckedActivity()) {
        activity.addClass('nonValidatedText');
        e.preventDefault();
    } else {
       activity.removeClass('nonValidatedText');
    }
    const paymentOp= $('#payment option:selected').attr('value');
    //we only have to check the credit card data if the option is credit card
    if (paymentOp === 'credit card'){
    //credit card number
        if (!isValidCreditCard(creditCard.val())){
            //console.log('invalid name');
            creditCard.addClass('nonValidatedInput');
            e.preventDefault();
        }else{
            creditCard.removeClass('nonValidatedInput');
        }
        //zipCode
        if (!isValidZip(zipCode.val())){
            zipCode.addClass('nonValidatedInput');
        e.preventDefault();
        }else{
            zipCode.removeClass('nonValidatedInput');
        }
        //cvv
        if (!isValidCVV(cvv.val())){
            cvv.addClass('nonValidatedInput');
            e.preventDefault();
        }else{
            cvv.removeClass('nonValidatedInput');
        }
    }
 });
 
 //Real-time Error Message
 mail.on('input', (e) => {
    if (!isValidEmail(mail.val())){
        mail.addClass('nonValidatedInput');
        e.preventDefault();
     }else{
        mail.removeClass('nonValidatedInput');
     }
 });