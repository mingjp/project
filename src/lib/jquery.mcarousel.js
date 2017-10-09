;(function($){
	// $.xCarousel = function(){}
	// $.prototype.xCarousel = function(options){}
	$.fn.mCarousel = function(options){
		// 属性
		var defaults = {
			// 宽高
			width:320,
			height:320,

			// 自动轮播
			autoPlay:true,

			// 显示左右按钮
			showButton:true,

			// 是否显示页码
			showPage:true,

			// 播放间隔
			duration:3000,

			// 轮播类型：fade:淡入淡出, vertial:垂直滚动, horizontal:水平滚动, show:幻灯片
			type:'vertical',

			// 默认显示图片索引
			index:0
		}

		// 这里的this,jquery对象
		this.each(function(){
			//这里的this为DOM节点
			var $this = $(this);

			var opt = $.extend({},defaults,options);


			var carousel = {
				init:function(){
					

					// 生成html结构
					var $ul = $('<ul/>');
					$ul.html(opt.imgs.map(function(item){
						return `<li><a href="#"><img src="${item}"/></a></li>`;
					}).join(''));

					$this.append($ul);

					// 添加插件样式
					$this.addClass('xcarousel');
					$ul.addClass(opt.type);
					if(opt.type === 'horizontal'){
						$ul.width(opt.width*opt.imgs.length);
					}else if(opt.type === 'fade'){
						$ul.css({
							width:opt.width,
							height:opt.height
						});
					}

					// 设置宽高
					$this.css({
						width:opt.width,
						height:opt.height
					});

					// 页码
					if(opt.showPage){
						var $page = $('<div/>').addClass('page');

						// 重复生成span标签
						var page_html = '<span></span>'.repeat(opt.imgs.length);
						$page.html(page_html);

						// 当前分页添加高亮
						// $page.children().eq(opt.index).addClass('active');

						// $this.append($page);
						$page.appendTo($this);
					}else if(opt.showSmall){
						var $small = $('<div/>').addClass('small');
						var $cloneUl = $ul.clone().removeClass().attr('style','');
						$cloneUl.appendTo($small);

						$small.appendTo($this);

						$small.width(opt.imgs.length*42);
					}

					// 左右按钮
					if(opt.showButton){
						var $btnPrev = $('<span/>').addClass('btn-prev').html('&lt;');
						var $btnNext = $('<span/>').addClass('btn-next').html('&gt;');

						$this.append([$btnNext,$btnPrev]);
					}

					// 自动轮播
					if(opt.autoPlay){
						this.start();
						// $this.trigger('mouseleave');

						$this.on('mouseenter',()=>{
							
							opt.showButton=true;
							this.stop();
						}).on('mouseleave',()=>{
							this.start();
						})
					}

					
					

					// 点击页码
					$this.on('click','.page span',function(){
						opt.index = $(this).index();
						carousel.move();
					})

					// 左右按钮
					.on('click','.btn-prev',function(){
						opt.index--;
						carousel.move();
					}).on('click','.btn-next',function(){
						opt.index++;
						carousel.move();
					});


					// 显示当前图片
					this.move();
				},
				move:function(){
					// 处理index值
					if(opt.index>=opt.imgs.length){
						opt.index = 0;
					}else if(opt.index<0){
						opt.index = opt.imgs.length-1;
					}

					var $ul = $this.find('ul');

					// 动画属性
					var params = {};

					// 水平垂直
					if(opt.type === 'vertical'){
						params.top = -opt.index*opt.height;
						$ul.animate(params);
					}else if(opt.type === 'horizontal'){
						params.left = -opt.index*opt.width;
						$ul.animate(params);
					}

					// 淡入淡出
					else if(opt.type === 'fade'){
						$ul.children().eq(opt.index).animate({opacity:1}).siblings('li').animate({opacity:0});
					}

					

					// 高亮显示页码
					if(opt.showPage){
						$this.find('.page').children().eq(opt.index).addClass('active').siblings('span').removeClass();
					}else if(opt.showSmall){
						$this.find('.small li').eq(opt.index).addClass('active').siblings('li').removeClass();
					}
				},
				stop:function(){
					clearInterval(opt.timer);
				},
				start:function(){
					opt.timer = setInterval(function(){
						opt.index++;
						this.move();
					}.bind(this),opt.duration);
				}
			}

			carousel.init();
		});
		
		// 为了链式调用
		return this;
	}


	//放大镜
	function XZoom(options){
    
    this._init(options);
}

XZoom.prototype = {
    //生成DOM节点
    //绑定事件
    _init:function(options){
        // 默认属性
        var defaults = {
            // 大图的宽高
            width:400,
            height:300,

            // 大图显示位置
            position:'right',

            // 大图与小图的间距
            gap:15,

            // 需要实现放大效果的元素
            ele:'.xzoom'
        }

        // 扩展参数
        var opt = Object.assign({},defaults,options);

        // 小图容器
        this.ele = document.querySelector(opt.ele);

        // 小图
        var smallImg = this.ele.children[0];


        
        //生成DOM节点(大图)
        var big = document.createElement('div');
        big.className = 'xzoom-big';
        var bigImg = new Image();
        bigImg.src = smallImg.dataset.big;

        // 定义大图样式
        big.style.width = opt.width + 'px';
        big.style.height = opt.height + 'px';

        big.appendChild(bigImg);

        smallImg.onload = ()=>{
            // 大图位置
            if(opt.position === 'right'){
                big.style.left = this.ele.offsetLeft + smallImg.offsetWidth + opt.gap + 'px';
                big.style.top = this.ele.offsetTop + 'px';
            }else if(opt.position === 'left'){
                big.style.left = this.ele.offsetLeft - opt.width - opt.gap + 'px';
                big.style.top = this.ele.offsetTop + 'px';
            }else if(opt.position === 'top'){
                big.style.left = this.ele.offsetLeft + 'px';
                big.style.top = this.ele.offsetTop - opt.height - opt.gap + 'px';
            }else if(opt.position === 'bottom'){
                big.style.left = this.ele.offsetLeft + 'px';
                big.style.top = this.ele.offsetTop + this.ele.offsetHeight + opt.gap + 'px';
            }
        }


        // 生成放大镜
        var zoom = document.createElement('span');
        zoom.className = 'minzoom';


        // 传递big
        this.big = big;
        this.zoom = zoom;



        // 鼠标移入移出
        this.ele.onmouseenter = (e)=>{
            // if(不在这个位置){
            //  return;
            // }
            this.show();
        }
        this.ele.onmouseleave = ()=>{
            this.hide();
        }

        this.ele.onmousemove = (e)=>{
            var left = e.clientX - this.ele.offsetLeft - this.zoom.offsetWidth/2;
            var top = e.clientY - this.ele.offsetTop - this.zoom.offsetHeight/2;

            // 限定left，top值
            if(left<0){
                left = 0;
            }else if(left > smallImg.offsetWidth-this.zoom.offsetWidth){
                left = smallImg.offsetWidth-this.zoom.offsetWidth
            }

            if(top<0){
                top = 0;
            }else if(top > smallImg.offsetHeight-this.zoom.offsetHeight){
                top = smallImg.offsetHeight-this.zoom.offsetHeight
            }

            // 定位放大镜
            // 跟随鼠标移动
            this.zoom.style.left = left + 'px';
            this.zoom.style.top = top + 'px';


            bigImg.style.left = -left * this.ratio + 'px';
            bigImg.style.top = -top * this.ratio + 'px';
        }

    },
    // 显示
    show:function(){
        
        document.body.appendChild(this.big);
        this.ele.appendChild(this.zoom);

        var bigImg = this.big.children[0];
        var smallImg = this.ele.children[0];

        if(bigImg.complete){
            this.ratio = bigImg.offsetWidth/smallImg.offsetWidth;

            // 定义放大镜尺寸
            this.zoom.style.width = this.big.offsetWidth/this.ratio + 'px';
            this.zoom.style.height = this.big.offsetHeight/this.ratio + 'px';
        }

        // 计算大图与小图的比率
        bigImg.onload = ()=>{
            this.ratio = bigImg.offsetWidth/smallImg.offsetWidth;

            // 定义放大镜尺寸
            this.zoom.style.width = this.big.offsetWidth/this.ratio + 'px';
            this.zoom.style.height = this.big.offsetHeight/this.ratio + 'px';
        }
    },
    hide:function(){
        this.big.parentNode.removeChild(this.big);
        this.zoom.parentNode.removeChild(this.zoom);
    }

}


function xZoom(options){
    return new XZoom(options);
}

})(jQuery);





// $('.box').xCarousel();