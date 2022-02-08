$(function(){//sayfa tamamen yüklendikten sonra çalışacak
    var svg = Pablo(`#ground`).svg({//yükseklik ve genişlik ayarı
        width:1100,
        height:750
    });
    var top;///koordinat Sistemi
    var topX=550;
    var topY=500;
    var topR=10;

    var alanX1 =0;
    var alanX2 =702;

    var alanY1=0;
    var alanY2=750;

    top = svg.circle({
        cx:topX,
        cy:topY,
        r:topR,//yarıçap
        fill:'#eee920'
    });
    /*var x=3;
    var interval=setInterval(function(){
        x=x+1;
        console.log(x);
        if(x==100){
            clearInterval(interval);//interval durdurma
        }
    },2);*/
    var yon=[+1,-1];

    var yonX =yon[Math.floor(Math.random()*2)] //0 yada 1 değerini alacak
    var yonY=yon[Math.floor(Math.random()*2)];   //topu hareket ettirme

    var yay; // yay oluşturma
    var yayX=400;
    var yayY=700;

    yay=svg.rect({
        x:yayX,
        y:yayY,
        width:240,height:40,
        fill:'#ff7a4d'
    });
    //console.log(yay); //yayı çağırma kodu

    var w=85; //genişliğini belirtme fonksiyonu
    var h=25; //yüksekliğini belirtme fonksiyonu  

    var tuglaArray=new Array(); //array fonksiyonu



    for(var tY=50;tY<350;tY=tY+45){ //birden fazla tuğla oluşturma
        for(var tX=35;tX<1065;tX=tX+105){

            var randomCiz=Math.floor(Math.random()*2); //seviye sistemi
            if(randomCiz==1)

            tuglaOlustur(tX,tY);
        }
    }
    var guc=1; //guc hızını oluşturma

    setInterval(function(){
        top.attr({cx:topX,cy:topY});
        topX=topX+yonX;
        topY=topY+yonY;

        //x=Math.random();//0 ve 1 arası rastgale değer üretir
        //x=Math.floor(Math.random()*10);// 0 ile 9 arasında rastgale sayı üretir
        //console.log(x);

        if(topX==alanX1+10||topX==alanX2-10){ //x ekseninde topun çarpması için
            yonX=yonX*-1;
        }
        if(topY==alanY1+10||topY==alanY2-10){   //y ekseninde topun çarpması için
            yonY=yonY*-1;
        }
        
        if(topY==690 && (topX>yayX-10 && topX<yayX+250)) //topun yaya çarpması
        {
            yonY=yonY*-1;
        }

        
        //if((guc>0)&&((topY==285 && (topX>290 && topX<395))|| (topY==240 && (topX>290 &&topX<395)))) // sol tuğla sınırları çarpışma
        //{
           // yonY=yonY*-1;
         //   guc=guc-1;
        //    if(guc==0)
      //      tugla.remove();
           
      //  }
      //  if((guc>0)&&((topX==290 && (topY>240 && topX<285))|| (topX==395 && (topY>240 &&topY<285)))) // sağ tuğla sınırları çarpışma
      //  {
      //      yonX=yonX*-1;
      //      tugla.remove();
      //      guc=0;
       // }

       for(var i=0;i<tuglaArray.length;i++) //birden fazla tuğlayı yok etme
       {
        if((tuglaArray[i].guc>0) && ((topY==tuglaArray[i].y+h+topR && (topX>tuglaArray[i].x-topR && topX<tuglaArray[i].x+w+topR))||(topY==tuglaArray[i].y-topR && (topX>tuglaArray[i].x-topR && topX<tuglaArray[i].x+w+topR)))){
            yonY=yonY*-1;
            tuglaArray[i].sanal.remove();
            tuglaArray[i].guc=0;
        }

        if((tuglaArray[i].guc>0) && ((topX==tuglaArray[i].x-topR && (topY>tuglaArray[i].y-topR && topY<tuglaArray[i].y+h+topR))||(topX==tuglaArray[i].x+w+topR && (topY>tuglaArray[i].y-topR && topY<tuglaArray[i].y+h+topR)))){
            yonX=yonX*-1;
            tuglaArray[i].sanal.remove();
            tuglaArray[i].guc=0;
        }
    }
       
    },2); //topun hızının belirlenmesi

    $(document).mousemove(function(e){ //mouse değer gösterme
        yayX=e.clientX;
        if(yayX<860)
            yay.attr({x:yayX});
    })
    $(document).keydown(function(event){//klavyede değer gösterme
        var code = event.which;
        
        if(code==37){
            yayX=yayX-3;

            if(yayX>0)
                yay.attr({x:yayX});
        }
        if(code==39){
            yayX=yayX+5;

            if(yayX<860)
                yay.attr({x:yayX});
        }
    })
    var tugla; //var operatörü değer oluşturmak için

    function tuglaOlustur(tx,ty){ //tuğla oluşturma
        var sanalTugla=svg.rect({
            x:tx,
            y:ty,
            width:w,height:h,
            fill:'#FF2626'
        })
        var tugla={
            x:tx,
            y:ty,
            guc:1,
            sanal:sanalTugla
        }
        tuglaArray.push(tugla);
        //unshift(); dizinin başına eleman ekler
        //splice(0,1); silme işlemini yapar
        //pop();dizinin son elamınını siler
        //shift();dizinin ilk elemanını siler
    }
})