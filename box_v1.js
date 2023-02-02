
/*
사용시 주의 사항 javascript는 변수이름과 함수이름이 같다.
var div = div( {"class":"box"}, text ); 식의 함수명을 변수명으로 사용하면 
그 다음 줄 부터 div()를 사용하면 이것을 변수로 인식한다. base.js의 함수로 인식하는것이 아니라 var div 로 선언된 변수로 인식하여 결과값이 이상하게 나올 수 있다.
*/

var g_fMobileWidth = 800;
var g_fTabletWidth = 1200;

var g_fScreenWidth = screen.width;
if( g_fScreenWidth < 200 )
  g_fScreenWidth = 1024;
var g_fScreenHeight = screen.height;
if( g_fScreenHeight < 200 )
  g_fScreenHeight = 768;

var g_bMobile = false;
var g_bTablet = false;
var g_bDesktop = false;
var g_fFontSize = 10;
if( screen.width < g_fMobileWidth ){ // mobile
  g_bMobile = true;
  g_fFontSize = 16;
} 
else if( screen.width >= g_fMobileWidth && screen.width < g_fTabletWidth ){ // tablet
  g_bTablet = true;
  g_fFontSize = 16;
} 
else { // desktop
  g_bDesktop = true;
  g_fFontSize = 22;
}


//var g_colors = ["blue","blue","blue","blue","blue"];
var g_sData_skipCss = "data-skip-css"; // custom속성
var g_sData_findable = "data-findable";
var g_sData_display = "data-display"; // inline-block과 block을 show hide하기위해 diplay속성을 저장해놓는 data속성
var g_sData_type = "data-type"; // script와 style에 <script data- = ""> < style data-type = "">
var g_sData_html = "data-html";
var g_sID_content = "content";
var g_currentCodeMirror;
var g_elModal;
var g_pModalEditor;
var g_funcClose_ModalEditor;
var g_elModal_ContentDiv;
var g_elContent;
var g_nLogLevel = 0;

function $b() {
  return block.apply(null,arguments);
}

function $i() {
  return item.apply(null,arguments);
}

function $s() {
  return space.apply(null,arguments);
}

function $() {
  /*
  $()
  $("<div></div>")
  $("50%")
  $(200)
  $("30px")
  $(element)
  $(el)
  $(css)
  $("test")
  $("#id")
  $(".class")
  "#id", ".class" 과 같이 하면 해당 element를 찾아서 el클래스를 만들어서 리턴한다.
  */

 var el1 = div();
 el1.setEl.apply(el1,arguments)
 if( g_bAutoBlockAppend )
    el1.toBody();
 return el1;
}

function _() {
  /*
  $()함수와 똑같다 다만 $("test")는 div를 생성하는데 _("test")는 에러난다.
  _("div") _("span") 과 같이 사용하기때문에 $()는 이런 용도로는 사용 못한다.
  _("div","test") 라고 하면된다.argument[0] => 즉 첫번째 인자값은 element생성용이다. 

  따라서 new _el()과 완전똑같다 유일한 차이는 body에 붙이느냐 안붙이느냐의 차이이다.
  */

  var arrElement = elementFromString.apply(null,[arguments[0],false]);
  var el1 = new el(arrElement[1]);

  // var el1 = new el(arguments[0]); // arguments[0] => div
  var start = 1;
  if( arrElement[0] == true )
    start = 0;
  var arr = [];
  for( i = start; i < arguments.length; i++ ){ // arguments[1] ...
    arr.push(arguments[i]);
  }
  el1.setEl.apply(el1,arr);
  if( g_bAutoBlockAppend )
    el1.toBody();
  return el1;
}


function elementFromString(str,bCss) {
  /*
  elementFromString("test") => test라는 element가 생성됨 => 에러임, 첫번째 인자값이 string일 경우 innerHTML을 넣을 수 없다. 
  elementFromString("div")
  elementFromString()
  elementFromString("<div></div>")
  elementFromString("50%")
  elementFromString(200)
  elementFromString("30px")
  elementFromString(element)
  elementFromString(el)
  elementFromString(css)
  bCss는 width, height, css등과 같은 css값을 적용시킬지 안할지 
  */
  if( isUndefined(bCss) )
    bCss = false;

  var element_;
  var bCssValue = false; // str이 css변경하는 Value인지를 확인
  if( isUndefined(str) == false ){
    if( isNumber(str) ){
      element_ = document.createElement('div');
      bCssValue = true;
      if( bCss )
        element_.size(str);
    }else if( isString(str) ){ // "div", "span"
      if( str.includes("<") ){ // "<div></div>"
        /* div를 만들어 innerHTML로 구성후 해당 div는 안쓰고 firstChild만 쓴다. */
        var div1 = document.createElement('div');
        div1.innerHTML = str;
        element_ = div1.firstChild;
      }else if( isIdString(str) ){
        var str = str.trim();
        element_ = id(substring(1,str.length-1));
      }else if( isClassString(str) ){
        var str = str.trim();
        element_ = id(substring(1,str.length-1));
      }else if( isPercent(str) ){
        element_ = document.createElement('div');
        bCssValue = true;
        if( bCss )
          element_.size(str);
      }else if( isPx(str) ){
        element_ = document.createElement('div');
        bCssValue = true;
        if( bCss )
          element_.size(str);
      }else{ // "div", "span"
        element_ = document.createElement(str);
      }
    }else if( isElement(str) ){
      element_ = str;
    }else if( isEl(str) ){
      element_ = str.clone();
    }else{ // arry
      element_ = document.createElement('div');
      bCssValue = true;
      if( bCss )
        css(element_,str);
    }
  }

  if( isUndefined(element_) )
    return [bCssValue,document.createElement("div")];
  else
    return [bCssValue,element_];
}

// function _(elementName) {
//   $("div");
// }

//-------------------------------------------------------------------------  blocks
var g_mainBlock = null; // main div 사각이다.
var g_blocks = []; // [ "b1", "b2", "b3" ] 식으로 들어간다.
var g_items = []; // [  ["b1_item1","b1_item2"], ["b2_item1","b2_item2"], ["b2_item1","b2_item2"], [] ] 식으로 쌓이는 배열이다.
/* [ 0, 0, 0, 20, 0 ] => g_blocks와 똑같은 갯수로 생기고 block다음에 붙는 빈공간이다. block들을 서로 떨어뜨려줌
기본적으로 0이들어가고 div은 안생긴다. 그러나 space(20);과 같이 호출하면 마지막 값이 20으로 되고 height가 20인 div()가 삽입된다.  */
var g_HSpaces = {}; // Horizontal spaces => { 0:[s1,s2], 4:[s1] }
var g_VSpaces = {}; // Vertical spaces => { 0:{0:[s1,s2],3:[s1]}, 4:{3:[s1,s2]} }
//var g_spaces = []; 
//var g_spaceDivs = []; // 요놈은 삽입된 space용 div()를 모아둔 놈으로 space(20); 호출될때 하나씩 생김

var g_bAutoBlockColor = true;
var g_bAutoBlockAppend = true;
// function randomColor(){
//   var arrayColors = ["lightgreen","dodgerblue","orange","darkTurquoise","skyblue","LimeGreen","mediumTurquoise","mediumPurple","lightblue"];
//   if( g_nRandomColorIndex >= arrayColors.length )
//     g_nRandomColorIndex = 0;
//   return arrayColors[g_nRandomColorIndex++];
// }
var g_nRandomColorIndex_green = 0;
var g_nRandomColorIndex_blue = 0;
var g_nRandomColorIndex_red = 0;
var g_nRandomColorIndex_gray = 0;
var g_randomColors = {
  "green":["lightgreen","LimeGreen","Aquamarine","Chartreuse","DarkSeaGreen","ForestGreen","green","greenyellow","LawnGreen","lime","limegreen"],
  "blue":["dodgerblue","darkTurquoise","CadetBlue","skyblue","CornflowerBlue ","mediumTurquoise","lightblue","DeepSkyBlue"],
  "red":["Coral","HotPink","LightCoral","LightSalmon","orange","SandyBrown"],
  "gray":["#cacaca","#d2d2d2","#e3e3e3","#dadada"],
};

var g_randomColorIndexes = {
  "green":0,
  "blue":0,
  "red":0,
  "gray":0,
};
function randomColor(str){
  if( g_randomColorIndexes[str] >= g_randomColors[str].length )
  g_randomColorIndexes[str] = 0;
  return g_randomColors[str][g_randomColorIndexes[str]++];
}

function setRandomBgColor(element,str){
  if( g_bAutoBlockColor ){
    if( element.has("background-color") == false )
      element.bgColor( randomColor(str) );
  }
}



function block(){ // block을 생성하여 추가하는 함수이다. getBlock은 추가된 block을 얻는 함수이다.
  /*  
  block();
  block("test"); => block("test",css,attr);
  block(element);
  block(css,attr);
  block(css);
  block(50); => height 50  => block( 50,css,attr);, block( 50,"test",css,attr);
  block(200,50); => width 200, height 50 => block(200,50,css,attr);, block( 200, 50,"test",css,attr);
    */


  var element = div();
  if( arguments.length > 0 )
    element.setEl.apply(element,arguments);


  //-------------------------------------------item();space();...block();일 경우  => 마지막 space()를  block()에 붙인다.
  var spaceDiv = null;
  var nBlockIndex =  g_blocks.length - 1;
  if( nBlockIndex >= 0 ){ 
    /* nBlockIndex는 추가될 놈이 아니라 마지막으로 가지고 있는 놈의 인덱스이다. */
    if( g_items[nBlockIndex].length > 0 ){ // item()가 호출된 후에 바로 block()이 호출될 경우
      // 새로 추가될 block() 이전에 space()가 호출되었다면 => 결국 item();space();...block();일 경우  => 마지막 space()를  block()에 붙인다.
      var bHasPrevSpace = false;
      var arrItems = g_items[nBlockIndex];
      if( has( g_VSpaces, nBlockIndex ) ){ // g_VSpaces에 해당 블락용이 있고
        var objects = g_VSpaces[nBlockIndex];
        if( has( objects, arrItems.length ) ){ // g_VSpaces에 해당 블락용 오브젝트에 해당 item 이후 space가 있다면
            bHasPrevSpace = true;
        }
      }
      
      if( bHasPrevSpace ){
        spaceDiv = lastSpace(true,true);
        //console.log(spaceDiv);
        if( spaceDiv != null ){
          // if( spaceDiv.has("width") )
          //   spaceWidth = spaceDiv.width();
          //spaceDiv.removeCss("height");
          if( spaceDiv.has("width") )
            spaceDiv.height(spaceDiv.css("width"));
          spaceDiv.removeCss("width");
          
          // var size_;
          // if( spaceDiv.has("width") ){
          //   size_ = spaceDiv.width();
          //   spaceDiv.removeCss("width");
          // }else if( spaceDiv.has("height") ){
          //   size_ = spaceDiv.height();
          //   spaceDiv.removeCss("height");
          // }
    
          // setSpaceCss(spaceDiv,size_,true);
          spaceDiv.remove();
          // nBlockIndex는 현제 block이고 추가될 블록은 nBlockIndex + 1 인덱스이다. 1번 space는 1번 블록의 윗쪽에 있다.
          if( has(g_HSpaces,nBlockIndex+1) ){
            var arr = g_HSpaces[nBlockIndex+1];
            arr.push(spaceDiv);
          }else{
            var arr = [spaceDiv];
            g_HSpaces[nBlockIndex+1] = arr; 
          }

          if( g_mainBlock == null ){
            if( g_bAutoBlockAppend )
              spaceDiv.toBody();
          }else{
            g_mainBlock.append(spaceDiv);
          }
        }  
      }
    }
  }

  setRandomBgColor(element,"blue");
  //console.log(element.element);
  //console.log(element.element);  
  g_blocks.push(element);
  //g_spaces.push(0);
  g_items.push([]);

  // for( key in g_blocks ){
  //   // console.log(key);
  //   console.log(g_blocks[key].element);  
  // }


  if( g_mainBlock == null ){
    if( g_bAutoBlockAppend )
      element.toBody();
  }else{
    g_mainBlock.append(element);
  }



  return element;
}

function item(){ // element => string or element
/*  다음과 같은 형태도 호출 가능하다.
addItem() => new one,  addItem(element) => new one, addItem("test") => new one 
addItem("test",3);
addItem("test",3,css,attr);
addItem("test",css,attr);
*/

  var nBlockIndex = g_blocks.length - 1;

  if( nBlockIndex < 0 )
    nBlockIndex = 0;

  // 블록이 하나도 없다면 아이템을 넣어야 하므로 하나 만든다.
  if( g_blocks.length == 0 ){
    block();
  }

  // if( isNumber(width) && isNumber(height) == false ){
  //   height = width; // height없이 width한개만 넣으면 => height만 값이 있는 element가 생성되는데 item은 height만 있을 경우 화면에 안보인다. width도 똑같이 넣어줌
  // }

  var element = div();
  if( arguments.length > 0 )
    element.setEl.apply(element,arguments);

  //-------------------------------------------block();space();...item();일 경우 => 마지막 space()를 item()에 붙인다.
  var spaceDiv = null;
  /* nBlockIndex는 마지막 block의 인덱스이다. */
  if( g_items[nBlockIndex].length < 1 ){ // 새로 추가될 item이 해당 블록의 첫번째 item이라면
    // 새로 추가될 item 이전에 space()가 호출되었다면 => 결국 block();space();...item();일 경우 => 마지막 space()를 item()에 붙인다.
    if( has( g_HSpaces, nBlockIndex+1 ) ){ 
      spaceDiv = lastSpace(true,false);
      if( spaceDiv != null ){
        // var size_;
        // if( spaceDiv.has("width") ){
        //   size_ = spaceDiv.width();
        //   spaceDiv.removeCss("width");
        // }else if( spaceDiv.has("height") ){
        //   size_ = spaceDiv.height();
        //   spaceDiv.removeCss("height");
        // }
  
        // setSpaceCss(spaceDiv,size_,false);

        //spaceDiv.removeCss("width");
        if( spaceDiv.has("height") )
          spaceDiv.width(spaceDiv.css("height"));
        
        spaceDiv.height("100%");
        spaceDiv.inlineBlock();

        //console.log(size_);
        spaceDiv.remove();
        var arr = [spaceDiv];
        var objects = {0:arr};
        g_VSpaces[nBlockIndex] = objects;
        //console.log(g_VSpaces);
        g_blocks[nBlockIndex].append(spaceDiv);
      }  
    }
  }
  

  setRandomBgColor(element,"red");
  element.css({"display":"inline-block"});

  // console.log(g_blocks);
  // console.log(g_items);
  g_blocks[nBlockIndex].append(element);
  g_items[nBlockIndex].push(element);
  //console.log(g_items);
  return element;
}


function getBlock(nBlockIndex){ 
  /*  block(2) => getter,  block() => new one, block("test") => new one   */
  if( isNumber(nBlockIndex) ){
    if( nBlockIndex > 0 && nBlockIndex < g_blocks.length )
        return g_blocks[nBlockIndex];
      else
        return null;
  }
}


function getItem(nBlockIndex,nItemIndex,attr){ 
  /*  다음과 같은 형태도 호출 가능하다.
  item() => new one, item("test") => new one  
  item(2) => getter => 2번 블록의 마지막 item을 가져온다.
  item(2,1) => getter, 
  item("test",3);
  item("test",3,css,attr);
  item("test",css,attr);
  */
  if( isNumber(nBlockIndex) ){ //getter
    if( nBlockIndex >= 0 && nBlockIndex < g_blocks.length ){
      if( is(nItemIndex) == false )
        nItemIndex = g_items[nBlockIndex].length - 1;

      if( nItemIndex < 0 || nItemIndex >= g_items[nBlockIndex].length )
        return null;

      return g_items[nBlockIndex][nItemIndex];
    }
    else{
      return null;
    }
  }
}


function lastSpace(bRemove,bForBlock){ 
  /*
  bForBlock => lastSpace를 block에 끼워 넣으려고 호출하냐 item에 끼워 넣으려고 호출하냐
다음과 같이 item이 0번인덱스로 생기는 경우 처음 space(15)는 block에 적용되어 있는데 block에서 제거하고 item으로 붙인다. 
block();
space(15);
item("item1");
space(20);
bRemove가 true이면 이를 위해 제거하고 제거한 놈을 리턴하여 다시 붙일 수 있게 한다.

다음과 같을 경우 
block();
space(15); 
space(15); <= 요놈은 block껀데 제거하여 item에 붙이고
item("item1");
space(20);
space(20); <= 요놈은 item껀데 제거하여 block에 붙인다.
block();

  bRemove이 false이면 그냥 마지막 space를 리턴한다.
  */

  // if( has(g_HSpaces,0) == false && has(g_VSpaces,0) == false ){
  //   return null;
  // }

  var nLastHIndex = lastKey(g_HSpaces);
  var nLastVIndex = lastKey(g_VSpaces);
  if( nLastHIndex == null && nLastVIndex == null )
    return null;

  var bVertical = false;
  if( nLastVIndex == null )
    bVertical = false;

  if( nLastHIndex == null )
    bVertical = true;

  if( nLastHIndex != null && nLastVIndex != null ){
    if( nLastVIndex >= nLastHIndex - 1 ) // space는 0번 H인경우 최초 block의 윗쪽이고 v가 0번인 경우 최초 block의 아랫쪽이다 => 1을 빼준다.
      bVertical = true;
  } 

  if( bRemove ){
    if( bForBlock ){
      if( nLastVIndex >= nLastHIndex - 1 ){
        
      }
    }else{

    }
  }

  // console.log("begin:");
  // console.log(g_VSpaces);
  // console.log(nLastHIndex);
  // console.log(nLastVIndex);
  if( bVertical ){
    var objects = g_VSpaces[nLastVIndex];
    var objectKey = lastKey(objects);
    var arr = objects[objectKey];
    var div1 = arr[arr.length - 1];
    if( bRemove ){
      // console.log(g_VSpaces);
      // console.log(objects);
      // console.log(arr);
      if( arr.length > 1 ){
        arr.pop();
        if( arr.length == 0 )
          delete objects[objectKey];
        div1.removeCss("height");
        div1.removeCss("display");
        // console.log("g_VSpaces");
        // console.log(g_VSpaces);
        return div1;
      }else{
        return null;
      }
    }else{
      return div1;
    }
  }else{
    var arr = g_HSpaces[nLastHIndex];
    var div1 = arr[arr.length - 1];
    if( bRemove ){
      if( arr.length > 0 ){
        arr.pop();
        if( arr.length == 0 )
          delete g_HSpaces[nLastHIndex];
        div1.removeCss("width");
        // console.log("g_HSpaces");
        // console.log(g_HSpaces);
        return div1;
      }else{
        return null;
      }
    }else{
      return div1;
    }
  }
}

function getSpace(nBlockIndex,nItemIndex,attr,text){ 
  /*  다음과 같은 형태도 호출 가능하다.
  space() => 0px
  space(20) => 20px
  space(2,1) => getter => item용 space => 2번째 H, 1번째 V
  space(2,null) => getter =>block용 space => getter 2번째 H
  space(2,null,null,"test") => setter => 크기가 2인 space를 생성하여 붙인다.
  space(element);
 */
  if( isNumber(nBlockIndex) == false ) // nBlockIndex가 element일 경우
  {
    if( is(nBlockIndex) )
      return space(nBlockIndex); 
    else
      nBlockIndex = 0;
  }

 var n1Block2Item3Setter = 3;

  if( is(nItemIndex) == false ){
    n1Block2Item3Setter = 3;
  }else{
    if( isNumber(nItemIndex) ){
      n1Block2Item3Setter = 2;
    }else if( nItemIndex == null ){
      if( is(attr) == false ){
        n1Block2Item3Setter = 1;
      }else{
        n1Block2Item3Setter = 3;
      }
    }else{
      n1Block2Item3Setter = 3;
    } 
  }

  if( n1Block2Item3Setter == 1 ){ // getter
    if( has( g_HSpaces, nBlockIndex ) ){
      var arr = g_HSpaces[nBlockIndex];
      return arr[arr.length-1];
    }
  }else if( n1Block2Item3Setter == 2 ){ // new one => nItemIndex에는 css값이 css에는 attr이 값으로 들어온다.
    if( has( g_VSpaces, nBlockIndex ) ){
      var objects = g_VSpaces[nBlockIndex];
      if( has( objects, nItemIndex ) ){
        var arr = objects[nItemIndex];
        return arr[arr.length-1];
      }
    }
  }else{
    return space(nBlockIndex,nItemIndex,attr,text); 
  }
}

function space(){ 
/*
0번 space
0번 block
1번 space
1번 block
space의 인덱스는 block의 윗쪽 item의 왼쪽이 0번이다.
*/
  var bItemsInTheBlock = false;
  var div1 = div();
  if( arguments.length > 0 )
    div1.setEl.apply(div1,arguments);
  var nBlockIndex = g_blocks.length-1;
  if( nBlockIndex >= 0 ) // block이 하나도 없다면 그냥 0번 space만 추가한다.
    bItemsInTheBlock = (g_items[nBlockIndex].length > 0)?true:false;

  // var size_ = 0;
  // if( isNumber(widthOrHeight) ){
  //   size_ = widthOrHeight;
  // }

  if( bItemsInTheBlock ){
    setSpaceCss(div1,false);
  }else{
    setSpaceCss(div1,true);
  }


  if( bItemsInTheBlock ){ // 마지막으로 넣은것이 block이 아니라 item이었다면 => VSpace
    var nLastItemIndexInTheBlock = g_items[nBlockIndex].length;  
    if( has( g_VSpaces, nBlockIndex  ) ){ 
      var spacesInTheBlock = g_VSpaces[nBlockIndex ]; //  { 0:{0:[s1,s2],3:[s1]}, 4:{3:[s1,s2]} } => 4 => {3:[s1,s2]}
      if( has( spacesInTheBlock, nLastItemIndexInTheBlock  ) ){ 
        var spacesInTheItem = spacesInTheBlock[nLastItemIndexInTheBlock ];
        //console.log(nLastItemIndexInTheBlock);
        spacesInTheItem.push(div1); // [s1,s2] => [s1,s2,s3]
      }else{
        spacesInTheBlock[nLastItemIndexInTheBlock ] = [div1]; // new array
      }
    }else{ // 4:{4:[s1]}
      var newObjects = {};
      g_VSpaces[nBlockIndex] = newObjects;
      newObjects[nLastItemIndexInTheBlock] = [div1];
    }
  }else{ // HSpace => { 0:[s1,s2], 4:[s1] }
    if( has( g_HSpaces, nBlockIndex + 1 ) ){
      g_HSpaces[nBlockIndex + 1].push(div1); // [s1,s2] => [s1,s2,s3]
    }else{
      g_HSpaces[nBlockIndex + 1] = [div1];
    }
  }
  
  //  console.log(g_HSpaces);
  //  console.log(g_VSpaces);
  if( bItemsInTheBlock ){
    g_blocks[g_blocks.length-1].append(div1);
  }else{
    if( g_mainBlock == null ){
      if( g_bAutoBlockAppend )
        div1.toBody();
    }else{
      g_mainBlock.append(div1);
    }
  }

  return div1;
}

function setSpaceCss(element,bHorizontal){

  // var spaceWidth, spaceHeight;
  // if( spaceDiv.has("width") ){
  //   spaceWidth = spaceDiv.width();
  // }else{
  //   spaceWidth = "100%";
  // }
  // if( spaceDiv.has("height") ){
  //   spaceHeight = spaceDiv.height();
  // }else{
  //   spaceHeight = "100%";
  // }

  // if( bHorizontal ){

  // }else{

  // }

  var c_space = {
  };

  var size_ = 0;
  
  if( bHorizontal ){
    if( element.has("height") == false ){
      if( element.has("width") )
        c_space["height"] = element.css("width");
    }
    element.removeCss("width");
    
  }else{
    if( element.has("width") == false ){
      if( element.has("height") )
        c_space["width"] = element.css("height");
    }

    //c_space["width"] = widthOrHeight+"px";
    //if( element.has("height") == false )
    // if( element.has("width") ) 
    //   c_space["height"] = "100%";
    c_space["height"] = "1px"; // 100%로 넣으면 input과 같이 item을 넣을때 input이 밑으로 내려옴
    c_space["display"] = "inline-block";
  }

  if( g_bAutoBlockColor ){
    c_space["background-color"] = randomColor("gray");
  }

  element.css(c_space);
}




// function mainBlock(element,css,attr){ 
//   /*   mainBlock() => getter or new one, mainBlock("test") => new one, mainBlock(element) => new one   */
//   if( is(element) == false && g_mainBlock != null) //getter
//     return g_mainBlock;

//   return addMainBlock(element,css,attr);
// }

function mainBlock(){ 
  /*   addMainBlock() => new one, addMainBlock("test") => new one, addMainBlock(element) => new one   */
  // if( is(element) == false )
  //   element = div(css,attr);
  // else if( isString(element) ){
  //   element = div(element,css,attr);
  // }else{
  //   element.css(css);
  //   element.attr(attr);
  // }
  
  var element = div();
  element.setEl.apply(element,arguments);

  if( g_mainBlock != null ) // main을 바꾼다.
    removeBlocks();
    
  g_mainBlock = element;
  //setRandomBGColorRed(element);
  if( g_bAutoBlockColor ){
    if( element.has("background-color") == false )
      element.bgColor( "yellow" );
  }
  
  // console.log(g_HSpaces);
  // console.log(g_VSpaces);
  var lastBlockIndex = g_blocks.length - 1;
  g_blocks.forEach(function(item,index){
    if( has(g_HSpaces,index) ){
      var spacesInTheBlock = g_HSpaces[index];
      spacesInTheBlock.forEach(function(space,spaceIndex){
        space.remove();
        g_mainBlock.append(space);
      });
    }
    item.remove();
    g_mainBlock.append(item);
  });

  // block은 인덱스가 5번까지이지만 space는 6번 인덱스가 있을 수 있다. => 있을경우 처리해준다.
  if( has(g_HSpaces,lastBlockIndex + 1) ){
    var spacesInTheBlock = g_HSpaces[lastBlockIndex + 1];
    spacesInTheBlock.forEach(function(space,spaceIndex){
      space.remove();
      g_mainBlock.append(space);
    });
  }


  if( g_bAutoBlockAppend )
    g_mainBlock.toBody();

  return g_mainBlock;
}

function autoColor(bAutoColor){
  if( is(bAutoColor) )
    g_bAutoBlockColor = bAutoColor
}

function autoAppend(bAutoAppend){
  if( is(bAutoAppend) )
    g_bAutoBlockAppend = bAutoAppend;
}

function eachBlock(func,bBlock,bItems,bHSpace,bVSpace){
  if( is(bItems) == false ){
    bItems = true;
  }

  if( is(bBlock) == false ){
    bBlock = true;
  }

  if( is(bHSpace) == false ){
    bHSpace = true;
  }

  if( is(bVSpace) == false ){
    bVSpace = true;
  }

  if( bBlock ){
    g_blocks.forEach(function(item,index){
      func(item,index);
    });
  }

  if( bHSpace ){
    //console.log(g_HSpaces);
    for( key in g_HSpaces ){
      //console.log(key);
      g_HSpaces[key].forEach(function(item,index){
        func(item,index);
      });
    }
  }

  if( bVSpace ){
    for( key in g_VSpaces ){
      for( subKey in g_VSpaces[key] ){
        //console.log(subKey);
          g_VSpaces[key][subKey].forEach(function(item,index){
            func(item,index);
        });
      }
    }
  }    


  if( bItems ){
    eachItem(func);
  }
}



function eachItem(func,nBlockIndex){
  if( is(nBlockIndex) ){
    g_items[nBlockIndex].forEach(function(subItem,subIndex){
      func(subItem,index,subIndex);
    });
  }else{
    g_items.forEach(function(item,index){
      item.forEach(function(subItem,subIndex){
        func(subItem,index,subIndex);
      });
    });
  }
}


function eachBlockExcept(css,newValue,bBlocks,bItems,bHSpace,bVSpace,arrExceptions){
  var found = false;
  eachBlock(function(item,index){
    found = false;
    if( is(arrExceptions) ){
      arrExceptions.forEach( function(exceptItem,exceptIndex){
        if( exceptItem == item ){
          
          found = true;
        }
      });
    }
    if( found == false )
      item.css(css,newValue);
  },bBlocks,bItems,bHSpace,bVSpace);
}

function cssBlock(css,newValue,arrExceptions){
  eachBlockExcept(css,newValue,true,false,false,false,arrExceptions);
}

function cssItem(css,newValue,arrExceptions){
  eachBlockExcept(css,newValue,false,true,false,false,arrExceptions);
}

function cssSpace(css,newValue,arrExceptions){
  eachBlockExcept(css,newValue,false,false,true,true,arrExceptions);
}

function cssHSpace(css,newValue,arrExceptions){
  eachBlockExcept(css,newValue,false,false,true,false,arrExceptions);
}

function cssVSpace(css,newValue,arrExceptions){
  eachBlockExcept(css,newValue,false,false,false,true,arrExceptions);
}

function cssAll(css,newValue,arrExceptions){
  eachBlockExcept(css,newValue,true,true,false,false,arrExceptions);
}

function initBlocks(){
  //autoColor(true);
  g_mainBlock = null;
  g_blocks = [];
  g_HSpaces = {};
  g_VSpaces = {};
  //g_spaceDivs = [];
  //g_spaces = [];
  g_items = [];  
}

function removeBlocks(){
  if( g_mainBlock == null ){
    g_blocks.forEach(function(item,index){
      item.remove();
    });
    for( key in g_HSpaces ){
      g_HSpaces[key].forEach(function(item,index){
        item.remove();
      });
    }

    for( key in g_VSpaces ){
      for( subKey in g_VSpaces[key] ){
          g_VSpaces[key][subKey].forEach(function(item,index){
          item.remove();
        });
      }
    }

  }else{
    g_mainBlock.remove();
  }


  g_mainBlock = null;
  g_blocks = [];
  g_HSpaces = {};
  g_VSpaces = {};
  //g_spaceDivs = [];
  //g_spaces = [];
  g_items = [];
}


//--------------------------------------------------------------- graphic struct => for .svg
function Struct(names) {
  var names = names.split(' ');
  var count = names.length;
  function constructor() {
    for (var i = 0; i < count; i++) {
      this[names[i]] = arguments[i];
    }
  }
  return constructor;
}

var Rect_ = Struct("x y width height");
var Size_ = Struct("width height");
var Point_ = Struct("x y");

function size(width,height){
  return new Size_( width, height );
}

function rt( x, y, width, height ){
  if( is(x) == false ){
    x = 0;
    y = 0;
    width = 0;
    height = 0;
  }
  if( is(y) == false ){
    y = 0;
    width = x;
    height = x;
    x = 0;
  }
  if( is(width) == false ){
    width = x;
    height = y;
    x = 0;
    y = 0;
  }
  if( is(height) == false )
    height = width;
  return new Rect_( x, y, width, height );
}

function pt( x, y ){
  if( is(y) == false )
    y = x;
  return new Point_( x, y );
}

function moveRt( rect, x, y ){
  if( is(y) == false )
    y = x;
  return rt( rect.x + x, rect.y + y, rect.width, rect.height );
}

function centerRt( rect, x, y ){
  if( is(y) == false )
    y = x;
  return rt( x - rect.width*0.5, y - rect.height*0.5, rect.width, rect.height );
}

function paddingRt( rect, paddingX, paddingY ){
  if( is(paddingY) == false )
    paddingY = paddingX;
  return rt( rect.x + paddingX, rect.y + paddingY, rect.width - paddingX*2.0, rect.height - paddingY*2.0 );
}

function resizeRt( rect, width, height, bTopLeft ){
  if( is(height) == false )
    height = width;

  if( is(bTopLeft) ){
    if( bTopLeft )
      return rt( rect.x + width, rect.y + height, rect.width - width, rect.height - height );
  }

  return rt( rect.x, rect.y, rect.width - width, rect.height - height );
}

//--------------------------------------------------------------- element methods
function id(id){
  return document.getElementById(id);
}

// function cl(className){
//   return document.getElementsByClassName(className);
// }

/* this.함수 로 정의하면 모든 element에 해당 함수를 사용할 수 있다. */

// function element(){
//   var element_ = new el();
//   element_.setEl.apply(null,arguments);
//   return element_;
// }
//---------------------------------------------------------------------------------------------- El 
//function el(elementName,width,height,css_,attr_,text_){
  function el(){

  this.parent = null;
  this.children = [];
  this.element = null;
  //------------------------------ CSS 함수들
  this.dicHover = {}; 
  this.dicClicked = {}; 
  this.dicNormal = {}; 
  this.dicSelected = {}; 
  this.bHovered = false; // hover되고 있는 상태
  this.bSelected = false; // selected된 상태
  this.bClicked = false; // click하고 css가 아직 복원되지 않은 상태 (setTimeOut => 약 0.5초)
  /*
  this.element.onclick 이벤트에
  this.onclick() 과 this.funcCssClick()가 같이 호출됨
  this.element.onmouseover 이벤트에
  this.onmouseover() 과 this.funcCssMouseOver()이 같이 호출됨
  */
  this.funcCssMouseOver = null;
  this.funcCssMouseOut = null;
  this.funcCssClick = null;
  this.funcCssClick_start = null;
  this.funcCssClick_end = null;
  this.funcClick = null;
  this.funcMouseOver = null;
  this.funcMouseOut = null;

    /*
  $()
  $("<div></div>")
  $("50%")
  $(200)
  $("30px")
  $(element)
  $(el)
  $(css)
  $("#id")
  $(".class")
  "#id", ".class" 과 같이 하면 해당 element를 찾아서 el클래스를 만들어서 리턴한다.

  $()함수와 똑같다 다만 $("test")는 div를 생성하는데 _("test")는 에러난다.
  _("div") _("span") 과 같이 사용하기때문에 $()는 이런 용도로는 사용 못한다.
  _("div","test") 라고 하면된다.argument[0] => 즉 첫번째 인자값은 element생성용이다. 
  */

    //-------------------------------------------------------- create element -------------------------------------------------------
  /*
  아래 로직은 width, height를 넣을 수 있게 하기 위해 추가함 width height를 넣는 형태는 아래와 같음
    block(50); => height 50 
    block( 50,css,attr);
    block( 50,"test",css,attr);
    block(200,50); => width 200, height 50 
    block(200,50,css,attr);
    block( 200, 50,"test",css,attr);
    this.setElement()함수가 text,css,attr등을 처리해 준다면 요 아래 로직은 width, height를 css에 추가함
    */
   
   if( arguments.length < 1 ){
     this.element = document.createElement("div");
     return this;
   }

   var arrElement = elementFromString.apply(null,[arguments[0],false]);
   this.element = arrElement[1];
 
   // var el1 = new el(arguments[0]); // arguments[0] => div
   var start = 1;
   if( arrElement[0] == true )
     start = 0;
   var arr = [];
   for( i = start; i < arguments.length; i++ ){ // arguments[1] ...
     arr.push(arguments[i]);
   }

   if( arr.length > 0 )
    this.setEl.apply(this,arr);
   return this;
}


el.prototype.setEl = function(){

      /*
    아래 구문은 인자값을 조사하여 해당 변수에 넣는 구문이다.
    문자열일 경우 => "div"와 같은 생성자나 "test"같은 innerHTML이다.
    배열일 경우 => css나 attre이다. 
    숫자일 경우 => width나 height이다.
    string => "div" or "text"
    element => 
    number => width,height => 200, 50, => "200px", "50px" => "80%", "40%"
    object array => css and attr
    function => onclick    
    */

    //var n1Percent2Px = 0;
    var text_, width_, height_, css_, attr_;
  for (i = 0; i < arguments.length; i++) {
    if( is(arguments[i]) ){ // null 이나 undefined가 들어오면 여기 걸린다. => undefined이거나 null인 변수를 넣으면 여기 걸림      
        if( isEl( arguments[i] ) ){
            this.element = arguments[i].element;
        }else if( isElement( arguments[i] ) ){
            this.element = arguments[i];
        }else if( isNumber( arguments[i] ) ){
            if( isUndefined(width_) )
              width_ = arguments[i];
            else
              height_ = arguments[i];
        }else if( isPercent( arguments[i] ) ){
            n1Percent2Px = 1;
            if( isUndefined(width_) )
              width_ = arguments[i];
            else
              height_ = arguments[i];
        }else if( isPx( arguments[i] ) ){
            n1Percent2Px = 2;
            if( isUndefined(width_) )
              width_ = arguments[i];
            else
              height_ = arguments[i];
        }else if( isString( arguments[i] ) ){
            // if( isUndefined(elementName) )
            //   elementName = arguments[i];
            // else
              text_ = arguments[i];
        }else{ // object array
            if( isUndefined(css_) ){
              if( has(arguments[i],"id") || has(arguments[i],"class") ){
                attr_ = arguments[i];  
              }else{
                css_ = arguments[i];
              }
            }else{
              attr_ = arguments[i];
            }
        }
    }
  }


  // if( isUndefined(elementName) )
  //     elementName = "div";

  // if( isUndefined(element_) ){
  //   this.element = document.createElement(elementName);
  // }else{
  //   this.element = element_;
  // }


  if( isUndefined(width_) == false ){
    if( isUndefined(height_) ) // div(50); => height가 50이다.
        this.height(width_);
    else
        this.size( width_, height_ );
  }

  if( isUndefined(text_) == false ){
    this.html(text_);
  }

  if( isUndefined(css_) == false ){
    this.css(css_);
  }

  if( isUndefined(attr_) == false ){
    this.attr(attr_);
  }
}

el.prototype.class = function(sClassName) { // Element
  if( isUndefined(sClassName) )
    return this.attr("class");
  else
    this.attr("class",sClassName);
    //this.element.class = sClassName;

  return this;
}

el.prototype.id = function(sIDName) { // Element
  if( isUndefined(sIDName) )
    return this.attr("id");
  else
    this.attr("id",sIDName);
    //this.element.id = sIDName;

  return this;
}

el.prototype.type = function(sName) { // Element
  if( isUndefined(sName) )
    return this.attr("type");
  else
    this.attr("type",sName);
    //this.element.id = sIDName;

  return this;
}

el.prototype.name = function(sName) { // Element
  if( isUndefined(sName) )
    return this.attr("name");
  else
    this.attr("name",sName);
    //this.element.id = sIDName;

  return this;
}

el.prototype.placeHolder = function(sName) {
  if( isUndefined(sName) )
    return this.attr("placeholder");
  else
    this.attr("placeholder", sName);
  return this;
}

el.prototype.required = function(bRequired) {
  if( isUndefined(bRequired) )
    bRequired = true;

  if( bRequired )
  {
    this.attr("required","");
    this.element.required = true;
  }
  else
  {
    this.removeAttr("required","");
    this.element.required = false;
  }

  return this;
}


el.prototype.element = function() { // Element
  return this.element;
}



el.prototype.contains = function(element_) { // Element
  return this.element.contains(element_);
}

el.prototype.onclick = function(func) {
  var this_ = this;
  if( this_.funcCssClick != func )
    this.funcClick = func;
  this.element.onclick = function(e){
    if( is(this_.funcCssClick) )
      this_.funcCssClick(e);
    if( is(this_.funcClick) )
      this_.funcClick(e);
  };
  return this;
}

el.prototype.onhover = function(func) {
  this.onmouseover(function(e){
    func(true);
  });
  this.onmouseout(function(e){
    func(false);
  });
  //this.element.onclick = func;
  return this;
}

el.prototype.onmouseover = function(func) {
  /* func이  */
  var this_ = this;
  if( this_.funcCssMouseOver != func )
    this.funcMouseOver = func;
  this.element.onmouseover = function(e){
    if( is(this_.funcCssMouseOver) )
      this_.funcCssMouseOver();
    if( is(this_.funcMouseOver) )
      this_.funcMouseOver();
  };
  return this;
}

el.prototype.onmouseout = function(func) {
  var this_ = this;
  if( this_.funcCssMouseOut != func )
    this.funcMouseOut = func;
  this.element.onmouseout = function(e){
    if( is(this_.funcCssMouseOut) )
      this_.funcCssMouseOut();
    if( is(this_.funcMouseOut) )
      this_.funcMouseOut();
  };
  return this;
}

el.prototype.append = function() { // Element

  var i; // 요놈을 선언 안하면 전역변수 i로 인식한다.
  for (i = 0; i < arguments.length; i++) {
     var elSub = arguments[i];
     if( isEl(elSub) ){
      this.element.append(elSub.element);
      this.children.push(elSub);
      // if( elSub instanceof item )
      //   return(elSub);
      elSub.parent= this;
    }else{
      this.element.append(elSub);
    }
  }

  return this;
  
  //return document.body.appendChild(this.element); 
}

el.prototype.appendChild = function() { // Element

  for (i = 0; i < arguments.length; i++) {
     var element_ = arguments[i];
     if( isEl(element_) ){
      this.element.append(element_.element);
      this.children.push(element_);
      // if( element_ instanceof item )
      //   return(element_);
      element_.parent = this;
    }else{
      this.element.append(element_);
    }
  }
  
  return this;
  //return document.body.appendChild(this.element); 
}




el.prototype.toBody = function() {
  el.parent = document.body;
  document.body.appendChild(this.element); 
  return this;
}

el.prototype.toHead = function() {
  var head = document.getElementsByTagName('head')[0];
  el.parent = head;
  head.appendChild(this.element); 
  return this;
}

el.prototype.clone = function() {
  var newOne = new el( this.element.cloneNode(true) );
  //newOne.element.onmouseover = this.element.onmouseover;
  //newOne.element.onmouseout = this.element.onmouseout;
  return newOne;
  //return this.element.cloneNode(true);
}

el.prototype.each = function(func) {
  // 서브들만 돈다. 본인은 호출 안된다.
  
  // while (this.element.firstChild) {
  //   func(this.element);
  //   this.each(func);
  // }

  // return this;

  //console.log(this.children.length);
  if( is(this.children) )
  {
    this.children.forEach(function(item,index){
      if( is(item) )
      {
        item.each(func);
        func(item,index);
      }
    });
  }

  //func(this);
}

el.prototype.draggable = function(targetHeader,func_getLimitRt,func_down,func_move,func_up) {

  
  var prevX = 0, prevY = 0; /* 헤더에 클릭한 지점을 중심으로 움직여야 하므로 마우스의 이동 크기만큼 창을 움직인다. */
  var nTempTop;
  var nTempLeft;
  if( is(targetHeader) == false ) 
    targetHeader = this;

  var this_ = this;

  addMouseEvent(targetHeader.element,function(x,y){
    prevX = x;
    prevY = y;
    
    if( is(func_down) )
      func_down(x,y);

  },function(x,y){

    nTempTop = this_.top() - (prevY - y);
    nTempLeft = this_.left() - (prevX - x);
    //console.log(this_.offsetTop());
    //console.log( " offsetTop: " + this_.top() + " newTop: " + nTempTop );
    prevX = x;
    prevY = y;

    //nTempTop = y;



    if( is(func_getLimitRt) )
    {
      var rtLimit = func_getLimitRt();
      if( is(rtLimit) )
      {
        nTempTop = clamp( rtLimit.y, nTempTop, rtLimit.height );
        nTempLeft = clamp( rtLimit.x, nTempLeft, rtLimit.width );
      }
    }

    
    this_.left(nTempLeft);
    this_.top(nTempTop);
    if( is(func_move) )
      func_move(nTempLeft,nTempTop);
    
  },function(){

    if( is(func_up) )
      func_up(nTempLeft,nTempTop);
  });

  return this;
}

el.prototype.findable = function(bAdd,bSubs) {
  // el.findable() 로 된놈들 모두 elMother.find(function(item,index){}) 로 호출될 수 있다.
  if( isUndefined(bAdd) )
    bAdd = true;
  if( isUndefined(bSubs) )
    bSubs = false;
  
  if( bAdd )
  {
    this.attr(g_sData_findable,"myColor"); // ""값을 넣으면 속성에 안들어가므로 "myColor"라고 그냥 값을 넣음
    if( bSubs )
    {
      this.each(function(item,index){
        item.attr(g_sData_findable,"myColor");
      });
    }
  }
  else
  {
    this.removeAttr(g_sData_findable);
    if( bSubs )
    {
      this.each(function(item,index){
        item.removeAttr(g_sData_findable);
      });
    }
  }
  return this;
}

el.prototype.find = function(func) {
  // el.findable() 로 된놈들 모두 elMother.find(function(item,index){}) 로 호출될 수 있다.
  this.each(function(item,index){
    if( item.hasAttr(g_sData_findable) ){
        func(item,index); 
    }
  });

  return this;
}

el.prototype.replaceWith = function(newElement) {
  if( is(this.element.parentNode) )
    this.element.parentNode.replaceChild(newElement.element,this.element);
}

el.prototype.bgColor = function(newColor) {
  if( is(newColor) ){
    //if( is(this.element.style) ) // HTML input element는 style이 없는거 같다.
    this.element.style.background = newColor;
    return this;
  }else{
    return this.element.style.background;
  }
}

el.prototype.color = function(newColor) {
  if( is(newColor) ){
    this.element.style.color = newColor;
    return this;
  }else{
    return this.element.style.color;
  }
}


// el.prototype.onhover = function(func) { // func(x,y)
//   c_style = { };
//   var elThis = this;
//   this.element.onmouseover = function(e){
//     //c_style = window.getComputedStyle(elThis.element);
//     if( elThis.has("background-color") )
//       c_style["background-color"] = elThis.css("background-color");
//     if( elThis.has("color") )
//       c_style["color"] = elThis.css("color");
    
//     elThis.css("cursor","pointer");
//     func(e);
//   };

//   this.element.onmouseout = function(e){
//     //console.log(c_style);
//     elThis.css(c_style);

//     elThis.css("cursor","auto");
//   };
// }

el.prototype.attr = function(attributes,newAttr) {
  if( is(attributes) ) {
    if( isString(attributes) ){
        if( is(newAttr) )
          this.element.setAttribute(attributes,newAttr);  
        else
          return this.element.getAttribute(attributes);
    }else{
      for (var att in attributes) {
        this.element.setAttribute(att,attributes[att]);
      }
    }
  }else{
    /* 함수.call(오브젝트) 함수안에 this값에 오브젝트를 넣어서 해당 함수를 호출하는 방법이다.
    slice.call(오브젝트)는  해당 어레이를 잘라서 새로운 어레이를 리턴하는데 attributes는 인덱스를 사용할 수 있는 특수한 objects이므로 slice()가 먹히는듯
    즉 특수한 array => 일반 array로 복사하여 리턴한다.
    */
    //return Array.prototype.slice.call(this.attributes);
  }

  return this;
}

el.prototype.removeAttr = function(attributes) {

  if( is(attributes) ){
    if( isString(attributes) ){
      this.element.style.removeProperty(attributes);
    }else{
      var element1 = this.element;
      attributes.forEach(function(item){
        element.removeAttribute(item);
    });
    }
  }
}

el.prototype.removeCss = function(attributes) {
  
  if( is(attributes) ){
    if( isString(attributes) ){
      this.element.style.removeProperty(attributes);
    }else{
      var element = this.element;
      attributes.forEach(function(item){
        element.style.removeProperty(item);
      });
    }
  }

}

el.prototype.has = function(cssName) {
  var cssValue = this.css(cssName);
  //console.log(cssName + cssValue);
  if( is(cssValue) ){
    if( cssValue.length > 0 )
      return true;
  }

  return false;
}

el.prototype.hasAttr = function(sName) {

  var sAttr = this.attr(sName);
  if( is(sAttr) )
  {
    if( sAttr.length > 0 )
      return true;
  }

  return false;
}

el.prototype.skipCss = function(bAdd,bSubs) {
  if( isUndefined(bAdd) )
    bAdd = true;
  if( isUndefined(bSubs) )
    bSubs = false;
  
  if( bAdd )
  {
    this.attr(g_sData_skipCss,"myColor"); // ""값을 넣으면 속성에 안들어가므로 "myColor"라고 그냥 값을 넣음
    if( bSubs )
    {
      this.each(function(item,index){
        item.attr(g_sData_skipCss,"myColor");
      });
    }
  }
  else
  {
    this.removeAttr(g_sData_skipCss);
    if( bSubs )
    {
      this.each(function(item,index){
        item.removeAttr(g_sData_skipCss);
      });
    }
  }
  return this;
}

el.prototype.vAlign = function(str) {
  if( is(attributes) ) {
    if( isString(attributes) ){
      this.css("vertical-align",str);
    }
  }
  return this;
}

el.prototype.vAlignTop = function() {
  this.css("vertical-align","top");
  return this;
}

el.prototype.vAlignMiddle = function() {
  this.css("vertical-align","middle");
  return this;
}

el.prototype.vAlignBottom = function() {
  this.css("vertical-align","bottom");
  return this;
}

el.prototype.hAlign = function(str) {
  this.textAlign(str);
  return this;
}

el.prototype.hAlignLeft = function() {
  this.textAlign("left");
  return this;
}

el.prototype.hAlignRight = function() {
  this.textAlign("right");
  return this;
}

el.prototype.hAlignCenter = function() {
  this.textAlign("center");
  return this;
}

el.prototype.css = function(attributes,newAttr) {
  if( is(attributes) ) {
    if( isString(attributes) ){
        if( is(newAttr) ){
          this.element.style[attributes] = newAttr;
        }else{
          //console.log(this.element.style[attributes] + attributes );
          //if( is(this.element.style) ) // HTML input element는 style이 없는거 같다.
            return this.element.style[attributes];
          // else
          //   return null;
        }
    }else{
      for (var att in attributes) {
        //if( is(this.element.style) ) // HTML input element는 style이 없는거 같다.
          this.element.style[att] = attributes[att];
      }
    }
  }else{
    /* 함수.call(오브젝트) 함수안에 this값에 오브젝트를 넣어서 해당 함수를 호출하는 방법이다.
    slice.call(오브젝트)는  해당 어레이를 잘라서 새로운 어레이를 리턴하는데 attributes는 인덱스를 사용할 수 있는 특수한 objects이므로 slice()가 먹히는듯
    즉 특수한 array => 일반 array로 복사하여 리턴한다.
    */
    //return Array.prototype.slice.call(this.element.style);
  }

  return this;
  //return this.element.style;
}

// el.prototype.hoverColor = function(sFill,sTextColor,sStroke){
//   var c_style = {};
//   if( isString(sFill) )
//     c_style["background-color"] = sFill;
//   if( isString(sTextColor) )
//     c_style["color"] = sTextColor;
//   if( isString(sStroke) )
//     c_style["border-color"] = sStroke;

//   this.hovered(c_style);
//   return this;
// }

el.prototype.normal = function(arrCSS,sValue,fDuration){

  if( this.hasAttr(g_sData_skipCss) == false )
  {
    //---- select된 상태라면 select를 풀어주고 색을 변경한 후에 다시 select한다.
    // var bSelected = this.bSelected;
    // if( this.bSelected )
    //   this.select(false);

    if( isString(arrCSS) )
    {
      this.dicNormal[arrCSS] = sValue;
    }
    else
    {
      this.dicNormal = Object.assign({},arrCSS); // string이 아니라 배열이 인자값으로 들어온경우
      //this.dicNormal = concat(this.dicNormal,arrCSS); // string이 아니라 배열이 인자값으로 들어온경우
      fDuration = sValue;
    }

    if( isUndefined(fDuration) == false )
      this_.dicNormal = concat(this_.dicNormal,getTransitionDurationCss(fDuration));
    
    //if( this.bSelected == false )
      this.css(this.dicNormal); // normal은 셋팅할때 css를 normal로 변경해준다.

    // if( bSelected )
    //   this.select(true);
  }

  this.each(function(item,index){
    if( item.hasAttr(g_sData_skipCss) == false )
      item.normal(arrCSS,sValue,fDuration);
  });

  return this;
}

el.prototype.select = function(bSelect){
  if( isUndefined(bSelect) )
    bSelect = true;

  if( bSelect )
  {
    if( this.bClicked == false )
      this.css(this.dicSelected);
    this.each(function(item,index){
      if( item.bClicked == false )
        item.css(item.dicSelected);

      item.bSelected = true;
    });

    this.bSelected = true;
  }
  else
  {
    if( this.bClicked == false )
    {
      for( sName in this.dicSelected )
      {
        if( has( this.dicNormal, sName ) )
          this.css( sName, this.dicNormal[sName] );
        else
          this.removeCss(sName);
      }
    }

    this.each(function(item,index){
      if( item.bClicked == false )
      {
        for( sName in item.dicSelected )
        {
          if( has( item.dicNormal, sName ) )
            item.css( sName, item.dicNormal[sName] );
          else
            item.removeCss(sName);
        }
      }

      item.bSelected = false;
    });

    this.bSelected = false;
  }

  return this;
}

el.prototype.selected = function(arrCSS,sValue,fDuration){
  if( this.hasAttr(g_sData_skipCss) == false )
  {
    //---- select된 상태라면 select를 풀어주고 색을 변경한 후에 다시 select한다.
    // var selected = this.bSelected;
    // if( this.bSelected )
    //   select(false);

    if( isString(arrCSS) )
    {
      this.dicSelected[arrCSS] = sValue;
    }
    else
    {
      this.dicSelected = Object.assign({},arrCSS);// concat(this.dicSelected,arrCSS); // string이 아니라 배열이 인자값으로 들어온경우
      fDuration = sValue;
    }

    if( isUndefined(fDuration) == false )
      this.dicSelected = concat(this.dicSelected,getTransitionDurationCss(fDuration));

    for( sName in this.dicSelected )
    {
      if( this.has(sName) )
        this.dicNormal[sName] = this.css(sName);
    }

    // if( selected )
    //   this.select(true);
  }

  this.each(function(item,index){
    if( item.hasAttr(g_sData_skipCss) == false )
      item.selected(arrCSS,sValue,fDuration);
  });

  return this;
}

el.prototype.hovered = function(arrCSS,sValue,fDuration){
  /* 
  true, false => bSubs
  el.hover(arrCSS);
  el.hover("width","100px");
  
  dicNew_ => mouseOver시에 바뀔 css 배열
  dicRollBack_ => mouseOut시에 복원될 css배열
  dicNew_에는 있는데 dicRollBack_에 없으면 해당 css속성은 복원시 remove한다. => 그래야 완전히 이전과 똑같이 복원됨
  mouseover, mouseout은 버튼의 메인만 넣고 서브들도 이벤트 처리하면 이상해지므로 hoveredVars()는 
  variable[]배열에 저장만 할뿐 mouseover, mouseout은 메인에서처리하고 서브들도 호출한다.
  */

  var this_ =  this;
  //------------------------------------------------------ this
  if( this.hasAttr( g_sData_skipCss ) == false )
  {
    if( isString(arrCSS) )
    {
      this.dicHover[arrCSS] = sValue;
    }
    else
    {
      this.dicHover = Object.assign({},arrCSS);// concat(this.dicHover,arrCSS);
      fDuration = sValue;
    }

    if( isUndefined(fDuration) == false )
      this_.dicHover = concat(this_.dicHover,getTransitionDurationCss(fDuration));

    for( sName in this_.dicHover )
    {
      if( this_.has(sName) )
        this_.dicNormal[sName] = this_.css(sName);
    }
  }

  //------------------------------------------------------ subs
  this.each(function(item,index){
    if( item.hasAttr( g_sData_skipCss ) == false )
      item.hoveredVars(arrCSS,sValue,fDuration);
  });

  //------------------------------------------------------ events
  this.funcCssMouseOver = function(e){
    this.bHovered = true;
    if( this.bSelected == false )// selected된 상태에서는 hover가 안먹힌다.
    {
      for( sName in this_.dicHover )
        this_.css( sName, this_.dicHover[sName] );
    }
    
    this_.each(function(item,index){
        if( is(item.funcCssMouseOver) )
          item.funcCssMouseOver(e);
    });

    this_.css("cursor","pointer");
  };

  this.funcCssMouseOut = function(e){

    if( this.bSelected == false )// selected된 상태에서는 hover가 안먹힌다.
    {
      for( sName in this_.dicHover )
      {
        if( has( this_.dicNormal, sName ) )
          this_.css( sName, this_.dicNormal[sName] );
        else
          this_.removeCss(sName);
      }
    }

    this_.each(function(item,index){
        if( is(item.funcCssMouseOut) )
         item.funcCssMouseOut(e);
    });

    this.bHovered = false;
    this_.css("cursor","auto");
  };

  this.onmouseover(this.funcCssMouseOver);
  this.onmouseout(this.funcCssMouseOut);

  return this;
}

el.prototype.hoveredVars = function(arrCSS,sValue,fDuration){
  /* 
  bCheckData는 "data-hover-color"의 custom속성이 들어간 놈만 Hover변수를 생성한다.
  dicNew_ => mouseOver시에 바뀔 css 배열
  dicRollBack_ => mouseOut시에 복원될 css배열
  dicNew_에는 있는데 dicRollBack_에 없으면 해당 css속성은 복원시 remove한다. => 그래야 완전히 이전과 똑같이 복원됨
  mouseover, mouseout은 버튼의 메인만 넣고 서브들도 이벤트 처리하면 이상해지므로 hoveredVars()는 
  variable[]배열에 저장만 할뿐 mouseover, mouseout은 메인에서처리하고 서브들도 호출한다.
  */
  var this_ =  this;
  if( isString(arrCSS) )
  {
    this.dicHover[arrCSS] = sValue;
  }
  else
  {
    this.dicHover = concat(this.dicHover,arrCSS); // string이 아니라 배열이 인자값으로 들어온경우
    fDuration = sValue;
  }

  if( isUndefined(fDuration) == false )
      this_.dicHover = concat(this_.dicHover,getTransitionDurationCss(fDuration));

  for( sName in this_.dicHover )
  {
    if( this_.has(sName) )
      this_.dicNormal[sName] = this_.css(sName);
  }

  this.funcCssMouseOver = function(e){
    //c_style = window.getComputedStyle(elThis.element);
    this_.bHovered = true;
    if( this_.bSelected == false ) // selected된 상태에서는 hover가 안먹힌다.
    {
      for( sName in this_.dicHover )
        this_.css( sName, this_.dicHover[sName] );
    }
  };

  this.funcCssMouseOut = function(e){

    if( this_.bSelected == false )// selected된 상태에서는 hover가 안먹힌다.
    {
      for( sName in this_.dicHover )
      {
        if( has( this_.dicNormal, sName ) )
          this_.css( sName, this_.dicNormal[sName] );
        else
          this_.removeCss(sName);
      }
    }

    this_.bHovered = false;
  };


  return this;
}

el.prototype.clickedVars = function(arrCSS,sValue,fDuration){
  /* 
  bCheckData는 "data-hover-color"의 custom속성이 들어간 놈만 Hover변수를 생성한다.
  dicNew_ => mouseOver시에 바뀔 css 배열
  dicRollBack_ => mouseOut시에 복원될 css배열
  dicNew_에는 있는데 dicRollBack_에 없으면 해당 css속성은 복원시 remove한다. => 그래야 완전히 이전과 똑같이 복원됨
  mouseover, mouseout은 버튼의 메인만 넣고 서브들도 이벤트 처리하면 이상해지므로 hoveredVars()는 
  variable[]배열에 저장만 할뿐 mouseover, mouseout은 메인에서처리하고 서브들도 호출한다.
  */
  var this_ =  this;
  if( isString(arrCSS) )
  {
    this_.dicClicked[arrCSS] = sValue;
  }
  else
  {
    this_.dicClicked = concat(this_.dicClicked,arrCSS); // string이 아니라 배열이 인자값으로 들어온경우
    fDuration = sValue;
  }

  if( isUndefined(fDuration) == false )
      this_.dicClicked = concat(this_.dicClicked,getTransitionDurationCss(fDuration));

  for( sName in this_.dicClicked )
  {
    if( this_.has(sName) )
      this_.dicNormal[sName] = this_.css(sName);
  }

  this.funcCssClick_start = function(e){
    //c_style = window.getComputedStyle(elThis.element);
    this_.bClicked = true;
    for( sName in this_.dicClicked )
      this_.css( sName, this_.dicClicked[sName] );
  };

  this.funcCssClick_end = function(e){

    var dicRollBack = this_.dicNormal;
    if( this_.bSelected )
      dicRollBack = this_.dicSelected;
    // else if( this_.bHovered )
    //   dicRollBack = this_.dicHover;

    for( sName in this_.dicClicked )
    {
      if( has( dicRollBack, sName ) )
        this_.css( sName, dicRollBack[sName] );
      else
        this_.removeCss(sName);
    }

    this_.bClicked = false;
  };

  return this;
}

el.prototype.clicked = function(arrCSS,sValue,fDuration){
  /* 
  el.hover(arrCSS);
  el.hover("width","100px");
  
  dicNew_ => mouseOver시에 바뀔 css 배열
  dicRollBack_ => mouseOut시에 복원될 css배열
  dicNew_에는 있는데 dicRollBack_에 없으면 해당 css속성은 복원시 remove한다. => 그래야 완전히 이전과 똑같이 복원됨
  mouseover, mouseout은 버튼의 메인만 넣고 서브들도 이벤트 처리하면 이상해지므로 hoveredVars()는 
  variable[]배열에 저장만 할뿐 mouseover, mouseout은 메인에서처리하고 서브들도 호출한다.
  */

  var this_ =  this;
  //---------------------------------------------------------- this
  if( this.hasAttr( g_sData_skipCss ) == false )
  {
    if( isString(arrCSS) )
    {
      this.dicClicked[arrCSS] = sValue;
    }
    else
    {
      this.dicClicked = Object.assign({},arrCSS);// concat(this.dicClicked,arrCSS);
      fDuration = sValue;
    }

    if( isUndefined(fDuration) == false )
      this_.dicClicked = concat(this_.dicClicked,getTransitionDurationCss(fDuration));

    for( sName in this_.dicClicked )
    {
      if( this_.has(sName) )
        this_.dicNormal[sName] = this_.css(sName);
    }
  }
  
  //---------------------------------------------------------- subs
  this.each(function(item,index){
    if( item.hasAttr( g_sData_skipCss ) == false )
      item.clickedVars(arrCSS,sValue,fDuration);
  });

  //---------------------------------------------------------- events
  this.funcCssClick_start = function(e){

    this_.bClicked = true;
    for( sName in this_.dicClicked )
      this_.css( sName, this_.dicClicked[sName] );
    
      this_.each(function(item,index){
        if( is(item.funcCssClick_start) )
          item.funcCssClick_start(e);
      });

    this_.css("cursor","pointer");
  };

  this.funcCssClick_end = function(e){

    var dicRollBack = this_.dicNormal;
    if( this_.bSelected )
      dicRollBack = this_.dicSelected;
    // else if( this_.bHovered )
    //   dicRollBack = this_.dicHover;
    

    for( sName in this_.dicClicked )
    {
      if( has( dicRollBack, sName ) )
        this_.css( sName, dicRollBack[sName] );
      else
        this_.removeCss(sName);
    }

    this_.each(function(item,index){
      if( is(item.funcCssClick_end) )
        item.funcCssClick_end(e);
    });

    this_.bClicked = false;
    this_.css("cursor","auto");
  };

  this.funcCssClick = function(e){
    this_.funcCssClick_start(e);
    setTimeout( function(){
      this_.funcCssClick_end(e);
    }, 360 )
  };
  

  this.onclick(this.funcCssClick);
  //this.onmouseout(this.funcCssMouseOut);

  return this;
}


el.prototype.hidden = function() {
  if ( this.css('display') == 'none' || this.css("visibility") == "hidden"){
    return true;
  }

  return false;
}

el.prototype.show = function(bShow) {
  if( isUndefined(bShow) )
    bShow = true;

  /* 우선 display속성이 none이 아니면 custom속성인 data-display로 저장한다. */
  var sDisplay = null;
  if( this.has("display") ) 
  {
    var sTempDisplay = this.css("display");
    if( sTempDisplay == "block" || sTempDisplay == "inline-block" || sTempDisplay == "inline" )
    {
      sDisplay = sTempDisplay;
      this.attr(g_sData_display,sDisplay);
    }
  }

  if( bShow )
  {
    /* display속성이 none이면 custom속성인 data-display를 읽어와서 해당 속성으로 보이게 한다*/
    if( is(sDisplay) == false )
    {
      if( this.hasAttr(g_sData_display) )
      {
        var sTempDisplay = this.attr(g_sData_display);
        if( sTempDisplay == "block" || sTempDisplay == "inline-block" || sTempDisplay == "inline" )
          sDisplay = sTempDisplay;
      }
    }

    if( is(sDisplay) )
      this.css("display",sDisplay);
    else
      this.css("display","block"); // default
  }
  else
  {
    this.css("display", "none");
  }

  return this;
}

el.prototype.hide = function(bHide,bInlineBlock) {
  return this.show(false);
}



el.prototype.parent = function() {
  return this.element.parentElement;
}

el.prototype.log = function() {
  console.log(this.element);
  // console.log(this.rt());
  // console.log(this.css());
  // console.log(this);
  // if( this.element.parentElement )
  //   console.log( this.element.parentElement );
}



el.prototype.floatLeft = function(bAdd) {
  if( isUndefined(bAdd) )
    bAdd = true;

  if( bAdd )
    this.css("float","left");
  else
    this.removeCss("float");
  return this;
}

el.prototype.floatRight = function(bAdd) {
  if( isUndefined(bAdd) )
    bAdd = true;

  if( bAdd )
    this.css("float","right");
  else
    this.removeCss("float");
  return this;
}

el.prototype.clearLeft = function() {
  this.css("clear","left");
  return this;
}

el.prototype.clearRight = function() {
  this.css("clear","right");
  return this;
}

el.prototype.clearBoth = function() {
  this.css("clear","both");
  return this;
}

el.prototype.fixed = function() {
  this.css("position","fixed");
  return this;
}

el.prototype.relative = function() {
  this.css("position","relative");
  return this;
}

el.prototype.sticky = function() {
  this.css("position","sticky");
  return this;
}

el.prototype.absolute = function() {
  this.css("position","absolute");
  return this;
}

el.prototype.transition = function(sName) {
  var c_animation = {
    "-webkit-transition":sName,
    "-moz-transition":sName,
    "-ms-transition":sName,
    "-o-transition":sName,
    "transition":sName,
  };
  this.css(c_animation);
  return this;
}

el.prototype.transitionDuration = function(fSeconds) {
  var c_animation = {
    "-webkit-transition-duration":fSeconds + "s", /* Safari */
    "transition-duration":fSeconds + "s",
  };
  this.css(c_animation);
  return this;
}


el.prototype.position = function(sPosition) {
  this.css("position",sPosition);
  return this;
}

el.prototype.inlineBlock = function() {
  this.css("display","inline-block");
  this.attr(g_sData_display,"inline-block");
  return this;
}

el.prototype.block = function() {
  this.css("display","block");
  this.attr(g_sData_display,"block");
  return this;
}

el.prototype.inline = function() {
  this.css("display","inline");
  this.attr(g_sData_display,"inline");
  return this;
}

el.prototype.width = function(width) {
  if( isUndefined(width) )
    return this.element.clientWidth;

    
  if( isPercent(width) || isPx(width) ){
    this.element.style.width = width;
  }else{
    this.element.style.width = width + 'px';
  }
  return this;
}

el.prototype.height = function(height) {
  if( isUndefined(height) )
    return this.element.clientHeight;

  if( isPercent(height) || isPx(height) ){
    this.element.style.height = height;
  }else{
    this.element.style.height = height + 'px';
  }
  return this;
}

el.prototype.lineHeight = function(height) {
  if( isUndefined(height) )
    return this.css("line-height");

  if( isPercent(height) || isPx(height) ){
    this.css("line-height",height);
  }else{
    this.css("line-height",height + "px");
  }
  return this;
}


el.prototype.size = function(width,height) {
  
  if( is(width) ){
    this.width(width);
    if( is(height) ){
      this.height(height);
    }else{
      this.height(width);
    }
    return this;
  }
  
  return size( this.element.clientWidth, this.element.clientHeight );
}

el.prototype.rt = function(x,y,width,height) {
/* 인자값이 1개일 경우 => width, height를 같은 값으로 셋팅
2개일 경우 => width, height만 셋팅 4개일 경우 top, left, width, height를 다 셋팅*/
  var rtTemp = rt(x,y,width,height);
  if( is(x) ){ // 인자값이 1개이상일 경우
    this.width(rtTemp.width);
    this.height(rtTemp.height);
  }

  if( is(height) ){ // 인자값이 4개일 경우
    this.top(rtTemp.x);
    this.left(rtTemp.y);
  }

  if( is(x) ){
    return;
  }
  
  return rt( this.top(), this.left(), this.element.clientWidth, this.element.clientHeight );
}


el.prototype.top = function(top) {
  if(typeof top !== "undefined") {
    if( top != null ){
      this.element.style.top = top + 'px';
      return this;
    }
  }

  return this.element.offsetTop;
}


el.prototype.offsetLeft = function() {
  /* 원래 offsetLeft는 부모로 부터 얼마나 떨어졌냐인데 이놈은 page에서 얼마나 떨어져 있냐이다. 물론 스크롤은 무시한다. */
  /* 원래 offsetLeft는 부모중에 fixed나 absolute를 가진 놈을 기준으로의 좌표인데 이놈은 절대 좌표를 구한다. */
  var arrOrigin = findElementOrigin(this.element);
  return arrOrigin[0];

  // var _x = 0;
  // var el = this.element;
  // while( el && !isNaN( el.offsetLeft ) ) {
  //     _x += el.offsetLeft - el.scrollLeft;
  //     el = el.offsetParent;
  // }
  // return _x;
}

el.prototype.rect = function() { 
  /* 
  현제 화면에 보이는 페이지에서의 위치이다. 스크롤로 올리면 rect도 올라간다. 왜냐면 화면에 보이는 위치이므로,
  마우스 위치와 같다. 마우스는 브라우져의 페이지에서의 좌표를 나타내므로 요놈을 이용하면 해당 사각의 어느지점을 터치했는지 알 수 있다.
  */
  return this.element.getBoundingClientRect();
}

el.prototype.scroll = function(fRatio) {
  this.element.scrollTo( 0, this.height()*fRatio );
  return this;
}

el.prototype.scrollTop = function() {
  this.element.scrollTo( 0, 0 );
  return this;
}

el.prototype.scrollBottom = function() {
  this.element.scrollTop = this.element.scrollHeight;
  //this.element.scrollTo( 0, this.height() );
  return this;
}


el.prototype.offsetTop = function() {
  /* 원래 offsetTop는 부모로 부터 얼마나 떨어졌냐인데 이놈은 page에서 얼마나 떨어져 있냐이다. 물론 스크롤은 무시한다. */
  /* 원래 offsetLeft는 부모중에 fixed나 absolute를 가진 놈을 기준으로의 좌표인데 이놈은 절대 좌표를 구한다. */
  var arrOrigin = findElementOrigin(this.element);
  return arrOrigin[1];

  // var _y = 0;
  // var el = this.element;
  // while( el && !isNaN( el.offsetTop ) ) {
  //     _y += el.offsetTop - el.scrollTop;
  //     el = el.offsetParent;
  // }
  // return _y;
}

el.prototype.left = function(left) {
  if(typeof left !== "undefined") {
    if( left != null ){
      this.element.style.left = left + 'px';
      return this;
    }
  }

  return this.element.offsetLeft;
}

el.prototype.right = function(right) {
  if(typeof right !== "undefined") {
    if( right != null ){
      this.element.style.right = right + 'px';
      return this;
    }
  }

  return this.element.offsetLeft + this.element.clientWidth;
}

el.prototype.bottom = function(bottom) {
  if(typeof bottom !== "undefined") {
    if( bottom != null ){
      this.element.style.bottom = bottom + 'px';
      return this;
    }
  }

  return this.element.offsetTop + this.element.clientHeight;
}

el.prototype.center = function() {
  if( this.element.parentElement ){
    if( this.element.parentElement.clientWidth > this.element.clientWidth || this.element.parentElement.clientHeight > this.element.clientHeight )
    {
      /* absolute를 먼저 적용해야 block의 크기가 컨텐츠에 딱 맞게 줄어든다. 줄어들어야 아래의 clientWidth가 줄어든 크기로 나옴 */
      // this.css({"position": "absolute"});
      this.css({
        "top":(this.element.parentElement.clientHeight - this.element.clientHeight)*0.5 + "px",
        "left":(this.element.parentElement.clientWidth - this.element.clientWidth)*0.5 + "px"
      });
    } 
  }

  return this;
}

el.prototype.align = function(pButton ,n1Left2Middle3Right) {
  /*
   해당 버튼을 기준으로 왼쪽, 가운데, 오른쪽에 위치한 팝업 뜨는 모양으로 정렬된다.
  */
  if( is(n1Left2Middle3Right) == false ){
    if( isNumber(pButton) ){
      n1Left2Middle3Right = pButton;
      pButton = this.element.parentElement;
    }else{
      n1Left2Middle3Right = 2;
    }
  }

  if( n1Left2Middle3Right == 1 )
    this.left(pButton.element.offsetLeft - (this.width() - pButton.element.clientWidth) );
  else if( n1Left2Middle3Right == 3 )
    this.left(pButton.element.offsetLeft);
  else
    this.left(pButton.element.offsetLeft - (this.width() - pButton.element.clientWidth)*0.5 );

  this.top(pButton.top() + pButton.element.clientHeight);

  return this;
}

el.prototype.text = function(text) {
  
  if( text != null ){

    this.element.textContent = text;

    return this;
  }

    return this.element.textContent;
}


el.prototype.makeChildren = function() {
  /*
   sub로 가지고 있는 모든 element를 el로 만들어서 붙이는 함수 
   el.html("...."); =>이렇게 함수가 호출될 경우, 들어온 모든 element들을 el로 만들어 붙이므로 children, parent변수를 사용할 수 있게 한다.
   */
  if( is(this.element.children) )
  {
    this.children = [];
    var i;
    for (i = 0; i < this.element.children.length; i++) {
      var elSub = new el();
      elSub.element = this.element.children[i];
      elSub.parent = this;
      this.children.push(elSub);
      elSub.makeChildren(); // 재귀호출
    }
  }
}


el.prototype.html = function(html) {
  if( is(html) ){
      this.element.innerHTML = html;      
      this.makeChildren();

      return this;
  }

  return this.element.innerHTML;
}

el.prototype.value = function(sValue) {
  // if( isUndefined(sValue) )
  // {
  //   if( this.hasAttr("value") )
  //     return this.attr("value");
  //   else
  //     return this.element.value
  // }

  // this.attr("value",sValue);
  // this.element.value = sValue;
  // return this;
  // if( isUndefined(this.element.value) )
  // {
  //   alert(this.element);
  //   if( isUndefined(sValue) )
  //   {
  //     if( this.hasAttr("value") )
  //       return this.attr("value");
  //     else
  //       return this.element.value
  //   }

  //   this.attr("value",sValue);
  //   this.element.value = sValue;
  //   return this;
  // }
  // else
  // {
    if( isUndefined(sValue) ) {
      return this.element.value;
    }
    else
    {
      this.element.value = sValue;
      return this;
    }
  // }
}

el.prototype.fontSize = function(size) {
  if( isString(size) ) {
    this.css("font-size", size);
    return this;
  }else if( isNumber(size) ){
    this.css("font-size", size + "px");
    return this;
  }

  return this.element.style["font-size"];
}

el.prototype.fontWeight = function(weight_) {
  if( is(weight_) ){
    this.css("font-weight", weight_);
    return this;
  }

  return this.css("font-weight");
}

el.prototype.textAlign = function(str) {
  if( isString(str) ) {
    this.css("text-align", str);
    return this;
  }

  return this.element.style["text-align"];
}

el.prototype.fontFamily = function(str) {
  if( isString(str) ) {
    this.css("font-family", str);
    return this;
  }

  return this.element.style["font-family"];
}

el.prototype.margin = function(top,right,bottom,left) {
  if( is(top) == false )
    return this.css("margin");

  if( is(right) == false ){
    right = top;
    bottom = top;
    left = top;
  }else if( is(bottom) == false ){
    bottom = top;
    left = right;
  }else if( is(left) == false ){
    left = right;
  }

  
  this.marginTop(top);
  this.marginRight(right);
  this.marginBottom(bottom);
  this.marginLeft(left);
  return this;
}

el.prototype.marginRight = function(margin_) {
  if( is(margin_) ) {
    if( isPercent(margin_) || isPx(margin_) )
      this.css("margin-right", margin_);
    else
      this.css("margin-right", margin_ + "px");
    return this;
  }

  return this.css("margin-right");
}

el.prototype.marginLeft = function(margin_) {
  if( is(margin_) ) {
    if( isPercent(margin_) || isPx(margin_) )
      this.css("margin-left", margin_);
    else
      this.css("margin-left", margin_ + "px");
    return this;
  }

  return this.css("margin-left");
}

el.prototype.marginTop = function(margin_) {
  if( is(margin_) ) {
    if( isPercent(margin_) || isPx(margin_) )
      this.css("margin-top", margin_);
    else
      this.css("margin-top", margin_ + "px");
    return this;
  }

  return this.css("margin-top");
}

el.prototype.marginBottom = function(margin_) {
  if( is(margin_) ) {
    if( isPercent(margin_) || isPx(margin_) )
      this.css("margin-bottom", margin_);
    else
      this.css("margin-bottom", margin_ + "px");
    return this;
  }

  return this.css("margin-bottom");
}


el.prototype.padding = function(top,right,bottom,left) {
  if( is(top) == false )
    return this.css("padding");

  if( is(right) == false ){
    right = top;
    bottom = top;
    left = top;
  }else if( is(bottom) == false ){
    bottom = top;
    left = right;
  }else if( is(left) == false ){
    left = right;
  }

  
  this.paddingTop(top);
  this.paddingRight(right);
  this.paddingBottom(bottom);
  this.paddingLeft(left);
  return this;
}

el.prototype.paddingRight = function(padding_) {
  if( is(padding_) ) {
    if( isPercent(padding_) || isPx(padding_) )
      this.css("padding-right", padding_);
    else
      this.css("padding-right", padding_ + "px");
    return this;
  }

  return this.css("padding-right");
}

el.prototype.paddingLeft = function(padding_) {
  if( is(padding_) ) {
    if( isPercent(padding_) || isPx(padding_) )
      this.css("padding-left", padding_);
    else
      this.css("padding-left", padding_ + "px");
    return this;
  }

  return this.css("padding-left");
}

el.prototype.paddingTop = function(padding_) {
  if( is(padding_) ) {
    if( isPercent(padding_) || isPx(padding_) )
      this.css("padding-top", padding_);
    else
      this.css("padding-top", padding_ + "px");
    return this;
  }

  return this.css("padding-top");
}

el.prototype.paddingBottom = function(padding_) {
  if( is(padding_) ) {
    if( isPercent(padding_) || isPx(padding_) )
      this.css("padding-bottom", padding_);
    else
      this.css("padding-bottom", padding_ + "px");
    return this;
  }

  return this.css("padding-bottom");
}

el.prototype.context = function(b3D) {
  if( is(b3D) ) {
    if( b3D == true )
      return this.element.getContext("3d");
  }

  return this.element.getContext("2d");
}

el.prototype.border = function(width,color) {
  if( is(width) ) {
    if( isString(width)){
      this.css({"border":width});
    }else{
      if( is(color) == false )
      color = "black";
      this.css({"border":width + "px solid " + color});
    }
    return this;
  }

  return this.element.style["border"];
}

el.prototype.borderRadius = function(radius) {
  if( is(radius) ) {
    if( isPercent(radius) || isPx(radius) ){
      this.css("border-radius",radius);
    }else{
      this.css("border-radius",radius + "%");
    }
    return this;
  }

  return this.element.style["border-radius"];
}


el.prototype.fitText = function(percent) { // fit the fontSize to parent=>이함수를 쓰면 부모의 창 크기가 변한다. font-size를 대입하면 자동 변하나?
  //this.element.parentElement
  var percentage = 0.7;
  if(typeof percent !== "undefined") {
    if( percent != null ){
      percentage = percent;
    }
  }
  var fontSize = this.height() * percentage; // 10% of container width
  if( fontSize > 0 )
    this.element.style["font-size"] = fontSize + "px";
}


el.prototype.remove = function() { // document.getElementById("my-element").remove();
  if( this.element.parentElement )
  {
    this.element.parentElement.removeChild(this.element);
    this.parent = null;
  }

  return this;
}

el.prototype.empty = function() { 
  while (this.element.firstChild) {
    this.element.firstChild.remove();
  }

  this.children = [];
}



//-------------------------------------------------------------------------------------------- El finished
function addCSS(sCSS){ // 'table td:hover{ background-color: #00ff00 }';
  var style = document.createElement('style');
  if (style.styleSheet) {
      style.styleSheet.cssText = sCSS;
  } else {
      style.appendChild(document.createTextNode(sCSS));
  }
  document.getElementsByTagName('head')[0].appendChild(style);  
}

function css(element,attributes) {
  if(typeof attributes !== "undefined") {
    if( attributes != null ){
      for (var att in attributes) {
        element.style[att] = attributes[att];
      }
    }
  }
}

function toBody(){
  for (i = 0; i < arguments.length; i++) {
    document.body.appendChild(arguments[i]); 
  }
}


function toContent(){
  for (i = 0; i < arguments.length; i++) { 
    id(g_sID_content).appendChild(arguments[i]); 
  }
}

function getContent(){
    return id(g_sID_content); 
}


function attr(element,attributes) {
  if(typeof attributes !== "undefined") {
    if( attributes != null ){
      for (var att in attributes) {
        element.setAttribute(att,attributes[att]);
      }
    }
  }
}

function replaceAttr(element,attributes) {
  if(typeof attributes !== "undefined") {
    if( attributes != null ){
      for (var att in attributes) {
        if( element.hasAttribute(att) ){
          element.setAttribute(att,attributes[att]);
        }
      }
    }
  }
}

function each(element,func,searchTagName) { // document도 된다.
  var subs;
  if( is(searchTagName) )
    subs = element.querySelectorAll(searchTagName);
  else
    subs = element.getElementsByTagName("*");

  //console.log(subs.length);
  var i;
  for ( i = 0; i < subs.length; i++) {
    each(subs[i],func,searchTagName);
    func(subs[i],i);
  }
}

NodeList.prototype.remove = HTMLCollection.prototype.remove = function() { // document.getElementsByClassName("my-elements").remove();
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}






function svgcssOnReady(objectElement,attributes){
  ready(function(){
    /*
    html의 요소들의 type은 Element이지만 SVGDocument의 요소들의 type은 SVGElement이다.
    따라서 id(), css()등의 함수가 안 먹힌다. this.setStyle 식으로 Element type의 함수를 붙인거는 적용되지 않는다.
    getSVGDocument()로 SVGDocument를 얻을 수 있지만 html 페이지 로딩전에는 null로 반환된다. 즉 onload()에서야 얻을 수 있다.
    */
    var SVGDocument_ = objectElement.getSVGDocument(); // SVG 문서를 얻는다.
    //var SVGDocument_ = icon_home.contentDocument;
    if( SVGDocument_ ){ 
      var paths = SVGDocument_.getElementsByTagName("path");// SVG 문서의 element를 id를 통해 얻는다.
      //alert(paths.length);
      for(var i = 0; i < paths.length; i++){
        //do something to each div like
        replaceAttr(paths[i],attributes);
     }

      // for( var path_ in paths ){
      //   css(path_,attributes);
      // }
    }
  });
}

function svgcssOnReadyById(objectElement,svgElementID,attributes){
  ready(function(){
    /*
    html의 요소들의 type은 Element이지만 SVGDocument의 요소들의 type은 SVGElement이다.
    따라서 id(), css()등의 함수가 안 먹힌다. this.setStyle 식으로 Element type의 함수를 붙인거는 적용되지 않는다.
    getSVGDocument()로 SVGDocument를 얻을 수 있지만 html 페이지 로딩전에는 null로 반환된다. 즉 onload()에서야 얻을 수 있다.
    */
    var SVGDocument_ = objectElement.getSVGDocument(); // SVG 문서를 얻는다.
    //var SVGDocument_ = icon_home.contentDocument;
    if( SVGDocument_ ){ 
      var svgElement = SVGDocument_.getElementsById(svgElementID);// SVG 문서의 element를 id를 통해 얻는다.
      if( svgElements ) {
          css(svgElement,attributes);
      }
    }
  });
}

function svgcssOnReadyByClass(objectElement,svgElementClass,attributes){
  ready(function(){
    /*
    html의 요소들의 type은 Element이지만 SVGDocument의 요소들의 type은 SVGElement이다.
    따라서 id(), css()등의 함수가 안 먹힌다. this.setStyle 식으로 Element type의 함수를 붙인거는 적용되지 않는다.
    getSVGDocument()로 SVGDocument를 얻을 수 있지만 html 페이지 로딩전에는 null로 반환된다. 즉 onload()에서야 얻을 수 있다.
    */
    var SVGDocument_ = objectElement.getSVGDocument(); // SVG 문서를 얻는다.
    //var SVGDocument_ = icon_home.contentDocument;
    if( SVGDocument_ ){ 
      var svgElements = SVGDocument_.getElementsByClassName(svgElementClass);// SVG 문서의 element를 id를 통해 얻는다.
      if( svgElements ) {
        for( i = 0; i < svgElements.length; i++ )
          css(svgElements[i],attributes);
      }
    }
  });
}




//---------------------------- create elements ---------------------------
    /*
    다음과 같은 형태로 호출이 가능하다.
    div("test","inline-block","fixed");
    div("test","inline-block",css);
    div("test",css,attr);
    div(css,attr,"test");
    */
// function div(width, height, css_, attr_, text_){return new el( "div", width, height, css_, attr_, text_ );}
// function textarea(width, height, css_, attr_, text_){return new el( "textarea", width, height, css_, attr_, text_ );}
// function iframe(width, height, css_, attr_, text_){return new el( "iframe", width, height, css_, attr_, text_ );}
// function a(width, height, css_, attr_, text_){return new el( "a", width, height, css_, attr_, text_ );}
// function italic(width, height, css_, attr_, text_){return new el( "i", width, height, css_, attr_, text_ );}
// function p(width, height, css_, attr_, text_){return new el( "p", width, height, css_, attr_, text_ );}
// function hr(width, height, css_, attr_, text_){return new el( "hr", width, height, css_, attr_, text_ );}
// function span(width, height, css_, attr_, text_){return new el( "span", width, height, css_, attr_, text_ );}
// function label(width, height, css_, attr_, text_){return new el( "label", width, height, css_, attr_, text_ );}
// function form(width, height, css_, attr_, text_){return new el( "form", width, height, css_, attr_, text_ );}

function div(){ var el1 = new el( "div" ); el1.setEl.apply(el1,arguments); return el1;}
function canvas(){ var el1 = new el( "canvas" ); el1.setEl.apply(el1,arguments); return el1;}
function meta(){ var el1 = new el( "meta" ); el1.setEl.apply(el1,arguments); return el1;}
function link(){ var el1 = new el( "link" ); el1.setEl.apply(el1,arguments); return el1;}
//function script(){ var el1 = new el( "script" ); el1.setEl.apply(el1,arguments); return el1;}
function title(){ var el1 = new el( "title" ); el1.setEl.apply(el1,arguments); return el1;}
function pre(){ var el1 = new el( "pre" ); el1.setEl.apply(el1,arguments); return el1;}
function textarea(){ var el1 = new el( "textarea" ); el1.setEl.apply(el1,arguments); return el1;}
function iframe(){ var el1 = new el( "iframe" ); el1.setEl.apply(el1,arguments); return el1;}
function italic(){ var el1 = new el( "i" ); el1.setEl.apply(el1,arguments); return el1;}
function p(){ var el1 = new el( "p" ); el1.setEl.apply(el1,arguments); return el1;}
function u(){ var el1 = new el( "u" ); el1.setEl.apply(el1,arguments); return el1;}
function hr(){ var el1 = new el( "hr" ); el1.setEl.apply(el1,arguments); return el1;}
function span(){ var el1 = new el( "span" ); el1.setEl.apply(el1,arguments); return el1;}
function label(){ var el1 = new el( "label" ); el1.setEl.apply(el1,arguments); return el1;}
function form(){ var el1 = new el( "form" ); el1.setEl.apply(el1,arguments); return el1;}
function ul(){ var el1 = new el( "ul" ); el1.setEl.apply(el1,arguments); return el1;}
function li(){ var el1 = new el( "li" ); el1.setEl.apply(el1,arguments); return el1;}
function input(){ var el1 = new el( "input" ); el1.setEl.apply(el1,arguments); return el1;}
function select(){ var el1 = new el( "select" ); el1.setEl.apply(el1,arguments); return el1;}
function option(){ var el1 = new el( "option" ); el1.setEl.apply(el1,arguments); return el1;}
function a(href){ 
  var el1 = new el( "a" ); 
  var arr = [];
  for( i = 1; i < arguments.length; i++ )
    arr.push(arguments[i]);
  el1.setEl.apply(el1,arr); 
  el1.attr("href",href);
  return el1;}


//div.apply(null,arguments);
// function input(width, height, css_, attr_, text_){
//   var input1 = el( "input", width, height, css_, attr_, text_ );
//   input1.attr("required","");
//   return input1;
// }
// function fixedDiv(width, height, css_, attr_, text_){
//    return div(width, height, css_, attr_, text_).css("position","fixed"); 
// }
function object(css_,path){ 
  //<object type="image/svg+xml" data="image.svg"></object> => iE9+ 이상 모든 브라우저에 사용가능함
    var el1 = new el( "object" ); 
    el1.setEl.apply(el1,[css_ ,{"type":"image/svg+xml","data":path}]); 
    return el1;
  }
function svgFromFile(width,height,css_,path){ 
    //<object type="image/svg+xml" data="image.svg"></object> => iE9+ 이상 모든 브라우저에 사용가능함
    // <embed id="sv" src="ovaltest.svg" width=400 height=200>
    //var attr_ = ;
    // if(typeof attr_ !== "undefined") { /* el(a) 식으로 호출하면 undefined type인 파라미터가 들어온다. */
    //   if( attr_ != null ){
    //     attr_ = concat(attr_,attr_);
    //   }
    // }
    var el1 = new el( "object" ); 
    el1.setEl.apply(el1,[css_ , {
      "type":"image/svg+xml",
      "data":path,
      "width":width,
      "height":height
    }]); 
    return el1;

    // return new el("object", css_ , {
    //   "type":"image/svg+xml",
    //   "data":path,
    //   "width":width,
    //   "height":height
    // });
    //return new el("embed", styles ,{"src":path,"id":id} );
}

function img(path){ 
  var el1 = new el( "img" ); 
  var arr = [];
  for( i = 1; i < arguments.length; i++ ){ // arguments[1] ...
    arr.push(arguments[i]);
  }
  if( arr.length > 0 )
    el1.setEl.apply(el1,arr);

  el1.attr("src",path); 
  return el1;
    //<img src="image.svg" /> => iE9+ 이상 모든 브라우저에 사용가능함

}

// function input_( type, name, placeHolder, bRequired ){
// //function input( width, height, type, name, placeHolder, bRequired ){
//   /*
//   input( 200, 50, ... );
//   input( "test", css, ... );
//   */
//   //var el1 = new el( "form" );// el1.setEl.apply(null,arguments); return el1;}
  
//   var input1 = new el("input")
//   //input1.setEl.apply(input1,[width,height]);
//   input1.element.type = type;
//   input1.element.name = name;
//   input1.attr("placeholder", placeHolder);
//   if( bRequired )
//   {
//     input1.attr("required","");
//     input1.element.required = true;
//   }


//   var arr = [];
//   for( i = 4; i < arguments.length; i++ ){ // arguments[1] ...
//     arr.push(arguments[i]);
//   }
//   if( arr.length > 0 )
//     input1.setEl.apply(input1,arr);

//   return input1;
// }

function parseJson(jsonString){
  try {
      var o = JSON.parse(jsonString);

      // Handle non-exception-throwing cases:
      // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
      // but... JSON.parse(null) returns null, and typeof null === "object", 
      // so we must check for that, too. Thankfully, null is falsey, so this suffices:
      if (o && typeof o === "object") {
          return o;
      }
  }
  catch (e) { }

  return null;
};

/* ajax는 중복 호출시에 status가 0으로 되어 에러가 난다. => 순차적으로 호출하기 위해 g_arrAjax를 만듬  */
g_arrAjax = [];
function addAjax(arr){
  //alert(func);
  g_arrAjax.push(arr);
}

function isAjaxRunning(){
/* ajax는 중복 호출시에 status가 0으로 되어 에러가 난다. */
  var bReturn = false;
  g_arrAjax.forEach(function(item,index){
    if( item[0] == true ){
      bReturn = true;
    }
  });

    return bReturn;
}


function runAjax(){
  /* ajax는 중복 호출시에 status가 0으로 되어 에러가 난다. */
  if( isAjaxRunning() == false ){
    g_arrAjax.forEach(function(item,index){
      if( item[0] == false ){
        item[0] = true;
        item[1]();
        return;
      }
    });
  }
}

 /*
   xmlhttp.responseType을 "json"으로 보내지 않을 경우는
   xmlhttp.responseText로 텍스트 결과값이 와서 Json을 parsing하여 사용한다.
   echo로 된 결과 값들도 모두 받을 수 있다. php의 error 메시지도 echo로 오니까 모두 받는다. => 보안상 안좋을 수 있음
   xmlhttp.responseType을 "json"으로 보낼 경우는
   결과값 자체가 Json으로 온다  
   따라서 페이지 자체가 에러날 경우 php는 echo로 결과 값이 뿌려주는데 Json데이터가 아니므로 결과값이 null로 온다.
   */
var g_bAjaxJsonResponse = true; // 
  

function ajax(url,formData,bFailAlert,func,func_fail,bSuccessStringCheck){
  /* 
  bSuccessStringCheck는 결과값 Json 배열에 "success"키값이 있는지를 체크한다. => 내가 만든 php에는 그냥 success혹은 fail을 넣어서 보냄 외부 url을 당연히 없다.
  내가 만든 php는 따라서 페이지 에러가 나지않는이상 Json배열이 오긴 온다. 다만 "success"대신 "fail"이 올 수 있음
  ajax는 onload 에서 호출되어야 response가 정상적으로 도달한다. 또한 페이지를 refresh에 status가 0이 나오므로 setTimeout을 1초정도 주어서 보낸다.
  즉 페이지 로딩이 끝난 후에 1초 후에 ajax를 보내는 것이다.*/
  if( isUndefined(bSuccessStringCheck) )
    bSuccessStringCheck = true;
  var index = g_arrAjax.length;
  var arr = [false, function(){
    //alert(url + " is started");
    // formData가 null일 경우 formData로 보내는게 아닌 url에 파라미터로 넣어서 보내고 결과는 html로 뿌려진 json이다.
    g_elWaitingPopUp.show(true);
    ajax_(url,formData,function(jsontext){
      //alert(jsontext);
      if( g_bAjaxJsonResponse == false )
        jsontext = parseJson(jsontext);

        if( bSuccessStringCheck ){
          if( jsontext == null ){ 
            if( is(func_fail) )
                func_fail();

            /* 
            no json 에러 해결법
            jsontext가 null일경우는 fail이나 success나 아무것도 안왔다는 이야기 
            로직상으로는 jsonExit(false,$arrResponse,"fail");등을 다 넣었기 때문에 반드시
            fail이나 success가 오고 내용이 와야 한다. 내용이 안오고 그냥 에러가 온 경우는 해당 php페이지에서 에러난 것이다.
            ajax로 보내면 php는 맨 윗줄부터 쭉 실행하다가 에러가 발생되는 줄에서 에러를 전송한다. 따라서 어디에서 에러가 났는지를 찾을 려면
            jsonExit(false,$arrResponse,"here"); 를 넣어본다. "here"메시지가 안온 라인이 에러가 난 라인이다.            
            */
            if( bFailAlert )
            {
              alert(url + " no json: " + jsontext);
            }

          }else{
            if( jsontext["success"] ){
              if( is(func) )
                func(jsontext);
            }else{
              if( is(func_fail) )
              {
                func_fail();
              }

              if( bFailAlert )
              {
                alert( url + " fail: " + jsontext["message"] );
              }
            }
          }
        }else{
          func(jsontext);
        }

        g_elWaitingPopUp.show(false);
        //alert(url + " is finished");
        g_arrAjax.splice( g_arrAjax.indexOf(arr), 1); // remove
        runAjax();
          
    },function(str){
      /* 여기 걸리는 경우는 페이지가 완전히 로딩되기 전에 ajax를 보낸경우 onload에서 1초후에 ajax를 보내자.
      또한 중복해서 보낸경우 혹은 보내고 응답이 오기전에 페이지를 리프레시 해서 새로 보낸 경우 => 무조건 응답을 받고 보내야 함 */
      if( is(func_fail) )
        func_fail();

      if( bFailAlert )
        alert( url + " not 200: ajax status: " + str );

      //alert(url + " is finished");
      g_arrAjax.splice( g_arrAjax.indexOf(arr), 1); // remove
      runAjax();
    });

  }];

  addAjax(arr);


  //runAjax();

  /* ajax는 중복 호출시에 status가 0으로 되어 에러가 난다. 
  따라서 ajax가 최초 한개 들어올 경우 실행해주고 만약 이전에 들어온것이 있다면 호출안하고 끝나면 호출해준다.
  */
 //alert(url + " arrAjax: " + g_arrAjax.length);
 if( g_arrAjax.length > 3 )
  console.log("g_arrAjax.length: " + g_arrAjax.length);
 runAjax();
  // if(  g_arrAjax.length == 1 ){
  //   //g_arrAjax[g_arrAjax.length-1][0];
  //   if( g_arrAjax[0][0] == false ){
  //     g_arrAjax[0][0] = true;
  //     g_arrAjax[0][1]();
  //   }
  // }

}

function ajax_(url,formData,func_response,func_fail){
  // formData가 null일 경우 url에 parameters를 넣는 get 전송이다.
  if (window.XMLHttpRequest){
    xmlhttp=new XMLHttpRequest();
  }else{
      xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }

  // form의 submit식으로 form데이터를 만들어서 보내는 것이다.
  // var formData = new FormData();
  // formData.append('title',"test title");
  // formData.append('table', userInfos["table"]);
  // formData.append('idx', userInfos["idx"]);
  // formData.append('html', this.getTotalCode()); // => php에서 $_POST["html"]; 식으로 get할 수 있다.
 
  
  if( formData == null ){
    xmlhttp.open('GET', url, true);
    //g_bAjaxJsonResponse = true;
  }else{
    xmlhttp.open('POST', url);
  }

  if( g_bAjaxJsonResponse )
    xmlhttp.responseType = 'json';
  
  xmlhttp.onload = function() {
    if (xmlhttp.status === 200) {
      if( is(func_response) ){
        //alert("response" + xmlhttp.responseText);
        if( g_bAjaxJsonResponse ){
          func_response(xmlhttp.response);
        }else{
          func_response(xmlhttp.responseText);
        }
      }
        //alert("response: " + xmlhttp.responseText);
    }
    else {
      if( is(func_fail) )
        func_fail(xmlhttp.status);
        //alert('Request failed.  Returned status of ' + xmlhttp.status);
    }
  };

  if( formData == null ){
    xmlhttp.send();
  }else{
    xmlhttp.send(formData);
  }
}

function buttonCss(bWhiteShadow,height,borderRadius,borderColor,borderWidth){
  var c_icon_signIn = {
    "display":"inline-block",
    "line-height":height + "px", /* line-height를 height와 같은 크기로 넣으면 text가 vertical로 정렬이 된다. */
    "height":height + "px",
    "border-radius": borderRadius + "px",
    "border": borderWidth + "px solid " + borderColor,
    "text-decoration": "none",
    //"box-shadow": "0 2px 8px 0 #ffffff88, 0 2px 20px 0 #ffffffff"
  };

  // if( bWhiteShadow )
  //   c_icon_signIn["box-shadow"] = "0 2px 8px 0 #ffffff88, 0 2px 20px 0 #ffffffff";
  // else
  //   c_icon_signIn["box-shadow"] = "0 2px 8px 0 #77777788, 0 2px 20px 0 #777777ff";

  return c_icon_signIn;
}

function roundButton( pFunction, bWhiteShadow, height, radius ){
  var button1 = div();
  if( is(bWhiteShadow) == false )
    bWhiteShadow = false;

  if( is(radius) == false )
    radius = 5;

  var arr = [];
  for( i = 3; i < arguments.length; i++ ){
    arr.push(arguments[i]);
  }
  
  if( arr.length > 0 )
    button1.setEl.apply(button1,arr);

  button1.css( buttonCss(bWhiteShadow,height,radius,"gray",2) );
  button1.onclick(pFunction);
  button1.padding(0,height*0.3,0,height*0.3);

  //button1.hover(hoverColor);
    //alert(arr);
  return button1;
}

function button( pFunction ){
  /*
  button( 200, 50, ... );
  button( "test", css, ... );
  */
  var button =new el( "input");
  var arr = [];
  for( i = 2; i < arguments.length; i++ ){
    arr.push(arguments[i]);
  }
  if( arr.length > 0 )
    button.setEl.apply(button,arr);
  button.element.type = "button";

  for( i = 0; i < arguments.length; i++ ){
    if( isString(arguments[i]) ){
      if( isPercent(arguments[i]) == false && isPx(arguments[i]) == false )
        button.element.value = arguments[i];
    }
  }
    
  button.element.onclick = pFunction;
  return button;
}

function submitButton( pFunction, width, height, css_, attr_, text ){
  /*
  submitButton( 200, 50, ... );
  submitButton( "test", css, ... );
  */
  var button = new el( "input" );
  button.setEl.apply(button,[width, height, css_, attr_, text ]);
  button.element.type = "submit";
  
  if( isString(css_) )
    button.element.value = css_;
  else if( isString(text) )
    button.element.value = text;
  else if( isString(width) )
    button.element.value = width;

  button.element.onclick = pFunction;
  return button;
}

function uploadDiv(Image1Text2,func){
  /* 사실은 화일을 업로드 하는게 아니라 클라이언트에서 열리는 것이다. 서버없이 열림 */
  // var c_outerDiv = {
  //   "background-color":"blue",
  //   "width":"100px",
  //   "height":"100px",
  //   "display":"inline-block"
  // };
  var outerDiv = div();
  if( arguments.length > 1 ){
    var arr = [];
    for( i = 2; i < arguments.length; i++ ){ // arguments[1] ...
      arr.push(arguments[i]);
    }
    outerDiv.setEl.apply(outerDiv,arr);
  }

  var inputButton = input( "upload",{"display":"none"}).type("file").name("file").placeHolder("").required(false);// ,{"type":"file"},"upload");
  outerDiv.append(inputButton);
  outerDiv.element.onclick = function(e){
    inputButton.element.click();
  };

  inputButton.element.addEventListener('change', function(e) {
    var file = inputButton.element.files[0];
    //var fileType = /text.*/; // image.*, image/*
    var fileType = "image.*";
    if( Image1Text2 == 2 )
      fileType = "text.*|application/x-javascript|text/javascript|application/x-pointplus|text/css"; // image.*, image/*
      //fileType = "text.*|application/x-javascript|application/x-pointplus"; // image.*, image/*
    /*
    javascript 화일의 Mime type은 application/x-javascript 나  text/javascript 이다.
    css 화일은 application/x-pointplus 나	text/css 이다.
    확장자 .htm .html 는 text/html이다.
    따라서 text.*은 text/*의 의미이다.
    application.*은 application/*의 의미이다.
    */
    if (file.type.match(fileType)) { // file.mimetype.match('text.*|image.*|application.*')
      if( Image1Text2 == 2 ){
        // 화일이 업로드 될때 화일을 읽어서 text만 func함수로 넘김
        var reader = new FileReader();
        reader.onload = function(e) {
          func(file.type,reader.result);
        }
        reader.readAsText(file);
      }else{
        // 그냥 화일 자체를 func함수로 넘김 => inputButton.element.files[0]는 화일 객체다.
        func( file.type, file );
      }
    } else {
      alert("File not supported!");
    }
  });



  return outerDiv;
}

//--------------------------------------------------------  boxes   ---------------------------------------------
function box_small(){
  var arrTitle_Text = box_make_title_text.apply(null, arguments); 
  box_(arrTitle_Text[0],arrTitle_Text[1],1.34);
}

function box(){
  var arrTitle_Text = box_make_title_text.apply(null, arguments);
  box_(arrTitle_Text[0],arrTitle_Text[1]);
}

function box_make_title_text(){

  //{ "dodgerblue":"=>|\"", "blue":"초월 텍스트 문서 교정 언어", "forestgreen":"문서를 교정하다|Hypertext Markup Language" });
  var title = null, dicRegExp_title = null, text = null, dicRegExp_text = null;
  for( i = 0; i < arguments.length; i++ ){ // arguments[1] ...
    if( arguments.length == 4 )
    {
      title = arguments[0];
      dicRegExp_title = arguments[1];
      text = arguments[2];
      dicRegExp_text = arguments[3];
    }
    else if( arguments.length == 3 )
    {
      var arg1 = arguments[1];
      if( isString(arg1) )
      {
        title = arguments[0];
        text = arguments[1];
        dicRegExp_text = arguments[2];
      }
      else
      {
        title = arguments[0];
        dicRegExp_title = arguments[1];
        text = arguments[2];
      }
      
    }
    else if( arguments.length == 2 )
    {
      var arg1 = arguments[1];
      if( isString(arg1) )
      {
        title = arguments[0];
        text = arguments[1];
      }
      else
      {
        text = arguments[0];
        dicRegExp_text = arguments[1];
      }
    }
    else if( arguments.length == 1 )
    {
      text = arguments[0];
    }
  }

  if( title != null && dicRegExp_title != null )
  {
      title = fxAddColorSpan( title, dicRegExp_title );
  }

  if( text != null && dicRegExp_text != null )
  {
      text = fxAddColorSpan( text, dicRegExp_text );
  }
  
  return [title,text];
}

function box_(title,text,fFont){
  var c_Main = {
    //"margin": "4px 13px 4px 10px",
    "margin": "4px 30px 4px 16px",
  }
  var c_Title = {
    "font-size": fFont + "em",
    "font-weight": "460",
    "color": "#000",
    "margin":"6px 0px"
  }

  text = replace_enter_to_hr(text);
  if( isUndefined(fFont) )
    fFont = 1.8;
  var el = div(c_Main);
  el.appendChild( div(title,c_Title) );
  el.appendChild( div(text) );
  toContent(el.element);
}

function box_color( c_Color, text, regExpressions){

  var c_Main = {
    //"padding": "4px 13px 4px 10px"
    "margin": "4px 10px 4px 8px",
  }
  var c_Text_default = {
  //"padding": "8px 13px 8px 13px"
  "padding": "6px 20px 6px 10px"
  }
  
  if( is(regExpressions) )
    text = fxAddColorSpan( text, regExpressions );

  text = replace_enter_to_hr(text);
  var el = div(c_Main);
  el.appendChild( div( text, concat(c_Text_default,c_Color) ) );
  toContent(el.element);
}

function box_blue(text, regExpressions){
  var c_Color = {
    "background-color": "rgb(245, 250, 255)",
    "border-left": "3px solid dodgerblue",
  }
  box_color( c_Color, text, regExpressions);
}

function box_yellow(text, regExpressions){
  var c_Color = {
    "background-color":"#feffc4",
    "border-left": "3px solid #f2f700"
  }
  box_color( c_Color, text, regExpressions);
}

function box_orange(text, regExpressions){
  var c_Color = {
    "background-color":"#ffffe4",
    "border-left": "3px solid #f08400"
  }
  box_color( c_Color, text, regExpressions);
}

function box_green(text, regExpressions){
  var c_Color = {
    "background-color": "rgb(235, 255, 244)",
    "border-left": "4px solid mediumseagreen"
  }
  box_color( c_Color, text, regExpressions);
}

function box_red(text, regExpressions){
  var c_Color = {
    "background-color":"#fff3f0",
    "border-left": "3px solid #ff0000"
  }
  box_color( c_Color, text, regExpressions);
}

function box_line(topPadding,bottomPadding,sColor,bToContent){
  // <div class="box"><div style="padding-top:30px;padding-bottom:10px;"><div style="background-color:blue;height:1px"></div></div></div>
  var line_height = 1;
  if( is(sColor) == false )
    sColor = "#f0f0f0";
  var parent = div().padding(topPadding,10,bottomPadding,12);
  var elDiv_Line = div(line_height).bgColor(sColor);
  parent.appendChild( elDiv_Line );
  //var parent = div( {"style":"padding-left:10px;padding-right:12px;padding-top:" + topPadding + "px;padding-bottom:" + bottomPadding + "px;"} );
  //parent.appendChild( div( null, {"style":"background-color:" + line_color + ";height:" + line_height + "px"}) );
  if( is(bToContent) == false )
    bToContent = true;

  if( bToContent )
      toContent(parent.element);

  return parent;
}

function divLine(sColor,topPadding,bottomPadding){
  // <div class="box"><div style="padding-top:30px;padding-bottom:10px;"><div style="background-color:blue;height:1px"></div></div></div>
  var line_height = 1;
  if( is(topPadding) == false )
    topPadding = 2;
  if( is(bottomPadding) == false )
    bottomPadding = 2;
  if( is(sColor) == false )
    sColor = "#f0f0f0";
  var parent = div().padding(topPadding,0,bottomPadding,0);
  var elDiv_Line = div(line_height).bgColor(sColor);
  parent.appendChild( elDiv_Line );
  return parent;
}

function box_space(height){
  var elDiv1 = div( height );
  toContent( elDiv1.element );
  //toContent( div( "test", {"style":"height:" + height + "px;"} ).element );
}

var g_nCurrentEditorThemeNumber = 11;

function box_editor_html_simply( fHeight,  arrCodes, fDefaultResizerPosition, bConsoleInResultMode, arrSubCodes, bHTMLTab, bCSSTab, bJSTab, bUseFullCodeTab ){
  if( isString(arrCodes) )
    arrCodes = [arrCodes,"",""];
  return box_editor( true, fHeight, 1, arrCodes, fDefaultResizerPosition, bConsoleInResultMode, arrSubCodes, bHTMLTab, bCSSTab, bJSTab, bUseFullCodeTab );
}

function box_editor_html( fHeight,  arrCodes, fDefaultResizerPosition, bConsoleInResultMode, arrSubCodes, bHTMLTab, bCSSTab, bJSTab, bUseFullCodeTab ){
  if( isString(arrCodes) )
    arrCodes = [arrCodes,"",""];
  var editor = box_editor( false, fHeight, 1, arrCodes, fDefaultResizerPosition, bConsoleInResultMode, arrSubCodes, bHTMLTab, bCSSTab, bJSTab, bUseFullCodeTab );
  var arrTaps = editor.dicTaps[0];
  editor.selectTap(arrTaps[0]);
  return editor;
}

function box_editor_js_simply( fHeight, arrCodes, fDefaultResizerPosition, bConsoleInResultMode, arrSubCodes, bHTMLTab, bCSSTab, bJSTab, bUseFullCodeTab ){
  if( isString(arrCodes) )
    arrCodes = ["",arrCodes,""];
  return box_editor( true, fHeight, 2, arrCodes, fDefaultResizerPosition, bConsoleInResultMode, arrSubCodes, bHTMLTab, bCSSTab, bJSTab, bUseFullCodeTab );
}

function box_editor_js( fHeight, arrCodes, fDefaultResizerPosition, bConsoleInResultMode, arrSubCodes, bHTMLTab, bCSSTab, bJSTab, bUseFullCodeTab ){
  if( isString(arrCodes) )
    arrCodes = ["",arrCodes,""];
  var editor = box_editor( false, fHeight, 2, arrCodes, fDefaultResizerPosition, bConsoleInResultMode, arrSubCodes, bHTMLTab, bCSSTab, bJSTab, bUseFullCodeTab );
  var arrTaps = editor.dicTaps[1];
  editor.selectTap(arrTaps[0]);
  return editor;
}

function box_editor_multiJs( fHeight, dicJs, fDefaultResizerPosition, bConsoleInResultMode, arrSubCodes, bHTMLTab, bCSSTab, bJSTab, bUseFullCodeTab ){
  var arrFirstNames = ["HTML","JavaScript","CSS"];
  var arrCodes = "";
  if( isString(dicJs) )
  {
    arrCodes = ["",dicJs,""];
  }
  else
  {
    var key = firstKey(dicJs);
    arrFirstNames[1] = key;
    arrCodes = ["",firstValue(dicJs),""];
    remove(dicJs,key);
  }
  var editor = box_editor( false, fHeight, 2, arrCodes, fDefaultResizerPosition, bConsoleInResultMode, arrSubCodes, bHTMLTab, bCSSTab, bJSTab, bUseFullCodeTab, arrFirstNames );
  var elTap;
  if( isString(dicJs) == false )
  {
    elTap = editor.createTapWithBuffer(1,dicJs);
  }
  
  if( is(elTap) )
  {
    editor.selectTap(elTap);
    editor.updatePreview();
  }
}

function box_editor_css_simply( fHeight, arrCodes, fDefaultResizerPosition, bConsoleInResultMode, arrSubCodes, bHTMLTab, bCSSTab, bJSTab, bUseFullCodeTab ){
  if( isString(arrCodes) )
    arrCodes = ["","",arrCodes];
  return box_editor( true, fHeight, 3, arrCodes, fDefaultResizerPosition, bConsoleInResultMode, arrSubCodes, bHTMLTab, bCSSTab, bJSTab, bUseFullCodeTab );
}

function box_editor_css( fHeight, arrCodes, fDefaultResizerPosition, bConsoleInResultMode, arrSubCodes, bHTMLTab, bCSSTab, bJSTab, bUseFullCodeTab ){
  if( isString(arrCodes) )
    arrCodes = ["","",arrCodes];
  var editor = box_editor( false, fHeight, 3, arrCodes, fDefaultResizerPosition, bConsoleInResultMode, arrSubCodes, bHTMLTab, bCSSTab, bJSTab, bUseFullCodeTab );
  var arrTaps = editor.dicTaps[2];
  editor.selectTap(arrTaps[0]);
  return editor;
}

function box_editor_all_simply(  fHeight, arrCodes, fDefaultResizerPosition, bConsoleInResultMode, arrSubCodes, bHTMLTab, bCSSTab, bJSTab, bUseFullCodeTab ){
  var editor = box_editor( true, fHeight, 4, arrCodes, fDefaultResizerPosition, bConsoleInResultMode, arrSubCodes, bHTMLTab, bCSSTab, bJSTab, bUseFullCodeTab );
  var arrTaps = editor.dicTaps[3];
  editor.selectTap(arrTaps[0]);
  return editor;
}

function box_editor_all(  fHeight, arrCodes, fDefaultResizerPosition, bConsoleInResultMode, arrSubCodes, bHTMLTab, bCSSTab, bJSTab, bUseFullCodeTab ){
  return box_editor( false, fHeight, 4, arrCodes, fDefaultResizerPosition, bConsoleInResultMode, arrSubCodes, bHTMLTab, bCSSTab, bJSTab, bUseFullCodeTab );
}

function popUpEditor()
{
  // var elMother = div(600).bgColor("blue").relative();
  // toContent(elMother.element);

  var bSignIn = false;
  var userId = "", userIdx = "", userName = "", userThumnail = "";

  var sCode = ``;
  var arrSubCodes = null;
  var bSubCodesInEditor = false;
  var nCodeFor1Html2Js3Css4All = 1;
  var fDefaultResizerPosition = 50;
  var bBottomToolbar = false;
  var bSignInButton = false;
  var bLocalStorage = true;
  var fBorder = 0;
  var funcClose = null;
  var funcResize = null;
  var param_g_nLayoutIndex = 1;
  var nMenuCount_1Two2Six3Nine = 3;
  var nDefaultTapIndex = 0;
  var bCloseButton = true;
  var bLayoutButton = true;
  var bFontButton = true;
  var bThemeButton = true;
  var bUploadButton = true;
  var bDownloadButton = true;
  var bSmallFont = true;
  var bLineNumbers = true;
  var arrFirstNames = ["HTML","JavaScript","CSS"];
  if( screen.width < 700 )
  {
    param_g_nLayoutIndex = 7;
    bFontButton = false;
    bThemeButton = false;
  }
  var sBorderColor = "#bbb";
  var sResizerColor = "#bbb";
  var sBGColor = "gray";
  var sTapBGColor = "seagreen";
  var sTapTextColor = "white";
  var sToolbarColor = "#bbb";
  var bResultTab = true;
  var bUseHTMLTap = true;
  var bUseCSSTap = true;
  var bUseJSTap = true;
  var bUseFullCodeTab = true;
  
  var bShowLeftBar = false;
  var bShowRightBar = true;
  if( screen.width < 700 )
    bShowRightBar = false;
  var bConsoleInResultMode = false;
  var bConsoleButton = true;
  var bShowConsole = false;
  // var bLogoSVG = true;
  // var sTitle1 = "Js";
  // var sTitle2 = "Mation";
  var bLogoSVG = false;
  var sTitle1 = "My";
  var sTitle2 = "Editor";

  g_elModal_ContentDiv.empty();
  g_elModal.show();

  g_funcClose_ModalEditor = function(e){
    g_elModal.hide();
    document.body.style["overflow"] = "auto"; // 모바일에서 팝업이 떠도 아래 스크롤이 움직이므로 스크롤을 못하게 막은걸 푼다.
    //getContent().css("overflow","auto"); // scroll enable
  }

  /* 
  모바일에서 팝업이 떠도 아래 스크롤이 움직이므로 스크롤을 못하게 막는다.
  스크롤바를 없애면 g_elModal_ContentDiv나 elMother의 크기가 변한다. 100%인데 옆에 스크롤바가 없어졌으니 크기가 커짐
  따라서 editor를 생성하기 전에 없애고 생성해야 크기가 딱 맞게 된다.
  */
  document.body.style["overflow"] = "hidden";

  var pJsmationEditor = new createJsmationEditor(g_elModal_ContentDiv,sCode,bSubCodesInEditor,arrSubCodes,nCodeFor1Html2Js3Css4All,fDefaultResizerPosition,bBottomToolbar,bSignInButton,bLocalStorage,fBorder,g_funcClose_ModalEditor,funcResize,param_g_nLayoutIndex,nMenuCount_1Two2Six3Nine,nDefaultTapIndex,bCloseButton,bLayoutButton,bFontButton,bThemeButton,bUploadButton,bDownloadButton,sBGColor,sToolbarColor,sBorderColor,sResizerColor,sTapBGColor,sTapTextColor,bResultTab,bUseHTMLTap,bUseCSSTap,bUseJSTap,bUseFullCodeTab,bSmallFont,bLineNumbers,arrFirstNames,bConsoleInResultMode,bConsoleButton,bShowConsole,bSignIn,bShowLeftBar,bShowRightBar,bLogoSVG,sTitle1,sTitle2,userId,userIdx,userName,userThumnail);
  pJsmationEditor.changeTheme(g_nCurrentEditorThemeNumber);
  //pJsmationEditor.refreshCodeMirrors(); //가끔 에디팅 포커스가 안잡힐때가 있어서 그냥 리프레쉬 해준다.
  
  //document.body.style["overflow"] = "hidden";
  //pEmbeddedJsEditor.updatePreview(false);
}

function box_editor( bSimpleMode, fHeight, n1Html2Js3Css4FullCode, arrCodes, fDefaultResizerPosition, bConsoleInResultMode, arrSubCodes, bHTMLTab, bCSSTab, bJSTab, bUseFullCodeTab, arrFirstNames ){

  var c_elMother = {
    //"width":"100%",
    // "height":"96%",
    //"padding":"0px 30px 0px 0px",
    //"border":fBorder + "px solid " + "blue",
  }

  var elMother = div(fHeight,c_elMother).relative();
  toContent(elMother.element);



  if( isUndefined(fDefaultResizerPosition) )
    fDefaultResizerPosition = 50;
  var bBottomToolbarMode = true;
  var bSubCodesInEditor = false;
  var bSignInButton = false;
  var bLocalStorage = false;
  var bResultTab = false;
  var nLayoutIndex = 6;
  var bShowConsole = false
  var bConsoleButton = false;
  if( isUndefined(bConsoleInResultMode) )
    bConsoleInResultMode = false;
  if( bConsoleInResultMode )
    bShowConsole = true;
  if( g_bMobile )
    nLayoutIndex = 7;
  var nDefaultTapIndex = 4;
  if( isUndefined(bHTMLTab) )
    bHTMLTab = false;
  if( isUndefined(bCSSTab) )
    bCSSTab = false;
  if( isUndefined(bJSTab) )
    bJSTab = false;
  if( isUndefined(bUseFullCodeTab) )
    bUseFullCodeTab = false;

  var nTapCount = 0;
  if( bHTMLTab )
    nTapCount++;
  if( bJSTab )
    nTapCount++;
  if( bCSSTab )
    nTapCount++;
  if( bUseFullCodeTab )
    nTapCount++;

  if( n1Html2Js3Css4FullCode == 1 )
  {
    bHTMLTab = true;
    nDefaultTapIndex = 0;
  }
  else if( n1Html2Js3Css4FullCode == 2 )
  {
    bJSTab = true;
    nDefaultTapIndex = 1;
  }
  else if( n1Html2Js3Css4FullCode == 3 )
  {
    bCSSTab = true;
    nDefaultTapIndex = 2;
  }
  else if( n1Html2Js3Css4FullCode == 4 )
  {
    bUseFullCodeTab = true;
    nDefaultTapIndex = 4;
  }

  var nMenuCount_1Two2Six3Nine = 1;
  var fBorder = 4;
  //var sBGColor = "#f0f0f0";
  //var sTapBGColor = "#f9f9f9";
  //var sTapTextColor = "#999";
  var sBGColor = "#f5f5f5";// skeyblue
  //var sTapBGColor = "#87ceeb"; // skeyblue
  //var sTapBGColor = "#28bb32"; // skeyblue
  var sTapBGColor = "mediumseagreen"; // skeyblue
  var sTapTextColor = "white";
  var sToolbarColor = sBGColor;
  //var sBorderColor = "#cfcfcf";
  //var sBorderColor = sBGColor;
  var sBorderColor = "black";
  var sResizerColor = sBGColor;
  // if( screen.width < 700 )
  //   fBorder = 2;
  //var sTapBGColor = "#f0f0f0";
  
  // var fBorder = 10;
  // var sBorderColor = "#ddd";
  // var sBGColor = "#999";
  // var sTapBGColor = sBGColor;
  // var sTapTextColor = "white";
  var bCloseButton = false;
  var bLayoutButton = false;
  var bFontButton = false;
  var bThemeButton = false;
  var bDownloadButton = false;
  var bUploadButton = false;
  var bSmallFont = false;
  var bLineNumbers = false;
  if( isUndefined(arrFirstNames) )
    arrFirstNames = ["HTML","JavaScript","CSS"];
  var nCodeFor1Html2Js3Css4All = n1Html2Js3Css4FullCode;
  var pEmbeddedJsEditor;
  var pPopUpJsEditor;

  var funcClose = function(e){

    //------------------- window.addEventListener는 중복해서 계속들어가는듯하다. 따라서 remove해준다.
    window.removeEventListener('message', pPopUpJsEditor.funcMessage);
    // 닫을때는 이미 arrSubCodes가 다 merge된 상태이므로 arrSubCodes를 살려두면 계속 삽입된다. 전부 null처리함 
    pPopUpJsEditor.arrSubCodes = null;
    pEmbeddedJsEditor.arrSubCodes = null;
    arrSubCodes = null;
    pEmbeddedJsEditor.loadCode(pPopUpJsEditor.getTotalCode());
    // if( isString(arrCodes) ) // just string
    // {
    //   var sCode_Transfer;
    //   if( n1Html2Js3Css4FullCode == 1 )
    //   {
    //     sCode_Transfer = pPopUpJsEditor.pCodeMirror_html.getValue();
    //     codeMirrorValue( pEmbeddedJsEditor.pCodeMirror_html, sCode_Transfer );
    //   }
    //   else if( n1Html2Js3Css4FullCode == 2 )
    //   {
    //     sCode_Transfer = pPopUpJsEditor.pCodeMirror_js.getValue();
    //     codeMirrorValue( pEmbeddedJsEditor.pCodeMirror_js, sCode_Transfer );
    //   }
    //   else if( n1Html2Js3Css4FullCode == 3 )
    //   {
    //     sCode_Transfer = pPopUpJsEditor.pCodeMirror_css.getValue();
    //     codeMirrorValue( pEmbeddedJsEditor.pCodeMirror_css, sCode_Transfer );
    //   }
    //   else if( n1Html2Js3Css4FullCode == 4 )
    //   {
    //     sCode_Transfer = pPopUpJsEditor.pCodeMirror_all.getValue();
    //     codeMirrorValue( pEmbeddedJsEditor.pCodeMirror_all, sCode_Transfer );
    //   }
    // }
    // else // array
    // {
      
    //   codeMirrorValue( pEmbeddedJsEditor.pCodeMirror_html, pPopUpJsEditor.pCodeMirror_html.getValue() );
    //   codeMirrorValue( pEmbeddedJsEditor.pCodeMirror_js, pPopUpJsEditor.pCodeMirror_js.getValue() );
    //   codeMirrorValue( pEmbeddedJsEditor.pCodeMirror_css, pPopUpJsEditor.pCodeMirror_css.getValue() );
    // }

    g_elModal.hide();
    document.body.style["overflow"] = "auto"; // 모바일에서 팝업이 떠도 아래 스크롤이 움직이므로 스크롤을 못하게 막은걸 푼다.
    //g_elModal.style.display = "none";
  }
  
  var fucResize = function(e)
  {
    //window.open('http://lessonyou.com/editor.php', '_blank');
    if( g_elModal != null )
    {
      g_funcClose_ModalEditor = funcClose;
      g_elModal.show();
      //g_elModal.style.display = "block";
      //g_pModalEditor = createJsmationEditor(g_elModal_ContentDiv);
      //console.log("screen.width:" + screen.width + " content.width:" +  g_elModal_ContentDiv.width() );
      bSubCodesInEditor = false;
      bLayoutButton = true;
      bFontButton = true;
      bThemeButton = true;
      bUploadButton = true;
      bDownloadButton = true;
      bBottomToolbarMode = false;
      //bConsoleInResultMode = false;
      bConsoleButton = true;
      bSmallFont = true;
      bLineNumbers = true;
      //arrFirstNames = ["HTML","JavaScript","CSS"];
      fBorder = 0;
      sBGColor = "#ddd";
      sBorderColor = sBGColor;
      sResizerColor = "#bbb";
      sTapBGColor = "seagreen";
      sTapTextColor = "white";
      if( bSimpleMode )
        nMenuCount_1Two2Six3Nine = 1;
      else
        nMenuCount_1Two2Six3Nine = 2;
      // bResultTab = true;
      // if( g_pModalEditor != null )
      // {
          g_elModal_ContentDiv.empty();
      //}
      
      

      var arrCodes_Transfer = pEmbeddedJsEditor.getTotalCode();
      if( is(arrSubCodes) )
      {
        
        if( isString(arrSubCodes) ) // 문자열이면 JavaScript에 붙인다.
        {
          var arrNewSubCodes = ["","",""];
          arrNewSubCodes[1] += arrSubCodes;
          arrSubCodes = arrNewSubCodes;
        } 
        
        arrCodes_Transfer = pEmbeddedJsEditor.addCodeToHTML(arrCodes_Transfer,arrSubCodes,true);
      }
      
      // if( isString(arrCodes) ) // just string
      // {
      //   if( n1Html2Js3Css4FullCode == 1 )
      //   {
      //     arrCodes_Transfer = pEmbeddedJsEditor.pCodeMirror_html.getValue();
      //   }
      //   else if( n1Html2Js3Css4FullCode == 2 )
      //   {
      //     arrCodes_Transfer = pEmbeddedJsEditor.pCodeMirror_js.getValue();
      //   }
      //   else if( n1Html2Js3Css4FullCode == 3 )
      //   {
      //     arrCodes_Transfer = pEmbeddedJsEditor.pCodeMirror_css.getValue();
      //   }
      //   else if( n1Html2Js3Css4FullCode == 4 )
      //   {
      //     arrCodes_Transfer = pEmbeddedJsEditor.pCodeMirror_all.getValue();
      //   }
      // }
      // else // array
      // {
      //   arrCodes_Transfer = [];
      //   arrCodes_Transfer[0] = pEmbeddedJsEditor.pCodeMirror_html.getValue();
      //   arrCodes_Transfer[1] = pEmbeddedJsEditor.pCodeMirror_js.getValue();
      //   arrCodes_Transfer[2] = pEmbeddedJsEditor.pCodeMirror_css.getValue();
      // }

      if( bSimpleMode == false )
      {
        bHTMLTab = true;
        bJSTab = true;
        bCSSTab = true;
        bUseFullCodeTab = true;
        bResultTab = true;
      }

      /* 
      모바일에서 팝업이 떠도 아래 스크롤이 움직이므로 스크롤을 못하게 막는다.
      스크롤바를 없애면 g_elModal_ContentDiv나 elMother의 크기가 변한다. 100%인데 옆에 스크롤바가 없어졌으니 크기가 커짐
      따라서 editor를 생성하기 전에 없애고 생성해야 크기가 딱 맞게 된다.
      */
      document.body.style["overflow"] = "hidden"; 
      pPopUpJsEditor = new createJsmationEditor(g_elModal_ContentDiv,arrCodes_Transfer,bSubCodesInEditor,null,nCodeFor1Html2Js3Css4All,fDefaultResizerPosition,bBottomToolbarMode,bSignInButton,bLocalStorage,fBorder,funcClose,null,nLayoutIndex,nMenuCount_1Two2Six3Nine,nDefaultTapIndex,true,bLayoutButton,bFontButton,bThemeButton,bUploadButton,bDownloadButton,sBGColor,sToolbarColor,sBorderColor,sResizerColor,sTapBGColor,sTapTextColor,bResultTab,bHTMLTab,bCSSTab,bJSTab,bUseFullCodeTab,bSmallFont,bLineNumbers,arrFirstNames,bConsoleInResultMode,bConsoleButton,bShowConsole);
      pPopUpJsEditor.changeTheme(g_nCurrentEditorThemeNumber);
      //g_pModalEditor.refreshCodeMirrors(); //가끔 에디팅 포커스가 안잡힐때가 있어서 그냥 리프레쉬 해준다.
      pPopUpJsEditor.updatePreview(false);
      g_pModalEditor = pPopUpJsEditor;
      

      // g_pModalEditor.initLayout();
      // g_pModalEditor.pCodeMirror_html.refresh();
      // g_pModalEditor.pCodeMirror_js.refresh();
      // g_pModalEditor.pCodeMirror_css.refresh();
      // g_pModalEditor.pCodeMirror_all.refresh();

        //g_elModal.show(true);
        //createJsmationEditor(g_elModal_ContentDiv);
    }
        //g_elModal.style.display = "block";
    //modal_editor.focus();
    /* 에디터에 setValue를 하거나 혹은 에디터를 hide=>show로 한경우 에디터를 클릭하기 전까지 내용이 안보인다. 
    따라서 에디터과 로드된기 까지 1초후에 refresh를 때려준다. */
  };

  pEmbeddedJsEditor = new createJsmationEditor(elMother,arrCodes,bSubCodesInEditor,arrSubCodes,nCodeFor1Html2Js3Css4All,fDefaultResizerPosition,bBottomToolbarMode,bSignInButton,bLocalStorage,fBorder,null,fucResize,nLayoutIndex,nMenuCount_1Two2Six3Nine,nDefaultTapIndex,bCloseButton,bLayoutButton,bFontButton,bThemeButton,bUploadButton,bDownloadButton,sBGColor,sToolbarColor,sBorderColor,sResizerColor,sTapBGColor,sTapTextColor,bResultTab,bHTMLTab,bCSSTab,bJSTab,bUseFullCodeTab,bSmallFont,bLineNumbers,arrFirstNames,bConsoleInResultMode,bConsoleButton,bShowConsole);
  pEmbeddedJsEditor.changeTheme(g_nCurrentEditorThemeNumber);
  //pEmbeddedJsEditor.refreshCodeMirrors(); //가끔 에디팅 포커스가 안잡힐때가 있어서 그냥 리프레쉬 해준다.
  pEmbeddedJsEditor.updatePreview(false);
  return pEmbeddedJsEditor;
}

function codeMirrorValue( codeMirror, code ){
  if( code == null )
    code = "";
  codeMirror.getDoc().setValue(code);
  //codeMirror.clearHistory();
  //textareaElement.html(code);
  //codeMirror.refresh();
}


function focusEditor(codeMirror) {
    setTimeout(function() { codeMirror.refresh(); },1);
    setTimeout(fxUpdateIframePreview(codeMirror), 300);
}

function fxUpdateIframePreview(codeMirror) {
  var previewFrame = id('iframe_preview');
  if( previewFrame != null )
  {
    var preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;
    preview.open();
    preview.write( codeMirror.getValue() ); // hiddenCodeFront +  + hiddenCodeEnd 
    preview.close();
  }
}


// Begin inputting of clicked text into editor
function insertTextToCodeMirror(codeMirror_element, code) {
  //var codeMirror_element = $(".CodeMirror")[0].CodeMirror;
	var doc = codeMirror_element.getDoc();
	var cursor = doc.getCursor(); // gets the line number in the cursor position
	var line = doc.getLine(cursor.line); // get the line contents
	var pos = {
		line: cursor.line
	};
	if (line.length === 0) {
		// check if the line is empty
		// add the code
		doc.replaceRange(code, pos);
	} else {
		// add a new line and the code
		doc.replaceRange("\n" + code, pos);
	}
}

var g_funcCodeMirrorFullScreen = null;

function makeCodeMirror(textAreaID,bLineNumbers,funcFullScreen,codeText,mode){

  /*
  codeMirror는 생성시에 textArea는 hide하고 자신을 show한다. 이때 codeMirror.getWrapperElement()로 codeMirror의 전체 창을 얻을 수 있다.
  해당 전체창의 class는 CodeMirror이므로 css로 .CodeMirro{} 로 접근이 가능하다.
  */

  if( id(textAreaID) == null )
    return;
    
  if(typeof codeText !== "undefined") {
    id(textAreaID).innerHTML = codeText;
  }

  if( isUndefined(bLineNumbers) )
    bLineNumbers = false;

  var modeText = 'text/html';
  if(typeof mode !== "undefined") {
    if( mode != null ){
      modeText = "text/" + mode;
    }
  }

  //------------- autocomplete
  // CodeMirror.commands.autocomplete = function(cm) {
  //   cm.showHint({hint: CodeMirror.hint.anyword});
  // }
  // function synonyms(cm, option) {
  //   return new Promise(function(accept) {
  //     setTimeout(function() {
  //       var cursor = cm.getCursor(), line = cm.getLine(cursor.line)
  //       var start = cursor.ch, end = cursor.ch
  //       while (start && /\w/.test(line.charAt(start - 1))) --start
  //       while (end < line.length && /\w/.test(line.charAt(end))) ++end
  //       var word = line.slice(start, end).toLowerCase()
  //       for (var i = 0; i < comp.length; i++) if (comp[i].indexOf(word) != -1)
  //         return accept({list: comp[i],
  //                        from: CodeMirror.Pos(cursor.line, start),
  //                        to: CodeMirror.Pos(cursor.line, end)})
  //       return accept(null)
  //     }, 100)
  //   })
  // }

  function changeOptions(cm,bFullScreen)
  {
    if( bFullScreen )
    {
      cm.setOption("lineNumbers", true);
      cm.setOption("lineWrapping", true);
      cm.setOption("scrollbarStyle", "simple");
      cm.setOption("gutters", ["CodeMirror-foldgutter"]);
      cm.setOption("foldGutter", true);
      // cm.setOption({
      //   lineNumbers: true,
      //   lineWrapping: true,  /* 가로 스크롤바가 생겨서 쭉 나가는게 아니라 next line으로 자동이이진다. */
      //   scrollbarStyle: "simple",
      //   gutters: ["CodeMirror-foldgutter"],
      //   foldGutter: true,
      // });
    }
    else
    {
      cm.setOption("lineNumbers", false);
      cm.setOption("lineWrapping", false);
      cm.setOption("scrollbarStyle", null);
      cm.setOption("gutters", null);
      cm.setOption("foldGutter", [""]);
      // cm.setOption({
      //   lineNumbers: false,
      //   lineWrapping: false,
      //   scrollbarStyle: "null", // 스크롤 없앤다.
      //   gutters: null, 
      //   foldGutter: false,
      // });
    }
  }


  if( bLineNumbers )
  {
    return CodeMirror.fromTextArea(document.getElementById(textAreaID), {
      lineNumbers: bLineNumbers,
      lineWrapping: true, /* 가로 스크롤바가 생겨서 쭉 나가는게 아니라 next line으로 자동이이진다. */
      viewportMargin: Infinity,
      mode: modeText,
      autoCloseTags: true, 
      autoCloseBrackets: true,
      extraKeys: {
        // "Esc": "autocomplete",
        "Cmd-F": "findPersistent",
        "Ctrl-F": "findPersistent",
        "Cmd-E": "findPersistent",
        "Ctrl-E": "findPersistent",
        "Cmd-G": "findPersistent",
        "Ctrl-G": "findPersistent",
        "Alt-F": "findPersistent",
        "F10": function(cm) {
          if (cm.getOption("fullScreen"))
          { 
            if( is(g_funcCodeMirrorFullScreen) )
              g_funcCodeMirrorFullScreen(false);
            funcFullScreen(false);
            cm.setOption("fullScreen", false);
          }
          else
          {
            if( is(g_funcCodeMirrorFullScreen) )
              g_funcCodeMirrorFullScreen(true);
            funcFullScreen(true);
            cm.setOption("fullScreen", true);
          }
          //cm.setOption("fullScreen", !cm.getOption("fullScreen"));
          
        },
        "Esc": function(cm) {
          if (cm.getOption("fullScreen")) 
          {
            if( is(g_funcCodeMirrorFullScreen) )
              g_funcCodeMirrorFullScreen(false);
            funcFullScreen(false);
            cm.setOption("fullScreen", false);
          }
          else
          {
            cm.showHint({hint: CodeMirror.hint.anyword});
          }
        }
      },
      // mode: "javascript",
      //gutters: ["CodeMirror-lint-markers","CodeMirror-foldgutter"], // gutters는 lineNumbers영역이고 거기에 lint 영역을 추가로 준다.
      //lint: true, // lint => lineNumbers에 warn이나 error아이콘 및 텍스트를 보여주는 기능
      gutters: ["CodeMirror-foldgutter"],
      foldGutter: true,
      highlightSelectionMatches: {showToken: /\w/, annotateScrollbar: true}, // match highlighter
      // mode: "text/x-markdown",
      //hintOptions: {hint: synonyms}
      //extraKeys: {"Space": function(){CodeMirror.showHint();},"Cmd-F": "findPersistent","Ctrl-F": "findPersistent","Cmd-E": "findPersistent","Ctrl-E": "findPersistent","Cmd-G": "findPersistent","Ctrl-G": "findPersistent","Alt-F": "findPersistent"},
    });

  }
  else
  {
    return CodeMirror.fromTextArea(document.getElementById(textAreaID), {
      lineWrapping: false, /* 가로 스크롤바가 생겨서 쭉 나가는게 아니라 next line으로 자동이이진다. */
      scrollbarStyle: "null", // 스크롤바를 없앤다.
      viewportMargin: Infinity,
      mode: modeText,
      autoCloseTags: true, 
      autoCloseBrackets: true,
      extraKeys: {
        // "Esc": "autocomplete",
        "Cmd-F": "findPersistent",
        "Ctrl-F": "findPersistent",
        "Cmd-E": "findPersistent",
        "Ctrl-E": "findPersistent",
        "Cmd-G": "findPersistent",
        "Ctrl-G": "findPersistent",
        "Alt-F": "findPersistent",
        "F10": function(cm) {
          if (cm.getOption("fullScreen"))
          { 
            if( is(g_funcCodeMirrorFullScreen) )
              g_funcCodeMirrorFullScreen(false);
            funcFullScreen(false);
            //changeOptions(cm,false);
            cm.setOption("fullScreen", false);
          }
          else
          {
            if( is(g_funcCodeMirrorFullScreen) )
              g_funcCodeMirrorFullScreen(true);
            funcFullScreen(true);
            //changeOptions(cm,true);
            cm.setOption("fullScreen", true);
          }
          //cm.setOption("fullScreen", !cm.getOption("fullScreen"));
          
        },
        "Esc": function(cm) {
          if (cm.getOption("fullScreen")) 
          {
            if( is(g_funcCodeMirrorFullScreen) )
              g_funcCodeMirrorFullScreen(false);
            funcFullScreen(false);
            //changeOptions(cm,false);
            cm.setOption("fullScreen", false);
          }
          else
          {
            cm.showHint({hint: CodeMirror.hint.anyword});
          }
        }
      },
      highlightSelectionMatches: {showToken: /\w/, annotateScrollbar: true}, // match highlighter => same words & scroll
      matchTags: {bothTags: true}, // match tag => html, xml tag
      // mode: "text/x-markdown",
      //hintOptions: {hint: synonyms}
      //extraKeys: {"Space": function(){CodeMirror.showHint();},"Cmd-F": "findPersistent","Ctrl-F": "findPersistent","Cmd-E": "findPersistent","Ctrl-E": "findPersistent","Cmd-G": "findPersistent","Ctrl-G": "findPersistent","Alt-F": "findPersistent"},
    
    });
  }
  

}



function svgBgCss(fileName,width,height,bgWidth,bgHeight){
  return {
    "background": "url('images/" + fileName +  "')",
    "background-repeat":"no-repeat",
    "background-size":  bgWidth + "px" + " " +  bgHeight +"px", /*요놈은 그림이 커진다.*/
    "width": width + "px",
    "height": height + "px", /*그림을 담고 있는 사각이 커진다.*/
    "display":"inline-block"
   };
}

function svgDiv(fileName,width,height,bgWidth,bgHeight){
  if( is(bgWidth) == false ){
    bgWidth = width;
  }

  if( is(bgHeight) == false ){
    bgHeight = height;
  }
  return div(svgBgCss(fileName,width,height,bgWidth,bgHeight)); 

    //icon_layout1.style.background = "url('images/godot.svg')";
}

//------------------------------------------------------ event

g_arrOnloadFunctions = [];
window.onload = function(){
  for( i = 0; i < g_arrOnloadFunctions.length; i++ ){
    g_arrOnloadFunctions[i]();
  }
};

///var g_bOnLoadFinished = false;

function ready(func){
  // if( isUndefined(func) )
  //   return g_bOnLoadFinished;

  g_arrOnloadFunctions.push(func);
}

// g_bOnLoadFinished는 페이지 로딩이 끝나면 true로 바뀌는 함수로 if( ready() ) 로 페이지로딩 후를 확인 할 수 있다.
// ready(function(){
//   g_bOnLoadFinished = true;
// });


// var g_fPreWidth_Window = getWindowWidth();
// var g_fPreHeight_Window = getWindowHeight();
// var g_fPreWidth_Window;
// var g_fPreHeight_Window;

g_arrOnResizeFunctions = [];
window.onresize = function(){
  /*
  onresize 이벤트는 창 크기가 변할때
  또한 창 안에 디버그 창이 뜨거나 mobil에 보조 네이게이트용 창을 밑에 뜨거나 할때에 호출된다.
  따라서 모바일에 스크롤을 움직이면 밑에 보조창이 없어졌나 나왔다 계속 하는데 이때마다 호출된다.
  따라서 창크기만 변할때 호출되도록 이전 창크기를 저장 비교한다.
  */

  // var fWidth = getWindowWidth();
  // var fHeight = getWindowHeight();
  // console.log("fWidth: " + fWidth + " fHeight: " + fHeight );
  // if( fWidth !== g_fPreWidth_Window || fHeight !== g_fPreHeight_Window )
  // {
    for( i = 0; i < g_arrOnResizeFunctions.length; i++ ){
      g_arrOnResizeFunctions[i]();
    }
  // }

  // this.g_fPreWidth_Window = fWidth;
  // this.g_fPreHeight_Window = fHeight;
};

function fxAddRearrangUIFunction(func){
  g_arrOnResizeFunctions.push(func);
}

/*
mobile은 width가 700보다 작은 경우
tablet은 width가 1200보다 작은 경우
pc는 1000이상인데
pc에서 브라우저 크기를 조절하면 mobile크기도 되었다 tablet크기도 되었다 한다.
*/

//-------------------------------------- tablet
g_nMaxWidth_tablet = g_fTabletWidth;
g_arrMaxWidth_tabletFunctions = [];
function listener_tablet(x) {
     for( index = 0; index < g_arrMaxWidth_tabletFunctions.length; index++ ){
      if( x.matches )
        g_arrMaxWidth_tabletFunctions[index](true);
      else
        g_arrMaxWidth_tabletFunctions[index](false);
     }
}

function maxWidth_tablet(func){
  g_arrMaxWidth_tabletFunctions.push(func);
  //------------------ 처음 함수를 등록할때 한번 호출해준다.
  if( document.body.clientWidth < g_nMaxWidth_tablet ){
    func(true);
  }else{
    func(false);
  }
}

var windowMatchMedia = window.matchMedia("(max-width: " + g_nMaxWidth_tablet + "px)");
listener_tablet(windowMatchMedia); // Call listener function at run time
windowMatchMedia.addListener(listener_tablet); // Attach listener function on state changes

//-------------------------------------- mobile
g_nMaxWidth_mobile = g_fMobileWidth;
g_arrMaxWidth_mobileFunctions = [];
function listener_mobile(x) {
     for( index = 0; index < g_arrMaxWidth_mobileFunctions.length; index++ ){
      if( x.matches )
        g_arrMaxWidth_mobileFunctions[index](true);
      else
        g_arrMaxWidth_mobileFunctions[index](false);
     }
}

function maxWidth_mobile(func){
  g_arrMaxWidth_mobileFunctions.push(func);
  //------------------ 처음 함수를 등록할때 한번 호출해준다.
  if( document.body.clientWidth < g_nMaxWidth_mobile ){
    func(true);
  }else{
    func(false);
  }
}

var windowMatchMedia = window.matchMedia("(max-width: " + g_nMaxWidth_mobile + "px)");
listener_mobile(windowMatchMedia); // Call listener function at run time
windowMatchMedia.addListener(listener_mobile); // Attach listener function on state changes

/* 
maxWidth_mobile()와 maxWidth_tablet()두개를 등록하기 귀찬아서 maxWidth()에 함수한개만 등록하면 끝나게 만듬
func(bMobile,bTablet)함수를 넣으면 해당 인자값으로 mobile, tablet, desktop 변경을 확인할 수 있다. fucn(false,false)가 desktop임
*/
function maxWidth(func){

  maxWidth_mobile( function(bNarrow){
    if( g_bMobile == false ){ // 원래 작은 스크린이 아닌데 창을 줄이거나 줄였다가 늘린경우 => 데탑이나 테블릿의 창변환시 여기 걸림
      if (bNarrow) { // < 900px => mobile ( g_fMobileWidth가 900임)
        func(true,false); // 마진을 줄인다.
      } else { // 900px ~ 1400px => tablet ( g_fTabletWidth가 1400임)
        func(false,true); // 마진을 복원한다.
      }
    }
  });
  
  maxWidth_tablet( function(bNarrow){ 
  // 처음 브라우져를 키면 maxWidth_mobile()와 maxWidth_tablet()가 둘다 호출되는데 창이 mobile크기라면 스킵한다.
  if( getDocumentWidth() > g_fMobileWidth ){ 
    if( g_bDesktop ){ // 원래 작은 스크린이 아닌데 창을 줄이거나 줄였다가 늘린경우 => 데탑만 여기 걸림
      if (bNarrow) { // 900px ~ 1400px => tablet
          func(false,true); // 마진을 줄인다.
        } else { // 1400px ~ => desktop
          func(false,false); // 마진을 복원한다.
        }
    }
  }
  });

}


//-------------------------------------------------------- hightlight -------------------------------------------------------
function replace_enter_to_hr( text ) {
  if( isString(text) )
  {
    var regex = new RegExp("\n", "gi"); // g => global, i => insensitive
    return text.replace(regex, function(matched) {return "<hr class='myhr'>";});
  }

  return text
}

function replace_tab_to( text ) {
  /*
  visual studio code는 tab키를 누르면 \t을 삽입하지 않고 다른 이상한걸 삽입한다.
  */
  if( isString(text) )
  {
    //text = text.replace(/\t/g,'&nbsp;&nbsp;&nbsp;');
    text = text.replace(/\t/g,'good');
    // var regex = new RegExp("\t", "gi"); // g => global, i => insensitive
    // return text.replace(regex, function(matched) {
    //   return "&nbsp;&nbsp;&nbsp;";});
  }

  return text;
}

function highlight_( text, className, RegExpression) {   
  /*
  gi
  g modifier: global. All matches (don't return on first match)
  i modifier: insensitive. Case insensitive match (ignores case of [a-zA-Z])
  문자열.replace(정규식,function(바뀔문자열){return 새로운문자열})
  다중선택시 선택1|선택2 와 같이 | 기호를 붙인다.
  var str = "I have a cat, a dog, and a goat.";
var mapObj = {
   cat:"dog",
   dog:"goat",
   goat:"cat"
};
  str = str.replace(/cat|dog|goat/gi, function(matched){
  return mapObj[matched];
});
   */ 
    var regex = new RegExp(RegExpression, "gi");
    return text.replace(regex, function(matched) {return "<span style='color:" + className + ";'>" + matched + "</span>";});
}


function fxAddColorSpan( text, regExpressions, fontSize) {   
  if( is(regExpressions) && isString(text) ) {
      for (var att in regExpressions) {
        // var sColor = att;
        // if( isNumber(att) )
        // {
        //   if( att < g_arrBoxColors.length )
        //   {
        //     sColor = g_arrBoxColors[att];
        //   }
        //   else
        //   {
        //     sColor = "dodgerblue";
        //   }
        // }

        var regex = new RegExp(regExpressions[att], "gi");
        var fontText = "";
        if( is(fontSize) ){
          if( isNumber(fontSize) )
            fontText = "font-size:" + fontSize + "px";
          else
            fontText = "font-size:" + fontSize;
        }
        text = text.replace(regex, function(matched) {return "<span style='color:" + att + ";" + fontText + "'>" + matched + "</span>";});
      }
  }
  return text;
}

//-------------------------------------------------------- log & alert -------------------------------------------------------
function logElement(element){
  //var e = id(id);
  console.log( element );
  for (var attribute in element){
    if (element.hasAttribute(attribute))
      console.log( attribute + ": " + element.getAttribute(attribute) );
  }
}

function alertElement(element){
  //var e = id(id);
  var txt = " ";
  for (var attribute in element){
    if (element.hasAttribute(attribute))
    txt += attribute;
  }

  alert(id + " : "+ txt);
}

//-------------------------------------------------------- svg -------------------------------------------------------

function setSvgColor(element,g_sStroke,g_sStrokeW,fill,bAll){
  var bOnly = true;
  if( is(bAll) ){
    if( bAll )
      bOnly = false;
  }
  element.each(function(item,index){
      if( bOnly ){
        if( item.element.id == g_sID_changeable ){
          svgStrokeFill(item,g_sStroke,g_sStrokeW,fill);
        }
      }else{
        svgStrokeFill(item,g_sStroke,g_sStrokeW,fill);
      }
    });
}

function svgHover(element,g_sStroke,g_sStrokeW,fill,g_sStroke2,g_sStrokeW2,fill2,arrColorChangeableSubs,bAll){
  var bOnly = true;
  if( is(bAll) ){
    if( bAll )
      bOnly = false;
  }

  if( is(arrColorChangeableSubs) ){
    arrColorChangeableSubs.forEach(function(item,index){
      item.attr({"id":g_sID_changeable});
    });
  }

  //var stroke2 = stroke, g_sStrokeW2 = g_sStrokeW;
  element.element.onmouseover = function(e){
    setSvgColor(element,g_sStroke2,g_sStrokeW2,fill2,!bOnly);
  };
  element.element.onmouseout = function(e){
    setSvgColor(element,g_sStroke,g_sStrokeW,fill,!bOnly);
  };
}


function svgClick(element,g_sStroke,g_sStrokeW,fill,g_sStroke2,g_sStrokeW2,fill2,func){
  element.element.onclick = function(e){
    setSvgColor(element,g_sStroke2,g_sStrokeW2,fill2);  
    setTimeout( function(){
      setSvgColor(element,g_sStroke,g_sStrokeW,fill);
    } , 250 );
    if( is(func) )
      func(e);
  };
}

function svgStrokeFill(element,stroke,strokeW,fill,bChangeIfExists){
  if( isDefined(bChangeIfExists) == false )
    bChangeIfExists = false;

  var c_element = {};
  if( is(stroke) ){
    if( bChangeIfExists ){
      if( element.has("stroke") )
        c_element["stroke"] = stroke;
    }else{
      c_element["stroke"] = stroke;
    }
  }
  
  if( is(strokeW) ){
    if( bChangeIfExists ){
      if( element.has("stroke-width") )
        c_element["stroke-width"] = strokeW;
    }else{
      c_element["stroke-width"] = strokeW;
    }
  }
  
  if( is(fill) ){
    if( bChangeIfExists ){
      if( element.has("fill") )
        c_element["fill"] = fill;
    }else{
      c_element["fill"] = fill;
    }
  }


  
  element.css(c_element);
}

function elNS(name){

  return new el( document.createElementNS("http://www.w3.org/2000/svg", name) );
  //alert(div1.element);
  //alert( typeof document.createElementNS("http://www.w3.org/2000/svg", name) == SVGElement );
}

function circle(centerX,centerY,radius,stroke,strokeW,fill){
  if( isUndefined(fill) && isUndefined(strokeW) )
  {
    // 인자값이 4개만 있을 경우 => circle( rt, stroke, strokeW, fill ) 식으로 호출된 경우다.
    var rt = centerX;
    stroke = centerY;
    strokeW = radius;
    fill = stroke;
    centerX = rt.x + rt.width*0.5;
    centerY = rt.y + rt.height*0.5;
    radius = rt.width*0.5;
  }
  var circle = elNS( 'circle');
  circle.attr({
    "class":"circle", /* 모든 circle을 쉽게 바꿀 수 있게 class 이름을 circle로 한다. */
    "r":radius,
    "cx":centerX,
    "cy":centerY,
    "stroke":stroke,
    "stroke-width":strokeW,
    "fill":fill
  });
   return circle;
}

function ellipse(centerX,centerY,radiusX,radiusY,stroke,strokeW,fill){
  if( isUndefined(fill) && isUndefined(strokeW) && isUndefined(stroke) )
  {
    // 인자값이 4개만 있을 경우 => ellipse( rt, stroke, strokeW, fill ) 식으로 호출된 경우다.
    var rt = centerX;
    stroke = centerY;
    strokeW = radiusX;
    fill = radiusY;
    centerX = rt.x + rt.width*0.5;
    centerY = rt.y + rt.height*0.5;
    radiusX = rt.width*0.5;
    radiusY = rt.height*0.5;
  }
  var circle = elNS( 'ellipse');
  circle.attr({
    "class":"ellipse", /* 모든 circle을 쉽게 바꿀 수 있게 class 이름을 circle로 한다. */
    "rx":radiusX,
    "ry":radiusY,
    "cx":centerX,
    "cy":centerY,
    "stroke":stroke,
    "stroke-width":strokeW,
    "fill":fill
  });
   return circle;
}

function rect(rect,stroke,strokeW,fill){
  var rectElement = elNS( 'rect');
  
  rectElement.attr({
    "class":"rect", /* 모든 rect를 쉽게 바꿀 수 있게 class 이름을 rect로 한다. */
    "x":rect.x,
    "y":rect.y,
    "width":rect.width,
    "height":rect.height
  });

  svgStrokeFill(rectElement,stroke,strokeW,fill);
   return rectElement;
}

function svg(width,height,attributes){
  /* display를 inline-block으로 준다. 매뉴에 사용되기 편하기 때문
  "vertical-align":"top"은 inline element에 생기는 이상한 bottom margin을 없애려 넣는다.
  */
  var elSVG = elNS('svg');
  var attr_ = {
    "width":width,
    "height":height,
    //"version":"1.1"
    /* 아래 path의 사각이다. => 이값을 안넣으면 svg의 bottom쪽의 margin이 굉장히 커진다. div에 넣으면 기본 사각의 height가 너무큼 => default값이 있는듯 => 반드시 넣어야 함 */
    // "viewBox":"0 0 " + width + " " + height,
    // "preserveAspectRatio":"none"
  }

  elSVG.attr(concat(attr_,attributes));// width="100px" <= 속성이다.
  /*
   svg를 테그로 삽입하는 등의 inline element 를 사용할때 bottom에 margin이 생긴다. 이를 해결하기 위해서는 display:block;를 넣거나 
   "vertical-align":"top"를 넣으면 된다. 이유는 block이 아닌 그냥 element가 생성되어 들어가는 듯하다.
   */
  var c_elSVG = {
    "display":"inline-block",
    // "display":"block"
     "vertical-align":"top",
     "cursor":"pointer"
  };
  elSVG.css(c_elSVG); // style="width:100px" <= 스타일 속성이다.


  //console.log(el1.el1);
  return elSVG;
}

function path(data,stroke,strokeW,fill){
  var element = elNS( 'path');
  element.attr({
    /* 모든 rect를 쉽게 바꿀 수 있게 class 이름을 rect로 한다. */
    "d":data
  });

  svgStrokeFill(element,stroke,strokeW,fill);
  return element;
}

function pathData(ptArray){
  var str = "";
  // for( index in ptArray ){
  ptArray.forEach( function(data, index) {
    if( index == 0 ){
      var items = data.split(" ");
      str += " M" + Math.round(items[0]) + " " +  Math.round(items[1]); 
    }else if( index == ptArray.length - 1 ){
      str += " Z";
    }else {
      var items = data.split(" ");
      str += " L" + Math.round(items[0]) + " " +  Math.round(items[1]); 
    }
  } );

  return str;
}


function show(element,bShow,bInlineBlock) {
  if( isString(element) )
    element = id(element);

  var show = true;
  if(typeof bShow !== "undefined") {
    if( bShow != null ){
      show = bShow;
    }
  }
  if( show ){
    if( is(bInlineBlock) ){
      if( bInlineBlock ){
        element.style["display"] = "inline-block";
        return;
      }
    }
    element.style["display"] = "block";
  }else{
    element.style["display"] = "none";
  }
}

function hide(element,bHide,bInlineBlock) {
  if( isString(element) )
    element = id(element);

  var show = false;
  if(typeof bHide !== "undefined") {
    if( bHide != null ){
      show = !bHide;
    }
  }
  if( show ){
    if( is(bInlineBlock) ){
      if( bInlineBlock ){
        element.style["display"] = "inline-block";
        return;
      }
    }
    element.style["display"] = "block";
  }else{
    element.style["display"] = "none";
  }
}


function polygon(points,stroke,strokeW,fill){
  var element = elNS( 'polygon');
  element.attr({
    /* 모든 rect를 쉽게 바꿀 수 있게 class 이름을 rect로 한다. */
    "points":points
  });

  svgStrokeFill(element,stroke,strokeW,fill);
  return element;
}


function gTranslate(x,y){ // group
  var element = elNS( 'g');
  element.attr({
    "class":"g", /* 모든 rect를 쉽게 바꿀 수 있게 class 이름을 rect로 한다. */
    "transform":"translate(" + x + "," + y + ")"
  });

  return element;
}

function gTransform(x,y,sx,sy){ // group
  //transform="translate(cx, cy) scale(sx sy) translate(-cx, -cy)"
  //transform="matrix(sx, 0, 0, sy, cx-sx*cx, cy-sy*cy)";
  var element = elNS( 'g');
  element.attr({
    "class":"g", /* 모든 rect를 쉽게 바꿀 수 있게 class 이름을 rect로 한다. */
    "transform":"translate("+x+", "+y+") scale("+sx+" "+sy+")"
    //"transform":"translate("+x+", "+y+") scale("+sx+" "+sy+") translate("+(-x)+", "+(-y)+")"
    //"transform":"matrix(" + sx + ", 0, 0, " + sy + ", " + x-sx*x + ", " + y-sy*y+ ")"
  }); 

  return element;
}


{/* <svg height="30" width="200">
<text x="0" y="15" fill="red">I love SVG!</text>
</svg>  */}

function text(text,x,y,fontSize,stroke,strokeW,fill){
  return text_(text,x,y,"sans-serif",fontSize,0.6,"normal",0,0,stroke,strokeW,fill);
}

function text_(text,x,y,fontFamily,fontSize,lineHeight,fontWeight,letterSpacing,wordSpacing,stroke,strokeW,fill){
  var element = textElement(x,y,fontFamily,fontSize,lineHeight,fontWeight,letterSpacing,wordSpacing,stroke,strokeW,fill);
  element.html(text);
  //var tspan = textspan(text,x,y,fontSize,lineHeight);
  //textElement.append(tspan);
  return element;
}

function textElement(x,y,fontFamily,fontSize,lineHeight,fontWeight,letterSpacing,wordSpacing,stroke,strokeW,fill){
  var element = elNS( 'text');
  element.attr({
    "class":"text", /* 모든 text를 쉽게 바꿀 수 있게 class 이름을 text로 한다. */
    "x":x,
    "y":y,
  });

  element.css({
  "font-family":fontFamily,
  "font-size":fontSize + "px",
  "line-height":lineHeight,
  "font-weight":fontWeight,
  "letter-spacing":letterSpacing + "px",
  "word-spacing":wordSpacing + "px",
  "stroke":stroke,
  "stroke-width":strokeW,
  "fill":fill
  });
  
   return element;
}

function textspan(text,x,y,fontSize,lineHeight){
  var element = elNS( 'tspan');
  element.attr({
    "class":"text", /* 모든 rect를 쉽게 바꿀 수 있게 class 이름을 rect로 한다. */
    "sodipodi:role":"line",
    "x":x,
    "y":y
  });

  element.css({
  "font-size":fontSize + "px",
  "line-height":lineHeight
  });
  
  element.html(text);
  return element;
}


function arrow(rect,stroke,strokeW,fill,ptRatioHeader){
  if( is(ptRatioHeader) == false ){
    ptRatioHeader = pt(0.4,0.3);
  }
  
  var ptHead = pt( rect.x + rect.width*ptRatioHeader.x, rect.y + rect.height*0.5 );
  var gap = rect.height*ptRatioHeader.y;
  // console.log(ptHead);
  // console.log(gap);
  var dataArrow = [
    rect.x + " " + ptHead.y,
    ptHead.x + " " + rect.y, 
    ptHead.x + " " + (rect.y + gap), 
    (rect.x + rect.width) + " " + (rect.y + gap), 
    (rect.x + rect.width) + " " + (rect.y + rect.height - gap), 
    ptHead.x + " " + (rect.y + rect.height - gap), 
    ptHead.x + " " + (rect.y + rect.height), 
    rect.x + " " + ptHead.y,
    "0 0"
  ];
  
  var path1 = path(pathData(dataArrow),stroke,strokeW,fill);

  //var path1 = path("M 16.022084,39.176136 V 31.387535 H 38.731051 V 9.1079687 H 16.022084 V 1.2740776 L 0.95087722,20.247898 16.022084,39.176573 Z",
  //  stroke,strokeW,fill);
  //svgElement.append(path1);
  return path1;
}

//------------------------------------------------------------------------------- local files
var g_sLocalKey_Language = "language";
var g_sLocalKey_Code = "code";
var g_sLocalKey_CreatedDate = "created";
var g_sLocalKey_ModifiedDate = "modified";
var g_sLocalKey_Description = "description";
var g_sLocalKey_LastIndex = "nLastFileIndex";
var g_sLocalKey_options = "options"; // layoutIndex, scrollbar position등을 저장한다.
/*
화일을 삭제할 수 있으므로 실제 화일인덱스는 순차적이지도 않고 빠지기도 하고 제맘대로이나. LastIndex는 화일 생성 기준이므로 계속증가한다.
결국 화일을 10개 생성하고 5개삭제 했어도 LastIndex는 10이된다.
반면 finder는 그냥 순차적인 화일의 번호이고 sort()되어 있어서 0_, 1_, 5_, 7_ 식으로 sort()되어 있고 몇번째 아이템인지이므로
fileIndex와 LastIndex화 finderIndex는 다르다.
key는 LocalStorage에 저장한 아이템의 key값이다.
*/

function getLocalLastFileIndex(){
  if (typeof(Storage) !== "undefined") { // check brower support
    var text = localStorage.getItem(g_sLocalKey_LastIndex);
    if( is(text) ){
      return text;
    }
  }

  return -1;
}

function getLocalFileIndexFromFinderIndex(nFinderIndex){
  var arrKeys = getLocalFilesKeys();
  if( is(arrKeys) )
  {
    var nIndex = 0;
    var sFileName = null;
    for( key in arrKeys )
    {
      if( nFinderIndex == nIndex )
      {
        sFileName = arrKeys[key];
        break;
      }

      nIndex++;
    }

    if( sFileName != null )
    {
      //console.log(sFileName);
      return getIndexFromFileName(sFileName);
    }
  }

  return 0;
}

function getFinderIndexFromLocalFileIndex(nFileIndex){
  var arrKeys = getLocalFilesKeys();
  if( is(arrKeys) )
  {
    var nIndex = 0;
    var sFileName = null;
    for( key in arrKeys )
    {
      var nTempFileIndex = getIndexFromFileName(arrKeys[key]);
      if( nTempFileIndex == nFileIndex )
      {
        return nIndex;
      }

      nIndex++;
    }
  }

  return 0;
}

function setLocalLastIndex(nIndex){
  if (typeof(Storage) !== "undefined") { // check brower support
    localStorage.setItem( g_sLocalKey_LastIndex, nIndex );
  }
}

function getLocalFilesCount(){
  var arrText = getLocalFiles();
  if( arrText != null ){
    var arrKeys = Object.keys(arrText); // objects to array
    return arrKeys.length;
  }

  return 0;
}

// function getLastFileIndex(){
//   var arrText = getLocalFiles();
//   if( arrText != null ){
//     var arrKeys = Object.keys(arrText).sort(); // objects to array
//     return getIndexFromFileName(arrKeys.lastValue);
//   }

//   return 0;
// }

function getLocalFiles()
{
  return getLocalItems(g_sLocalKey_Code);
}

function getLocalItems(sKey){
  if (typeof(Storage) !== "undefined") { // check brower support
    var text = localStorage.getItem(sKey);
    if( is(text) ){
      if( text != "" && text != 0 ){
        var arrText = parseJson(text);
        //console.log(arrText);
        if( arrText != null ){
          return arrText;
        }
      }
    }
  }

  return null;
}

function changeLocalFileKey(sOldKey, sNewKey){
  if( sOldKey != sNewKey )
  {
    console.log("sOldKey:" + sOldKey);
    console.log("sNewKey:" + sNewKey);
    //----------------- code
    {
      var arrText = getLocalItems(g_sLocalKey_Code);
      var sValue = arrText[sOldKey];
      if( is(sValue) )
      {
        arrText[sNewKey] = sValue;
        delete arrText[sOldKey];
        setLocalItems(arrText, g_sLocalKey_Code);
      }
    }
    
    //-------------------- description
    {
      var arrText = getLocalItems(g_sLocalKey_Description);
      var sValue = arrText[sOldKey];
      if( is(sValue) )
      {
        arrText[sNewKey] = sValue;
        delete arrText[sOldKey];
        setLocalItems(arrText, g_sLocalKey_Description);
      }
    }

    //-------------------- Modified date
    {
      var arrText = getLocalItems(g_sLocalKey_ModifiedDate);
      var sValue = arrText[sOldKey];
      if( is(sValue) )
      {
        arrText[sNewKey] = sValue;
        delete arrText[sOldKey];
        setLocalItems(arrText, g_sLocalKey_ModifiedDate);
      }
    }

  }
}

function getLocalFilesKeys()
{
  return getLocalItemsKeys(g_sLocalKey_Code);
}



function getLocalItemsKeys(sKey){
  //--그냥 함수없이 sort()를 때리면 4_file가 11_file보다 뒤로 오게 정렬되므로 둘다 숫자로 바꿔서 비교한다. 
  var funcSort = function(a, b) {
    // var arrA = a.split("_");
    // var arrB = a.split("_");
    return parseInt(a) - parseInt(b);
    // if( arrA.length > 0 )
    //   return res[0];
    
  }

  var arrText = getLocalItems(sKey);
  if( arrText != null ){
      var arrKeys = Object.keys(arrText).sort(funcSort); // objects to array
      return arrKeys;
  }

  return null;
}

function getLocalFile(nFileIndex){
  return getLocalItem(nFileIndex,g_sLocalKey_Code);
}

function getLocalItem(nFileIndex,sKey){
  var arrText = getLocalItems(sKey);

  if( arrText == null )
    return null;

  if( isUndefined(nFileIndex) ) // getLocalFile(); => last file
  {
    return arrText.lastValue;
  }

  if( isNumber(nFileIndex) ){ // getLocalFile(3);
    var arrKeys = getLocalItemsKeys(sKey);// getLocalFilesKeys();
    if( is(arrKeys) )
    {
      for( i = 0; i < arrKeys.length; i++ )
      {
        var sKeyFileName = arrKeys[i];
        var sFileIndex = getIndexFromFileName(sKeyFileName);
        //console.log( "nFileIndex: " + nFileIndex + " sFileIndex: " + sFileIndex );
        if( parseInt(nFileIndex,10) == parseInt(sFileIndex,10) )
        {
          if( g_nLogLevel > 1 )
            console.log("load sKey:" + sKey + " sKeyFileName:" + sKeyFileName + " arrText:" + arrText);
          return arrText[sKeyFileName];
        }
      }
    }
  }

  return null;
}

function getLocalKeyFileName(nFileIndex){

  if( isUndefined(nFileIndex) ) // getLocalFile(); => last file
  {
    return null;
    //return arrText.lastKey;
  }
  if( isNumber(nFileIndex) ){ // getLocalFile(3);
    var arrKeys = getLocalFilesKeys();
    for( index in arrKeys )
    {
      var sKeyFileName = arrKeys[index];
      var sKey = getIndexFromFileName(sKeyFileName);
      if( parseInt(nFileIndex) == parseInt(sKey) )
      {
        //console.log("getLocalKeyFileName: " + sKeyFileName);
        return sKeyFileName;
      }
    }
  }

  console.log("local Key file index: " + nFileIndex);
  console.log(getLocalFiles());
  alert("getLoccalKeyFileName Error");


  return null;
}

function createFileName(sName,sKey){
  if( isUndefined(sKey) )
  {
    sKey = getLocalFilesCount();
  }
  return sKey + "_" + sName;
}

function getIndexFromFileName(sFileName){
  if( is(sFileName) )
  {
    var res = sFileName.split("_");
    if( res.length > 0 )
      return res[0];
  }

  return null;
}

function getNameFromFileName(sFileName){
  if( is(sFileName) )
  {
    var res = sFileName.split("_");
    if( res.length > 1 )
      return res[1];
  }

  return null;
}

// function saveLocalFile(sCode,sDescription,sDate,sFileName){
//   return saveLocalFile_(sCode,sDescription,sDate,sFileName,g_nCurrentLocalFileIndex);
// }

function saveLocalFile(nFinderIndex,sCode,sDescription,sDate){
  var nFileIndex = getLocalFileIndexFromFinderIndex(nFinderIndex);
  var sKeyFileName = getLocalKeyFileName(nFileIndex);
  if( is(sKeyFileName) )
  {
    // setLocalItem(sKeyFileName,sDescription,g_sLocalKey_Description);
    // setLocalItem(sKeyFileName,sDate,g_sLocalKey_ModifiedDate);
    return setLocalItem(sKeyFileName,sCode,g_sLocalKey_Code);
  }
  
  return false;
}

function deleteLocalFile(nFinderIndex){
  //console.log(nFinderIndex);
  var nFileIndex = getLocalFileIndexFromFinderIndex(nFinderIndex);
  var sKeyFileName = getLocalKeyFileName(nFileIndex);

  if( is(sKeyFileName) )
  {
    deleteLocalItem(sKeyFileName,g_sLocalKey_Description);
    deleteLocalItem(sKeyFileName,g_sLocalKey_ModifiedDate);
    deleteLocalItem(sKeyFileName,g_sLocalKey_Code);
    // console.log(getLocalItems(g_sLocalKey_Code));
    // console.log(getLocalItems(g_sLocalKey_ModifiedDate));
    // console.log(getLocalItems(g_sLocalKey_Description));
  }
}

function setLocalItem(sKeyFileName,sValue,sKey){
  var arrText = getLocalItems(sKey);
  //g_nLastLocalKey = getLocalFilesCount();
  if( arrText == null ){
    arrText = {};
  }
  //var sKeyFileName = createFileName(sKeyFileName,g_nLastLocalKey);
  arrText[sKeyFileName] = sValue; // update or new 
  if( g_nLogLevel > 1 )
  {
    console.log("save sKey: " + sKey + " sKeyFileName: " + sKeyFileName + " sValue: " + sValue);
    console.log(arrText);
  }
  
  return setLocalItems(arrText,sKey);
}

function deleteLocalItem(sKeyFileName,sKey){
  var arrText = getLocalItems(sKey);
  //g_nLastLocalKey = getLocalFilesCount();
  if( arrText == null ){
    arrText = {};
  }
  //var sKeyFileName = createFileName(sKeyFileName,g_nLastLocalKey);
  //console.log("saveLocalFile: " + sKeyFileName);
  delete arrText[sKeyFileName];
  return setLocalItems(arrText,sKey);
}

function saveLocalFiles(array){
  return setLocalItems(array,g_sLocalKey_Code);
}

function setLocalItems(array,sKey){
  if (typeof(Storage) !== "undefined") { // check brower support
    localStorage.setItem( sKey, JSON.stringify(array) );
    return true;
  }

  return false;
}

function clearLocalStrage(){
  localStorage.clear();   
}


//------------------------------------------------------------------------------- methods
function getHTTPFile(url, funcSuccess, funcError) {
  if (!window.XMLHttpRequest) return;
  var request = new XMLHttpRequest();
  request.onreadystatechange = function () {
      if (request.readyState === 4) {
          if (request.status !== 200) {
              if (funcError && typeof funcError === 'function') {
                funcError(request.responseText, request);
              }
              return;
          }

          //---------- 결과 (request.responseText)를 funcSuccess함수에 호출한다.
          if (funcSuccess && typeof funcSuccess === 'function') {
            funcSuccess(request.responseText, request);
          }
      }
  };
  //------ 해당 url에 request를 보낸다.
  request.open('GET', url);
  request.send();
};

function bindConsole(func) {

  this.debug = {}

  if(is(func)) {
    for (var m in console)
    {
      //if (typeof console[m] == 'function')
      if( isFunction(console[m]) )
        this.debug[m] = func;
    }
  }else{
    for (var m in console)
    {
      //console.log("bindConsole");
      /* bind함수는 this, parameter를 묶는다. bind(a,b,c,d)하면 a는 클래스, b, c, d는 인자값순서대로이다. */
      //if (typeof console[m] == 'function')
      /*
       bind는 한번 묶이면 웹페이지가 리프래쉬 되지 않는 이상 풀리지 않는다.
       계속 메모리에 묶여있다가 이 함수가 또 호출되면 또 묶인다.
       다시 말해서 console.log
       debug["log"] = function(bind1){
         console["log"];
       }

       debug["log"] = function(bind1){
         console["log"];
       }
       */
      if( isFunction(console[m]) )
        this.debug[m] = console[m].bind(window.console,"custom: ");
    }
  }
  return this.debug
}

//var console = bindConsole();

function clamp(min,current,max)
{
  return Math.min(Math.max(current, min), max);
}

function getTransitionCss(sName)
{
  return {
    "-webkit-transition":sName,
    "-moz-transition":sName,
    "-ms-transition":sName,
    "-o-transition":sName,
    "transition":sName,
  };
}

function getTransitionDurationCss(fSeconds)
{
  return {
    "-webkit-transition-duration":fSeconds + "s", /* Safari */
    "transition-duration":fSeconds + "s",
  };
}

// function changeKey(array,old_key,new_key){
//   if( is(array) )
//   {
//     if (old_key !== new_key) {
//       Object.defineProperty( array, new_key, Object.getOwnPropertyDescriptor(array, old_key) );
//       delete array[old_key];
//     }
//   }
// }

// function getWindowWidth() {
//   if( is( document.body ) )
//   {
//     return Math.max(
//       document.body.scrollWidth,
//       document.documentElement.scrollWidth,
//       document.body.offsetWidth,
//       document.documentElement.offsetWidth,
//       document.documentElement.clientWidth
//     );
//   }else{
//     return window.innerWidth
//   }
// }

// function getWindowHeight() {
//   if( is( document.body ) )
//   {
//     return Math.max(
//       document.body.scrollHeight,
//       document.documentElement.scrollHeight,
//       document.body.offsetHeight,
//       document.documentElement.offsetHeight,
//       document.documentElement.clientHeight
//     );
//   }else{
//     return window.innerWidth
//   }
// }

function getDocumentHeight(){
  var body = document.body;
  var html = document.documentElement;
  if( is(body) && is(html) )
    return Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );

  return 768;
}

function getDocumentWidth(){ // 컨텐츠가 커서 스크롤이 생긴경우 전체 문서 크기를 잡아서 리턴한다.
  var body = document.body;
  var html = document.documentElement;
  if( is(body) && is(html) ){
     var fReturn = Math.max( body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth );
     if( fReturn > 0 )
      return fReturn;
  }
  
  return screen.width;
}

var g_bStopWaiting = false;
function setTimeout_recursiveUntilG_bStopWaiting(func,bFirst){
  if( isUndefined(bFirst) )
    bFirst = true;

  if( bFirst )
  {
    g_bStopWaiting = false;
  }
  
  setTimeout( function(){

    if( g_bStopWaiting )
    {
      func();
    }
    else
    {
      setTimeout_recursiveUntilG_bStopWaiting(func,false);
    } 

    console.log("setTimeout_recursiveUntilReturnTrue result: " + bResult);
  } , 100 );  
}

function findElementOrigin(element) {
  var top = 0, left = 0;
    do {
        top += element.offsetTop  || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent;
    } while(element);

  return [left,top];
	// var curleft = curtop = 0;
	// if (obj.offsetParent) {
  //   do {
  //       curleft += obj.offsetLeft;
  //       curtop += obj.offsetTop;
        
  //     } while (obj = obj.offsetParent);
  //   return [curleft,curtop];
  // }
}



function startClockFunction(func,second){
  window.setInterval(function(){
    if( is(func) )
      func();
  }, second*1000 );
}

function stopClockFunction(){
  clearInterval();
}

function setDownloadURL( aTagElement, text, fileName) {
  //var a = document.createElement("a");
  var URL = window.URL || window.webkitURL;
  var createObjectURL = URL.createObjectURL || webkitURL.createObjectURL;
  var file = new Blob([text], {type:'text/plain'});
  //var file = NewBlob([text], 'text/plain');
  //aTagElement.href = URL.createObjectURL(file);
  aTagElement.href = createObjectURL(file);
  aTagElement.download = fileName;
  aTagElement.click();
}

function concat(obj1,obj2,obj3) { // concat
  if(typeof obj3 !== "undefined") { /* el(a) 식으로 호출하면 undefined type인 파라미터가 들어온다. */
    if( obj3 != null ){
      return Object.assign(obj1,obj2,obj3);
    }
  }
  return Object.assign(obj1,obj2);
}

function getSubSize( MainSize, n ){
  /* Main을 n등분하여 sub들을 만들때 넘치기 않게  => style.width="100.5px" 식으로 값이 대입되면 101px 값이 들어간다. => 반올림 되는듯*/
  if( MainSize > 0 ){
      var subSize =  MainSize/n;
      return Math.floor(subSize);
    // if( subSize*n > MainSize ) //웹은 마우스좌표나 width(), height()가 전부 pixel크기이므로 1px은 나눌수 없다.=> 넘치면 1빼준다.
    //   return Math.floor(subSize - 1); 
    // else
    //   return Math.floor(subSize);
  }

  return 0;
}

//---------------------------------------------------------- dragging & drag event
var g_bDragging = false;  // 창이 드래그 중일때 iframe영역으로 가면 iframe이 드래그 이벤트를 먹어서 제대로 동작하지 않는다. iframe이벤트 중지를 위한 변수
function dragging(bDragging){

  if( is(bDragging) ){
    g_bDragging = bDragging;
    return;
  }

  return g_bDragging
}


function addMouseMoveEvent(element,func) { // func(x,y)
  element.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
    dragging(true);
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    func(e.clientX,e.clientY);
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    dragging(false);
  }
}

function addMouseEvent(element,func_down,func_move,func_up) { // func(x,y)

  element.onmousedown = function(e) 
  {
    document.onmouseup = function(){
      document.onmouseup = null;
      document.onmousemove = null;
      dragging(false);
      if( is(func_up) )
        func_up();
    };

    document.onmousemove = function(e) {
      e = e || window.event;
      e.preventDefault();
      if( is(func_move) )
      {
        // if( is(e.target) )
        // {
        //   var rect = e.target.getBoundingClientRect();
        //   console.log("rect.top" + rect.top);
        //   console.log("y: " + (e.clientY - rect.top) );
        //   func_move( e.clientX - rect.left, e.clientY - rect.top );
        // }
        // else
        // {
          func_move( e.clientX, e.clientY );
        // }
      }
    };
    
    dragging(true);
    e = e || window.event;
    e.preventDefault();
    if( is(func_down) )
      func_down(e.clientX,e.clientY);
  };

  element.ontouchstart = function(e) 
  {
    document.ontouchend = function(){
      document.ontouchend = null;
      document.ontouchmove = null;
      dragging(false);
      if( is(func_up) )
        func_up();
    };

    document.ontouchmove = function(e) {
      e = e || window.event;
      e.preventDefault();
      if( is(func_move) )
        func_move(e.touches[0].clientX,e.touches[0].clientY);
    };
    
    dragging(true);
    e = e || window.event;
    e.preventDefault();
    if( is(func_down) )
      func_down(e.touches[0].clientX,e.touches[0].clientY);
  };
}


function makeDraggable(target,targetHeader,rtLimitPadding,func_down,func_move,func_up) {

  var eventElement = null;
  var prevX = 0, prevY = 0; /* 헤더에 클릭한 지점을 중심으로 움직여야 하므로 마우스의 이동 크기만큼 창을 움직인다. */
  var nLimit = 0;
  var rtLimit;
  var parentEl = target.parentElement;
  if( parentEl ){
    if( is(rtLimitPadding) )
      rtLimit = rt( parentEl.offsetLeft + rtLimitPadding.x, parentEl.offsetTop + rtLimitPadding.y, parentEl.clientWidth - rtLimitPadding.width - target.clientWidth, parentEl.clientHeight - rtLimitPadding.height - target.clientHeight );
    else
      rtLimit = rt( parentEl.offsetLeft + nLimit, parentEl.offsetTop + nLimit, parentEl.clientWidth - nLimit - target.clientWidth, parentEl.clientHeight - nLimit - target.clientHeight );
  }
  
  var nTempTop;
  var nTempLeft;
  if( is(targetHeader) ) 
    eventElement = targetHeader;
  else
    eventElement = target;

  addMouseEvent(eventElement,function(x,y){
    prevX = x;
    prevY = y;
    
    if( is(func_down) )
      func_down(x,y);

    if( is(parentEl) == false )
      parentEl = target.parentElement;

    if( is(parentEl) )
    {
      if( is(rtLimitPadding) )
        rtLimit = rt( parentEl.offsetLeft + rtLimitPadding.x, parentEl.offsetTop + rtLimitPadding.y, parentEl.clientWidth - rtLimitPadding.width - target.clientWidth, parentEl.clientHeight - rtLimitPadding.height - target.clientHeight );
      else
        rtLimit = rt( parentEl.offsetLeft + nLimit, parentEl.offsetTop + nLimit, parentEl.clientWidth - nLimit - target.clientWidth, parentEl.clientHeight - nLimit - target.clientHeight );
    }

  },function(x,y){

    nTempTop = target.offsetTop - (prevY - y);
    nTempLeft = target.offsetLeft - (prevX - x);
    prevX = x;
    prevY = y;

    if( is(func_move) )
      func_move(x,y);

    if( is(parentEl) )
    {
      if( nTempTop < rtLimit.y )
        nTempTop = rtLimit.y;

      if( nTempTop > rtLimit.height )
        nTempTop = rtLimit.height;

      if( nTempLeft < rtLimit.x )
        nTempLeft = rtLimit.x;

      if( nTempLeft > rtLimit.width )
        nTempLeft = rtLimit.width;
    }
    //if( nTempTop >= rtLimit.y && nTempTop <= rtLimit.height )
      target.style.top = nTempTop + "px";
    //if( nTempLeft >= rtLimit.x && nTempLeft <= rtLimit.width )
      target.style.left = nTempLeft + "px";

    
  },function(){

    if( is(func_up) )
      func_up();

  });
}


//------------------------------------------------------------------------------------------Tap Event
/*
pc에서는 아무거나 클릭해도 onclick이 호출되지만 모바일은 버튼등을 클릭해야만 onclick이 호출된다. 따라서 pc와 mobile의 모든 지역에서
클릭시 한번만 호출될 수 있는 tapped()함수를 넣기 위해 아래 구문을 넣는다.
*/

g_arrTappedFunctions = [];
function runTapFunctions(e){
  for( i = 0; i < g_arrTappedFunctions.length; i++ ){
    g_arrTappedFunctions[i](e);
  }
};

function addTapEvent(func){
  g_arrTappedFunctions.push(func);
}

var tapFunctionCalled = false; // 중복 호출을 피하고자 쓴다. 
var touchMoved = false;
var touchBegan = false;
//var log = " ";
window.ontouchstart = function(e) {
  touchBegan = true;
  touchMoved = false;
  tapFunctionCalled = false;
}
window.ontouchmove = function(e) {
  touchMoved = true;
}
window.ontouchend = function(e) {
  touchBegan = false;
  if( touchMoved == false && tapFunctionCalled == false ){
    tapFunctionCalled = true;
    runTapFunctions(e);
  }
}
window.onclick = function(e) {
  if( touchBegan ){
    if( tapFunctionCalled = false ){
      tapFunctionCalled = true;
      runTapFunctions(e);
    }
  }else{
    runTapFunctions(e);
  }
}   


//-------------------------------------------------------------------- html code string

function getDateString()
{
    var pDate = new Date();
    var mm = pDate.getMonth() + 1; // getMonth() is zero-based
    var dd = pDate.getDate();
    var hh = pDate.getHours();
    var mi = pDate.getMinutes();
    var sDate = [pDate.getFullYear(), "-" + (mm>9 ? '' : '0') + mm,(dd>9 ? '' : '0') + dd, ", " + (hh>9 ? '' : '0') + hh + "h",(mi>9 ? '' : '0') + mi].join('');
    return sDate;
}

function getTagName(markup){
  
  return markup.match(/<([^\s>]+)(\s|>)+/)[1];
  //return markup.match(/<(\w+)\s+\w+.*?>/g);
}

function getTagContent(markup){
  
  var tag = getTagName(markup);
  return markup.match( "<" + tag + "[^>]*>([^<]+)<\/" + tag + ">")[1];
  //var title = result.match( /<title[^>]*>([^<]+)<\/title>/)[1];
  //return markup.match(/<(\w+)\s+\w+.*?>/g);
}



function tagString(tag,attr,html){
  var str = "<" + tag;
  if( is(attr) ){
      for( key in attr ){
        str += " " + key + "='" + attr[key] + "'";
      }
  }

  if( is(html) )
    return str + ">" + html + "</" + tag + ">";
  else 
    return str + ">" + "</" + tag + ">";
}

function makeHtmlHead(){
  //var tag_script_src = tagString("script",{"src":"/box_v1.js"});
  var tag_meta1 = tagString("meta",{"charset":"UTF-8"});
  var tag_meta2 = tagString("meta",{"name":"viewport","content":"width=device-width"});
  return tag_meta1 + "\n" + tag_meta2;  
  //return tag_meta1 + "\n" + tag_meta2 + "\n" + tag_script_src;  
}



function regexpExec(regex,text){
  var regex1 = new RegExp(regex);
  var array1 = regex1.exec(text);
  if( array1 )
    array1 = array1[1];

  return array1;
}

function hasDoctype(html){
  var regex1 = new RegExp(/[dD][oO][cC][tT][yY][pP][eE].*?>([\s\S]*)/);
  if( regex1.exec(html) != null )
    return true;
  return false;
}

function getHtmlScript(html){
  var text = ""; // <SCRIPT LANGUAGE="JavaScript">
  //var regex1 = new RegExp(/<[sS][cC][rR][iI][pP][tT].*?>([\s\S]*)<\/[sS][cC][rR][iI][pP][tT]>/,'g'); // 'g'를 옵션으로 안넣으면 무한 루프 돈다 => 처음부터 다시 찾음
  var regex1 = new RegExp(/<[sS][cC][rR][iI][pP][tT].*?>([\s\S]*)<\/[sS][cC][rR][iI][pP][tT]>/,'g'); // 'g'를 옵션으로 안넣으면 무한 루프 돈다 => 처음부터 다시 찾음
  var array1; 
  while ((array1 = regex1.exec(html)) !== null) { // exec()는 내부적으로 전역변수를 가지고 있어서 계속 호출하면 쭉 나아가면서 텍스트를 찾는다.
    text += array1[1];
    //console.log("this");
  }

  // var results = html.match(regex1);
  // console.log(results);

  return text;
}

// function divideHtml(html){
//   var doc = makeHtmlDocumnetFromText(html);
//   getTagInnerHTMLs("style");
//   // var parser = new DOMParser();
//   // var xmlDoc = parser.parseFromString(html,"text/xml");

//   // // var rawLiElements = parsedHtml.getElementsByTagName("div")[0].children;
//   // // var liElements = [];
//   // // for (var i = 0; i < rawLiElements.length; i++) {
//   // //   console.log(rawLiElements[i].innerHTML);
//   // // }

//   // var rawLiElements = xmlDoc.getElementsByTagName("p");
//   //  for (var i = 0; i < rawLiElements.length; i++) {
//   //    console.log(rawLiElements[i]);
//   //  }

//   //myFunction(html);

//   //alert(xmlDoc.getElementsByTagName("script")[0]);
//   //alert(xmlDoc.getElementsByTagName("p"));
//   //alert(xmlDoc.getElementsByTagName("p")[0].childNodes[0].nodeValue);
//   return html;
// }

// function getTagInnerHTMLsExceptSVG(tag,doc,bCheckDataAttr){
//   /*
//   bOnlyDataAttr
//   script와 style에 <script data-type = ""> < style data-type = "">
//   와 같이 data-type값이 있는 놈만 split or merge를 한다.
//   */

//   if( isUndefined(bCheckDataAttr) )
//     bCheckDataAttr = false;

//   var elements = doc.getElementsByTagName(tag);
//   var text = "";
//   for (var i = 0; i < elements.length; i++) {
//     if( isSVGStyleTag(elements[i]) == false ) {
//       if( bCheckDataAttr )
//       {
//         var sData = elements[i].getAttribute(g_sData_type);
//         if( is(sData) )
//         {
//           if( sData.length > 0 )
//             text += elements[i].innerHTML;
//         }
//       }
//       else
//       {
//         text += elements[i].innerHTML;
//       }
//     }
//   }

//   return text;
// }

function getTagInnerHTMLSum(tag,doc,bCheckDataAttr){
  /*
  bOnlyDataAttr
  script와 style에 <script data-type = ""> < style data-type = "">
  와 같이 data-type값이 있는 놈만 split or merge를 한다.
  */

  if( isUndefined(bCheckDataAttr) )
    bCheckDataAttr = false;

  var elements = doc.getElementsByTagName(tag);
  var sTextReturn = "";
  var i;
  for ( i = 0; i < elements.length; i++) {
    if( bCheckDataAttr )
    {
      var sData = elements[i].getAttribute(g_sData_type);
      if( is(sData) )
      {
        if( sData.length > 0 )
          sTextReturn += elements[i].innerHTML;
      }
    }
    else
    {
      sTextReturn += elements[i].innerHTML;
    }
  }

  return trimStartEndEnters(sTextReturn);
}

function getTagInnerHTMLs(tag,doc,bCheckDataAttr){
  /*
  bOnlyDataAttr
  script와 style에 <script data-type = ""> < style data-type = "">
  와 같이 data-type값이 있는 놈만 split or merge를 한다.
  */

  if( isUndefined(bCheckDataAttr) )
    bCheckDataAttr = false;

  var elements = doc.getElementsByTagName(tag);
  var dicReturn = {};
  var sTextReturn = "";
  var i;
  for ( i = 0; i < elements.length; i++) {
    if( bCheckDataAttr )
    {
      var sData = elements[i].getAttribute(g_sData_type);
      if( is(sData) )
      {
        if( sData.length > 0 )
          dicReturn[sData] = elements[i].innerHTML;
      }
    }
    else
    {
      sTextReturn += elements[i].innerHTML;
    }
  }

  if(bCheckDataAttr)
    return trimStartEndEnters(dicReturn);
  else
    return trimStartEndEnters(sTextReturn);
}

function makeHtmlDocumnetFromText(markup) {
  element = document.createElement( 'html' );
  element.innerHTML = markup;
  return element;
  /*
  그냥 
  var el = document.createElement( 'html' );
  el.innerHTML = "<html><head><title>titleTest</title></head><body><a href='test0'>test01</a><a href='test1'>test02</a><a href='test2'>test03</a></body></html>";
  el.getElementsByTagName( 'a' ); 
  위와 같은 식으로 하면 html이 생성되는데 문제는 <!doctype html>나 template테그 등이 붙을 경우등을 고려하여 아래와 같이 하는듯

  */
  // if (markup.toLowerCase().trim().indexOf('<!doctype') === 0) {
  //     var doc = document.implementation.createHTMLDocument("");
  //     doc.documentElement.innerHTML = markup;
  //     return doc;
  // } else if ('content' in document.createElement('template')) {
  //    // Template tag exists!
  //    var el = document.createElement('template');
  //    el.innerHTML = markup;
  //    return el.content;
  // } else {
  //    // Template tag doesn't exist!
  //    var docfrag = document.createDocumentFragment();
  //    var el = document.createElement('body');
  //    el.innerHTML = markup;
  //    for (i = 0; 0 < el.childNodes.length;) {
  //        docfrag.appendChild(el.childNodes[i]);
  //    }
  //    return docfrag;
  // }
}

function removeScriptString(html){
  var regex1 = new RegExp(/<[sS][cC][rR][iI][pP][tT].*?>([\s\S]*)<\/[sS][cC][rR][iI][pP][tT]>/);
  return html.replace(regex1,"");  
}

function removeStyleString(html){
  var regex1 = new RegExp(/<[sS][tT][yY][lL][eE].*?>([\s\S]*)<\/[sS][tT][yY][lL][eE]>/);
  return html.replace(regex1,"");  
}

// function removeTagsExceptSVG(tag,doc,bCheckDataAttr){
//   var elements = doc.getElementsByTagName(tag);
//   if( isUndefined(bCheckDataAttr) )
//     bCheckDataAttr = false;
//   for (var i = 0; i < elements.length; i++) {
//     //if( isSVGStyleTag(elements[i]) == false ) {
//       if( bCheckDataAttr )
//       {
//         var sData = elements[i].getAttribute(g_sData_type);
//         if( is(sData) )
//         {
//           if( sData.length > 0 )
//             elements[i].remove();
//         }
//       }
//       else
//       {
//         elements[i].remove();
//       }
//     //}
//   }
// }

function removeTags(tag,doc,bCheckDataAttr){
  var elements = doc.getElementsByTagName(tag);
  if( isUndefined(bCheckDataAttr) )
    bCheckDataAttr = false;
  var arrRemove = []; // element를 remove할경우 elements.length갑이 변한다. 포인팅되어있어서 그런듯 따라서 담았다가 remove한다.
  var i;
  for ( i = 0; i < elements.length; i++) {
    //if( isSVGStyleTag(elements[i]) == false ) {
      if( bCheckDataAttr )
      {
        var sData = elements[i].getAttribute(g_sData_type);
        if( is(sData) )
        {
          if( sData.length > 0 )
            arrRemove.push(elements[i]);
            // elements[i].remove();
        }
      }
      else
      {
        arrRemove.push(elements[i]);
        ///elements[i].remove();
      }
    //}
  }

  arrRemove.forEach(function(item,index){
    item.remove();
  });
}

function removeScriptTagsExceptExternals(doc,bCheckDataAttr){
  var elements = doc.getElementsByTagName("script");
  if( isUndefined(bCheckDataAttr) )
    bCheckDataAttr = false;
  var arrRemove = []; // element를 remove할경우 elements.length갑이 변한다. 포인팅되어있어서 그런듯 따라서 담았다가 remove한다.
  var i;
  for (i = 0; i < elements.length; i++) {
    //console.log( "length: " + elements.length + " i: " + i + " html:" + elements[i].innerHTML);
    if( elements[i].hasAttribute("src") == false )
    {
      if( bCheckDataAttr )
      {
        var sData = elements[i].getAttribute(g_sData_type);
        if( is(sData) )
        {
          if( sData.length > 0 )
            arrRemove.push(elements[i]);
            //elements[i].remove();
        }
      }
      else
      {
        arrRemove.push(elements[i]);
        //elements[i].remove();
      }
    }
  }

  arrRemove.forEach(function(item,index){
    item.remove();
  });

  //text = text.replace(/\n$/, "");
}

function removeScriptTag(url,doc){
  var elements = doc.getElementsByTagName("script");
  var i;
  for ( i = 0; i < elements.length; i++) { // remove 하면 elements.length가 변한다.
    if( elements[i].hasAttribute("src") ){
      if( elements[i].getAttribute("src") == url ){
        if( elements[i].parentElement )
          elements[i].parentElement.removeChild(elements[i]);
      }
    }
  }

  //text = text.replace(/\n$/, "");
}

function removeLinkTag(url,doc){
  var elements = doc.getElementsByTagName("link");
  var i;
  for ( i = 0; i < elements.length; i++) {  // remove 하면 elements.length가 변한다.
    if( elements[i].hasAttribute("rel") ){
      if( elements[i].getAttribute("rel").toUpperCase() == "STYLESHEET" ){
        if( elements[i].hasAttribute("href") ){
          if( elements[i].getAttribute("href") == url ){
            if( elements[i].parentElement )
              elements[i].parentElement.removeChild(elements[i]);
          }
        }
      }
    }
  }

  //text = text.replace(/\n$/, "");
}

function getUrlsOfScript(doc){
  var elements = doc.getElementsByTagName("script");
  var arrUrls = [];
  var i;
  for ( i = 0; i < elements.length; i++) {
    if( elements[i].hasAttribute("src") ){
      arrUrls.push(elements[i].getAttribute("src"));
    }
  }

  return arrUrls;
}

function getHrefOfLink(doc){
  var elements = doc.getElementsByTagName("link");
  var arrUrls = [];
  var i;
  for ( i = 0; i < elements.length; i++) {
    if( elements[i].hasAttribute("rel") ){
      if( elements[i].getAttribute("rel").toUpperCase() == "STYLESHEET" ){
        if( elements[i].hasAttribute("href") ){
          arrUrls.push(elements[i].getAttribute("href"));
        }
      }
    }
  }

  return arrUrls;
}


function get(doc){
  var elements = doc.getElementsByTagName("script");
  var arrUrls = [];
  var i;
  for ( i = 0; i < elements.length; i++) {
    if( elements[i].hasAttribute("src") ){
      arrUrls.push(elements[i].getAttribute("src"));
    }
  }

  return arrUrls;
}

function divideHtml_StringParse(html){

  /*
exec()은 어레이를 리턴하는데 3개의 값을 가진 어레이이다.
exec()는 0번인덱스의 매치된 모든 텍스트, 1번인덱스에 매치된 삽입 내용을 반환하는 함수이다. 
또한 lastindex 라는 key를 반환 하는데 매치된 내용의 마지막 케릭터의 인덱스값이 들어간다.
또한 exec()는 내부적으로 전역변수를 가지고 있어서 계속 호출하면 쭉 나아가면서 텍스트를 찾는다.
*/

  // allocation size overflow => 이 함수는 메모리를 많이 잡아먹어서 메모리 에러난다.
  // var arrayHtml = html.split("</head>");
  //var DOMPars = HTMLParser(html);

  /* 
  그냥 head라고 해도 되나 => [hH][eE][aA][dD] => 대소문자 모두포함
  /<head.*?>([\s\S]*)<\/head>/를 => /<[hH][eE][aA][dD].*?>([\s\S]*)<\/[hH][eE][aA][dD]>/ 로 바꿈
  */
  var html_script = "";
  var html_head = regexpExec(/<[hH][eE][aA][dD].*?>([\s\S]*)<\/[hH][eE][aA][dD]>/,html); 
  var html_style = regexpExec(/<[sS][tT][yY][lL][eE]>([\s\S]*)<\/[sS][tT][yY][lL][eE]>/,html_head);
  var html_preHead = null;
  if( html_head ){
    html_script += getHtmlScript(html_head);
    
    var regex1 = new RegExp(/<[sS][tT][yY][lL][eE].*?>([\s\S]*)<\/[sS][tT][yY][lL][eE]>/);
    html_preHead = html_head.replace(regex1,"");  
  }
  
  var html_body = regexpExec(/<[bB][oO][dD][yY].*?>([\s\S]*)<\/[bB][oO][dD][yY]>/,html);
  
  html_script += getHtmlScript(html_body);
  // var regex1 = new RegExp(/<[sS][cC][rR][iI][pP][tT].*?>([\s\S]*)<\/[sS][cC][rR][iI][pP][tT]>/,'g'); // 'g'를 옵션으로 안넣으면 무한 루프 돈다 => 처음부터 다시 찾음
  // var array1; 
  // while ((array1 = regex1.exec(html_body)) !== null) { // exec()는 내부적으로 전역변수를 가지고 있어서 계속 호출하면 쭉 나아가면서 텍스트를 찾는다.
  //   html_script += array1[1];
  //   //console.log("this");
  // }

  //console.log({"html":html_body,"css":html_style,"js":html_script,"head":html_preHead});
  return {"html":html_body,"css":html_style,"js":html_script,"head":html_preHead};  
}



//------------------------------------------------------------------------------ check type
function is(object){
  if(typeof object !== "undefined") {
    if( object != null )
      return true;
  }

  return false;
}

function isString(value) {
  if( is(value) == false )
    return false;

  return typeof value == "string" || (typeof value == "object" && value.constructor === String);
  //return typeof value === 'string' || value instanceof String;
}


function isEl(value) {
  // if( is(value) == false )
  //   return false;

  return value instanceof el;
  //return typeof value === 'string' || value instanceof String;
}


function isFunction(obj) {
  return !!(obj && obj.constructor && obj.call && obj.apply);
};

function isObject(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
    //return value && typeof value === 'object' && value.constructor === Object;
    
}

function isElement(element) {
  return element instanceof Element || element instanceof HTMLDocument;  
  //return element instanceof Element || element instanceof HTMLDocument || element instanceof SVGElement;  
}

function isSVGStyleTag(element) {
  return element instanceof SVGElement || element instanceof SVGStyleElement;  
  //return element instanceof Element || element instanceof HTMLDocument || element instanceof SVGElement;  
}

// //Returns true if it is a DOM node
// function isNode(o){
//   return (
//     typeof Node === "object" ? o instanceof Node : 
//     o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName==="string"
//   );
// }

// //Returns true if it is a DOM element    
// function isElement(o){
//   return (
//     typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
//     o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
//   );
// }

function isNumber(value) {
  /*
  isNaN은 true, false인 boolean값과 문자열 ""과 "123"식의값은 숫자로 본다.
  인자값으로 숫자를 넘겨서 해당 인자값을 또다른 함수로 넘기면 3 => "3"식으로 형변환 되는 경우가 있는뜻 하다.
  */
 if( is(value) == false )
  return false;
 
  return !isNaN(value);
  //return typeof value === 'number' && isFinite(value);
 //return typeof value === "number" && isNaN(value);
}

function isArray (value) {
  if( is(value) == false )
    return false;

  return value && typeof value === 'object' && value.constructor === Array;
}

function isFunction (value) {
  return typeof value === 'function';
}

function isBoolean (value) {
  return typeof value === 'boolean';
}

function isUndefined (value) {
  return typeof value === 'undefined';
}

function isDefined (value) {
  return !isUndefined(value);
}

function isDate (value) {
  return value instanceof Date;
}



function isPercent(text){ // 해당 케릭터가 문자열의 처음과 끝에 있다면 없앤다
  if( isString(text) ){
    var str = text.trim();
    if( str.length > 1 ){ // 1%
      if( str.charAt(str.length - 1) == "%" )
      return true;
    }
  }
  
  return false;
}

function isPx(text){ // 해당 케릭터가 문자열의 처음과 끝에 있다면 없앤다
  if( isString(text) ){
    var str = text.trim();
    if( str.length > 2 ){ // 1px
      if( str.charAt(str.length - 2) == "p" && str.charAt(str.length - 1) == "x" )
      return true;
    }
  }
  
  return false;
}

function isIdString(text){ // 해당 케릭터가 문자열의 처음과 끝에 있다면 없앤다
  if( isString(text) ){
    var str = text.trim();
    if( str.length > 1 ){ // #id
      if( str.charAt(0) == "#" )
        return true;
    }
  }
  
  return false;
}


function isClassString(text){ // 해당 케릭터가 문자열의 처음과 끝에 있다면 없앤다
  if( isString(text) ){
    var str = text.trim();
    if( str.length > 1 ){ // .c
      if( str.charAt(0) == "." )
        return true;
    }
  }
  
  return null;
}

function percent(text){ // 해당 케릭터가 문자열의 처음과 끝에 있다면 없앤다

  if( isString(text) ){
    var str = text.trim();
    if( str.charAt(str.length - 1) == "%" )
      return parseInt(str);
  }
  
  return null;
}

function logObject(object){
  for( key in object )
  {
    if( isString(object[key]) || isNumber(object[key]) )
      console.log("key: " + key + " value: " + object[key] );
    else if( isEl(object[key]) )
      console.log("key: " + key + " value: " + object[key].html() );
    else
      console.log("key: " + key + " value: " + object[key] );
  }
}


function has(objects,key){
  // if( isArray(objects) )
  //   return objects.includes(key);
  // else
    return key in objects;
}

function remove(arrOrObjects, indexOrValue) { 
  if( isArray(arrOrObjects) )
  {
    var index;
    if( isNumber(indexOrValue) )
      index = indexOrValue;
    else
      index = arrOrObjects.indexOf(indexOrValue);
  
    //console.log("index: " + index + " indexOrValue: " + indexOrValue );
    if (index > -1) {
      arrOrObjects.splice(index, 1);
    }
  }
  else
  {
    delete arrOrObjects[indexOrValue];
  }

  return arrOrObjects;
}

function hasValue(objects,value){
  for( key in objects )
  {
    if( objects[key] == value )
      return key;
  }
  return null;
}

function lastKey(objects){
  var array = Object.keys(objects);
  if( array.length > 0 )
    return array[array.length-1];
  else
    return null;
}

function lastValue(objects){
  var key = lastKey(objects);
  if( is(key) )
    return objects[key];
}

function firstKey(objects){
  var array = Object.keys(objects);
  if( array.length > 0 )
    return array[0];
  else
    return null;
}

function firstValue(objects){
  var key = firstKey(objects);
  if( is(key) )
    return objects[key];
}

function last(a,b){
  if( is(b) )
    return b;
  
  return a;
}

function length(objects){
  return Object.keys(objects).length;
}

//------------------------------------------------------------------------------ string
function isKorean(str){
  //str = "test한글";
  check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
  if(check.test(str)) 
    return true;

  return false;
}

function getFileExtention(url){
  if( isString(url) )
    return url.split('.').pop();

  return null;
}

function removeFirstLastEnter(text){ // 해당 케릭터가 문자열의 처음과 끝에 있다면 없앤다
  if( is(text) ){
    text = text.replace(/^\n/, "");
    return text.replace(/\n$/, "");
  }
}

function trimStartEndEnters(text){ // 해당 케릭터가 문자열의 처음과 끝에 있다면 없앤다
  if( is(text) ){

    if( isString(text) )
    {
      return text.replace(/^\n+|\n+$/g, '');
    }
    else
    {
      for( key in text )
        text[key] = text[key].replace(/^\n+|\n+$/g, '');
      return text;
    }
    //text = text.replace(/[\n]+$/, "");

    //someText = someText.replace(/(\r\n|\n|\r)/gm,""); // g => greedy m => many lines

    // text = text.replace(/\n$/, "");
    // return text.replace(/\n$/, "");

    
  }
}

// function removeAllLastEnters(text){ // 해당 케릭터가 문자열의 처음과 끝에 있다면 없앤다
//   if( is(text) ){
//     text = text.replace(/^\n/, "");
//     text = text.replace(/\n$/, "");
//   }
// }
  

function removeFirstLastCharacter(text,character){ // 해당 케릭터가 문자열의 처음과 끝에 있다면 없앤다


  if( is(text) ){
    if( text.length > 0 ){
      //console.log("\nfirst: ",text);
      if( text.charAt(text.length - 1) == character )
        text = text.substring(0, text.length-1);
      
      //console.log("\nsecond: ",text);
      if( text.length > 1){
        if( text.charAt(0) == character ){
          text = text.substring(1, text.length);
        }else if( text.length == 1){
          if( text.charAt(0) == character )
            text = "";
        }
      }
      //console.log("\nthird: ",text);

      return text;
    }  
  }
}

//------------------------------------------------------------------------------ url parameters
function getScriptParams(script_name) {
  // Find all script tags
  var scripts = document.getElementsByTagName("script");
  // Look through them trying to find ourselves

  for(var i=0; i<scripts.length; i++) {
    if(scripts[i].src.indexOf("/" + script_name) > -1) {
      // Get an array of key=value strings of params

      var pa = scripts[i].src.split("?").pop().split("&");

      // Split each key=value into array, the construct js object

      var p = {};
      for(var j=0; j<pa.length; j++) {
        var kv = pa[j].split("=");
        p[kv[0]] = kv[1];
      }
      return p;
    }
  }
  
  // No scripts match

  return {};
}

function findGetParameter(parameterName) {
  var result = null,
      tmp = [];
  var items = window.location.search.substr(1).split("&");
  for (var index = 0; index < items.length; index++) {
      tmp = items[index].split("=");
      if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
  }
  return result;
}

function getNavigatorLanguage () {
//   ["af", "sq", "ar-SA", "ar-IQ", "ar-EG", "ar-LY", "ar-DZ", "ar-MA", "ar-TN", "ar-OM",
//  "ar-YE", "ar-SY", "ar-JO", "ar-LB", "ar-KW", "ar-AE", "ar-BH", "ar-QA", "eu", "bg",
//  "be", "ca", "zh-TW", "zh-CN", "zh-HK", "zh-SG", "hr", "cs", "da", "nl", "nl-BE", "en",
//  "en-US", "en-EG", "en-AU", "en-GB", "en-CA", "en-NZ", "en-IE", "en-ZA", "en-JM",
//  "en-BZ", "en-TT", "et", "fo", "fa", "fi", "fr", "fr-BE", "fr-CA", "fr-CH", "fr-LU",
//  "gd", "gd-IE", "de", "de-CH", "de-AT", "de-LU", "de-LI", "el", "he", "hi", "hu", 
//  "is", "id", "it", "it-CH", "ja", "ko", "lv", "lt", "mk", "mt", "no", "pl",
//  "pt-BR", "pt", "rm", "ro", "ro-MO", "ru", "ru-MI", "sz", "sr", "sk", "sl", "sb",
//  "es", "es-AR", "es-GT", "es-CR", "es-PA", "es-DO", "es-MX", "es-VE", "es-CO", 
//  "es-PE", "es-EC", "es-CL", "es-UY", "es-PY", "es-BO", "es-SV", "es-HN", "es-NI", 
//  "es-PR", "sx", "sv", "sv-FI", "th", "ts", "tn", "tr", "uk", "ur", "ve", "vi", "xh",
//  "ji", "zu"];
  var sReturn;
  if (navigator.languages && navigator.languages.length) {
    sReturn = navigator.languages[0];
  } else {
    sReturn = navigator.userLanguage || navigator.language || navigator.browserLanguage || 'en';
  }

  if( sReturn == "ko")
    return "kr";

  return "en";
}

function fxGetLanguage(){
  var arrLanguages = ["en","kr"];
  var sLanguage;

  //---------------------- 한글로된 페이지를 요청했다면 한글이다. ( html이란-무엇인가.html )
  var sPath = window.location.pathname;
  var sPageName = sPath.substring(sPath.lastIndexOf('/'));
  if( isKorean(decodeURIComponent(sPageName)) ) // decodeURIComponent는 url의 한글 인코딩을 디코딩해준다. (외계문자 => 한글)
    return "kr";

  //---------------------- url 파라미터로 "l"값이 넘어왔다면 해당 언어로 리턴한다.
  var param_sLanguage = findGetParameter("l");
  if( is(param_sLanguage) ){
    arrLanguages.forEach(function(item,index){
      if( item == param_sLanguage )
        sLanguage = param_sLanguage;
    });

    if( is(sLanguage) )
      return sLanguage;
  }

  //------------------------------------ LocalStorage에 저장되어 있으면 저장된 값을 리턴한다.
  if (typeof(Storage) !== "undefined") { // check brower support
    var sLocal = localStorage.getItem(g_sLocalKey_Language);
    if( is(sLocal) )
    {
      arrLanguages.forEach(function(item,index){
        if( item == sLocal )
          sLanguage = sLocal;
      });
    }

    if( is(sLanguage) )
      return sLanguage;
  }

  //--------------------- 저장안되어 있다면 co.kr로 접속했으면 kr을 리턴
  var sURL = window.location.hostname;
  var arrURLNames = sURL.split(".");
  if( arrURLNames[arrURLNames.length-1] == "kr" ){
    if( arrURLNames[arrURLNames.length-2] == "co" ){
      return "kr"
    }
  }
  // else if( arrURLNames[arrURLNames.length-1] == "com" ){
  //   sLang = "en"
  // }

  //--------------- 저장안되어 있고 com 접속이라면 브라우저의 언어를 리턴한다.
  var sNavigatorLang = getNavigatorLanguage();
  arrLanguages.forEach(function(item,index){
    if( item == sNavigatorLang )
      sLanguage = sNavigatorLang;
  });

  if( is(sLanguage) )
    return sLanguage;

  return "en";
}

function changeGetParameter(name,value) {
  /* url이 refresh 되면서 화면이 다시 로딩됨을 유념하자. */
  var query_string = window.location.search.substr(1);  
  if( isString(query_string) ){
    var search_params = new URLSearchParams(query_string); 
    search_params.set(name,value);
    window.location.search = search_params.toString();
  }
}

function changeGetParameters(arrValues) {
  /* url이 refresh 되면서 화면이 다시 로딩됨을 유념하자. */
  var query_string = window.location.search.substr(1);  
  if( isString(query_string) ){
    var search_params = new URLSearchParams(query_string); 
    for( key in arrValues ){
      search_params.set(key,arrValues[key]);
    }
    window.location.search = search_params.toString();
  }
}

function addGetParameter(name,value) {
  var query_string = window.location.search.substr(1);  
  if( isString(query_string) ){
    var search_params = new URLSearchParams(query_string); 
    search_params.append(name,value);
    window.location.search = search_params.toString();
  }
}

function deleteGetParameter(name) {
  var query_string = window.location.search.substr(1);  
  if( isString(query_string) ){
    var search_params = new URLSearchParams(query_string); 
    search_params.delete(name);
    var new_params = search_params.toString();
    if( isString(new_params) ){
      if( new_params.length > 0 )
        window.location.search = new_params;
    }
  }
}

//------------------------------------------------------------------------------ image

function downscalImage(func,imageFile,width,height) {
  //const fileName = e.target.files[0].name;
  const fileName = imageFile.name;
  const reader = new FileReader();
  //reader.readAsDataURL(e.target.files[0]);
  reader.readAsDataURL(imageFile);
  reader.onload = function(event){
      const img = new Image();
      img.src = event.target.result;
      img.onload = function() {
        const element = document.createElement('canvas');
        element.width = width; // img.width, img.height
        element.height = height;
        const ctx = element.getContext('2d');
        var ratio = height/width;
        /*
       drawImage(img, 90, 130, 50, 60, 10, 10, 50, 60);
       drawImage의 처음 4개의 인자값은 이미지에서 clipping 영역이고 다음 4개의 인자값은 그려질 canvas에서의 영역이다.
       인자값을 8개 쓰지 않고 4개만 쓰는 경우 그냥 그려질 canvas에서의 영역으로 인식함 
        */
       if( img.width > img.height ){
        var clippingWidth = img.height*ratio;
        if( clippingWidth > img.width )
          clippingWidth = img.width;
        ctx.drawImage(img, 0, 0, clippingWidth, img.height, 0, 0, width, height);
       }else{
        var clippingHeight = img.width*ratio;
        if( clippingHeight > img.height )
          clippingHeight = img.height;
        ctx.drawImage(img, 0, 0, img.width, clippingHeight, 0, 0, width, height);
       }
        
        

        if( !HTMLCanvasElement.prototype.toBlob ) { // brower가 toBlob() 함수를 지원하지 않는다면 => toBlob()함수를 정의한다.
          Object.defineProperty( HTMLCanvasElement.prototype, 'toBlob', {
            value: function (callback, type, quality) {
              var dataURL = this.toDataURL(type, quality).split(',')[1];
              setTimeout(function() {
                var binStr = atob( dataURL ),
                    len = binStr.length,
                    arr = new Uint8Array(len);
                for (var i = 0; i < len; i++ ) {
                  arr[i] = binStr.charCodeAt(i);
                }
                callback( new Blob( [arr], {type: type || 'image/png'} ) );
              });
            }
          });
        }

        ctx.canvas.toBlob(function (blob) { 
          func( new File( [blob], fileName, { type: 'image/jpeg', lastModified: Date.now() }) ); 
        }, 'image/jpeg', 1);

    };
    
    reader.onerror = function(error){ console.log(error); };
  };
}

//------------------------------------------------------------------------------ json

function fxLoadJSON(url, callback) {
  var xobj;// = new XMLHttpRequest();
  if (window.XMLHttpRequest) {
    xobj = new XMLHttpRequest();
  }else if (window.ActiveXObject) {
    xobj = new ActiveXObject("Microsoft.XMLHTTP");
  }else{
    xobj = new XMLHttpRequest();
  }
  xobj.overrideMimeType('application/json');
  xobj.open('GET', url, true);
  xobj.onreadystatechange = function() {
      if (xobj.readyState == 4 && xobj.status == '200') {
          callback(xobj.responseText);
      }else
      {
        callback('{"sorry, can not find data":[{"refresh this page please":".."}]}');
      }
  };
  xobj.send(null);
}

// function fxLoadHTML(url, callback) {
//   var xobj;// = new XMLHttpRequest();
//   if (window.XMLHttpRequest) {
//     xobj = new XMLHttpRequest();
//   }else if (window.ActiveXObject) {
//     xobj = new ActiveXObject("Microsoft.XMLHTTP");
//   }else{
//     xobj = new XMLHttpRequest();
//   }

//   xobj.overrideMimeType('application/json');
//   xobj.open('GET', url, true);
//   xobj.onreadystatechange = function() {
//       if (xobj.readyState == 4 && xobj.status == '200') {
//           callback(xobj.responseText);
//       }else
//       {
//         callback('{"sorry, can not find data":[{"refresh this page please":".."}]}');
//       }
//   };
//   xobj.send(null);
// }

function fxLoadScript(sPath){
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = sPath;
  document.body.appendChild(script);
}

// loadJSON("../example_folder/abc.json", function(res){
//   data_parsed = JSON.parse(res);
//   data_stringified = JSON.stringify(data_parsed, null, 4);
//   abc = data_stringified;
//   });



