CarrierWave.configure do |config|
  config.fog_credentials = {
    :provider               => 'AWS',                        # required
    :aws_access_key_id      => 'AKIAJQXK2IK46KFGYGEA',                        # required
    :aws_secret_access_key  => '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'                        # required
  }
  config.fog_directory  = 'name_of_directory'                     # required
  config.fog_public     = false                                   # optional, defaults to true
  config.fog_attributes = {'Cache-Control'=>'max-age=315576000'}  # optional, defaults to {}
end