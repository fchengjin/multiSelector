//index.js
Page({
  data: {
    value: ['A','B','D','F','G'],
    items: [{name: 'A',value: '苹果'},{name: 'B',value: '橘子'},{name: 'C',value: '香蕉'},{name: 'D',value: '西瓜'},{name: 'E',value: '梨子'},{name: 'F',value:'火龙果'},{name: 'G',value: '车厘子'}]
  },
  //事件处理函数

  onLoad: function () {

  },
  onModalOpen(){

  },
  onModalClose(){

  },
  bindSelectorChange(e){
	this.setData({
		value: e.detail.value
	})
  }
})
