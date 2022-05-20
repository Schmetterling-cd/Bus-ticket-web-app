let popupBg = document.querySelector('.popup'); // Фон попап окна
let popup = document.querySelector('.dialog__window'); // Само окно
let modal = document.getElementById("popup");
let btnModal = document.getElementById("btnEnter");
let todayDate = new Date();
let numberPh;
document.getElementById('davaToday').valueAsDate = todayDate;
Send();
window.addEventListener('click', function (event) {

    if (event.target.hasAttribute('bus-search')) {
        searchItem();        
    }

    if(event.target.hasAttribute('#route__but')){
        
    }

    if(event.target.hasAttribute('#route__but')){
        
    }

    if(event.target.dataset.action === 'btnEnter'){
        let password =document.querySelector('.autorization__input').value;
        console.log(password);
        const pass = password.toString();
        console.log(pass);

        try{
            jQuery.ajax({
                type: "POST",
                dataType: 'text',
                url: 'Server.php',
                data: {message : pass},
                error: (function () {
                    console.log('error in password');
                }),
            }).done(function (msg) {
                console.log(msg);
                switch(msg){
                    //пароль совпал пользователь админ
                    case 'admin':
                        console.log('auth3');
                        const dinamicWND = document.querySelector('.autorization__conteiner');
                        dinamicWND.querySelector('.btnAuth').remove();
                        dinamicWND.querySelector('.autorization__input').remove();
                        
                        // const productHTML = ` <div id="route_info" class="route_info">
                        //                         <div class="route__big">
                        //                             <div class="time">
                        //                                 ${element.date.hours}:${element.date.minutes}
                        //                             </div>
                        //                             <div class="place">
                        //                                 ${element.start}
                        //                             </div>
                        //                         </div>
                        //                         <div class="route__big">
                        //                             <div class="time">
                        //                                 ${timeinway.hours}:${timeinway.minutes}
                        //                             </div>
                        //                             <div class="place">
                        //                                 ${element.end}
                        //                             </div>
                        //                         </div>
                        //                         <div class="route__big">
                        //                             <div class="place">
                        //                                 Время в пути: ${element.way_time.hours}:${element.way_time.minutes}
                        //                             </div>
                        //                         </div>
                        //                         <div class="route__small_coast">
                        //                             ${element.coast}р.
                        //                         </div>
                        //                         <div class="route__small">
                        //                             ${element.passenger}
                        //                         </div>
                        //                         <div id="route__but" class="route__but">
                        //                             <div class="btnorder">Забронировать</div>
                        //                         </div>
                        //                       </div>`;
                        // dinamicWND.insertAdjacentHTML('beforeend', productHTML);
    
                        break;
                    //пароль совпал, пользователь гость
                    case 'default':
                        break;
                    //пароль совпал, пользователь водитель
                    case 'driver':
                        break;
                    //пароль не совпал
                    case 'non':
                        break;
                }
            });
        }catch{
            jQuery.ajax({
                type: "POST",
                dataType: 'text',
                url: 'Server.php',
                data: {message : pass},
                error: (function () {
                    console.log('error in password');
                }),
            }).done(function (msg) {
                console.log(msg);
                switch(msg){
                    //пароль совпал пользователь админ
                    case 'admin':
                        console.log('auth3');
                        const dinamicWND = document.querySelector('.autorization__conteiner');
                        dinamicWND.querySelector('.btnAuth').remove();
                        dinamicWND.querySelector('.autorization__input').remove();
                        
                        // const productHTML = ` <div id="route_info" class="route_info">
                        //                         <div class="route__big">
                        //                             <div class="time">
                        //                                 ${element.date.hours}:${element.date.minutes}
                        //                             </div>
                        //                             <div class="place">
                        //                                 ${element.start}
                        //                             </div>
                        //                         </div>
                        //                         <div class="route__big">
                        //                             <div class="time">
                        //                                 ${timeinway.hours}:${timeinway.minutes}
                        //                             </div>
                        //                             <div class="place">
                        //                                 ${element.end}
                        //                             </div>
                        //                         </div>
                        //                         <div class="route__big">
                        //                             <div class="place">
                        //                                 Время в пути: ${element.way_time.hours}:${element.way_time.minutes}
                        //                             </div>
                        //                         </div>
                        //                         <div class="route__small_coast">
                        //                             ${element.coast}р.
                        //                         </div>
                        //                         <div class="route__small">
                        //                             ${element.passenger}
                        //                         </div>
                        //                         <div id="route__but" class="route__but">
                        //                             <div class="btnorder">Забронировать</div>
                        //                         </div>
                        //                       </div>`;
                        // dinamicWND.insertAdjacentHTML('beforeend', productHTML);
    
                        break;
                    //пароль совпал, пользователь гость
                    case 'default':
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


        
    }

    if(event.target.dataset.action === 'btnAuth'){
        numberPh =document.querySelector('.autorization__input').value;
        jQuery.ajax({
            dataType: 'text',
            type: 'POST',
            url: 'Server.php',
            data: {message : numberPh},
            error: (function () {
                console.log('error in auth');
            }),
        }).done(function (msg) {
            console.log(msg);
            switch(msg){
                //пользователь существует
                case '0':
                    const dinamicWND = document.querySelector('.autorization__conteiner');
                    dinamicWND.querySelector('.autorization__input').value = '';
                    dinamicWND.querySelector('.autorization__input').placeholder = 'Пароль';
                    dinamicWND.querySelector('.btnAuth').innerText = 'Войти';
                    dinamicWND.querySelector('.btnAuth').id = 'btnEnter';
                    dinamicWND.querySelector('.btnAuth').dataset.action = 'btnEnter';
                    break;
                //пользователя не существует
                case 1:
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
        delete card;
        delete prodInfo;
        delete search;

        searchItem();
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

function searchItem(){
    const vform = document.querySelector('.search__component');
    const date = new Date (vform.querySelector('.date__search').value);
    const search__from = vform.querySelector('.search_from').value;
    const search__to = vform.querySelector('.search__to').value;
    const passangere = vform.querySelector('.passangere__search').value;
    console.log(passangere);
    if (search__from != '' && search__to != ''){
        console.log('here');
        jQuery.ajax({
            dataType: 'text',
            type: 'POST',
            url: 'Server.php',
            data: {message : 0},
            error: (function () {
                console.log('error');
            }),
        }).done(function (msg) {
            console.log('req');
            const json = msg;
            let Container = document.querySelector('.title');
            Container.innerText = "Поиск";
            try{
                console.log('try');
                if(document.querySelector('#ways-container').contains){
                    console.log('giger');
                    Container = document.querySelector('#ways-container');
                    Container.remove();
                }
                
              

            }
            catch(e){ 
                console.log('err');
                if (e instanceof TypeError) { 
                    console.log('err2');
                   
            }} 

            try{
                if(document.querySelector('#route_info').contains){
                    console.log('halo');
                    Container = document.querySelector('#route_info');
                    Container.remove();
                }
               

            }
            catch(e){ 
                console.log('err');
                if (e instanceof TypeError) { 
                    console.log('err2');
                    Container.remove();
            }} 

            json.forEach(element => {
                if (element.from == search__from && element.to == search__to && element.date.day == date.getDate() && element.date.month == date.getMonth()+1 && element.date.year == date.getFullYear() && Number(element.passenger) >= Number(passangere)){
                    console.log('cool');
                    let timeinway;
                    if(Number(element.date.hours) + Number(element.way_time.hours < 24) && Number(element.date.minutes) + Number(element.way_time.minutes) < 60){
                        console.log('shet');
                        timeinway ={ 
                            hours: Number(element.date.hours) + Number(element.way_time.hours),
                            minutes: Number(element.date.minutes) + Number(element.way_time.minutes),
                        }
                    }else{
                        console.log('time');
                        if(Number(element.date.minutes) + Number(element.way_time.minutes) >= 60 && Number(element.date.hours) + Number(element.way_time.hours) < 24){
                            timeinway ={ 
                                hours: Number(element.date.hours)+ Number(element.way_time.hours) + 1,
                                minutes: Number(element.date.minutes) + Number(element.way_time.minutes) - 60,
                            }
                        }else{
                            timeinway ={ 
                                hours: Number(element.date.hours)+ Number(element.way_time.hours) + 1 - 24,
                                minutes: Number(element.date.minutes) + Number(element.way_time.minutes) - 60,
                            }
                        }
                        if(Number(element.date.hours) + Number(element.way_time.hours) >= 24 && Number(element.date.minutes) + Number(element.way_time.minutes) < 60 ){
                            timeinway ={ 
                                hours: Number(hours) + Number(element.date.hours) + Number(element.way_time.hours) - 24,
                                minutes: Number(element.date.minutes) + Number(element.way_time.minutes),
                            }
                        }
                    }

                    if(timeinway.hours == 24){
                        timeinway.hours = '00';
                    }
                    if(timeinway.minutes == 0){
                        timeinway.minutes = '00';
                    }
                    
                    const dinamicWND = document.querySelector('.dinamic__window');
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

function passwordReq (){
    
}

function EnterIn(){
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

        switch(json.status){
            case 'default':
                break;
            case 'admin':
                break;
            case 'driver':
                break;
        }
    });
}

function Send(){
    jQuery.ajax({
        dataType: 'text',
        type: "POST",
        url: "Server.php",
        data: { message: '0' },
        error: (function () {
            console.log('error in vitrine');
        }),
    }).done(function(msg){ 
        console.log(msg);
        const json = JSON.parse(msg);
        console.log(json);
        const waysContainer = document.querySelector('#ways-container');
        waysContainer.classList.remove("dinamic__item");
        for (let i =0; i<9;i++)
        {
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





