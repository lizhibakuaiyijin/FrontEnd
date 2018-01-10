var app = new Vue({
	el: "#app",
	data:{
		list:[
			{
				id:1,
				name:"iPhone 7",
				price: 6188,
				count:1,
			},
			{
				id:2,
				name:"iPad Pro",
				price:5888,
				count:1
			},
			{
				id:3,
				name:"MacBook Pro",
				price:21488,
				count:1
			}
		]
	},
	computed:{
		totalPrice () {
			var total = 0;
			for (let i = 0; i < this.list.length; i++) {
				let item = this.list[i];
				total += item.price * item.count;
			}
			return total.toString().replace(/\B(?=(\d{3})+$)/g,',')
		}
	},
	methods:{
		handleReduce (index) {
			// 虽然在button上绑定了disabled特性，
			// 但是在handleReduce方法内又判断了一遍，
			// 这是因为在某些时候，可能不一定会用到button元素，也可能是div，span等，
			// 给他们增加disabled是没有任何作用的，所以安全起见，在业务逻辑里再判断一次，
			// 避免因修改HTML模板后出现bug
			if(this.list[index].count === 1) return;
			this.list[index].count--;
		},
		handleAdd (index) {
			this.list[index].count++;
		},
		handleRemove (index) {
			this.list.splice(index,1);
		}
	}
})