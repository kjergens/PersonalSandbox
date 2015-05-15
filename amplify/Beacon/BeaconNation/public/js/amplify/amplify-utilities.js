utilities = (function ($) {
    /*
     * Function to decode the value of data-icon to display the icon characters
     */
    this.htmlDecode = function (value) {
        if (value) {
            return $('<div />').html(value).text();
        } else {
            return '';
        }
    };
    return this;
}(jQuery));
