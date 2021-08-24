


function addTag( text, tagName, className ) {   
      return "<" + tagName + " class=\"" + className + "\">" + text + "</" + tagName + ">";
}

// function addTags_Editor_HTML( title, buttonTitle, editorID, codeText ) {   
//     return `<div class='e_container'>
//       <div class='e_title'>`+title+`</div>
//       <div class='e_ForPadding'><div class='e_ForLeftBorder'><div class='e_html' id='` + editorID + `'>`+ codeText +`</div></div></div>
//       <div class='e_button'><a class='buttons'><i class='fas fa-chevron-circle-right'></i>`+buttonTitle+`</a></div>
//       </div>`;
// }

// function add_CodeViewer(parentID,title,buttonTitle,editorID,codeText){

//   //var editorID = "e_html";
//   id(parentID).innerHTML = addTags_Editor_HTML(title, buttonTitle, editorID, codeText );
// }

// function add_Editor_HTML(parentID,title,buttonTitle,editorID,codeText){

//   //alert(g_arrAceIDs[g_arrAceIDs.length-1]);
//   //var editorID = "e_html";
//   // $("#"+parentID).
//   id(parentID).innerHTML = addTags_Editor_HTML(title, buttonTitle, editorID);
//   //$(".editor_html").text(codeText);
//   // chrome,clouds,crimsoneditor,dawn,dreamweaver,eclipse,github,iplastic,solarizedlight,tomorrow,
//   // xcode,kuroir,katzenmilch,sqlserver
//   var editor = ace.edit(editorID);
//   editor.setOptions({
//     theme: "ace/theme/crimsoneditor",
//     mode: "ace/mode/html",
//     value: codeText,
//     showGutter: false, // show or hide line numbers
//     // fontfamily: "arial",
//     fontSize: 16, // number | string: set the font size to this many pixels
//     readOnly: true,
//     highlightActiveLine: false,
//     maxLines: Infinity, /* fit to content size 크기가 컨텐트 싸이즈로 자동 조절되고 회색 박스도 없어진다.(선택 라인 포커스가 없어지는듯)*/
//     // highlightGutterLine: false
//   });
// }

// function concat2(obj1,obj2,obj3) {
//   if(typeof obj3 !== "undefined") { /*createEla) 식으로 호출하면 undefined type인 파라미터가 들어온다. */
//     if( obj3 != null ){
//       return Object.assign(obj1,obj2,obj3);
//     }
//   }
//   return Object.assign(obj1,obj2);
// }


function CodeMirrorFittoContent(){
  var height;
  if(myCodeMirror.lineCount() > 5) {
      height = 50;
  } else {
      height = 20 * myCodeMirror.lineCount();
  }
  myCodeMirror.setSize("100%", 20 * myCodeMirror.lineCount());
}
 

// function show(elementID) {
//   document.getElementById(elementID).style.display = "block";
// }

// function hide(elementID) {
//   document.getElementById(elementID).style.display = "none";
// }

function toggleCSSClass_Show(elementID) {     // remove or add
  toggleCSSClass(elementID,"show");
}

function toggleCSSClass(elementID,className) {     // remove or add
  document.getElementById(elementID).classList.toggle(className); // class list 항목들에서 추가 혹은 제거 한다.
}

function addCSSClass_Show(elementID) {     // remove or add
  addCSSClass(elementID,"show");
}

function removeCssClass_Show(elementID) {     // remove or add
  removeCssClass(elementID,"show");
}
 
 /*
 기본적으로 side bar는 600px 이상은 display:block 이하는 display:none 이 적용된 class가 있다 
 여기에 추가적으로 "show" 라는 클래스를 추가 제거 하는데 그러면 기존 display 속성이 classList에 있는데
 추가적으로 "show"라는 클래스를 넣었다 뺐다 하는 것이므로 classList에 display속성이 2개가 되었다 1개가 되었다 한다. 
 display 속성이 2개일때는 최근 바뀐 속성대로 변한다. display:none 이라는 class가 이미 있는데 display:block이라는 속성을 하나더 추가하면
 보이게 된다. 600px이하 였다가 600px이상으로 바뀔때 display:none에서 display:block으로 첫번째 display속성이 바뀌게 되는데
 바뀌므로 추가된 class가 display:none일지라도 새로 바뀐 display:block으로 바뀌게 된다.
 */
function removeCssClass(elementID, className) {
  pElement = document.getElementById(elementID);
  if (pElement.classList.contains(className)) {
    pElement.classList.remove(className);
  }
}

function addCSSClass(elementID, className) {
  pElement = document.getElementById(elementID);
  if (pElement.classList.contains(className) == false) {
    pElement.classList.add(className);
  }
}

function containsID(elementID, event) {
  return document.getElementById(elementID).contains(event.target); //node가 서브로 있는지 검사한다.
}

function containsClassID(classID, event) {
  return (document.getElementsByClassName(classID))[0].contains(event.target);
}



//---------------------------------------------------------------------------------------  list
function addList(id,UnOrderedStyle,ClassNameWillBeMade){
  id(id).html(makeListHTML(id,UnOrderedStyle,ClassNameWillBeMade));
}

function addList_Box(id,UnOrderedStyle,ClassNameWillBeMade){
  id(id).html(makeListHTML(id,UnOrderedStyle,ClassNameWillBeMade));
}

function makeListHTML(id,UnOrderedStyle,ClassName){
  /* \n 엔터값을 인식하여 <li>로 바꿔주므로 처음시작할때와 끝날때 문자열에 \n 이 있으면 안된다. */
  var element = id(id);
  var html = "<ul style='list-style-type:" + UnOrderedStyle + ";' class='" + ClassName + "'><li>" + element.html(); 
  html = html.replace(/\n/gi, "</li><li>");
  html += "</li></ul>";
  return html;
}



// function setDownloadURL( a, data, name) {
//   var type = 'text/plain';
// 	if (data != null && navigator.msSaveBlob)
// 		return navigator.msSaveBlob(new Blob([data], { type: type }), name);
// 	//var a = $("<a style='display: none;'/>");
//   var url = window.URL.createObjectURL(new Blob([data], {type: type}));
// 	a.attr("href", url);
// 	a.attr("download", name);
// 	$("body").append(a);
// 	a.click();
//   window.URL.revokeObjectURL(url);
//   //a.remove();
// }

function NewBlob(data, datatype)
{
    var out;

    try {
        out = new Blob([data], {type: datatype});
        console.debug("case 1");
    }
    catch (e) {
        window.BlobBuilder = window.BlobBuilder ||
                window.WebKitBlobBuilder ||
                window.MozBlobBuilder ||
                window.MSBlobBuilder;

        if (e.name == 'TypeError' && window.BlobBuilder) {
            var bb = new BlobBuilder();
            bb.append(data);
            out = bb.getBlob(datatype);
            console.debug("case 2");
        }
        else if (e.name == "InvalidStateError") {
            // InvalidStateError (tested on FF13 WinXP)
            out = new Blob([data], {type: datatype});
            console.debug("case 3");
        }
        else {
            // We're screwed, blob constructor unsupported entirely   
            console.debug("Errore");
        }
    }
    return out;
}