$(document).ready(function() {
  $('#tracking-form').submit(function(e) {
      e.preventDefault();
      var trackingCode = $('#tracking-code').val();
      var company = $('#company-select').val();
      
      if(company === 'correios') {
          var apiUrl = 'https://api.linketrack.com/track/json';
          
          var params = {
              user: 'teste',
              token: '1abcd00b2731640e886fb41a8a9671ad1434c599dbaa0a0de9a5aa619f29a83f',
              codigo: trackingCode
          };
          
          $.ajax({
              url: apiUrl,
              type: 'GET',
              data: params,
              dataType: 'json',
              success: function(data) {
                  var resultsHtml = '<p>Serviço: ' + data.servico + '</p>';
                  resultsHtml += '<p>Movimentos: ' + data.quantidade + '</p>';
                  resultsHtml += '<p>Eventos:</p><ul>';
                  data.eventos.forEach(function(evento) {
                      resultsHtml += '<li>' + evento.data + ' - ' + evento.status + ' (' + evento.local + ')</li>';
                  });
                  resultsHtml += '</ul>';
                  $('#results').html(resultsHtml);
              },
              error: function(error) {
                  $('#results').html('<p>Ocorreu um erro ao rastrear o objeto. Por favor, tente novamente mais tarde.</p>');
              }
          });
      }
  });
});
