$(document).ready(function () {
    $('a[href^="https://"], a[href^="https://"]').not('a[class*=internal]').attr('target', '_blank');
 });