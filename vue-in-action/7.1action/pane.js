Vue.component("pane",{
	props:{
		name:{
			type:String
		},
		label:{
			type:String,
			default:''
		},
	},
	name:'pane',
	template:`
		<div class="pane" v-show="show">
			<slot></slot>
		</div>
	`,
	data () {
		return {
			show:true
		}
	},
	methods:{
		updateNav () {
			this.$parent.updateNav();
		},
	},
	watch: {
		label () {
			this.updateNav();
		}
	},
	// 在生命周期mounted，也就是pane初始化的时候，调用一遍tabs的updateNav方法，
	// 同时监听了prop:label,在label更新时，同样调用
	mounted () {
		this.updateNav();
	}
})