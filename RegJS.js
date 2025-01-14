    var formTabIndex = 109;
    var memNum = 1, orgMemNum = 1;
    var myWidth = 0, myHeight = 0, conf = false, errstr = "", errcaptcha = false, confkeydown = false;
    var df, ds, dow = 0;
    var tmp = '';
    var yr, mo, da = 0;
    var fndFN = new Array();
    var fndDR = new Array();
    var fndDRStart = new Array();
    var fndDREnd = new Array();
    var bw = 0;
    var _calendar_active_instance = {};
    window.onload = function() {
      BuildTabIndex();
      if (document.getElementById('downloadInstead') != null)
        document.getElementById('downloadInstead').style.display = "none";
      if (document.getElementById('co-form-content') != null)
        document.getElementById('co-form-content').style.display = "";
      getBrowserSize();
      var ajaxDiv = document.createElement("div");
      ajaxDiv.id = "ajax-progressbar";
      ajaxDiv.innerHTML = "Checking with server. Please wait...";
      document.getElementById("CORegForm").appendChild(ajaxDiv);
      document.getElementById("ajax-progressbar").style.display = "none";
      document.getElementById("forxpmsie").style.display = "none";
      document.getElementById("noscriptmsg").style.display = "none";
      document.getElementById("load").style.display = "block";
      if (document.getElementById('lblidenv') != null)
        document.getElementById('lblidenv').style.display = 'none';
      if (document.getElementById('idenv') != null)
        document.getElementById('idenv').style.display = 'none';
      if (document.getElementById('callChurch') != null)
        document.getElementById('callChurch').style.display = 'none';
      if (document.getElementById('txaFamIDEnv') != null)
        document.getElementById('txaFamIDEnv').style.display = 'none';
      if (document.getElementById('rbtNewRegID') != null)
        document.getElementById('rbtNewRegID').checked = false;
      if (document.getElementById('rbtEditRegID') != null)
        document.getElementById('rbtEditRegID').checked = false;
      document.onclick = documentClick;
      var currDate = new Date()
      var dd = ((currDate.getDate())>=10)? (currDate.getDate()) : '0' + (currDate.getDate());
      var mm = ((currDate.getMonth()+1)>=10)? (currDate.getMonth()+1) : '0' + (currDate.getMonth()+1);
      var yy = currDate.getFullYear();
      var currdate = mm+"/"+dd+"/"+yy;
      for (var i=1; i<fndFN.length+1; i++) {
        if (document.getElementById('amtRateFund'+i).value == "")
          document.getElementById('amtRateFund'+i).value = '';
        if (document.getElementById('amtTotalFund'+i).value == "")
          document.getElementById('amtTotalFund'+i).value = '';
        if (document.getElementById('dteFund'+i+'Start').value == "")
          document.getElementById('dteFund'+i+'Start').value = currdate;
      }
      if (document.getElementById('btnDelMember') != null)
        document.getElementById('btnDelMember').disabled = true;
      if (document.getElementById('captsection') != null)
        document.getElementById('captsection').style.display = "none";
      if (document.getElementById('pModal') != null)
        document.getElementById('pModal').style.display = "none";
      if (document.getElementById('fullModal') != null)
        document.getElementById('fullModal').style.display = "none";
      var nVer = navigator.appVersion;
      var nAgt = navigator.userAgent.toUpperCase();
      if (((nAgt.search('WINDOWS NT 5.1')>0) ||
           (nAgt.search('WINDOWS NT 5.2')>0)) &&
          ((nAgt.search('TRIDENT/')>0) ||
           (nAgt.search('MSIE')>0))) {
        var elem = document.getElementById("CORegForm");
        elem.parentNode.removeChild(elem);
        document.getElementById("forxpmsie").style.display = "block";
        document.getElementById("forxpmsie").innerHTML =
        "You are using an incompatible browser on a Windows XP computer.<br>To use this registration form, download either <a title='http://www.google.com/chrome/' href='http://www.google.com/chrome/'>Chrome</a> or <a title='https://www.mozilla.org/en-US/firefox/desktop/' href='https://www.mozilla.org/en-US/firefox/desktop/'>Firefox</a> and set it as your default browser.";
      }
    };
    function BuildTabIndex() {
      var tabindex = 1;
      $("input,select,radio,checkbox,textarea,button").each(function() {
        if (this.type != "hidden") {
          var $input = $(this);
          $input.attr("tabindex", tabindex);
          tabindex++;
        }
      });
    }
    function DoKeyUp(ele) {
        var key = event.keyCode || event.charCode, val = ele.value;
    	  if ((key === 8) || (key === 9) || (key === 46)) {
    	      clickOutSide();
    	       	  return true;
    	  }
    	  if (key === 84) {
    	      var today = new Date(),
    		  dd = String(today.getDate()).padStart(2, "0"),
    		  mm = String(today.getMonth() + 1).padStart(2, "0"), //January is 0!
    		  yyyy = today.getFullYear();
    	      today = mm + "/" + dd + "/" + yyyy;
    	      ele.value = today;
    	      clickOutSide();
    	      return true;
    	  }
    	  else if (ele.value === "mm/dd/yyyy") {
    	      ele.value = event.key;
    	      return true;
    	  }
    	  else {
    	      var regex = new RegExp(/[^0-9|\/]/, "g");
    	      if (regex.test(val)) {
    		  var txt = val.replace(/[^0-9|\/]/, "");
    		  ele.value = txt;
    		  return true;
    	      }
    	  }
    	  if ((val.length === 1) && (val === "/")) {
    	      ele.value = "01/";
    	  }
    	  else if (val.length === 2) {
    	      if (val.charAt(1) === "/") {
    		  if (val.charAt(0) === "0") {
    		      ele.value = "1" + val;
    		  }
    		  else {
    		      ele.value = "0" + val;
    		  }
    	      }
    	      else {
    	          ele.value = val + "/";
    	      }
    	  }
    	  else if (val.length === 3) {
    	      if (val.charAt(2) !== "/") {
    	          ele.value = val.charAt(0) + val.charAt(1) + "/" + val.charAt(2);
    	      }
    	  }
    	  else if (val.length === 4) {
    	      if (val.charAt(3) === "/") {
    	          var lv3 = val.length,
    		      ov3 = val;
    		  ele.value = ov3.substr(0, lv3-1);
    	      }
    	  }
    	  else if (val.length === 5) {
    	      if (val.charAt(4) === "/") {
    	          ele.value = val.charAt(0) + val.charAt(1) + val.charAt(2) + "0" + val.charAt(3) + val.charAt(4);
    	      }
    	      else {
    	          ele.value = val + "/";
    	      }
    	  }
    	  else if (val.length === 6) {
    	      if (val.charAt(5) !== "/") {
    	          ele.value = val.charAt(0) + val.charAt(1) + val.charAt(2) + val.charAt(3) + val.charAt(4) + "/" + val.charAt(5);
    	      }
    	  }
    	  else if (val.length >= 7) {
    	      if (val.charAt(6) === "/") {
    	          ele.value = val.charAt(0) + val.charAt(1) + val.charAt(2) + val.charAt(3) + val.charAt(4) + val.charAt(5);
    	      }
    	      else if (val.charAt(7) === "/") {
    	          ele.value = val.charAt(0) + val.charAt(1) + val.charAt(2) + val.charAt(3) + val.charAt(4) + val.charAt(5) + val.charAt(6);
    	      }
    	      else if (val.charAt(8) === "/") {
    	          ele.value = val.charAt(0) + val.charAt(1) + val.charAt(2) + val.charAt(3) + val.charAt(4) + val.charAt(5) + val.charAt(6) + val.charAt(7);
    	      }
    	      else if (val.charAt(9) === "/") {
    	          ele.value = val.charAt(0) + val.charAt(1) + val.charAt(2) + val.charAt(3) + val.charAt(4) + val.charAt(5) + val.charAt(6) + val.charAt(7) + val.charAt(8);
            }
        }
    }
    function GetNewCaptcha() {
      errcaptcha = false;
      if (document.getElementById('captsection') != null) {
        document.getElementById('captsection').style.display = "block";
        document.getElementById("appCaptcha").value = "";
        var x = new Date(), h = x.getHours(), m = x.getMinutes(), s = x.getSeconds();
        document.getElementById("idcaptcha").src = "https://forms.parishdata.com/PDSForms/CaptchaService/Captcha.gif?" + m + s;
        $("#idcaptcha").on("load",function(){
          errcaptcha = false;
        }).on("error", function(){
          errcaptcha = true;
          showmodal("appCaptcha", "Information", "Captcha service is not available.<br><br>Please contact your church.");
        });
      }
    }
    function showprogress(pbody,disp) {
      if (disp == true) {
        document.getElementById("pbody").innerHTML = '<div class="loader""></div><div style="padding-top: 10px;">'+pbody+'</div>';
        if ($("#pModal").css("display") == "none")
          $("#pModal").show();
      }
      else {
        $("#pModal").hide();
      }
    }
    function showmodal(ele, txthead, txtbody) {
      confkeydown = false;
      var modal = document.getElementById("fullModal");
      document.getElementById("modal-header").style.display = "block";
      document.getElementById("modheadtitle").innerHTML = '<span class="modalmark">&nbsp;&#161;&nbsp;</span>&nbsp;&nbsp;'+txthead;
      document.getElementById("modheadbody").innerHTML = '<span style="font-weight: 600;">'+txtbody+'</span>';
      document.getElementById("modal-footer").style.display = "none";
      document.getElementById("modbtn").style.display = "none";
      var by = document.getElementById("btnYes"), bn = document.getElementById("btnNo");
      if (txthead == "Confirmation") {
        confkeydown = true;
        document.getElementById("btnNo").style.display = "inline";
        document.getElementById("btnYes").value = "Yes";
        document.getElementById("btnNo").value = "No";
        document.getElementById("modal-footer").style.display = "block";
        document.getElementById("modbtn").style.display = "block";
        document.getElementById("modheadtitle").innerHTML = '<span class="modalmark">&nbsp;&#63;&nbsp;</span>&nbsp;&nbsp;'+txthead;
        document.getElementById("modheadbody").innerHTML = '<span style="font-weight: 600;">'+txtbody+'</span>';
        modal.style.display = "block";
        by.onclick = function() {
          conf = true;
          modal.style.display = "none";
          document.getElementById("CORegForm").submit();
        }
        bn.onclick = function() {
          modal.style.display = "none";
          conf = false;
        }
      }
      else if (txthead != "Information") {
        var btn = document.getElementById(ele);
        btn.onclick = function() {
          document.getElementById("modal-footer").style.display = "block";
          document.getElementById("modheadtitle").innerHTML = '<span class="modalmark">&nbsp;&#161;&nbsp;</span>&nbsp;&nbsp;'+txthead;
          document.getElementById("modheadbody").innerHTML = '<span style="font-weight: 600;">'+txtbody+'</span>';
          modal.style.display = "block";
        }
        document.getElementById("modbtn").style.display = "block";
        document.getElementById("btnNo").style.display = "none";
        document.getElementById("btnYes").value = "OK";
        by.onclick = function() {
          modal.style.display = "none";
          if (document.getElementById(ele) != null)
            document.getElementById(ele).focus();
        }
      }
      else {
        modal.style.display = "block";
        document.getElementById("modbtn").style.display = "block";
        document.getElementById("btnNo").style.display = "none";
        document.getElementById("btnYes").value = "OK";
        by.onclick = function() {
          modal.style.display = "none";
          if (document.getElementById(ele) != null)
            document.getElementById(ele).focus();
        }
      }
      var span = document.getElementsByClassName("closebtn")[0];
      span.onclick = function() {
        modal.style.display = "none";
        if (document.getElementById(ele) != null)
          document.getElementById(ele).focus();
      }
      window.onclick = function(event) {
        if ((event.target == modal) && (confkeydown == false)) {
          modal.style.display = "none";
          if (document.getElementById(ele) != null)
            document.getElementById(ele).focus();
        }
      }
      window.onkeydown = function(event) {
        var keyCode = (event.keyCode ? event.keyCode : event.which);
        if ((modal.style.display == "block") && (keyCode === 13) && (confkeydown == false)) {
          modal.style.display = "none";
          if (document.getElementById(ele) != null)
            document.getElementById(ele).focus();
        }
      }
    }
    function openNewWindow() {
      var popupWin = window.open('', resizable=1);
    }
    function showID() {
      if (document.getElementById('lblidenv') != null)
        document.getElementById('lblidenv').style.display = 'inline';
      if (document.getElementById('idenv') != null)
        document.getElementById('idenv').style.display = 'inline';
      if (document.getElementById('callChurch') != null)
        document.getElementById('callChurch').style.display = 'table-row';
      document.getElementById('txaFamIDEnv').style.display = 'inline';
    }
    function hideID() {
      if (document.getElementById('lblidenv') != null)
        document.getElementById('lblidenv').style.display = 'none';
      if (document.getElementById('idenv') != null)
        document.getElementById('idenv').style.display = 'none';
      if (document.getElementById('callChurch') != null)
        document.getElementById('callChurch').style.display = 'none';
      document.getElementById('txaFamIDEnv').style.display = 'none';
    }
    // display require labels
    function modifyDisplay() {
      if (((document.getElementById('rbtEditRegID') != null) && (document.getElementById('rbtEditRegID').checked==true)) ||
          ((document.getElementById('rbtNewRegID') != null) && (document.getElementById('rbtNewRegID').checked==true))) {
        var reqLbls = document.getElementsByTagName('span');
        var i = reqLbls.length;
        while(i--) {
          // r0=require for new
          if (reqLbls[i].id == 'r0') {
            reqLbls[i].innerHTML= '&nbsp;&nbsp';
            if ((document.getElementById('rbtNewRegID') != null) && (document.getElementById('rbtNewRegID').checked==true) && (reqLbls[i].id == 'r0')) {
              reqLbls[i].innerHTML = '*';
            }
          }
        }
      }
    }
    // get browser size
    function getBrowserSize() {
      bw = window.innerWidth;
    }
    function AddNewMem() {
      try {
        if (memNum < orgMemNum)
          memNum = orgMemNum;
        memNum = memNum+1;
        if (document.getElementById('btnDelMember') != null)
          document.getElementById('btnDelMember').disabled = false;
        var table = document.getElementById("mainTable");
        var mainTableBody = document.getElementById("mainTbody");
        var tr1 = document.createElement('tr');
        tr1.setAttribute('name', 'tr1'+memNum);
        tr1.setAttribute('id', 'tr1'+memNum);
        mainTableBody.appendChild(tr1);
        formTabIndex = formTabIndex + 1;
        tr1.insertCell(0).innerHTML = '<td><input type="button" name="btnMember'+memNum+'Btn" id="btnMember'+memNum+'Btn" title="Toggle Member '+memNum+' Section" value="Hide" onclick="toggleMember('+memNum+')" style="width:80px" class="btnstyle" /></td>';
        var s = "Member 1", res = "Member 1";
        if (res !== "") {
          res = res.replace(/[0-9]/g, "");
        }
        $(tr1).append('<td colspan=3><span class="titlelbl">'+res+' '+memNum+'</span></td>');
        tr1.insertCell(2).innerHTML = '<td><span class="lbl" id="labelMem'+memNum+'Type">&nbsp;&nbsp;Type&nbsp;&nbsp;</span></td>';
        tr1.insertCell(3).innerHTML = '<td>'+
          '<select tabindex="'+formTabIndex+'" name="cboMem'+memNum+'Type" id="cboMem'+memNum+'Type" style="width:110px" title="Select a type in the pull down list" class="pulldownstyle" >'+
          '<option value=""/>'+
          '<option value="2">Adult</option>'+
          '<option value="3">Young Adult</option>'+
          '<option value="4">Child</option>'+
          '<option value="5">Other</option>'+
          '</select>'+
          '</td>';
        var tr2 = document.createElement('tr');
        tr2.setAttribute('name', 'tr2'+memNum);
        tr2.setAttribute('id', 'tr2'+memNum);
        mainTableBody.appendChild(tr2);
        formTabIndex = formTabIndex + 1;
        tr2.insertCell(0).innerHTML = '<td><span class="lbl">Title</span></td>';
        tr2.insertCell(1).innerHTML = '<td>'+
          '<select tabindex="'+formTabIndex+'" name="cboMem'+memNum+'Title" id="cboMem'+memNum+'Title" style="width:110px" title="Select a title in the pull down list" class="pulldownstyle" >'+
          '<option value=""/>'+
          '<option value="">None</option>'+
          '<option value="Mr.">Mr.</option>'+
          '<option value="Ms.">Ms.</option>'+
          '<option value="Mrs.">Mrs.</option>'+
          '<option value="Miss">Miss</option>'+
          '<option value="Dr.">Dr.</option>'+
          '<option value="Fr.">Fr.</option>'+
          '<option value="Msgr.">Msgr.</option>'+
          '<option value="Sr.">Sr.</option>'+
          '<option value="Rev.">Rev.</option>'+
          '<option value="Deacon">Deacon</option>'+
          '<option value="M/M">M/M</option>'+
          '<option value="D/M">D/M</option>'+
          '<option value="M/D">M/D</option>'+
          '<option value="D/D">D/D</option>'+
          '</select>'+
          '</td>';
        formTabIndex = formTabIndex + 1;
        tr2.insertCell(2).innerHTML = '<td><span class="lbl">&nbsp;&nbsp;First Name</span></td>';
        tr2.insertCell(3).innerHTML = '<td><input tabindex="'+formTabIndex+'" maxlength="100" style="width:150px" title="Please enter first name here" name="txaMem'+memNum+'FirstName" id="txaMem'+memNum+'FirstName" class="textboxstyle" /></td>';
        formTabIndex = formTabIndex + 1;
        tr2.insertCell(4).innerHTML = '<td><span class="lbl">&nbsp;&nbsp;Last Name</span></td>';
        tr2.insertCell(5).innerHTML = '<td><input tabindex="'+formTabIndex+'" maxlength="100" style="width:150px" title="Please enter last name here" name="txaMem'+memNum+'LastName" id="txaMem'+memNum+'LastName" class="textboxstyle" /></td>';
        formTabIndex = formTabIndex + 1;
        tr2.insertCell(6).innerHTML = '<td><span class="lbl">Suffix</span></td>';
        tr2.insertCell(7).innerHTML = '<td>'+
          '<select tabindex="'+formTabIndex+'" name="cboMem'+memNum+'Suffix" id="cboMem'+memNum+'Suffix" style="width:75px" title="Select a suffix in the pull down list" class="pulldownstyle" >'+
          '<option value=""/>'+
          '<option value="">None</option>'+
          '<option value="Sr.">Sr.</option>'+
          '<option value="Jr.">Jr.</option>'+
          '<option value="II">II</option>'+
          '<option value="III">III</option>'+
          '<option value="IV">IV</option>'+
          '<option value="V">V</option>'+
          '<option value="VI">VI</option>'+
          '<option value="VII">VII</option>'+
          '<option value="VIII">VIII</option>'+
          '<option value="XV">XV</option>'+
          '<option value="X">X</option>'+
          '</select>'+
          '</td>';
        var tr3 = document.createElement('tr');
        tr3.setAttribute('name', 'tr3'+memNum);
        tr3.setAttribute('id', 'tr3'+memNum);
        mainTableBody.appendChild(tr3);
        formTabIndex = formTabIndex + 1;
        tr3.insertCell(0).innerHTML = '<td><span class="lbl">Relationship</span></td>';
        tr3.insertCell(1).innerHTML = '<td>'+
          '<select tabindex="'+formTabIndex+'" name="cboMem'+memNum+'Relationship" id="cboMem'+memNum+'Relationship" style="width:110px" title="select a relationship in the pull down list" class="pulldownstyle" >'+
          '<option value=""/>'+
          '<option value="Adopted">Adopted</option>'+
          '<option value="Adult">Adult</option>'+
          '<option value="Aunt">Aunt</option>'+
          '<option value="Child">Child</option>'+
          '<option value="Cousin">Cousin</option>'+
          '<option value="Daughter">Daughter</option>'+
          '<option value="Father">Father</option>'+
          '<option value="Foster">Foster</option>'+
          '<option value="Friend">Friend</option>'+
          '<option value="Grandchild">Grandchild</option>'+
          '<option value="Granddaughter">Granddaughter</option>'+
          '<option value="Grandfather">Grandfather</option>'+
          '<option value="Grandmother">Grandmother</option>'+
          '<option value="Grandparent">Grandparent</option>'+
          '<option value="Grandson">Grandson</option>'+
          '<option value="Head">Head</option>'+
          '<option value="Head 2">Head 2</option>'+
          '<option value="Head-Female">Head-Female</option>'+
          '<option value="Head-Male">Head-Male</option>'+
          '<option value="Husband">Husband</option>'+
          '<option value="In Laws">In Laws</option>'+
          '<option value="In-Law">In-Law</option>'+
          '<option value="Mother">Mother</option>'+
          '<option value="Nephew">Nephew</option>'+
          '<option value="Niece">Niece</option>'+
          '<option value="Other">Other</option>'+
          '<option value="Sibling">Sibling</option>'+
          '<option value="Son">Son</option>'+
          '<option value="Spouse">Spouse</option>'+
          '<option value="Stepchild">Stepchild</option>'+
          '<option value="Stepdaughter">Stepdaughter</option>'+
          '<option value="Stepfather">Stepfather</option>'+
          '<option value="Stepmother">Stepmother</option>'+
          '<option value="Stepson">Stepson</option>'+
          '<option value="Uncle">Uncle</option>'+
          '<option value="Wife">Wife</option>'+
          '<option value="Young Adult">Young Adult</option>'+
          '</select>'+
          '</td>';
        formTabIndex = formTabIndex + 1;
        tr3.insertCell(2).innerHTML = '<td><span class="lbl">&nbsp;&nbsp;Middle Name</span></td>';
        tr3.insertCell(3).innerHTML = '<td><input tabindex="'+formTabIndex+'" maxlength="100" style="width:150px" title="Please enter middle name here" name="txaMem'+memNum+'MidName" id="txaMem'+memNum+'MidName" class="textboxstyle" /></td>';
        formTabIndex = formTabIndex + 1;
        tr3.insertCell(4).innerHTML = '<td><span class="lbl">&nbsp;&nbsp;Nickname</span></td>';
        tr3.insertCell(5).innerHTML = '<td><input tabindex="'+formTabIndex+'" maxlength="100" style="width:150px" title="Please enter nickname here" name="txaMem'+memNum+'Nickname" id="txaMem'+memNum+'Nickname" class="textboxstyle" /></td>';
        formTabIndex = formTabIndex + 1;
        tr3.insertCell(6).innerHTML = '<td><span class="lbl">Maiden Name</span></td>';
        tr3.insertCell(7).innerHTML = '<td><input tabindex="'+formTabIndex+'" maxlength="100" style="width:150px" title="Please enter maiden name" name="txaMem'+memNum+'MaidName" id="txaMem'+memNum+'MaidName" class="textboxstyle" /></td>';
        var tr4 = document.createElement('tr');
        tr4.setAttribute('name', 'tr4'+memNum);
        tr4.setAttribute('id', 'tr4'+memNum);
        mainTableBody.appendChild(tr4);
        formTabIndex = formTabIndex + 1;
        tr4.insertCell(0).innerHTML = '<td><span class="lbl">Ethnicity</span></td>';
        tr4.insertCell(1).innerHTML = '<td>'+
          '<select tabindex="'+formTabIndex+'" name="cboMem'+memNum+'Ethnicity" id="cboMem'+memNum+'Ethnicity" style="width: 110px" title="select an ethnicity in the pull down list" class="pulldownstyle" >'+
          '<option value=""/>'+
          '</select>'+
          '</td>';
        formTabIndex = formTabIndex + 1;
        tr4.insertCell(2).innerHTML = '<td><span class="lbl">&nbsp;&nbsp;Birth Date</span></td>';
        tr4.insertCell(3).innerHTML = '<td><select tabindex="'+formTabIndex+'" name="cboMem'+memNum+'BirthMonth" id="cboMem'+memNum+'BirthMonth" style="width: 45px" title="Select a month in the pull down list" class="pulldownstyle" ><option default>MM</option><option value="1">01</option><option value="2">02</option><option value="3">03</option><option value="4">04</option><option value="5">05</option><option value="6">06</option><option value="7">07</option><option value="8">08</option><option value="9">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option></select><select tabindex="'+formTabIndex+'" name="cboMem'+memNum+'BirthDay" id="cboMem'+memNum+'BirthDay" style="width: 45px; margin-left: 5px" title="Select a day in the pull down list" class="pulldownstyle" ><option default>DD</option><option value="1">01</option><option value="2">02</option><option value="3">03</option><option value="4">04</option><option value="5">05</option><option value="6">06</option><option value="7">07</option><option value="8">08</option><option value="9">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option></select><select tabindex="'+formTabIndex+'" name="cboMem'+memNum+'BirthYear" id="cboMem'+memNum+'BirthYear" style="width: 60px; margin-left: 5px" title="Select a year in the pull down list" class="pulldownstyle" ><option default>YYYY</option><option value="1905">1905</option><option value="1906">1906</option><option value="1907">1907</option><option value="1908">1908</option><option value="1909">1909</option><option value="1910">1910</option><option value="1911">1911</option><option value="1912">1912</option><option value="1913">1913</option><option value="1914">1914</option><option value="1915">1915</option><option value="1916">1916</option><option value="1917">1917</option><option value="1918">1918</option><option value="1919">1919</option><option value="1920">1920</option><option value="1921">1921</option><option value="1922">1922</option><option value="1923">1923</option><option value="1924">1924</option><option value="1925">1925</option><option value="1926">1926</option><option value="1927">1927</option><option value="1928">1928</option><option value="1929">1929</option><option value="1930">1930</option><option value="1931">1931</option><option value="1932">1932</option><option value="1933">1933</option><option value="1934">1934</option><option value="1935">1935</option><option value="1936">1936</option><option value="1937">1937</option><option value="1938">1938</option><option value="1939">1939</option><option value="1940">1940</option><option value="1941">1941</option><option value="1942">1942</option><option value="1943">1943</option><option value="1944">1944</option><option value="1945">1945</option><option value="1946">1946</option><option value="1947">1947</option><option value="1948">1948</option><option value="1949">1949</option><option value="1950">1950</option><option value="1951">1951</option><option value="1952">1952</option><option value="1953">1953</option><option value="1954">1954</option><option value="1955">1955</option><option value="1956">1956</option><option value="1957">1957</option><option value="1958">1958</option><option value="1959">1959</option><option value="1960">1960</option><option value="1961">1961</option><option value="1962">1962</option><option value="1963">1963</option><option value="1964">1964</option><option value="1965">1965</option><option value="1966">1966</option><option value="1967">1967</option><option value="1968">1968</option><option value="1969">1969</option><option value="1970">1970</option><option value="1971">1971</option><option value="1972">1972</option><option value="1973">1973</option><option value="1974">1974</option><option value="1975">1975</option><option value="1976">1976</option><option value="1977">1977</option><option value="1978">1978</option><option value="1979">1979</option><option value="1980">1980</option><option value="1981">1981</option><option value="1982">1982</option><option value="1983">1983</option><option value="1984">1984</option><option value="1985">1985</option><option value="1986">1986</option><option value="1987">1987</option><option value="1988">1988</option><option value="1989">1989</option><option value="1990">1990</option><option value="1991">1991</option><option value="1992">1992</option><option value="1993">1993</option><option value="1994">1994</option><option value="1995">1995</option><option value="1996">1996</option><option value="1997">1997</option><option value="1998">1998</option><option value="1999">1999</option><option value="2000">2000</option><option value="2001">2001</option><option value="2002">2002</option><option value="2003">2003</option><option value="2004">2004</option><option value="2005">2005</option><option value="2006">2006</option><option value="2007">2007</option><option value="2008">2008</option><option value="2009">2009</option><option value="2010">2010</option><option value="2011">2011</option><option value="2012">2012</option><option value="2013">2013</option><option value="2014">2014</option><option value="2015">2015</option><option value="2016">2016</option><option value="2017">2017</option><option value="2018">2018</option><option value="2019">2019</option><option value="2020">2020</option><option value="2021">2021</option><option value="2022">2022</option><option value="2023">2023</option><option value="2024">2024</option><option value="2025">2025</option><option value="2026">2026</option><option value="2027">2027</option><option value="2028">2028</option><option value="2029">2029</option><option value="2030">2030</option><option value="2031">2031</option><option value="2032">2032</option><option value="2033">2033</option><option value="2034">2034</option><option value="2035">2035</option><option value="2036">2036</option><option value="2037">2037</option><option value="2038">2038</option><option value="2039">2039</option><option value="2040">2040</option><option value="2041">2041</option><option value="2042">2042</option><option value="2043">2043</option><option value="2044">2044</option><option value="2045">2045</option><option value="2046">2046</option><option value="2047">2047</option><option value="2048">2048</option><option value="2049">2049</option><option value="2050">2050</option><option value="2051">2051</option><option value="2052">2052</option><option value="2053">2053</option><option value="2054">2054</option><option value="2055">2055</option><option value="2056">2056</option><option value="2057">2057</option><option value="2058">2058</option><option value="2059">2059</option><option value="2060">2060</option><option value="2061">2061</option><option value="2062">2062</option><option value="2063">2063</option><option value="2064">2064</option><option value="2065">2065</option><option value="2066">2066</option><option value="2067">2067</option><option value="2068">2068</option><option value="2069">2069</option><option value="2070">2070</option><option value="2071">2071</option><option value="2072">2072</option><option value="2073">2073</option><option value="2074">2074</option><option value="2075">2075</option><option value="2076">2076</option><option value="2077">2077</option><option value="2078">2078</option><option value="2079">2079</option><option value="2080">2080</option><option value="2081">2081</option><option value="2082">2082</option><option value="2083">2083</option><option value="2084">2084</option><option value="2085">2085</option><option value="2086">2086</option><option value="2087">2087</option><option value="2088">2088</option><option value="2089">2089</option><option value="2090">2090</option><option value="2091">2091</option><option value="2092">2092</option><option value="2093">2093</option><option value="2094">2094</option><option value="2095">2095</option><option value="2096">2096</option><option value="2097">2097</option><option value="2098">2098</option><option value="2099">2099</option><option value="2100">2100</option><option value="2101">2101</option><option value="2102">2102</option><option value="2103">2103</option><option value="2104">2104</option><option value="2105">2105</option><option value="2106">2106</option><option value="2107">2107</option><option value="2108">2108</option><option value="2109">2109</option><option value="2110">2110</option><option value="2111">2111</option><option value="2112">2112</option><option value="2113">2113</option><option value="2114">2114</option><option value="2115">2115</option><option value="2116">2116</option><option value="2117">2117</option><option value="2118">2118</option><option value="2119">2119</option><option value="2120">2120</option><option value="2121">2121</option><option value="2122">2122</option><option value="2123">2123</option><option value="2124">2124</option><option value="2125">2125</option><option value="2126">2126</option><option value="2127">2127</option><option value="2128">2128</option><option value="2129">2129</option><option value="2130">2130</option><option value="2131">2131</option><option value="2132">2132</option><option value="2133">2133</option><option value="2134">2134</option><option value="2135">2135</option><option value="2136">2136</option><option value="2137">2137</option><option value="2138">2138</option><option value="2139">2139</option><option value="2140">2140</option><option value="2141">2141</option><option value="2142">2142</option><option value="2143">2143</option><option value="2144">2144</option><option value="2145">2145</option></select></td>';
        formTabIndex = formTabIndex + 1;
        tr4.insertCell(4).innerHTML = '<td><span class="lbl">Gender</span></td>';
        tr4.insertCell(5).innerHTML = '<td>'+
          '<select tabindex="'+formTabIndex+'" name="cboMem'+memNum+'Gender" id="cboMem'+memNum+'Gender" title="select a gender in the pull down list" style="width:80px" class="pulldownstyle" >'+
          '<option value=""/>'+
          '<option value="1">Male</option>'+
          '<option value="2">Female</option>'+
          '</select>'+
          '</td>';
        var tr5 = document.createElement('tr');
        tr5.setAttribute('name', 'tr5'+memNum);
        tr5.setAttribute('id', 'tr5'+memNum);
        mainTableBody.appendChild(tr5);
        formTabIndex = formTabIndex + 1;
        tr5.insertCell(0).innerHTML = '<td><span class="lbl">Grade/Degree</span></td>';
        tr5.insertCell(1).innerHTML = '<td>'+
          '<select tabindex="'+formTabIndex+'" name="cboMem'+memNum+'Grade" id="cboMem'+memNum+'Grade" title="select a grade/degree in the pull down list" style="width:110px" class="pulldownstyle" >'+
          '<option value=""/>'+
          '<option value="Infant">Infant</option>'+
          '<option value="Infant 0">Infant 0</option>'+
          '<option value="Infant 1">Infant 1</option>'+
          '<option value="Infant 2">Infant 2</option>'+
          '<option value="Infant 3">Infant 3</option>'+
          '<option value="Pre Sch">Pre Sch</option>'+
          '<option value="K">K</option>'+
          '<option value="1">1</option>'+
          '<option value="2">2</option>'+
          '<option value="3">3</option>'+
          '<option value="4">4</option>'+
          '<option value="5">5</option>'+
          '<option value="6">6</option>'+
          '<option value="7">7</option>'+
          '<option value="8">8</option>'+
          '<option value="9">9</option>'+
          '<option value="10">10</option>'+
          '<option value="11">11</option>'+
          '<option value="12">12</option>'+
          '<option value="Graduate">Graduate</option>'+
          '<option value="Asso.">Asso.</option>'+
          '<option value="B.E.">B.E.</option>'+
          '<option value="D.M.D.">D.M.D.</option>'+
          '<option value="M.A.">M.A.</option>'+
          '<option value="M.D.">M.D.</option>'+
          '<option value="M.E.">M.E.</option>'+
          '<option value="M.S.">M.S.</option>'+
          '<option value="Ph.D.">Ph.D.</option>'+
          '<option value="R.N.">R.N.</option>'+
          '<option value="O.D.">O.D.</option>'+
          '<option value="B.S.N">B.S.N</option>'+
          '<option value="D.C">D.C</option>'+
          '<option value="Law">Law</option>'+
          '<option value="M.B.A">M.B.A</option>'+
          '<option value="Cpa">Cpa</option>'+
          '<option value="Ccac">Ccac</option>'+
          '<option value="B.S.E.E.">B.S.E.E.</option>'+
          '<option value="M.S.B.">M.S.B.</option>'+
          '<option value="B.S.M.E.">B.S.M.E.</option>'+
          '<option value="B.S/B.A.">B.S/B.A.</option>'+
          '<option value="Masters">Masters</option>'+
          '<option value="Finish9">Finish9</option>'+
          '<option value="Finish11">Finish11</option>'+
          '<option value="Technicl">Technicl</option>'+
          '<option value="Nursing">Nursing</option>'+
          '<option value="Business">Business</option>'+
          '<option value="Trade">Trade</option>'+
          '<option value="L.L.D.">L.L.D.</option>'+
          '<option value="6-8">6-8</option>'+
          '<option value="9-12">9-12</option>'+
          '<option value="K-7">K-7</option>'+
          '<option value="J.D.">J.D.</option>'+
          '<option value="M.S.N.">M.S.N.</option>'+
          '<option value="M.N.">M.N.</option>'+
          '<option value="M.H.S.A.">M.H.S.A.</option>'+
          '<option value="M.Ed.">M.Ed.</option>'+
          '<option value="CRNA">CRNA</option>'+
          '<option value="BSN/MSN">BSN/MSN</option>'+
          '<option value="BSCE">BSCE</option>'+
          '<option value="Babysitting">Babysitting</option>'+
          '</select>'+
          '</td>';
        formTabIndex = formTabIndex + 1;
        tr5.insertCell(2).innerHTML = '<td><span class="lbl">&nbsp;&nbsp;Language</span></td>';
        tr5.insertCell(3).innerHTML = '<td>'+
          '<select tabindex="'+formTabIndex+'" name="cboMem'+memNum+'Lang1" id="cboMem'+memNum+'Lang1" title="select a language in the pull down list" style="width:155px" class="pulldownstyle" >'+
          '<option value=""/>'+
          '<option value="English">English</option>'+
          '</select>'+
          '</td>';
        formTabIndex = formTabIndex + 1;
        tr5.insertCell(4).innerHTML = '<td><span class="lbl">Marital Status</span></td>';
        tr5.insertCell(5).innerHTML = '<td>'+
          '<select tabindex="'+formTabIndex+'" name="cboMem'+memNum+'Mary" id="cboMem'+memNum+'Mary" title="select a marital status in the pull down list" style="width:155px" class="pulldownstyle" >'+
          '<option value=""/>'+
          '<option value="Annulled">Annulled</option>'+
          '<option value="Church Marriage">Church Marriage</option>'+
          '<option value="Civil Marriage">Civil Marriage</option>'+
          '<option value="Divorced">Divorced</option>'+
          '<option value="Married">Married</option>'+
          '<option value="Married in Other Denomination">Married in Other Denomination</option>'+
          '<option value="Other">Other</option>'+
          '<option value="Partnered">Partnered</option>'+
          '<option value="Religious">Religious</option>'+
          '<option value="Separated">Separated</option>'+
          '<option value="Single">Single</option>'+
          '<option value="Widowed">Widowed</option>'+
          '</select>'+
          '</td>';
        var tr6 = document.createElement('tr');
        tr6.setAttribute('name', 'tr6'+memNum);
        tr6.setAttribute('id', 'tr6'+memNum);
        mainTableBody.appendChild(tr6);
        tr6.insertCell(0).innerHTML = '<td></td>';
        tr6.insertCell(1).innerHTML = '<td></td>';
        formTabIndex = formTabIndex + 1;
        tr6.insertCell(2).innerHTML = '<td><span class="lbl">&nbsp;&nbsp;Phone 1</span></td>';
        var td6 = document.createElement('td');
        td6.setAttribute('id', 'td6'+memNum);
        td6.setAttribute('colspan', '8');
        tr6.appendChild(td6);
        td6.innerHTML = 
          '<select tabindex="'+formTabIndex+'" name="cboMem'+memNum+'Phone1Type" id="cboMem'+memNum+'Phone1Type" title="select a phone type in the pull down list" style="width:120px" class="pulldownstyle" >'+
          '<option value=""/>'+
          '<option value="Cell/Mobile Phone">Cell/Mobile Phone</option>'+
          '<option value="Home Phone">Home Phone</option>'+
          '</select>'+
          ' ( <input tabindex="'+(formTabIndex+1)+'" maxlength="3" style="width:30px" title="enter phone area code" name="txnMem'+memNum+'Phone1Num1" id="txnMem'+memNum+'Phone1Num1" onkeyup="autoTab(this, document.CORegForm.txnMem'+memNum+'Phone1Num2)" class="textboxstyle" /> ) '+
          '<input tabindex="'+(formTabIndex+2)+'" maxlength="3" style="width:30px" title="enter phone prefix" name="txnMem'+memNum+'Phone1Num2" id="txnMem'+memNum+'Phone1Num2" onkeyup="autoTab(this, document.CORegForm.txnMem'+memNum+'Phone1Num3)" class="textboxstyle" /> - '+
          '<input tabindex="'+(formTabIndex+3)+'" maxlength="4" style="width:50px" title="enter phone line number" name="txnMem'+memNum+'Phone1Num3" id="txnMem'+memNum+'Phone1Num3" class="textboxstyle" />'+
          '<input tabindex="'+(formTabIndex+4)+'" type="checkbox" name="cbxMem'+memNum+'Phone1Unl" id="cbxMem'+memNum+'Phone1Unl" class="chkboxstyle" /><span class="lbl"> Unlisted</span>';
        formTabIndex = formTabIndex + 1;
        formTabIndex = formTabIndex + 1;
        formTabIndex = formTabIndex + 1;
        formTabIndex = formTabIndex + 1;
        var tr7 = document.createElement('tr');
        tr7.setAttribute('name', 'tr7'+memNum);
        tr7.setAttribute('id', 'tr7'+memNum);
        mainTableBody.appendChild(tr7);
        tr7.insertCell(0).innerHTML = '<td></td>';
        tr7.insertCell(1).innerHTML = '<td></td>';
        formTabIndex = formTabIndex + 1;
        tr7.insertCell(2).innerHTML = '<td><span class="lbl">&nbsp;&nbsp;Email 1</span></td>';
        var td7 = document.createElement('td');
        td7.setAttribute('id', 'td7'+memNum);
        td7.setAttribute('colspan', '8');
        tr7.appendChild(td7);
        td7.innerHTML = 
          '<select tabindex="'+formTabIndex+'" name="cboMem'+memNum+'Email1Type" id="cboMem'+memNum+'Email1Type" title="select an email 1 type in the pull down list" style="width:120px" class="pulldownstyle" >'+
          '<option value=""/>'+
          '<option value="Other">Other</option>'+
          '<option value="Primary">Primary</option>'+
          '</select>'+
          '&nbsp;&nbsp;'+
          '<input tabindex="'+(formTabIndex+1)+'" maxlength="100" style="width:266px" name="txaMem'+memNum+'Email1" id="txaMem'+memNum+'Email1" title="enter an email address" class="textboxstyle" />'+
          '<input tabindex="'+(formTabIndex+2)+'" type="checkbox" name="cbxMem'+memNum+'Email1Unl" id="cbxMem'+memNum+'Email1Unl" class="chkboxstyle" /><span class="lbl"> Unlisted</span>';
        var tr8 = document.createElement('tr');
        tr8.setAttribute('name', 'tr8'+memNum);
        tr8.setAttribute('id', 'tr8'+memNum);
        mainTableBody.appendChild(tr8);
        tr8.insertCell(0).innerHTML = '<td></td>';
        tr8.insertCell(1).innerHTML = '<td></td>';
        tr8.insertCell(2).innerHTML = '<td></td>';
        var td8 = document.createElement('td');
        td8.setAttribute('id', 'td8'+memNum);
        td8.setAttribute('colspan', '8');
        tr8.appendChild(td8);
        td8.innerHTML = 
         '<td colspan="3"><input tabindex="'+(formTabIndex+3)+'" type="checkbox" name="cbxMem'+memNum+'UseEmail1" id="cbxMem'+memNum+'UseEmail1" class="chkboxstyle" /> <span class="lbl">Send Email Instead of Mail When Possible</span> </td>';
        formTabIndex = formTabIndex + 1;
        formTabIndex = formTabIndex + 1;
        formTabIndex = formTabIndex + 1;
        var tr9999 = document.createElement('tr');
        tr9999.setAttribute('name', 'tr9999'+memNum);
        tr9999.setAttribute('id', 'tr9999'+memNum);
        mainTableBody.appendChild(tr9999);
        var td9999 = document.createElement('td');
        td9999.setAttribute('id', 'td9999'+memNum);
        td9999.setAttribute('colspan', '8');
        tr9999.appendChild(td9999);
        td9999.innerHTML = '<hr>';
        modifyDisplay();
        BuildTabIndex();
      }
      catch(e) {
        showmodal("", "Information", e);
      }
    }
    function DelNewMem() {
      try {
      	if (memNum>orgMemNum) {
      	  var table = document.getElementById("mainTable");
      	  var mainTableBody = document.getElementById("mainTbody");
      	  var tr1 = document.getElementById('tr1'+memNum);
      	  mainTableBody.removeChild(tr1);
      	  var tr2 = document.getElementById('tr2'+memNum);
      	  mainTableBody.removeChild(tr2);
      	  var tr3 = document.getElementById('tr3'+memNum);
      	  mainTableBody.removeChild(tr3);
      	  var tr4 = document.getElementById('tr4'+memNum);
      	  mainTableBody.removeChild(tr4);
      	  var tr5 = document.getElementById('tr5'+memNum);
      	  mainTableBody.removeChild(tr5);
      	  var tr6 = document.getElementById('tr6'+memNum);
      	  mainTableBody.removeChild(tr6);
      	  var tr7 = document.getElementById('tr7'+memNum);
      	  mainTableBody.removeChild(tr7);
      	  var tr8 = document.getElementById('tr8'+memNum);
      	  mainTableBody.removeChild(tr8);
      	  var tr9999 = document.getElementById('tr9999'+memNum);
      	  var td9999 = document.getElementById('td9999'+memNum);
      	  tr9999.removeChild(td9999);
      	  mainTableBody.removeChild(tr9999);
      	  document.getElementById('btnDelMember').disabled = false;
      	  memNum = memNum-1;
      	  if (memNum <= orgMemNum) {
      	    memNum = orgMemNum;
      	    document.getElementById('btnDelMember').disabled = true;
      	  }
    	    }
      }
      catch(e) {
        showmodal("", "Information", e);
      }
    }
    function toggleMember(num) {
      var table = document.getElementById("mainTable");
      if (table) {
        var showInfo = 'showMember'+num+'Info';
        var MemberBtn = document.getElementById('btnMember'+num+'Btn');
        if ((table.className && table.className.indexOf(showInfo) !== -1) || (MemberBtn.value == "Hide")) {
          table.className = table.className.replace(" " + showInfo, "");
          table.className = table.className.replace(showInfo, "");
          document.getElementById('cboMem'+num+'Type').style.display = 'none';
          document.getElementById('labelMem'+num+'Type').style.display = 'none';
          if (MemberBtn) {
            MemberBtn.value = "Show";
          }
        }
        else {
          if (!table.className || "" == table.className) {
            table.className = showInfo;
          }
          else {
            table.className += " " + showInfo;
          }
          if (MemberBtn) {
            MemberBtn.value = "Hide";
            document.getElementById('cboMem'+num+'Type').style.display = 'inline';
            document.getElementById('labelMem'+num+'Type').style.display = 'inline';
          }
        }
      }
      if (MemberBtn.value == 'Hide') {
        document.getElementById('tr2'+num).style.display = '';
        document.getElementById('tr3'+num).style.display = '';
        document.getElementById('tr4'+num).style.display = '';
        document.getElementById('tr5'+num).style.display = '';
        document.getElementById('tr6'+num).style.display = '';
        document.getElementById('tr7'+num).style.display = '';
        document.getElementById('tr8'+num).style.display = '';
      }
      else {
        document.getElementById('tr2'+num).style.display = 'none';
        document.getElementById('tr3'+num).style.display = 'none';
        document.getElementById('tr4'+num).style.display = 'none';
        document.getElementById('tr5'+num).style.display = 'none';
        document.getElementById('tr6'+num).style.display = 'none';
        document.getElementById('tr7'+num).style.display = 'none';
        document.getElementById('tr8'+num).style.display = 'none';
      }
    }
    // show or hide spouse section
    function toggleSpouse() {
      var table = document.getElementById("mainTable");
      if (table) {
        var showInfo = "showSpouseInfo";
        var spouseBtn = document.getElementById("btnSpouseBtn");
        if (table.className && table.className.indexOf(showInfo) !== -1) {
          table.className = table.className.replace(" " + showInfo, "");
          table.className = table.className.replace(showInfo, "");
          if (spouseBtn) {
            spouseBtn.value = "Show";
          }
        }
        else {
          if (!table.className || "" == table.className) {
            table.className = showInfo;
          }
          else {
            table.className += " " + showInfo;
          }
          if (spouseBtn) {
            spouseBtn.value = "Hide";
          }
        }
      }
    }
    // show or hide Member1 section
    function toggleMember1() {
      var table = document.getElementById("mainTable");
      if (table) {
        var showInfo = "showMember1Info";
        var Member1Btn = document.getElementById("btnMember1Btn");
        if (table.className && table.className.indexOf(showInfo) !== -1) {
          table.className = table.className.replace(" " + showInfo, "");
          table.className = table.className.replace(showInfo, "");
          if (Member1Btn) {
            Member1Btn.value = "Show";
            document.getElementById("cboMem1Type").style.display = 'none';
            document.getElementById("labelMem1Type").style.display = 'none';
            if (document.getElementById("reqlblMem1Type") != null)
              document.getElementById("reqlblMem1Type").style.display = 'none';
          }
        }
        else {
          if (!table.className || "" == table.className) {
            table.className = showInfo;
          }
          else {
            table.className += " " + showInfo;
          }
          if (Member1Btn) {
            Member1Btn.value = "Hide";
            document.getElementById("cboMem1Type").style.display = 'inline';
            document.getElementById("labelMem1Type").style.display = 'inline';
            if (document.getElementById("reqlblMem1Type") != null)
              document.getElementById("reqlblMem1Type").style.display = 'inline';
          }
        }
      }
    }
    // show or hide Fund section
    function toggleFund() {
      var table = document.getElementById("mainTable");
      if (table) {
        var showInfo = "showFundInfo";
        var FundBtn = document.getElementById("btnFundBtn");
        if (table.className && table.className.indexOf(showInfo) !== -1) {
          table.className = table.className.replace(" " + showInfo, "");
          table.className = table.className.replace(showInfo, "");
          if (FundBtn) {
            FundBtn.value = "Show";
          }
        }
        else {
          if (!table.className || "" == table.className) {
            table.className = showInfo;
          }
          else {
            table.className += " " + showInfo;
          }
          if (FundBtn) {
            FundBtn.value = "Hide";
          }
        }
      }
    }
    // e-mail validation
    function IsValidEmail(str) {
      return (str.indexOf(".") > 0) && (str.indexOf("@") > 0);
    }
    // number validation
    function IsNumeric(strString) { // check for valid numeric strings
      var strValidChars = "0123456789.-";
      var strChar;
      var blnResult = true;
      if (strString.length == 0) return false; // test strString consists of valid characters listed above
      for (i = 0; i < strString.length &&  blnResult == true; i++) {
        strChar = strString.charAt(i);
        if (strValidChars.indexOf(strChar) == -1) {
          blnResult = false;
        }
      }
      return blnResult;
    }
    // date validation
    function validateDate(argDate) {
      if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(argDate))
        return false;
      var parts = argDate.split("/");
      var day = parseInt(parts[1], 10),
          month = parseInt(parts[0], 10),
          year = parseInt(parts[2], 10);
      if (year < 1000 || year > 3000 || month == 0 || month > 12)
        return false;
      var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
      if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;
      return (day > 0 && day <= monthLength[month - 1]);
    }
    // radio button validation
    function RbtnChecked(argRbtn) {
      var rbtnResult=true;
      if (argRbtn.checked==false) {
        rbtnResult=false;
      }
      return rbtnResult;
    }
    function CheckForm() {
      if (errcaptcha == true) {
        showmodal("", "Information", "Captcha service is not available.<br><br>Please contact your church.");
        return false;
      }
      else if (errstr != "") {
        showmodal("", "Information", errstr);
        return false;
      }
      var theForm = document.forms["CORegForm"];
      var okay = true;
      var str = '';
      if (((document.getElementById('rbtEditRegID') != null) && (document.getElementById('rbtEditRegID').checked==false)) &&
          ((document.getElementById('rbtNewRegID') != null) && (document.getElementById('rbtNewRegID').checked==false))) {
        showmodal("rbtNewRegID", "Information", 'Please select a registration option');
        okay = false;
        if (document.getElementById('rbtNewRegID') != null)
          document.getElementById('rbtNewRegID').focus();
        return false;
      }
      if (((document.getElementById('rbtEditRegID') != null) && (document.getElementById('rbtEditRegID').checked==true)) ||
          ((document.getElementById('rbtNewRegID') != null) && (document.getElementById('rbtNewRegID').checked==true))) {
        if ((document.CORegForm.txaHeadFirstName.value=='') && (okay == true))
        {
          showmodal('txaHeadFirstName', "Information", 'Please enter head of household first name.');
          okay = false;
          document.CORegForm.txaHeadFirstName.focus();
        }
        else if ((document.CORegForm.txaHeadLastName.value=='') && (okay == true))
        {
          showmodal('txaHeadLastName', "Information", 'Please enter head of household last name.');
          okay = false;
          document.CORegForm.txaHeadLastName.focus();
        }
        else if ((document.CORegForm.cbxHeadPhone1Unl.checked) &&
                 (document.CORegForm.txnHeadPhone1Num1.value==''))
        {
          showmodal('txnHeadPhone1Num1', "Information", 'Please enter head of household phone area code.');
          okay = false;
          document.CORegForm.txnHeadPhone1Num1.focus();
        }
        else if ((document.CORegForm.cbxHeadPhone1Unl.checked) &&
                 (document.CORegForm.txnHeadPhone1Num2.value==''))
        {
          showmodal('txnHeadPhone1Num2', "Information", 'Please enter head of household phone prefix.');
          okay = false;
          document.CORegForm.txnHeadPhone1Num2.focus();
        }
        else if ((document.CORegForm.cbxHeadPhone1Unl.checked) &&
                 (document.CORegForm.txnHeadPhone1Num3.value==''))
        {
          showmodal('txnHeadPhone1Num3', "Information", 'Please enter head of household phone number.');
          okay = false;
          document.CORegForm.txnHeadPhone1Num3.focus();
        }
        else if ((document.CORegForm.txnHeadPhone1Num1.value=='') && (okay == true))
        {
          showmodal('txnHeadPhone1Num1', "Information", 'Please enter head of household phone area code.');
          okay = false;
          document.CORegForm.txnHeadPhone1Num1.focus();
        }
        else if (!IsNumeric(document.CORegForm.txnHeadPhone1Num1.value))
        {
          showmodal('txnHeadPhone1Num1', "Information", 'Please enter the number for the phone.');
          okay = false;
          document.CORegForm.txnHeadPhone1Num1.focus();
        }
        else if ((document.CORegForm.txnHeadPhone1Num2.value=='') && (okay == true))
        {
          showmodal('txnHeadPhone1Num2', "Information", 'Please enter head of household phone prefix.');
          okay = false;
          document.CORegForm.txnHeadPhone1Num2.focus();
        }
        else if (!IsNumeric(document.CORegForm.txnHeadPhone1Num2.value))
        {
          showmodal('txnHeadPhone1Num2', "Information", 'Please enter the number for phone.');
          okay = false;
          document.CORegForm.txnHeadPhone1Num2.focus();
        }
        else if ((document.CORegForm.txnHeadPhone1Num3.value=='') && (okay == true))
        {
          showmodal('txnHeadPhone1Num3', "Information", 'Please enter head of household phone number.');
          okay = false;
          document.CORegForm.txnHeadPhone1Num3.focus();
        }
        else if (!IsNumeric(document.CORegForm.txnHeadPhone1Num3.value))
        {
          showmodal('txnHeadPhone1Num3', "Information", 'Please enter the number for the phone.');
          okay = false;
          document.CORegForm.txnHeadPhone1Num3.focus();
        }
        else if ((document.CORegForm.cbxHeadEmail1Unl.checked) &&
                 (document.CORegForm.txaHeadEmail1.value=='') && (okay == true))
        {
          showmodal('txaHeadEmail1', "Information", 'Please enter head of household email 1 address.');
          okay = false;
          document.CORegForm.txaHeadEmail1.focus();
        }
        else if ((document.CORegForm.txaHeadEmail1.value=='') && (okay == true))
        {
          showmodal('txaHeadEmail1', "Information", 'Please enter head of household email 1 address.');
          okay = false;
          document.CORegForm.txaHeadEmail1.focus();
        }
        else if (!IsValidEmail(document.CORegForm.txaHeadEmail1.value) && (okay == true))
        {
          showmodal('txaHeadEmail1', "Information", 'Head of Household email 1 address is incorrect.');
          okay = false;
          document.CORegForm.txaHeadEmail1.focus();
        }
        else if ((document.CORegForm.txaStreetAddress.value=='') && (okay == true))
        {
          showmodal('txaStreetAddress', "Information", 'Please enter the street address.');
          okay = false;
          document.CORegForm.txaStreetAddress.focus();
        }
        else if ((document.CORegForm.txaStreetCity.value=='') && (okay == true))
        {
          showmodal('txaStreetCity', "Information", 'Please enter the street city.');
          okay = false;
          document.CORegForm.txaStreetCity.focus();
        }
        else if ((document.CORegForm.cboStreetState.selectedIndex == 0) && (okay == true))
        {
          showmodal('cboStreetState', "Information", 'Please select the street state in the pull down list.');
          okay = false;
          document.CORegForm.cboStreetState.focus();
        }
        else if ((document.CORegForm.txaStreetZIP.value=='') && (okay == true))
        {
          showmodal('txaStreetZIP', "Information", 'Please enter the street zip.');
          okay = false;
          document.CORegForm.txaStreetZIP.focus();
        }
        else if ((document.CORegForm.cbxAddrPhone1Unl.checked) &&
                 (document.CORegForm.txnAddrPhone1Num1.value==''))
        {
          showmodal("txnAddrPhone1Num1", "Information", 'Please enter the family phone area code.');
          okay = false;
          document.CORegForm.txnAddrPhone1Num1.focus();
        }
        else if ((document.CORegForm.cbxAddrPhone1Unl.checked) &&
                 (document.CORegForm.txnAddrPhone1Num2.value==''))
        {
          showmodal("txnAddrPhone1Num2", "Information", 'Please enter the family phone prefix.');
          okay = false;
          document.CORegForm.txnAddrPhone1Num2.focus();
        }
        else if ((document.CORegForm.cbxAddrPhone1Unl.checked) &&
                 (document.CORegForm.txnAddrPhone1Num3.value==''))
        {
          showmodal("txnAddrPhone1Num3", "Information", 'Please enter the family phone number.');
          okay = false;
          document.CORegForm.txnAddrPhone1Num3.focus();
        }
        else if ((document.CORegForm.txnAddrPhone1Num1.value=='') && (okay == true))
        {
          showmodal("txnAddrPhone1Num1", "Information", 'Please enter the family phone area code.');
          okay = false;
          document.CORegForm.txnAddrPhone1Num1.focus();
        }
        else if (!IsNumeric(document.CORegForm.txnAddrPhone1Num1.value))
        {
          showmodal("txnAddrPhone1Num1", "Information", 'Please enter number for the phone.');
          okay = false;
          document.CORegForm.txnAddrPhone1Num1.focus();
        }
        else if ((document.CORegForm.txnAddrPhone1Num2.value=='') && (okay == true))
        {
          showmodal("txnAddrPhone1Num2", "Information", 'Please enter the family phone prefix.');
          okay = false;
          document.CORegForm.txnAddrPhone1Num2.focus();
        }
        else if (!IsNumeric(document.CORegForm.txnAddrPhone1Num2.value))
        {
          showmodal("txnAddrPhone1Num2", "Information", 'Please enter number for phone.');
          okay = false;
          document.CORegForm.txnAddrPhone1Numm2.focus();
        }
        else if ((document.CORegForm.txnAddrPhone1Num3.value=='') && (okay == true))
        {
          showmodal("txnAddrPhone1Num3", "Information", 'Please enter the family phone number.');
          okay = false;
          document.CORegForm.txnAddrPhone1Num3.focus();
        }
        else if (!IsNumeric(document.CORegForm.txnAddrPhone1Num3.value))
        {
          showmodal("txnAddrPhone1Num3", "Information", 'Please enter number for the phone.');
          okay = false;
          document.CORegForm.txnAddrPhone1Num3.focus();
        }
        else if ((document.CORegForm.cbxAddrEmailUnl.checked) &&
                 (document.CORegForm.txaAddrEmail.value==''))
        {
          showmodal("txaAddrEmail", "Information", 'Please enter the family email address.');
          okay = false;
          document.CORegForm.txaAddrEmail.focus();
        }
        else if ((document.CORegForm.txaAddrEmail.value=='') && (okay == true))
        {
          showmodal("txaAddrEmail", "Information", 'Please enter the family email address.');
          okay = false;
          document.CORegForm.txaAddrEmail.focus();
        }
        else if (!IsValidEmail(document.CORegForm.txaAddrEmail.value) && (okay == true))
        {
          showmodal("txaAddrEmail", "Information", 'Family email address is incorrect.');
          okay = false;
          document.CORegForm.txaAddrEmail.focus();
        }
        for (var i=2; i<=memNum; i++) {
        }
      }
      else if ((document.getElementById('rbtEditRegID') != null) && (document.getElementById('rbtEditRegID').checked==true)) {
        if (theForm.elements['txaFamIDEnv'].value=='') {
          showmodal("txaFamIDEnv", "Information", 'Please enter your ID/Env number.\n\nCall St. Barbara Church at (724) 744-7474, if you\ndo not know your ID Number or Envelope Number.');
          okay = false;
          theForm.elements['txaFamIDEnv'].focus();
        }
        else if (theForm.elements['txaHeadFirstName'].value=='') {
          showmodal("txaHeadFirstName", "Information", 'Please select head first name');
          okay = false;
          theForm.elements['txaHeadFirstName'].focus();
        }
        else if (theForm.elements['txaHeadLastName'].value=='') {
          showmodal("txaHeadLastName", "Information", 'Please select head last name');
          okay = false;
          theForm.elements['txaHeadLastName'].focus();
        }
        else if ((document.CORegForm.cbxAddrPhone1Unl.checked) &&
                 (document.CORegForm.txnAddrPhone1Num1.value=='')) {
          showmodal("txnAddrPhone1Num1", "Information", 'Please enter the family phone area code.');
          okay = false;
          document.CORegForm.txnAddrPhone1Num1.focus();
        }
        else if ((document.CORegForm.cbxAddrPhone1Unl.checked) &&
                 (document.CORegForm.txnAddrPhone1Num2.value=='')) {
          showmodal("txnAddrPhone1Num2", "Information", 'Please enter the family phone prefix.');
          okay = false;
          document.CORegForm.txnAddrPhone1Num2.focus();
        }
        else if ((document.CORegForm.cbxAddrPhone1Unl.checked) &&
                 (document.CORegForm.txnAddrPhone1Num3.value=='')) {
          showmodal("txnAddrPhone1Num3", "Information", 'Please enter the family phone number.');
          okay = false;
          document.CORegForm.txnAddrPhone1Num3.focus();
        }
        else if ((document.CORegForm.txnAddrPhone1Num1.value=='') && (okay == true)) {
          showmodal("txnAddrPhone1Num1", "Information", 'Please enter the family phone area code.');
          okay = false;
          document.CORegForm.txnAddrPhone1Num1.focus();
        }
        else if (!IsNumeric(document.CORegForm.txnAddrPhone1Num1.value)) {
          showmodal("txnAddrPhone1Num1", "Information", 'Please enter number for the phone.');
          okay = false;
          document.CORegForm.txnAddrPhone1Num1.focus();
        }
        else if ((document.CORegForm.txnAddrPhone1Num2.value=='') && (okay == true)) {
          showmodal("txnAddrPhone1Num2", "Information", 'Please enter the family phone prefix.');
          okay = false;
          document.CORegForm.txnAddrPhone1Num2.focus();
        }
        else if (!IsNumeric(document.CORegForm.txnAddrPhone1Num2.value)) {
          showmodal("txnAddrPhone1Num2", "Information", 'Please enter number for phone.');
          okay = false;
          document.CORegForm.txnAddrPhone1Numm2.focus();
        }
        else if ((document.CORegForm.txnAddrPhone1Num3.value=='') && (okay == true)) {
          showmodal("txnAddrPhone1Num3", "Information", 'Please enter the family phone number.');
          okay = false;
          document.CORegForm.txnAddrPhone1Num3.focus();
        }
        else if (!IsNumeric(document.CORegForm.txnAddrPhone1Num3.value)) {
          showmodal("txnAddrPhone1Num3", "Information", 'Please enter number for the phone.');
          okay = false;
          document.CORegForm.txnAddrPhone1Num3.focus();
        }
        else if (theForm.elements['txaAddrEmail'].value=='') {
          showmodal("txaAddrEmail", "Information", 'Please enter the family email address');
          okay = false;
          theForm.elements['txaAddrEmail'].focus();
        }
        else if (!IsValidEmail(theForm.elements['txaAddrEmail'].value) && (okay == true)) {
          showmodal("txaAddrEmail", "Information", 'Family email address is incorrect.');
          okay = false;
          theForm.elements['txaAddrEmail'].focus();
        }
      }
      else {
        showmodal("rbtNewRegID", "Information", 'Please select a registration option');
        okay = false;
        if (document.getElementById('rbtNewRegID') != null)
          document.getElementById('rbtNewRegID').focus();
      }
      if (okay == true) {
        var ckvisible = document.getElementById("captsection").style.display;
        if (ckvisible == "none") {
          GetNewCaptcha();
          document.getElementById("captsection").scrollIntoView();
          document.getElementById("appCaptcha").focus();
          okay = false;
        }
      }
      if ((okay == true) && (ckvisible == "block") && (document.getElementById("appCaptcha").value=="")) {
        document.getElementById("captsection").scrollIntoView();
        showmodal("appCaptcha", "Information", "Please enter the characters.");
        okay = false;
      }
      else if ((okay == true) && (ckvisible == "block") && (document.getElementById("appCaptcha").value!="")) {
        var clen = document.getElementById("appCaptcha").value;
        if ((clen.length < 3) || (clen.length > 5)) {
          document.getElementById("captsection").scrollIntoView();
          showmodal("appCaptcha", "Information", "Please enter the same characters.");
          okay = false;
        }
      else okay = true;
      }
      if (okay == true)
        showmodal("", "Confirmation", "Are you ready to submit the form?");
      return okay;
    }
    // get fund period
    function ShowFundPeriod(val, prd)
    {
      var okay = true;
      for (var i=0; i<fndFN.length; i++)
      {
        if (fndFN[i] == val)
        {
          document.getElementById('Fund'+prd+'Period').innerHTML = '('+fndDR[i]+')';
        }
      }
      return okay;
    }
    function checkDate(e) {
      var theForm = document.forms["CORegForm"];
      if ((theForm.elements[e].value!='mm/dd/yyyy')&&
          (!validateDate(theForm.elements[e].value))) {
        clickOutSide();
        showmodal(e, "Information", 'Please enter a date format as mm/dd/yyyy.');
        theForm.elements[e].focus();
      }
    }
    function checkDR(f,e) {
      var theForm = document.forms["CORegForm"];
      if ((theForm.elements['dteFund'+f+e].value!='mm/dd/yyyy')&&
          (!validateDate(theForm.elements['dteFund'+f+e].value))) {
        clickOutSide();
        showmodal('dteFund'+f+e, "Information", 'Please enter valid '+e+' date format as mm/dd/yyyy.');
    	  theForm.elements['dteFund'+f+e].focus();
      }
      else if ((theForm.elements['dteFund'+f+e].value!='mm/dd/yyyy')&&
               (!validateDate(theForm.elements['dteFund'+f+e].value))) {
        clickOutSide();
        showmodal('dteFund'+f+e, "Information", 'Please enter valid '+e+' date format as mm/dd/yyyy.');
    	  theForm.elements['dteFund'+f+e].focus();
      }
      else if (theForm.elements['dteFund'+f+e].value!='mm/dd/yyyy') {
        if ((theForm.elements['cboRecurrFund'+f].value != '')&&
            (theForm.elements['cboTermFund'+f].value != '')&&
            (theForm.elements['dteFund'+f+'Start'].value != '')&&
            (theForm.elements['dteFund'+f+'End'].value != '')) {
          CalcRate(f);
          if (theForm.elements['dteFund'+f+'Start'].value > theForm.elements['dteFund'+f+'End'].value) {
            theForm.elements['dteFund'+f+'End'].value = theForm.elements['dteFund'+f+'Start'].value;
            theForm.elements['dteFund'+f+'End'].focus();
          }
        }
      }
    }
    // calculate and display each fund
    function ATotal(f) {
      Math.E
      Math.PI
      Math.SQRT2
      Math.SQRT1_2
      Math.LN2
      Math.LN10
      Math.LOG2E
      Math.LOG10E
      var theForm = document.forms["CORegForm"];
      var amt = theForm.elements['amtTotalFund'+f].value;
      return amt; //return total;
    }
    function CheckTotalAndRate(id1, id2) {
      if ((document.getElementById(id1) != null) && (document.getElementById(id2) != null) && (document.getElementById(id1).value == "") && (document.getElementById(id2).value != ""))
        document.getElementById(id2).value = "";
      if ((document.getElementById(id1) != null) && (document.getElementById(id2) != null) && (document.getElementById(id2).value == "") && (document.getElementById(id1).value != ""))
        document.getElementById(id1).value = "";
    }
    // calculate total all
    function TotalConAll() {
    }
    // clear total
    function ClearTotal()
    {
    }
    // auto move to a next phone field
    function autoTab(current,next)
    {
      if (current.getAttribute&&current.value.length==current.getAttribute("maxlength"))next.focus();
    }
   function onKeyPressed(evt, input) {
     var code = evt.charCode || evt.keyCode,
         v = document.getElementById(input.id).value;
     if ((code == 27) || (code == 9) || (code == 13) || (validateDate(v))) {
       if (v != "mm/dd/yyyy")
         checkDate(input.id)
       clickOutSide();
       return false;
     }
     else if (v === "mm/dd/yyyy") {
       return false;
     }
   }
   function clickOutSide() {
     if ((calendar !== null) && (_calendar_active_instance !== null)) {
       var ths = _calendar_active_instance;
       if (ths.hasOwnProperty("hideCalendar"))
         ths.hideCalendar();
     }
   }
   function documentClick(e)
   {
     if (document.calendarClicked)
     {
       document.calendarClicked = false;
     }
     else
     {
       clickOutSide();
     }
   }
   var calendar =
   {
     month_names: ["January","February","March","April","May","June","July","August","September","October","November","December"],
     weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
     month_days: [31,28,31,30,31,30,31,31,30,31,30,31],
     //Get today's date - year, month, day and date
     today : new Date(),
     opt : {},
     data: [],
     //Functions
     // Used to create HTML in a optimized way.
     wrt:function(txt)
     {
       this.data.push(txt);
     },
     /* Inspired by http://www.quirksmode.org/dom/getstyles.html */
     getStyle: function(ele, property)
     {
       if (ele.currentStyle)
       {
         var alt_property_name = property.replace(/\-(\w)/g,function(m,c){return c.toUpperCase();});//background-color becomes backgroundColor
    	 var value = ele.currentStyle[property]||ele.currentStyle[alt_property_name];
       }
       else if (window.getComputedStyle)
       {
         property = property.replace(/([A-Z])/g,"-$1").toLowerCase();//backgroundColor becomes background-color
    	 var value = document.defaultView.getComputedStyle(ele,null).getPropertyValue(property);
       }
       //Some properties are special cases
       if(property == "opacity" && ele.filter) value = (parseFloat( ele.filter.match(/opacity\=([^)]*)/)[1] ) / 100);
       else if(property == "width" && isNaN(value)) value = ele.clientWidth || ele.offsetWidth;
       else if(property == "height" && isNaN(value)) value = ele.clientHeight || ele.offsetHeight;
       return value;
     },
     getPosition:function(ele)
     {
       var x = 0;
       var y = 0;
       while (ele)
       {
         x += ele.offsetLeft;
    	 y += ele.offsetTop;
    	 ele = ele.offsetParent;
       } //while
       if (navigator.userAgent.indexOf("Mac") != -1 && typeof document.body.leftMargin != "undefined")
       {
         x += document.body.leftMargin;
    	 offsetTop += document.body.topMargin;
       }
       var xy = new Array(x,y);
       return xy;
     },
     // Called when the user clicks on a date in the calendar.
     selectDate:function(year,month,day)
     {
       var ths = _calendar_active_instance;
       //document.getElementById(ths.opt["input"]).value = year + "-" + month + "-" + day; // Date format is :HARDCODE:
       document.getElementById(ths.opt["input"]).value = month + "/" + day + "/" + year; // Date format is :HARDCODE:
       ths.hideCalendar();
     },
     // Creates a calendar with the date given in the argument as the selected date.
     makeCalendar:function(year, month, day)
     {
       year = parseInt(year);
       month = parseInt(month);
       day = parseInt(day);
       //Display the table
       var next_month = month+1;
       var next_month_year = year;
       if(next_month>=12)
       {
    	 next_month = 0;
    	 next_month_year++;
       }
       var previous_month = month-1;
       var previous_month_year = year;
       if(previous_month< 0)
       {
         previous_month = 11;
    	 previous_month_year--;
       }
       this.wrt("<table>");
       this.wrt("<tr><th><a href='javascript:calendar.makeCalendar("+(previous_month_year)+","+(previous_month)+");' title='"+this.month_names[previous_month]+" "+(previous_month_year)+"'>&lt;</a></th>");
       this.wrt("<th colspan='5' class='calendar-title'><select name='calendar-month' class='calendar-month' onChange='calendar.makeCalendar("+year+",this.value);'>");
       for(var i in this.month_names)
       {
         this.wrt("<option background='#FEFCFF' value='"+i+"'");
    	 if(i == month) this.wrt(" selected='selected'");
    	 this.wrt(">"+this.month_names[i]+"</option>");
       }
       this.wrt("</select>");
       this.wrt("<select background='#FEFCFF' name='calendar-year' class='calendar-year' onChange='calendar.makeCalendar(this.value, "+month+");'>");
       var current_year = this.today.getYear();
       if(current_year < 1900) current_year += 1900;
       for(var i=1899; i<current_year+500; i++)
       {
       	 this.wrt("<option value='"+i+"'")
    	 if(i == year) this.wrt(" selected='selected'");
    	 this.wrt(">"+i+"</option>");
       }
       this.wrt("</select></th>");
       this.wrt("<th><a href='javascript:calendar.makeCalendar("+(next_month_year)+","+(next_month)+");' title='"+this.month_names[next_month]+" "+(next_month_year)+"'>&gt;</a></th></tr>");
       this.wrt("<tr class='header'>");
       for(var weekday=0; weekday<7; weekday++) this.wrt("<td>"+this.weekdays[weekday]+"</td>");
       this.wrt("</tr>");
       //Get the first day of this month
       var first_day = new Date(year,month,1);
       var start_day = first_day.getDay();
       var d = 1;
       var flag = 0;
       //Leap year support
       if(year % 4 == 0) this.month_days[1] = 29;
       else this.month_days[1] = 28;
       var days_in_this_month = this.month_days[month];
       //Create the calender
       for(var i=0;i<=5;i++)
       {
    	 if(w >= days_in_this_month) break;
    	 this.wrt("<tr>");
    	 for(var j=0;j<7;j++)
         {
    	   if(d > days_in_this_month) flag=0; //If the days has overshooted the number of days in this month, stop writing
    	   else if(j >= start_day && !flag) flag=1;//If the first day of this month has come, start the date writing
    	   if(flag)
           {
    	     var w = d, mon = month+1;
    	     if(w < 10)	w	= "0" + w;
    	     if(mon < 10)mon = "0" + mon;
    	     //Is it today?
    	     var class_name = '';
    	     var yea = this.today.getYear();
    	     if(yea < 1900) yea += 1900;
    	     if(yea == year && this.today.getMonth() == month && this.today.getDate() == d) class_name = " today";
    	     if(day == d) class_name += " selected";
    	     class_name += " " + this.weekdays[j].toLowerCase();
    	     this.wrt("<td class='days"+class_name+"'><a href='javascript:calendar.selectDate(\""+year+"\",\""+mon+"\",\""+w+"\")'>"+w+"</a></td>");
    	     d++;
    	   }
           else
           {
    	     this.wrt("<td class='days'>&nbsp;</td>");
    	   }
    	 }
    	this.wrt("</tr>");
      }
      this.wrt("</table>");
      this.wrt("<table>");
      this.wrt("  <tr>");
      this.wrt("    <td>");
      this.wrt("      <input type='button' value='Clear' class='calendar-cancel btnstyle' onclick='calendar.clearCalValue();' />");
      this.wrt("    </td>");
      this.wrt("    <td>");
      this.wrt("      <input type='button' value='Close' class='calendar-cancel btnstyle' onclick='calendar.hideCalendar();' />");
      this.wrt("    </td>");
      this.wrt("  </tr>");
      this.wrt("</table>");
      document.getElementById(this.opt['calendar']).innerHTML = this.data.join("");
      this.data = [];
    },
    // Display the calendar - if a date exists in the input box, that will be selected in the calendar.
    showCalendar: function()
    {
      var input = document.getElementById(this.opt['input']);
      //Position the div in the correct location...
      var div = document.getElementById(this.opt['calendar']);
      var xy = this.getPosition(input);
      var width = parseInt(this.getStyle(input,'width'));
        div.style.left=(xy[0]+width+10)+"px";
      div.style.top=xy[1]+"px";
      // Show the calendar with the date in the input as the selected date
      if ((input.value!='mm/dd/yyyy')&& (validateDate(input.value))) {
        var existing_date = new Date(input.value);
      }
      else {
        var existing_date = new Date();
      }
      var date_in_input = input.value;
      if(date_in_input) {
        var selected_date = false;
    	var date_parts = date_in_input.split("-");
    	if(date_parts.length == 3) {
    	  date_parts[1]--; //Month starts with 0
    	  selected_date = new Date(date_parts[0], date_parts[1], date_parts[2]);
    	}
    	if(selected_date && !isNaN(selected_date.getYear())) { //Valid date.
    	  existing_date = selected_date;
    	}
      }
      var the_year = existing_date.getYear();
      if(the_year < 1900) the_year += 1900;
      this.makeCalendar(the_year, existing_date.getMonth(), existing_date.getDate());
      document.getElementById(this.opt['calendar']).style.display = "block";
      _calendar_active_instance = this;
    },
    // Hides the currently show calendar.
    hideCalendar: function(instance) {
      var active_calendar_id = "";
      if(instance) active_calendar_id = instance.opt['calendar'];
      else active_calendar_id = _calendar_active_instance.opt['calendar'];
      if(active_calendar_id) document.getElementById(active_calendar_id).style.display = "none";
      _calendar_active_instance = {};
      document.getElementById(this.opt['input']).focus();
    },
    // Hides the currently show calendar.
    clearCalValue: function(instance) {
      var active_calendar_id = "";
      if(instance) active_calendar_id = instance.opt['calendar'];
      else active_calendar_id = _calendar_active_instance.opt['calendar'];
      if(active_calendar_id) document.getElementById(active_calendar_id).style.display = "none";
      _calendar_active_instance = {};
      document.getElementById(this.opt['input']).value = "mm/dd/yyyy";
      document.getElementById(this.opt['input']).focus();
    },
    // Setup a text input box to be a calendar box.
    set: function(input_id)
    {
      var input = document.getElementById(input_id);
      if(!input) return; //If the input field is not there, exit.
      if(!this.opt['calendar']) this.init();
      var ths = this;
      input.onclick=function()
      {
    	document.calendarClicked = true;
    	ths.opt['input'] = this.id;
    	ths.showCalendar();
      },
      input.onkeypress=function(e) {
        var code = e.charCode || e.keyCode;
        if ((code == 27) || (code == 9) || (code == 13)) {
          return false;
        }
      };
    },
    // Will be called once when the first input is set.
    init: function()
    {
      if(!this.opt['calendar'] || !document.getElementById(this.opt['calendar']))
      {
        var div = document.createElement('div');
    	if(!this.opt['calendar']) this.opt['calendar'] = 'calender_div_'+ Math.round(Math.random() * 100);
    	div.setAttribute('id',this.opt['calendar']);
    	div.className="calendar-box";
    	document.getElementsByTagName("body")[0].insertBefore(div,document.getElementsByTagName("body")[0].firstChild);
    	div.onclick = function(e)
        {
    	  document.calendarClicked = true;
    	};
      }
    }
   }
