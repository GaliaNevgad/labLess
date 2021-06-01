var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//Базовый класс
var Product = /** @class */ (function () {
    function Product(id, name, price, description, inStock) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.inStock = inStock;
    }
    //Инициализация карточки
    Product.prototype.Init = function () {
        var h5 = document.createElement("h5");
        h5.setAttribute("class", "card-title");
        h5.innerHTML = this.name;
        var divprice = document.createElement("div");
        divprice.setAttribute("class", "col-6 p-0 text-primary font-weight-bold");
        divprice.innerHTML = this.price + " грн.";
        var divavail = document.createElement("div");
        if (this.IsAvailable()) {
            divavail.setAttribute("class", "col-6 p-0 text-right text-success");
            divavail.innerHTML = "Есть в наличии";
        }
        else {
            divavail.setAttribute("class", "col-6 p-0 text-right text-danger");
            divavail.innerHTML = "Нет в наличии";
        }
        var divrow = document.createElement("div");
        divrow.setAttribute("class", "row");
        divrow.appendChild(divprice);
        divrow.appendChild(divavail);
        var divcon = document.createElement("div");
        divcon.setAttribute("class", "container");
        divcon.appendChild(divrow);
        var p = document.createElement("p");
        p.setAttribute("class", "card-text");
        p.innerHTML = this.description;
        var a = document.createElement("a");
        a.setAttribute("id", this.id.toString());
        a.setAttribute("href", "#buyModal");
        a.setAttribute("class", "btn btn-primary");
        a.setAttribute("data-toggle", "modal");
        a.setAttribute("onclick", "WantBuy(this.id)");
        a.innerHTML = "Купить";
        var divfu = document.createElement("div");
        divfu.setAttribute("class", "card-footer");
        divfu.appendChild(a);
        var divcardb = document.createElement("div");
        divcardb.setAttribute("class", "card-body mh-100");
        divcardb.setAttribute("style", "height: 200px");
        divcardb.appendChild(h5);
        divcardb.appendChild(divcon);
        divcardb.appendChild(p);
        var divcard = document.createElement("div");
        divcard.setAttribute("class", "card");
        divcard.appendChild(divcardb);
        divcard.appendChild(divfu);
        var divcol = document.createElement("div");
        divcol.setAttribute("class", "col-md-6 col-xl-4 p-1");
        divcol.appendChild(divcard);
        return divcol;
    };
    //Добавление карточки в строку
    Product.prototype.Embed = function (obj) {
        var prods = document.getElementById('rowts');
        prods.appendChild(obj);
    };
    //Определение есть ли товар в наличии
    Product.prototype.IsAvailable = function () {
        return (this.inStock > 0) ? true : false;
    };
    return Product;
}());
//Перечисление доступных цветов
var Color;
(function (Color) {
    Color["Black"] = "\u0427\u0451\u0440\u043D\u044B\u0439";
    Color["Gray"] = "\u0421\u0435\u0440\u044B\u0439";
    Color["Pink"] = "\u0420\u043E\u0437\u043E\u0432\u044B\u0439";
})(Color || (Color = {}));
;
//Класс со сложными особенностями
var FeltBoots = /** @class */ (function (_super) {
    __extends(FeltBoots, _super);
    function FeltBoots(id, name, price, description, inStock, list) {
        var _this = _super.call(this, id, name, price, description, inStock) || this;
        _this.id = id;
        _this.name = name;
        _this.price = price;
        _this.description = description;
        _this.inStock = inStock;
        _this.list = list;
        _this.CalculateFlags();
        _this.Init();
        return _this;
    }
    FeltBoots.prototype.Init = function () {
        var obj = _super.prototype.Init.call(this);
        //Если есть большие размеры, то добавляем информацию об этом в карточку
        if (this.isBigSizes) {
            var p = document.createElement("p");
            p.setAttribute("class", "card-text text-info m-0");
            p.innerHTML = "Есть большие размеры";
            obj.firstChild.firstChild.insertBefore(p, obj.firstChild.firstChild.childNodes[2]);
        }
        //Если есть информация о цвете, то добавляем её в карточку
        if (this.haveColors.length > 0) {
            var p = document.createElement("p");
            p.setAttribute("class", "card-text text-info m-0");
            var str = this.haveColors[0];
            for (var i = 1; i < this.haveColors.length; i++) {
                str += ", " + this.haveColors[i];
            }
            p.innerHTML = "Есть цвета: " + str;
            obj.firstChild.firstChild.insertBefore(p, obj.firstChild.firstChild.childNodes[2]);
        }
        this.Embed(obj);
    };
    //Вычисление сложных особенностей
    FeltBoots.prototype.CalculateFlags = function () {
        //Поиск больших размеров
        this.isBigSizes = false;
        if (this.list != null)
            for (var i = 0; i < this.list.length; i++)
                if (this.list[i].dimension > 43 && this.list[i].quantity > 0) {
                    this.isBigSizes = true;
                    break;
                }
        //Поиск доступных цветов
        var k = 0;
        this.haveColors = [];
        if (this.list != null)
            for (var i = 0; i < this.list.length; i++)
                if (this.haveColors.indexOf(this.list[i].color) == -1)
                    this.haveColors[k++] = this.list[i].color;
    };
    return FeltBoots;
}(Product));
//Класс с группировкой
var Headphones = /** @class */ (function (_super) {
    __extends(Headphones, _super);
    function Headphones(id, name, price, description, inStock, isWireless) {
        var _this = _super.call(this, id, name, price, description, inStock) || this;
        _this.id = id;
        _this.name = name;
        _this.price = price;
        _this.description = description;
        _this.inStock = inStock;
        _this.isWireless = isWireless;
        _this.Init();
        return _this;
    }
    Headphones.prototype.Init = function () {
        var obj = _super.prototype.Init.call(this);
        //Если наушники беспроводные, то добавляем информацию об этом в карточку
        if (this.isWireless) {
            var p = document.createElement("p");
            p.setAttribute("class", "card-text text-info m-0");
            p.innerHTML = "Беспроводные";
            obj.firstChild.firstChild.insertBefore(p, obj.firstChild.firstChild.childNodes[2]);
        }
        //Если эти конкретные наушники беспроводные и нет чекбокса группировки, то добавляем его
        if (document.getElementById('isWireless') == null && this.isWireless != null && this.isWireless) {
            var inp = document.createElement("input");
            inp.setAttribute("type", "checkbox");
            inp.setAttribute("id", "isWireless");
            inp.setAttribute("onclick", "CheckWireless(this.checked)");
            var lab = document.createElement("p");
            lab.appendChild(inp);
            lab.innerHTML += "Только беспроводные<br>";
            var div = document.getElementById('myTools');
            div.appendChild(lab);
        }
        this.Embed(obj);
    };
    return Headphones;
}(Product));
//Группировка по беспроводным наушникам
function CheckWireless(flag) {
    document.getElementById('rowts').innerHTML = "";
    if (flag) {
        for (var i = 0; i < this.productList.length; i++)
            if (productList[i] instanceof Headphones && productList[i].isWireless)
                productList[i].Init();
    }
    else {
        for (var i = 0; i < this.productList.length; i++)
            productList[i].Init();
    }
}
//Класс пока не имеющий отличий от базового
var Balalaika = /** @class */ (function (_super) {
    __extends(Balalaika, _super);
    function Balalaika(id, name, price, description, inStock) {
        var _this = _super.call(this, id, name, price, description, inStock) || this;
        _this.id = id;
        _this.name = name;
        _this.price = price;
        _this.description = description;
        _this.inStock = inStock;
        _this.Init();
        return _this;
    }
    Balalaika.prototype.Init = function () {
        this.Embed(_super.prototype.Init.call(this));
    };
    return Balalaika;
}(Product));
//----------------------------------
var Material;
(function (Material) {
    Material["Nail"] = "\u0418\u0433\u043E\u043B\u043E\u0447\u043A\u0438";
    Material["Fether"] = "\u041F\u0435\u0440\u044C\u044F";
    Material["BrokenGlass"] = "\u0411\u0438\u0442\u043E\u0435 \u0441\u0442\u0435\u043A\u043B\u043E";
})(Material || (Material = {}));
;
var Size;
(function (Size) {
    Size["XS"] = "\u041C\u0430\u043B\u044E\u0441\u0435\u043D\u044C\u043A\u0430\u044F";
    Size["S"] = "\u041D\u0443 \u0440\u0430\u0437\u043C\u0435\u0440 \u043D\u0435 \u0433\u043B\u0430\u0432\u043D\u043E\u0435";
    Size["M"] = "\u041D\u043E\u0440\u043C, \u043D\u043E \u043C\u043E\u0436\u043D\u043E \u0431\u043E\u043B\u044C\u0448\u0435";
    Size["L"] = "\u041F\u043E\u0440\u044F\u0434\u043E\u043A";
    Size["XL"] = "\u0426\u0430\u0440\u0441\u043A\u0430\u044F";
    Size["XXL"] = "\u041C\u0430\u0442\u0440\u0430\u0441";
})(Size || (Size = {}));
;
var Pilow = /** @class */ (function (_super) {
    __extends(Pilow, _super);
    function Pilow(id, name, price, description, inStock, material, size) {
        var _this = _super.call(this, id, name, price, description, inStock) || this;
        _this.id = id;
        _this.name = name;
        _this.price = price;
        _this.description = description;
        _this.inStock = inStock;
        _this.material = material;
        _this.size = size;
        _this.Init();
        return _this;
    }
    Pilow.prototype.Init = function () {
        var obj = _super.prototype.Init.call(this);
        //Материал
        var p = document.createElement("p");
        p.setAttribute("class", "card-text text-info m-0");
        p.innerHTML = "Материал: " + this.material.toLocaleLowerCase();
        obj.firstChild.firstChild.insertBefore(p, obj.firstChild.firstChild.childNodes[2]);
        p = document.createElement("p");
        p.setAttribute("class", "card-text text-info m-0");
        p.innerHTML = "Размер: " + this.size.toLocaleLowerCase();
        obj.firstChild.firstChild.insertBefore(p, obj.firstChild.firstChild.childNodes[2]);
        if (document.getElementById('isComfortable') == null) {
            var inp = document.createElement("input");
            inp.setAttribute("type", "checkbox");
            inp.setAttribute("id", "isComfortable");
            inp.setAttribute("onclick", "CheckMaterial(this.checked)");
            var lab = document.createElement("p");
            lab.appendChild(inp);
            lab.innerHTML += "Только удобные<br>";
            var div = document.getElementById('myTools');
            div.appendChild(lab);
        }
        this.Embed(obj);
    };
    return Pilow;
}(Product));
function CheckMaterial(flag) {
    document.getElementById('rowts').innerHTML = "";
    if (flag) {
        for (var i = 0; i < this.productList.length; i++)
            if (productList[i] instanceof Pilow && productList[i].material == Material.Fether)
                productList[i].Init();
    }
    else {
        for (var i = 0; i < this.productList.length; i++)
            productList[i].Init();
    }
}
var Phone = /** @class */ (function (_super) {
    __extends(Phone, _super);
    function Phone(id, name, price, description, inStock, isSmart) {
        var _this = _super.call(this, id, name, price, description, inStock) || this;
        _this.id = id;
        _this.name = name;
        _this.price = price;
        _this.description = description;
        _this.inStock = inStock;
        _this.isSmart = isSmart;
        _this.Init();
        return _this;
    }
    Phone.prototype.Init = function () {
        var obj = _super.prototype.Init.call(this);
        //Тип
        if (this.isSmart) {
            var p = document.createElement("p");
            p.setAttribute("class", "card-text text-info m-0");
            p.innerHTML = "Смартфон";
            obj.firstChild.firstChild.insertBefore(p, obj.firstChild.firstChild.childNodes[2]);
        }
        if (document.getElementById('isSmart') == null) {
            var inp = document.createElement("input");
            inp.setAttribute("type", "checkbox");
            inp.setAttribute("id", "isSmart");
            inp.setAttribute("onclick", "CheckSmart(this.checked)");
            var lab = document.createElement("p");
            lab.appendChild(inp);
            lab.innerHTML += "Только смартфоны<br>";
            var div = document.getElementById('myTools');
            div.appendChild(lab);
        }
        this.Embed(obj);
    };
    return Phone;
}(Product));
function CheckSmart(flag) {
    document.getElementById('rowts').innerHTML = "";
    if (flag) {
        for (var i = 0; i < this.productList.length; i++)
            if (productList[i] instanceof Phone && productList[i].isSmart)
                productList[i].Init();
    }
    else {
        for (var i = 0; i < this.productList.length; i++)
            productList[i].Init();
    }
}
var Basket = /** @class */ (function () {
    function Basket() {
        this.list = []; //Список товаров в корзине
    }
    //Добавить товар в корзину. Возвращает результат операции
    Basket.prototype.Add = function (val) {
        var num = +document.getElementById('inputquantity').value;
        //Проверка введенного количества товара. Если ввели ерунду, то выводится сообщение об ошибке. Иначе товар добавляется в корзину
        if (isNaN(num) || !((num ^ 0) === num) || num == 0 || productList[val].inStock < num) {
            if (productList[val].inStock < num)
                document.getElementById('modlalMessag').innerHTML = "Столько на складе нет";
            else
                document.getElementById('modlalMessag').innerHTML = "Введите целое число";
            return false;
        }
        else {
            document.getElementById('modlalMessag').innerHTML = "";
            productList[val].inStock -= num;
            this.list[this.list.length] = { id: val, quantity: num };
            this.CalculateBasket();
            return true;
        }
    };
    //Пересчитать товары в корзине
    Basket.prototype.CalculateBasket = function () {
        if (this.list.length > 0) {
            var id = void 0;
            var total = 0;
            var message = "В даннвй момент в корзине:<br>";
            for (var i = 0; i < this.list.length; i++) {
                this.list = uniqRecords(this.list);
                message += productList[this.list[i].id].name + " - " + this.list[i].quantity + "<br>";
                total += productList[this.list[i].id].price * this.list[i].quantity;
            }
            message += "<br><br>На общую сумму " + total + " грн.";
            document.getElementById('myBasket').innerHTML = message;
        }
        else
            document.getElementById('myBasket').innerHTML = "В данный момент корзина пустая";
    };
    return Basket;
}());
//Избегание повторений
function uniqRecords(list) {
    var newList = [];
    for (var i = 0; i < list.length; i++) {
        if (isContainsItem(newList, list[i].id)) {
            newList[findItemIndex(newList, list[i].id)].quantity += list[i].quantity;
        }
        else {
            newList.push(list[i]);
        }
    }
    return newList;
}
function isContainsItem(list, id) {
    for (var i = 0; i < list.length; i++) {
        if (list[i].id === id) {
            return true;
        }
    }
    return false;
}
function findItemIndex(list, id) {
    for (var i = 0; i < list.length; i++) {
        if (list[i].id === id) {
            return i;
        }
    }
}
//Действие на кнопке "добавить в корзину"
function myByBtn(val) {
    if (basket.Add(val))
        $('#buyModal').modal('hide');
}
//Действие на кнопке "купить"
function WantBuy(val) {
    document.getElementById('modlalBtn').setAttribute("value", val);
    document.getElementById('quantity').innerHTML = productList[val].inStock.toString();
}
//Инициализация корзины
var basket = new Basket();
//Список продуктов
var productList = [
    new Pilow(0, "Для себя любимого", 240.50, "Ну такая подушечка, прям ой какая", 20, Material.Fether, Size.XL),
    new Pilow(1, "Булочка с иголочками", 150, "Позавтракай сам, обед раздели с другом, а эту подушку отдай врагу", 5, Material.Nail, Size.M),
    new Pilow(2, "Мечта йога", 999.99, "Любой Индус душу бы продал за такую подушку", 6, Material.BrokenGlass, Size.S),
    new Phone(3, "Бабушкофон", 300.99, "Телефон на все времана. Таким и позвонить можно и дерево посадить, и дом построить, и сына воспитать", 4, false),
    new Phone(4, "Реальная мобила", 4800.99, "Ну мобила как мобила. Топ за свои бабки", 25, true),
    new Phone(5, "Ай-ай-ай какая цена", 35000.99, "Ну почки у тебя всё равно то две", 3, true),
];
