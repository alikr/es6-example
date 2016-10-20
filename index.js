'use strict';

import {add} from './module.js';
console.log(add);

import def from './dmodule.js';
console.log(def);

let [a,b,c]=[1,2,3];
let {user,name}={"user":"lan","name":"xw"};
console.log(user,name);

let {us:ua="xx",nm}={"us":"lan","nm":"xw"};
let {us="xx"}={"us":"lan"};

const [first, ...rest] = [1, 2, 3, 4, 5];
// let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };//chrome还不能直接使用，babel可以转换

const propKey="name";
let obj = {
  [propKey]: true,
  ['a' + 'bc']: 123
};
console.log(obj);

[[1, 2], [3, 4]].map(([a, b]) => a + b);

let f = x => 'foo';
let u = (x) => 'foo';

let type = 'outer';
let fun = x => type;
function bar(func = fun) {
  let type = 'inner';
  console.log(func(),type); // outer
}
bar();

console.log(1, ...[2, 3, 4], 5);


function fun2(x, y, z) {
	console.log(x,y,z);
}
fun2(...[0, 1, 2]);

function fun3([x,y,z]) {
	console.log(x,y,z);
}
fun3([0,1,2]);

function baseFunction({ a, b }) {
  console.log(a,b);
}
baseFunction({a:1,b:2});

var proxy = new Proxy({}, {
  get: function(target, property) {
  	// console.log('proxy',target,property);
    return 35;
  }
});
console.log(proxy.time);

let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();
console.log(iter.next());

let genFun=function* (x){
	yield x+1;
	yield x+2;
	var y = yield x+3;
	return y;
}
let gf=genFun(1);
console.log('genFun',gf.next());
console.log('genFun',gf.next());
console.log('genFun',gf.next());
console.log('genFun',gf.next('end-num'));
console.log('genFun',gf.next());

var myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};
console.log([...myIterable]);

//for...of循环只返回具有数字索引的属性
//不同于forEach,它可以与break、continue和return配合使用
//对普通对象无法遍历{a:1,b:2}
//keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历
let arr2 = ['red', 'green', 'blue'];
arr2.diyName="xxx";
for(let v of arr2) {
  console.log(v);//不会遍历diyName属性
}
for (let index of arr2.keys()) {
  console.log(index);
}
// for (let elem of arr2.values()) {//chrome不支持values
//   console.log(elem);
// }
for (let [index, elem] of arr2.entries()) {
  console.log(index, elem);
}

var promise = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve('promise-ok');
	},2000);
});
promise.then((t)=>console.log(t));

var promises = [3,4].map((id) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(id+"promise-all-success");
		},id*1000);
	});
});
Promise.all(promises).then((res) => console.log(res));

var promises2 = [5,6].map((id) => {
	return new Promise((resolve, reject) => {
		setTimeout(()=>{
			if(id==6){
				resolve(id+"promise-race-success");
			}else{
				reject('request timeout');
			}
		},id*1000);
	});
});
var race=Promise.race(promises2);
race.then(res=>console.log(res),res=>console.log(res));


//es7 async函数，浏览器不支持，babel可以转换
let doAsync=(x) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log(x,new Date());
			resolve(x+"-doAsync");
		},x * 2000);
	});
}
var testAsync=async function(){
	var f1= await doAsync(1);
	var f2= await doAsync(2);
	console.log(f1);
	console.log(f2);
}
var result=testAsync();
result.then((res)=>{
	console.log('testAsync-end');
});

class classObj {
	constructor(x){
		this.x=x;
	}
	val(){
		return this.x;
	}
	static view(){
		console.log("static-class-view");
	}
}
classObj.view();
let tObj=new classObj(1000);
console.log(tObj.val());

class extendObj extends classObj {
	constructor(x,y){
		super(x);
		this.y=y;
	}
	values(){
		let {x,y}=this;
		return {x,y};
	}
}

let nObj=new extendObj(10,20);
console.log(nObj.values());