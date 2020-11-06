$(".equipe-desenvolvimento").on("click", function(){
	$("#sobre").slideToggle("fast");

});

function replaceAll(variavel){
	return variavel.replace(/[áàâã]/g,'a').replace(/[éèê]/g,'e').replace(/[óòôõ]/g,'o').replace(/[úùû]/g,'u');
};

$(document).ready(function() {
	$(window).scroll( function(){    
		$('.timeline-block').each( function(i){            
			var bottom_of_object = $(this).offset().top;
			var bottom_of_window = $(window).scrollTop() + $(window).height();           
			if( bottom_of_window > (bottom_of_object+300) ){                
				$(this).addClass("current");
			}else{
				$(this).removeClass("current");
			}     
		});        
	});   
	var altura = $("body").height();

	if($(window).scrollTop() < altura/5){
		$("#up").css({
			"opacity":"0"
		});
	}else{
		$("#up").css({
			"opacity":"1"
		});
	}

	$("a").on("click", function(){
		var link = $(this).attr("href");
		if(link[0] == "#"){
			var posLink = $(link).offset().top;
			$("html, body").animate({scrollTop:posLink - 70}, 500, 'swing');
		};
	});
});
$.getJSON( "./workshops.json", function(data, index) {			
	$.each(data, function(index){
		var date = index;
		var all = $("<div>");
		$.each(this[0], function(index) {	
			var horario = index;
			var iconGraduation = "<i class='fa fa-graduation-cap' aria-hidden='true'></i>";
			var iconMap = "<i class='fa fa-map-marker' aria-hidden='true'></i>";
			var block = $("<div>");
			var content = $("<div>");
			$(all).attr('id',date);
			$(all).css("display","none");
			$(block).addClass("timeline-block");	
			$(content).addClass("timeline-content");
			$(content).append("<p>"+horario+"</p>");
			
			$.each(this, function(index){				
				$(content).append("<h3 class='md-text'>"+this.titulo+"</h3>");
				if (this.palestrante !="") 
					//esse tem o link-> $(content).append("<p><a class='speaker-link' href='#"+replaceAll(this.palestrante.replace( /\s/g, '' ).toLowerCase())+"'>"+ this.palestrante+"</a></p>");
					$(content).append("<p>" + this.palestrante+ "</p>");
				if (this.local != "")
					$(content).append("<p class='local'>"+iconMap + " " + this.local+"</p>");
				$(block).append(content);
				$(all).append(block);			
			});

		});
		$(".timeline").append(all);
		// $(".timeline .timeline-block:first-child").prepend("<h1>"+index+"</h1>");
		$($("a.timeline-activation.active").attr("href")).show("fast");
	});
});

$(".timeline-activation").on("click",function(){
	$.each($(".timeline-activation"),function(){
		var activate = $(this).attr("href");
		$(activate).hide();
	});
	var exib = $(this).attr("href");
	
	$(".timeline-activation").removeClass("active");	
	$(this).addClass("active");
	$(exib).show("fast");
	return false;
});

$("#up").on("click", function(){
	$("html, body").animate({scrollTop : 0}, 500);
});
$(window).scroll(function(){
	var altura = $("body").height();
	if($(window).scrollTop() < altura/5){
		$("#up").css({
			"opacity":"0"
		});
	}else{
		$("#up").css({
			"opacity":"1"
		});
	}
});

$.getJSON("./palestrantes.json", function(data, index) {			

	$.each(data.palestrantes, function(){
		var container = $("<div>").attr({
			class:"col-md-3",
			id:replaceAll(this.nome.replace( /\s/g, '' ).toLowerCase())
		});
		var row = $("<div>").attr("class","row");

		var containerImg = $("<div>").attr("class","col-md-12");
		var corteImg = $("<div>").addClass("corte");
		var img = $("<img\>").attr({
			src: "img/palestrantes/"+this.file,
			alt: this.nome,
			class: "img-fluid rounded-circle speaker-img p-5"
		});

		$(corteImg).append(img);
		$(containerImg).append(corteImg);
		var containerInfo = $("<div>").attr("class","col-md-12");
		// $(containerInfo).append("<h5><i class='fa fa-id-card-o' aria-hidden='true'></i></h5>");
		$(containerInfo).append("<h5 class='strong'>"+this.nome+"</h5>");
		$(containerInfo).append("<p class='thin'>"+this.about+"</p>");

		$(row).append(containerImg);
		$(row).append(containerInfo);
		$(container).append(row);
		$(".palestrantes-container").append(container);
	});
	
	$(".speaker-link").on("click",function(){
		var img = $($(this).attr("href") + " img");
		img.removeClass("greyscale");
		setTimeout(function(){
			img.addClass("greyscale");
		}, 3000);
		return false;
	});
	$("a").on("click", function(){
		var link = $(this).attr("href");
		if(link[0] == "#"){
			var posLink = $(link).offset().top;
			console.log(posLink);
			$("html, body").animate({scrollTop:posLink}, 500, 'swing');
		};
	});
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
       .register('sw.js')
       .then(function() { console.log('Service Worker Registered'); });
}