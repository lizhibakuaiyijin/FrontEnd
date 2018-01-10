Vue.component("'tabs",{
	template:`
		<div class="tabs">
			<div class="tabs-bar">
				// 标签页标题，这里要用v-for
			</div>
			<div class="tabs-content">
				// 这里的slot就是嵌套的pane
				<slot></slot>
			</div>
		</div>
	`,
	data () {
		return {
			// 用来渲染tabs的标题
			navList:[]
		}
	},
	methods: {
		getTabs () {
			// 通过遍历子组件，得到所有的pane组件
			return this.$children.filter( (item) => {
				return item.$options.name === 'pane'
			})
		},
		updateNav () {
			this.navList = [];
			// 设置对this的引用，在function回调里，this指向的并不是Vue实例
			var _this = this;
			this.getTabs().forEach( (pane,index)=>{
				_this.navList.push({
					label:pane.label,
					name:pane.name || index
				});
				// 如果没有给pane设置name，默认设置它的索引
				if (!pane.name) {
					pane.name = index;
				}
				// 设置当前选中的tab的索引，在后面介绍
				
			})
		}
	}
})