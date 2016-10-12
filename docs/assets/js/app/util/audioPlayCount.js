var previousVal = "";
var isNewPlayAudio = false;
function audioChangeListener()
{
   if($('#audioIdPlayer').html() != previousVal)
   {
     previousVal  = $('#audioIdPlayer').html();
     isNewPlayAudio = true;
   }

    if (isNewPlayAudio === true){
        var width = $('#audioProgressBar').width();
        var parentProgressBarWidth = $('#audioParentProgressBar').width();
        var percent = (100 * width) / parentProgressBarWidth;
        if (isFinite(percent) && percent > 25){
            isNewPlayAudio = false;
            $.ajax({
                type: 'GET',
                url: 'https://sonidoslibres.herokuapp.com/api/play/' + $('#audioIdPlayer').html(),
                dataType: 'json',
                success: function (response) {
                }
            });
        }
    }
}

setInterval(audioChangeListener, 3000);
