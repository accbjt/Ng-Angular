class WebsocketApp
  attr_reader :ws
  def initialize(ws)
    @ws = ws

    ws.onopen do
      sockets.push ws
    end

    ws.onmessage do |msg|
      handle_message(JSON.parse(msg), ws)
    end

    ws.onclose do
      sockets.delete(ws)
    end
  end
  
  def handle_message(msg, ws)
  end
  
  def sockets
    @sockets ||= []
  end
  
end