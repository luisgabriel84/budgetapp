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

    var calculateTotal = function(type){
            var sum = 0;
            data.allItems[type].forEach(function(curr){
                sum = sum +curr.value; 
            });

            data.totals[type] = sum;
    };

    var data = {
        allItems:{
            exp:[],
            inc:[],
        },
        totals :{
            exp:0,
            inc:0
        },
        budget:0,
        percentage:-1
    };


    return {
        addItem: function(type, des, val){

            var newItem, ID;
            ID = 0;

            //create new id
            if(data.allItems[type].length>0){
                ID = data.allItems[type][data.allItems[type].length -1].id + 1;
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
        calculateBudget: function(){
            //calculate total income and expenses

            calculateTotal('exp');
            calculateTotal('inc');
           

            //calculate the bugdet 
            data.budget = data.totals.inc - data.totals.exp;


            if(data.totals.inc > 0){
                //calculate the percentage of income that we spent
                data.percentage = Math.round((data.totals.exp / data.totals.inc ) * 100);
            }else{
                data.percentage =-1;
            }

        },
        getBudget: function(){
            return {
                budget: data.budget,
                totalInc : data.totals.inc,
                totalExp : data.totals.exp,
                percentage: data.percentage
            };
        }
        ,
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
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage'
    }
    
    return {
        getInput: function(){
            return{
                type: document.querySelector(DOMStrings.inputType).value, //inc or exp
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: parseFloat( document.querySelector(DOMStrings.inputValue).value),
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

        displayBudget:function(obj){

           
            document.querySelector(DOMStrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMStrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMStrings.expenseLabel).textContent = obj.totalExp;
           
        
            if(obj.percentage > 0){
                document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + "%";
            }else{
                document.querySelector(DOMStrings.percentageLabel).textContent =  "---";
            }
        }
        ,
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

            if(event.keyCode==13 && event.which ==13){
                ctlrAddItem();
            }
            
        });
    }

    var updateBudget= function(){

        budgetCtrl.calculateBudget();
        var budget = budgetCtrl.getBudget();

        console.log(budget);

        UICtrl.displayBudget(budget);

    }

    var ctlrAddItem = function(){
       var input, newItem;
       input = UICtrl.getInput();

       if( input.description !== '' && !isNaN(input.value) && input.value > 0){
        newItem =  budgetController.addItem(input.type, input.description,input.value);
        UICtrl.addListItem(newItem, input.type);
        UICtrl.clearFields();
        updateBudget();
       }

    };

    return {
        init: function(){
            console.log('Application started');
            UICtrl.displayBudget( {
                budget: 0,
                totalInc : 0,
                totalExp : 0,
                percentage: -1
            });
            setupEventListeners();
        }
    }


    


})(budgetController ,UIcontroller);

controller.init();