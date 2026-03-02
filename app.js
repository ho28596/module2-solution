(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('AddItemController', AddItemController)
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

// Add Item - controller
ToBuyController.$inject = ['ShoppingListCheckOffService'];
function AddItemController(ShoppingListCheckOffService) {
  var input = this;

  input.inputName = "";
  input.inputQuantity = "";

  input.addItem = function () {
    ShoppingListCheckOffService.addItemToBuy(input.inputName, input.inputQuantity);
  }
}

// LIST #1 - controller
ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var list1 = this;

  list1.items = ShoppingListCheckOffService.getItemsToBuy();

  list1.removeItem = function (itemIndex) {
    ShoppingListCheckOffService.removeItemToBuy(itemIndex);
  };

  list1.buyItem = function (itemIndex) {
    ShoppingListCheckOffService.buyItem(itemIndex);
  };
  
  list1.checkEndItemToBuy = function () {
  	if (ShoppingListCheckOffService.getItemsToBuy().length == 0 && ShoppingListCheckOffService.getItemsBought().length > 0) {
		return true;
	} else {
		return false;
	}		
  };
  
}

// LIST #2 - controller
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var list2 = this;

  list2.items = ShoppingListCheckOffService.getItemsBought();

  list2.removeItem = function (itemIndex) {
    ShoppingListCheckOffService.removeItemBought(itemIndex);
  };
}

function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var itemsToBuy = [{name : 'cookie', quantity : 10},{name : 'chips', quantity : 5}];
  var itemsBought = [];

  service.addItemToBuy = function (itemName, itemQuantity) {
    var item = {
      name: itemName,
      quantity: itemQuantity
    };
    itemsToBuy.push(item);
  };

  service.buyItem = function (itemIndex) {
	itemsBought.push(itemsToBuy[itemIndex]);
	itemsToBuy.splice(itemIndex, 1);
  };

  service.removeItemToBuy = function (itemIndex) {
    itemsToBuy.splice(itemIndex, 1);
  };

  service.removeItemBought = function (itemIndex) {
	itemsToBuy.push(itemsBought[itemIndex]);  
    itemsBought.splice(itemIndex, 1);
  };

  service.getItemsToBuy = function () {
    return itemsToBuy;
  };
  
  service.getItemsBought = function () {
    return itemsBought;
  };
}

})();