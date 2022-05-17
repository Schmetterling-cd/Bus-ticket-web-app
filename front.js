let popupBg = document.querySelector('.popup'); // Фон попап окна
let popup = document.querySelector('.dialog__window'); // Само окно
let modal = document.getElementById("popup");
let btnModal = document.getElementById("btnEnter");

window.addEventListener('click', function (event) {

    if (event.target.hasAttribute('bus-search')) {
        const vform = event.target.closest('.search__component');
        const date = vform.querySelector('.date__search').value;
        const search__from = vform.querySelector('.search_from').value;
        const search__to = vform.querySelector('.search__to').value;
        const passangere = vform.querySelector('.passangere__search').value;

        if (search__from != '' && search__to != ''){
            jQuery.ajax({
                dataType: 'json',
                type: 'POST',
                url: 'Server.php',
                data: { message: '0' },
                error: (function () {
                    console.log('error');
                }),
            }).done(function (msg) {
                const json = msg;
                let waysContainer = document.querySelector('.title');
                waysContainer.innerText = "Поиск";
                waysContainer = document.querySelector('#ways-container');
                waysContainer.remove();
                delete waysContainer;

                json.forEach(element => {
                    if (element.from == search__from && element.to == search__to && element.date == date && element.passenger >= passangere){
                        console.log('cool');
                    }
                });
    
                const wndDinamic = document.querySelector(".dinamic__window");
                const productHTML = '';
                waysContainer.insertAdjacentHTML('beforeend', productHTML);                
                })
        }            
    }

    if (event.target.dataset.action === 'showcase') {
        const card = event.target.closest('.dinamic__item');
        const prodInfo ={
            from: card.querySelector('.from').innerText,
            to: card.querySelector('.to').innerText,
        }
        const search = document.querySelector(".search__component");
        search.querySelector('.search_from').value = prodInfo.from;
        search.querySelector('.search__to').value = prodInfo.to;
        delete card;
        delete prodInfo;
        delete search;

        const vform = document.querySelector('.search__component');
        const date = vform.querySelector('.date__search').value;
        const search__from = vform.querySelector('.search_from').value;
        const search__to = vform.querySelector('.search__to').value;
        const passangere = vform.querySelector('.passangere__search').value;
        if (search__from != '' && search__to != ''){
            console.log('here');
            jQuery.ajax({
                dataType: 'json',
                type: 'POST',
                url: 'Server.php',
                data: { message: '0' },
                error: (function () {
                    console.log('error');
                }),
            }).done(function (msg) {
                const json = msg;
                let waysContainer = document.querySelector('.title');
                waysContainer.innerText = "Поиск";
                waysContainer = document.querySelector('#ways-container');
                waysContainer.remove();
                delete waysContainer;
                json.forEach(element => {
                    if (element.from == search__from && element.to == search__to && element.date == date && element.passenger >= passangere){
                        console.log('cool');
                    }
                });
                const wndDinamic = document.querySelector(".dinamic__window");
                const productHTML = '';
                waysContainer.insertAdjacentHTML('beforeend', productHTML);                
                })
        }

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







