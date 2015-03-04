MAX_CHANNEL = 512

ROW_SIZE = 32

$ ->
  render(ROW_SIZE)

  $('#show_labels').on 'change', (evt) ->
    $('.cell').toggleClass('text-off', !$(evt.target).is(':checked'))

  $('#columns').on 'input', (evt) ->
    val = parseInt $(evt.target).val()

    if typeof val == 'number'
      render(val)

render = (width) ->
  cells = {}

  $('.selector-grid').empty()
  show_labels = $('#show_labels').is(':checked')

  y = 0
  while y < 512
    row = $('<div></div>').addClass('row')
    $('.selector-grid').append(row)

    y += 1
    for x in [1..width]
      channel = (width * (y - 1)) + x

      continue if channel > MAX_CHANNEL

      cell = $("<span>#{channel}</span>").addClass("cell #{ if show_labels then '' else 'text-off' }")
      cell.data('channel', channel)
      cells[channel] = cell

      row.append(cell)

      cell.on 'mouseover', (evt) ->
        crange = parseInt($('#channel_size').val()) || 1
        chan = $(evt.target).data('channel')
        # console.log("mouseover #{chan}")

        max_chan = chan + crange - 1
        if max_chan > MAX_CHANNEL
          # ERROR
          console.log "channel overflow, reset to max"
          max_chan = MAX_CHANNEL
          chan = max_chan - (crange - 1)

        # highlight self and all related cells
        c = chan
        while c <= chan + (crange - 1)
          if cells[c]?
            cells[c].addClass('hover')
          c++

      cell.on 'mouseout', (evt) ->
        # unhighlight all
        $('.cell').removeClass('hover')

      cell.on 'click', (evt) ->
        crange = parseInt($('#channel_size').val()) || 1
        chan = $(evt.target).data('channel')
        max_chan = chan + crange - 1

        if max_chan > 512
          # ERROR
          max_chan = 512
          chan = max_chan - (crange - 1)

        console.log('POP', chan)
        if crange == 1
          $('#description').text("#{ crange } channel at #{ chan }")
        else
          $('#description').text("#{ crange } channels from #{ chan } to #{ chan + crange - 1 }")

