var canvas = document.getElementById('logo-canvas'),
	ctx = canvas.getContext('2d'),
	logo_wrap = document.getElementById('logo-wrap'),
	splash = document.getElementById('splash'),
	logo_img = document.getElementById('logo-img'),
	color = "blue",
	lasttime,
	freeze;
	console.log(canvas);


function fixdim() {
	dimensions.update()

	var displaywidth = Math.sqrt(dimensions.width)*18//dimensions.width > 900 ? 900 : 450

	var doc = document.documentElement;
	var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

	// logo_wrap.style.top = top / 2 + 'px'
	var rect = splash.getBoundingClientRect()
	var bottom = rect.top + rect.height

	var fadestart = rect.height/2

	logo_wrap.style.opacity = Math.max(Math.min((bottom-fadestart)/fadestart,1),0)

	logo_img.style.width = displaywidth + 'px'

	if(!freeze){
		var displayheight = displaywidth * 4/15 //dimensions.width > 900 ? 250 : 125
		canvas.width = displayheight*window.devicePixelRatio
		canvas.style.width = displayheight + 'px'
		canvas.height = displayheight*window.devicePixelRatio
		canvas.style.height = displayheight + 'px'
	}
}

addEventListener('scroll', fixdim)

var gh = .12;

function main (time) {
	fixdim()
	ctx.clearRect(0,0,canvas.width,canvas.height)

	var t = time/10000

	ctx.strokeStyle = ctx.fillStyle = color
	var sm = 1

	var m = tesseractwithrotation(t, t*2, t*3, mouse.x/100, mouse.y/100, 0)

	drawtesseract(ctx, m, {
		x: canvas.width/2,
		y: canvas.height/2,
		size: gh*canvas.height,
		line_width: 2,
	})

	lasttime = time
	requestAnimationFrame(main)
}



requestAnimationFrame(function init(t) {
	fixdim()
	lasttime = t
	requestAnimationFrame(main)
})



//*********************  WINDOW DIMENSIONS  *********************

var dimensions = {

	width:0,

	height:0,

	getWidth: function () {
		if (window.innerWidth) {
		   return window.innerWidth;
		}
		if (document.documentElement && document.documentElement.clientHeight){
			return document.documentElement.clientWidth;
		}
		if (document.body) {
			return document.body.clientWidth;
		}
		return 0;
	},

	getHeight: function () {
		if (window.innerWidth) {
		   return window.innerHeight;
		}
		if (document.documentElement && document.documentElement.clientHeight){
			return document.documentElement.clientHeight;
		}
		if (document.body) {
			return document.body.clientHeight;
		}
		return 0;
	},

	update: function () {
		var curW = this.getWidth()
		var curH = this.getHeight()
		if (curW!=this.width||curH!=this.height){
			this.width=curW
			this.height=curH
			return true
		}
		return false
	}
}


//*********************  MOUSE  *********************

var mouse = {
	x: 0,
	y: 0,
	direction:0,

	start: {
		x:0,
		y:0
	},

	dragging: false,

	set: function (x,y) {
		mouse.x = x
		mouse.y = y
		mouse.direction = Math.atan2(y-mouse.start.y,x-mouse.start.x)
	},

	coords: function (e) {
		// e.preventDefault();
		if(e.pageX){
			mouse.set(e.pageX,e.pageY)
		}
		else if(e.offsetX) {
			mouse.set(e.offsetX,e.offsetY)
		}
		else if(e.layerX) {
			mouse.set(e.layerX,e.layerY)
		}
		else if(e.targetTouches && e.targetTouches.length > 0){
			mouse.set(e.targetTouches[0].pageX,e.targetTouches[0].pageY)
		}
	},

	down: function (e) {
		mouse.coords(e)
		mouse.start.x=mouse.x
		mouse.start.y=mouse.y
		mouse.dragging = true
		// console.log(e)

	},

	up: function (e) {
		mouse.coords(e)
		mouse.dragging = false
	}
}

document.addEventListener("touchstart", mouse.down, true);
document.addEventListener("touchend", mouse.up, true);
document.addEventListener("touchmove", mouse.coords, true);

document.addEventListener("mousedown", mouse.down, true);
document.addEventListener("mouseup", mouse.up, true);
document.addEventListener("mousemove", mouse.coords, true);
