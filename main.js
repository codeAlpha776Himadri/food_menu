const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];

function addItem(e) {

    e.preventDefault();
    console.log(this);
    const text = this.item.value;
    //alternative of above stmt....... 
    // const text = (this.querySelector('[name = item]')).value ;
    console.log(text)
    const item = {
        text,
        done: false
    }

    console.log(item);
    items.push(item);
    addItemToList(items, itemsList);
    //converting item obj to string to save to local storage 
    let itemsString = JSON.stringify(items);

    //setting the items in local storage 
    localStorage.setItem('items', itemsString)

    this.reset(); //clearing the form once submitted
}

function addItemToList(plates = [], platesList) {
    platesList.innerHTML = plates.map((plate, i) => {
        console.log(plate.text);
        return `
            <li>
                <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
                <label for="item${i}">
                    ${plate.text} 
                </label>
            </li>
        `
    }).join(' ');
}


function toggleDone(e) {

    if (!e.target.matches('input')) {
        return;  // skip unless input is encountered 
    }
    const elem = e.target;
    const index = elem.dataset.index;
    items[index].done = !items[index].done;

    let itemsString = JSON.stringify(items);
    localStorage.setItem('items', itemsString);

    addItemToList(items, itemsList);
}

addItems.addEventListener('submit', addItem)
itemsList.addEventListener('click', toggleDone)

addItemToList(items, itemsList);
