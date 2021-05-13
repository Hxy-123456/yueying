// index.js
// 获取应用实例


Page({
  data: {
    num: '123',
    op: '+',
  },
  // result 用于保存上次的运算结果
  result: null,
  // isClear的值若为false,表示下次输入的数字放在末尾；为true替换当前数字
  isClear: false,
  // 点击数字键
  numtBtn: function (e) {  //数字的拼接与替换
    // 接收data-val的数值
    var num = e.target.dataset.val;
    // 
    if (this.data.num == '0' || this.isClear) { //page内的对象用this调用
      this.setData({
        num: num     //将数字替换‘0’
      })
      this.isClear = false;
    } else {
      this.setData({
        num: this.data.num + num
      })
    }


  },

  // 点击运算键
  opBtn: function (e) {  //本次循环时执行的都是上一次的运算，点击等号时也是如此
    var op = this.data.op;   //获取上一次运算的运算符
    var num = Number(this.data.num);
    this.setData({
      op: e.target.dataset.val  //将本次的用户点击的运算符存取data中
    })
    if (this.isClear) {  //判断是否点击过运算键
      return
    }
    this.isClear = true;  //运算前先判断，防止多次重复点击运算符
    if (this.result == null) {   //初始值为空，无法进行运算，不参与运算
      this.result = num;
      return;
    }
    if (op == '+') {
      this.result = this.result + num;;
    }
    if (op == '-') {
      this.result = this.result - num;;
    }
    if (op == '*') {
      this.result = this.result * num;;
    }
    if (op == '/') {
      this.result = this.result / num;;
    }
    if (op == '%') {
      this.result = this.result % num;;
    }
    this.setData({
      num: this.result + ''
    })
  },

  // 小数点
  dotBtn: function () {
    if (this.isClear) {
      this.setData({
        num: '0.'
      });
      this.isClear = false;
      return
    }
    if (this.data.num.indexOf('.') >= 0) {   //indexof有原点返回位置，没有返回-1
      return;
    }
    this.setData({
      num: this.data.num + '.'
    })
  },

  // 点击删除键
  delBtn: function () {
    var num = this.data.num.substr(0, this.data.num.length - 1)
    this.setData({
      num: num === '' ? '0' : num  //去除最后一位
    })
  },

  //点击重置键
  resetBtn: function () {
    this.result = null;
    this.isClear = false;
    this.setData({
      num: '0',
      op: ''
    })
  }

})