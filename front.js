let popupBg = document.querySelector('.popup'); // Фон попап окна
let popup = document.querySelector('.dialog__window'); // Само окно
let modal = document.getElementById("popup");
//let btnModal = document.getElementById("btnEnter");
let todayDate = new Date();
let ways;
let numberPh;
document.getElementById('davaToday').valueAsDate = todayDate;
Send();
window.addEventListener('click', function (event) {

    if (event.target.hasAttribute('bus-search')) {
        searchItem();
    }

    if (event.target.hasAttribute('#route__but')) {
        const datarq = {
            request: '2',
            password: pass,
            number: numberPh,
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

        });
    }

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
                    document.querySelector('.text_dHeader').textContent ='Аккаунт';
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
                                            <button id='btnExit' class='inviter__exit'>Выход</button>
                                         </div>`;
                    defaultWND.insertAdjacentHTML('beforeend', defaultHTML);
                    defaultWND.style.justifyContent = "space-around";
                    defaultWND.style.alignItems = "flex-start";
                    break;
                //пароль совпал, пользователь водитель
                case 'driver':
                    break;
                //пароль не совпал
                case 'non':
                    break;
            }
        });




    }

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



    if (event.target.hasAttribute('btnEnter')) {
        popupBg.classList.add('active'); // Добавляем класс 'active' для фона
        popup.classList.add('active');
    }

    if (event.target == modal) {
        popupBg.classList.remove('active'); // Убираем активный класс с фона
        popup.classList.remove('active');
    }

    if (event.target.hasAttribute('dialogClose')) {
        popupBg.classList.remove('active'); // Убираем активный класс с фона
        popup.classList.remove('active');
    }

    if (event.target.hasAttribute('swap_search')) {
        const vform = event.target.closest('.search__component');
        const search__from = vform.querySelector('.search_from').value;
        const search__to = vform.querySelector('.search__to').value;
        vform.querySelector('.search_from').value = search__to;
        vform.querySelector('.search__to').value = search__from;
    }
})

function searchItem() {
    const vform = document.querySelector('.search__component');
    const date = new Date(vform.querySelector('.date__search').value);
    const search__from = vform.querySelector('.search_from').value;
    const search__to = vform.querySelector('.search__to').value;
    const passangere = vform.querySelector('.passangere__search').value;
    console.log(passangere);
    if (search__from != '' && search__to != '') {
        console.log('here');
        jQuery.ajax({
            dataType: 'text',
            type: 'POST',
            url: 'Server.php',
            data: { request: '0' },
            error: (function () {
                console.log('error');
            }),
        }).done(function (msg) {
            const json = JSON.parse(msg);
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
            json.forEach(element => {
                if (element.from == search__from && element.to == search__to && element.date.day == date.getDate() && element.date.month == date.getMonth() + 1 && element.date.year == date.getFullYear() && Number(element.passenger) >= Number(passangere)) {
                    console.log('cool');
                    let timeinway;
                    if (Number(element.date.hours) + Number(element.way_time.hours < 24) && Number(element.date.minutes) + Number(element.way_time.minutes) < 60) {
                        console.log('shet');
                        timeinway = {
                            hours: Number(element.date.hours) + Number(element.way_time.hours),
                            minutes: Number(element.date.minutes) + Number(element.way_time.minutes),
                        }
                    } else {
                        console.log('time');
                        if (Number(element.date.minutes) + Number(element.way_time.minutes) >= 60 && Number(element.date.hours) + Number(element.way_time.hours) < 24) {
                            timeinway = {
                                hours: Number(element.date.hours) + Number(element.way_time.hours) + 1,
                                minutes: Number(element.date.minutes) + Number(element.way_time.minutes) - 60,
                            }
                        } else {
                            timeinway = {
                                hours: Number(element.date.hours) + Number(element.way_time.hours) + 1 - 24,
                                minutes: Number(element.date.minutes) + Number(element.way_time.minutes) - 60,
                            }
                        }
                        if (Number(element.date.hours) + Number(element.way_time.hours) >= 24 && Number(element.date.minutes) + Number(element.way_time.minutes) < 60) {
                            timeinway = {
                                hours: Number(hours) + Number(element.date.hours) + Number(element.way_time.hours) - 24,
                                minutes: Number(element.date.minutes) + Number(element.way_time.minutes),
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
                    const productHTML = ` <div id="route_info" class="route_info">
                                            <div class="route__big">
                                                <div class="time">
                                                    ${element.date.hours}:${element.date.minutes}
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
                                                    Время в пути: ${element.way_time.hours}:${element.way_time.minutes}
                                                </div>
                                            </div>
                                            <div class="route__small_coast">
                                                ${element.coast}р.
                                            </div>
                                            <div class="route__small">
                                                ${element.passenger}
                                            </div>
                                            <div id="route__but" class="route__but">
                                                <div class="btnorder">Забронировать</div>
                                            </div>
                                          </div>`;
                    dinamicWND.insertAdjacentHTML('beforeend', productHTML);
                    delete Container;
                }
            });
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
        const waysContainer = document.querySelector('#ways-container');
        waysContainer.classList.remove("dinamic__item");
        for (let i = 0; i < 9; i++) {
            const productHTML = `<div id="dinamic__item" data-action="showcase" class="dinamic__item">
                                    <div data-action="showcase" class="item_zone_left">
                                        <div class="left__title" data-action="showcase">
                                            <div class="from">${json[i].from}</div> 
                                            <div>-</div>
                                            <div class="to">${json[i].to}</div>
                                        </div>
                                        <div data-action="showcase" class="left__coast">
                                            <div class="coast">${json[i].coast}</div> 
                                            <label>р.</label>
                                        </div>
            
                                    </div>
                                    <div data-action="showcase" class="item_zone_right">
                                        <img src="./images/pngwing.com.png" width="25px" height="25px" data-action="showcase">
                                    </div>
                                </div> `;
            waysContainer.insertAdjacentHTML('beforeend', productHTML);
        }
    })
}