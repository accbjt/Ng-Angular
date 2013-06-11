require 'json'

class App < Sinatra::Base
  set :root, File.join(File.dirname(__FILE__), "..")
  set :public_dir, settings.root
  
  get '/' do
    File.read(File.expand_path('index.html', settings.root))
  end
  
  get '/api/:p' do
    File.read(File.expand_path('js/data/' + params['p'] + '.json', settings.root))
  end
end