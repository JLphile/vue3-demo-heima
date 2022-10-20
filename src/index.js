//1.使用ES6模块语法导入jQuery

import $ from 'jquery'

import './css/index.css'

import './css/index.less'

//2.利用jQuery操作DOM

$(function () {
  $('li:odd').css('backgroundColor', 'red')
  $('li:even').css('backgroundColor', 'cyan')
})

class Person {
  static info = 'person info'
}

console.log(Person.info)
console.log(err)
