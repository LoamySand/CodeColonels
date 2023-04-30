import Handlebars from 'hbs'

var DateFormats = {
    short: "DD MMMM - YYYY",
    long: "dddd DD.MM.YYYY HH:mm"
};
Handlebars.registerHelper("formatDate", function(datetime, format) {
        // can use other formats like 'lll' too
        format = DateFormats[format] || format;
        return datetime.format(format);
});