var _ = require('lodash');


{
  // -------------------------- N次循环 ----------------------------
  console.log('-------------------------- N次循环 ----------------------------');
  console.log('------- javascript -------');
  //js原生的循环方法
  for (var i = 0; i < 5; i++) {
    console.log(i);
  }
  console.log('------- lodash -------');
  //ladash的times方法
  _.times(5, function (a) {
    console.log(a);
  });
}
{
  // -------------------------- 遍历循环 ----------------------------
  console.log('-------------------------- 遍历循环 ----------------------------');
  // 两种方式，key是属性，value是值
  _([1, 2]).forEach(function (value, key) {
    console.log(key, value);
  });
  _.forEach([1, 3], function (value, key) {
    console.log(key, value);
  });

}
{
  // -------------------------- 深层查找属性值 ----------------------------
  console.log('-------------------------- 深层查找属性值 ----------------------------');
  var ownerArr = [{
    "owner": "Colin",
    "pets": [{
      "name": "dog1"
    }, {
      "name": "dog2"
    }]
  }, {
    "owner": "John",
    "pets": [{
      "name": "dog3"
    }, {
      "name": "dog4"
    }]
  }];
  var jsMap = ownerArr.map(function (owner) {
    return owner.pets[0].name;
  });
  console.log('------- jsMap -------');
  console.log(jsMap);

  var lodashMap = _.map(ownerArr, 'pets[0].name');
  console.log('------- lodashMap -------');
  console.log(lodashMap);
}

{
  // -------------------------- 深克隆对象 ----------------------------
  console.log('-------------------------- 深克隆对象 ----------------------------');
  // JSON.parse(JSON.stringify(objectToClone)) 进行深度克隆。但是，这种方案仅在对象内部没有方法的时候才可行。
  var objA = {
    "name": "戈德斯文"
  };
  var objB = _.cloneDeep(objA);
  console.log('------- lodash cloneDeep -------');
  console.log(objB);
  console.log(objA === objB);

}

{
  // -------------------------- 在指定范围内获取一个随机值 ----------------------------
  console.log('-------------------------- 在指定范围内获取一个随机值 ----------------------------');
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  console.log(getRandomNumber(15, 20));

  console.log(_.random(15, 20, true));//true会返回浮点数

}

{
  // -------------------------- 扩展对象 ----------------------------
  console.log('-------------------------- 扩展对象 ----------------------------');
  Object.prototype.extend = function (obj) {
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {    //判断被扩展的对象有没有某个属性，
        this[i] = obj[i];
      }
    }
  };

  var objA = { "name": "戈德斯文", "car": "宝马" };
  var objB = { "name": "柴硕", "loveEat": true };

  objA.extend(objB);
  console.log(objA);

  console.log(_.assign(objA, objB));
}

{
  // -------------------------- 从列表中随机选择列表项 ----------------------------
  console.log('-------------------------- 从列表中随机选择列表项 ----------------------------');
  var smartTeam = ["戈德斯文", "杨海月", "柴硕", "师贝贝"];

  function randomSmarter(smartTeam) {
    var index = Math.floor(Math.random() * smartTeam.length);
    return smartTeam[index];
  }

  console.log(randomSmarter(smartTeam));

  // Lodash
  console.log(_.sample(smartTeam));
  console.log(_.sampleSize(smartTeam, 2));//可以指定随机返回2个
}

{
  // -------------------------- 判断对象中是否含有某元素 ----------------------------
  console.log('-------------------------- 判断对象中是否含有某元素 ----------------------------');
  var smartPerson = {
    'name': '戈德斯文',
    'gender': 'male'
  },
    smartTeam = ["戈德斯文", "杨海月", "柴硕", "师贝贝"];

  // _.includes()第一个参数是需要查询的对象，第二个参数是需要查询的元素，第三个参数是开始查询的下标
  console.log(_.includes(smartPerson, '戈德斯文'));
  console.log(_.includes(smartTeam, '杨海月'));
  console.log(_.includes(smartTeam, '杨海月', 2));


}

{
  // -------------------------- map遍历循环执行某个方法 ----------------------------
  console.log('-------------------------- map遍历循环执行某个方法 ----------------------------');
  function square(n) {
    return n * n;
  }

  console.log(_.map([4, 8], square));
  // => [16, 64]

  console.log(_.map({ 'a': 4, 'b': 8 }, square));
  // => [16, 64] (iteration order is not guaranteed)

  var users = [
    { 'user': 'barney' },
    { 'user': 'fred' }
  ];

  // The `_.property` iteratee shorthand.
  console.log(_.map(users, 'user'));
  // => ['barney', 'fred']
}

{
  // -------------------------- 检验值是否为空对象 ----------------------------
  console.log('-------------------------- 检验值是否为空对象 ----------------------------');
  _.isEmpty(null);
  // => true

  _.isEmpty(true);
  // => true

  _.isEmpty(1);
  // => true

  _.isEmpty([]);
  // => true

  _.isEmpty({});
  // => true

  _.isEmpty([1, 2, 3]);
  // => false

  _.isEmpty({ 'a': 1 });
  // => false

  console.log(_.isEmpty({}));

}

{
  // -------------------------- 查找属性 ----------------------------
  console.log('-------------------------- 查找属性 ----------------------------');

  // find 返回找到的第一个元素,未找到返回undefined
  // filter 返回找到的元素组成的数组,未找到返回[]

  var users = [
    { 'user': 'pebbles', 'age': 1, 'active': true },
    { 'user': 'barney', 'age': 36, 'active': true },
    { 'user': 'fred', 'age': 40, 'active': false }

  ];

  var arr = _.find(users, function (o) {
    return o.age < 36;
  })
  console.log(arr);
  // console.log(_.find(users, {'age': 1, 'active': true}));
  console.log(_.filter(users, { 'age': 1, 'active': true }));
  console.log(_.filter(users, { 'age': 'aaaa' }));
  // console.log(_.find(users, ['active', false]));
  // console.log(_.filter(users, ['active', false]));
  // console.log(_.find(users, 'active'));
  // console.log(_.filter(users, 'active'));
}

{

  // -------------------------- 数组去重 ----------------------------
  console.log('-------------------------- 数组去重 ----------------------------');
  var arr1 = [2, 1, 2];

  var arr2 = _.uniq(arr1);


  function unique(arr) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
      if (newArr.indexOf(arr[i]) == -1) {
        newArr.push(arr[i]);
      }
    }
    return newArr;
  }

  console.log(arr1);
  console.log(arr2);
  console.log(unique(arr1));
}

{
  // -------------------------- pick从某个对象中选择部分属性组成新的对象 ----------------------------
  console.log('-------------------------- pick从某个对象中选择部分属性组成新的对象 ----------------------------');

  var objA = { "name": "colin", "car": "suzuki", "age": 17 };

  var objB = _.pick(objA, ['car', 'age']);

  // {"car": "suzuki", "age": 17}


}
{
  // -------------------------- compact，去除假值。（将所有的空值，0，NaN过滤掉） ----------------------------
  console.log('-------------------------- compact，去除假值。（将所有的空值，0，NaN过滤掉） ----------------------------');
  _.compact(['1', '2', ' ', 0])
  // => ['1','2']
}

{
  // -------------------------- cancat，数组连接 ----------------------------
  console.log('-------------------------- cancat，数组连接 ----------------------------');

  var array = [1];
  var other = _.concat(array, 2, [3], [[4]]);

  console.log(other);
  // => [1, 2, 3, [4]]

  console.log(array);
  // => [1]
}

{
  // -------------------------- keys ，取出对象中所有的key值组成新的数组 ----------------------------
  console.log('-------------------------- keys ，取出对象中所有的key值组成新的数组 ----------------------------');
  // 类似object.keys()，返回对象中可枚举属性的数组。
  
  function Foo() {
    this.a = 1;
    this.b = 2;
  }

  Foo.prototype.c = 3;

  _.keys(new Foo);
  // => ['a', 'b'] (iteration order is not guaranteed)

  _.keys('hi');
  // => ['0', '1']



}