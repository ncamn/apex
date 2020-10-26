/*
function initMap() {
    var origin = {lat: 48.855, lng: 2.346};
    var map = new google.maps.Map(document.getElementById('map'), {
        center: origin,
        zoom: 7
    });
    var marker = new google.maps.Marker({
        position: origin,
        map: map
    });
}
*/

$(document).ready(function () {
    $('.scroll').on('click', function () {
        $('html, body').animate({
            scrollTop: $(this.hash).offset().top
        }, 750);
        return false;
    });
});