$(function(){
	var item0=["Inn：你们还没结婚，财产也没放一块用，他只要不用你的钱，也没什么好指责的啊。","追追301：确实是，在Boxhill开车有一种在中国开车的直视感","美辰：怎么感觉看下来楼主有点作，两个人之间不信任。","森林Oran：绝对是阴谋，这个是澳洲厂家联合药房忽悠代购的，真丢人！","iku：人应该守住自己的底线 钱买不来感情","RickLiang：大家尋求解決方法，不要你一個人擔","别刹我：之前在city吃饭，看见服务员往菜里吐口水，不敢点名","Chen：澳洲圈子太小 原来大家都是连襟 哈哈。","浪迹天涯Jacky：标题应该改为：套路及反套路","墨尔本Jason清洁：我从未见过如此厚颜无耻之人","May：：不以上床为目的的婚姻都是耍流氓","JeeZ：如果是我，直接上手！打得他妈都不认识！","三胖是我儿：不是没有，是交友不慎吧","Ariene：澳洲华人的脸都被这帮人丢尽了","哒哒哒：像你这么厚颜无耻有脸这么说话的人真是不知道怎么骂你好。","YYYY：丧心病狂，世界是怎么了？毁三观。"];
	var item1=["Leon：我也是啊，出去吃饭，同学让我先付，后来又跟没事人一样，哎","Monica：这.... 不分手还留着过年？楼主不哭，绿帽带起","张张：我假装看不懂的样子 黑人脸.jpg","Miao：突然想起我每次跟同学去MC，感觉游戏最能看出人的本性了，有的人太把游戏当回事了。","冬冬想回国：以后跟这种人保持点距离","特切：最讨厌玩游戏的男的。。。没完没了的，分秒必争的玩游戏","MIchael：政府有个compare电费的网站，你把你账单输进去，会告诉你哪家公司最合适的，我上次换了公司，电费便宜了一半。是.gov.au结尾的网址，别上错了","索菲亚：当初以为的真爱，其实都是犯贱","可可nini：你钱也不是大风刮来的！！别跟这种人打交道了","刚把跌：你没错 错的是你男友","Daisu：套路玩得深，谁把谁当真","Queenie9：这道题太难了，我求不出来"];
	var item2=["暖风如夏：不要怕撕破脸，不然后面是你是吃亏","Song：明明互为备胎却要装真情，何必呢","某人2381：现在的女生没理了，只会骂直男癌，真low","Angel：楼主别担心，现在澳洲做人流的多了去了，我一同学还染上肝病了呢，偷偷请假回国治病","Seven宋：个人觉得，说了的话break up的几率很大","蜗牛：分是最好的结局，从一个男人的角度来看不值得你珍惜 姑娘","Animita：如果楼主家里真的有这么有背景，那还是回国比较好。","Sabb：这是一道送分题。","素素：用这种软件的男人都是想出轨的。不过放心，澳洲这地方，上面只有小姐，他连免费炮都约不到。","浪子：这种人就是想空手套白狼 小心别被骗了","独步跳舞：他是你心里的发型师，也是所有女顾客的Tony，这都是套路，懂吗？","澳洲妈妈：小三就该打！建议把财产都转移了，让贱男和小三都喝西北风去"];
	var item3=["Sunny回国吃烤肉：一个男生说只喜欢没有爱的潜台词是 我们是炮友","爷爷穷十代：把他妈拍个照，让我们开开眼，没想到澳洲有这种老流氓","Song：明明互为备胎却要装真情，何必呢","YJK：我当年也是被同事掰弯……一开始也是会害怕逃避，后来还是一起了……","丁丁澳代：性生活很重要 弟弟小是他的错","Elise：最好还是别帮，农夫与蛇的故事你应该懂，人心隔肚皮，你们不是一路人","Yuki：绿他，然后再分！","成功成仁：预感楼主要作大死了，强势围观，前排出售爆米花矿泉水","不想真名：在澳洲，中国驾照只要翻译就能开车，但还是建议楼主提前学下交规","九八八：早就说了，朋友圈那些点赞的都是骗人，你还相信，智商感人","AT：你老公呢？还是男人吗","只有负能量：在澳洲混，人之贱则无敌，大家都是套路，认真你就输了，这些人到处都是","二二：我的朋友就是我系列","南半球的樱花：忍字头上一把刀，看是愿意插在自己心里还是男朋友身上了，我反正怕疼。","我才是冯小刚：澳洲华人有三宝：代购 房产 开餐馆"];
	var items=[item0,item1,item2,item3];
	
	var speed0=34;
	var speed1=20;
	var speed2=20;
	var speed3=22;
	
	var itemsHtml="";
	for(var i=0;i<4;i++){
		itemsHtml="";
		for(var j=0;j<items[i].length;j++){
			itemsHtml+='<td valign="middle">'+items[i][j]+'</td>';
		}
		$(".danmu").eq(i).find("table").find("table").find("tr").html(itemsHtml);
		$(".danmu").eq((i+4)).find("table").find("table").find("tr").html(itemsHtml);
	}
	
	$('.danmu2').html($('.danmu1').html()); 
	
	function Marquee_0(){ 
		if($('.danmu2').eq(0).outerWidth()-$('.danmu').eq(0).scrollLeft()<=0) 
			$('.danmu').eq(0).scrollLeft($('.danmu').eq(0).scrollLeft()-$('.danmu1').eq(0).outerWidth()); 
		else{ 
			$('.danmu').eq(0).scrollLeft($('.danmu').eq(0).scrollLeft()+1); 
		} 
		
		if($('.danmu2').eq(2).outerWidth()-$('.danmu').eq(2).scrollLeft()<=0) 
			$('.danmu').eq(2).scrollLeft($('.danmu').eq(2).scrollLeft()-$('.danmu1').eq(2).outerWidth()); 
		else{ 
			$('.danmu').eq(2).scrollLeft($('.danmu').eq(2).scrollLeft()+1); 
		}
		
		if($('.danmu2').eq(4).outerWidth()-$('.danmu').eq(4).scrollLeft()<=0) 
			$('.danmu').eq(4).scrollLeft($('.danmu').eq(4).scrollLeft()-$('.danmu1').eq(4).outerWidth()); 
		else{ 
			$('.danmu').eq(4).scrollLeft($('.danmu').eq(4).scrollLeft()+1); 
		} 
		
		if($('.danmu2').eq(6).outerWidth()-$('.danmu').eq(6).scrollLeft()<=0) 
			$('.danmu').eq(6).scrollLeft($('.danmu').eq(6).scrollLeft()-$('.danmu1').eq(6).outerWidth()); 
		else{ 
			$('.danmu').eq(6).scrollLeft($('.danmu').eq(6).scrollLeft()+1); 
		}  
	} 
	
	function Marquee_1(){ 
		if($('.danmu2').eq(1).outerWidth()-$('.danmu').eq(1).scrollLeft()<=0) 
			$('.danmu').eq(1).scrollLeft($('.danmu').eq(1).scrollLeft()-$('.danmu1').eq(1).outerWidth()); 
		else{ 
			$('.danmu').eq(1).scrollLeft($('.danmu').eq(1).scrollLeft()+1); 
		} 
		if($('.danmu2').eq(3).outerWidth()-$('.danmu').eq(3).scrollLeft()<=0) 
			$('.danmu').eq(3).scrollLeft($('.danmu').eq(3).scrollLeft()-$('.danmu1').eq(3).outerWidth()); 
		else{ 
			$('.danmu').eq(3).scrollLeft($('.danmu').eq(3).scrollLeft()+1); 
		} 
		if($('.danmu2').eq(5).outerWidth()-$('.danmu').eq(5).scrollLeft()<=0) 
			$('.danmu').eq(5).scrollLeft($('.danmu').eq(5).scrollLeft()-$('.danmu1').eq(5).outerWidth()); 
		else{ 
			$('.danmu').eq(5).scrollLeft($('.danmu').eq(5).scrollLeft()+1); 
		} 
		if($('.danmu2').eq(7).outerWidth()-$('.danmu').eq(7).scrollLeft()<=0) 
			$('.danmu').eq(7).scrollLeft($('.danmu').eq(7).scrollLeft()-$('.danmu1').eq(7).outerWidth()); 
		else{ 
			$('.danmu').eq(7).scrollLeft($('.danmu').eq(7).scrollLeft()+1); 
		} 
	} 
	
	function Marquee_2(){ 
		
	} 
	
	function Marquee_3(){ 
		
	} 
	var MyMar0=setInterval(Marquee_0,speed0);
	var MyMar1=setInterval(Marquee_1,speed1);
	//var MyMar2=setInterval(Marquee_2,speed2); 
	//var MyMar2=setInterval(Marquee_3,speed3); 
	//danmu.onmouseover=function() {clearInterval(MyMar);} 
	//danmu.onmouseout=function() {MyMar=setInterval(Marquee,speed);
})