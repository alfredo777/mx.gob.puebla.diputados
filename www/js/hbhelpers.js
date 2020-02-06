function LoadHTML(url, id){
 $.ajax({
  url: url,
  cache: true,
  success: function(data) {
  result = {}
  var tpl = Handlebars.compile(data)
  output = tpl(result);
  console.log(output);
   $("#"+id).html(tpl);
  },
  error: function(err) {
    erx = JSON.stringify(err);
    console.log(erx);
  }
});
}


function LoadHTMLPC(url, id){
 $.ajax({
  url: url,
  cache: true,
  success: function(data) {
  result = {}
  var tpl = Handlebars.compile(data)
  output = tpl(result);
  console.log(output);
   $(id).html(tpl);
  },
  error: function(err) {
    erx = JSON.stringify(err);
    console.log(erx);
  }
});
}

function HTPL(tpln, divloadtpl, jsonroute) {
$.ajax({
  url: jsonroute,
  cache: true,
  success: function(data) {
  console.log(data)
  JSONTPL(tpln, data, divloadtpl);
  },
  error: function(err) {
    alert('Error em HTPL'+ err);
  }
});

}

function JSONTPL(name, context, divloadtpl) {
$.ajax({
  url: './pages/'+name+'.hbs',
  cache: true,
  success: function(data) {
     var result = context;
     console.log(result);
     console.log(data);
     console.log('div a a cargar --->'+ divloadtpl);
     var tpl = Handlebars.compile(data),
     output = tpl(result);
     $("#"+divloadtpl).html(output);
  },
  error: function(err) {
    callback(null, err);
     alert('Error em JSONTPL'+ JSON.stringify(err));

  }
});
}


Handlebars.registerHelper("inc", function(value, options)
{
  return parseInt(value) + 1;
});


Handlebars.registerHelper("blankid", function(context, options){
  var string = context.replace(" ", "");
  console.log("string ----->"+ string);
  return new Handlebars.SafeString(string);
})