'use strict';

define(function (require, exports, module) {
    var pageEdit = require( './pageEdit' );
    var id = pageEdit.id;

    var editor = pageEdit.editor;
    editor.setTheme("ace/theme/dawn");
    editor.setShowPrintMargin(false);
    editor.getSession().setMode("ace/mode/html");
    var StatusBar = ace.require("ace/ext/statusbar").StatusBar;
    var statusBar = new StatusBar(editor, document.getElementById("statusBar"));
    editor.setOption("enableEmmet", true);

    var cache = window.localStorage[ id ];
    if( cache  ){
        editor.setValue( cache );
    }else{
        $.get( '/' + id + '/result' ).success(function( codeText ){
            editor.setValue( codeText );
        });
    }
    pageEdit.initView();

    $( '#statusBar' ).get(0).onselectstart = function(){ return false };


    var interval;
    editor.on( 'change', function() {
        if( window.frames[ 'result' ] ){
            clearTimeout( interval );
            interval = setTimeout( pageEdit.resetIframe, 300 );
        }
    });

    $( window ).keydown(function(event){
        //Save
        if( event.keyCode === 83 && ( event.ctrlKey === true || event.metaKey === true ) ){
            pageEdit.sendCode();
            return false;
        }

        //Toggle preview
        if( event.keyCode === 80 && ( event.ctrlKey === true || event.metaKey === true ) ){
            pageEdit.togglePreview();
            return false;
        }

        //Show Menu
        if( event.keyCode === 77 && ( event.ctrlKey === true || event.metaKey === true ) ){
            pageEdit.toggleMenu();
            return false;
        }

        if( event.keyCode === 9 ){
            console.log( 'aa' );
        }
        window.localStorage[ id ] = editor.getValue();
    });

    //Save
    $( '#save' ).click( pageEdit.sendCode );
    $( '#btn_preview' ).click( pageEdit.togglePreview );
    $( '#btn_menu' ).click( pageEdit.toggleMenu );
    
});

if( window.console ) window.console.log( '本产品由 Berwin 独立开发\n开发者邮箱：berwin1995@qq.com\n开源地址：https://github.com/berwin/demo' );