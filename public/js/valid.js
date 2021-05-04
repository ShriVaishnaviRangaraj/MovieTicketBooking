var x=document.getElementById("login");
        var y=document.getElementById("register");
        var z=document.getElementById("btn");
        
        function register()
        {
        x.style.left="-400px";
        y.style.left="50px";
        z.style.left="110px";
        }
        function login()
        {
        x.style.left="50px";
        y.style.left="450px";
        z.style.left="0px";
        }

        function CustomValidation(input) {
            this.invalidities = [];
            this.validityChecks = [];
            this.inputNode = input;
            this.registerListener();
        }
        
        CustomValidation.prototype = {
            addInvalidity: function(message) {
                this.invalidities.push(message);
            },
            getInvalidities: function() {
                return this.invalidities.join('. \n');
            },
            checkValidity: function(input) {
                for ( var i = 0; i < this.validityChecks.length; i++ ) {
        
                    var isInvalid = this.validityChecks[i].isInvalid(input);
                    if (isInvalid) {
                        this.addInvalidity(this.validityChecks[i].invalidityMessage);
                    }
        
                    var requirementElement = this.validityChecks[i].element;
        
                    if (requirementElement) {
                        if (isInvalid) {
                            requirementElement.classList.add('invalid');
                            requirementElement.classList.remove('valid');
                        } else {
                            requirementElement.classList.remove('invalid');
                            requirementElement.classList.add('valid');
                        }
        
                    }
                }
            },
            checkInput: function() {
        
                this.inputNode.CustomValidation.invalidities = [];
                this.checkValidity(this.inputNode);
        
                if ( this.inputNode.CustomValidation.invalidities.length === 0 && this.inputNode.value !== '' ) {
                    this.inputNode.setCustomValidity('');
                } else {
                    var message = this.inputNode.CustomValidation.getInvalidities();
                    this.inputNode.setCustomValidity(message);
                }
            },
            registerListener: function() { 
        
                var CustomValidation = this;
        
                this.inputNode.addEventListener('keyup', function() {
                    CustomValidation.checkInput();
                });
        
        
            }
        
        };
        
        var nameValidityChecks = [
            {
                isInvalid: function(input) {
                    return input.value.length < 3;
                },
                invalidityMessage: 'This input needs to be at least 3 characters',
                element: document.querySelector('label[for="name"] .input-requirements li:nth-child(1)')
            },
            {
                isInvalid: function(input) {
                    var illegalCharacters = input.value.match("[^a-zA-Z]");
                    return illegalCharacters ? true : false;
                },
                invalidityMessage: 'Only letters are allowed',
                element: document.querySelector('label[for="name"] .input-requirements li:nth-child(2)')
            }
        ];
        
        var emailValidityChecks = [
            {
                isInvalid: function(input) {
                    return !input.value.match("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$");
                },
                invalidityMessage: 'This input needs to be a valid email address',
                element: document.querySelector('label[for="email"] .input-requirements li:nth-child(1)')
            }
        ];
        
        var passwordValidityChecks = [
            {
                isInvalid: function(input) {
                    return input.value.length < 8 | input.value.length > 20;
                },
                invalidityMessage: 'This input needs to be between 8 and 20 characters',
                element: document.querySelector('label[for="password"] .input-requirements li:nth-child(1)')
            },
            {
                isInvalid: function(input) {
                    return !input.value.match(/[0-9]/g);
                },
                invalidityMessage: 'At least 1 number is required',
                element: document.querySelector('label[for="password"] .input-requirements li:nth-child(2)')
            },
            {
                isInvalid: function(input) {
                    return !input.value.match(/[a-z]/g);
                },
                invalidityMessage: 'At least 1 lowercase letter is required',
                element: document.querySelector('label[for="password"] .input-requirements li:nth-child(3)')
            },
            {
                isInvalid: function(input) {
                    return !input.value.match(/[A-Z]/g);
                },
                invalidityMessage: 'At least 1 uppercase letter is required',
                element: document.querySelector('label[for="password"] .input-requirements li:nth-child(4)')
            },
            {
                isInvalid: function(input) {
                    return !input.value.match(/[\!\@\#\$\%\^\&\*]/g);
                },
                invalidityMessage: 'You need one of the required special characters',
                element: document.querySelector('label[for="password"] .input-requirements li:nth-child(5)')
            }
        ];
        
        
        var nameInput = document.getElementById('name');
        var mailInput = document.getElementById('email');
        var passwordInput = document.getElementById('password');
        
        nameInput.CustomValidation = new CustomValidation(nameInput);
        nameInput.CustomValidation.validityChecks = nameValidityChecks;
        
        mailInput.CustomValidation = new CustomValidation(mailInput);
        mailInput.CustomValidation.validityChecks = emailValidityChecks;
        
        
        
        passwordInput.CustomValidation = new CustomValidation(passwordInput);
        passwordInput.CustomValidation.validityChecks = passwordValidityChecks;
        
        
        
        var inputs = document.querySelectorAll('input:not([type="submit"])');
        var submit = document.querySelector('input[type="submit"');
        var form = document.getElementById('registration');
        
        function validate() {
            for (var i = 0; i < inputs.length; i++) {
                inputs[i].CustomValidation.checkInput();
            }
        }
        function confirmdetails()
		{
			mail=document.getElementById("mail1").value;
			pass1=document.getElementById("pass1").value;
			if(mail=="" || pass1=="")
			{
				alert("Fill All The Fields...");
			}
        }
        
        // submit.addEventListener('click', validate);
        // form.addEventListener('submit', validate);
        // function validate()
        //     {
        //         if(document.getElementById("male").checked==false && document.getElementById("female").checked==false && document.getElementById("other").checked==false)
        //         {
        //             alert("Select Gender...");
        //             return false;
        //         }
        //     }