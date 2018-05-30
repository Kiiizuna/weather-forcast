
var log = function() {
    console.log.apply(console, arguments)
}

//获取数据和更新渲染数据

var getData = function() {
	var xhr = new XMLHttpRequest()
	xhr.open("get","http://weixin.jirengu.com/weather?key=study_javascript_in_jirengu.com", true)
	xhr.send()
	xhr.onload = function() {
		log(JSON.parse(xhr.responseText))
		var response = JSON.parse(xhr.responseText)
		log("response", response)
		//开始渲染
		var city = document.querySelector(".location .city")
		city.innerText = response.weather[0].city_name
		var time = document.querySelector(".location .time")
		var updateTime = new Date(response.weather[0].last_update)
		time.innerText = updateTime.getHours() + " : " + updateTime.getMinutes() + " 更新"
		//更新各项生活信息
		var tabs = document.querySelectorAll(".suggestion ul .title")
		var lifeInfo = response.weather[0].today.suggestion
		log("lifeInfo", lifeInfo)
		for (var i = 0; i < tabs.length; i++) {
			tabs[i].innerText = Object.keys(lifeInfo)[i]
		}
		//更新panels里详细建议
		var panels =  document.querySelectorAll(".suggestion .panels li")
		log("details", Object.keys(lifeInfo))
		for (var i = 0; i < tabs.length; i++) {
			var keys = Object.keys(lifeInfo)
			log(lifeInfo.dressing.details)
			log("keys", keys[i])
			var j = keys[i]
			panels[i].innerText = lifeInfo[j].details
		}
		//更新当前温度信息
		var currentTemp = document.querySelector(".detail .today .num")
		log(currentTemp)
		currentTemp.innerText = response.weather[0].now.feels_like
		//更新当前日期
		var currentDate = document.querySelector(".detail .today .date")
		var month = updateTime.getMonth() + 1
		var date = updateTime.getDate()
		var week = response.weather[0].future[0].day
		var weatherText = response.weather[0].future[0].text
		currentDate.innerText = `${month}月${date}日 ${week}`
		//更新额外信息
		var extra = document.querySelector(".detail .extra-info")
		extra.innerText = weatherText
		//更新当日的图片
		var pic = document.querySelector(".detail .weather-pic img")
		log("pic", pic)
		var weatherCode = response.weather[0].future[0].code1
		pic.src = `http://weixin.jirengu.com/images/weather/code/${weatherCode}.png`
		//更新future的信息
		var futureDate = document.querySelectorAll(".future .week")
		var futureImgs = document.querySelectorAll(".future .weather-pic img")
		var futureTemp = document.querySelectorAll(".future .temp")
		for (var i = 0; i < futureDate.length; i++) {
			futureDate[i].innerText = response.weather[0].future[i + 1].day
			futureImgs[i].src = `http://weixin.jirengu.com/images/weather/code/${response.weather[0].future[i + 1].code1}.png`
			futureTemp[i].innerText = response.weather[0].future[i + 1].high + " / " + response.weather[0].future[i + 1].low + " °C"
		}
		// tab 切换效果实现
		var tabsParent = document.querySelector(".suggestion .tabs")
		var tabsList = document.querySelectorAll(".suggestion .tabs>li")

		tabsParent.addEventListener("click", function(event) {
			var target = event.target
			var index = indexOfElement(target) //找到tab的index用自己定义函数
			log("target is", target)
			for (var i = 0; i < tabsList.length; i++) {
				tabsList[i].classList.remove("active")// del all active
				log("panels is", panels)
				log("index", index)
				panels[i].classList.remove("active") // del all active
				panels[index].classList.add("active")

			}
			target.classList.add("active")
		// 和panels bind在一起
			
			

		})



	}	
}

var fixTime = function(t) {
	if (t.toString().length === 1) {
		return "0" + t
	};
}

//获取元素下标
var indexOfElement = function(element) {
	var parent = element.parentElement
	for (var i = 0; i < parent.children.length; i++) {
		var e = parent.children[i]
		if (e === element) {
			return i
		}
	}

}

getData()
