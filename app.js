var budgetController = (function(){

    //Function constructor
    var Expense =  function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    }

    //Function constructor
    var Income =  function(id, description, value){
            this.id = id;
            this.description = description;
            this.value = value;
    }

    var data = {
        allItems:{
            exp:[],
            inc:[],
        },
        totals :{
            exp:0,
            inc:0
        }
    }


    return {
        addItem: function(type, des, val){

            var newItem, ID;
            ID = 0;

            //create new id
            if(data.allItems[type].lenght>0){
                ID = data.allItems[type][data.allItems[type].lenght -1].id + 1;
            }else{
                ID = 0;
            }
            // create new item
            if(type ==='exp'){
                newItem = new Expense(ID, des, val);
            }else if(type ==='inc'){
                newItem = new Income(ID, des, val);
            }

            //push into data structure
            data.allItems[type].push(newItem);
            this.testing();

            return newItem;
           
        },

        testing: function(){
            console.log(data);
        }
    }

})();

    //Function constructor
    var Expense =  function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    }


var UIcontroller = (function(){

    var DOMStrings ={
        inputType : '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    }
    
    return {
        getInput: function(){
            return{
                type: document.querySelector(DOMStrings.inputType).value, //inc or exp
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).value,
            };
        },

        getDOMStrings: function(){
            return DOMStrings;
        }

    };

})();


//Global App controller
var controller = (function( budgetCtrl, UICtrl ){


    var setupEventListeners = function(){

        var DOM = UICtrl.getDOMStrings();
        document.querySelector(DOM.inputBtn).addEventListener('click',ctlrAddItem);
        document.addEventListener('keypress',function(event){

            if(event.keyCode==13){
            ctlrAddItem();
            }
            
        });
    }
   

    var ctlrAddItem = function(){
       var input, newItem;
       input = UICtrl.getInput();
       newItem =  budgetController.addItem(input.type, input.description,input.value);
    };

    return {
        init: function(){
            console.log('Application started');
            setupEventListeners();
        }
    }


    


})(budgetController ,UIcontroller);

controller.init();