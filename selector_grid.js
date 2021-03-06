// Generated by CoffeeScript 1.7.1
(function() {
  var MAX_CHANNEL, ROW_SIZE, render;

  MAX_CHANNEL = 512;

  ROW_SIZE = 32;

  $(function() {
    render(ROW_SIZE);
    $('#show_labels').on('change', function(evt) {
      return $('.cell').toggleClass('text-off', !$(evt.target).is(':checked'));
    });
    return $('#columns').on('input', function(evt) {
      var val;
      val = parseInt($(evt.target).val());
      if (typeof val === 'number') {
        return render(val);
      }
    });
  });

  render = function(width) {
    var cell, cells, channel, row, show_labels, x, y, _results;
    cells = {};
    $('.selector-grid').empty();
    show_labels = $('#show_labels').is(':checked');
    y = 0;
    _results = [];
    while (y < 512) {
      row = $('<div></div>').addClass('row');
      $('.selector-grid').append(row);
      y += 1;
      _results.push((function() {
        var _i, _results1;
        _results1 = [];
        for (x = _i = 1; 1 <= width ? _i <= width : _i >= width; x = 1 <= width ? ++_i : --_i) {
          channel = (width * (y - 1)) + x;
          if (channel > MAX_CHANNEL) {
            continue;
          }
          cell = $("<span>" + channel + "</span>").addClass("cell " + (show_labels ? '' : 'text-off'));
          cell.data('channel', channel);
          cells[channel] = cell;
          row.append(cell);
          cell.on('mouseover', function(evt) {
            var c, chan, crange, max_chan, _results2;
            crange = parseInt($('#channel_size').val()) || 1;
            chan = $(evt.target).data('channel');
            max_chan = chan + crange - 1;
            if (max_chan > MAX_CHANNEL) {
              console.log("channel overflow, reset to max");
              max_chan = MAX_CHANNEL;
              chan = max_chan - (crange - 1);
            }
            c = chan;
            _results2 = [];
            while (c <= chan + (crange - 1)) {
              if (cells[c] != null) {
                cells[c].addClass('hover');
              }
              _results2.push(c++);
            }
            return _results2;
          });
          cell.on('mouseout', function(evt) {
            return $('.cell').removeClass('hover');
          });
          _results1.push(cell.on('click', function(evt) {
            var chan, crange, max_chan;
            crange = parseInt($('#channel_size').val()) || 1;
            chan = $(evt.target).data('channel');
            max_chan = chan + crange - 1;
            if (max_chan > 512) {
              max_chan = 512;
              chan = max_chan - (crange - 1);
            }
            console.log('POP', chan);
            if (crange === 1) {
              return $('#description').text("" + crange + " channel at " + chan);
            } else {
              return $('#description').text("" + crange + " channels from " + chan + " to " + (chan + crange - 1));
            }
          }));
        }
        return _results1;
      })());
    }
    return _results;
  };

}).call(this);
