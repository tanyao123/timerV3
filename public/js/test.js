var timeleft=[];
var interval = 1000; 
var timers=[];
var pause=[0,0,0];
$(document).ready(function(){

	$('#then0').hide();
	$('#then1').hide();
	$('#then2').hide();
	for(var i=0;i<3;i++){
		var newTimer={timerName:"timer"+i,doneTime:0,state:0};
		timers.push(newTimer);
	}

	var username = $('#usernameget').val();
	var data = {username: username};
	$.ajax({
		url: "getState",		
		type: "post",
		dateType: "json",
		data: data,
		success: function(data){
			console.log(data);
			document.timer0.hours.value = data.timerHour[0];
			document.timer0.minutes.value = data.timerMinute[0];
			document.timer0.seconds.value = data.timerSecond[0];
			document.timer1.hours.value = data.timerHour[1];
			document.timer1.minutes.value = data.timerMinute[1];
			document.timer1.seconds.value = data.timerSecond[1];
			document.timer2.hours.value = data.timerHour[2];
			document.timer2.minutes.value = data.timerMinute[2];
			document.timer2.seconds.value = data.timerSecond[2];
			for(var i = 0; i < data.timerState.length; i ++){
				if(data.timerState[i] == 1){
					var date = new Date();
					var inihour=date.getHours();
					var iniminute=date.getMinutes();
					var inisecond=date.getSeconds();
					var hour=parseInt(document.timer0.hours.value)+inihour;
					var minute=parseInt(document.timer0.minutes.value)+iniminute;
					var second=parseInt(document.timer0.seconds.value)+inisecond;
					var sum=hour*3600+minute*60+second;
					timers[i].doneTime=sum2date(sum);
					var msg=timers[i].doneTime.getHours()+":"+timers[i].doneTime.getMinutes()+":"+timers[i].doneTime.getSeconds();
					$('#doneTime' + i).html(msg);
					$('#btn' + i).html('Stop');
				}else if(data.timerState[i] == 2){
					$('#btn' + i).html('resume');
				}else if(data.timerState[i] == 3){
					console.log($("#timer"+i).hours);
					document.getElementById("timer"+i).hours.value = 0;
					document.getElementById("timer"+i).minutes.value = 0;
					document.getElementById("timer"+i).seconds.value = 0;
					$("#btn"+i).html("DONE");
					$('#bg'+i).css("background-color","red");
				}else if(data.timerState[i] == 0){
					$('#btn'+i).html('Start');
					$('#doneTime'+i).html("");
				}
			}
		},
		error: function(data, msg){
			console.log(msg);
		}
	})

	
	$('#btn0').click(function(){
		//alert(timers[0].state);
		if(timers[0].state==1){
			$('#then0').show();
			$('#ini0').hide();
			timers[0].state=2;
			var data = {state: 2, timerNum: 0, username: username}
			$.ajax({
				url: "hanleState",		//handle the state change through ajax
				type: "post",
				dateType: "json",
				data: data,
				success: function(data){
					console.log(data);
				},
				error: function(data, msg){
					console.log(msg);
				}
			})
		}else if(timers[0].state==0){
			var date = new Date();
			var inihour=date.getHours();
			var iniminute=date.getMinutes();
			var inisecond=date.getSeconds();
			
			var hour=parseInt(document.timer0.hours.value)+inihour;
			var minute=parseInt(document.timer0.minutes.value)+iniminute;
			var second=parseInt(document.timer0.seconds.value)+inisecond;
			var sum=hour*3600+minute*60+second;
			timers[0].doneTime=sum2date(sum);
			
			var msg=timers[0].doneTime.getHours()+":"+timers[0].doneTime.getMinutes()+":"+timers[0].doneTime.getSeconds();
			$('#doneTime0').html(msg);
			$('#btn0').html('Stop');
			timers[0].state=1;
			var data = {state: 1, timerNum: 0, username: username, doneTime: msg}
			$.ajax({
				url: "hanleState",		
				type: "post",
				dateType: "json",
				data: data,
				success: function(data){
					console.log(data);
				},
				error: function(data, msg){
					console.log(msg);
				}
			})
		}else if(timers[0].state==3){
			$('#btn0').html('Start');
			$('#doneTime0').html("");
			timers[0].state=0;
			$('#bg0').css("background-color","white");
			var data = {state: 0, timerNum: 0, username: username}
			$.ajax({
				url: "hanleState",		
				type: "post",
				dateType: "json",
				data: data,
				success: function(data){
					console.log(data);
				},
				error: function(data, msg){
					console.log(msg);
				}
			})

		}
		
		//alert(date1);
	});
	
	$('#btn1').click(function(){
		//alert(timers[0].state);
		if(timers[1].state==1){
			$('#then1').show();
			$('#ini1').hide();
			
			timers[1].state=2;
			var data = {state: 2, timerNum: 1, username: username}
			$.ajax({
				url: "hanleState",		
				type: "post",
				dateType: "json",
				data: data,
				success: function(data){
					console.log(data);
				},
				error: function(data, msg){
					console.log(msg);
				}
			})
		}else if(timers[1].state==0){
			var date = new Date();
			var inihour=date.getHours();
			var iniminute=date.getMinutes();
			var inisecond=date.getSeconds();
			
			var hour=parseInt(document.timer1.hours.value)+inihour;
			var minute=parseInt(document.timer1.minutes.value)+iniminute;
			var second=parseInt(document.timer1.seconds.value)+inisecond;
			var sum=hour*3600+minute*60+second;
			timers[1].doneTime=sum2date(sum);
			
			var msg=timers[1].doneTime.getHours()+":"+timers[1].doneTime.getMinutes()+":"+timers[1].doneTime.getSeconds();
			$('#doneTime1').html(msg);
			$('#btn1').html('Stop');
			timers[1].state=1;
			var data = {state: 1, timerNum: 1, username: username, doneTime: msg}
			$.ajax({
				url: "hanleState",		
				type: "post",
				dateType: "json",
				data: data,
				success: function(data){
					console.log(data);
				},
				error: function(data, msg){
					console.log(msg);
				}
			})
		}else if(timers[1].state==3){
			$('#btn1').html('Start');
			$('#doneTime1').html("");
			timers[1].state=0;
			var data = {state: 0, timerNum: 1, username: username}
			$.ajax({
				url: "hanleState",		
				type: "post",
				dateType: "json",
				data: data,
				success: function(data){
					console.log(data);
				},
				error: function(data, msg){
					console.log(msg);
				}
			})
			$('#bg1').css("background-color","white");
		}
		
		//alert(date1);
	});
	
	$('#btn2').click(function(){
		//alert(timers[0].state);
		if(timers[2].state==1){
			$('#then2').show();
			$('#ini2').hide();
			
			timers[2].state=2;
			var data = {state: 2, timerNum: 2, username: username}
			$.ajax({
				url: "hanleState",		
				type: "post",
				dateType: "json",
				data: data,
				success: function(data){
					console.log(data);
				},
				error: function(data, msg){
					console.log(msg);
				}
			})
		}else if(timers[2].state==0){
			var date = new Date();
			var inihour=date.getHours();
			var iniminute=date.getMinutes();
			var inisecond=date.getSeconds();
			
			var hour=parseInt(document.timer2.hours.value)+inihour;
			var minute=parseInt(document.timer2.minutes.value)+iniminute;
			var second=parseInt(document.timer2.seconds.value)+inisecond;
			var sum=hour*3600+minute*60+second;
			timers[2].doneTime=sum2date(sum);
			
			var msg=timers[2].doneTime.getHours()+":"+timers[2].doneTime.getMinutes()+":"+timers[2].doneTime.getSeconds();
			$('#doneTime2').html(msg);
			$('#btn2').html('Stop');
			timers[2].state=1;
			var data = {state: 1, timerNum: 2, username: username, doneTime: msg}
			$.ajax({
				url: "hanleState",		
				type: "post",
				dateType: "json",
				data: data,
				success: function(data){
					console.log(data);
				},
				error: function(data, msg){
					console.log(msg);
				}
			})
		}else if(timers[2].state==3){
			$('#btn2').html('Start');
			$('#doneTime2').html("");
			timers[2].state=0;
			var data = {state: 0, timerNum: 2, username: username}
			$.ajax({
				url: "hanleState",		
				type: "post",
				dateType: "json",
				data: data,
				success: function(data){
					console.log(data);
				},
				error: function(data, msg){
					console.log(msg);
				}
			})
			$('#bg2').css("background-color","white");
		}
		
		//alert(date1);
	});
	
	
	$('#resume0').click(function(){
		var sum=date2sum(timers[0].doneTime);
		sum=sum+pause[0];
		pause[0]=0;
		var date=sum2date(sum);
		timers[0].doneTime=date;
		timers[0].state=1;
		var msg=date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
			$('#doneTime0').html(msg);
		$('#ini0').show();
		$('#then0').hide();
		var data = {state: 1, timerNum: 0, username: username}
		$.ajax({
			url: "hanleState",		
			type: "post",
			dateType: "json",
			data: data,
			success: function(data){
				console.log(data);
			},
			error: function(data, msg){
				console.log(msg);
			}
		})
		
	});
	$('#reset0').click(function(){
		timers[0].state=0;
		$('#btn0').html('Start');
		$('#ini0').show();
		$('#then0').hide();
		document.timer0.hours.value='0';
		document.timer0.minutes.value='00';
		document.timer0.seconds.value='00';
		var data = {state: 0, timerNum: 0, username: username}
		$.ajax({
			url: "hanleState",		
			type: "post",
			dateType: "json",
			data: data,
			success: function(data){
				console.log(data);
			},
			error: function(data, msg){
				console.log(msg);
			}
		})
	});
	
	$('#resume1').click(function(){
		var sum=date2sum(timers[1].doneTime);
		sum=sum+pause[1];
		pause[1]=0;
		var date=sum2date(sum);
		timers[1].doneTime=date;
		timers[1].state=1;
		var msg=date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
			$('#doneTime1').html(msg);
		$('#ini1').show();
		$('#then1').hide();
		var data = {state: 1, timerNum: 1, username: username}
		$.ajax({
			url: "hanleState",		
			type: "post",
			dateType: "json",
			data: data,
			success: function(data){
				console.log(data);
			},
			error: function(data, msg){
				console.log(msg);
			}
		})
		
	});
	$('#reset1').click(function(){
		timers[1].state=0;
		$('#btn1').html('Start');
		$('#ini1').show();
		$('#then1').hide();
		document.timer1.hours.value='0';
		document.timer1.minutes.value='00';
		document.timer1.seconds.value='00';
		var data = {state: 0, timerNum: 1, username: username}
		$.ajax({
			url: "hanleState",		
			type: "post",
			dateType: "json",
			data: data,
			success: function(data){
				console.log(data);
			},
			error: function(data, msg){
				console.log(msg);
			}
		})
	});
	$('#resume2').click(function(){
		var sum=date2sum(timers[2].doneTime);
		sum=sum+pause[2];
		pause[2]=0;
		var date=sum2date(sum);
		timers[2].doneTime=date;
		timers[2].state=1;
		var msg=checkTime(date.getHours())+":"+checkTime(date.getMinutes())+":"+checkTime(date.getSeconds());
			$('#doneTime2').html(msg);
		$('#ini2').show();
		$('#then2').hide();
		var data = {state: 1, timerNum: 2, username: username}
		$.ajax({
			url: "hanleState",		
			type: "post",
			dateType: "json",
			data: data,
			success: function(data){
				console.log(data);
			},
			error: function(data, msg){
				console.log(msg);
			}
		})
	});
	$('#reset2').click(function(){
		timers[2].state=0;
		$('#btn2').html('Start');
		$('#ini2').show();
		$('#then2').hide();
		document.timer2.hours.value='0';
		document.timer2.minutes.value='00';
		document.timer2.seconds.value='00';
		var data = {state: 0, timerNum: 2, username: username}
		$.ajax({
			url: "hanleState",		
			type: "post",
			dateType: "json",
			data: data,
			success: function(data){
				console.log(data);
			},
			error: function(data, msg){
				console.log(msg);
			}
		})
	});
	window.setInterval(function(){Judge();}, '1000'); 
	
});
function date2sum(date){
	var sum=date.getHours()*3600+date.getMinutes()*60+date.getSeconds();
	return sum;
}
function sum2date(sum){
	var date=new Date();
	var hou=Math.floor(sum/3600); 
	sum=sum%3600;
	var minu = Math.floor(sum/60); 
	sum=sum%60;
	var secd = Math.round(sum);
	var newdate=new Date(date.getYear(),date.getMonth(),date.getDay(),hou,minu,secd);
	return newdate;
}
function compare(date){
	var now=new Date();
	//alert(timers[i].doneTime-now);
	var sum1=now.getHours()*3600+now.getMinutes()*60+now.getSeconds();
	var sum2=date.getHours()*3600+date.getMinutes()*60+date.getSeconds();
	if(sum2>=sum1){
		return {done:1,res:sum2-sum1};//not done;
	}else{
		return {done:0,res:sum2-sum1}; //done;
	}
}
function changevalue(i,date){
	if(i==0){
		document.timer0.hours.value=checkTime(date.getHours());
		document.timer0.minutes.value=checkTime(date.getMinutes());
		document.timer0.seconds.value=checkTime(date.getSeconds());
	}else if(i==1){
		document.timer1.hours.value=checkTime(date.getHours());
		document.timer1.minutes.value=checkTime(date.getMinutes());
		document.timer1.seconds.value=checkTime(date.getSeconds());
	}else{
		document.timer2.hours.value=checkTime(date.getHours());
		document.timer2.minutes.value=checkTime(date.getMinutes());
		document.timer2.seconds.value=checkTime(date.getSeconds());
	}
}
function checkTime(i){ //将0-9的数字前面加上0，例1变为01 
 if(i<10) 
 { 
  i = "0" + i; 
 } 
 return i; 
} 
function Judge() { 
    var username = $('#usernameget').val();
    for(var i=0;i<3;i++){
        if(timers[i].state==1){
			//alert('ss');
			var flag=compare(timers[i].doneTime);
			if(flag.done==0){
				//alert('end');
				timers[i].state=3;
				$('#btn'+i).html('DONE');
				$('#doneTime'+i).html('done');
				$('#bg'+i).css("background-color","red");
				var data = {state: 3, timerNum: i, username: username}
				$.ajax({
					url: "hanleState",		
					type: "post",
					dateType: "json",
					data: data,
					success: function(data){
						console.log(data);
					},
					error: function(data, msg){
						console.log(msg);
					}
				})
			}else{
				var date=sum2date(flag.res);
				var name="timer"+i;
				changevalue(i,date);
				thour = checkTime(date.getHours())*1;
				tminute = checkTime(date.getMinutes())*1;
				tsecond = checkTime(date.getSeconds())*1;
				console.log(tsecond);
				var data = {timerHour: thour, timerMinute: tminute, timerSecond: tsecond, username: username, timerNum: i}
				console.log(data);
				$.ajax({				//update the timerNumber to the database
					url: "updateNumber",		
					type: "post",
					dateType: "json",
					data: data,
					success: function(data){
						console.log(data);
					},
					error: function(data, msg){
						console.log(msg);
					}
				})
			}
        }else if(timers[i].state==2){
			pause[i]=pause[i]+1;
		}
    }
 
    
} 

	//setInterval是没interval调用一次，Judge函数的作用是美妙判断一次这个timer是否结束啦
	
