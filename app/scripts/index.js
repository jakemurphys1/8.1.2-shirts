var $ = require("jquery")
var orderCount = 0;

    function setCookie(cname, cvalue, exdays) {
       var d = new Date();
       d.setTime(d.getTime() + (exdays*24*60*60*1000));
       var expires = "expires="+d.toUTCString();
       document.cookie = cname + "=" + cvalue + "; " + expires;

     }
    function getCookie(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');

            for(var i=0; i<ca.length; i++) {
                var c = ca[i];

                while (c.charAt(0)==' ') c = c.substring(1);
                if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
            }
            return "";
    }

//setCookie("orderCount",0)

 if(parseInt(getCookie("orderCount"))>-1){
   orderCount=parseInt(getCookie("orderCount"));
 }

console.log(orderCount)
var TotalOrder = [];
for(var i = 1;i<orderCount+1;i++){
  //localStorage.removeItem(keyName);
    var curItem = JSON.parse(localStorage.getItem('Order' + i))
//item expiration
var ItemExp = new Date(curItem.Time);
var hours = ItemExp.getHours();
var minutes = ItemExp.getMinutes();
var totMinutes = hours*60+minutes;
//current Time
var curTime = new Date();
var curHours = curTime.getHours();
var curMinutes = curTime.getMinutes();
var curTotMinutes = curHours*60+curMinutes;

if(curTotMinutes>totMinutes+10){
  localStorage.removeItem('order' + i)
} else{
  $(".Orders").append("<p><h3>" + curItem.Name + "</h3> <span><b>Quantity</b>:" + curItem.Qty
  +"</span> <span><b>Size</b>: " + curItem.Size +"</span><span>   Expires in: " + (10-(curTotMinutes-totMinutes)) +" minutes</span></p>")
}

}


$(".Orders").append(TotalOrder)


$(".frogForm").submit(function(e){
  e.preventDefault();
  var curQty = this.elements["Qty"].value;
  var curSize = this.elements["Size"].value;
  var name = this.name;
  var totObject = {"Name":name,"Size":curSize,"Qty":curQty,"Time":Date.now()}
  orderCount+=1;
  localStorage.setItem("Order"+ orderCount,JSON.stringify(totObject))
  setCookie("orderCount",orderCount)
  //localStorage.setItem("orderCount",orderCount)
})

$(".checkout").click(function(){
  window.location="cart.html";
})
