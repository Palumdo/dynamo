<?php 
  require_login($course, true, $cm);
 
  $canvas = '';
  $jscript = '<script>
    window.onload = function ()
    {';
  $tooltips = get_string('dynamotypeletters', 'mod_dynamo');
  echo '<div style="width:100%;margin-top:15px;">'.get_string('dynamoliststudent', 'mod_dynamo').'&nbsp;<div class="tooltip"><i class="fas fa-info-circle" style="font-size:16px;color:#006DCC;"></i><span class="tooltiptext">'.$tooltips.'</span></div> : <input type="text" id="students"></div>';
  echo '<input type="hidden" id="studentshidden">';
  echo '<script>';
  // datalist search
  echo 'var local_source = [';
  
  $students = dynamo_get_groupment_users($dynamo->groupementid);
  foreach ($students as $stu) { // loop to all students of grouping
    echo '{
      value: '.$stu->id.',
      label: "'.$stu->firstname.' '.$stu->lastname.'"
    },'; 
  }
  echo '];';
?>
  $("#students").autocomplete({
    source: local_source,
    focus: function(event, ui) {
					// prevent autocomplete from updating the textbox
					event.preventDefault();
					// manually update the textbox
					$(this).val(ui.item.label);
				},
		select: function(event, ui) {
					// prevent autocomplete from updating the textbox
					event.preventDefault();
					// manually update the textbox and hidden field
					$(this).val(ui.item.label);
					$("#studentshidden").val(ui.item.value);
          document.location.href="view.php?id=<?php echo($cm->id)?>&usrid="+ui.item.value+"&groupid=<?php echo($groupid)?>&tab=5";
				},
    change: function (event, ui) {
          if(!ui.item) {
            $(this).val("");
            $("#studentshidden").val("");
          }
        }
});
</script>
  <?php     
  if($usrid != 0) {
      $usr = $DB->get_record('user', array('id' =>$usrid )); 

      echo ('<h3>'.get_string('dynamoteacherlvl1title', 'mod_dynamo').' : '.$usr->firstname.' '.$usr->lastname.'</h3>');
      $grp =dynamo_get_group_from_user($dynamo->groupementid, $usrid);
     
      echo('<h4 class="dynagroupingtitle" style="color:white;cursor:default;"><i class="fas fa-user-cog"></i> '.$grp->name.'</h4>');
      echo('<div class="" id="'.$grp->id.'" style="display:;">');

      $labels = '[\''.get_string('dynamoparticipation', 'mod_dynamo').'\',\''.get_string('dynamoresponsabilite', 'mod_dynamo').'\',\''.get_string('dynamoscientifique', 'mod_dynamo').'\',\''.get_string('dynamotechnique', 'mod_dynamo').'\',\''.get_string('dynamoattitude', 'mod_dynamo').'\'';
      if($display6 != 'none') {
        $labels .= ',\''.$dynamo->critoptname.'\'';
      }
      $labels .= ']';
      // user eval the others
      echo (' <div class="table-container">
              <h3>'.$usr->firstname.' '.$usr->lastname.' : '.get_string('dynamoteacherlvl1evalother', 'mod_dynamo').'</h3> 
                <table class="tablelvl0">
                  <thead>
                     <tr>
                        <th>&nbsp;</th>
                        <th>&nbsp;</th>
                        <th>'.get_string('dynamoparticipation', 'mod_dynamo').' <a href="#" data-toggle="tooltip"    dyna-data-title="('.get_string('dynamocritparticipationdefault', 'mod_dynamo').' - '.$dynamo->crit1.')">&nbsp;<i class="fas fa-info-circle ico-white"></i></a></th>
                        <th>'.get_string('dynamoresponsabilite', 'mod_dynamo').' <a href="#" data-toggle="tooltip"   dyna-data-title="('.get_string('dynamocritresponsabilitedefault', 'mod_dynamo').'- '.$dynamo->crit2.')">&nbsp;<i class="fas fa-info-circle ico-white"></i></a></th>
                        <th>'.get_string('dynamoscientifique', 'mod_dynamo').' <a href="#" data-toggle="tooltip"     dyna-data-title="('.get_string('dynamocritscientifiquedefault', 'mod_dynamo').'- '.$dynamo->crit3.')">&nbsp;<i class="fas fa-info-circle ico-white"></i></a></th>
                        <th>'.get_string('dynamotechnique', 'mod_dynamo').' <a href="#" data-toggle="tooltip"        dyna-data-title="('.get_string('dynamocrittechniquedefault', 'mod_dynamo').'- '.$dynamo->crit4.')">&nbsp;<i class="fas fa-info-circle ico-white"></i></a></th>
                        <th>'.get_string('dynamoattitude', 'mod_dynamo').' <a href="#" data-toggle="tooltip"         dyna-data-title="('.get_string('dynamocritattitudedefault', 'mod_dynamo').'- '.$dynamo->crit5.')">&nbsp;<i class="fas fa-info-circle ico-white"></i></a></th>
                        <th style="display:'.$display6.'">'.$dynamo->critoptname.'<a href="#" data-toggle="tooltip"           dyna-data-title="'.$dynamo->critopt.'">&nbsp;<i class="fas fa-info-circle ico-white"></i></a></th>
                        <th>'.get_string('dynamosum', 'mod_dynamo').'</th>
                        <th>'.get_string('dynamoavg', 'mod_dynamo').'</th>
                     </tr>
                  </thead>
                  <tbody>
        '); // Standard deviation = ecart type <th>'.get_string('dynamostddev', 'mod_dynamo').'</th> 
        $dynamoautoeval = array();

        // display group evaluation
        if($dynamo->groupeval == 1) {
            $dynamoeval = dynamo_get_evaluation($dynamo->id, $usrid, $grp->id);
            
            $result = dynamo_compute_basis($dynamoeval, $display6);
            echo ('<tr style="border:2px solid black;">');
            echo (' <td class="tdteach"><b>'.get_string('dynamoevalofgroup', 'mod_dynamo').'</b></td><td>'.$grp->name.'</td>');
            echo (' <td class="tdteach">'.$dynamoeval->crit1.'</td>');
            echo (' <td class="tdteach">'.$dynamoeval->crit2.'</td>');
            echo (' <td class="tdteach">'.$dynamoeval->crit3.'</td>');
            echo (' <td class="tdteach">'.$dynamoeval->crit4.'</td>');
            echo (' <td class="tdteach">'.$dynamoeval->crit5.'</td>');
            echo (' <td class="tdteach" style="display:'.$display6.'">'.$dynamoeval->crit6.'</td>');
            echo (' <td class="tdteach">'.$result->sum.'</td>');
            echo (' <td class="tdteach">'.$result->avg.'</td>');
            echo ('</tr>');
            $dynamoeval->sum = $result->sum;
            $dynamoeval->avg = $result->avg;
            $dynamoeval->grp = 1;
        }

        
        $grpusrs = dynamo_get_group_users($grp->id);
        foreach ($grpusrs as $grpusrsub) { // loop to all evaluation of  students
          $color = "";
          if($usrid == $grpusrsub->id) $color = '#6699cc';


          if($grpusrsub->id == $usrid && $dynamo->autoeval == 0) {
          } else {
            $dynamoeval = dynamo_get_evaluation($dynamo->id, $usrid, $grpusrsub->id);
            if($usrid ==  $grpusrsub->id) $dynamoautoeval[] = $dynamoeval;   
            $result = dynamo_compute_basis($dynamoeval, $display6);

            echo ('<tr onclick="document.location=\'view.php?id='.$cm->id.'&usrid='.$grpusrsub->id.'&groupid='.$groupid.'&tab=5\'" style="cursor:pointer;">');
            echo (' <td style="color:'.$color.'" class="tdteach">'.$grpusrsub->firstname.'</td><td style="color:'.$color.'" class="tdteach">'.$grpusrsub->lastname.'</td>');
            echo (' <td class="tdteach">'.$dynamoeval->crit1.'</td>');
            echo (' <td class="tdteach">'.$dynamoeval->crit2.'</td>');
            echo (' <td class="tdteach">'.$dynamoeval->crit3.'</td>');
            echo (' <td class="tdteach">'.$dynamoeval->crit4.'</td>');
            echo (' <td class="tdteach">'.$dynamoeval->crit5.'</td>');
            echo (' <td class="tdteach" style="display:'.$display6.'">'.$dynamoeval->crit6.'</td>');
            echo (' <td class="tdteach">'.$result->sum.'</td>');
            echo (' <td class="tdteach">'.$result->avg.'</td>');
            echo ('</tr>');
            $dynamoeval->sum = $result->sum;
            $dynamoeval->avg = $result->avg;
            $dynamoeval->grp = 0;
          }
        }

      echo (' </tbody>
            </table>
          </div>');

      $comment = dynamo_get_comment($usrid, $dynamo);
      echo ('<div>');
      echo('<b>'.get_string('dynamocommentcontr', 'mod_dynamo').'</b><br>');
      echo($comment->comment1.'<br>');
      echo('<b>'.get_string('dynamocommentfonction', 'mod_dynamo').'</b><br>');
      echo($comment->comment2.'<br><br>');
    //*********************************************************************
    // user eval BY the others
      echo (' <div class="table-container">
                <h3>'.$usr->firstname.' '.$usr->lastname.' : '.get_string('dynamoteacherlvl1othereval', 'mod_dynamo').'</h3> 
                <table class="tablelvl0">
                  <thead>
                     <tr>
                        <th>&nbsp;</th>
                        <th>&nbsp;</th>
                        <th>'.get_string('dynamoparticipation', 'mod_dynamo').' <a href="#" data-toggle="tooltip"    dyna-data-title="('.get_string('dynamocritparticipationdefault', 'mod_dynamo').' - '.$dynamo->crit1.')">&nbsp;<i class="fas fa-info-circle ico-white"></i></a></th>
                        <th>'.get_string('dynamoresponsabilite', 'mod_dynamo').' <a href="#" data-toggle="tooltip"   dyna-data-title="('.get_string('dynamocritresponsabilitedefault', 'mod_dynamo').'- '.$dynamo->crit2.')">&nbsp;<i class="fas fa-info-circle ico-white"></i></a></th>
                        <th>'.get_string('dynamoscientifique', 'mod_dynamo').' <a href="#" data-toggle="tooltip"     dyna-data-title="('.get_string('dynamocritscientifiquedefault', 'mod_dynamo').'- '.$dynamo->crit3.')">&nbsp;<i class="fas fa-info-circle ico-white"></i></a></th>
                        <th>'.get_string('dynamotechnique', 'mod_dynamo').' <a href="#" data-toggle="tooltip"        dyna-data-title="('.get_string('dynamocrittechniquedefault', 'mod_dynamo').'- '.$dynamo->crit4.')">&nbsp;<i class="fas fa-info-circle ico-white"></i></a></th>
                        <th>'.get_string('dynamoattitude', 'mod_dynamo').' <a href="#" data-toggle="tooltip"         dyna-data-title="('.get_string('dynamocritattitudedefault', 'mod_dynamo').'- '.$dynamo->crit5.')">&nbsp;<i class="fas fa-info-circle ico-white"></i></a></th>
                        <th style="display:'.$display6.'">'.$dynamo->critoptname.'<a href="#" data-toggle="tooltip"           dyna-data-title="'.$dynamo->critopt.'">&nbsp;<i class="fas fa-info-circle ico-white"></i></a></th>
                        <th>'.get_string('dynamosum', 'mod_dynamo').'</th>
                        <th>'.get_string('dynamoavg', 'mod_dynamo').'</th>
                     </tr>
                  </thead>
                  <tbody>
        '); // Standard deviation = ecart type <th>'.get_string('dynamostddev', 'mod_dynamo').'</th> 
        
        $grpusrs = dynamo_get_group_users($grp->id);
        foreach ($grpusrs as $grpusrsub) { // loop to all evaluation of  students
          $color = "";
          if($usrid == $grpusrsub->id) $color = '#6699cc';

          if($grpusrsub->id == $usrid && $dynamo->autoeval == 0) {
          } else {
            $dynamoeval = dynamo_get_evaluation($dynamo->id, $grpusrsub->id, $usrid);
            

            $result = dynamo_compute_basis($dynamoeval, $display6);

            echo ('<tr onclick="document.location=\'view.php?id='.$cm->id.'&usrid='.$grpusrsub->id.'&groupid='.$groupid.'&tab=5\'" style="cursor:pointer;">');
            echo (' <td style="color:'.$color.'" class="tdteach">'.$grpusrsub->firstname.'</td><td style="color:'.$color.'" class="tdteach">'.$grpusrsub->lastname.'</td>');
            echo (' <td class="tdteach">'.$dynamoeval->crit1.'</td>');
            echo (' <td class="tdteach">'.$dynamoeval->crit2.'</td>');
            echo (' <td class="tdteach">'.$dynamoeval->crit3.'</td>');
            echo (' <td class="tdteach">'.$dynamoeval->crit4.'</td>');
            echo (' <td class="tdteach">'.$dynamoeval->crit5.'</td>');
            echo (' <td class="tdteach" style="display:'.$display6.'">'.$dynamoeval->crit6.'</td>');
            echo (' <td class="tdteach">'.$result->sum.'</td>');
            echo (' <td class="tdteach">'.$result->avg.'</td>');
            echo ('</tr>');
          }
        }
      echo (' </tbody>
            </table>
          </div>');

    //**********************************************************************      
        
      $data = dynamo_compute_advanced($usrid, $dynamo);
      echo('<table style="border-collapse: collapse;border-spacing: 0;width: 100%;display: table;border: 1px solid #ccc;">');
      echo('<tr><td style="width:200px;"><b>'.get_string('dynamoavgeval', 'mod_dynamo').'</b>:</td><td>'.round(($data->sum/$data->nbeval)/$data->nbcrit,2).'<td><tr>');
      echo('<tr style="background-color:#ccc;"><td><b>'.get_string('dynamoautoeval', 'mod_dynamo').'</b>:</td><td>'.round($data->autosum/$data->nbcrit,2).'<td><tr>');
      $snif = dynamo_get_snif($dynamo, $grpusrs, $usrid);
      $conf = dynamo_get_conf($dynamo, $grpusrs, $usrid);
      echo('<tr><td><b>'.get_string('dynamosnif', 'mod_dynamo').'</b>:</td><td><span style="color:white;background-color:'.dynamo_get_color_snif($snif[0]).'">'.number_format($snif[0],2,',', ' ').'</span> <span><a href="#" data-toggle="tooltip"    dyna-data-title="'.$snif[1].'">&nbsp;<i class="fas fa-info-circle ico-blue"></i></a></span></td></tr>');
      echo('<tr><td><b>'.get_string('dynamoconf', 'mod_dynamo').'</b>:</td><td><span style="color:white;background-color:'.dynamo_get_color_conf($conf).'">'.number_format($conf,2,',', ' ').'</span></td></tr>');
      echo('</table>');
      echo ('</div>');
      
      $canvas = '<div class="graph-block"><canvas id="cvs_'.$usrid.'" width="720" height="360">[No canvas support]</canvas></div>
      <div class="graph-block"><canvas id="cvsh_'.$usrid.'" width="960" height="360">[No canvas support]</canvas></div>';
      echo($canvas);
      
      $autoevalstr = '['.$dynamoautoeval[0]->crit1.','.$dynamoautoeval[0]->crit2.','.$dynamoautoeval[0]->crit3.','.$dynamoautoeval[0]->crit4.','.$dynamoautoeval[0]->crit5;
      if($display6 != 'none')  $autoevalstr .= ','.$dynamoautoeval[0]->crit6;
      $autoevalstr .= ']';
      
      $pairevalstr = '['.round($data->autocritsum->total1/$data->nbeval,2).','.round($data->autocritsum->total2/$data->nbeval,2).','.round($data->autocritsum->total3/$data->nbeval,2).','.round($data->autocritsum->total4/$data->nbeval,2).','.round($data->autocritsum->total5/$data->nbeval,2);
      if($display6 != 'none')  $pairevalstr .= ','.round($data->autocritsum->total6/$data->nbeval,2);
      $pairevalstr .= ']';
      
      if ($dynamo->groupeval == 1) {
        $allgroupeval = dynamo_get_group_eval_avg($dynamo, $usrid, $grpusrs, $grp->id);
      } else {
        $allgroupeval     = "";
      }
      $allgroupevalstr  = "";     
      if($allgroupeval != "") {
        $allgroupevalstr = '['.$allgroupeval->crit1.','.$allgroupeval->crit2.','.$allgroupeval->crit3.','.$allgroupeval->crit4.','.$allgroupeval->crit5;
        if($display6 != 'none')  $allgroupevalstr .= ','.$allgroupeval->crit6;
        $allgroupevalstr .= ']';
      }
      
      if($allgroupeval == "") {
        $multievalsr  = '[';
        $multievalsr .= '['.$dynamoautoeval[0]->crit1.','.round($data->autocritsum->total1/$data->nbeval,2).']'; 
        $multievalsr .= ',['.$dynamoautoeval[0]->crit2.','.round($data->autocritsum->total2/$data->nbeval,2).']'; 
        $multievalsr .= ',['.$dynamoautoeval[0]->crit3.','.round($data->autocritsum->total3/$data->nbeval,2).']'; 
        $multievalsr .= ',['.$dynamoautoeval[0]->crit4.','.round($data->autocritsum->total4/$data->nbeval,2).']'; 
        $multievalsr .= ',['.$dynamoautoeval[0]->crit5.','.round($data->autocritsum->total5/$data->nbeval,2).']';   
        if($display6 != 'none') {
          $multievalsr .= ',['.$dynamoautoeval[0]->crit6.','.round($data->autocritsum->total6/$data->nbeval,2).']';   
        }
        $multievalsr .= ']';
      } else {
        $multievalsr  = '[';
        $multievalsr .=  '['.$dynamoautoeval[0]->crit1.','.round($data->autocritsum->total1/$data->nbeval,2).','.$allgroupeval->crit1.']'; 
        $multievalsr .= ',['.$dynamoautoeval[0]->crit2.','.round($data->autocritsum->total2/$data->nbeval,2).','.$allgroupeval->crit2.']'; 
        $multievalsr .= ',['.$dynamoautoeval[0]->crit3.','.round($data->autocritsum->total3/$data->nbeval,2).','.$allgroupeval->crit3.']'; 
        $multievalsr .= ',['.$dynamoautoeval[0]->crit4.','.round($data->autocritsum->total4/$data->nbeval,2).','.$allgroupeval->crit4.']'; 
        $multievalsr .= ',['.$dynamoautoeval[0]->crit5.','.round($data->autocritsum->total5/$data->nbeval,2).','.$allgroupeval->crit5.']';   
        if($display6 != 'none') {
          $multievalsr .= ',['.$dynamoautoeval[0]->crit6.','.round($data->autocritsum->total6/$data->nbeval,2).','.$allgroupeval->crit6.']';   
        }
        $multievalsr .= ']';
      }
      
      $multievalsr = str_replace ("NAN","0",$multievalsr);

      $jscript = dynamo_get_graph_radar($jscript, $usrid, $pairevalstr, $autoevalstr, $allgroupevalstr, $labels, $usr->firstname, $usr->lastname);
      echo('</div>'); // End grouping xaxisLabels: '.$labels.',

      if( $allgroupevalstr == "") {
        $jscript = $jscript.'
            var data = '.$multievalsr.';
            new RGraph.Bar({
              id: \'cvsh_'.$usrid.'\',
              data: data,
              options: {
                  title : \''.get_string('dynamoradar01title2', 'mod_dynamo').'\',
                  shadow: false,
                  colorsStroke: \'rgba(0,0,0,0)\',
                  colors: [\'Gradient(white:blue:blue:blue:blue)\',\'Gradient(white:#FFA500:#FFA500:#FFA500:#FFA500)\'],
                  backgroundGridVlines: false,
                  backgroundGridBorder: false,
                  textColor: \'black\',
                  labels: '.$labels.',
                  textSize: 8,
                  marginLeft: 35,
                  marginBottom: 35,
                  marginTop: 15,
                  marginRight: 5,
                  key: [\''.htmlspecialchars($usr->firstname,ENT_QUOTES).' '.htmlspecialchars($usr->lastname,ENT_QUOTES).'\',\''.get_string('dynamogroupevaluatedby', 'mod_dynamo').'\'], 
                  keyColors: [\'blue\', \'#FFA500\'],
                  keyInteractive: true
              }
            }).wave();';
      } else {
        $jscript = $jscript.'
            var data = '.$multievalsr.';
              
            new RGraph.Bar({
              id: \'cvsh_'.$usrid.'\',
              data: data,
              options: {
                  title : \''.get_string('dynamoradar01title3', 'mod_dynamo').'\',
                  shadow: false,
                  colorsStroke: \'rgba(0,0,0,0)\',
                  colors: [\'Gradient(white:blue:blue:blue:blue)\',\'Gradient(white:#FFA500:#FFA500:#FFA500:#FFA500)\',\'Gradient(white:#aff:#aff:#aff:#aff)\'],
                  backgroundGridVlines: false,
                  backgroundGridBorder: false,
                  textColor: \'black\',
                  labels: '.$labels.',
                  textSize: 8,
                  marginLeft: 35,
                  marginBottom: 35,
                  marginTop: 15,
                  marginRight: 5,
                  key: [\''.htmlspecialchars($usr->firstname,ENT_QUOTES).' '.htmlspecialchars($usr->lastname,ENT_QUOTES).'\',\''.get_string('dynamogroupevaluatedby', 'mod_dynamo').'\',\''.get_string('dynamogroupevalby', 'mod_dynamo').'\'], 
                  keyPositionX : 700,
                  keyPositionY : 25,
                  keyColors: [\'blue\', \'#FFA500\', \'#aff\'],
                  keyBackground: \'rgba(255,255,255,0.5)\',
                  keyInteractive: true
              }
            }).wave();';
      }
      
    $jscript = $jscript.'
        };
    </script>';
    echo($jscript);
  }
?>

