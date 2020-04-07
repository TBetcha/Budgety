var budgetController = (function () {
    //function constructor cap letter in beginning
    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var allExpenses = [];
    var allIncome = [];
    var totalExpenses = 0;

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };

    return {
        addItem: function (type, des, val) {
            var newItem;

            //create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            //create new Item based on inc or exp
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            //push it into new data structure
            data.allItems[type].push(newItem);
            //return new item
            return newItem;
        },
        testing: function () {
            console.log(data);
        }
    };
})();


//UI Controller
var UIController = (function () {

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'
    };

    return {
        getinput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // will be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },
        addListItem: function (obj, type) {
            var html, newHtml, element;
            //create HTML string with placeholder text
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;

                html = '<div class="item clearfix" id="income-%id%"><div' +
                    ' class="item__description">%description%</div><div' +
                    ' class="right' +
                    ' clearfix"><div class="item__value">+' +
                    ' %value%</div><div class="item__delete"><button' +
                    ' class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;

                html = '<div class="item clearfix" id="expense-%id%"><div' +
                    ' class="item__description">%description%</div><div' +
                    ' class="right clearfix"><div class="item__value">-' +
                    ' %value%</div><div' +
                    ' class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            //replace placeholder text with data from obj
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            //insert HTML into DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

        },
        getDOMstrings: function () {
            return DOMstrings;
        }
    };

})();


//GLOBAL APP CONTROLLER
var controller = (function (budgetController, UIController) {

    var setUpEventListeners = function () {
        var DOM = UIController.getDOMstrings();
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {

            //which is antiquated but some browsers still use it
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    };


    var ctrlAddItem = function () {
        var input, newItem;

        //1. Get the field input data
        var input = UIController.getinput();
        console.log(input);

        //2. Add the item to the budget controller
        var newItem = budgetController.addItem(input.type, input.description, input.value);

        //3. Add the item to the UI
        UIController.addListItem(newItem, input.type);

        //4. Calculate the budget

        //5. Display the budget

    };

    return {
        init: function () {
            console.log('Application has started');
            setUpEventListeners();
        }
    }

})(budgetController,UIController);

controller.init();