function addTag(e,n,t){return"<"+n+' class="'+t+'">'+e+"</"+n+">"}function CodeMirrorFittoContent(){5<myCodeMirror.lineCount()||myCodeMirror.lineCount();myCodeMirror.setSize("100%",20*myCodeMirror.lineCount())}function toggleCSSClass_Show(e){toggleCSSClass(e,"show")}function toggleCSSClass(e,n){document.getElementById(e).classList.toggle(n)}function addCSSClass_Show(e){addCSSClass(e,"show")}function removeCssClass_Show(e){removeCssClass(e,"show")}function removeCssClass(e,n){pElement=document.getElementById(e),pElement.classList.contains(n)&&pElement.classList.remove(n)}function addCSSClass(e,n){pElement=document.getElementById(e),0==pElement.classList.contains(n)&&pElement.classList.add(n)}function containsID(e,n){return document.getElementById(e).contains(n.target)}function containsClassID(e,n){return document.getElementsByClassName(e)[0].contains(n.target)}function addList(e,n,t){e(e).html(makeListHTML(e,n,t))}function addList_Box(e,n,t){e(e).html(makeListHTML(e,n,t))}function makeListHTML(e,n,t){e=(e="<ul style='list-style-type:"+n+";' class='"+t+"'><li>"+e(e).html()).replace(/\n/gi,"</li><li>");return e+="</li></ul>"}function NewBlob(n,t){var o,s;try{o=new Blob([n],{type:t}),console.debug("case 1")}catch(e){window.BlobBuilder=window.BlobBuilder||window.WebKitBlobBuilder||window.MozBlobBuilder||window.MSBlobBuilder,"TypeError"==e.name&&window.BlobBuilder?((s=new BlobBuilder).append(n),o=s.getBlob(t),console.debug("case 2")):"InvalidStateError"==e.name?(o=new Blob([n],{type:t}),console.debug("case 3")):console.debug("Errore")}return o}