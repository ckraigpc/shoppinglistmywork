//form wrappers
const shopForm = document.getElementById('shop-form');
const itemInput = document.getElementById('item');
const btnAddItem = document.querySelector('input.btn')

// ul wrapper
const divCardAction = document.querySelector('.card-action');
const filterInput = document.getElementById('filter');
const ulParent = document.querySelector('ul.collection');
const btnClear = document.querySelector('a.clear-items');

main ();

// main function
function main (){
  // event listeners

  document.addEventListener('DOMContentLoaded',getShop);

  shopForm.addEventListener('submit',addtask);

  divCardAction.addEventListener('click',deleteItem);

  btnClear.addEventListener('click',clearTask);

  filterInput.addEventListener('keyup',filter);
}

// function delitem(event){
//   //  if(event.target.parentElement.className ==="delete-item secondary-content"){
//   //    console.log('delete')}
//   //  }
//    if(event.target.parentElement.classList.contains('delete-item secondary-conten')){
//      event.target.parentElement.parentElement.remove();
//    }
//   event.preventDefault();
// }

function getShop(){
  let shopitem;
  if(localStorage.getItem('shopitem')===null){
    shopitem = [];
  }else{
    shopitem = JSON.parse(localStorage.getItem('shopitem'));
  }

  shopitem.forEach(function(item){
     //create element for the li
     let li = document.createElement('li');

     // add class to the list item
     li.className= "collection-item";
 
     //add li item value from textinput
     li.appendChild(document.createTextNode(item));
 
     // add a childelement on the list item..
     let link = document.createElement('a');
 
     // add a class on link
     link.className = "delete-item secondary-content";
 
     // append link on list
     li.appendChild(link)
 
     // create an delete icon on parent link
     link.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>'
   
     // append link and icon to their parent.. 
     li.appendChild(link);
 
     // append on the parent element
     ulParent.appendChild(li);
 
  });

}
function addtask(e){
  //check for input value
  if(itemInput.value ===''){
    alert('Enter an Item to Buy');
  }else{
    //create element for the li
    let li = document.createElement('li');

    // add class to the list item
    li.className= "collection-item";

    //add li item value from textinput
    li.appendChild(document.createTextNode(itemInput.value));

    // add a childelement on the list item..
    let link = document.createElement('a');

    // add a class on link
    link.className = "delete-item secondary-content";

    // append link on list
    li.appendChild(link)

    // create an delete icon on parent link
    link.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>'
  
    // append link and icon to their parent.. 
    li.appendChild(link);

    // append on the parent element
    ulParent.appendChild(li);

     // store items in the local storage
     storePermanently(itemInput.value);

    alert("Saved");

    itemInput.value = "";
    }
    e.preventDefault();
 
  }

function storePermanently(item){
    let shopitem;
    if(localStorage.getItem('shopitem')===null){
      shopitem = [];
    }else{
      shopitem = JSON.parse(localStorage.getItem('shop'));
    }
    shopitem.push(item);

    localStorage.setItem('shopitem',JSON.stringify(shopitem));

    alert('saved');

    event.preventDefault();
}

function deleteItem(event){
  if(event.target.parentElement.classList.contains('delete-item')){
    if(confirm("Do you want to remove this from you List?")){
     event.target.parentElement.parentElement.remove();

     removePermanently(event.target.parentElement.parentElement)
    }
  }
}
function removePermanently(shopcontent){
  let shopitem;
  if(localStorage.getItem('shopitem')=== null){
    shopitem = [];
  }else{
    shopitem = JSON.parse(localStorage.getItem('shopitem'));
  }
  shopitem.forEach(function(item,index){
    if(shopcontent.textContent === item){
      shopitem.splice(index,1)
    }
  });

  localStorage.setItem('shopitem',JSON.stringify(shopitem));
}

function clearTask(){
  while(ulParent.firstChild) {
    ulParent.removeChild(ulParent.firstChild);
    
  }
  clearStorage()
}

function clearStorage (){

  localStorage.clear();

}
function filter(event){
  
  const text = event.target.value.toLowerCase();
  
  // select all in the nodelist

  const items = document.querySelectorAll('.collection-item')

  items.forEach(function(shopitems){
    const item = shopitems.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      shopitems.style.display = "block"
    }else{
      shopitems.style.display = "none";
    }

  });
  

  console.log(text)

  event.preventDefault();
}
