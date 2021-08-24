
var g_sID_changeable = "g_sID_changeable";
var g_sStroke = "#ededed";
var g_sStrokeW = 0.5;
var g_sFill = "white";
var g_sStroke2 = "#ededed";
var g_sStrokeW2 = 1.0;
var g_sFill2 = "black";
var g_sHover = "dodgerblue";
var g_fWidth = 27;
var g_fHeight = 27;
var g_fInnerP = 2;
var g_fOuterP = 0;
var g_sClicked = "mediumseagreen";
var g_fDuration = 0.6; // hover duration




function icon_tileblocks_4(func){
  var svgElement = svg(g_fWidth,g_fHeight);
  var sizeArea = size( g_fWidth - g_fOuterP*2 - g_fInnerP, g_fHeight - g_fOuterP*2 - g_fInnerP);
  //var rt1 = paddingRectFromSize( sizeArea, padding );
  var rt1 = rt( g_fOuterP, g_fOuterP, sizeArea.width*0.5, sizeArea.height*0.5 );
  var rectElement1 = rect(rt1,g_sStroke,g_sStrokeW,g_sFill);
  var rectElement2 = rect( moveRt(rt1, rt1.width + g_fInnerP, 0 ),g_sStroke,g_sStrokeW,g_sFill);
  var rectElement3 = rect( moveRt(rt1,0,rt1.height + g_fInnerP ),g_sStroke,g_sStrokeW,g_sFill);
  var rectElement4 = rect( moveRt(rt1,rt1.width + g_fInnerP,rt1.height + g_fInnerP),g_sStroke,g_sStrokeW,g_sFill);
  //svgElement.append(rectElement1);
  svgElement.append(rectElement1,rectElement2,rectElement3,rectElement4);
  // svgHover(svgElement,g_sStroke,g_sStrokeW,g_sFill,"black",0.2,g_sHover,[rectElement1,rectElement2,rectElement3,rectElement4]);
  // svgClick(svgElement,g_sStroke,g_sStrokeW,g_sFill,"black",0.6,g_sClicked,func);

  //------------------------------ hovered css
  var c_hover = {
    "fill":g_sHover,
      "stroke":"white",
      "stroke-width":"0.8px",
  };
  
  svgElement.hovered(c_hover,g_fDuration);
  //------------------------------ clicked css
  var c_click = {
    "fill":g_sClicked,
      "stroke":"white",
      "stroke-width":"1.2px"
  };
  svgElement.clicked(c_click);

  return svgElement;
}

function icon_tileblocks_3_1(func){
  var svgElement = svg(g_fWidth,g_fHeight);
  var oneThirdSize = size( (g_fWidth - g_fOuterP*2 - g_fInnerP*2)*0.33, (g_fHeight - g_fOuterP*2 - g_fInnerP)*0.5 );
  var rt1 = rt( g_fOuterP, g_fOuterP, oneThirdSize.width, oneThirdSize.height );
  var rectElement1 = rect(rt1,g_sStroke,g_sStrokeW,g_sFill);
  var rectElement2 = rect( moveRt(rt1, oneThirdSize.width + g_fInnerP, 0 ),g_sStroke,g_sStrokeW,g_sFill);
  var rectElement3 = rect( moveRt(rt1, oneThirdSize.width*2 + g_fInnerP*2, 0 ),g_sStroke,g_sStrokeW,g_sFill);
  var rectElement4 = rect( rt( g_fOuterP, g_fHeight*0.5 + g_fInnerP*0.5, g_fWidth - g_fOuterP*2, oneThirdSize.height ),g_sStroke,g_sStrokeW,g_sFill);
  svgElement.append(rectElement1,rectElement2,rectElement3,rectElement4);
  // svgHover(svgElement,g_sStroke,g_sStrokeW,g_sFill,"black",0.2,g_sHover,[rectElement1,rectElement2,rectElement3,rectElement4]);
  // svgClick(svgElement,g_sStroke,g_sStrokeW,g_sFill,"black",0.6,g_sClicked,func);

  //------------------------------ hovered css
  var c_hover = {
    "fill":g_sHover,
      "stroke":"white",
      "stroke-width":"0.8px",
  };
  svgElement.hovered(c_hover,g_fDuration);
  //------------------------------ clicked css
  var c_click = {
    "fill":g_sClicked,
      "stroke":"white",
      "stroke-width":"1.2px"
  };
  svgElement.clicked(c_click);

  return svgElement;
}

function icon_tileblocks_1_3(func){
  var svgElement = svg(g_fWidth,g_fHeight);
  var oneThirdSize = size( (g_fWidth - g_fOuterP*2 - g_fInnerP*2)*0.33, (g_fHeight - g_fOuterP*2 - g_fInnerP)*0.5 );
  var rectElement1 = rect( rt( g_fOuterP, g_fOuterP, g_fWidth - g_fOuterP*2, oneThirdSize.height ),g_sStroke,g_sStrokeW,g_sFill);
  var rt1 = rt( g_fOuterP, g_fHeight*0.5 + g_fInnerP*0.5, oneThirdSize.width, oneThirdSize.height );
  var rectElement2 = rect(rt1,g_sStroke,g_sStrokeW,g_sFill);
  var rectElement3 = rect( moveRt(rt1, oneThirdSize.width + g_fInnerP, 0 ),g_sStroke,g_sStrokeW,g_sFill);
  var rectElement4 = rect( moveRt(rt1, oneThirdSize.width*2 + g_fInnerP*2, 0 ),g_sStroke,g_sStrokeW,g_sFill);
  svgElement.append(rectElement1,rectElement2,rectElement3,rectElement4);
  // svgHover(svgElement,g_sStroke,g_sStrokeW,g_sFill,"black",0.2,g_sHover,[rectElement1,rectElement2,rectElement3,rectElement4]);
  // svgClick(svgElement,g_sStroke,g_sStrokeW,g_sFill,"black",0.6,g_sClicked,func);

  //------------------------------ hovered css
  var c_hover = {
    "fill":g_sHover,
      "stroke":"white",
      "stroke-width":"0.8px",
  };
  svgElement.hovered(c_hover,g_fDuration);
  //------------------------------ clicked css
  var c_click = {
    "fill":g_sClicked,
      "stroke":"white",
      "stroke-width":"1.2px"
  };
  svgElement.clicked(c_click);

  return svgElement;
}


function icon_tileblocks_1_2(color1,color2,color3,color4){
  var svgElement = svg(g_fWidth,g_fHeight);
  var fRatio = 0.28; //--------------- 이것만 변경시키면 모양이 변한다.
  var oneThirdSize = size( (g_fWidth - g_fOuterP*2 - g_fInnerP*2)*fRatio, (g_fHeight - g_fOuterP*2 - g_fInnerP)*fRatio );
  var rectOuter = rect( rt( 0, 0, g_fWidth, g_fHeight ),g_sStroke,g_sStrokeW,color4);
  var rectElement1 = rect( rt( g_fOuterP, g_fOuterP, g_fWidth - g_fOuterP*2, oneThirdSize.height ),g_sStroke,g_sStrokeW,color1);
  var rt1 = rt( g_fOuterP, g_fOuterP + oneThirdSize.height + g_fInnerP, oneThirdSize.width, g_fHeight - g_fOuterP*2 - oneThirdSize.height );
  var rectElement2 = rect(rt1,g_sStroke,g_sStrokeW,color2);
  rt1.width = g_fWidth - g_fOuterP*2 - oneThirdSize.width;
  rt1.height = g_fHeight - g_fOuterP*2 - oneThirdSize.height;
  var rectElement3 = rect( moveRt(rt1, oneThirdSize.width + g_fInnerP, 0 ),g_sStroke,g_sStrokeW,color3);
  //var rectElement4 = rect( moveRt(rt1, oneThirdSize.width*2 + g_fInnerP*2, 0 ),g_sStroke,g_sStrokeW,g_sFill);
  svgElement.append(rectOuter,rectElement1,rectElement2,rectElement3);
  // setSvgColor(rectElement1,color1,g_sStrokeW,color1);
  // setSvgColor(rectElement2,color2,g_sStrokeW,color2);
  // setSvgColor(rectElement3,color3,g_sStrokeW,color3);
  //svgHover(svgElement,g_sStroke,g_sStrokeW,g_sFill,"black",0.2,g_sHover,[rectElement1,rectElement2,rectElement3]);
  //svgClick(svgElement,g_sStroke,g_sStrokeW,g_sFill,"black",0.6,g_sClicked,func);

  //------------------------------ hovered css
  var c_hover = {
    "fill":g_sHover,
      "stroke":"white",
      "stroke-width":"0.8px",
  };
  svgElement.hovered(c_hover,g_fDuration);
  //------------------------------ clicked css
  var c_click = {
    "fill":g_sClicked,
      "stroke":"white",
      "stroke-width":"1.2px"
  };
  svgElement.clicked(c_click);

  return svgElement;
}

function icon_tileblocks_3_1_left(func){
  var svgElement = svg(g_fWidth,g_fHeight);
  var oneThirdSize = size( (g_fWidth - g_fOuterP*2 - g_fInnerP)*0.5, (g_fHeight - g_fOuterP*2 - g_fInnerP*2)*0.33 );
  var rt1 = rt( g_fOuterP, g_fOuterP, oneThirdSize.width, oneThirdSize.height );
  var rectElement1 = rect(rt1,g_sStroke,g_sStrokeW,g_sFill);
  var rectElement2 = rect( moveRt(rt1, 0, oneThirdSize.height + g_fInnerP ),g_sStroke,g_sStrokeW,g_sFill);
  var rectElement3 = rect( moveRt(rt1, 0, oneThirdSize.height*2 + g_fInnerP*2 ),g_sStroke,g_sStrokeW,g_sFill);
  var rectElement4 = rect( rt( g_fWidth*0.5 + g_fInnerP*0.5, g_fOuterP , oneThirdSize.width, g_fHeight - g_fOuterP*2  ),g_sStroke,g_sStrokeW,g_sFill);
  svgElement.append(rectElement1,rectElement2,rectElement3,rectElement4);
  // svgHover(svgElement,g_sStroke,g_sStrokeW,g_sFill,"black",0.2,g_sHover,[rectElement1,rectElement2,rectElement3,rectElement4]);
  // svgClick(svgElement,g_sStroke,g_sStrokeW,g_sFill,"black",0.6,g_sClicked,func);

  //------------------------------ hovered css
  var c_hover = {
    "fill":g_sHover,
      "stroke":"white",
      "stroke-width":"0.8px",
  };
  svgElement.hovered(c_hover,g_fDuration);
  //------------------------------ clicked css
  var c_click = {
    "fill":g_sClicked,
      "stroke":"white",
      "stroke-width":"1.2px"
  };
  svgElement.clicked(c_click);

  return svgElement;
}

function icon_tileblocks_3_1_right(func){
  var svgElement = svg(g_fWidth,g_fHeight);
  var oneThirdSize = size( (g_fWidth - g_fOuterP*2 - g_fInnerP)*0.5, (g_fHeight - g_fOuterP*2 - g_fInnerP*2)*0.33 );
  var rectElement1 = rect( rt( g_fOuterP, g_fOuterP , oneThirdSize.width, g_fHeight - g_fOuterP*2  ),g_sStroke,g_sStrokeW,g_sFill);
  var rt1 = rt( g_fWidth*0.5 + g_fInnerP*0.5, g_fOuterP, oneThirdSize.width, oneThirdSize.height );
  var rectElement2 = rect(rt1,g_sStroke,g_sStrokeW,g_sFill);
  var rectElement3 = rect( moveRt(rt1, 0, oneThirdSize.height + g_fInnerP ),g_sStroke,g_sStrokeW,g_sFill);
  var rectElement4 = rect( moveRt(rt1, 0, oneThirdSize.height*2 + g_fInnerP*2 ),g_sStroke,g_sStrokeW,g_sFill);
  svgElement.append(rectElement1,rectElement2,rectElement3,rectElement4);
  // svgHover(svgElement,g_sStroke,g_sStrokeW,g_sFill,"black",0.2,g_sHover,[rectElement1,rectElement2,rectElement3,rectElement4]);
  // svgClick(svgElement,g_sStroke,g_sStrokeW,g_sFill,"black",0.6,g_sClicked,func);

  //------------------------------ hovered css
  var c_hover = {
    "fill":g_sHover,
      "stroke":"white",
      "stroke-width":"0.8px",
  };
  svgElement.hovered(c_hover,g_fDuration);
  //------------------------------ clicked css
  var c_click = {
    "fill":g_sClicked,
      "stroke":"white",
      "stroke-width":"1.2px"
  };
  svgElement.clicked(c_click);
  
  return svgElement;
}

function icon_tileblocks_2(func){
  var svgElement = svg(g_fWidth,g_fHeight);
  var sizeArea = size( g_fWidth - g_fOuterP*2, g_fHeight - g_fOuterP*2 - g_fInnerP );
  var rt1 = rt( g_fOuterP, g_fOuterP, sizeArea.width, sizeArea.height*0.5 );
  var rectElement1 = rect( rt1, g_sStroke, g_sStrokeW, g_sFill );
  var rectElement2 = rect( moveRt(rt1,0,sizeArea.height*0.5 + g_fInnerP),g_sStroke,g_sStrokeW,g_sFill);
  svgElement.append(rectElement1,rectElement2);
  // svgHover(svgElement,g_sStroke,g_sStrokeW,g_sFill,"black",0.2,g_sHover,[rectElement1,rectElement2]);
  // svgClick(svgElement,g_sStroke,g_sStrokeW,g_sFill,"black",0.6,g_sClicked,func);

  //------------------------------ hovered css
  var c_hover = {
    "fill":g_sHover,
      "stroke":"white",
      "stroke-width":"0.8px",
  };
  svgElement.hovered(c_hover,g_fDuration);
  //------------------------------ clicked css
  var c_click = {
    "fill":g_sClicked,
      "stroke":"white",
      "stroke-width":"1.2px"
  };
  svgElement.clicked(c_click);

  return svgElement;
}

function icon_tileblocks_2_Vertical(func){
  var svgElement = svg(g_fWidth,g_fHeight);
  var sizeArea = size( g_fWidth - g_fOuterP*2 - g_fInnerP, g_fHeight - g_fOuterP*2);
  var rt1 = rt( g_fOuterP, g_fOuterP, sizeArea.width*0.5, sizeArea.height );
  var rectElement1 = rect( rt1, g_sStroke, g_sStrokeW, g_sFill);
  var rectElement2 = rect( moveRt(rt1,sizeArea.width*0.5 + g_fInnerP,0),g_sStroke,g_sStrokeW,g_sFill);
  svgElement.append(rectElement1,rectElement2);
  // svgHover(svgElement,g_sStroke,g_sStrokeW,g_sFill,"black",0.2,g_sHover,[rectElement1,rectElement2]);
  // svgClick(svgElement,g_sStroke,g_sStrokeW,g_sFill,"black",0.6,g_sClicked,func);

  //------------------------------ hovered css
  var c_hover = {
    "fill":g_sHover,
      "stroke":"white",
      "stroke-width":"0.8px",
  };
  svgElement.hovered(c_hover,g_fDuration);
  //------------------------------ clicked css
  var c_click = {
    "fill":g_sClicked,
      "stroke":"white",
      "stroke-width":"1.2px"
  };
  svgElement.clicked(c_click);

  return svgElement;
}


function icon_tileblocks_taps(func){
  var svgElement = svg(g_fWidth,g_fHeight);
  var sizeArea = size( g_fWidth - g_fOuterP*2, g_fHeight - g_fOuterP*2);
  var rt1 = rt( g_fOuterP, g_fOuterP, sizeArea.width, sizeArea.height );
  var rectElement1 = rect( rt1, g_sStroke, g_sStrokeW,g_sFill);
  var tabPadding = 1.0;
  var sizeTab = size(sizeArea.width*0.26, sizeArea.height*0.2);
  var totalMargin = g_fWidth - sizeTab.width*3 - tabPadding*2;
  var rtTab = rt( totalMargin*0.5, totalMargin*0.5, sizeTab.width, sizeTab.height );
  var rectElement2 = rect( rtTab,g_sStroke2,g_sStrokeW2,g_sFill2);
  var rectElement3 = rect( moveRt(rtTab,rtTab.width + tabPadding, 0),g_sStroke2,g_sStrokeW2,g_sFill2);
  var rectElement4 = rect( moveRt(rtTab,rtTab.width*2 + tabPadding*2, 0),g_sStroke2,g_sStrokeW2,g_sFill2);
  svgElement.append(rectElement1,rectElement2,rectElement3,rectElement4);
  // svgHover(svgElement,g_sStroke,g_sStrokeW,g_sFill,"black",0.2,g_sHover,[rectElement1]);
  // svgClick(svgElement,g_sStroke,g_sStrokeW,g_sFill,"black",0.6,g_sClicked,func);

  //------------------------------ hovered css
  var c_hover = {
    "fill":g_sHover,
      "stroke":"white",
      "stroke-width":"0.8px",
  };
  svgElement.hovered(c_hover,g_fDuration);
  //------------------------------ clicked css
  var c_click = {
    "fill":g_sClicked,
      "stroke":"white",
      "stroke-width":"1.2px"
  };
  svgElement.clicked(c_click);

  return svgElement;
}

function icon_tileblocks_fullSource(func){
  var svgElement = svg(g_fWidth,g_fHeight);
  var rectElement1 = rect( paddingRt( rt(0,0,g_fWidth,g_fHeight), g_fOuterP ),g_sStroke,g_sStrokeW,g_sFill);
  var text1 = text( "Full", g_fWidth*0.16, g_fHeight*0.47, 11, g_sStroke2, 0, g_sFill2 );
  var text2 = text( "Code", g_fWidth*0.12, g_fHeight*0.86, 9, g_sStroke2, 0, g_sFill2 );
  svgElement.append(rectElement1,text1,text2);
  // svgHover(svgElement,g_sStroke,g_sStrokeW,g_sFill,"black",0.2,g_sHover,[rectElement1]);
  // svgClick(svgElement,g_sStroke,g_sStrokeW,g_sFill,"black",0.6,g_sClicked,func);

  //------------------------------ hovered css
  var c_hover = {
    "fill":g_sHover,
      "stroke":"white",
      "stroke-width":"0.8px",
  };
  svgElement.hovered(c_hover,g_fDuration);
  //------------------------------ clicked css
  var c_click = {
    "fill":g_sClicked,
      "stroke":"white",
      "stroke-width":"1.2px"
  };
  svgElement.clicked(c_click);

  return svgElement;
}



function icon_palette(color1,color2,color3,color4){
  var svgElement = svg(g_fWidth,g_fHeight);
  var fGap = 1.0;
  svgElement.attr("viewBox","-" + fGap +  " -" + fGap + " " + (g_fWidth + fGap*2) + " " + (g_fHeight + fGap*2));
  var fStroke = 0;
  var fRatio = 0.28; //--------------- 이것만 변경시키면 모양이 변한다.
  var oneThirdSize = size( (g_fWidth - g_fOuterP*2 - g_fInnerP*2)*fRatio, (g_fHeight - g_fOuterP*2 - g_fInnerP)*fRatio );
  var rectOuter = circle(  g_fWidth*0.5, g_fHeight*0.5, g_fHeight*0.5,g_sStroke,fStroke,color3);
  var rectElement1 = circle(  g_fWidth*0.48, g_fHeight*0.235, g_fHeight*0.185,g_sStroke,fStroke,color4);
  var rectElement2 = circle(  g_fWidth*0.18, g_fHeight*0.5, g_fHeight*0.14,g_sStroke,fStroke,color2);
  var rectElement3 = circle(  g_fWidth*0.6, g_fHeight*0.7, g_fHeight*0.24,g_sStroke,fStroke,color1);
  svgElement.append(rectOuter,rectElement1,rectElement2,rectElement3);

  //------------------------------ skip elements =>아래 css효과들이 안먹힐놈을 선택
  svgElement.each(function(item,index){
    if( index != 0 ) 
      item.skipCss(); // ""값을 넣으면 속성에 안들어가므로 "myColor"라고 그냥 값을 넣음
  });
  svgElement.skipCss();
//------------------------------ hovered css
  var c_hover = {
    "fill":g_sHover,
      "stroke":"white",
      "stroke-width":"1.0px",
  };
  svgElement.hovered(c_hover,g_fDuration);
  //svgElement.hovered("fill","blue");
  //------------------------------ clicked css
  var c_click = {
    "fill":g_sClicked,
      "stroke":"white",
      "stroke-width":"1.4px"
  };
  svgElement.clicked(c_click);
  //------------------------------ selected css
  // var c_select = {
  //   //"fill":"blue",
  //     "stroke":"white",
  //     "stroke-width":"1.0px"
  // };
  // svgElement.selected(c_select);

  return svgElement;
}


function fxCreatePlayButton(func){
  var attr_ = {
    "viewBox":"0 0 193 193", /* 아래 path의 사각이다. */
    "preserveAspectRatio":"none"
  };
  var svgElement = svg(g_fWidth,g_fHeight,attr_);
  //var polygon1 = polygon("0,0 9144,0 9144,9144 0,9144 ",g_sStroke,g_sStrokeW,g_sFill);
  var path1 = path("m 96.611228,0.44075873 c 53.021742,0 95.804802,43.14873027 95.804802,96.17047027 0,53.021741 -42.78306,95.804801 -95.804802,95.804801 -53.021743,0 -96.17046927,-42.78306 -96.17046927,-95.804801 0,-53.02174 43.14872627,-96.17047027 96.17046927,-96.17047027 z",
    g_sStroke,g_sStrokeW,g_sFill); // white
  var path2 = path("m 96.611228,18.358449 c 43.148722,0 78.252782,35.10405 78.252782,78.25278 0,43.148731 -35.10406,78.252781 -78.252782,78.252781 -43.148728,0 -78.252777,-35.10405 -78.252777,-78.252781 0,-43.14873 35.104049,-78.25278 78.252777,-78.25278 z",
    g_sStroke2,g_sStrokeW2,g_sFill2); // black
  var path3 = path("M 140.12563,97.708229 62.238512,55.290839 v 84.469121 z",
    g_sStroke,g_sStrokeW,g_sFill); // white
  svgElement.append(path1,path2,path3);

  // svgHover(svgElement,g_sStroke2,g_sStrokeW2,g_sFill2,g_sStroke2,10,g_sHover,[path2]);
  // svgClick(svgElement,g_sStroke2,g_sStrokeW2,g_sFill2,g_sStroke2,20,g_sClicked,func);

  //------------------------------ skip elements =>아래 css효과들이 안먹힐놈을 선택
  svgElement.each(function(item,index){
    if( index != 1 ) 
      item.skipCss(); // ""값을 넣으면 속성에 안들어가므로 "myColor"라고 그냥 값을 넣음
  });
  svgElement.skipCss();
  //------------------------------ hovered css
  var c_hover = {
    "fill":g_sHover,
      "stroke":"white",
      "stroke-width":"4.0px",
  };
  svgElement.hovered(c_hover,g_fDuration);
  //------------------------------ clicked css
  var c_click = {
    "fill":g_sClicked,
      "stroke":"white",
      "stroke-width":"10.0px"
  };
  svgElement.clicked(c_click);
  //------------------------------ selected css
  var c_select = {
    "fill":"blue",
      "stroke":"white",
      "stroke-width":"4.0px"
  };
  svgElement.selected(c_select);

    if( is(func) )
      svgElement.onclick(func);

  return svgElement;
}


function fxCreatePlusButton(w,h,func){
  var attr_ = {
    "viewBox":"0 0 40 40", /* 아래 path의 사각이다. */
    "preserveAspectRatio":"none"
  };
  var svgElement = svg(w,h,attr_);
  //var polygon1 = polygon("0,0 9144,0 9144,9144 0,9144 ",g_sStroke,g_sStrokeW,g_sFill);
  var path1 = path("m 11.761442,21.437443 c 0,0.63253 0.0602,1.265099 0.51205,1.3554 0.75302,0 1.506,0.0301 2.259,0.0301 0.39157,0 0.75302,-0.0301 1.1446,-0.0301 0.45181,0 0.8735,0.0301 1.2651,0.0301 0.24097,0 0.48193,-0.0301 0.7229,-0.0301 v 4.9786 c 0.0156,0.859379 0.75791,0.59375 3.6747,0.59375 0.8735,0 1.1145,-0.12049 1.1145,-0.78314 v -2.5301 c 0,-0.84338 -0.0301,-1.686801 -0.0602,-2.5301 h 5.5723 c 0.1506,0 0.21084,-0.48194 0.21084,-0.8735 v -0.51206 c 0,-0.8735 0.0301,-1.747 0.0301,-2.6205 0,-0.45181 -0.0904,-0.66266 -0.42169,-0.69278 h -5.3012 c 0,-1.8374 0.0301,-3.5844 0.0301,-5.421699 -0.0904,-0.36144 -0.75301,-0.42169 -1.4458,-0.42169 h -2.7109 c -0.81326,0 -0.87351,0.24097 -0.90363,0.90363 v 4.819299 h -4.8494 c -0.78314,0 -0.84338,0.27109 -0.84338,1.0844 0,0.63253 0.0301,1.235 0.0301,1.8675 0,0.12048 0,0.24097 -0.0301,0.36145 v 0.42169",
    g_sStroke,g_sStrokeW,g_sFill); // white
  svgElement.append(path1);

  // svgHover(svgElement,g_sStroke2,g_sStrokeW2,g_sFill2,g_sStroke2,10,g_sHover,[path2]);
  // svgClick(svgElement,g_sStroke2,g_sStrokeW2,g_sFill2,g_sStroke2,20,g_sClicked,func);

  //------------------------------ skip elements =>아래 css효과들이 안먹힐놈을 선택
  // svgElement.each(function(item,index){
  //   if( index != 1 ) 
  //     item.skipCss(); // ""값을 넣으면 속성에 안들어가므로 "myColor"라고 그냥 값을 넣음
  // });
  svgElement.skipCss();
  //------------------------------ hovered css
  var c_hover = {
    "fill":"white",
      "stroke":"white",
      "stroke-width":"3.0px",
  };
  svgElement.hovered(c_hover,g_fDuration);
  //------------------------------ clicked css
  var c_click = {
    "fill":g_sClicked,
      "stroke":"white",
      "stroke-width":"2.0px"
  };
  svgElement.clicked(c_click);
  //------------------------------ selected css
  // var c_select = {
  //   "fill":"blue",
  //     "stroke":"white",
  //     "stroke-width":"4.0px"
  // };
  // svgElement.selected(c_select);

    if( is(func) )
      svgElement.onclick(func);

  return svgElement;
}



function fxCreateXButton(w,h,func){
  var attr_ = {
    "viewBox":"0 0 44 44", /* 아래 path의 사각이다. */
    "preserveAspectRatio":"none"
  };
  var svgElement = svg(w,h,attr_);
  //var polygon1 = polygon("0,0 9144,0 9144,9144 0,9144 ",g_sStroke,g_sStrokeW,g_sFill);
  var path1 = path("m 1.953895,6.74275 c -1.213682,1.222802 -2.311738,2.561448 -1.614889,3.606807 1.449737,1.45087 2.841401,2.96013 4.291076,4.41094 0.75384,0.75438 1.50769,1.39235 2.26158,2.14684 0.86983,0.87054 1.62364,1.74141 2.37754,2.49591 0.46424,0.46452 0.98581,0.87013 1.44977,1.33438 L 1.1662,30.362167 c -1.61983,1.69047 0.319906,2.6081 5.935272,8.22787 1.68172,1.68304 2.37685,1.91441 3.64833,0.63339 l 4.85466,-4.89114 c 1.61826,-1.63041 3.17837,-3.31914 4.73899,-5.00692 l 10.72786,10.73623 c 0.29032,0.29049 1.33075,-0.52538 2.08207,-1.2823 l 0.98253,-0.9899 c 1.67604,-1.68862 3.41028,-3.31901 5.08633,-5.00764 0.86695,-0.87343 1.09758,-1.45509 0.51746,-2.15173 l -10.20594,-10.21395 c 3.52553,-3.55202 6.93583,-6.87103 10.46119,-10.42287 0.51961,-0.872803 -0.64054,-2.265999 -1.97432,-3.600798 l -5.21906,-5.223134 c -1.56566,-1.566882 -2.14404,-1.217087 -3.47349,0.0054 l -9.24711,9.316562 -9.33611,-9.343383 C 9.237122,-0.361063 8.600942,0.046954 7.040422,1.619178 5.826742,2.84197 4.728952,4.064916 3.515333,5.287645 3.284084,5.520573 3.052938,5.753501 2.763646,5.928146 L 1.954532,6.743395",
    "#aaa",g_sStrokeW,g_sFill); // white
  svgElement.append(path1);

  // svgHover(svgElement,g_sStroke2,g_sStrokeW2,g_sFill2,g_sStroke2,10,g_sHover,[path2]);
  // svgClick(svgElement,g_sStroke2,g_sStrokeW2,g_sFill2,g_sStroke2,20,g_sClicked,func);

  //------------------------------ skip elements =>아래 css효과들이 안먹힐놈을 선택
  // svgElement.each(function(item,index){
  //   if( index != 1 ) 
  //     item.skipCss(); // ""값을 넣으면 속성에 안들어가므로 "myColor"라고 그냥 값을 넣음
  // });
  svgElement.skipCss();
  svgElement.normal({"fill":"#f2f2f2"});
  //------------------------------ hovered css
  var c_hover = {
    "fill":"white",
      // "stroke":"white",
      // "stroke-width":"3.0px",
  };
  //svgElement.hovered(c_hover,g_fDuration);
  //------------------------------ clicked css
  var c_click = {
    "fill":g_sClicked,
      // "stroke":"white",
      // "stroke-width":"2.0px"
  };
  //svgElement.clicked(c_click);
  //------------------------------ selected css
  // var c_select = {
  //   "fill":"blue",
  //     "stroke":"white",
  //     "stroke-width":"4.0px"
  // };
  // svgElement.selected(c_select);

    if( is(func) )
      svgElement.onclick(func);

  return svgElement;
}


function fxCreateSVG_newFile(func){
  var attr_ = {
    "viewBox":"-1 -1 42.2 42.2", /* 아래 path의 사각이다. */
    "preserveAspectRatio":"none"
  };
  var svgElement = svg(g_fWidth,g_fHeight,attr_);
  //var polygon1 = polygon("0,0 9144,0 9144,9144 0,9144 ",g_sStroke,g_sStrokeW,g_sFill);
  var path1 = path("M 2.8153989,0 C 1.2479954,0 0,0.9727001 0,2.1794945 V 37.820503 C 0,39.0273 1.2479954,40 2.8153989,40 H 37.184257 c 1.567403,0 2.815398,-0.9727 2.815398,-2.179497 V 11.03962 H 29.64597 c -2.119918,0 -3.969215,-1.1906115 -3.969215,-2.7717504 V 1.8890694e-4 Z M 27.646323,0 v 8.2676787 c 0,0.649718 0.803444,1.2555791 1.999992,1.2555791 H 40 Z",
    g_sStroke,g_sStrokeW,g_sFill); // white
  var path2 = path("m 29.244131,20.948612 c -6.569299,0 -11.889204,4.471345 -11.889204,9.99235 0,5.521005 5.320139,10.00765 11.889204,10.00765 6.569063,0 11.907406,-4.48679 11.907406,-10.00765 0,-5.52086 -5.338517,-9.99235 -11.907406,-9.99235 z m -2.054926,3.469542 h 4.10985 v 4.811132 h 5.724433 v 3.43875 h -5.724433 v 4.826525 h -4.091531 v -4.811129 h -5.742747 v -3.454146 h 5.724428 z",
    g_sStroke2,g_sStrokeW2,g_sFill2); // black
  svgElement.append(path1,path2);
  // svgHover(svgElement,g_sStroke2,g_sStrokeW2,g_sFill2,g_sStroke2,g_sStrokeW2,g_sHover,[path2]);
  // svgClick(svgElement,g_sStroke2,g_sStrokeW2,g_sFill2,g_sStroke2,g_sStrokeW2,g_sClicked,func);

    //------------------------------ skip elements =>아래 css효과들이 안먹힐놈을 선택
    svgElement.each(function(item,index){
      if( index == 1 )  // 0번은 제외
        item.skipCss(); // ""값을 넣으면 속성에 안들어가므로 "myColor"라고 그냥 값을 넣음
    });
    svgElement.skipCss();
  //------------------------------ hovered css
    var c_hover = {
      "fill":g_sHover,
       "stroke":"white",
       "stroke-width":"1.4px",
    };
    svgElement.hovered(c_hover,g_fDuration);
    //------------------------------ clicked css
    var c_click = {
      "fill":g_sClicked,
       "stroke":"white",
       "stroke-width":"1.8px"
    };
    svgElement.clicked(c_click);
    //------------------------------ selected css
    // var c_select = {
    //   "fill":g_sClicked,
    //     "stroke":"white",
    //     "stroke-width":"1.0px"
    // };
    // svgElement.selected(c_select);

  if( is(func) )
    svgElement.onclick(func);

  return svgElement;
}

function fxCreateSVG_Resize(func){
  var fWidth = 40;
  var fHeight = 40;
  var attr_ = {
    "viewBox":"0 0 " + fWidth + " " + fHeight, /* 아래 path의 사각이다. */
    "preserveAspectRatio":"none"
  };
  var svgElement = svg(g_fWidth,g_fHeight,attr_);
  //var polygon1 = polygon("0,0 9144,0 9144,9144 0,9144 ",g_sStroke,g_sStrokeW,g_sFill);
  var path_Outer = path("m 1.3263115,0.49156049 c -0.47862029,0 -0.83475101,0.35167213 -0.83475101,0.82430021 V 38.684139 c 0,0.472628 0.35613072,0.824301 0.83475101,0.824301 H 38.673688 c 0.478621,0 0.834751,-0.351673 0.834751,-0.824301 V 1.3158607 c 0,-0.47262808 -0.35613,-0.82430021 -0.834751,-0.82430021 z",
    g_sStroke,g_sStrokeW,g_sFill); // white
  var path1 = path("M 1.9446454,1.9264535 V 14.626784 l 3.9882052,-3.938275 7.9146764,7.876646 4.915805,-4.915222 -7.914676,-7.815588 3.957338,-3.9077938 H 1.9446454 Z",
    g_sStroke2,g_sStrokeW2,g_sFill2); // black
  var path2 = path("M 38.550021,1.9264535 V 14.626784 L 34.561816,10.688509 26.64714,18.565155 21.731335,13.649933 29.646011,5.834345 25.688673,1.9265512 h 12.861348 z",
    g_sStroke2,g_sStrokeW2,g_sFill2); // black
  var path3 = path("M 1.9446454,38.103831 V 25.403502 l 3.9882052,3.938274 7.9146764,-7.876646 4.915805,4.915222 -7.914676,7.815588 3.957338,3.907794 H 1.9446454 Z",
    g_sStroke2,g_sStrokeW2,g_sFill2); // black
  var path4 = path("M 38.550021,38.103831 V 25.403502 l -3.988205,3.938274 -7.914676,-7.876646 -4.915805,4.915222 7.914676,7.815588 -3.957338,3.907794 h 12.861348 z",
    g_sStroke2,g_sStrokeW2,g_sFill2); // black
  svgElement.append(path_Outer,path1,path2,path3,path4);
  svgHover(svgElement,g_sStroke2,g_sStrokeW2,g_sFill2,g_sStroke2,g_sStrokeW2,g_sHover,[path1,path2,path3,path4]);
  svgClick(svgElement,g_sStroke2,g_sStrokeW2,g_sFill2,g_sStroke2,g_sStrokeW2,g_sClicked,func);
  return svgElement;
}

function fxCreateCloseButton(fWidth_,fHeight_,func){
  var attr_ = {
    "viewBox":"0 0 40 40", /* 아래 path의 사각이다. */
    "preserveAspectRatio":"none"
  };
  var svgElement = svg(fWidth_,fHeight_,attr_);
  //var polygon1 = polygon("0,0 9144,0 9144,9144 0,9144 ",g_sStroke,g_sStrokeW,g_sFill);
  var fWidth = 40;
  var fHeight = 40;
  var fStroke = 4.0;
  var center = pt(fWidth*0.5,fHeight*0.5);
  var circle1 = circle(center.x,center.y,fWidth*0.5,g_sStroke,g_sStrokeW,g_sFill);
  var sColor = "purple";
  var path2 = path("m 12.893,10.5 -2.39285,2.39285 7.107,7.107 -7.107,7.107 2.39285,2.39285 7.107,-7.107 7.107,7.107 2.39285,-2.39285 -7.107,-7.107 7.107,-7.107 L 27.107,10.5 20,17.607 Z",
  sColor,fStroke,g_sFill2); // black
  svgElement.append(circle1,path2);
  svgHover(svgElement,sColor,fStroke,g_sFill2,g_sHover,fStroke*1.6,g_sHover,[path2]);
  svgClick(svgElement,sColor,fStroke,g_sFill2,g_sHover,fStroke,g_sHover,func);
  return svgElement;
}

function fxCreateIcon_maximize(func,width,height,bCircle){
  var svgElement = svg(width,height);
  var center = pt(width*0.5,height*0.5);
  if( bCircle ){
    var rectElement1 = rect( paddingRt( rt( 0, 0, width, height ), width*0.18 ),g_sStroke2,g_sStrokeW2,g_sFill2);
    var circle1 = circle(center.x,center.y,width*0.5,g_sStroke,g_sStrokeW,g_sFill);
    svgElement.append(circle1,rectElement1);  
    svgHover(svgElement,g_sStroke2,g_sStrokeW2,g_sFill2,g_sStroke2,g_sStrokeW2,g_sHover,[circle1]);
  }else{
    var rt1 = paddingRt( rt( width, height ), width*0.18 );
    var rt2 = paddingRt( rt( width, height ), width*0.12 );
    rt1 = moveRt( resizeRt( rt1, 0, height*0.06, true ), 0, height*0.02 );
    var rectElement1 = rect( rt1, g_sStroke2, g_sStrokeW2, g_sFill2 );
    var rectElement2 = rect( rt2, g_sStroke, g_sStrokeW, g_sFill );
    svgElement.append(rectElement2,rectElement1);
    svgHover(svgElement,g_sStroke2,g_sStrokeW2,g_sFill2,g_sStroke2,g_sStrokeW2,g_sHover,[rectElement1]);
  }
  
  svgClick(svgElement,g_sStroke2,g_sStrokeW2,g_sFill2,g_sStroke2,2,g_sClicked,func);
  return svgElement;
}

function fxCreateIcon_minizie(func,width,height,bCircle){
  var svgElement = svg(width,height);
  if( bCircle ){
    var center = pt(width*0.5,height*0.5);
    var padding =  width*0.1;
    var padding2 =  width*0.36;
    var rt1 = rt( padding, padding2, width - padding*2, height - padding2*2 ) ;
    var circle1 = circle(center.x,center.y,width*0.5,g_sStroke,g_sStrokeW,g_sFill);
    var rectElement1 = rect( rt1,g_sStroke2,g_sStrokeW2,g_sFill2);
    svgElement.append(circle1,rectElement1);
    svgHover(svgElement,g_sStroke2,g_sStrokeW2,g_sFill2,g_sStroke2,g_sStrokeW2,g_sHover,[circle1]);
  }else{
    var rt1 = moveRt( centerRt( rt(width*0.75,height*0.24), width*0.5, height*0.5 ), 0, height*0.18 );
    var rectElement2 = rect( paddingRt( rt( width, height ), 0, height*0.12 ),g_sStroke,g_sStrokeW,g_sFill);
    var rectElement1 = rect( rt1,g_sStroke2,g_sStrokeW2,g_sFill2);
    svgElement.append(rectElement2,rectElement1);
    svgHover(svgElement,g_sStroke2,g_sStrokeW2,g_sFill2,g_sStroke2,g_sStrokeW2,g_sHover,[rectElement1]);
  }
  
  svgClick(svgElement,g_sStroke2,g_sStrokeW2,g_sFill2,g_sStroke2,2,g_sClicked,func);
  return svgElement;
}


function icon_smileFace(func){
  var attr_ = {
    "viewBox":"0 0 68.666033 68.666033", /* 아래 path의 사각이다. */
    "preserveAspectRatio":"none"
  };

  var svgElement = svg(g_fWidth,g_fHeight,attr_);
  svgElement.html('<circle \
  style="color:#000000;fill:#ffcb00;fill-rule:evenodd;stroke:#ffffff;stroke-width:5;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" \
  id="' + g_sID_changeable + '" \
  r="31.833" \
  cy="34.333" \
  cx="34.333" /> \
<path \
  style="fill:none;stroke:#555753;stroke-width:1.76420748" \
  inkscape:connector-curvature="0" \
  id="path4" \
  d="m 37.156383,21.121863 a 5.1823222,5.0720217 14.999991 0 1 4.978148,-3.738156 5.1823222,5.0720217 14.999991 0 1 5.018955,3.791399" /> \
<path \
  style="fill:none;stroke:#555753;stroke-width:1.76420748" \
  inkscape:connector-curvature="0" \
  id="path6" \
  d="m 21.720329,21.121941 a 5.1823222,5.0720217 14.999991 0 1 4.978148,-3.738157 5.1823222,5.0720217 14.999991 0 1 5.018955,3.791399" /> \
<path \
  style="color:#000000;fill:#ffffff" \
  inkscape:connector-curvature="0" \
  id="path8" \
  d="m 7.7355995,30.699001 c -2.7149,13.349 8.2783995,30.285 26.2009995,30.285 18.076,0 29.116,-14.872 25.967,-30.176 L 7.7335995,30.698621 Z" /> \
<path \
  style="opacity:0.53800001;fill:none;stroke:#000000;stroke-width:1.76419997px;stroke-linecap:square" \
  inkscape:connector-curvature="0" \
  id="path10" \
  d="m 34.748999,31.553001 v 29.733" /> \
<path \
  style="opacity:0.53800001;fill:none;stroke:#000000;stroke-width:1.76419997px;stroke-linecap:square" \
  inkscape:connector-curvature="0" \
  id="path12" \
  d="m 20.635999,31.447001 v 24.808" /> \
<path \
  style="opacity:0.53800001;fill:none;stroke:#000000;stroke-width:1.76419997px;stroke-linecap:square" \
  inkscape:connector-curvature="0" \
  id="path14" \
  d="m 48.862999,31.574001 v 24.554" /> \
<path  \
  style="color:#000000;fill:none;stroke:#d29400;stroke-width:1.76400006"  \
  inkscape:connector-curvature="0" \
  id="path16" \
  d="m 8.1826995,29.942001 c -3.1413,15.563 9.1014995,31.91 26.1259995,31.91 17.649,0 29.377,-16.899 25.355,-32.021 l -51.4799995,0.11114 z" /> \
<path \
  d="m 48.252821,42.513552 a 6.8191837,6.8191837 0 0 0 -6.819183,6.819184 6.8191837,6.8191837 0 0 0 0.08648,1.051617 6.8191837,6.8191837 0 0 0 -4.138474,6.26171 6.8191837,6.8191837 0 0 0 5.230176,6.623108 6.8191837,6.8191837 0 0 0 1.751087,1.650756 25.168125,25.168125 0 0 0 18.057989,-14.980066 6.8191837,6.8191837 0 0 0 -6.755854,-5.94364 6.8191837,6.8191837 0 0 0 -2.592713,0.517309 6.8191837,6.8191837 0 0 0 -4.819443,-1.999741 z" \
  style="color:#000000;isolation:auto;mix-blend-mode:normal;solid-color:#000000;fill:#ffcb00;stroke:#d29400;stroke-width:1.39467132;stroke-linecap:round;stroke-linejoin:round;color-rendering:auto;image-rendering:auto;shape-rendering:auto" \
  id="' + g_sID_changeable + '" \
  inkscape:connector-curvature="0" /> \
<path \
  d="m 41.371969,50.362136 6.568949,4.961678" \
  style="color:#000000;isolation:auto;mix-blend-mode:normal;solid-color:#000000;fill:#ffcb00;stroke:#d29400;stroke-width:1.39467132;stroke-linecap:round;stroke-linejoin:round;color-rendering:auto;image-rendering:auto;shape-rendering:auto" \
  id="path20" \
  inkscape:connector-curvature="0" /> \
<path \
  d="m 53.181609,44.562075 0.209643,8.315846" \
  style="color:#000000;isolation:auto;mix-blend-mode:normal;solid-color:#000000;fill:#ffcb00;stroke:#d29400;stroke-width:1.39467132;stroke-linecap:round;stroke-linejoin:round;color-rendering:auto;image-rendering:auto;shape-rendering:auto" \
  id="path22" \
  inkscape:connector-curvature="0" />');
  
  var stroke = "white";
  var strokeW = 4.0;
  var fill = "#ffcb00";
  var arrChildren = [];
  svgElement.find(g_sID_changeable,function(found){
    arrChildren.push(found);
  });
  setSvgColor(svgElement,stroke,strokeW,fill);
  svgHover(svgElement,stroke,strokeW,fill,stroke,strokeW,g_sHover,arrChildren);
  
  // var width = 68, height = 68;
  // var fontSize = 30;
  // var str = "Sign in";
  // var text1 = text( "Sign", 0, (height - fontSize)*0.7, fontSize, "black", 0, "white" );
  // var text2 = text( "in", width*0.26, (height - fontSize)*1.7, fontSize*1.3, "black", 0, "white" );
  // text1.css("font-weight","bold");
  // text2.css("font-weight","bold");
  //svgElement.append(text1,text2);
  if( is(func) )
    svgElement.onclick(func);
  //setSvgColor(svgElement,"gray",strokeW,"black");
  return svgElement;
}


function icon_Upload(func){
  var attr_ = {
    "viewBox":"-1 0 43 40.6", /* 아래 path의 사각이다. */
    "preserveAspectRatio":"none"
  };

  var svgElement = svg(g_fWidth,g_fHeight,attr_);
  svgElement.html('<defs \
  id="defs8" /> \
<path \
  d="M 19.689287,0.02503325 10.788545,11.557073 h 6.924528 c -0.05613,0.19737 -0.09373,0.40209 -0.09373,0.61778 v 14.20919 c 0,1.25493 1.015514,2.26521 2.276937,2.26521 1.261424,0 2.276938,-1.01028 2.276938,-2.26521 v -14.20919 c 0,-0.2157 -0.03776,-0.42042 -0.09373,-0.61778 h 6.510413 L 19.689161,0.02503325 Z M 0.02503325,16.705123 v 23.26984 H 39.974967 v -23.26984 h -12.89182 v 4.11854 h 7.943505 v 15.03266 H 4.9738496 v -15.03266 h 8.5548924 v -4.11854 H 0.02553521 Z" \
  style="color:#000000;isolation:auto;mix-blend-mode:normal;solid-color:#000000;fill:#ffffff;fill-opacity:1;stroke:#c8c8c8;stroke-width:0.0500665;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;color-rendering:auto;image-rendering:auto;shape-rendering:auto" \
  id="path2" \
  inkscape:connector-curvature="0" />');

    //------------------------------ skip elements =>아래 css효과들이 안먹힐놈을 선택
    // svgElement.each(function(item,index){
    //   if( index == 1 )  // 0번은 제외
    //     item.skipCss(); // ""값을 넣으면 속성에 안들어가므로 "myColor"라고 그냥 값을 넣음
    // });
    svgElement.skipCss();
  //------------------------------ hovered css
    var c_hover = {
      "fill":g_sHover,
        "stroke":"white",
        "stroke-width":"1.0px",
    };
    svgElement.hovered(c_hover,g_fDuration);
    //------------------------------ clicked css
    var c_click = {
      "fill":g_sClicked,
        "stroke":"white",
        "stroke-width":"1.4px"
    };
    svgElement.clicked(c_click);
    //------------------------------ selected css
    // var c_select = {
    //   "fill":g_sClicked,
    //     "stroke":"white",
    //     "stroke-width":"1.0px"
    // };
    // svgElement.selected(c_select);

  if( is(func) )
    svgElement.onclick(func);


  //setSvgColor(svgElement,"gray",strokeW,"black");
  return svgElement;
}

function icon_Download(func){
  var attr_ = {
    "viewBox":"0 0 40 41", /* 아래 path의 사각이다. */
    "preserveAspectRatio":"none"
  };

  var svgElement = svg(g_fWidth,g_fHeight,attr_);
  svgElement.html(' <defs \
  id="defs7"> \
 <linearGradient \
    id="Unbenannter_Verlauf_18" \
    x1="376.56921" \
    y1="463.56921" \
    x2="183.5687" \
    y2="656.5697" \
    gradientUnits="userSpaceOnUse"> \
   <stop \
      offset="0" \
      id="stop2" /> \
   <stop \
      offset="1" \
      stop-opacity="0" \
      id="stop4" /> \
 </linearGradient> \
</defs> \
<rect \
  x="0.064361244" \
  y="36.219742" \
  width="39.871281" \
  height="3.6002312" \
  style="fill:#ffffff;stroke:#c8c8c8;stroke-width:0.12872249;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" \
  id="rect15" /> \
<polygon \
  points="462.209,396.99 422.301,396.99 422.301,219.166 377.699,219.166 377.699,396.99 337.791,396.99 400,477.293 " \
  style="fill:#ffffff;stroke:#c8c8c8;stroke-width:1;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" \
  id="polygon17" \
  transform="matrix(0.12915954,0,0,0.12828692,-31.663807,-28.051988)" />');
  

    //------------------------------ skip elements =>아래 css효과들이 안먹힐놈을 선택
    // svgElement.each(function(item,index){
    //   if( index == 1 )  // 0번은 제외
    //     item.skipCss(); // ""값을 넣으면 속성에 안들어가므로 "myColor"라고 그냥 값을 넣음
    // });
    svgElement.skipCss();
  //------------------------------ hovered css
    var c_hover = {
      "fill":g_sHover,
        "stroke":"white",
        "stroke-width":"0.6px",
    };
    svgElement.hovered(c_hover,g_fDuration);
    //------------------------------ clicked css
    var c_click = {
      "fill":g_sClicked,
        "stroke":"white",
        "stroke-width":"1.0px"
    };
    svgElement.clicked(c_click);
    //------------------------------ selected css
    // var c_select = {
    //   "fill":g_sClicked,
    //     "stroke":"white",
    //     "stroke-width":"1.0px"
    // };
    // svgElement.selected(c_select);

  if( is(func) )
    svgElement.onclick(func);


  //setSvgColor(svgElement,"gray",strokeW,"black");
  return svgElement;
}

function icon_Console(func){
  var attr_ = {
    "viewBox":"0 0 41 40.5", /* 아래 path의 사각이다. */
    "preserveAspectRatio":"none"
  };

  var svgElement = svg(g_fWidth,g_fHeight,attr_);
  svgElement.html( '<rect \
  style="opacity:1;fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:#f0f0f0;stroke-width:0.5;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" \
  id="rect3198" \
  width="39.446297" \
  height="39.446297" \
  x="0.27685139" \
  y="0.27685031" /> \
<path \
  inkscape:connector-curvature="0" \
  style="fill:#000000;fill-opacity:1;stroke-width:1.69832802" \
  id="path26" \
  d="M 6.8005761,8.9600593 C 6.4220389,9.0409402 6.1502887,9.4282068 6.1593955,9.8738059 v 3.8834251 c -0.00496,0.376354 0.191273,0.717181 0.4932159,0.856638 l 9.4697446,4.283192 -9.4697446,4.28319 C 6.3506685,23.319703 6.1544239,23.660535 6.1593955,24.03689 v 3.883425 c -0.0056,0.306765 0.1230604,0.596039 0.3419997,0.768882 0.2189406,0.172842 0.4985034,0.205874 0.7430754,0.08775 L 22.336876,21.581184 c 0.301944,-0.139451 0.498172,-0.480284 0.493217,-0.856637 v -3.65499 c 0.005,-0.376354 -0.191273,-0.717182 -0.493217,-0.856637 L 7.2444706,9.0171667 C 7.1044287,8.9486804 6.9501982,8.9288253 6.8005761,8.9600619 Z" /> \
<path \
  inkscape:connector-curvature="0" \
  style="fill:#000000;fill-opacity:1;stroke-width:1.69832802" \
  id="path28" \
  d="M 6.9434903,13.738592 V 9.8498653 L 22.063991,17.051839 v 3.670889 L 6.9434903,27.924701 V 24.035974 L 18.325178,18.902909 6.9434903,13.738775 Z" /> \
<path \
  inkscape:connector-curvature="0" \
  style="fill:#000000;fill-opacity:1;stroke-width:1.7164253" \
  id="path32" \
  d="m 23.027105,29.063656 c -0.302672,0.111302 -0.505698,0.440428 -0.498472,0.808049 v 2.308709 c 0.009,0.441832 0.316278,0.797504 0.697862,0.808049 h 10.617444 c 0.381581,-0.01053 0.688751,-0.366217 0.697859,-0.808049 v -2.308709 c -0.009,-0.441832 -0.316278,-0.797503 -0.697859,-0.808049 H 23.226495 c -0.06613,-0.01079 -0.133255,-0.01079 -0.19939,0 z" /> \
<path \
  inkscape:connector-curvature="0" \
  style="fill:#000000;fill-opacity:1;stroke-width:1.7164253" \
  id="path34" \
  d="m 33.853509,29.87309 v 2.284331 H 23.22115 V 29.87309 Z" />');

  //------------------------------ skip elements =>아래 css효과들이 안먹힐놈을 선택
  svgElement.each(function(item,index){
    if( index > 0 )  // 0번은 제외
      item.skipCss(); // ""값을 넣으면 속성에 안들어가므로 "myColor"라고 그냥 값을 넣음
  });
  svgElement.skipCss();
//------------------------------ hovered css
  var c_hover = {
    "fill":g_sHover,
     "stroke":"white",
     "stroke-width":"2.0px",
  };
  svgElement.hovered(c_hover,g_fDuration);
  //------------------------------ clicked css
  var c_click = {
    "fill":g_sClicked,
     "stroke":"white",
     "stroke-width":"4.0px"
  };
  svgElement.clicked(c_click);
  //------------------------------ selected css
  var c_select = {
    "fill":g_sClicked,
      "stroke":"white",
      "stroke-width":"2.0px"
  };
  svgElement.selected(c_select);
  

  if( is(func) )
    svgElement.onclick(func);

  return svgElement;
}

function icon_Home(func){
  var attr_ = {
    "viewBox":"0 0 463 438", /* 아래 path의 사각이다. */
    "preserveAspectRatio":"none"
  };

  var svgElement = svg(g_fWidth,g_fHeight,attr_);
  svgElement.html('<path \
  inkscape:connector-curvature="0" \
  id="path2" \
  d="m 394.811,223.1 z m 0,0 L 232.001,78.91 69.091,223.16 v 206.12 c 0,5.3234 4.3016,9.5938 9.625,9.5938 h 101.81 v -90.375 c 0,-5.3234 4.2704,-9.625 9.5938,-9.625 h 83.656 c 5.3234,0 9.5938,4.3016 9.5938,9.625 v 90.375 h 101.84 c 5.3234,0 9.5938,-4.2704 9.5938,-9.5938 V 223.09 Z m -325.72,0.0625 z" \
  style="stroke-width:0.5;stroke-miterlimit:4;stroke-dasharray:none;stroke:#c8c8c8;stroke-opacity:1;fill:#ffffff;fill-opacity:1" /> \
<path \
  inkscape:connector-curvature="0" \
  id="path4" \
  d="M 231.051,0 10e-4,204.58 24.339,232.037 231.999,48.157 439.609,232.037 463.9,204.58 232.9,0 232.00208,1.0397 231.0569,0 Z" \
  style="stroke-width:0.5;stroke-miterlimit:4;stroke-dasharray:none;stroke:#c8c8c8;stroke-opacity:1;fill:#ffffff;fill-opacity:1" /> \
<path \
  inkscape:connector-curvature="0" \
  id="path6" \
  d="m 69.091,29.45 h 58.571 l -0.51038,34.691 -58.061,52.452 V 29.45 Z" \
  style="stroke-width:0.5;stroke-miterlimit:4;stroke-dasharray:none;stroke:#c8c8c8;stroke-opacity:1;fill:#ffffff;fill-opacity:1" />');
  
  // var stroke = "white";
  // var strokeW = 4.0;
  // var fill = "#ffcb00";
  // var arrChildren = [];
  // svgElement.find(g_sID_changeable,function(found){
  //   arrChildren.push(found);
  // });
  // setSvgColor(svgElement,stroke,strokeW,fill);
  // svgHover(svgElement,stroke,strokeW,fill,stroke,strokeW,g_sHover,arrChildren);
      //------------------------------ skip elements =>아래 css효과들이 안먹힐놈을 선택
      svgElement.each(function(item,index){
        if( index == 1 )  // 0번은 제외
          item.skipCss(); // ""값을 넣으면 속성에 안들어가므로 "myColor"라고 그냥 값을 넣음
      });
      svgElement.skipCss();
    //------------------------------ hovered css
      var c_hover = {
        "fill":g_sHover,
         "stroke":"white",
         "stroke-width":"1.4px",
      };
      svgElement.hovered(c_hover,g_fDuration);
      //------------------------------ clicked css
      var c_click = {
        "fill":g_sClicked,
         "stroke":"white",
         "stroke-width":"1.8px"
      };
      svgElement.clicked(c_click);
      //------------------------------ selected css
      // var c_select = {
      //   "fill":g_sClicked,
      //     "stroke":"white",
      //     "stroke-width":"1.0px"
      // };
      // svgElement.selected(c_select);

  if( is(func) )
    svgElement.onclick(func);
  //setSvgColor(svgElement,"gray",strokeW,"black");
  return svgElement;
}


function icon_Code(fWidth,fHeight,func){
  var attr_ = {
    "viewBox":"0 0 45 45", /* 아래 path의 사각이다. */
    "preserveAspectRatio":"none"
  };

  var svgElement = svg(fWidth,fHeight,attr_);
  svgElement.html('  <defs \
  id="defs14" /> \
<circle \
  style="color:#000000;fill:#ffcb00;fill-rule:evenodd;stroke:#ffffff;stroke-width:3;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" \
  id="circle2-8" \
  cy="21.5" \
  cx="21.5" \
  r="20" /> \
<path \
  inkscape:connector-curvature="0" \
  id="path4" \
  style="color:#000000;text-indent:0;text-decoration:none;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000000;text-transform:none;white-space:normal;isolation:auto;mix-blend-mode:normal;solid-color:#000000;fill-opacity:0.13332998;fill-rule:evenodd;stroke-width:0.04545455;color-rendering:auto;image-rendering:auto;shape-rendering:auto" \
  d="m 23.445769,12.02058 a 1.2178636,1.2178636 0 0 0 -1.181182,0.98936 l -3.413818,16.61137 a 1.2178636,1.2178636 0 1 0 2.385727,0.49032 L 24.650314,13.50026 A 1.2178636,1.2178636 0 0 0 23.44586,12.02058 l -9.1e-5,-9e-5 z m 6.381363,1.92232 v 1.8e-4 a 1.2178636,1.2178636 0 0 0 -0.848363,2.09109 l 5.486363,5.48636 -5.486363,5.48637 a 1.2178636,1.2178636 0 1 0 1.722136,1.72213 l 6.347727,-6.34772 a 1.2178636,1.2178636 0 0 0 0,-1.72214 l -6.347727,-6.34773 a 1.2178636,1.2178636 0 0 0 -0.873773,-0.36905 z m -15.742727,1.8e-4 a 1.2178636,1.2178636 0 0 0 -0.837091,0.36834 l -6.3477272,6.34773 a 1.2178636,1.2178636 0 0 0 0,1.72213 l 6.3477272,6.34773 A 1.2178636,1.2178636 0 1 0 14.96945,27.00678 L 9.4830868,21.52042 14.96945,16.03406 A 1.2178636,1.2178636 0 0 0 14.084496,13.9436 l -9.1e-5,-1.8e-4 z" /> \
<path \
  inkscape:connector-curvature="0" \
  id="path6" \
  style="color:#000000;text-indent:0;text-decoration:none;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000000;text-transform:none;white-space:normal;isolation:auto;mix-blend-mode:normal;solid-color:#000000;fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke-width:0.04545455;color-rendering:auto;image-rendering:auto;shape-rendering:auto" \
  d="m 23.173041,11.74785 a 1.2178636,1.2178636 0 0 0 -1.181181,0.98937 l -3.413819,16.61136 a 1.2178636,1.2178636 0 1 0 2.385728,0.49032 l 3.413818,-16.61137 a 1.2178636,1.2178636 0 0 0 -1.204455,-1.47968 l -9.1e-5,-9e-5 z m 6.381364,1.92232 v 1.8e-4 a 1.2178636,1.2178636 0 0 0 -0.848364,2.09109 l 5.486364,5.48637 -5.486364,5.48636 a 1.2178636,1.2178636 0 1 0 1.722137,1.72214 l 6.347727,-6.34773 a 1.2178636,1.2178636 0 0 0 0,-1.72214 l -6.347727,-6.34772 a 1.2178636,1.2178636 0 0 0 -0.873773,-0.36905 z m -15.742727,1.8e-4 a 1.2178636,1.2178636 0 0 0 -0.837091,0.36834 l -6.3477275,6.34773 a 1.2178636,1.2178636 0 0 0 0,1.72214 l 6.3477275,6.34772 a 1.2178636,1.2178636 0 1 0 1.722136,-1.72222 L 9.2103595,21.24769 14.696723,15.76133 a 1.2178636,1.2178636 0 0 0 -0.884954,-2.09045 l -9.1e-5,-1.9e-4 z" />');
  
  var stroke = "white";
  var strokeW = 4.0;
  var fill = "#ffcb00";
  var arrChildren = [];
  svgElement.find(g_sID_changeable,function(found){
    arrChildren.push(found);
  });
  setSvgColor(svgElement,stroke,strokeW,fill);
  svgHover(svgElement,stroke,strokeW,fill,stroke,strokeW,g_sHover,arrChildren);

  if( is(func) )
    svgElement.onclick(func);
  //setSvgColor(svgElement,"gray",strokeW,"black");
  return svgElement;
}

function icon_LeftPanel(func){
  var attr_ = {
    "viewBox":"0 0 33 32", /* 아래 path의 사각이다. */
    "preserveAspectRatio":"none"
  };

  var svgElement = svg(g_fWidth,g_fHeight,attr_);
  svgElement.html(' <g \
  inkscape:label="Layer 1" \
  inkscape:groupmode="layer" \
  id="layer1" \
  transform="translate(-3.4650636,-261.1686)"> \
 <path \
    id="path412" \
    d="m 34.821602,278.39667 v -2.61641 h -16.78194 v 2.61641 z" \
    inkscape:connector-curvature="0" \
    style="fill:#ffffff;stroke:#c8c8c8;stroke-width:0.10583333;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" /> \
 <path \
    id="path414" \
    d="m 22.072264,271.16939 -7.239434,6.1056 7.239434,6.10555 z" \
    inkscape:connector-curvature="0" \
    style="fill:#ffffff;stroke:#c8c8c8;stroke-width:0.10583333;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" /> \
 <path \
    id="path416" \
    d="M 13.408719,292.686 V 261.5686 H 3.8650636 v 31.1174 z" \
    inkscape:connector-curvature="0" \
    style="fill:#ffffff;stroke:#c8c8c8;stroke-width:0.10583333;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" /> \
</g>');

    //------------------------------ skip elements =>아래 css효과들이 안먹힐놈을 선택
    // svgElement.each(function(item,index){
    //   if( index == 0 )  // 0번은 제외
    //     item.skipCss(); // ""값을 넣으면 속성에 안들어가므로 "myColor"라고 그냥 값을 넣음
    // });
    svgElement.skipCss();
  //------------------------------ hovered css
    var c_hover = {
      "fill":g_sHover,
       "stroke":"white",
       "stroke-width":"1.0px",
    };
    svgElement.hovered(c_hover,g_fDuration);
    //------------------------------ clicked css
    var c_click = {
      "fill":g_sClicked,
       "stroke":"white",
       "stroke-width":"1.2px"
    };
    svgElement.clicked(c_click);
    //------------------------------ selected css
    var c_select = {
      "fill":g_sClicked,
        "stroke":"white",
        "stroke-width":"1.0px"
    };
    svgElement.selected(c_select);

  if( is(func) )
    svgElement.onclick(func);
  //setSvgColor(svgElement,"gray",strokeW,"black");
  return svgElement;
}

function icon_RightPanel(func){
  var attr_ = {
    "viewBox":"0 0 33 32", /* 아래 path의 사각이다. */
    "preserveAspectRatio":"none"
  };

  var svgElement = svg(g_fWidth,g_fHeight,attr_);
  svgElement.html('<g \
  inkscape:label="Layer 1" \
  inkscape:groupmode="layer" \
  id="layer1" \
  transform="translate(-3.4650636,-261.1686)"> \
 <path \
    id="path412" \
    d="m 21.274946,278.48133 v -2.61641 H 4.4930018 v 2.61641 z" \
    inkscape:connector-curvature="0" \
    style="fill:#ffffff;stroke:#c8c8c8;stroke-width:0.10583333;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" /> \
 <path \
    id="path414" \
    d="m 17.752541,271.25964 7.644807,6.10001 -7.644807,6.09996 z" \
    inkscape:connector-curvature="0" \
    style="fill:#ffffff;stroke:#c8c8c8;stroke-width:0.10583333;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" /> \
 <path \
    id="path416" \
    d="M 35.614201,292.686 V 261.5686 H 26.386379 V 292.686 Z" \
    inkscape:connector-curvature="0" \
    style="fill:#ffffff;stroke:#c8c8c8;stroke-width:0.10406741;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" /> \
</g>');
  

    //------------------------------ skip elements =>아래 css효과들이 안먹힐놈을 선택
    // svgElement.each(function(item,index){
    //   if( index == 0 )  // 0번은 제외
    //     item.skipCss(); // ""값을 넣으면 속성에 안들어가므로 "myColor"라고 그냥 값을 넣음
    // });
    svgElement.skipCss();
  //------------------------------ hovered css
    var c_hover = {
      "fill":g_sHover,
       "stroke":"white",
       "stroke-width":"1.0px",
    };
    svgElement.hovered(c_hover,g_fDuration);
    //------------------------------ clicked css
    var c_click = {
      "fill":g_sClicked,
       "stroke":"white",
       "stroke-width":"1.2px"
    };
    svgElement.clicked(c_click);
    //------------------------------ selected css
    var c_select = {
      "fill":g_sClicked,
        "stroke":"white",
        "stroke-width":"1.0px"
    };
    svgElement.selected(c_select);

  if( is(func) )
    svgElement.onclick(func);
  //setSvgColor(svgElement,"gray",strokeW,"black");
  return svgElement;
}

function icon_Edit(fWidth,fHeight,func){
  var attr_ = {
    "viewBox":"0 0 33.5 34.4", /* 아래 path의 사각이다. */
    "preserveAspectRatio":"none"
  };

  var svgElement = svg(fWidth,fHeight,attr_);
  svgElement.html('<g \
  inkscape:label="Layer 1" \
  inkscape:groupmode="layer" \
  id="layer1" \
  transform="translate(-4.1512348,-259.86215)"> \
 <circle \
    style="fill:#3c3c3c;fill-opacity:1" \
    id="circle782" \
    r="56.575001" \
    cy="250.75" \
    cx="113.56" \
    transform="matrix(0.2959281,0,0,0.30368769,-12.712227,200.89359)" /> \
 <path \
    style="fill:#ffffff;fill-opacity:1;stroke-width:0.38022879" \
    inkscape:connector-curvature="0" \
    id="path784" \
    d="m 29.399591,265.31823 c -0.670266,-0.67938 -1.749406,-0.67938 -2.419672,0 l -13.687071,13.87254 c -0.670266,0.67935 -0.670266,1.77312 4e-6,2.45246 l 3.134241,3.17675 c 0.670304,0.67938 1.749407,0.67938 2.419674,0 l 13.687069,-13.87254 c 0.670267,-0.67935 0.670267,-1.77312 0,-2.45246 l -3.134278,-3.17675 z m -17.543545,15.44162 -1.9920652,7.53535 7.4346022,-2.01902 -5.442726,-5.51648 z" /> \
</g>');
  
  var stroke = "white";
  var strokeW = 4.0;
  var fill = "#ffcb00";
  var arrChildren = [];
  svgElement.find(g_sID_changeable,function(found){
    arrChildren.push(found);
  });
  setSvgColor(svgElement,stroke,strokeW,fill);
  svgHover(svgElement,stroke,strokeW,fill,stroke,strokeW,g_sHover,arrChildren);

  if( is(func) )
    svgElement.onclick(func);
  //setSvgColor(svgElement,"gray",strokeW,"black");
  return svgElement;
}

function icon_File(fWidth,fHeight,func){
  var attr_ = {
    "viewBox":"0 0 33.5 34.4", /* 아래 path의 사각이다. */
    "preserveAspectRatio":"none"
  };

  var svgElement = svg(fWidth,fHeight,attr_);
  svgElement.html('<g \
  inkscape:label="Layer 1" \
  inkscape:groupmode="layer" \
  id="layer1" \
  transform="translate(0.39097654,-256.66519)"> \
 <path \
    d="m 275.18,371.55 v 131.13 h 92.721 l 0,-81.55618 L 330.42526,371.93248 275.18,371.541 Z" \
    id="path81" \
    inkscape:connector-curvature="0" \
    style="fill:#808080;filter:url(#a)" \
    transform="matrix(0.38417145,0,0,0.27671144,-103.5273,155.71391)" \
    sodipodi:nodetypes="ccccccc" /> \
 <path \
    d="M 2.1889996,258.52605 H 23.253902 c 3.105911,2.7416 11.502365,11.08154 14.608776,13.82347 l -0.05292,22.46391 H 2.1889996 Z" \
    id="path83" \
    inkscape:connector-curvature="0" \
    style="fill:#ffca00;fill-opacity:1;stroke-width:0.3260439" \
    sodipodi:nodetypes="cccccc" /> \
 <path \
    d="M 23.412651,258.63188 37.80976,272.34952 23.658932,271.96257 Z" \
    id="path85" \
    inkscape:connector-curvature="0" \
    style="fill:#ffffff;fill-opacity:1;stroke-width:0.52329826" /> \
</g>');
  
  var stroke = "white";
  var strokeW = 4.0;
  var fill = "#ffcb00";
  var arrChildren = [];
  svgElement.find(g_sID_changeable,function(found){
    arrChildren.push(found);
  });
  setSvgColor(svgElement,stroke,strokeW,fill);
  svgHover(svgElement,stroke,strokeW,fill,stroke,strokeW,g_sHover,arrChildren);

  if( is(func) )
    svgElement.onclick(func);
  //setSvgColor(svgElement,"gray",strokeW,"black");
  return svgElement;
}


function icon_Delete(fWidth,fHeight,func){
  var attr_ = {
    "viewBox":"0 0 331 328.3", /* 아래 path의 사각이다. */
    "preserveAspectRatio":"none"
  };

  var svgElement = svg(fWidth,fHeight,attr_);
  svgElement.html(' <g fill-rule="evenodd"> \
  <path d="m319.31 164.74a155.78 155.78 0 1 1 -311.57 0 155.78 155.78 0 1 1 311.57 0z" fill="#c00000" stroke-width="18.75"/> \
  <g fill="#fff" stroke-width="1.25"> \
   <path d="m292.62 145.83a131.71 137.25 0 0 1 0 47.667l-129.71-23.834 129.71-23.834z"/> \
   <path d="m40.686 193.49"/> \
   <rect x="41.894" y="146.05" width="250.14" height="47.563"/> \
  </g> \
 </g>');
  
  var stroke = "white";
  var strokeW = 4.0;
  var fill = "#ffcb00";
  var arrChildren = [];
  svgElement.find(g_sID_changeable,function(found){
    arrChildren.push(found);
  });
  setSvgColor(svgElement,stroke,strokeW,fill);
  svgHover(svgElement,stroke,strokeW,fill,stroke,strokeW,g_sHover,arrChildren);

  if( is(func) )
    svgElement.onclick(func);
  //setSvgColor(svgElement,"gray",strokeW,"black");
  return svgElement;
}


function icon_file_html(fWidth,fHeight,func){
  var attr_ = {
    "viewBox":"0 0 40 40", /* 아래 path의 사각이다. */
    "preserveAspectRatio":"none"
  };

  var svgElement = svg(fWidth,fHeight,attr_);
  svgElement.html('  <defs \
  id="defs3692"> \
 <linearGradient \
    inkscape:collect="always" \
    xlink:href="#a" \
    id="linearGradient399" \
    gradientUnits="userSpaceOnUse" \
    gradientTransform="matrix(278.39,273.89,-273.89,278.39,1214.6,446.11)" \
    x2="1" /> \
 <linearGradient \
    id="a" \
    x2="1" \
    gradientTransform="matrix(278.39,273.89,-273.89,278.39,1214.6,446.11)" \
    gradientUnits="userSpaceOnUse"> \
   <stop \
      stop-color="#212121" \
      stop-opacity=".61569" \
      offset="0" \
      id="stop368" /> \
   <stop \
      stop-color="#4d4d4d" \
      stop-opacity="0" \
      offset="1" \
      id="stop370" /> \
 </linearGradient> \
</defs> \
<g \
  inkscape:label="Layer 1" \
  inkscape:groupmode="layer" \
  id="layer1" \
  transform="translate(22.579568,-23.022782)"> \
 <path \
    style="stroke-width:0.0438452" \
    inkscape:connector-curvature="0" \
    id="path270" \
    fill="#00c783" \
    d="M -22.578822,50.054463 V 25.945582 c 0,-1.614084 1.685167,-2.922567 3.763973,-2.922567 H 1.8995651 l 15.5196419,12.05019 v 17.425837 h -39.99778 v -2.444423 z" /> \
 <g \
    id="g274" \
    transform="matrix(0.04975838,0,0,0.03373706,-53.890277,21.052872)"> \
   <path \
      inkscape:connector-curvature="0" \
      id="path272" \
      fill="#00af73" \
      d="m 1433.1,932.09 v 241.64 c 0,38.83 -33.86,70.3 -75.64,70.3 H 704.9 c -41.778,0 -75.645,-31.47 -75.645,-70.3 V 932.09 h 803.84 z" /> \
 </g> \
 <g \
    id="g282" \
    transform="matrix(0.04975838,0,0,0.03863479,-53.728082,14.853919)"> \
   <path \
      inkscape:connector-curvature="0" \
      style="fill:url(#linearGradient399)" \
      id="path280" \
      fill="url(#a)" \
      d="m 1117.8,211.44 h 0.14 l 311.94,311.94 v 260.83 c -2.19,1.131 -4.06,1.055 -5.56,-0.442 -14.77,-14.769 -292.47,-273.35 -292.47,-294.24 0,-91.863 -13.88,-275.89 -14.05,-278.09 z" /> \
 </g> \
 <g \
    id="g286" \
    transform="matrix(0.04975838,0,0,0.03863479,-53.728082,14.853919)"> \
   <path \
      inkscape:connector-curvature="0" \
      id="path284" \
      fill="#00af73" \
      d="m 1117.8,211.44 h 0.14 l 311.94,311.94 h -233.33 c -20.88,0 -40.91,-8.297 -55.68,-23.066 -14.77,-14.769 -23.07,-34.8 -23.07,-55.686 v -233.19 z" /> \
 </g> \
 <g \
    id="g320" \
    fill-rule="nonzero" \
    fill="#fff" \
    transform="matrix(0.04684293,0,0,0.0351573,-50.900349,20.632951)"> \
   <path \
      inkscape:connector-curvature="0" \
      id="path312" \
      d="M 743.06,1138.4 V 983.51 h 42.212 v 60.198 h 56.283 V 983.51 h 42.317 v 154.89 h -42.317 v -63.06 h -56.283 v 63.06 z" /> \
   <path \
      inkscape:connector-curvature="0" \
      id="path314" \
      d="m 939.1,1138.4 v -118.28 h -34.701 v -36.608 h 111.62 v 36.608 h -34.702 v 118.28 h -42.212 z" /> \
   <path \
      inkscape:connector-curvature="0" \
      id="path316" \
      d="m 1214.3,1138.4 h -39.46 l -9.1,-66.97 c -0.64,-4.73 -1.22,-9.98 -1.75,-15.77 -0.53,-5.78 -1,-12.09 -1.43,-18.93 -0.98,6.56 -2.92,14.74 -5.82,24.54 -0.63,2.05 -1.09,3.56 -1.37,4.55 l -21.05,72.58 h -28.15 l -21.05,-72.58 c -0.28,-0.99 -0.7,-2.5 -1.27,-4.55 -2.96,-9.8 -4.9,-17.95 -5.82,-24.44 -0.42,5.86 -0.91,11.66 -1.48,17.41 -0.56,5.74 -1.23,11.47 -2.01,17.19 l -9.1,66.97 h -39.25 l 23.91,-154.89 h 41.79 l 23.38,79.878 c 0.14,0.56 0.43,1.48 0.85,2.75 2.19,7.12 3.56,13.22 4.13,18.3 0.28,-2.75 0.81,-5.8 1.58,-9.15 0.78,-3.35 1.84,-7.39 3.18,-12.12 l 23.59,-79.658 h 41.89 z" /> \
   <path \
      inkscape:connector-curvature="0" \
      id="path318" \
      d="M 1237,1138.4 V 983.51 h 42.22 v 118.7 h 52.47 v 36.19 z" /> \
 </g> \
 <g \
    id="g328" \
    fill-rule="nonzero" \
    fill="#fff" \
    transform="matrix(0.04202561,0,0,0.03640143,-96.724132,33.356525)"> \
   <path \
      inkscape:connector-curvature="0" \
      id="path322" \
      d="m 2080.2,122.57 v 46.978 l -158.57,65.176 158.57,64.619 v 47.164 l -218.74,-90.244 v -43.264 z" /> \
   <path \
      inkscape:connector-curvature="0" \
      id="path324" \
      d="M 2129.2,383.27 2262.34,70.02 h 41.04 l -132.77,313.25 z" /> \
   <path \
      inkscape:connector-curvature="0" \
      id="path326" \
      d="m 2352.4,122.57 218.73,90.429 v 43.264 l -218.73,90.244 v -47.164 l 158.57,-64.619 -158.57,-65.176 z" /> \
 </g> \
</g>');
  
  var stroke = "white";
  var strokeW = 4.0;
  var fill = "#ffcb00";
  var arrChildren = [];
  svgElement.find(g_sID_changeable,function(found){
    arrChildren.push(found);
  });
  setSvgColor(svgElement,stroke,strokeW,fill);
  svgHover(svgElement,stroke,strokeW,fill,stroke,strokeW,g_sHover,arrChildren);

  if( is(func) )
    svgElement.onclick(func);
  //setSvgColor(svgElement,"gray",strokeW,"black");
  return svgElement;
}


function icon_file_js(fWidth,fHeight,func){
  var attr_ = {
    "viewBox":"1 1 37.8 38.24", /* 아래 path의 사각이다. */
    "preserveAspectRatio":"none"
  };

  var svgElement = svg(fWidth,fHeight,attr_);
  svgElement.html('  <defs \
  id="defs1609"> \
 <linearGradient \
    inkscape:collect="always" \
    xlink:href="#a" \
    id="linearGradient1180" \
    gradientUnits="userSpaceOnUse" \
    gradientTransform="matrix(278.39,273.89,-273.89,278.39,1214.6,446.11)" \
    x2="1" /> \
 <linearGradient \
    id="a" \
    x2="1" \
    gradientTransform="matrix(278.39,273.89,-273.89,278.39,1214.6,446.11)" \
    gradientUnits="userSpaceOnUse"> \
   <stop \
      stop-color="#212121" \
      stop-opacity=".61569" \
      offset="0" \
      id="stop360" /> \
   <stop \
      stop-color="#4d4d4d" \
      stop-opacity="0" \
      offset="1" \
      id="stop362" /> \
 </linearGradient> \
</defs> \
<g \
  inkscape:label="Layer 1" \
  inkscape:groupmode="layer" \
  id="layer1" \
  transform="translate(-4.069e-7,-257)"> \
 <g \
    transform="matrix(0.04766233,0,0,0.03729036,-29.092171,249.85628)" \
    id="g56"> \
   <path \
      d="M 629.27,911.11 V 287.09 c 0,-41.778 33.867,-75.646 75.645,-75.646 h 416.3 l 311.9,311.9 v 451.04 h -803.84 v -63.27 z" \
      id="path30" \
      inkscape:connector-curvature="0" \
      style="fill:#af00fa" /> \
   <g \
      transform="matrix(1,0,0,0.87323,0,160.45)" \
      id="g34"> \
     <path \
        d="m 1433.1,932.09 v 241.64 c 0,38.83 -33.86,70.3 -75.64,70.3 H 704.9 c -41.778,0 -75.645,-31.47 -75.645,-70.3 V 932.09 h 803.84 z" \
        id="path32" \
        inkscape:connector-curvature="0" \
        style="fill:#9700ff" /> \
   </g> \
   <g \
      transform="translate(3.2597)" \
      id="g38"> \
     <path \
        d="m 1117.8,211.44 h 0.14 l 311.94,311.94 v 260.83 c -2.19,1.131 -4.06,1.055 -5.56,-0.442 -14.77,-14.769 -292.47,-273.35 -292.47,-294.24 0,-91.863 -13.88,-275.89 -14.05,-278.09 z" \
        id="path36" \
        style="fill:url(#linearGradient1180)" \
        inkscape:connector-curvature="0" /> \
   </g> \
   <g \
      transform="translate(3.2597)" \
      id="g42"> \
     <path \
        d="m 1117.8,211.44 h 0.14 l 311.94,311.94 h -233.33 c -20.88,0 -40.91,-8.297 -55.68,-23.066 -14.77,-14.769 -23.07,-34.8 -23.07,-55.686 v -233.19 z" \
        id="path40" \
        inkscape:connector-curvature="0" \
        style="fill:#9700ff" /> \
   </g> \
   <g \
      transform="translate(0,44.289)" \
      id="g48" \
      style="fill:#ffffff;fill-rule:nonzero"> \
     <path \
        d="m 963.32,983.48 h 42.107 v 100.51 c 0,10.93 -0.71,19.32 -2.12,25.18 -1.41,5.85 -3.735,11.03 -6.979,15.55 -4.303,5.85 -9.592,10.28 -15.869,13.28 -6.278,2.99 -13.331,4.49 -21.159,4.49 -9.733,0 -18.409,-2.08 -26.026,-6.24 -7.617,-4.16 -14.141,-10.33 -19.572,-18.51 l 25.814,-23.38 c 0.635,4.58 2.116,8.11 4.443,10.57 2.328,2.47 5.255,3.71 8.781,3.71 4.021,0 6.789,-2.23 8.305,-6.67 1.517,-4.44 2.275,-15.55 2.275,-33.32 v -85.168 z" \
        id="path44" \
        inkscape:connector-curvature="0" /> \
     <path \
        d="m 1043.5,1088.3 c 6.27,7.13 12.46,12.45 18.56,15.98 6.1,3.53 12.19,5.29 18.25,5.29 5.64,0 10.28,-1.52 13.91,-4.55 3.64,-3.03 5.45,-6.88 5.45,-11.53 0,-5.15 -1.57,-9.12 -4.71,-11.9 -3.13,-2.79 -10.24,-5.66 -21.31,-8.63 -15.17,-4.09 -25.89,-9.41 -32.16,-15.97 -6.28,-6.56 -9.42,-15.55 -9.42,-26.98 0,-14.81 4.95,-26.89 14.86,-36.233 9.91,-9.345 22.77,-14.018 38.57,-14.018 8.53,0 16.62,1.147 24.28,3.439 7.65,2.292 14.89,5.766 21.74,10.42 l -13.23,30.362 c -4.79,-4.09 -9.71,-7.17 -14.76,-9.26 -5.04,-2.08 -10.03,-3.12 -14.97,-3.12 -5.07,0 -9.2,1.22 -12.38,3.65 -3.17,2.44 -4.76,5.56 -4.76,9.37 0,3.88 1.4,6.98 4.18,9.31 2.79,2.32 8.17,4.55 16.14,6.66 l 1.9,0.53 c 17.21,4.66 28.53,9.77 33.96,15.34 3.67,3.81 6.46,8.38 8.36,13.7 1.9,5.33 2.86,11.23 2.86,17.72 0,16.44 -5.4,29.64 -16.19,39.62 -10.79,9.98 -25.18,14.97 -43.16,14.97 -10.8,0 -20.62,-1.83 -29.47,-5.5 -8.85,-3.67 -17.37,-9.42 -25.55,-17.24 z" \
        id="path46" \
        inkscape:connector-curvature="0" /> \
   </g> \
   <g \
      transform="matrix(1.2532,0,0,1.2532,685.92,-175.52)" \
      id="g54" \
      style="fill:#ffffff;fill-rule:nonzero"> \
     <path \
        d="m 182.66,581.6 h 73.903 V 758 c 0,19.187 -1.238,33.918 -3.714,44.193 -2.476,10.275 -6.561,19.373 -12.255,27.296 -7.551,10.275 -16.836,18.042 -27.853,23.303 -11.017,5.262 -23.396,7.892 -37.137,7.892 -17.083,0 -32.31,-3.652 -45.679,-10.955 -13.369,-7.304 -24.82,-18.136 -34.352,-32.495 l 45.308,-41.037 c 1.114,8.046 3.713,14.236 7.798,18.569 4.085,4.332 9.223,6.499 15.412,6.499 7.056,0 11.915,-3.9 14.577,-11.699 2.661,-7.798 3.992,-27.295 3.992,-58.491 v -149.48 z" \
        id="path50" \
        inkscape:connector-curvature="0" /> \
     <path \
        d="m 289.25,837.84 13.741,-50.507 c 9.656,8.418 20.271,14.886 31.845,19.404 11.575,4.519 23.242,6.778 35.002,6.778 8.294,0 14.607,-1.331 18.94,-3.992 4.333,-2.662 6.499,-6.53 6.499,-11.606 0,-8.294 -8.727,-14.483 -26.182,-18.568 -5.694,-1.362 -10.274,-2.538 -13.74,-3.528 -19.807,-5.447 -34.198,-12.596 -43.172,-21.447 -8.975,-8.851 -13.463,-20.333 -13.463,-34.445 0,-18.197 6.84,-32.742 20.519,-43.636 13.679,-10.893 32.216,-16.34 55.613,-16.34 12.007,0 24.232,1.393 36.672,4.178 12.441,2.785 25.161,7.087 38.159,12.905 l -13.741,45.493 c -8.789,-5.942 -17.702,-10.46 -26.739,-13.555 -9.036,-3.095 -18.073,-4.642 -27.11,-4.642 -7.551,0 -13.245,1.176 -17.083,3.528 -3.837,2.352 -5.756,5.756 -5.756,10.212 0,6.685 8.665,12.318 25.996,16.898 3.961,1.114 6.932,1.919 8.913,2.414 22.901,6.561 38.839,14.267 47.814,23.118 8.975,8.851 13.462,20.827 13.462,35.93 0,19.187 -7.365,34.692 -22.096,46.514 -14.732,11.822 -34.229,17.733 -58.491,17.733 -16.465,0 -31.753,-1.888 -45.865,-5.663 -14.112,-3.776 -27.358,-9.501 -39.737,-17.176 z" \
        id="path52" \
        inkscape:connector-curvature="0" /> \
   </g> \
 </g> \
</g>');
  
  var stroke = "white";
  var strokeW = 4.0;
  var fill = "#ffcb00";
  var arrChildren = [];
  svgElement.find(g_sID_changeable,function(found){
    arrChildren.push(found);
  });
  setSvgColor(svgElement,stroke,strokeW,fill);
  svgHover(svgElement,stroke,strokeW,fill,stroke,strokeW,g_sHover,arrChildren);

  if( is(func) )
    svgElement.onclick(func);
  //setSvgColor(svgElement,"gray",strokeW,"black");
  return svgElement;
}

function icon_file_css(fWidth,fHeight,func){
  var attr_ = {
    "viewBox":"0 0 48.2 62", /* 아래 path의 사각이다. */
    "preserveAspectRatio":"none"
  };

  var svgElement = svg(fWidth,fHeight,attr_);
  svgElement.html('  <defs \
  id="defs991"> \
 <linearGradient \
    inkscape:collect="always" \
    xlink:href="#a" \
    id="linearGradient403" \
    gradientUnits="userSpaceOnUse" \
    gradientTransform="matrix(278.39,273.89,-273.89,278.39,1214.6,446.11)" \
    x2="1" /> \
 <linearGradient \
    id="a" \
    x2="1" \
    gradientTransform="matrix(278.39,273.89,-273.89,278.39,1214.6,446.11)" \
    gradientUnits="userSpaceOnUse"> \
   <stop \
      stop-color="#212121" \
      stop-opacity=".61569" \
      offset="0" \
      id="stop368" /> \
   <stop \
      stop-color="#4d4d4d" \
      stop-opacity="0" \
      offset="1" \
      id="stop370" /> \
 </linearGradient> \
</defs> \
<g \
  transform="translate(-56.795423,-111.84719)" \
  id="layer1" \
  inkscape:groupmode="layer" \
  inkscape:label="Layer 1"> \
 <g \
    transform="matrix(0.05993765,0,0,0.05993765,19.079357,99.174092)" \
    id="g362"> \
   <path \
      d="M 629.27,911.11 V 287.09 c 0,-41.778 33.867,-75.646 75.645,-75.646 h 416.3 l 311.9,311.9 v 451.04 h -803.84 v -63.27 z" \
      fill="#0692c1" \
      id="path332" \
      inkscape:connector-curvature="0" /> \
   <g \
      transform="matrix(1,0,0,0.87323,0,160.45)" \
      id="g336"> \
     <path \
        d="m 1433.1,932.09 v 241.64 c 0,38.83 -33.86,70.3 -75.64,70.3 H 704.9 c -41.778,0 -75.645,-31.47 -75.645,-70.3 V 932.09 h 803.84 z" \
        fill="#0a729b" \
        id="path334" \
        inkscape:connector-curvature="0" /> \
   </g> \
   <g \
      transform="translate(3.2597)" \
      id="g340"> \
     <path \
        d="m 1117.8,211.44 h 0.14 l 311.94,311.94 v 260.83 c -2.19,1.131 -4.06,1.055 -5.56,-0.442 -14.77,-14.769 -292.47,-273.35 -292.47,-294.24 0,-91.863 -13.88,-275.89 -14.05,-278.09 z" \
        fill="url(#a)" \
        id="path338" \
        style="fill:url(#linearGradient403)" \
        inkscape:connector-curvature="0" /> \
   </g> \
   <g \
      transform="translate(3.2597)" \
      id="g344"> \
     <path \
        d="m 1117.8,211.44 h 0.14 l 311.94,311.94 h -233.33 c -20.88,0 -40.91,-8.297 -55.68,-23.066 -14.77,-14.769 -23.07,-34.8 -23.07,-55.686 v -233.19 z" \
        fill="#0a729b" \
        id="path342" \
        inkscape:connector-curvature="0" /> \
   </g> \
   <g \
      transform="translate(0,44.289)" \
      fill="#fff" \
      fill-rule="nonzero" \
      id="g352"> \
     <path \
        d="m 966.02,989.51 v 46.128 c -5.784,-6.42 -11.55,-11.13 -17.298,-14.13 -5.748,-2.99 -11.902,-4.49 -18.461,-4.49 -12.131,0 -21.952,4.14 -29.464,12.43 -7.511,8.29 -11.267,19.1 -11.267,32.43 0,12.41 3.827,22.71 11.479,30.89 7.652,8.18 17.403,12.27 29.252,12.27 6.559,0 12.713,-1.5 18.461,-4.5 5.748,-2.99 11.514,-7.74 17.298,-14.23 v 46.24 c -6.701,3.24 -13.366,5.67 -19.996,7.3 -6.629,1.62 -13.33,2.43 -20.1,2.43 -8.464,0 -16.275,-1.01 -23.434,-3.02 -7.159,-2.01 -13.735,-5.06 -19.73,-9.15 -11.567,-7.75 -20.384,-17.52 -26.449,-29.3 -6.066,-11.78 -9.098,-25.04 -9.098,-39.78 0,-11.85 1.922,-22.62 5.765,-32.32 3.844,-9.7 9.645,-18.5 17.404,-26.4 7.335,-7.543 15.604,-13.185 24.808,-16.923 9.204,-3.739 19.449,-5.608 30.734,-5.608 6.77,0 13.471,0.812 20.1,2.434 6.63,1.622 13.295,4.055 19.996,7.299 z" \
        id="path346" \
        inkscape:connector-curvature="0" /> \
     <path \
        d="m 996.7,1088.3 c 6.279,7.13 12.469,12.45 18.569,15.98 6.1,3.53 12.18,5.29 18.25,5.29 5.64,0 10.28,-1.52 13.91,-4.55 3.63,-3.03 5.45,-6.88 5.45,-11.53 0,-5.15 -1.57,-9.12 -4.71,-11.9 -3.14,-2.79 -10.25,-5.66 -21.32,-8.63 -15.16,-4.09 -25.88,-9.41 -32.159,-15.97 -6.277,-6.56 -9.416,-15.55 -9.416,-26.98 0,-14.81 4.955,-26.89 14.865,-36.233 9.91,-9.345 22.76,-14.018 38.56,-14.018 8.54,0 16.63,1.147 24.28,3.439 7.65,2.292 14.9,5.766 21.74,10.42 l -13.22,30.362 c -4.8,-4.09 -9.72,-7.17 -14.76,-9.26 -5.04,-2.08 -10.03,-3.12 -14.97,-3.12 -5.08,0 -9.2,1.22 -12.38,3.65 -3.17,2.44 -4.76,5.56 -4.76,9.37 0,3.88 1.39,6.98 4.18,9.31 2.79,2.32 8.16,4.55 16.13,6.66 l 1.91,0.53 c 17.21,4.66 28.53,9.77 33.96,15.34 3.66,3.81 6.45,8.38 8.35,13.7 1.91,5.33 2.86,11.23 2.86,17.72 0,16.44 -5.39,29.64 -16.18,39.62 -10.8,9.98 -25.18,14.97 -43.17,14.97 -10.79,0 -20.61,-1.83 -29.46,-5.5 -8.854,-3.67 -17.371,-9.42 -25.552,-17.24 z" \
        id="path348" \
        inkscape:connector-curvature="0" /> \
     <path \
        d="m 1122.6,1088.3 c 6.27,7.13 12.46,12.45 18.56,15.98 6.1,3.53 12.19,5.29 18.25,5.29 5.65,0 10.28,-1.52 13.91,-4.55 3.64,-3.03 5.45,-6.88 5.45,-11.53 0,-5.15 -1.57,-9.12 -4.7,-11.9 -3.14,-2.79 -10.25,-5.66 -21.32,-8.63 -15.17,-4.09 -25.89,-9.41 -32.16,-15.97 -6.28,-6.56 -9.42,-15.55 -9.42,-26.98 0,-14.81 4.96,-26.89 14.86,-36.233 9.91,-9.345 22.77,-14.018 38.57,-14.018 8.53,0 16.62,1.147 24.28,3.439 7.65,2.292 14.9,5.766 21.74,10.42 l -13.23,30.362 c -4.79,-4.09 -9.71,-7.17 -14.76,-9.26 -5.04,-2.08 -10.03,-3.12 -14.97,-3.12 -5.07,0 -9.2,1.22 -12.37,3.65 -3.18,2.44 -4.76,5.56 -4.76,9.37 0,3.88 1.39,6.98 4.17,9.31 2.79,2.32 8.17,4.55 16.14,6.66 l 1.9,0.53 c 17.21,4.66 28.53,9.77 33.96,15.34 3.67,3.81 6.46,8.38 8.36,13.7 1.9,5.33 2.86,11.23 2.86,17.72 0,16.44 -5.4,29.64 -16.19,39.62 -10.79,9.98 -25.18,14.97 -43.16,14.97 -10.79,0 -20.62,-1.83 -29.47,-5.5 -8.85,-3.67 -17.36,-9.42 -25.55,-17.24 z" \
        id="path350" \
        inkscape:connector-curvature="0" /> \
   </g> \
   <g \
      transform="matrix(0.9546,0,0,0.9546,-1330,511.72)" \
      fill="#fff" \
      fill-rule="nonzero" \
      id="g360"> \
     <path \
        d="m 2383.9,52.256 v 44.936 c -0.86,0 -2.16,-0.062 -3.9,-0.186 -1.73,-0.124 -2.97,-0.186 -3.71,-0.186 -12.13,0 -20.3,2.194 -24.51,6.581 -4.21,4.386 -6.31,13.439 -6.31,27.156 v 44.489 c 0,17.344 -2.86,29.733 -8.58,37.166 -5.71,7.434 -15.96,12.699 -30.74,15.795 14.9,2.973 25.18,8.083 30.84,15.331 5.65,7.248 8.48,19.605 8.48,37.073 v 44.861 c 0,13.594 2.07,22.553 6.22,26.878 4.14,4.325 12.22,6.487 24.23,6.487 0.87,0 2.19,-0.062 3.99,-0.185 1.8,-0.124 3.13,-0.186 3.99,-0.186 v 44.936 c -1.86,0 -4.46,0.062 -7.81,0.185 -3.35,0.124 -5.83,0.186 -7.45,0.186 -13.39,0 -24.53,-0.742 -33.39,-2.227 -8.87,-1.484 -16.29,-3.774 -22.24,-6.869 -7.32,-3.959 -12.43,-9.434 -15.35,-16.425 -2.91,-6.992 -4.37,-18.901 -4.37,-35.729 v -47.451 c 0,-16.437 -3.07,-28.024 -9.19,-34.76 -6.13,-6.736 -16.56,-10.104 -31.29,-10.104 -0.5,0 -1.55,0.063 -3.16,0.187 -1.61,0.125 -2.78,0.187 -3.53,0.187 v -44.935 c 0.75,0 1.86,0.062 3.35,0.187 1.48,0.124 2.6,0.187 3.34,0.187 14.61,0 25,-3.43 31.19,-10.288 6.19,-6.859 9.29,-18.507 9.29,-34.944 v -47.086 c 0,-16.828 1.49,-28.799 4.46,-35.913 2.98,-7.114 8.07,-12.651 15.26,-16.61 5.95,-3.095 13.43,-5.384 22.42,-6.869 8.99,-1.484 20.19,-2.227 33.59,-2.227 1.48,0 3.87,0.062 7.16,0.186 3.29,0.124 5.86,0.186 7.72,0.186 z" \
        id="path354" \
        inkscape:connector-curvature="0" /> \
     <path \
        d="m 2453.4,178.15 c 0,-10.522 3.62,-19.343 10.86,-26.461 7.24,-7.117 16.13,-10.676 26.65,-10.676 10.64,0 19.52,3.528 26.64,10.584 7.12,7.056 10.68,15.907 10.68,26.553 0,10.646 -3.59,19.59 -10.77,26.831 -7.18,7.242 -16.03,10.863 -26.55,10.863 -10.4,0 -19.25,-3.652 -26.56,-10.956 -7.3,-7.303 -10.95,-16.216 -10.95,-26.738 z m 4.08,86.715 h 69.26 l -57.37,116.42 h -51.44 z" \
        id="path356" \
        inkscape:connector-curvature="0" /> \
     <path \
        d="m 2563.1,52.256 c 1.86,0 4.43,-0.062 7.71,-0.186 3.28,-0.124 5.66,-0.186 7.14,-0.186 13.37,0 24.52,0.743 33.43,2.227 8.91,1.485 16.4,3.774 22.47,6.869 7.18,3.959 12.28,9.496 15.31,16.61 3.04,7.114 4.55,19.085 4.55,35.913 v 47.086 c 0,16.561 3.05,28.24 9.14,35.036 6.09,6.797 16.53,10.196 31.32,10.196 0.74,0 1.86,-0.063 3.35,-0.187 1.49,-0.125 2.61,-0.187 3.36,-0.187 v 44.935 c -0.75,0 -1.87,-0.062 -3.36,-0.187 -1.49,-0.124 -2.61,-0.187 -3.35,-0.187 -14.79,0 -25.23,3.399 -31.32,10.197 -6.09,6.798 -9.14,18.353 -9.14,34.667 v 47.451 c 0,16.952 -1.51,28.985 -4.55,36.1 -3.03,7.115 -8.13,12.59 -15.31,16.426 -5.57,2.971 -12.6,5.168 -21.08,6.59 -8.48,1.423 -19.47,2.134 -32.96,2.134 -1.73,0 -4.46,-0.062 -8.17,-0.186 -3.71,-0.123 -6.56,-0.185 -8.54,-0.185 v -44.936 c 1.11,0 2.54,0.062 4.27,0.186 1.73,0.123 2.97,0.185 3.71,0.185 12.01,0 20.09,-2.131 24.24,-6.394 4.14,-4.263 6.22,-13.254 6.22,-26.971 v -44.861 c 0,-17.344 2.84,-29.671 8.54,-36.98 5.69,-7.31 15.91,-12.451 30.64,-15.424 -14.86,-3.096 -25.1,-8.299 -30.73,-15.609 -5.64,-7.309 -8.45,-19.76 -8.45,-37.352 v -44.489 c 0,-13.717 -2.08,-22.77 -6.22,-27.156 -4.15,-4.387 -11.98,-6.581 -23.49,-6.581 -0.87,0 -2.26,0.062 -4.18,0.186 -1.92,0.124 -3.44,0.186 -4.55,0.186 z" \
        id="path358" \
        inkscape:connector-curvature="0" /> \
   </g> \
 </g> \
</g>');
  
  var stroke = "white";
  var strokeW = 4.0;
  var fill = "#ffcb00";
  var arrChildren = [];
  svgElement.find(g_sID_changeable,function(found){
    arrChildren.push(found);
  });
  setSvgColor(svgElement,stroke,strokeW,fill);
  svgHover(svgElement,stroke,strokeW,fill,stroke,strokeW,g_sHover,arrChildren);

  if( is(func) )
    svgElement.onclick(func);
  //setSvgColor(svgElement,"gray",strokeW,"black");
  return svgElement;
}


function icon_file_svg(fWidth,fHeight,func){
  var attr_ = {
    "viewBox":"0 0 48.2 62", /* 아래 path의 사각이다. */
    "preserveAspectRatio":"none"
  };

  var svgElement = svg(fWidth,fHeight,attr_);
  svgElement.html('  <defs \
  id="defs3022"> \
 <linearGradient \
    inkscape:collect="always" \
    xlink:href="#a" \
    id="linearGradient381" \
    gradientUnits="userSpaceOnUse" \
    gradientTransform="matrix(278.39,273.89,-273.89,278.39,1214.6,446.11)" \
    x2="1" /> \
 <linearGradient \
    id="a" \
    x2="1" \
    gradientTransform="matrix(278.39,273.89,-273.89,278.39,1214.6,446.11)" \
    gradientUnits="userSpaceOnUse"> \
   <stop \
      stop-color="#212121" \
      stop-opacity=".61569" \
      offset="0" \
      id="stop368" /> \
   <stop \
      stop-color="#4d4d4d" \
      stop-opacity="0" \
      offset="1" \
      id="stop370" /> \
 </linearGradient> \
</defs> \
<g \
  inkscape:label="Layer 1" \
  inkscape:groupmode="layer" \
  id="layer1" \
  transform="translate(-40.920425,-70.269809)"> \
 <path \
    style="stroke-width:0.0599377" \
    inkscape:connector-curvature="0" \
    id="path10" \
    fill="#fa8d00" \
    d="M 40.921323,112.2065 V 74.804213 c 0,-2.504075 2.029908,-4.534044 4.533984,-4.534044 H 70.407351 L 89.101907,88.964724 V 115.999 H 40.921623 v -3.79225 z" /> \
 <g \
    id="g14" \
    transform="matrix(0.05993765,0,0,0.05233935,3.2043588,67.213708)"> \
   <path \
      inkscape:connector-curvature="0" \
      id="path12" \
      fill="#ff7000" \
      d="m 1433.1,932.09 v 241.64 c 0,38.83 -33.86,70.3 -75.64,70.3 H 704.9 c -41.778,0 -75.645,-31.47 -75.645,-70.3 V 932.09 h 803.84 z" /> \
 </g> \
 <g \
    id="g22" \
    transform="matrix(0.05993765,0,0,0.05993765,3.3997378,57.596712)"> \
   <path \
      inkscape:connector-curvature="0" \
      style="fill:url(#linearGradient381)" \
      id="path20" \
      fill="url(#a)" \
      d="m 1117.8,211.44 h 0.14 l 311.94,311.94 v 260.83 c -2.19,1.131 -4.06,1.055 -5.56,-0.442 -14.77,-14.769 -292.47,-273.35 -292.47,-294.24 0,-91.863 -13.88,-275.89 -14.05,-278.09 z" /> \
 </g> \
 <g \
    id="g26" \
    transform="matrix(0.05993765,0,0,0.05993765,3.3997378,57.596712)"> \
   <path \
      inkscape:connector-curvature="0" \
      id="path24" \
      fill="#ff7000" \
      d="m 1117.8,211.44 h 0.14 l 311.94,311.94 h -233.33 c -20.88,0 -40.91,-8.297 -55.68,-23.066 -14.77,-14.769 -23.07,-34.8 -23.07,-55.686 v -233.19 z" /> \
 </g> \
 <text \
    id="text2726" \
    y="129.36555" \
    x="50.576893" \
    style="font-style:normal;font-weight:normal;font-size:12.7px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583" \
    xml:space="preserve"><tspan \
      style="font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-family:sans-serif;-inkscape-font-specification:sans-serif Bold;fill:#ffffff;stroke-width:0.264583" \
      y="129.36555" \
      x="50.576893" \
      id="tspan2724" \
      sodipodi:role="line">SVG</tspan></text> \
 <g \
    id="g208" \
    transform="matrix(0.12699589,0,0,0.12699589,-237.34399,-15.703076)"> \
   <path \
      inkscape:connector-curvature="0" \
      id="path206" \
      fill="#fff" \
      d="m 2398.2496,892.74367 h 86.76 v 86.756 h -86.76 z m -100.32,0 c 23.94,0 43.38,19.437 43.38,43.378 0,23.941 -19.44,43.378 -43.38,43.378 -23.94,0 -43.38,-19.437 -43.38,-43.378 0,-23.941 19.44,-43.378 43.38,-43.378 z m 119.91,-13.805 h -103.27 l 51.64,-103.28 z" /> \
 </g> \
</g>');
  
  var stroke = "white";
  var strokeW = 4.0;
  var fill = "#ffcb00";
  var arrChildren = [];
  svgElement.find(g_sID_changeable,function(found){
    arrChildren.push(found);
  });
  setSvgColor(svgElement,stroke,strokeW,fill);
  svgHover(svgElement,stroke,strokeW,fill,stroke,strokeW,g_sHover,arrChildren);

  if( is(func) )
    svgElement.onclick(func);
  //setSvgColor(svgElement,"gray",strokeW,"black");
  return svgElement;
}

function icon_file_html5(fWidth,fHeight,func){
  var attr_ = {
    "viewBox":"0 0 48.2 62", /* 아래 path의 사각이다. */
    "preserveAspectRatio":"none"
  };

  var svgElement = svg(fWidth,fHeight,attr_);
  svgElement.html('  <defs  \
  id="defs3416"> \
 <linearGradient \
    inkscape:collect="always" \
    xlink:href="#a" \
    id="linearGradient397" \
    gradientUnits="userSpaceOnUse" \
    gradientTransform="matrix(278.39,273.89,-273.89,278.39,1214.6,446.11)" \
    x2="1" /> \
 <linearGradient \
    id="a" \
    x2="1" \
    gradientTransform="matrix(278.39,273.89,-273.89,278.39,1214.6,446.11)" \
    gradientUnits="userSpaceOnUse"> \
   <stop \
      stop-color="#212121" \
      stop-opacity=".61569" \
      offset="0" \
      id="stop368" /> \
   <stop \
      stop-color="#4d4d4d" \
      stop-opacity="0" \
      offset="1" \
      id="stop370" /> \
 </linearGradient> \
</defs> \
<g \
  inkscape:label="Layer 1" \
  inkscape:groupmode="layer" \
  id="layer1" \
  transform="translate(-16.729949,-52.882902)"> \
 <path \
    style="stroke-width:0.0599377" \
    inkscape:connector-curvature="0" \
    id="path242" \
    fill="#40c022" \
    d="m 16.730847,94.819596 v -37.40229 c 0,-2.50408 2.029908,-4.53404 4.533984,-4.53404 h 24.952044 l 18.694551,18.69455 v 27.03428 H 16.731147 v -3.792259 z" /> \
 <g \
    id="g246" \
    transform="matrix(0.05993765,0,0,0.05233935,-20.986117,49.826806)"> \
   <path \
      inkscape:connector-curvature="0" \
      id="path244" \
      fill="#1da525" \
      d="m 1433.1,932.09 v 241.64 c 0,38.83 -33.86,70.3 -75.64,70.3 H 704.9 c -41.778,0 -75.645,-31.47 -75.645,-70.3 V 932.09 h 803.84 z" /> \
 </g> \
 <g \
    id="g250" \
    transform="matrix(0.05993765,0,0,0.05993765,-20.790738,40.209805)"> \
   <path \
      inkscape:connector-curvature="0" \
      style="fill:url(#linearGradient397)" \
      id="path248" \
      fill="url(#a)" \
      d="m 1117.8,211.44 h 0.14 l 311.94,311.94 v 260.83 c -2.19,1.131 -4.06,1.055 -5.56,-0.442 -14.77,-14.769 -292.47,-273.35 -292.47,-294.24 0,-91.863 -13.88,-275.89 -14.05,-278.09 z" /> \
 </g> \
 <g \
    id="g254" \
    transform="matrix(0.05993765,0,0,0.05993765,-20.790738,40.209805)"> \
   <path \
      inkscape:connector-curvature="0" \
      id="path252" \
      fill="#1da525" \
      d="m 1117.8,211.44 h 0.14 l 311.94,311.94 h -233.33 c -20.88,0 -40.91,-8.297 -55.68,-23.066 -14.77,-14.769 -23.07,-34.8 -23.07,-55.686 v -233.19 z" /> \
 </g> \
 <g \
    id="g266" \
    transform="matrix(0,0.11883238,-0.11883238,0,86.799754,-96.91386)"> \
   <path \
      inkscape:connector-curvature="0" \
      id="path264" \
      fill="#fff" \
      d="m 1495,319.53 82.01,134.83 h -164.03 z" /> \
 </g> \
 <g \
    id="g320" \
    fill-rule="nonzero" \
    fill="#fff" \
    transform="matrix(0.05993765,0,0,0.05993765,-24.63112,43.366999)"> \
   <path \
      inkscape:connector-curvature="0" \
      id="path312" \
      d="M 743.06,1138.4 V 983.51 h 42.212 v 60.198 h 56.283 V 983.51 h 42.317 v 154.89 h -42.317 v -63.06 h -56.283 v 63.06 z" /> \
   <path \
      inkscape:connector-curvature="0" \
      id="path314" \
      d="m 939.1,1138.4 v -118.28 h -34.701 v -36.608 h 111.62 v 36.608 h -34.702 v 118.28 h -42.212 z" /> \
   <path \
      inkscape:connector-curvature="0" \
      id="path316" \
      d="m 1214.3,1138.4 h -39.46 l -9.1,-66.97 c -0.64,-4.73 -1.22,-9.98 -1.75,-15.77 -0.53,-5.78 -1,-12.09 -1.43,-18.93 -0.98,6.56 -2.92,14.74 -5.82,24.54 -0.63,2.05 -1.09,3.56 -1.37,4.55 l -21.05,72.58 h -28.15 l -21.05,-72.58 c -0.28,-0.99 -0.7,-2.5 -1.27,-4.55 -2.96,-9.8 -4.9,-17.95 -5.82,-24.44 -0.42,5.86 -0.91,11.66 -1.48,17.41 -0.56,5.74 -1.23,11.47 -2.01,17.19 l -9.1,66.97 h -39.25 l 23.91,-154.89 h 41.79 l 23.38,79.878 c 0.14,0.56 0.43,1.48 0.85,2.75 2.19,7.12 3.56,13.22 4.13,18.3 0.28,-2.75 0.81,-5.8 1.58,-9.15 0.78,-3.35 1.84,-7.39 3.18,-12.12 l 23.59,-79.658 h 41.89 z" /> \
   <path \
      inkscape:connector-curvature="0" \
      id="path318" \
      d="M 1237,1138.4 V 983.51 h 42.22 v 118.7 h 52.47 v 36.19 z" /> \
 </g> \
 <text \
    xml:space="preserve" \
    style="font-style:normal;font-weight:normal;font-size:13.4056px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583" \
    x="54.893051" \
    y="111.89782" \
    id="text3466"><tspan \
      sodipodi:role="line" \
      id="tspan3464" \
      x="54.893051" \
      y="111.89782" \
      style="font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-family:sans-serif;-inkscape-font-specification:sans-serif Bold;fill:#ffffff;stroke-width:0.264583">5</tspan></text> \
</g>');
  
  // var stroke = "white";
  // var strokeW = 4.0;
  // var fill = "#ffcb00";
  // var arrChildren = [];
  // svgElement.find(g_sID_changeable,function(found){
  //   arrChildren.push(found);
  // });
  // setSvgColor(svgElement,stroke,strokeW,fill);
  // svgHover(svgElement,stroke,strokeW,fill,stroke,strokeW,g_sHover,arrChildren);

  //------------------------------ skip elements =>아래 css효과들이 안먹힐놈을 선택
  // svgElement.each(function(item,index){
  //   if( index  5 )  // 0번은 제외
  //     item.skipCss(); // ""값을 넣으면 속성에 안들어가므로 "myColor"라고 그냥 값을 넣음
  // });
  //svgElement.skipCss();
// //------------------------------ hovered css
//   var c_hover = {
//       // "fill":g_sHover,
//       "stroke":"white",
//       "stroke-width":"1.4px",
//   };
//   svgElement.hovered(c_hover,g_fDuration);
//   //------------------------------ clicked css
//   var c_click = {
//     "fill":g_sClicked,
//       "stroke":"white",
//       "stroke-width":"1.8px"
//   };
//   svgElement.clicked(c_click);
//   //------------------------------ selected css
//   var c_select = {
//     "fill":g_sClicked,
//       "stroke":"white",
//       "stroke-width":"1.0px"
//   };
//   svgElement.selected(c_select);

  if( is(func) )
    svgElement.onclick(func);
  //setSvgColor(svgElement,"gray",strokeW,"black");
  return svgElement;
}

function icon_arrow_start(fWidth,fHeight,sColor,sBGColor,func){
  var attr_ = {
    "viewBox":"0 0 57 56.5", /* 아래 path의 사각이다. */
    "preserveAspectRatio":"none"
  };

  var svgElement = svg(fWidth,fHeight,attr_);
  svgElement.html(' \
<path \
  style="fill:#ffffff;stroke:#000000;stroke-opacity:1;stroke-width:0.1;stroke-miterlimit:4;stroke-dasharray:none" \
  stroke-width="3.625" \
  fill="' + sBGColor + '" \
  d="m55.573 28.288a26.482 26.482 0 1 1 -52.963 0 26.482 26.482 0 1 1 52.963 0z" /> \
<path \
  style="fill:' + sBGColor + '" \
  id="path3909" \
  stroke-width="1.75" \
  stroke-linejoin="round" \
  stroke-linecap="round" \
  fill="white" \
  d="m25.845 12.497l-4.1313 4.1313 11.7 11.7-11.588 11.588 4.1619 4.1619 15.72-15.72-15.862-15.862z" /> \
');
  
  var stroke = sBGColor;
  var strokeW = 4.0;
  var fill = sColor;
  var arrChildren = [];
  svgElement.find(g_sID_changeable,function(found){
    arrChildren.push(found);
  });
  setSvgColor(svgElement,stroke,strokeW,fill);
  svgHover(svgElement,stroke,strokeW,fill,stroke,strokeW,g_sHover,arrChildren);
  //setSvgColor(svgElement,"yellow",strokeW,"purple");
  //svgHover(svgElement,"orange",strokeW,"gray","yellow",strokeW,"purple",arrChildren);

  if( is(func) )
    svgElement.onclick(func);
  //setSvgColor(svgElement,"gray",strokeW,"black");
  return svgElement;
}


function icon_List(fWidth,fHeight,sColor,func){
  var attr_ = {
    "viewBox":"0 0 78.9 63.7", /* 아래 path의 사각이다. */
    "preserveAspectRatio":"none"
  };

  var svgElement = svg(fWidth,fHeight,attr_);
  svgElement.html('<circle \
  style="fill:' + sColor + '" \
  id="circle1006" \
  r="7.131" \
  cy="7.131" \
  cx="7.131" /> \
<rect \
  style="fill:' + sColor + '" \
  id="rect1008" \
  height="10.118" \
  width="56.292" \
  y="2.072" \
  x="22.618" /> \
<circle \
  style="fill:' + sColor + '" \
  id="circle1010" \
  r="7.131" \
  cy="31.805002" \
  cx="7.131" /> \
<rect \
  style="fill:' + sColor + '" \
  id="rect1012" \
  height="10.118" \
  width="56.292" \
  y="26.745001" \
  x="22.618" /> \
<circle \
  style="fill:' + sColor + '" \
  id="circle1014" \
  r="7.131" \
  cy="56.618996" \
  cx="7.131" /> \
<rect \
  style="fill:' + sColor + '" \
  id="rect1016" \
  height="10.117" \
  width="56.292" \
  y="51.560997" \
  x="22.618" />');
  
  // var stroke = "white";
  // var strokeW = 4.0;
  // var fill = "#ffcb00";
  // var arrChildren = [];
  // svgElement.find(g_sID_changeable,function(found){
  //   arrChildren.push(found);
  // });
  // setSvgColor(svgElement,stroke,strokeW,fill);
  // svgHover(svgElement,stroke,strokeW,fill,stroke,strokeW,g_sHover,arrChildren);

  //------------------------------ hovered css
  // var c_hover = {
  //   "fill":g_sHover,
  //   "stroke":"white",
  //   "stroke-width":"1.4px",
  // };
  // svgElement.hovered(c_hover,g_fDuration);
  // //------------------------------ clicked css
  // var c_click = {
  //   "fill":g_sClicked,
  //     "stroke":"white",
  //     "stroke-width":"1.8px"
  // };
  // svgElement.clicked(c_click);
  //   //------------------------------ selected css
  //   var c_select = {
  //     "fill":g_sClicked,
  //       "stroke":"white",
  //       "stroke-width":"1.0px"
  //   };
  //   svgElement.selected(c_select);

  if( is(func) )
    svgElement.onclick(func);
  //setSvgColor(svgElement,"gray",strokeW,"black");
  return svgElement;
}

function icon_Editor(fWidth,fHeight,sColor,sColor2,func){
  var attr_ = {
    "viewBox":"0 0 837.5 1137.5", /* 아래 path의 사각이다. */
    "preserveAspectRatio":"none"
  };

  var svgElement = svg(fWidth,fHeight,attr_);
  svgElement.html('  <path \
  d="M 698.5791,58.82457 C 606.16818,-0.7598606 506.40989,-16.04499 456.01135,17.396854 L 833.05405,260.505 c 1.14702,0.73953 2.25515,1.52702 3.32972,2.33277 9.78744,-59.70862 -45.31609,-144.37603 -137.81166,-204.013661 z" \
  fill="#6c5353" \
  fill-rule="evenodd" \
  id="path1043" \
  inkscape:connector-curvature="0" /> \
<path \
  style="stroke-width:1" \
  d="m 487.0398,65.163773 23.87966,15.396974 a 56.038223,56.038223 0 0 1 16.73011,77.463983 l -328.85678,510.0345 a 56.038223,56.038223 0 0 1 -77.46398,16.73012 L 97.449147,669.39237 A 56.038223,56.038223 0 0 1 80.719033,591.92839 L 409.57582,81.893887 A 56.038223,56.038223 0 0 1 487.0398,65.163772" \
  fill="#6c5353" \
  fill-rule="evenodd" \
  id="path1045" \
  inkscape:connector-curvature="0" /> \
<path \
  style="stroke-width:1" \
  d="m 621.51154,151.8676 23.87966,15.39698 a 56.038223,56.038223 0 0 1 16.73012,77.46398 L 333.26453,754.76307 a 56.038223,56.038223 0 0 1 -77.46398,16.73011 L 231.92089,756.0962 a 56.038223,56.038223 0 0 1 -16.73011,-77.46398 l 328.85678,-510.0345 a 56.038223,56.038223 0 0 1 77.46398,-16.73012" \
  fill="#6c5353" \
  fill-rule="evenodd" \
  id="path1047" \
  inkscape:connector-curvature="0" /> \
<path \
  style="stroke-width:1" \
  d="m 755.98329,238.57143 23.87966,15.39697 a 56.038223,56.038223 0 0 1 16.73012,77.46398 L 467.73627,841.4669 a 56.038223,56.038223 0 0 1 -77.46398,16.73011 L 366.39263,842.80004 A 56.038223,56.038223 0 0 1 349.66252,765.33605 L 678.5193,255.30155 a 56.038223,56.038223 0 0 1 77.46399,-16.73012" \
  fill="#6c5353" \
  fill-rule="evenodd" \
  id="path1049" \
  inkscape:connector-curvature="0" /> \
<path \
  style="stroke-width:0.97268" \
  d="M 35.797082,661.75666 C 44.177346,657.19847 420.83598,900.05775 420.13972,909.57035 419.44346,919.08295 8.8132309,1142.4413 1.1241482,1137.4836 -6.5649345,1132.5259 27.407463,666.31819 35.797091,661.75665 Z" \
  fill="#6c5353" \
  fill-rule="evenodd" \
  id="path1051" \
  inkscape:connector-curvature="0" /> \
<path \
  style="stroke-width:0.305236" \
  d="M 16.388005,982.38145 C 19.017806,980.95106 137.218,1057.1622 136.99946,1060.1473 136.78092,1063.1324 7.9192949,1133.2231 5.5063777,1131.6674 3.0933715,1130.1116 13.755246,983.81286 16.388005,982.38145 Z" \
  fill-rule="evenodd" \
  id="path1053" \
  inkscape:connector-curvature="0" />');
  
  svgElement.each(function(item,index){
    if( index == 5 )
      item.css("fill",sColor2);
    else
      item.css("fill",sColor);
  });

  // var stroke = "white";
  // var strokeW = 4.0;
  // var fill = "#ffcb00";
  // var arrChildren = [];
  // svgElement.find(g_sID_changeable,function(found){
  //   arrChildren.push(found);
  // });
  // setSvgColor(svgElement,stroke,strokeW,fill);
  // svgHover(svgElement,stroke,strokeW,fill,stroke,strokeW,g_sHover,arrChildren);

  if( is(func) )
    svgElement.onclick(func);
  //setSvgColor(svgElement,"gray",strokeW,"black");
  //svgElement.attr("transform","rotate(70)");

  return svgElement;
}

function icon_Triangle(fWidth,fHeight,sColor,func){
  var attr_ = {
    "viewBox":"0 0 17.7 12.4", /* 아래 path의 사각이다. */
    "preserveAspectRatio":"none"
  };

  var svgElement = svg(fWidth,fHeight,attr_);
  svgElement.html('  <g  \
  inkscape:label="Layer 1" \
  inkscape:groupmode="layer" \
  id="layer1" \
  transform="translate(61.355168,-37.62454)"> \
 <path \
    inkscape:connector-curvature="0" \
    id="path27" \
    fill="#fff" \
    d="m -44.55494,37.693665 h -12.939448 c -1.317493,0 -3.766079,-0.534749 -3.858683,1.37041 -0.07859,1.603242 2.072719,3.415771 2.97471,4.545541 1.492912,1.871716 2.985558,3.743325 4.479131,5.615252 1.438672,1.803639 2.506769,0.467387 3.57558,-0.867171 l 4.831556,-6.0325 1.555221,-1.941698 c 0.521652,-0.650928 0.603885,-2.690019 -0.617988,-2.690019" \
    style="fill:#000000;fill-opacity:1;stroke-width:0.264583" /> \
</g>');
  
svgElement.each(function(item,index){
  item.css("fill",sColor);
});
  // var stroke = "white";
  // var strokeW = 4.0;
  // var fill = "#ffcb00";
  // var arrChildren = [];
  // svgElement.find(g_sID_changeable,function(found){
  //   arrChildren.push(found);
  // });
  // setSvgColor(svgElement,stroke,strokeW,fill);
  // svgHover(svgElement,stroke,strokeW,fill,stroke,strokeW,g_sHover,arrChildren);
  // svgElement.attr("transform","rotate(90)");

    // svgElement.each(function(item,index){
  //   if( index  5 )  // 0번은 제외
  //     item.skipCss(); // ""값을 넣으면 속성에 안들어가므로 "myColor"라고 그냥 값을 넣음
  // });
  //svgElement.skipCss();
// //------------------------------ hovered css
//   var c_hover = {
//       "fill":g_sHover,
//       "stroke":"white",
//       "stroke-width":"1.4px",
//   };
//   svgElement.hovered(c_hover,g_fDuration);
//   //------------------------------ clicked css
//   var c_click = {
//     "fill":g_sClicked,
//       "stroke":"white",
//       "stroke-width":"1.8px"
//   };
//   svgElement.clicked(c_click);
//   //------------------------------ selected css
//   var c_select = {
//     "fill":g_sClicked,
//       "stroke":"white",
//       "stroke-width":"1.0px"
//   };
//   svgElement.selected(c_select);

  if( is(func) )
    svgElement.onclick(func);

  //setSvgColor(svgElement,"gray",strokeW,"black");
  return svgElement;
}

function icon_Search(fWidth,fHeight,sColor,func){
  var attr_ = {
    "viewBox":"0 0 373 527", /* 아래 path의 사각이다. */
    "preserveAspectRatio":"none"
  };

  var svgElement = svg(fWidth,fHeight,attr_);
  svgElement.html('  <defs \
  id="defs939"> \
 <filter \
    id="b"> \
   <feGaussianBlur \
      id="feGaussianBlur931" \
      stdDeviation="3.225" /> \
 </filter> \
 <linearGradient \
    gradientTransform="translate(-183.60145,-56.04126)" \
    gradientUnits="userSpaceOnUse" \
    y2="626.62" \
    y1="156.31" \
    x2="208.23" \
    x1="356.5" \
    id="a"> \
   <stop \
      id="stop934" \
      offset="0" \
      stop-color="#fff" /> \
   <stop \
      id="stop936" \
      offset="1" \
      stop-color="#d2d5d8" /> \
 </linearGradient> \
</defs> \
<path \
  inkscape:connector-curvature="0" \
  id="path941" \
  filter="url(#b)" \
  d="m -143.57,589.86 h 66.429 a 12.857,12.857 0 0 1 12.857,12.857 v 66.429 a 12.857,12.857 0 0 1 -12.857,12.857 h -66.429 a 12.857,12.857 0 0 1 -12.857,-12.857 v -66.429 a 12.857,12.857 0 0 1 12.857,-12.857" \
  transform="matrix(4.772,0,0,4.772,713.15855,-2770.8413)" /> \
<path \
  style="fill:#ffffff" \
  inkscape:connector-curvature="0" \
  id="path943" \
  stroke-width="10.098" \
  stroke="#ccc" \
  fill="url(#a)" \
  d="M 14.398554,26.97974 H 331.39855 a 61.354,61.354 0 0 1 61.354,61.354 v 317 a 61.354,61.354 0 0 1 -61.354,61.354 H 14.398554 a 61.354,61.354 0 0 1 -61.354,-61.354 v -317 a 61.354,61.354 0 0 1 61.354,-61.354" /> \
<path \
  inkscape:connector-curvature="0" \
  id="path945" \
  fill="#454040" \
  d="m 71.338554,138.04874 c -43.273,43.273 -43.378,114.16 -0.1054,157.43 36.662996,36.663 93.200996,42.25 135.919996,16.766 l 76.344,74.235 c 10.507,10.198 27.085,9.8217 37.117,-0.8436 10.032,-10.6653 9.7691,-27.447 -0.7381,-37.645 l -75.184,-72.864 c 26.361,-42.847 21.008,-100.04 -16.028,-137.08 -43.273,-43.273 -114.05,-43.273 -157.329996,0 z m 31.739996,31.74 c 26.102,-26.102 67.746,-26.102 93.848,0 26.102,26.102 26.102,67.746 0,93.848 -26.102,26.102 -67.746,26.102 -93.848,0 -26.101996,-26.102 -26.101996,-67.746 0,-93.848 z" />');
  
  var stroke = "white";
  var strokeW = 4.0;
  var fill = "#ffcb00";
  var arrChildren = [];
  svgElement.find(g_sID_changeable,function(found){
    arrChildren.push(found);
  });
  setSvgColor(svgElement,stroke,strokeW,fill);
  svgHover(svgElement,stroke,strokeW,fill,stroke,strokeW,g_sHover,arrChildren);

  if( is(func) )
    svgElement.onclick(func);

  //svgElement.attr("transform","rotate(90)");
  //setSvgColor(svgElement,"gray",strokeW,"black");



  return svgElement;
}


function icon_TextBox(fWidth,fHeight,sText,fFontSize,func){
  var attr_ = {
    "viewBox":"-1 -1 " + (fWidth + 2) + " " + (fHeight + 2), /* 아래 path의 사각이다. */
    "preserveAspectRatio":"none"
  };

   var svgElement = svg(fWidth,fHeight,attr_);
   var sizeText = size(sText.length*fFontSize,fFontSize);
   var elRect = rect(rt(0,0,fWidth,fHeight),g_sStroke,g_sStrokeW,g_sFill);
   var elText = text( sText, g_fWidth*0.02, g_fHeight*0.45, 11, g_sStroke2, 0, g_sFill2 ).findable();
   //var elText = text(sText,(fWidth-sizeText.width)*0.5,(fHeight-sizeText.height)*0.5,fFontSize,g_sStroke2, 0, g_sFill2);
   svgElement.append(elRect,elText);
  // var stroke = "white";
  // var strokeW = 4.0;
  // var fill = "#ffcb00";
  // var arrChildren = [];
  // svgElement.find(g_sID_changeable,function(found){
  //   arrChildren.push(found);
  // });
  // setSvgColor(svgElement,stroke,strokeW,fill);
  // svgHover(svgElement,stroke,strokeW,fill,stroke,strokeW,g_sHover,arrChildren);

  

  //svgElement.attr("transform","rotate(90)");
  //setSvgColor(svgElement,"gray",strokeW,"black");

  //------------------------------ skip elements =>아래 css효과들이 안먹힐놈을 선택
  svgElement.each(function(item,index){
    if( index != 0 )  
      item.skipCss(); // ""값을 넣으면 속성에 안들어가므로 "myColor"라고 그냥 값을 넣음
  });
  svgElement.skipCss();
//------------------------------ hovered css
  var c_hover = {
      "fill":g_sHover,
      "stroke":"white",
      // "stroke-width":"1.0px",
  };
  svgElement.hovered(c_hover,g_fDuration);
  //------------------------------ clicked css
  var c_click = {
    "fill":g_sClicked,
      "stroke":"white",
      // "stroke-width":"1.8px"
  };
  svgElement.clicked(c_click);
  //------------------------------ selected css
  // var c_select = {
  //   "fill":g_sClicked,
  //     "stroke":"white",
  //     "stroke-width":"1.0px"
  // };
  // svgElement.selected(c_select);

  if( is(func) )
    svgElement.onclick(func);

  return svgElement;
}