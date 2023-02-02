//-------------------------------------------------------------------------- button
// var g_bTextButtonCSSCreated = false;
function createTextButton(sIconColor,sTextColor,sColor,sHoverColor,sTitle,bLeft,func){
  /* 높이가 작으면 텍스트가 올라온다. 버튼 height값을 적정히 주자 */
    var c_elButton = {
      "border-radius":"2px",
      "background-color":"#ff8c00", /* Green */
      "border":"none",
      "color":sTextColor,
      //"padding":"4px 14px 6px 13px",
      "padding":"2px 14px 4px 11px",
      "text-align":"center",
      "text-decoration":"none",
      "display":"inline-block",
      "font-size":"1.0em",
      "margin":"0px 0px",
      "cursor":"pointer",
    }

    var elButton = div(c_elButton).bgColor(sColor);
    //elButton.transitionDuration(1.0);
    //elButton.transition("background-color 1.0s");
    elButton.hovered("background-color",sHoverColor,1.0);
    //elButton.hovered("box-shadow","0 2px 8px 0 #00000035, 0 2px 20px 0 #00000005");
    var elButtonText = div(sTitle).inlineBlock().vAlignMiddle();
    //var elSVGArrow = icon_arrow_start(17,17,sColor).marginTop(5.4).marginRight(4);
    var elSVGArrow = icon_arrow_start(g_fFontSize,g_fFontSize,sIconColor,sColor).marginRight(4).vAlignMiddle();//.marginTop(5.4).marginRight(4);
    //elSVGArrow.attr("transform","matrix( 1, 0, 0, 1, 0, 0 )");
    if( bLeft )
      elSVGArrow.attr("transform","rotate(180)");
    if( is(func) )
        elButton.onclick(func);

    elButton.append(elSVGArrow,elButtonText);
    return elButton;
}

//--------------------------------------------------------------------------------------- Pop Up
function popupMenuButton(n1Center2Left3Right,menu,bDropDown){
  if( isUndefined(bDropDown) ) // 위로 뜰지 아래로 뜰지
    bDropDown = true;
  var c_menuDiv = {
    "display":"none",
    "position":"fixed",
    "z-index":"30",
    //"background-color":"lightgreen"
  };
  var c_elShowButton_ = {
    "cursor":"pointer"
  }

  var n1Center2Left3Right_ = 1;
  if(typeof n1Center2Left3Right !== "undefined") {
    if( n1Center2Left3Right != null ){
      n1Center2Left3Right_ = n1Center2Left3Right;
    }
  }

  var menuDiv = div(c_menuDiv);  
  var bShowMenu = false;
  var elShowButton = div(c_elShowButton_);  
  elShowButton.onclick(function(e){
    showMenu(!bShowMenu);
  });

  function showMenu(bShow){
    if( bShow ){
      menuDiv.show(); /* hide상태에서는 width()가 0이 나온다 */
      if( n1Center2Left3Right_ == 2 )
        menuDiv.left(elShowButton.offsetLeft() - (menuDiv.width() - elShowButton.width()) );
      else if( n1Center2Left3Right_ == 3 )
        menuDiv.left(elShowButton.offsetLeft());
      else
        menuDiv.left(elShowButton.offsetLeft() - (menuDiv.width() - elShowButton.width())*0.5 );
      
      //alert(elShowButton.left());
      if( bDropDown )
      {
        var fTop = elShowButton.offsetTop() + elShowButton.height();
        fTop = Math.max(fTop,0);
        menuDiv.top(fTop);
      }
      else
      {
        var fTop = elShowButton.offsetTop() - menuDiv.height();
        fTop = Math.min(fTop,screen.height - menuDiv.height());
        menuDiv.top(fTop);
      }
        //menuDiv.top(elShowButton.offsetTop() - menuDiv.height());
      //alert( elShowButton.height() );
      // alert("top: " + menuDiv.top() + "\nwidth: " + menuDiv.width() + "\nheight: " + menuDiv.height());
    }else {
      menuDiv.hide();
    }

    bShowMenu = bShow;
  }

  addTapEvent(function(e){
      if( ( elShowButton.element.contains(e.target) || menuDiv.element.contains(e.target) ) == false ){
        menuDiv.hide();
        bShowMenu = false;
      }
  });

  if(typeof menu !== "undefined") {
    if( menu != null ){
      menuDiv.append(menu);
    }
  }


  menuDiv.toBody();
  return elShowButton;
}

function finder_fileDetail(){
  initBlocks();

  //this.title = "untitled.html";
  //this.description = "";
  var d = new Date();
  this.date = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
  this.fileIndex = 0;
  var th = this;
  //var iconHeight = 14;
  //var fontSize = 11;

  var spaceHeight = 2;
  var color = "dodgerblue";
  block("file information").textAlign("center").bgColor("#333").color("white");//.fontWeight("bold");
  space(4);
  var elName = block("name:").textAlign("left").color(color);
  // var icon_file = icon_File(10,10,function(e){
  // });
  // item(icon_file).floatLeft();
  // item(":");
  space(spaceHeight);
  block();//.color("dodgerblue");//.bgColor("dodgerblue").color("yellow");
  //var icon_file = svgDiv("file.svg",iconHeight*0.8,iconHeight);
  //item(icon_file);
  //var elTitleBox = item(this.title + ".html").fontSize(fontSize);
  //var icon_edit = svgDiv("edit10.svg",fontSize*1.1,fontSize*1.1).marginLeft(6);
  this.elTitleBox = item(textarea("")).fontSize(12);
  this.elTitleBox.width("96%").attr("rows",3).css("resize","none");
  //var elTitleBox = item(this.title + ".html").fontSize(fontSize);
  //item(icon_edit);
  block("description:").textAlign("left").color(color);
  space(spaceHeight);
  block();
  this.elDescriptionBox = item(textarea("")).fontSize(12);
  this.elDescriptionBox.width("96%").attr("rows",10).css("resize","none");
  block("modified:").textAlign("left").color(color);
  space(spaceHeight);
  var dateDiv = block(this.date).fontSize(9);
  //-------------------------------------- libraries
  block("resources:").textAlign("left").color(color);
  space(spaceHeight);
  var arrTexts = { // "jquery 3.1.0":"https://code.jquery.com/jquery-3.1.0.js",
  };
  this.arrLibraryUrls = [];
  this.arrLibraryType = []; // 0 => script, 1 => link ( stylesheet )
  this.arrLibraryDivs = [];
  this.deleteLibrary;
  this.insertLibrary = function(name,type){
    //var outerDiv = div(name).clearBoth();
    //var icon_delete = svgDiv("delete.svg",10,10).floatLeft();
    var c_image = {
      "width":"12px",
      "height":"12px"
    };
    var index = th.arrLibraryUrls.length;
    var libraryDiv = div().fontSize("0.5em").textAlign("left");
    var icon_delete = icon_Delete(12,12,null).floatLeft().margin( 0, 3 );
    //var icon_delete = img("images/delete.svg",c_image).floatLeft().margin( 0, 3 );
    libraryDiv.append(icon_delete);
    libraryDiv.onclick(function(){
      var type = th.arrLibraryType[index];
      var confirmText = "delete? \n" + "( " + name + " )";
      // if( type == 0 ){
      //   confirmText += tagString("script",{"src":name});
      // }else if( type == 1 ){
      //   confirmText +=  tagString("link",{"href":name});
      // }
      if( confirm( confirmText ) ){
        if( is(th.deleteLibrary) )
          th.deleteLibrary(name);
        th.arrLibraryDivs[index].remove();
        delete th.arrLibraryUrls[index];
        delete th.arrLibraryDivs[index];
        delete th.arrLibraryType[index];
      } else {

      }
    });
    libraryDiv.element.innerHTML += name;
    th.arrLibraryUrls.push(name);
    th.arrLibraryType.push(type);
    th.arrLibraryDivs.push(libraryDiv);
    th.elMain.append(libraryDiv);
  };

this.refreshLibraryUrls = function(arrLibraryUrls_,arrLibraryType){
  th.arrLibraryUrls = [];
  th.arrLibraryType = [];
  th.arrLibraryDivs.forEach(function(item,index){
    item.remove();
  });
  th.arrLibraryDivs = [];

  if( is(arrLibraryUrls_) ){
    arrLibraryUrls_.forEach(function(item,index){
      th.insertLibrary(item,arrLibraryType[index]);
    });
  }
};

this.setFilePanel = function(title,description,date,fileIndex,arrLibraryUrls_,arrLibraryType){
    this.elTitleBox.value(title);
    if( is(description) )
      this.elDescriptionBox.value(description);
    th.date = date;
    dateDiv.html(th.date);
    th.fileIndex = fileIndex;
    th.refreshLibraryUrls(arrLibraryUrls_,arrLibraryType);
  };
  
  

  //-------------------------------------- search bar
  this.onItemClicked;
  var width_searchBar = 90;
  var searchBar = input().width(width_searchBar + "%").type("text").name("").placeHolder("search").required(false); // Search (jQuery,React,Angular,Vue.js...)
  block(searchBar);
  space(4);
  var ul_ = ul({"list-style-type":"none"}).width( (width_searchBar + 3) + "%").fontSize("0.8em").textAlign("left").bgColor("white").color("#777").padding(0,0,0,2).margin(0,0,0,4);
  //var arrClicked = {};
  addTapEvent(function(e){
    if( ( ul_.element.contains(e.target) ) == false ){
      ul_.empty();
    }
  });

  searchBar.element.onkeyup = function(e){
    var inputString = searchBar.element.value;
    if( inputString.length < 1 ){
      ul_.empty();
    }else{
      ajax('https://api.cdnjs.com/libraries?search=' + inputString,null,false,function(arrData){
        ul_.empty();
        var arrList_keys = [];
        var arrList_values = [];
        var arrLi = [];
        arrTexts = {};
        var max = 20;
        var nCount = arrData["total"];
        var arrResults = arrData["results"];
        for( i = 0; (i < nCount && i < max); i++ ){
           arrTexts[arrResults[i]["name"]] = arrResults[i]["latest"];
        }
  
        if( inputString.length > 0 ){
          for( key in arrTexts){
            if( key.includes(inputString) ){
              arrList_keys.push(key);
              arrList_values.push(arrTexts[key]);
              var li_ = li(key).normal({"background-color":"#eee", "color":"blue"});
              ul_.append(li_);
              arrLi.push(li_);
            }
          }
        }
  
        arrLi.forEach(function(item,index){
          item.onclick(function(){
            //th.elMain.append(div(arrList_keys[index]));
            var fileExtention = getFileExtention(arrList_values[index]);
            var type = 0;
            if( is(fileExtention) ){
              if( fileExtention != "js" )
                type = 1;
            }
            th.insertLibrary(arrList_values[index],type);
            //arrClicked[arrList_keys[index]] = arrList_values[index];

            if( is(th.onItemClicked) ){
              th.onItemClicked(arrList_keys[index], arrList_values[index]);
            }
            //alert(arrTexts[key_]);
          });
        });
  
      },null,null,false);  
    }
  };

  block(ul_);

  this.elMain = mainBlock();
}

function finder(func_menuClicked,arrMenuTexts){
  //----------------------------------------------- panel
  this.finderPanel = div();

  //----------------------------------------------- popup menu
  var editMenu = new popupMenu(func_menuClicked,null,arrMenuTexts,1);
  var c_editMenuMain = {
    "background-color":"white",
    "color":"black"
  };
  var c_editMenuItem = {
    "border":"1px solid #333",
    "padding":"6px 14px"
  };
  editMenu.items.forEach(function(item,index){
    item.css(c_editMenuItem);
    item.normal({"background-color":"white","color":"black"});
    item.hovered({"background-color":"#f60","color":"white"});
    //item.normal({"background-color":"#f60","color":"white"});
  });
  editMenu.menuDiv.css(c_editMenuMain);
  this.menu = editMenu;
  this.editingFileName;
  this.editingTitleDiv;
  this.editingFileDate;
  this.editingFileIndex;
  this.editingButtonIndex;
  this.selectedFileName;
  this.selectedFileDate;
  this.selectedFileIndex;
  this.selectedFinderIndex;
  this.selectedTitleDiv = null;
  var buttonsCount = 0;
  var finder_ = this;
  this.arrTitleDivs = [];
  this.arrFileDivs = [];
  this.arrDBFileIndexes = [];
  var currentEditingFileTitleDiv = null;
  
  this.init = function(){
    editMenu.editButtons = [];
    finder_.arrTitleDivs = [];
    finder_.arrDBFileIndexes = [];
    finder_.arrFileDivs = [];
    this.finderPanel.empty();
  }

  this.deleteItem = function(index){
    if( editMenu.editButtons.length > index ){
      editMenu.editButtons.splice(index,1); // index인덱스에 1개를 delete한다. 그냥 delete를 쓰면 완전 삭제가 안되서 length가 안변함
      //delete editMenu.editButtons[index];
    }
    if( finder_.arrTitleDivs.length > index ){
      finder_.arrTitleDivs.splice(index,1); // index인덱스에 1개를 delete한다. 그냥 delete를 쓰면 완전 삭제가 안되서 length가 안변함
      //delete finder_.arrTitleDivs[index];
    }
    if( finder_.arrDBFileIndexes.length > index ){
      finder_.arrDBFileIndexes.splice(index,1); // index인덱스에 1개를 delete한다. 그냥 delete를 쓰면 완전 삭제가 안되서 length가 안변함
      //delete finder_.arrTitleDivs[index];
    }
    if( finder_.arrFileDivs.length > index ){
      finder_.arrFileDivs[index].remove();
      finder_.arrFileDivs.splice(index,1); // index인덱스에 1개를 delete한다. 그냥 delete를 쓰면 완전 삭제가 안되서 length가 안변함
      //delete finder_.arrFileDivs[index];
    }
  }


  this.getFinderIndex = function(elFiletitle){
    var nIndex = 0;
    for( i = 0; i < this.arrTitleDivs.length; i++ )
    {
      var elDiv = this.arrTitleDivs[i];
      //if( elDiv.element.contains(elFiletitle.element) )
      if( elDiv == elFiletitle )
      {
        return nIndex;
      }

      nIndex++;
    }

    //alert(nIndex);
    return -1;
  }

  this.getSelectedFinderIndex = function(){
    return this.getFinderIndex(this.selectedTitleDiv);
  }

  this.hover = function(element,bHover){
    if( is(element) == false )
      return;
    if( bHover ){
      if( finder_.selectedTitleDiv != element ){
        element.bgColor("mediumseagreen");
        element.color("yellow");
      }
    }else{
      if( finder_.selectedTitleDiv != element ){
        element.removeCss("background-color");
        element.color("white");
      }
    }
  }

  this.select = function(nFinderIndex,bSelect,fileName,date,fileDBIndex){

    //console.log("select finder index:" + nFinderIndex);
    if( is(finder_.arrTitleDivs) == false )
    {
      return;
    }

    if( finder_.arrTitleDivs.length ==  0 )
    {
      return;
    }

    if( is(nFinderIndex) == false  )
      nFinderIndex = finder_.arrTitleDivs.length - 1;

    if( nFinderIndex >= finder_.arrTitleDivs.length )
    {
      nFinderIndex = finder_.arrTitleDivs.length - 1;
    }

    if( bSelect ){

      if( finder_.selectedFinderIndex < finder_.arrTitleDivs.length ) // remove previous selected item color
      {
        var elDiv = finder_.arrTitleDivs[finder_.selectedFinderIndex];
        if( is(elDiv) )
        {
          elDiv.removeCss("background-color");
          elDiv.color("white");
        }
      }

      finder_.selectedFinderIndex = nFinderIndex;
      finder_.selectedTitleDiv = finder_.arrTitleDivs[nFinderIndex];
      // console.log(finder_.arrTitleDivs);
      // console.log(nFinderIndex);
      // console.log(finder_.selectedTitleDiv);
      if( is(finder_.selectedTitleDiv) )
      {
        finder_.selectedTitleDiv.removeCss("background-color");
        //finder_.selectedTitleDiv.color("white");
        finder_.selectedTitleDiv.bgColor("dodgerblue");
        finder_.selectedTitleDiv.color("yellow");
        finder_.selectedFileName = fileName;
        finder_.selectedFileDate = date;
        finder_.selectedFileIndex = fileDBIndex;
      }
      
    }else{

      var elDiv = finder_.arrTitleDivs[nFinderIndex];
      elDiv.removeCss("background-color");
      elDiv.color("white");
    }
  }

  this.edit = function(element,bEdit){
    if( is(element) == false )
      return;
    if( bEdit ){
      if( finder_.selectedTitleDiv != element ){
        element.bgColor("mediumseagreen");
        element.color("yellow");
      }
    }else{
      if( finder_.selectedTitleDiv != element ){
        element.removeCss("background-color");
        element.color("white");
      }
    }
  }

  //----------------------------------------------- item in panel
  this.insertItem = function(nFinderIndex,func_click,fileName,date,fileDBIndex){
    if( is(fileDBIndex) == false )
      fileDBIndex = -1;
    buttonsCount++;
    var buttonIndex = buttonsCount - 1;
    var lineHeight = 20;
    var divTitle = div({"font-size":"0.7em"}).floatLeft().marginLeft(3);
    if( is(date) )
      divTitle.html(fileName +  fxAddColorSpan(" " + date, {"#ddd":date}, "0.6em") );
    else
      divTitle.html(fileName);
    divTitle.onclick(function(){
      //finder_.selectedFinderIndex = nFinderIndex;
      //console.log("finder_.selectedFinderIndex.....:" + finder_.selectedFinderIndex);
      //finder_.selectedTitleDiv = divTitle;
      //alert(finder_ .elTitleBox.value());

      func_click(nFinderIndex);
      finder_.select(nFinderIndex,true,fileName,date,fileDBIndex);
    });
    var iconHeight = lineHeight*0.7;
    //var icon_file = svgDiv("file.svg",iconHeight*0.8,iconHeight).floatLeft();
    var icon_file = icon_File(lineHeight*0.58,lineHeight*0.74,function(e){

    }).floatLeft().marginTop(0);
    var icon_edit = icon_Edit(lineHeight*0.64,lineHeight*0.64,function(){
      editMenu.showMenu(true,icon_edit);
      if( is(currentEditingFileTitleDiv) ){
        finder_.edit(currentEditingFileTitleDiv,false);
        // currentEditingFileTitleDiv.removeCss("background-color");
        // currentEditingFileTitleDiv.color("white");
      }
      currentEditingFileTitleDiv = divTitle;
      finder_.editingTitleDiv = divTitle;
      finder_.edit(divTitle,true);
      finder_.editingFileName = fileName;
      finder_.editingFileDate = date;
      finder_.editingFileIndex = fileDBIndex;
      finder_.editingButtonIndex = buttonIndex;
    }).floatRight().marginTop(2);
    //var icon_edit = svgDiv("edit10.svg",iconHeight,iconHeight).floatRight();    
    // icon_edit.onclick(function(){
    //   editMenu.showMenu(true,icon_edit);
    //   if( is(currentEditingFileTitleDiv) ){
    //     finder_.edit(currentEditingFileTitleDiv,false);
    //     // currentEditingFileTitleDiv.removeCss("background-color");
    //     // currentEditingFileTitleDiv.color("white");
    //   }
    //   currentEditingFileTitleDiv = divTitle;
    //   finder_.editingTitleDiv = divTitle;
    //   finder_.edit(divTitle,true);
    //   finder_.editingFileName = fileName;
    //   finder_.editingFileDate = date;
    //   finder_.editingFileIndex = fileDBIndex;
    //   finder_.editingButtonIndex = buttonIndex;
    // });

    editMenu.editButtons.push(icon_edit);
    icon_edit.onhover(function(bHover){
      if( editMenu.bShowMenu == false ){
        if( bHover ){
          finder_.hover(divTitle,true);
        }else{
          finder_.hover(divTitle,false);
        }
      }
    });
    finder_.arrTitleDivs.push(divTitle);
    finder_.arrDBFileIndexes.push(fileDBIndex);
    if( is(editMenu.func_show) == false ){
      editMenu.func_show = function(bShow){
        if( bShow == false ){
          finder_.arrTitleDivs.forEach(function(item,index){
            // 매뉴가 없어질때 editing되던 놈의 edit모드 색깔을 지워준다.
            finder_.edit(item,false);
          });
        }
      };
    }
    var div1 = div().textAlign("left").clearBoth();
    //divTitle.hover(colorText,colorBg);
    divTitle.onhover(function(bHover){
      if( editMenu.bShowMenu == false ){
        if( bHover ){
          finder_.hover(divTitle,true);
        }else{
          finder_.hover(divTitle,false);
        }
      }
    });
    div1.append(icon_file,divTitle,icon_edit);
    finder_.arrFileDivs.push(div1);
    this.finderPanel.append(div1);
    return divTitle;
  }
}

function popupMenu(func_itemClicked,func_showMenu,arrMenuTexts,n1Left2Center3Right){
  var c_menuDiv = {
    "display":"none",
    "position":"fixed",
    "z-index":"30",
    //"background-color":"lightgreen"
  };

  this.n1Left2Center3Right_ = 2;
  if( is(n1Left2Center3Right) ){
      this.n1Left2Center3Right_ = n1Left2Center3Right;
  }

  this.editButtons = [];
  this.items = [];
  this.menuDiv = div(c_menuDiv); 
  this.bShowMenu = false;
  this.func_show = func_showMenu;

  var menu_ = this.menuDiv;
  var items_ = this.items;



  this.showMenu = function( bShow, elShowButton_ ){
    if( bShow ){
      this.menuDiv.show(); /* hide상태에서는 width()가 0이 나온다 */

      var rtShowButton = elShowButton_.rect();
      if( this.n1Left2Center3Right_ == 1 ){
        this.menuDiv.left(rtShowButton.left - (this.menuDiv.width() - elShowButton_.width()*0.5) );
      }else if( this.n1Left2Center3Right_ == 3 ){
        this.menuDiv.left(rtShowButton.left);
      }else{
        this.menuDiv.left(rtShowButton.left - (this.menuDiv.width() - elShowButton_.width())*0.5 );
      }
      
      this.menuDiv.top(rtShowButton.top + elShowButton_.height()*0.5);
    }else {
      this.menuDiv.hide();
    }

    this.bShowMenu = bShow;
    if( is(this.func_show) )
      this.func_show(this.bShowMenu);
  }

  var popupMenu = this;

  arrMenuTexts.forEach(function(item,index){
    var textDiv = div(item).onclick(function(e){
      func_itemClicked(index);
      popupMenu.showMenu(false,null);
    });
    //textDiv.hovered({"background-color":"dodgerblue"});
    //textDiv.normal({"background-color":"white"});
    items_.push(textDiv);
    menu_.append(textDiv);
  });

  addTapEvent(function(e){
      if( ( popupMenu.menuDiv.element.contains(e.target) ) == false ){
        var bFound = false;
        popupMenu.editButtons.forEach(function(item,index){
          if( ( item.element.contains(e.target) ) ){
            bFound = true;
          }
        });

        if( bFound == false ){
          if( popupMenu.bShowMenu ){
            popupMenu.showMenu(false,null);
          }
          
          //popupMenu.menuDiv.hide();
          //popupMenu.bShowMenu = false;
        }
      }


      // if( is(popupMenu.elShowButton) ){
      //   if( ( popupMenu.elShowButton.element.contains(e.target) ) == false ){
      //     popupMenu.menuDiv.hide();
      //     popupMenu.bShowMenu = false;
      //   } 
      // }
  });

  this.menuDiv.toBody();
  //console.log(this.menuDiv);
}


function createWaitingPopUpDiv()
{
  //var elBG = div("200px","100px").bgColor("#00000055").fixed();
  var elBG = div("100%","100%").bgColor("#00000011").fixed();
  var elText = div("waiting..").absolute().color("white");
  elBG.append(elText);
  this.m_bShow = false;
  var nShowCount = 0; // show를 연속해서 2번 호출된 경우 hide역시 2번 호출되야 창이 사라진다.
  this.show = function(bShow){
    if( bShow )
    {
      this.m_bShow = true;
      nShowCount++;
      elBG.toBody();
      elBG.center(); // parent가 있어야 center()가 먹힌다.
      elBG.top()
      /* 
      document.body.clientHeight는 문서가 전부완성되어야 크기가 나오는듯하다 
      따라서 이벤트가 아닌 script가 그냥 실행될때는 0으로 나온다.
      window.innerHeight를 사용한다.
      */
      elBG.css({
        "top":(window.innerHeight - elBG.height())*0.5 + "px",
        "left":(window.innerWidth - elBG.width())*0.5 + "px"
      });

      //var rtBG = elBG.rect();
      elText.css({
        "top":(elBG.height() - elText.height())*0.5 + "px",
        "left":(elBG.width() - elText.width())*0.5 + "px"
      });
      
    }else{
      this.m_bShow = false;
      nShowCount--;
      if( nShowCount == 0) // show를 연속해서 2번 호출된 경우 hide역시 2번 호출되야 창이 사라진다.
        elBG.remove();
    }
  }

  return this;
  
}

var g_elWaitingPopUp = new createWaitingPopUpDiv();

function ButtonPopUp(element,button_,width,height,disappearWhenClicked,n1Left2Center3Right) {

  if( is(disappearWhenClicked) ){
    if( disappearWhenClicked ){
      addTapEvent(function(e){
        if( elMain.contains(e.target) == false ){
          elMain.hide();
        }
      });
    }
  }
  
  var c_elMain = {
    "background-color":"white",
    "position":"absolute",
    "border":"1px solid #000",
    "z-index":"50"
  };


  //var blackBg = div(c_blackBg);
  var elMain = div(c_elMain);

  this.show = function(bShow){
    if( is(bShow) == false )
      bShow = true;

    if( bShow ){
      elMain.show();
      elMain.align(button_,n1Left2Center3Right);
      //alert(elMain);
      //elMain.log();
    }else{
      elMain.hide();
    }
  }

  element.remove();
  elMain.append(element);
  //blackBg.append(elMain);
  elMain.toBody();
  elMain.size(width,height);
  //elMain.center();
  this.show(false);

  var this_ = this;

  fxAddRearrangUIFunction( function(e){
    elMain.center();
  });

  return this;
}


//--------------------------------------------------------------------------------------- modal

function Modal(element,button,width,height,disappearWhenClicked) {

  if( disappearWhenClicked ){
    addTapEvent(function(e){
      if( elMain.contains(e.target) == false && button.contains(e.target) == false ){
        // 이걸 넣어줘야 한다 => 왜냐면 sign up버튼클릭시 sign in창을 hide()하고 sign up창을 show하는데 hide()된 후에 이놈이 발생하여 뒷엣놈을 hide()하는듯..
        if( blackBg.contains(e.target) )
          blackBg.hide();
      }
  });
  }

  var c_blackBg = {
  "position":"absolute",
  "z-index":"100",
  "width":"100%",
  "height":"100%",
  "background-color":"#000000cc",
  };

  var c_elMain = {
    "background-color":"white",
    "position":"absolute",
    "border":"1px solid #000"
  };


  var blackBg = div(c_blackBg);
  var elMain = div(c_elMain);

  this.show = function(bShow){
    if( is(bShow) == false )
      bShow = true;

    if( bShow ){
      blackBg.show();
      elMain.center();
    }else{
      blackBg.hide();
    }
  }

  element.remove();
  elMain.append(element);
  blackBg.append(elMain);
  blackBg.toBody();
  elMain.size(width,height);
  elMain.center();
  this.show(false);

  //var this_ = this;

  fxAddRearrangUIFunction( function(e){
    elMain.center();
  });

  return this;
}

function myAlert(func_ok,func_cancel,title,bOk,bCancel){
  return new myAlertModal(func_ok,func_cancel,260,140,false,title,bOk,bCancel,true,40,true);
}

function myAlertModal(func_ok,func_cancel,width,height,bPercentSize,title_,bOk,bCancel,bAutoResize,percentMaxWidth,bBlackBgClicked){
  /*
  bAutoResize은 alert창과 같이 contents 크기에 맞추어 전체적으로 크기가 확장되는 기능이다.
  percentMaxWidth는 bAutoResize시에 최대 width를 잡는다.
  */

 var hFooter = 40;
 this.rearrangeUI_ = function(){ 

  elMain.center();
  //titleDiv.width(elMain.width());
  // titleDiv.height(elMain.height()-footerDiv.height());
  // titleDiv.lineHeight(elMain.height()-footerDiv.height());
  // titleDiv.bgColor("blue");
  // footer_leftDiv.bgColor("yellow");
  // footer_rightDiv.bgColor("green");
  button_left.left( (footer_leftDiv.width() - button_left.width())*0.5 );
  button_right.left( footer_leftDiv.width() + (footer_rightDiv.width() - button_right.width())*0.5 );
  


  // console.log(elMain.width());
  // console.log(titleDiv.width());
  //titleDiv.height(elMain.height()-footerDiv.height());
  
  // footerDiv.top(elMain.height()-footerDiv.height());
  // footer_leftDiv.width(elMain.width()*0.5);
  // footer_rightDiv.width(elMain.width()*0.5);
  
  // footer_leftDiv.center();
  // footer_rightDiv.center();

  };

  this.show = function(bShow){
    if( is(bShow) == false )
      bShow = true;

    if( bShow ){
      blackBg.show();
      //console.log("show");
      this.rearrangeUI_();
    }else{
      blackBg.hide();
      //console.log("hide");
    }
  }

  this.title = function(text){
    titleDiv.text(text);
  }

  if( bBlackBgClicked ){
    addTapEvent(function(e){
      if( elMain.contains(e.target) == false ){
        // 이걸 넣어줘야 한다 => 왜냐면 sign up버튼클릭시 sign in창을 hide()하고 sign up창을 show하는데 hide()된 후에 이놈이 발생하여 뒷엣놈을 hide()하는듯..
        if( blackBg.contains(e.target) )
          blackBg.hide();
      }

      // if( blackBg.contains(e.target) ){
      //   blackBg.hide();
      // }
  });
  }

  var c_blackBg = {
  "position":"fixed",
  "z-index":"100",
  "width":"100%",
  "height":"100%",
  "top":"0px", //요걸 안해주면 다른 처음 생성시 다른 fixed 밑에 생성될 수 있다. 초기값이 default로 생성위치로 생기므로
  "left":"0px",
  "background-color":"#00000033",
  };
  // var sizePaddingHeader = size(0,0);
  // var sizePaddingFooter = size(0,0);
  // if( bAutoResize ){
  //   sizePaddingHeader = size(40,20);
  //   sizePaddingFooter = size(20,10);
  //   // width += sizePaddingHeader.width*2 + sizePaddingFooter.width*4;
  //   // height += sizePaddingHeader.height*2 + sizePaddingFooter.height*4;
  // }

  var sizeMain = size(width,height);
  var c_elMain = {
    "background-color":"white",
    "position":"absolute",
    // "top":(100 - sizeMain.height)*0.5 + "%",
    // "left":(100 - sizeMain.width)*0.5 + "%",
    "border":"1px solid #000",
    "max-width":"80%",
    "max-height":"80%",
    "min-width":"220px",
    //"min-height":"140px",
    
  };

  // if( bAutoResize ){
  //   c_elMain = concat(c_elMain, {
  //     // "width": "10%",
  //     // "height": "20%",
  //     "max-width": percentMaxWidth + "%",
  //     "min-width": sizeMain.width + (bPercentSize?"%":"px"),
  //     "min-height":sizeMain.height + (bPercentSize?"%":"px"),
  //   } );
  // }else{
  //   c_elMain = c(c_elMain, {
  //     "max-width": percentMaxWidth + "%",
  //     "width": sizeMain.width + (bPercentSize?"%":"px"),
  //     "height":sizeMain.height + (bPercentSize?"%":"px"),
  //   } );
  // }


  var footerpHeight = 30;
  var c_headerDiv = {
    //"position":"relative",
    "background-color":"white",
    "height": (100 - footerpHeight) + "%",
    // "text-align":"center",
    // "vertical-align":"middle"
  };



  var c_footerDiv = {
    //"position":"relative",
    "background-color":"#f8f8f8",
    "border-top":"1px solid #e6e6e6", 
    //"height": footerpHeight + "%",
    "height":hFooter + "px",
    //"height":bAutoResize?"50px":(footerpHeight + "%"),
  };

  var c_footer_leftDiv = {
    //"position":"relative",
    "float":"left",
    "width":"49.5%",
    "height":hFooter + "px",
    // "padding":sizePaddingFooter.width + "px " + sizePaddingFooter.height + "px"
  };

  var c_footer_rightDiv = {
    //"position":"relative",
    "float":"right",
    "width":"49.5%",
    "height":hFooter + "px",
    // "padding":sizePaddingFooter.width + "px " + sizePaddingFooter.height + "px"
  };

  var c_titleDiv = {
    // "diaplay":"inline-block",
    //"position":"absolute",
    "word-break":"break-all",
    "word-wrap":"break-word",
    "text-align":"center",
    "padding":(screen.width<700)?"30px 40px":"30px 80px",
    //"height":"100%",
    // "padding":sizePaddingHeader.width + "px " + sizePaddingHeader.height + "px"
  };

  // var max_height_title;
  // // if( is(parent) ) 
  // //   max_height_title = parent.clientHeight*0.4;
  // // else
  //   max_height_title = screen.height*0.5;

  // if( bAutoResize ){
  //   c_titleDiv = concat(c_titleDiv, {
  //     //  "max-width": percentMaxWidth + "%",
  //     "overflow-y":"auto",
  //     // "max-height": (is(parent))?(parent.height()*0.4):(screen.height*0.5) + "px"
  //     "max-height": max_height_title + "px"
  //   } );
  // }

  var blackBg = div(c_blackBg);
  var elMain = div(c_elMain);
  var headerDiv = div(c_headerDiv);
  var footerDiv = div(c_footerDiv);
  var footer_leftDiv = div(c_footer_leftDiv);
  var footer_rightDiv = div(c_footer_rightDiv);
  var titleDiv = div(c_titleDiv);
  titleDiv.text(title_);
  var button_right = button(func_ok,"OK").absolute();
  var button_left = button(func_cancel,"Cancel").absolute();
  if( bCancel )
  {
    footer_leftDiv.append(button_left);
    button_left.bottom( hFooter*0.26 );
  }
  if( bOk )
  {
    footer_rightDiv.append(button_right);
    button_right.bottom( hFooter*0.26 );
  }
  footerDiv.append(footer_leftDiv,footer_rightDiv);
  headerDiv.append(titleDiv);
  elMain.append(headerDiv,footerDiv);
  blackBg.append(elMain);

 

  //blackBg.toBody();
  // if( is(parent) )
  //   parent.append(blackBg);
  // else
    blackBg.toBody();
  // alert(titleDiv.height());
  //this.rearrangeUI_();
  
  this.show(false);

  var this_ = this;

  fxAddRearrangUIFunction( function(e){
    this_.rearrangeUI_();
    
    //logDebug();
  });

  //return {"element":blackBg,"show":show,"title":title};
}

//------------------------------------------------------------------------------- templates 
function template_signUp(bSignIn_,func_submit,func_cancel,func_signUp,formAction){

  var mainForm1;
  // this.submit = function(){
  //   mainForm_.submit();
  // };

  function stringLengthCheck(str,name,min,limit){
    if( str.length < min ){
      alert( name + " must be longer than " + min + " characters");
      return false;
    }else if( str.length >= limit ){
      alert( name + " must be shorter than " + limit + " characters");
      return false;
    }

    return true;
  }

  function make_UI(mainForm_,bSignIn){
    // var c_button_submit = {
    //   "height":"40px",
    //   // "margin-top":"30px",
    //   "font-size":"0.9em"
    // };
  
    // var c_button_cancel = {
    //   "height":"40px",
    //   // "margin-right":"3px",
    //   // "margin-top":"30px",
    //   "font-size":"0.9em",
    //   "float":"right"
    // };
  
    initBlocks();
    autoColor(false);
    autoAppend(false);
    var spaceHeight = 26;
    var inputHeight = 30;
    var paddingText = 1;
    var width_input = "97.6%";
    var height_input = "100%";
    //block("SIGN UP").height(50).fontSize("1.6em").textAlign("center");
    if( bSignIn == false ){
      block("Your Name");
      space(paddingText);
      block(inputHeight);
      var input_name = input(width_input,height_input).type("text").name("name").placeHolder("").required(true);
      item(input_name);
      space();
      space(spaceHeight);
    }
  
    //space(spaceHeight);
    block("ID");
    space(paddingText);
    block(inputHeight);
    var input_id = input(width_input,height_input).type("text").name("id").placeHolder("").required(true);
    item(input_id);
    space();
    space(9);
    if( bSignIn == false )
      block(spaceHeight*0.4,"jsmation.com/id").fontSize("0.6em").color("#bbb");
  
    if( bSignIn == false ){
      space(spaceHeight);
      block("Email");
      space(paddingText);
      block(inputHeight);
      var input_email = input(width_input,height_input).type("text").name("email").placeHolder("").required(true);
      item(input_email);
      space();
    }
  
    space(spaceHeight);
    block("Password");
    space(paddingText);
    block(inputHeight);
    var input_password = input(width_input,height_input).type("password").name("password").placeHolder("").required(true);
    item(input_password);
    space();

    if( bSignIn == false ){
      space(spaceHeight);
      block("Confirm Password");
      space(paddingText);
      block(inputHeight);
      var input_password2 = input(width_input,height_input).type("password").name("confirm_password").placeHolder("").required(true);
      item(input_password2);
      space();
    }else{
      space(paddingText);
      space();
      block(inputHeight*0.9);
      space()
      var input_remember_me = input().margin(0,5,0,0).type("checkbox").name("remember_me").placeHolder("").required(false);
      item(input_remember_me);
      //space(10);
      item("remember me").fontSize("0.6em").color("#444");
      space();
    }
  
    space(spaceHeight*1.1);
    block(inputHeight);
    // var button_submit = submitButton(function(e){
    //   if( is(func_submit) )
    //     func_submit();
    // }, 200, 50);
    var button_submit = roundButton(function(e){
      if( is(func_submit) )
        func_submit();
    },false,36,5,bSignIn?"Sign in":"Sign up").border(2,"black").color("white").bgColor("dodgerblue").fontSize("0.9em").normal({"background-color":"blue","color":"yellow","border-color":"#333"});
    item(button_submit);
  
    var button_cancel = roundButton(function(e){
      if( is(func_cancel) )
        func_cancel();
    },false,36,5,"Cancel");
    button_cancel.border(2,"black").color("white").bgColor("dodgerblue").fontSize("0.9em");
    button_cancel.normal({"background-color":"blue","color":"yellow","border-color":"#333"});
    button_cancel.floatRight();
    item(button_cancel);
    space();
  

    space(spaceHeight*1.5);
    block(inputHeight);
    var button_signUp = u(bSignIn?"Sign up":"Sign in").onclick(function(e){
      //removeBlocks();
      //make_UI(mainForm1,false); // mainForm1는 그대로이고 sub들을 새로 만들어 붙인다.
      if( is(func_signUp) )
        func_signUp();
    });
    button_signUp.height("20px").fontSize("0.9em").floatLeft().marginLeft(4).normal({"background-color":"blue","color":"#0"});
    item(button_signUp);

     
    space(spaceHeight);
  
    var a_form = {
      "method":"post",
      "action":formAction
      // "onsubmit":"validateForm(this)"
    };
  
    c_mainFrom = {
      "margin":"30px 32px 30px 24px",
      "position":"relative",
      "font-size":"1.2em"
    }
    var form1 = form({},a_form);
    //form1.log();
    form1.element.onsubmit = function() {
      //var x = document.forms["myForm"]["fname"].value;
      //alert(this);
      if( bSignIn == false ){
        if( stringLengthCheck( input_name.element.value, "YourName", 3, 40 ) == false )
          return false;
      }
      if( stringLengthCheck( input_id.element.value, "id", 3, 20 ) == false )
        return false;
      if( stringLengthCheck( input_password.element.value, "password", 6, 20 ) == false )
        return false;
      if( bSignIn == false ){
        if( stringLengthCheck( input_email.element.value, "email", 5, 50 ) == false )
          return false;
      }
   
      return true;
    }
  
    if( isUndefined(mainForm_) )
      mainForm_ = mainBlock(form1,c_mainFrom); 
    else
      mainBlock(mainForm_); // mainForm_은 그대로이고 sub들을 새로 만들어 붙인다.

    mainForm_.fontFamily("verdana");
    return mainForm_;
  }

  return make_UI(mainForm1,bSignIn_);
}


