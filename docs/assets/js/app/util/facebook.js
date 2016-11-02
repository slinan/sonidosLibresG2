function share()
{
  currentTrack = $("#audioIdPlayer").html();
  console.log(currentTrack);
  url= 'https://www.facebook.com/sharer/sharer.php?u=sonidoslibres.xyz?song='+currentTrack;
  var win = window.open(url, '_blank');
  win.focus();
}