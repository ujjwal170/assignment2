function getAndUpdate()
{
    console.log("Updating List...");
    ItemName = document.getElementById('ItemName').value;
    quantitystr = document.getElementById('quantity').value;
    quantity=parseInt(quantitystr)
    if (localStorage.getItem('itemsJson')==null)
    {
        var itemJsonArray = []; 
        if(ItemName!="")
        {
            itemJsonArray.push([ItemName, quantity]);
            localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
        }
        update();
    }
    else
    {
        itemJsonArrayStr = localStorage.getItem('itemsJson')
        let itemJsonArray = JSON.parse(itemJsonArrayStr);
        if(ItemName!="")
        {
            var ch=0;
            itemJsonArray.forEach((element)=>{
                if(element[0]==ItemName)
                {
                    element[1]+=quantity;
                    ch=1;
                    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
                }
            });
            console.log(ch)
            if(ch==0)
            {
                itemJsonArray.push([ItemName, quantity]);
                localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
            }ch=0;
            update();
        }
    }
    document.getElementById('ItemName').value="";
    document.getElementById('quantity').value="";
}

function update()
{
    if (localStorage.getItem('itemsJson')==null)
    {
      //console.log("hi")
        var itemJsonArray = []; 
       // localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    } 
    else
    {
        itemJsonArrayStr = localStorage.getItem('itemsJson')
        itemJsonArray = JSON.parse(itemJsonArrayStr); 
    }
    // Populate the list
    let container2b=document.getElementById("container2b");;
    let str = "";
    itemJsonArray.forEach((element, index) => {
        str += `
        <div class="newcontainer ">

        <button class="btn" onclick="edit(${index})">Edit</button>
        <button class="btn" onclick="deleted(${index})">Delete</button>
        <div class="newItem" >
        <h3 class="">${index + 1}.) ${element[0]}</h3>
        <h2 class="quan">x ${element[1]}</h2> 
        </div>
        </div>`; 
    });
    
    container2b.innerHTML = str;
}
update();





function change(itemIndex)
{
    itemJsonArrayStr = localStorage.getItem('itemsJson')
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    itemJsonArray[itemIndex][0]=document.getElementById('ItemName').value;
    quantitystr=document.getElementById('quantity').value;
    itemJsonArray[itemIndex][1]=parseInt(quantitystr);

    var str2="";
    str2+=`<button id="add" class="con1" onclick="getAndUpdate()">Add</button>`
    AddSave.innerHTML=str2;

    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    document.getElementById('ItemName').value="";
    document.getElementById('quantity').value="";
    update();
}





function edit(itemIndex)
{
    temp=document.getElementById("add")

    document.getElementById('container1a').innerText="Edit this item";
    
    itemJsonArrayStr = localStorage.getItem('itemsJson')
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    document.getElementById('ItemName').value=itemJsonArray[itemIndex][0];
    document.getElementById('quantity').value=itemJsonArray[itemIndex][1];

    var str1="";
    str1+=`<button id="save" class="con1" onclick="change(${itemIndex})">Save</button>`
    AddSave.innerHTML=str1;
}




function deleted(itemIndex)
{
    itemJsonArrayStr = localStorage.getItem('itemsJson')
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    // Delete itemIndex element from the array
    itemJsonArray.splice(itemIndex, 1);
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    update();

}


clr.addEventListener("click",()=>{
  if(confirm("do you really want to clear?"))
  {
    localStorage.clear()
    console.log("clearing the list")
    update();
  }
})