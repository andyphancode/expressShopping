const items = require("./fakeDb");

class Item {
    constructor(name, price) {
        this.name = name;
        this.price= price;
        items.push(this);
    }

    static find(name) {
        const foundItem = items.find(i => i.name === name);
        if (foundItem === undefined) {
            throw { message: "NotFound", status: 404 };
        }
        return foundItem;
    }

    static findAll(){
        return items;
    }

    static remove(name) {
        let index = items.findIndex(i => i.name === name);
        if (index === -1) { 
            throw { message: "NotFound", status: 404 }
        }
        items.splice(index, 1);
    }

    static update(name, body) {
        let foundItem = Item.find(name);
        if (!foundItem) {
            throw { message: "NotFound", status: 404 }
        }
        foundItem.name = body.name;
        foundItem.price = body.price;

        return foundItem;
    }
}

module.exports = Item;