//1.使用ES6模块语法导入jQuery

import $ from 'jquery'

//2.利用jQuery操作DOM

$(function () {
  $('li:odd').css('backgroundColor', 'yellow')
  $('li:even').css('backgroundColor', 'blue')
})
