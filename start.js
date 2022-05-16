Send();
function Send(){
    jQuery.ajax({
        dataType:'json',
        type: "POST",
        url:"render.php",
    }).done(function(msg){ 
        const waysContainer = document.querySelector('#ways-container');
        for (let i =0; i<9;i++)
        {
            const productHTML = `<div data-action="showcase" class="dinamic__item">
        <div data-action="showcase" class="item_zone_left">
            <div class="left__title" data-action="showcase">
                <div class="from">${msg[i].from}</div> 
                <div>-</div>
                <div class="to">${msg[i].to}</div>
            </div>
            <div data-action="showcase" class="left__coast">
                <div class="coast">${msg[i].coast}</div> 
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

