$(function () {

	/*
	 * Function
	 */

    $("#province").change(function (e) {
		$('#loadingLocation').show();
		$.post("enfant_province", {
			id: $(this).val()
		}, function (res) {
			if (res.success == 1) {
				$("#region").html(res.childs);
				//Récupération districts
				$.post("enfant_region", {
					id: res.first_child
				}, function (res) {
					if (res.success == 1) {
						$("#district").html(res.childs);

						//Récupération communes
						$.post("enfant_district", {
							id: res.first_child
						}, function (res) {
							if (res.success == 1) {
								$("#common").html(res.childs);
								$.post("enfant_commune",{
									id : res.first_child
								}, function (res) {
									if (res.success == 1) {						
										$("#borough").html(res.childs);
										$('#loadingLocation').hide();
									} else if (res.error == 1){
										alert(res.msg);
										$("#borough").html(res.childs);
									}
								}, 'JSON');
							} else if (res.error == 1)
								alert(res.msg);
						}, 'JSON');
					} else if (res.error == 1)
						alert(res.msg);
				}, 'JSON');
			} else if (res.error == 1)
				alert(res.msg);
		}, 'JSON');
	});

	$("#region").change(function (e) {
		$('#loadingLocation').show();
		//Récupération districts
		$.post("enfant_region", {
			id: $(this).val()
		}, function (res) {
			if (res.success == 1) {
				$("#district").html(res.childs);

				//Récupération communes
				$.post("enfant_district", {
					id: res.first_child
				}, function (res) {
					if (res.success == 1) {
						$("#common").html(res.childs);

						$.post("enfant_commune",{
							id : res.first_child
						}, function (res) {
							if (res.success == 1) {						
								$("#borough").html(res.childs);
								$('#loadingLocation').hide();
							} else if (res.error == 1){
								alert(res.msg);
								$("#borough").html(res.childs);
							}
						}, 'JSON');
					} else if (res.error == 1)
						alert(res.msg);
				}, 'JSON');
			} else if (res.error == 1)
				alert(res.msg);
		}, 'JSON');

	});

	$("#district").change(function (e) {
		$('#loadingLocation').show();
		//Récupération communes
		$.post("enfant_district", {
			id: $(this).val()
		}, function (res) {
			if (res.success == 1) {
				$("#common").html(res.childs);
				$.post("enfant_commune",{
					id : res.first_child
				}, function (res) {
					if (res.success == 1) {						
						$("#borough").html(res.childs);
						$('#loadingLocation').hide();
					} else if (res.error == 1){
						alert(res.msg);
						$("#borough").html(res.childs);
					}
				}, 'JSON');
			} else if (res.error == 1)
				alert(res.msg);
		}, 'JSON');
	});

	$("#common").change(function (e) {
		$('#loadingLocation').show();
		//Récupération fokontany
		$.post("enfant_commune",{
			id : $(this).val()
		}, function (res) {
			if (res.success == 1) {						
				$("#borough").html(res.childs);
				$('#loadingLocation').hide();
			} else if (res.error == 1){
				alert(res.msg);
				$("#borough").html(res.childs);
			}
		}, 'JSON');
	});

	$("#borough").change(function (e) {
		$('#loadingLocation').show();
		//Récupération fokontany
		$('#loadingLocation').hide();
	});
});
