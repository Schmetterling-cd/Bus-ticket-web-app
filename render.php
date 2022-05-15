<script> 

const waysContainer = document.querySelector('#ways-container');

let item = JSON.parse('<?php echo $json; ?>');

renderProducts();

function renderProducts() {
    productsArray.forEach(function (item) {
        const productHTML = `<div data-action="showcase" class="dinamic__item">
        <div data-action="showcase" class="item_zone_left">
            <div class="left__title" data-action="showcase">
                <div class="from">${item.from}</div> 
                <div>-</div>
                <div class="to">${item.to}</div>
            </div>
            <div data-action="showcase" class="left__coast">
                <div class="coast">${item.coast}</div> 
                <label>р.</label>
            </div>
            
        </div>
        <div data-action="showcase" class="item_zone_right">
            <img src="./images/pngwing.com.png" width="25px" height="25px" data-action="showcase">
        </div>
    </div> `;
        productsContainer.insertAdjacentHTML('beforeend', productHTML);
    });
}

</script>