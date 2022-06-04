Send();
let popupBg = document.querySelector('.popup'); // Фон попап окна
let popup = document.querySelector('.dialog__window'); // Само окно
let modal = document.getElementById("popup");
let user = new Object();
let todayDate = new Date();
let toDelete;
let ways;
let numberPh;
document.getElementById('davaToday').valueAsDate = todayDate;
//Start();
window.addEventListener('click', function (event) {

    //выход из аккаунта
    if (event.target.hasAttribute('btnExit')) {
        console.log('exit');
        user = null;
        jQuery.ajax({
            type: "POST",
            chache: false,
            dataType: 'text',
            url: 'Server.php',
            data: {"request": '8'},
            error: (function () {
                console.log('error');
            }),
        }).done(function (msg) {
            location.reload();
        });
    }

    if (event.target.hasAttribute('bus-search')) {
        searchItem();
    }

    //нажатие на кнопку забранировано
    if (event.target.dataset.action === 'conf_order') {

    }

    // забронировать
    if (event.target.dataset.action === 'btnorder') {
        if (Object.keys(user).length) {
            const routeWND = event.target.closest('.route_info');
            let add = new Object();
            add={
                id: event.target.closest('.route_info').id,
                seats: this.document.querySelector('.passangere__search').value,
            }
            console.log(add);
            user.routes.push(add);
            
            console.log(user.routes);
            //console.log(obj);
            const datarq = {
                request: '6',
                userid: user.id,
                userroutes: JSON.stringify(user.routes),
                routid: event.target.closest('.route_info').id,
            }
            console.log(datarq);
            jQuery.ajax({
                type: "POST",
                chache: false,
                dataType: 'text',
                url: 'Server.php',
                data: datarq,
                error: (function () {
                    console.log('error');
                }),
            }).done(function (msg) {
                console.log(msg);
                routeWND.querySelector('#btnorder').innerText = 'Забронировано';
                routeWND.querySelector('#btnorder').id = 'conf_order';
                routeWND.querySelector('.btnorder').dataset.action = 'conf_order';
                routeWND.querySelector('.btnorder').className = 'btnConfOrder';
            });
        }
        
    }

    //кнопка вход
    if (event.target.dataset.action === 'btnAcc') {
        let password = document.querySelector('.autorization__input').value;
        const pass = password.toString();
        const datarq = {
            request: '2',
            password: pass,
            number: numberPh,
        }
        //console.log(pass);
        jQuery.ajax({
            type: "POST",
            chache: false,
            dataType: 'text',
            url: 'Server.php',
            data: datarq,
            error: (function () {
                console.log('error in password');
            }),
        }).done(function (msg) {
            Auth(msg);
        });
    }

    // выводим поездки пользователя
    if (event.target.hasAttribute('btnRoutes')) {
        if(Object.keys(user).length){
            console.log(user.routes[0]['id']);
            let Container = document.querySelector('.title');
            Container.innerText = "Ваши поездки";

            try {
                if (document.querySelector('#search_cards').contains) {
                    Container = document.querySelector('#search_cards');
                    Container.remove();
                    Container = document.querySelector('.dinamic__window');
                    const searchHTML =`<div id="search_cards" class='search_cards'></div>`;
                    Container.insertAdjacentHTML('beforeend', searchHTML);
                }
            }
            catch (e) {
                if (e instanceof TypeError) {

                }
            }


            try {
                console.log('try');
                if (document.querySelector('#ways-container').contains) {
                    Container = document.querySelector('#ways-container');
                    Container.remove();
                    Container = document.querySelector('.dinamic__window');
                    const divHTML =`<div id="search_cards" class='search_cards'></div>`;
                    Container.insertAdjacentHTML('beforeend', divHTML);
                }
            }
            catch (e) {
                if (e instanceof TypeError) {


                }
            }

            user.routes.forEach(element => {
                const datarq = {
                    request: '4',
                    rout: element['id'],
                }
                jQuery.ajax({
                    type: "POST",
                    chache: false,
                    dataType: 'text',
                    url: 'Server.php',
                    data: datarq,
                    error: (function () {
                        console.log('error in password');
                    }),
                }).done(function (msg) {     
                    console.log(JSON.parse(msg));
                    json = JSON.parse(msg);
                    date = JSON.parse(json['time'])[0];
                    way_time = JSON.parse(json['way_time'])[0];
                    console.log(date);

                    if ((date.day >= todayDate.getDate() && date.month >= todayDate.getMonth() + 1 && date.year >= todayDate.getFullYear()) || (date.month >= todayDate.getMonth() + 1 && date.year >= todayDate.getFullYear()) || (date.year >= todayDate.getFullYear())) {
                        let timeinway;
                    if (Number(date['hours']) + Number(way_time['hours']) < 24 && Number(date['minutes']) + Number(way_time['minutes']) < 60) {
                        console.log('shet');
                        timeinway = {
                            hours: Number(date['hours']) + Number(way_time['hours']),
                            minutes: Number(date['minutes']) + Number(way_time['minutes']),
                        }
                    } else {
                        console.log('time');
                        if (Number(date['minutes']) + Number(way_time.minutes) >= 60 && Number(date['hours']) + Number(way_time['hours']) < 24) {
                            timeinway = {
                                hours: Number(date['hours']) + Number(way_time['hours']) + 1,
                                minutes: Number(date['minutes']) + Number(way_time['minutes']) - 60,
                            }
                        } else {
                            timeinway = {
                                hours: Number(date['hours']) + Number(way_time['hours']) + 1 - 24,
                                minutes: Number(date['minutes']) + Number(way_time['minutes']) - 60,
                            }
                        }
                        if (Number(date['hours']) + Number(way_time['hours']) >= 24 && Number(date['minutes']) + Number(way_time.minutes) < 60) {
                            timeinway = {
                                hours: Number(hours) + Number(date['hours']) + Number(way_time['hours']) - 24,
                                minutes: Number(date['minutes']) + Number(way_time['minutes']),
                            }
                        }
                    }

                    if (timeinway.hours == 24) {
                        timeinway.hours = '00';
                    }
                    if (timeinway.minutes == 0) {
                        timeinway.minutes = '00';
                    }
                    const dinamicWND = document.querySelector('#search_cards');;
                    const productHTML = ` <div id="${json.id}" class="route_info">
                                            <div class="route__big">
                                                <div class="time">
                                                    ${date.hours}:${date.minutes}
                                                </div>
                                                <div class="place">
                                                    ${json.start}
                                                </div>
                                            </div>
                                            <div class="route__big">
                                                <div class="time">
                                                    ${timeinway.hours}:${timeinway.minutes}
                                                </div>
                                                <div class="place">
                                                    ${json.end}
                                                </div>
                                            </div>
                                            <div class="route__big">
                                                <div class="place">
                                                    Дата отправления: ${date.day}.${date.month}
                                                </div>
                                            </div>
                                            <div class="route__small_coast">
                                                ${Number(json.coast)*Number(element.seats)}р.
                                            </div>
                                            <div class="route__small">
                                                ${element.seats}
                                            </div>
                                            <div id="route__but" class="route__but">
                                                <div id='conf_order' data-action="conf_order" class="btnConfOrder">Забронировано</div>
                                            </div>
                                          </div>`;
                    dinamicWND.insertAdjacentHTML('beforeend', productHTML);
                    }
                });
            });
        }else{
            console.log('empty');
        }
    }

    //регистрация
    if (event.target.dataset.action === 'btnReg') {
        try{
            document.querySelector('.attancion').remove();
            document.querySelector('.attancion').remove();
            const phoneWND =document.querySelector('.autorization__conteiner');
                    phoneWND.querySelector('.autorization__input').style.color = 'black';
                    phoneWND.querySelector('.autorization__input').style.borderColor = 'black';
        }catch(e){
            if (e instanceof TypeError) {
                console.log('delete div');
            }
        }
        const regWND = document.querySelector('.autorization__conteiner');
        if ((regWND.querySelector('.autorization__input').value == regWND.querySelector('.confirm__input').value) && (regWND.querySelector('#name').value != '')){
            console.log(numberPh);
            const datarq = {
                request: '3',
                phone_number: numberPh,
                name: regWND.querySelector('#name').value,
                password: regWND.querySelector('.autorization__input').value,
                routes: null,
                status: 'default',
            };
            console.log(datarq);
            jQuery.ajax({
                dataType: 'text',
                type: 'POST',
                url: 'Server.php',
                data: datarq,
                error: (function () {
                    console.log('error in registration');
                }),
            }).done(function (msg) {
                console.log(msg);
            });
        }else{
            if(regWND.querySelector('#confirm').value != regWND.querySelector('.autorization__input').value){
                regWND.querySelector('#confirm').style.color = 'red';
                regWND.querySelector('#confirm').style.borderColor = 'red';
                const productHTML = `<div id='attancion' class="attancion">Пароли не совпадают</div>`;
                const attancionWND = document.querySelector('#confirm');
                attancionWND.insertAdjacentHTML('afterend', productHTML);
            }
            if(regWND.querySelector('#name').value == ''){
                regWND.querySelector('#name').style.borderColor = 'red';
                const productHTML = `<div id='attancion' class="attancion">Обязательное поле</div>`;
                const attancionWND = document.querySelector('#btnReg');
                attancionWND.insertAdjacentHTML('beforebegin', productHTML);
            }
            
        }
    }

    //отправка номера для проверки
    if (event.target.dataset.action === 'btnAuth') {

        try{
            document.querySelector('.attancion').remove();
            document.querySelector('.attancion').remove();
            const phoneWND =document.querySelector('.autorization__conteiner');
            phoneWND.querySelector('.autorization__input').style.color = 'black';
            phoneWND.querySelector('.autorization__input').style.borderColor = 'black';
        }catch(e){
            if (e instanceof TypeError) {
                console.log('delete div');
            }
        }

        numberPh = document.querySelector('.autorization__input').value;
        const datarq = {
            request: '1',
            number: numberPh,
        }
        jQuery.ajax({
            dataType: 'text',
            type: 'POST',
            url: 'Server.php',
            data: datarq,
            error: (function () {
                console.log('error in auth');
            }),
        }).done(function (msg) {
            console.log(msg);
            switch (msg) {
                //пользователь существует
                case '0':
                    const dinamicWND = document.querySelector('.autorization__conteiner');
                    dinamicWND.querySelector('.autorization__input').value = '';
                    dinamicWND.querySelector('.autorization__input').placeholder = 'Пароль';
                    dinamicWND.querySelector('.autorization__input').type = 'password';
                    dinamicWND.querySelector('.btnAuth').innerText = 'Войти';
                    dinamicWND.querySelector('.btnAuth').id = 'btnAcc';
                    dinamicWND.querySelector('.btnAuth').dataset.action = 'btnAcc';
                    break;
                //пользователя не существует
                case '1':
                    let regWND = document.querySelector('.autorization__conteiner');
                    const productHTML = `<input type="password" id='confirm' class="confirm__input" placeholder="Подтвердите пароль"></input>
                                         <input type="text" id='name' class="confirm__input" placeholder="Имя"></input>`;
                    regWND.querySelector('.autorization__input').value = '';
                    regWND.querySelector('.autorization__input').type = 'password';
                    regWND.querySelector('.autorization__input').placeholder = 'Пароль';
                    regWND.querySelector('.btnAuth').innerText = 'Зарегистрироваться';
                    regWND.querySelector('.btnAuth').id = 'btnReg';
                    regWND.querySelector('.btnAuth').dataset.action = 'btnReg';
                    regWND = document.querySelector('#btnReg');
                    regWND.insertAdjacentHTML('beforebegin', productHTML);
                    regWND = document.querySelector('.popup');
                    regWND.querySelector('.dialog__window').style.height = '300px';
                    break;
                //неверный формат номера
                case '2':
                    const phoneWND =document.querySelector('.autorization__conteiner');
                    phoneWND.querySelector('.autorization__input').style.color = 'red';
                    phoneWND.querySelector('.autorization__input').style.borderColor = 'red';
                    const attancionHTML = `<div id='attancion' class="attancion">Введите существующий номер</div>`;
                    const attancionWND = document.querySelector('#btnAuth');
                    attancionWND.insertAdjacentHTML('beforebegin', attancionHTML);
                    break;
            }
        });
    }

    //поиск при нажатии на популярный
    if (event.target.dataset.action === 'showcase') {
        const card = event.target.closest('.dinamic__item');
        const prodInfo = {
            from: card.querySelector('.from').innerText,
            to: card.querySelector('.to').innerText,
        }
        const search = document.querySelector(".search__component");
        search.querySelector('.search_from').value = prodInfo.from;
        search.querySelector('.search__to').value = prodInfo.to;
        searchItem();
        delete card;
        delete prodInfo;
        delete search;


    }

    if (event.target.dataset.action === 'enouncement_button_true') {
        const toDelete = event.target.closest('#route_info').id;
        const datarq = {
            request: '9',
            route: toDelete,
            persone: user.id,
        };
        jQuery.ajax({
            dataType: 'text',
            type: 'POST',
            url: 'Server.php',
            data: datarq,
            error: (function () {
                console.log('error in registration');
            }),
        }).done(function (msg) {

        });
    }

    //окно отмены поездки
    if (event.target.dataset.action === 'conf_order') {
        toDelete = event.target.closest('.route_info').id;
        document.querySelector('.renouncement').classList.add('active'); // Добавляем класс 'active' для фона
        popupBg.classList.add('active');
    }

    //окно аккаунта
    if (event.target.hasAttribute('btnEnter')) {
        popupBg.classList.add('active'); // Добавляем класс 'active' для фона
        popup.classList.add('active');
    }

    if (event.target == modal) {
        popupBg.classList.remove('active'); // Убираем активный класс с фона
        popup.classList.remove('active');
        document.querySelector('.renouncement').classList.remove('active')
    }

    if (event.target.hasAttribute('dialogClose')) {
        popupBg.classList.remove('active'); // Убираем активный класс с фона
        popup.classList.remove('active');
    }

    //кнопка ревёрс
    if (event.target.hasAttribute('swap_search')) {
        const vform = event.target.closest('.search__component');
        const search__from = vform.querySelector('.search_from').value;
        const search__to = vform.querySelector('.search__to').value;
        vform.querySelector('.search_from').value = search__to;
        vform.querySelector('.search__to').value = search__from;
    }
})


//функция поиска поездок
function searchItem() {
    const vform = document.querySelector('.search__component');
    const date = new Date(vform.querySelector('.date__search').value);
    console.log(vform.querySelector('.date__search').value);
    console.log(date);
    const search__from = vform.querySelector('.search_from').value;
    const search__to = vform.querySelector('.search__to').value;
    const passangere = vform.querySelector('.passangere__search').value;
    let mess = "SELECT * FROM `Ways` WHERE `date` = '"+vform.querySelector('.date__search').value+"' AND `from` = '"+search__from+"' AND `to` = '"+search__to+"' AND `passenger`>="+passangere+"";
    if (search__from != '' && search__to != '') {
        console.log('here');
        jQuery.ajax({
            dataType: 'text',
            type: 'POST',
            url: 'Server.php',
            data: { request: '5',
                    dbmess: mess, },
            error: (function () {
                console.log('error');
            }),
        }).done(function (msg) {
            console.log
            const json = JSON.parse(msg);
            console.log(json);
            let Container = document.querySelector('.title');
            Container.innerText = "Поиск";
            Container = null;

            try {
                if (document.querySelector('#search_cards').contains) {
                    Container = document.querySelector('#search_cards');
                    Container.remove();
                    Container = document.querySelector('.dinamic__window');
                    const searchHTML =`<div id="search_cards" class='search_cards'></div>`;
                    Container.insertAdjacentHTML('beforeend', searchHTML);
                }
            }
            catch (e) {
                if (e instanceof TypeError) {

                }
            }


            try {
                console.log('try');
                if (document.querySelector('#ways-container').contains) {
                    Container = document.querySelector('#ways-container');
                    Container.remove();
                    Container = document.querySelector('.dinamic__window');
                    const divHTML =`<div id="search_cards" class='search_cards'></div>`;
                    Container.insertAdjacentHTML('beforeend', divHTML);
                }
            }
            catch (e) {
                if (e instanceof TypeError) {


                }
            }

            if(json.length){

                json.forEach(element=>{
                    waydate = JSON.parse(element['time'])[0];
                    way_time = JSON.parse(element['way_time'])[0];
                console.log(waydate);
                    let timeinway;
                    if (Number(waydate.hours) + Number(way_time.hours) < 24 && Number(waydate.minutes) + Number(way_time.minutes) < 60) {
                        console.log('shet');
                        timeinway = {
                            hours: Number(waydate.hours) + Number(way_time.hours),
                            minutes: Number(waydate.minutes) + Number(way_time.minutes),
                        }
                    } else {
                        console.log('time');
                        if (Number(waydate.minutes) + Number(way_time.minutes) >= 60 && Number(waydate.hours) + Number(way_time.hours) < 24) {
                            console.log('time1');
                            timeinway = {
                                hours: Number(waydate.hours) + Number(way_time.hours) + 1,
                                minutes: Number(waydate.minutes) + Number(way_time.minutes) - 60,
                            }
                        } else {
                            console.log('time2');
                            timeinway = {
                                hours: Number(waydate.hours) + Number(way_time.hours) + 1 - 24,
                                minutes: Number(waydate.minutes) + Number(way_time.minutes) - 60,
                            }
                        }
                        if (Number(waydate.hours) + Number(way_time.hours) >= 24 && Number(waydate.date.minutes) + Number(way_time.minutes) < 60) {
                            console.log('time3');
                            timeinway = {
                                hours: Number(hours) + Number(waydate.hours) + Number(way_time.hours) - 24,
                                minutes: Number(waydate.minutes) + Number(way_time.minutes),
                            }
                        }
                    }

                    if (timeinway.hours == 24) {
                        timeinway.hours = '00';
                    }
                    if (timeinway.minutes == 0) {
                        timeinway.minutes = '00';
                    }

                    let dinamicWND = document.querySelector('#search_cards');;
                    const productHTML = ` <div id="${element.id}" class="route_info">
                                            <div class="route__big">
                                                <div class="time">
                                                    ${waydate.hours}:${waydate.minutes}
                                                </div>
                                                <div class="place">
                                                    ${element.start}
                                                </div>
                                            </div>
                                            <div class="route__big">
                                                <div class="time">
                                                    ${timeinway.hours}:${timeinway.minutes}
                                                </div>
                                                <div class="place">
                                                    ${element.end}
                                                </div>
                                            </div>
                                            <div class="route__big">
                                                <div class="place">
                                                    Время в пути: ${way_time.hours}:${way_time.minutes}
                                                </div>
                                            </div>
                                            <div class="route__small_coast">
                                                ${element.coast}р.
                                            </div>
                                            <div class="route__small">
                                                ${element.passenger}
                                            </div>
                                            <div id="route__but" class="route__but">
                                                <div id='btnorder' data-action="btnorder"  class="btnorder">Забронировать</div>
                                            </div>
                                          </div>`;
                    dinamicWND.insertAdjacentHTML('beforeend', productHTML);
                    dinamicWND = document.getElementById(`${element.id}`);
                    delete Container;
                    if(Object.keys(user).length){
                        console.log(user.routes);
                        try{
                            user.routes.forEach(el=>{
                                if (el.id == element.id){
                                    dinamicWND.querySelector('#btnorder').innerText = 'Забронировано';
                                    dinamicWND.querySelector('#btnorder').id = 'conf_order';
                                    dinamicWND.querySelector('.btnorder').dataset.action = 'conf_order';
                                    dinamicWND.querySelector('.btnorder').className = 'btnConfOrder';
                                }
                            })
                        }catch{
                            if (e instanceof TypeError) {

                                console.log('er');
                            }
                        }
                        
                    }
                
                });

            mess= null; 
            }else{
            }
        })
    }

}


function EnterIn() {
    jQuery.ajax({
        dataType: 'json',
        type: 'POST',
        url: 'Server.php',
        data: { message: '1' },
        error: (function () {
            console.log('error');
        }),
    }).done(function (msg) {
        const json = msg;

        switch (json.status) {
            case 'default':
                break;
            case 'admin':
                break;
            case 'driver':
                break;
        }
    });
}

function Send() {
    jQuery.ajax({
        dataType: 'text',
        type: "POST",
        url: "Server.php",
        data: { request: '0' },
        error: (function () {
            console.log('error in vitrine');
        }),
    }).done(function (msg) {
        const json = JSON.parse(msg);
        console.log(json);
        let waysContainer = document.querySelector('#ways-container');
        waysContainer.classList.remove("dinamic__item");
        json.forEach(element =>{
            const productHTML = `<div id="${element.id}" data-action="showcase" class="dinamic__item">
                                        <div data-action="showcase" class="item_zone_left">
                                            <div class="left__title" data-action="showcase">
                                                <div class="from">${element.from}</div> 
                                                <div>-</div>
                                                <div class="to">${element.to}</div>
                                            </div>
                                            <div data-action="showcase" class="left__coast">
                                                <div class="coast">${element.coast}</div> 
                                                <label>р.</label>
                                            </div>
                
                                        </div>
                                        <div data-action="showcase" class="item_zone_right">
                                            <img src="./images/pngwing.com.png" width="25px" height="25px" data-action="showcase">
                                        </div>
                                    </div> `;
                waysContainer.insertAdjacentHTML('beforeend', productHTML);
        });
    })
}

function Start(){
    jQuery.ajax({
        dataType: 'text',
        type: "POST",
        url: "Server.php",
        data: { request: '7' },
        error: (function () {
            console.log('error in vitrine');
        }),
    }).done(function (msg) {
        console.log(msg);
        if(msg == null){
           console.log('null'); 
        }else{
            Auth(msg);
        }
        
    });
}

function Auth(msg) {
    console.log(msg);
        json = JSON.parse(msg);
    console.log(json);
    switch (json["status"]) {
        //пароль совпал пользователь админ
        case 'admin':
            console.log('auth3');
            const dinamicWND = document.querySelector('.autorization__conteiner');
            dinamicWND.querySelector('.btnAuth').remove();
            dinamicWND.querySelector('.autorization__input').remove();

            const productHTML = ``;
            dinamicWND.insertAdjacentHTML('beforeend', productHTML);
            break;
        //пароль совпал, пользователь гость
        case 'default':
            let defaultWND = document.getElementById('btnEnter');
            defaultWND.textContent = json["name"];
            document.querySelector('.text_dHeader').textContent = 'Аккаунт';
            defaultWND = defaultWND.closest('.nav__component');
            defaultWND.style.marginLeft = '15px';
            console.log('default');
            ways = JSON.parse(json["routs"]);
            defaultWND = document.querySelector('.autorization__conteiner');
            defaultWND.querySelector('.btnAuth').remove();
            defaultWND.querySelector('.autorization__input').remove();
            const defaultHTML = `<div class='inviter__body'>
                                            <div class='inviter__name'>${json["name"]} <img id='btnEdit' class='inviter__img' src='./images/pencil.png'></img></div>
                                            <div class='inviter__phone'>${json["phone_number"]}</div>
                                         </div>
                                         <div class='inviter__footer'>
                                            <button btnExit id='btnExit' class='inviter__exit'>Выход</button>
                                         </div>`;
            defaultWND.insertAdjacentHTML('beforeend', defaultHTML);
            defaultWND.style.justifyContent = "space-around";
            defaultWND.style.alignItems = "flex-start";
            user.id = json["id"];
            user.name = json["name"];
            user.routes = JSON.parse(json["routs"]);
            if (user.routes == null || user.routs == '') {
                user.routes = new Array();
            }
            break;
        //пароль совпал, пользователь водитель
        case 'driver':
            break;
        //пароль не совпал
        case 'non':
            break;
    }
    
}