// components/multiSelector/multiSelector.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    items: Array,
    placeholder: {
      type: String,
      value: ''
    },
    placeholderClass: {
      type: String,
      value: 'input-placeholder'
    },
    placeholderStyle: String,
    disabled: {
      type: Boolean,
      value: false
    },
    value: Array,
    showValue: { //显示选择的结果还是选择的内容
      type: Boolean,
      value: true
    },
    closeOnClickModal: {
      type: Boolean,
      value: true
    },
    cancelButtonText: {
      type: String,
      value: '取消'
    },
    confirmButtonText: {
      type: String,
      value: '确定'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    modalOpen: false,
    opacityAnimation: {},
    popAnimation: {},
    selected: [],
    tempValue: [],
    tempSelected: [],
    changed: false //一个flag
  },
  attached() {
    //初始化已选择
    const value = this.data.value;
    console.log(value.length)
    const items = this.data.items;
    const selected = [];
    for (let i = 0; i < value.length; i++) {
      for (let j = 0; j < items.length; j++) {
        if (value[i] === items[j].name) {
          selected.push(items[j].value);
          items[j].checked = true;
          break;
        }
      }
    }
    this.setData({
      items: items,
      selected: selected
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    bindCheckboxChange(e) {
      const value = e.detail.value;
      const items = this.data.items;
      items.forEach(item => { item.checked = false });
      const selected = [];
      for (let i = 0; i < value.length; i++) {
        for (let j = 0; j < items.length; j++) {
          if (value[i] === items[j].name) {
            items[j].checked = true;
            selected.push(items[j].value);
            break;
          }
        }
      }
      this.setData({
        changed: true,
        items: items,
        tempValue: value,
        tempSelected: selected
      })
    },
    showModal(e) {
      // if(this.data.disabled){
      //   return;
      // }
      this.triggerEvent('modalopen');
      //先将原来的选择结果备份
      const value = this.data.value;
      const items = this.data.items;
      items.forEach(item => { item.checked = false });
      for (let i = 0; i < value.length; i++) {
        for (let j = 0; j < items.length; j++) {
          if (value[i] === items[j].name) {
            items[j].checked = true;
            break;
          }
        }
      }

      var opacityAnimation = wx.createAnimation({
        duration: 200,
        timingFunction: '"linear"',
        delay: 0
      });
      opacityAnimation.opacity(1).step();
      this.setData({
        changed: false,
        items: items,
        modalOpen: true
      })
    },
    hideModal(e) {
      this.triggerEvent('modalclose');
      const action = e.currentTarget.dataset.action || 'cancel';
      var opacityAnimation = wx.createAnimation({
        duration: 200,
        timingFunction: 'linear',
        delay: 0
      });
      opacityAnimation.opacity(0).step();
      if (action === 'cancel' || !this.data.changed) {
        this.setData({
          tempValue: [],
          tempSelected: [],
          modalOpen: false
        })
      } else {
        this.setData({
          value: this.data.tempValue,
          selected: this.data.tempSelected,
          modalOpen: false
        });
        this.triggerEvent('change',{value: this.data.value});
      }
    }
  }
})
