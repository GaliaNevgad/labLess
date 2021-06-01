//Базовый класс
class Product {
    constructor(protected id: number, public name: string, public price: number, public description: string, public inStock: number) {
        
    }

    //Инициализация карточки
    Init(): any {
        let h5 = document.createElement("h5");
        h5.setAttribute("class", "card-title");
        h5.innerHTML = this.name;

        let divprice = document.createElement("div");
        divprice.setAttribute("class", "col-6 p-0 text-primary font-weight-bold");
        divprice.innerHTML = this.price + " грн.";

        let divavail = document.createElement("div");
        if (this.IsAvailable()) {
            divavail.setAttribute("class", "col-6 p-0 text-right text-success");
            divavail.innerHTML = "Есть в наличии";
        }
        else {
            divavail.setAttribute("class", "col-6 p-0 text-right text-danger");
            divavail.innerHTML = "Нет в наличии";
        }

        let divrow = document.createElement("div");
        divrow.setAttribute("class", "row");
        divrow.appendChild(divprice);
        divrow.appendChild(divavail);

        let divcon = document.createElement("div");
        divcon.setAttribute("class", "container");
        divcon.appendChild(divrow);

        let p = document.createElement("p");
        p.setAttribute("class", "card-text");
        p.innerHTML = this.description;

        let a = document.createElement("a");
        a.setAttribute("id", this.id.toString());
        a.setAttribute("href", "#buyModal");
        a.setAttribute("class", "btn btn-primary");
        a.setAttribute("data-toggle", "modal");
        a.setAttribute("onclick", "WantBuy(this.id)");
        a.innerHTML = "Купить";

        let divfu = document.createElement("div");
        divfu.setAttribute("class", "card-footer");
        divfu.appendChild(a);

        let divcardb = document.createElement("div");
        divcardb.setAttribute("class", "card-body mh-100");
        divcardb.setAttribute("style", "height: 200px");
        divcardb.appendChild(h5);
        divcardb.appendChild(divcon);
        divcardb.appendChild(p);

        let divcard = document.createElement("div");
        divcard.setAttribute("class", "card");
        divcard.appendChild(divcardb);
        divcard.appendChild(divfu);

        let divcol = document.createElement("div");
        divcol.setAttribute("class", "col-md-6 col-xl-4 p-1");
        divcol.appendChild(divcard);

        return divcol;
    }

    //Добавление карточки в строку
    protected Embed(obj: any) {
        let prods = document.getElementById('rowts');
        prods.appendChild(obj);
    }

    //Определение есть ли товар в наличии
	IsAvailable(): boolean {
        return (this.inStock > 0) ? true : false;
    }
}

//Перечисление доступных цветов
enum Color { Black = "Чёрный", Gray = "Серый", Pink = "Розовый" };

interface Shoes {
    dimension: number; //размер
    color: Color; //цвет
    quantity: number; //количество
}

//Класс со сложными особенностями
class FeltBoots extends Product {
    isBigSizes: boolean; //Есть большие размеры
    haveColors: string[]; //Цвета которые есть
    constructor(protected id: number, public name: string, public price: number, public description: string, public inStock: number, public list?:Shoes[]) {
        super(id, name, price, description, inStock); 
        this.CalculateFlags();
        this.Init();
    }

    Init() {
        let obj = super.Init();
        
        //Если есть большие размеры, то добавляем информацию об этом в карточку
        if (this.isBigSizes) {
            let p = document.createElement("p");
            p.setAttribute("class", "card-text text-info m-0");
            p.innerHTML = "Есть большие размеры";
            obj.firstChild.firstChild.insertBefore(p, obj.firstChild.firstChild.childNodes[2]);
        }

        //Если есть информация о цвете, то добавляем её в карточку
        if (this.haveColors.length > 0) {
            let p = document.createElement("p");
            p.setAttribute("class", "card-text text-info m-0");
            let str = this.haveColors[0];
            for (let i = 1; i < this.haveColors.length; i++) {
                str += ", " + this.haveColors[i];
            }
            p.innerHTML = "Есть цвета: " + str;
            obj.firstChild.firstChild.insertBefore(p, obj.firstChild.firstChild.childNodes[2]);
        }

        this.Embed(obj);
    }

    //Вычисление сложных особенностей
    CalculateFlags() {
        //Поиск больших размеров
        this.isBigSizes = false;
        if (this.list != null)
            for (let i = 0; i < this.list.length; i++) 
                if (this.list[i].dimension > 43 && this.list[i].quantity > 0) {
                    this.isBigSizes = true;
                    break;
                }
        //Поиск доступных цветов
        let k = 0;
        this.haveColors = [];
        if (this.list != null)
            for (let i = 0; i < this.list.length; i++)
                if (this.haveColors.indexOf(this.list[i].color) == -1)
                    this.haveColors[k++] = this.list[i].color;
    }
}

//Класс с группировкой
class Headphones extends Product {
    constructor(protected id: number, public name: string, public price: number, public description: string, public inStock: number, public isWireless?: boolean) {
        super(id, name, price, description, inStock);
        this.Init();
    }

    public Init() {
        let obj = super.Init();
        
        //Если наушники беспроводные, то добавляем информацию об этом в карточку
        if (this.isWireless) {
            let p = document.createElement("p");
            p.setAttribute("class", "card-text text-info m-0");
            p.innerHTML = "Беспроводные";
            obj.firstChild.firstChild.insertBefore(p, obj.firstChild.firstChild.childNodes[2]);
        }

        //Если эти конкретные наушники беспроводные и нет чекбокса группировки, то добавляем его
        if (document.getElementById('isWireless') == null && this.isWireless != null && this.isWireless) {
            let inp = document.createElement("input");
            inp.setAttribute("type", "checkbox");
            inp.setAttribute("id", "isWireless");
            inp.setAttribute("onclick", "CheckWireless(this.checked)");

            let lab = document.createElement("p");
            lab.appendChild(inp);
            lab.innerHTML += "Только беспроводные<br>";

            let div = document.getElementById('myTools');
            div.appendChild(lab);
        }

        this.Embed(obj);
    }
}

//Группировка по беспроводным наушникам
function CheckWireless(flag: boolean) {
    document.getElementById('rowts').innerHTML = "";
    if (flag) {
        for (let i = 0; i < this.productList.length; i++)
            if (productList[i] instanceof Headphones && (<Headphones>productList[i]).isWireless) (<Headphones>productList[i]).Init();
    }
    else {
        for (let i = 0; i < this.productList.length; i++)
            productList[i].Init();
    }
}

//Класс пока не имеющий отличий от базового
class Balalaika extends Product {
    constructor(protected id: number, public name: string, public price: number, public description: string, public inStock: number) {
        super(id, name, price, description, inStock);
        this.Init();
    }

    Init() {
        this.Embed(super.Init());
    }
}

//----------------------------------

enum Material { Samsung = "Cребный", Lg = "Графит", Aeg = "Белый" };

enum Size { XS = "Малюсенькая", S = "Ну размер не главное", M = "Норм, но можно больше" , L = "Порядок", XL = "Царская", XXL = "Матрас"};

class Pilow extends Product {
    constructor(protected id: number, public name: string, public price: number, public description: string, public inStock: number, public material: Material, public size: Size) {
        super(id, name, price, description, inStock);
        this.Init();
    }

    public Init() {
        let obj = super.Init();
        
        //Материал
        let p = document.createElement("p");
        p.setAttribute("class", "card-text text-info m-0");
        p.innerHTML = "Материал: " + this.material.toLocaleLowerCase();
        obj.firstChild.firstChild.insertBefore(p, obj.firstChild.firstChild.childNodes[2]);

        p = document.createElement("p");
        p.setAttribute("class", "card-text text-info m-0");
        p.innerHTML = "Размер: " + this.size.toLocaleLowerCase();
        obj.firstChild.firstChild.insertBefore(p, obj.firstChild.firstChild.childNodes[2]);

        if (document.getElementById('isComfortable') == null) {
            let inp = document.createElement("input");
            inp.setAttribute("type", "checkbox");
            inp.setAttribute("id", "isComfortable");
            inp.setAttribute("onclick", "CheckMaterial(this.checked)");

            let lab = document.createElement("p");
            lab.appendChild(inp);
            lab.innerHTML += "Только удобные<br>";

            let div = document.getElementById('myTools');
            div.appendChild(lab);
        }

        this.Embed(obj);
    }

    

}


function CheckMaterial(flag: boolean) {
    document.getElementById('rowts').innerHTML = "";
    if (flag) {
        for (let i = 0; i < this.productList.length; i++)
            if (productList[i] instanceof Pilow && (<Pilow>productList[i]).material == Material.Fether) (<Pilow>productList[i]).Init();
    }
    else {
        for (let i = 0; i < this.productList.length; i++)
            productList[i].Init();
    }
}


class Phone extends Product {
    constructor(protected id: number, public name: string, public price: number, public description: string, public inStock: number, public isSmart: boolean) {
        super(id, name, price, description, inStock);
        this.Init();
    }

    public Init() {
        let obj = super.Init();
        
        //Тип
        if (this.isSmart) {
            let p = document.createElement("p");
            p.setAttribute("class", "card-text text-info m-0");
            p.innerHTML = "Смартфон";
            obj.firstChild.firstChild.insertBefore(p, obj.firstChild.firstChild.childNodes[2]);
        }


        if (document.getElementById('isSmart') == null) {
            let inp = document.createElement("input");
            inp.setAttribute("type", "checkbox");
            inp.setAttribute("id", "isSmart");
            inp.setAttribute("onclick", "CheckSmart(this.checked)");

            let lab = document.createElement("p");
            lab.appendChild(inp);
            lab.innerHTML += "Только смартфоны<br>";

            let div = document.getElementById('myTools');
            div.appendChild(lab);
        }

        this.Embed(obj);
    }
}

function CheckSmart(flag: boolean) {
    document.getElementById('rowts').innerHTML = "";
    if (flag) {
        for (let i = 0; i < this.productList.length; i++)
            if (productList[i] instanceof Phone && (<Phone>productList[i]).isSmart) (<Phone>productList[i]).Init();
    }
    else {
        for (let i = 0; i < this.productList.length; i++)
            productList[i].Init();
    }
}


//----------------------------------

interface BasketRecord {
    id: number; //id товара
    quantity: number; //Его количество
}

class Basket {
    private list: BasketRecord[] = []; //Список товаров в корзине

    constructor() {
        
    }

    //Добавить товар в корзину. Возвращает результат операции
    Add(val: number): boolean {
        let num = +(<HTMLInputElement>document.getElementById('inputquantity')).value;

        //Проверка введенного количества товара. Если ввели ерунду, то выводится сообщение об ошибке. Иначе товар добавляется в корзину
        if (isNaN(num) || !((num ^ 0) === num) || num == 0 || productList[val].inStock < num) {
            if (productList[val].inStock < num) document.getElementById('modlalMessag').innerHTML = "Столько на складе нет";
            else document.getElementById('modlalMessag').innerHTML = "Введите целое число";
            return false;
        }
        else {
            document.getElementById('modlalMessag').innerHTML = "";
            productList[val].inStock -= num;
            this.list[this.list.length] = { id: val, quantity: num };
            this.CalculateBasket();
            return true;
        }
    }

    //Пересчитать товары в корзине
    CalculateBasket() {
        if (this.list.length > 0) {
            let id;
            let total: number = 0;
            let message: string = "В даннвй момент в корзине:<br>";
            for (let i = 0; i < this.list.length; i++) {
                this.list = uniqRecords(this.list);
                message += productList[this.list[i].id].name + " - " + this.list[i].quantity + "<br>";
                total += productList[this.list[i].id].price * this.list[i].quantity;
            }
            message += "<br><br>На общую сумму " + total + " грн.";

            document.getElementById('myBasket').innerHTML = message;
        }
        else document.getElementById('myBasket').innerHTML = "В данный момент корзина пустая";
    }
}

//Избегание повторений

function uniqRecords(list: Array<BasketRecord>) {
    let newList: Array<BasketRecord> = []
    for (var i = 0; i < list.length; i++) {
        if (isContainsItem(newList, list[i].id)) {
            newList[findItemIndex(newList, list[i].id)].quantity += list[i].quantity;
        }
        else {
            newList.push(list[i])
        }
    }
    return newList;
}

function isContainsItem(list: Array<BasketRecord>, id: number) {
    for (var i = 0; i < list.length; i++) {
        if (list[i].id === id) {
            return true;
        }
    }
    return false
}

function findItemIndex(list: Array<BasketRecord>, id: number) {
    for (var i = 0; i < list.length; i++) {
        if (list[i].id === id) {
            return i;
        }
    }
}

//Действие на кнопке "добавить в корзину"
function myByBtn(val: any) {
    if (basket.Add(val)) $('#buyModal').modal('hide');
}

//Действие на кнопке "купить"
function WantBuy(val: any) {
    document.getElementById('modlalBtn').setAttribute("value", val);
    document.getElementById('quantity').innerHTML = productList[val].inStock.toString();
}

//Инициализация корзины
let basket: Basket = new Basket();
//Список продуктов
let productList: Product[] = [
    new Pilow(0, "Холодильник Samsung", 20000, "RB37J5000SA/UA", 20, Material.Samsung, Size.XL),
    new Pilow(1, "Холодильник LG", 21000, "GA-B509SLKM", 5, Material.Lg, Size.M),
    new Pilow(2, "Холодильник AEG", 24000, "RCB83724KX", 6, Material.Aeg, Size.S),
    new Phone(3, "Бабушкофон", 300.99, "Телефон на все времана. Таким и позвонить можно и дерево посадить, и дом построить, и сына воспитать", 4, false),
    new Phone(4, "Реальная мобила", 4800.99, "Ну мобила как мобила. Топ за свои бабки", 25, true),
    new Phone(5, "Ай-ай-ай какая цена", 35000.99, "Ну почки у тебя всё равно то две", 3, true),
];
