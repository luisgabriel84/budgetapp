var budgetController = (function(){

    //Function constructor
    var Expense =  function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    //Function constructor
    var Income =  function(id, description, value){
            this.id = id;
            this.description = description;
            this.value = value;
    };

    var data = {
        allItems:{
            exp:[],
            inc:[],
        },
        totals :{
            exp:0,
            inc:0
        }
    };


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
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
    }
    
    return {
        getInput: function(){
            return{
                type: document.querySelector(DOMStrings.inputType).value, //inc or exp
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).value,
            };
        },

        addListItem: function(obj, type){
            var html;
            if(type=='inc'){
                element =DOMStrings.incomeContainer;
                html ='<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }else if (type ==='exp'){
                element =DOMStrings.expensesContainer;
                html ='<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            
            newHtml = html.replace('%id%',obj.id);
            newHtml = newHtml.replace('%description%',obj.description);
            newHtml = newHtml.replace('%value%',obj.value);
            document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);
        },

        clearFields: function(){
            var fields, fieldsArr;
            fields = document.querySelectorAll( DOMStrings.inputDescription + ','+ DOMStrings.inputValue );

            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function(curr, index, arr){
                curr.value ="";
            });

            fieldsArr[0].focus();


        },
        getDOMStrings: function(){
            return DOMStrings;
        },
        getFields: function(){
            return clearFields();
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
       UICtrl.addListItem(newItem, input.type);
       UICtrl.clearFields();
    };

    return {
        init: function(){
            console.log('Application started');
            setupEventListeners();
        }
    }


    


})(budgetController ,UIcontroller);

controller.init();